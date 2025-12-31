
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc,
  setDoc,
  query,
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Service, ClinicConfig, Appointment, Message } from "../types";
import { INITIAL_SERVICES, INITIAL_CONFIG } from "../constants";

export const databaseService = {
  // Inicialización de la Base de Datos
  async seedDatabase() {
    try {
      // 1. Verificar si ya existe la configuración
      const configRef = doc(db, "clinic_config", "general_info");
      const configSnap = await getDoc(configRef);

      if (!configSnap.exists()) {
        console.log("Inicializando configuración general...");
        await setDoc(configRef, INITIAL_CONFIG);
      }

      // 2. Verificar si hay servicios, si no, poblar con los iniciales
      const servicesSnap = await getDocs(collection(db, "services"));
      if (servicesSnap.empty) {
        console.log("Poblando catálogo de servicios iniciales...");
        for (const service of INITIAL_SERVICES) {
          const { id, ...serviceData } = service;
          // Usamos el ID manual de las constantes o dejamos que Firebase cree uno
          await setDoc(doc(db, "services", id), serviceData);
        }
      }
      
      console.log("Base de datos lista.");
      return true;
    } catch (error) {
      console.error("Error al inicializar base de datos:", error);
      return false;
    }
  },

  // Servicios
  async getServices(): Promise<Service[]> {
    const querySnapshot = await getDocs(collection(db, "services"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
  },

  async updateService(service: Service) {
    const { id, ...data } = service;
    const docRef = doc(db, "services", id);
    await updateDoc(docRef, data);
  },

  async addService(service: Omit<Service, 'id'>) {
    await addDoc(collection(db, "services"), service);
  },

  async deleteService(id: string) {
    await deleteDoc(doc(db, "services", id));
  },

  // Configuración
  async getConfig(): Promise<ClinicConfig> {
    const docRef = doc(db, "clinic_config", "general_info");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as ClinicConfig;
    }
    // Si no existe, disparamos el seed y reintentamos
    await this.seedDatabase();
    return INITIAL_CONFIG;
  },

  async updateConfig(config: ClinicConfig) {
    const docRef = doc(db, "clinic_config", "general_info");
    await setDoc(docRef, config);
  },

  // Citas
  async getAppointments(): Promise<Appointment[]> {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || Date.now() 
    } as Appointment));
  },

  async addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt' | 'status'>) {
    await addDoc(collection(db, "appointments"), {
      ...appointment,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  },

  async updateAppointmentStatus(id: string, status: Appointment['status']) {
    const docRef = doc(db, "appointments", id);
    await updateDoc(docRef, { status });
  },

  async deleteAppointment(id: string) {
    await deleteDoc(doc(db, "appointments", id));
  },

  // Historial de Chat
  async saveChatMessage(sessionId: string, message: Message) {
    const chatRef = collection(db, "chats", sessionId, "messages");
    await addDoc(chatRef, {
      ...message,
      timestamp: serverTimestamp()
    });
  }
};
