
import React from 'react';
import { Calendar, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookingClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookingClick }) => {
  return (
    <div className="relative bg-white pt-20 pb-32 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 items-center">
        <div className="max-w-xl mx-auto lg:max-w-none lg:mx-0 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-full mb-8">
            <Sparkles className="h-4 w-4 text-sky-600" />
            <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">Tecnología Dental Avanzada</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-gray-900 leading-[0.9] mb-8">
            Diseñamos tu <br/> <span className="text-sky-600 underline decoration-sky-100 underline-offset-8">Mejor Sonrisa</span>
          </h1>
          
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
            Expertos en implantes, ortodoncia y estética dental. Brindamos una experiencia premium con resultados garantizados de por vida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onBookingClick}
              className="px-10 py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-gray-900/20 hover:bg-sky-600 transition-all flex items-center justify-center gap-3 group"
            >
              Agendar Cita Ahora
              <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
            </button>
            <a href="#servicios" className="px-10 py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:border-sky-600 transition-all text-center">
              Ver Tratamientos
            </a>
          </div>

          <div className="mt-12 flex items-center gap-8 grayscale opacity-50 hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-sky-600" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Certificación Internacional</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="text-sky-600" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Atención Inmediata</span>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-0 relative">
          <div className="relative rounded-[4rem] overflow-hidden shadow-2xl shadow-sky-900/20 aspect-[4/5] sm:aspect-auto">
            <img
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
              alt="Doctora sonriendo en clínica Dental Premium"
            />
            {/* Overlay informativo en la imagen */}
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 uppercase tracking-tighter">Más de 5,000 Sonrisas</p>
                  <p className="text-[10px] text-sky-600 font-bold uppercase">Pacientes satisfechos en Huaral y Comas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
