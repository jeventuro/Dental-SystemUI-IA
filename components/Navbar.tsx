
import React from 'react';
import { Stethoscope, UserCog } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="p-2 bg-sky-600 rounded-lg shadow-lg shadow-sky-600/30">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-cyan-500 leading-none">
                  Dental
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Premium</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a href="#nosotros" className="hidden lg:block text-gray-600 hover:text-sky-600 font-bold text-sm uppercase tracking-tighter transition-colors">Nosotros</a>
            <a href="#servicios" className="hidden md:block text-gray-600 hover:text-sky-600 font-bold text-sm uppercase tracking-tighter transition-colors">Servicios</a>
            <a href="#contacto" className="hidden md:block text-gray-600 hover:text-sky-600 font-bold text-sm uppercase tracking-tighter transition-colors">Contacto</a>
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-sky-700 bg-sky-50 border border-sky-100 rounded-full hover:bg-sky-600 hover:text-white transition-all duration-300"
            >
              <UserCog size={18} />
              <span className="hidden sm:inline uppercase tracking-tighter">Panel Admin</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
