
import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { Service, ClinicConfig } from '../types';
import { databaseService } from '../services/databaseService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  config: ClinicConfig | null;
  initialServiceId?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, services, config, initialServiceId }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    serviceId: initialServiceId || '',
    locationId: config?.locations[0]?.id || '',
    date: '',
    time: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const selectedService = services.find(s => s.id === formData.serviceId);
      await databaseService.addAppointment({
        ...formData,
        serviceName: selectedService?.name || 'Consulta General'
      });
      setStep(2); // Éxito
    } catch (error) {
      alert("Hubo un error al procesar tu cita. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 p-3 text-gray-400 hover:text-sky-600 rounded-full transition-all"><X /></button>

        {step === 1 ? (
          <div className="p-8 sm:p-14">
            <div className="mb-10 text-center sm:text-left">
              <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start">
                <span className="h-1 w-8 bg-sky-500 rounded-full"></span>
                <span className="text-sky-600 font-black text-[10px] uppercase tracking-widest">Reserva Premium</span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Nueva <span className="text-sky-600">Cita</span></h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre Paciente</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500" />
                  <input required type="text" value={formData.patientName} onChange={e => setFormData({...formData, patientName: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 font-bold" placeholder="Tu nombre" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500" />
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 font-bold" placeholder="+51 9..." />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Especialidad</label>
                <select required value={formData.serviceId} onChange={e => setFormData({...formData, serviceId: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 font-bold appearance-none">
                  <option value="">Selecciona Tratamiento</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Sede</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-500" />
                  <select required value={formData.locationId} onChange={e => setFormData({...formData, locationId: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 font-bold appearance-none">
                    {config?.locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Fecha</label>
                <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 font-bold" />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Hora</label>
                <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-sky-500 font-bold" />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Notas Adicionales</label>
                <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-6 bg-gray-50 border-none rounded-[2rem] focus:ring-2 focus:ring-sky-500 outline-none h-24 resize-none font-medium" placeholder="¿Tienes alguna consulta previa?" />
              </div>

              <div className="sm:col-span-2 pt-4">
                <button type="submit" disabled={loading} className="w-full bg-sky-600 text-white py-5 rounded-2xl font-black text-lg tracking-widest uppercase shadow-xl shadow-sky-600/30 hover:bg-sky-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" /> : 'Confirmar Reserva'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-20 text-center space-y-8 animate-in zoom-in-50 duration-500">
            <div className="bg-green-100 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 scale-125 shadow-lg">
              <CheckCircle2 className="text-green-600 h-14 w-14" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">¡Solicitud Enviada!</h2>
              <p className="text-gray-500 text-lg max-w-sm mx-auto font-medium">
                Gracias, <strong>{formData.patientName}</strong>. Un especialista te contactará por WhatsApp para confirmar los detalles.
              </p>
            </div>
            <button onClick={onClose} className="mt-8 px-12 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-sky-600 transition-all">Finalizar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
