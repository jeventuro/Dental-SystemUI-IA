
import React, { useState, useEffect } from 'react';
import { Service, ClinicConfig } from '../types';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import AboutUs from './AboutUs';
import ContactSection from './ContactSection';
import ChatWidget from './ChatWidget';
import BookingModal from './BookingModal';
import { Phone, Stethoscope, Facebook, Instagram, MessageCircle, Loader2 } from 'lucide-react';

interface PublicLandingProps {
  services: Service[];
  config: ClinicConfig | null;
  onAdminAccess: () => void;
}

const PublicLanding: React.FC<PublicLandingProps> = ({ services, config, onAdminAccess }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (config && services.length > 0) {
      setIsDataLoaded(true);
    }
  }, [config, services]);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative scroll-smooth selection:bg-sky-100 selection:text-sky-900">
      <Navbar onAdminClick={onAdminAccess} />
      
      <Hero onBookingClick={() => handleOpenBooking()} />

      {/* Secciones con espaciado consistente */}
      <div className="space-y-0">
        <AboutUs config={config} />
        
        <Services 
          services={services.length > 0 ? services : []} 
          onServiceClick={(id) => handleOpenBooking(id)} 
        />

        <ContactSection config={config} />
      </div>

      {/* Floating Panic Button - Mobile focused */}
      <a 
        href={`tel:${config?.emergency_phone}`}
        className="fixed bottom-24 right-6 sm:bottom-6 sm:right-auto sm:left-6 z-[50] group"
      >
        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 rounded-[2rem] shadow-2xl shadow-red-600/40 flex items-center gap-4 transition-all transform group-hover:scale-105 border-4 border-white/20 animate-in slide-in-from-left-20 duration-1000">
          <div className="bg-white/20 p-2 rounded-xl animate-bounce">
            <Phone size={24} fill="white" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-black tracking-widest opacity-80 leading-none">Emergencia 24h</div>
            <div className="text-xl font-black leading-none mt-1 tracking-tighter">{config?.emergency_phone || 'Llamar'}</div>
          </div>
        </button>
      </a>

      {/* Footer Pro */}
      <footer className="bg-gray-900 text-gray-400 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-sky-600 rounded-2xl shadow-xl shadow-sky-600/20">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-white tracking-tighter leading-none">Dental Premium</h4>
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">Excelencia Odontológica</span>
                </div>
              </div>
              <p className="max-w-md leading-relaxed text-sm opacity-70 font-medium">
                {config?.vision || 'Especialistas en transformar vidas a través de sonrisas saludables y estéticas.'}
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Instagram size={20} />
                </a>
                <a href={`https://wa.me/${config?.locations[0]?.whatsapp}`} target="_blank" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-4">Sedes</h4>
              <ul className="space-y-4 text-sm font-bold">
                {config?.locations.map(loc => (
                  <li key={loc.id} className="flex items-start gap-3 hover:text-sky-500 transition-colors cursor-default">
                    <span className="h-1.5 w-1.5 bg-sky-500 rounded-full mt-1.5 shrink-0"></span>
                    {loc.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-black uppercase tracking-widest text-xs border-b border-white/10 pb-4">Legales</h4>
              <div className="flex flex-col gap-4 text-sm font-bold">
                <a href="#" className="hover:text-white transition-colors">Políticas de Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
                <a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs font-bold tracking-widest uppercase opacity-40">© 2024 Dental Premium Group</p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity">
              <span>Huaral</span>
              <span>•</span>
              <span>Comas</span>
              <span>•</span>
              <span>Lima</span>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
      
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        services={services}
        initialServiceId={selectedServiceId}
        config={config}
      />
    </div>
  );
};

export default PublicLanding;
