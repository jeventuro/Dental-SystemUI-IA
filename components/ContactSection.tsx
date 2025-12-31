
import React from 'react';
import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';
import { ClinicConfig } from '../types';

interface ContactSectionProps {
  config: ClinicConfig | null;
}

const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  if (!config) return null;

  const handleWhatsApp = (whatsapp: string) => {
    window.open(`https://wa.me/${whatsapp}`, '_blank');
  };

  return (
    <section id="contacto" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-sky-600 font-semibold tracking-wide uppercase tracking-[0.2em]">Ubícanos</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">Nuestras Sedes</p>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">Contamos con instalaciones modernas en puntos estratégicos para brindarte la mejor atención odontológica cerca de ti.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {config.locations.map((loc) => (
            <div key={loc.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-sky-100 p-3 rounded-2xl text-sky-600">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-xl text-gray-900">{loc.name}</h3>
              </div>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed flex items-start gap-2">
                <span className="font-semibold text-gray-900 shrink-0">Dir:</span> {loc.address}
              </p>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed flex items-start gap-2">
                <span className="font-semibold text-gray-900 shrink-0">Tel:</span> {loc.phone}
              </p>
              <button 
                onClick={() => handleWhatsApp(loc.whatsapp)}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/30 transition-all"
              >
                <MessageCircle size={20} />
                Agendar WhatsApp
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Comunicación Directa</h3>
            <p className="text-gray-500 leading-relaxed">Para consultas personales o envío de historias clínicas, puedes escribirnos a nuestro correo corporativo o llamar a nuestra central de emergencias.</p>
            <div className="space-y-4">
              <a href={`mailto:${config.email}`} className="flex items-center gap-4 group">
                <div className="bg-sky-50 p-3 rounded-xl text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <span className="font-bold text-gray-700">{config.email}</span>
              </a>
              <a href={`tel:${config.phone}`} className="flex items-center gap-4 group">
                <div className="bg-sky-50 p-3 rounded-xl text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <span className="font-bold text-gray-700">{config.phone}</span>
              </a>
            </div>
          </div>
          <div className="bg-sky-600 p-10 rounded-[2.5rem] text-white flex flex-col items-center text-center">
            <h4 className="text-3xl font-black mb-4 tracking-tighter">URGENCIAS 24/7</h4>
            <p className="mb-8 opacity-90 font-medium">Si presentas un dolor agudo o trauma, llámanos de inmediato a nuestra línea prioritaria.</p>
            <a href={`tel:${config.emergency_phone}`} className="text-4xl font-black tracking-widest bg-white text-sky-600 px-8 py-4 rounded-2xl shadow-xl shadow-black/10 hover:scale-105 transition-all">
              {config.emergency_phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
