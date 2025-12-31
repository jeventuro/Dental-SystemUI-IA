
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Service } from '../types';
import { CheckCircle2, Tag, ChevronLeft, ChevronRight, Stethoscope, Sparkles } from 'lucide-react';

interface ServicesProps {
  services: Service[];
  onServiceClick: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ services, onServiceClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateItemsToShow = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setItemsToShow(1.1); // Casi una tarjeta completa en móvil
    else if (width < 1024) setItemsToShow(2);
    else if (width < 1280) setItemsToShow(3);
    else setItemsToShow(4);
  }, []);

  useEffect(() => {
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, [updateItemsToShow]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = services.length - Math.floor(itemsToShow);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  }, [services.length, itemsToShow]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const maxIndex = services.length - Math.floor(itemsToShow);
      return prev <= 0 ? maxIndex : prev - 1;
    });
  }, [services.length, itemsToShow]);

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [nextSlide]);

  return (
    <section id="servicios" className="py-24 bg-gray-50/50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
        
        <div className="bg-white rounded-[4rem] border border-gray-100 p-8 sm:p-20 shadow-xl relative overflow-hidden">
          {/* Fondo decorativo interno */}
          <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10 gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-sky-600" size={20} />
                <span className="text-sky-600 font-black text-xs uppercase tracking-[0.4em]">Nuestro Catálogo</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                Especialidades <br/> <span className="text-sky-600">De Vanguardia</span>
              </h2>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => prevSlide()}
                className="p-5 bg-gray-50 text-gray-400 rounded-[1.5rem] hover:bg-sky-600 hover:text-white transition-all shadow-sm active:scale-90"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => nextSlide()}
                className="p-5 bg-gray-900 text-white rounded-[1.5rem] hover:bg-sky-600 transition-all shadow-xl active:scale-90"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="overflow-visible relative z-10">
            <div 
              className="flex transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="group bg-gray-50/50 p-8 rounded-[3rem] border border-transparent hover:border-sky-100 hover:bg-white transition-all duration-500 h-[580px] flex flex-col hover:shadow-2xl hover:shadow-sky-200/50">
                    
                    <div className="mb-8 flex justify-between items-start">
                      <div className="bg-sky-600 p-4 rounded-2xl text-white shadow-lg shadow-sky-600/30 group-hover:scale-110 transition-transform">
                        <Stethoscope size={28} />
                      </div>
                      {service.isPromo && (
                        <div className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5">
                          <Tag size={10} />
                          Promo Web
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 leading-none mb-4 tracking-tighter uppercase">
                      {service.name}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1 font-medium italic opacity-80 group-hover:opacity-100 transition-opacity">
                      {service.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      {['Material Premium', 'Garantía Escrita'].map(item => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-sky-500" />
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-gray-100">
                      <div className="flex flex-col mb-6">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Inversión Online</span>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-4xl font-black ${service.isPromo ? 'text-red-600' : 'text-gray-900'} tracking-tighter`}>
                            S/ {service.isPromo ? service.promoPrice : service.price}
                          </span>
                          {service.isPromo && (
                            <span className="text-gray-300 line-through text-sm font-bold">S/ {service.price}</span>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => onServiceClick(service.id)}
                        className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-sky-600 transition-all active:scale-95 shadow-lg shadow-gray-900/10"
                      >
                        Agendar Especialidad
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
