
import React from 'react';
import { Target, Eye, Heart, ShieldCheck, Star } from 'lucide-react';
import { ClinicConfig } from '../types';

interface AboutUsProps {
  config: ClinicConfig | null;
}

const AboutUs: React.FC<AboutUsProps> = ({ config }) => {
  // Si no hay config, mostramos un esqueleto elegante en lugar de nada
  const data = config || {
    vision: "Cargando nuestra visión estratégica...",
    mision: "Cargando nuestra misión institucional...",
    valores: "Cargando nuestros valores fundamentales...",
    calidad: "Cargando nuestros estándares de calidad..."
  };

  return (
    <section id="nosotros" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="h-1 w-12 bg-sky-600 rounded-full"></span>
            <span className="text-sky-600 font-black text-xs uppercase tracking-[0.4em]">Excelencia Dental</span>
            <span className="h-1 w-12 bg-sky-600 rounded-full"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-6">
            Comprometidos con tu <br/> <span className="text-sky-600">Bienestar Integral</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            Más de 15 años transformando sonrisas con la tecnología más avanzada de la región y un equipo de especialistas de primer nivel.
          </p>
        </div>


        <div className="mb-16 flex justify-center">
          {/*Video de referencias de atención al cliente*/}
          <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-lg border-4 border-sky-100">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Video de Atención al Cliente - Dental Premium" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Tarjeta de Visión */}
          <div className="group bg-gray-50 p-10 rounded-[3rem] border border-gray-100 hover:bg-sky-600 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-200">
            <div className="bg-sky-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors duration-500">
              <Eye className="text-sky-600" size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tighter uppercase group-hover:text-white transition-colors">Nuestra Visión</h3>
            <p className="text-gray-600 leading-relaxed font-medium group-hover:text-sky-50 transition-colors">
              {data.vision}
            </p>
          </div>

          {/* Tarjeta de Misión */}
          <div className="group bg-gray-900 p-10 rounded-[3rem] border border-gray-800 hover:bg-sky-600 transition-all duration-500 hover:shadow-2xl hover:shadow-sky-200">
            <div className="bg-sky-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-white transition-colors duration-500">
              <Target className="text-sky-400 group-hover:text-sky-600" size={32} />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase transition-colors">Nuestra Misión</h3>
            <p className="text-gray-400 leading-relaxed font-medium group-hover:text-sky-50 transition-colors">
              {data.mision}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Valores y Calidad en formato más compacto pero elegante */}
          <div className="md:col-span-2 bg-sky-50 p-10 rounded-[3rem] border border-sky-100 flex flex-col md:flex-row gap-10 items-center">
             <div className="bg-white p-6 rounded-[2rem] shadow-xl shrink-0">
               <Heart className="text-red-500" size={48} />
             </div>
             <div>
               <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tighter uppercase">Nuestros Valores</h3>
               <p className="text-gray-600 leading-relaxed font-medium italic">"{data.valores}"</p>
             </div>
          </div>

          <div className="bg-gradient-to-br from-sky-600 to-cyan-500 p-10 rounded-[3rem] text-white flex flex-col justify-center relative overflow-hidden group">
            <ShieldCheck className="absolute -right-4 -bottom-4 text-white/10 w-40 h-40 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Star className="fill-yellow-400 text-yellow-400" size={16} />
                <Star className="fill-yellow-400 text-yellow-400" size={16} />
                <Star className="fill-yellow-400 text-yellow-400" size={16} />
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase">Garantía de Calidad</h3>
              <p className="text-sky-50 text-sm font-bold leading-relaxed opacity-90">
                {data.calidad}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
