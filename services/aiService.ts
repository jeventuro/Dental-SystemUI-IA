
import { GoogleGenAI } from "@google/genai";
import { databaseService } from "./databaseService";

// El SDK se inicializa usando la API_KEY de las variables de entorno
// IMPORTANTE: En Render, configura la variable de entorno API_KEY
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Función para llamar a Ollama cuando el usuario está en localhost.
 * Esto permite ahorrar cuota de Gemini durante el desarrollo.
 */
async function callOllama(prompt: string, systemInstruction: string) {
  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gemma:2b', // O el modelo que tengas descargado (ej. gemma2:2b)
        prompt: `Instrucciones: ${systemInstruction}\n\nPregunta del Usuario: ${prompt}`,
        stream: false
      })
    });
    
    if (!response.ok) throw new Error('Ollama no responde');
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.warn("Ollama no detectado en localhost, saltando a Gemini...");
    return null;
  }
}

/**
 * Función principal que orquesta la respuesta de la IA.
 */
export const generateAIChatResponse = async (userMessage: string, sessionId: string) => {
  try {
    // 1. Obtenemos datos en tiempo real de Firebase para el contexto (RAG simplificado)
    const services = await databaseService.getServices();
    const config = await databaseService.getConfig();

    // 2. Construimos la instrucción maestra
    const systemInstruction = `
      Eres el asistente virtual inteligente de "Dental Premium". 
      Tu objetivo es ayudar a los pacientes con información precisa y amable.
      
      INFORMACIÓN DE LA CLÍNICA (FUENTE DE VERDAD):
      - Servicios y Precios: ${JSON.stringify(services)}
      - Sedes y Contacto: ${JSON.stringify(config?.locations)}
      - Horarios: ${config?.hours}
      - Teléfono General: ${config?.phone}
      - EMERGENCIAS: ${config?.emergency_phone}
      
      REGLAS CRÍTICAS:
      1. Usa SÓLO la información proporcionada arriba. Si no sabes algo, pide que llamen al ${config?.phone}.
      2. En caso de dolor fuerte o trauma, indica que es una EMERGENCIA y deben llamar al ${config?.emergency_phone} de inmediato.
      3. No inventes descuentos ni precios que no estén en la lista.
      4. Responde de forma concisa y profesional en español.
    `;

    let assistantContent = "";

    // 3. Estrategia Híbrida:
    // Si estamos en desarrollo local, intentamos Ollama para ahorrar créditos.
    if (window.location.hostname === "localhost") {
      assistantContent = await callOllama(userMessage, systemInstruction);
    }

    // 4. Si Ollama falló o estamos en PRODUCCIÓN (Render), usamos Gemini 3 Flash.
    if (!assistantContent) {
      const ai = getAIClient();
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: { 
          systemInstruction,
          temperature: 0.7,
          topP: 0.95,
          topK: 40
        },
      });
      
      // Acceso directo a la propiedad .text según el SDK más reciente
      assistantContent = result.text || "Lo siento, tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo.";
    }

    // 5. Guardamos la conversación en Firebase para historial del administrador
    await databaseService.saveChatMessage(sessionId, { 
      role: 'user', 
      content: userMessage, 
      timestamp: Date.now() 
    });
    
    await databaseService.saveChatMessage(sessionId, { 
      role: 'assistant', 
      content: assistantContent, 
      timestamp: Date.now() 
    });

    return assistantContent;
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Lo sentimos, nuestro asistente está en mantenimiento. Por favor llama al " + (process.env.PHONE || "+51 987 654 321");
  }
};
