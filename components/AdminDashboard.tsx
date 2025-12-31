
import React, { useState, useEffect } from 'react';
import { Service, ClinicConfig, Appointment } from '../types';
import { databaseService } from '../services/databaseService';
import { 
  Plus, Edit2, Trash2, Save, X, LayoutDashboard, 
  Settings, LogOut, Package, RefreshCw, AlertTriangle,
  CalendarDays, CheckCircle, XCircle, Clock, Info
} from 'lucide-react';

interface AdminDashboardProps {
  services: Service[];
  config: ClinicConfig | null;
  onRefresh: () => Promise<void>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ services, config, onRefresh, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'config'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [localConfig, setLocalConfig] = useState<ClinicConfig>(config || { 
    phone: '', emergency_phone: '', address: '', hours: '', email: '',
    vision: '', mision: '', valores: '', calidad: '', locations: []
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadAppointments();
  }, [activeTab]);

  const loadAppointments = async () => {
    const apps = await databaseService.getAppointments();
    setAppointments(apps);
  };

  const handleUpdateAppointment = async (id: string, status: Appointment['status']) => {
    await databaseService.updateAppointmentStatus(id, status);
    loadAppointments();
  };

  const handleDeleteService = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este servicio? Esto afectará las respuestas del Chatbot de inmediato.')) {
      await databaseService.deleteService(id);
      await onRefresh();
    }
  };

  const handleSaveService = async (service: Service | Omit<Service, 'id'>) => {
    setIsSaving(true);
    try {
      if ('id' in service && service.id) {
        await databaseService.updateService(service as Service);
      } else {
        await databaseService.addService(service);
      }
      setEditingService(null);
      setIsAdding(false);
      await onRefresh();
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateConfig = async () => {
    setIsSaving(true);
    try {
      await databaseService.updateConfig(localConfig);
      await onRefresh();
      alert('Configuración global actualizada. La IA ya conoce los nuevos datos.');
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight flex items-center gap-1 w-fit"><CheckCircle size={12}/> Confirmada</span>;
      case 'cancelled': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight flex items-center gap-1 w-fit"><XCircle size={12}/> Cancelada</span>;
      default: return <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight flex items-center gap-1 w-fit"><Clock size={12}/> Pendiente</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar - Diseño Profesional Dark */}
      <div className="w-72 bg-gray-900 text-white flex flex-col fixed inset-y-0 shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500 rounded-xl">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">DENTAL</h1>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">Premium Admin</span>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {[
            { id: 'appointments', icon: CalendarDays, label: 'Citas Recibidas' },
            { id: 'services', icon: Package, label: 'Tratamientos' },
            { id: 'config', icon: Settings, label: 'Configuración' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
                activeTab === item.id 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.label}
              {item.id === 'appointments' && appointments.filter(a => a.status === 'pending').length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                  {appointments.filter(a => a.status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-6 py-4 text-red-400 hover:bg-red-400/10 rounded-2xl transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-72 flex-1 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 bg-sky-500 rounded-full"></span>
              <span className="text-sky-600 font-black text-[10px] uppercase tracking-widest">Dashboard</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter">
              {activeTab === 'appointments' ? 'Gestión de Pacientes' : activeTab === 'services' ? 'Catálogo Dental' : 'Ajustes de Clínica'}
            </h2>
          </div>
          {activeTab === 'services' && !isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-gray-900 hover:bg-sky-600 text-white px-8 py-3 rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
            >
              <Plus size={18} />
              Añadir Servicio
            </button>
          )}
        </header>

        {/* Dynamic Views */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          {activeTab === 'appointments' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Paciente</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tratamiento</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-gray-400 italic">No hay citas pendientes.</td>
                    </tr>
                  ) : (
                    appointments.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-8 py-6">
                          <p className="font-black text-gray-900 text-base">{app.patientName}</p>
                          <p className="text-xs text-sky-600 font-bold mt-1 uppercase">{app.phone}</p>
                        </td>
                        <td className="px-8 py-6">
                          <p className="font-bold text-gray-800 text-sm">{app.serviceName}</p>
                          <p className="text-[10px] text-gray-400 font-black uppercase mt-1 flex items-center gap-2">
                            <CalendarDays size={12}/> {app.date} | <Clock size={12}/> {app.time}
                          </p>
                        </td>
                        <td className="px-8 py-6">{getStatusBadge(app.status)}</td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2">
                            {app.status === 'pending' && (
                              <button 
                                onClick={() => handleUpdateAppointment(app.id, 'confirmed')}
                                className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                              >
                                <CheckCircle size={18} />
                              </button>
                            )}
                            <button 
                              onClick={() => databaseService.deleteAppointment(app.id).then(loadAppointments)}
                              className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="p-8">
              {(isAdding || editingService) && (
                <div className="mb-12 bg-sky-50 p-10 rounded-[2rem] border-2 border-sky-100 animate-in slide-in-from-top-4 duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black tracking-tighter uppercase">{isAdding ? 'Nuevo Tratamiento' : 'Editar Especialidad'}</h3>
                    <button onClick={() => {setEditingService(null); setIsAdding(false)}}><X /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nombre</label>
                      <input id="name" defaultValue={editingService?.name} className="w-full p-4 rounded-2xl border-none font-bold outline-none ring-2 ring-gray-100 focus:ring-sky-500" />
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Descripción</label>
                      <textarea id="desc" defaultValue={editingService?.description} className="w-full p-4 rounded-2xl border-none font-medium outline-none ring-2 ring-gray-100 focus:ring-sky-500 h-32" />
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Precio Base</label>
                          <input id="price" type="number" defaultValue={editingService?.price} className="w-full p-4 rounded-2xl border-none font-bold outline-none ring-2 ring-gray-100 focus:ring-sky-500" />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Precio Promo</label>
                          <input id="promoPrice" type="number" defaultValue={editingService?.promoPrice} className="w-full p-4 rounded-2xl border-none font-bold outline-none ring-2 ring-gray-100 focus:ring-sky-500" />
                        </div>
                      </div>
                      <label className="flex items-center gap-3 cursor-pointer pt-4">
                        <input id="isPromo" type="checkbox" defaultChecked={editingService?.isPromo} className="w-6 h-6 rounded-lg text-sky-600" />
                        <span className="text-sm font-black uppercase tracking-tight">Activar Oferta</span>
                      </label>
                      <button 
                        disabled={isSaving}
                        onClick={() => {
                          const n = (document.getElementById('name') as any).value;
                          const d = (document.getElementById('desc') as any).value;
                          const p = Number((document.getElementById('price') as any).value);
                          const pp = Number((document.getElementById('promoPrice') as any).value);
                          const ip = (document.getElementById('isPromo') as any).checked;
                          handleSaveService({ id: editingService?.id || '', name: n, description: d, price: p, promoPrice: pp, isPromo: ip });
                        }}
                        className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest mt-6 hover:bg-sky-600 transition-all flex justify-center items-center gap-2"
                      >
                        {isSaving ? <RefreshCw className="animate-spin" /> : <Save />}
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(s => (
                  <div key={s.id} className="p-6 rounded-3xl border border-gray-100 hover:border-sky-200 hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-black text-gray-900 leading-tight pr-4">{s.name}</h4>
                      <div className="flex gap-1">
                        <button onClick={() => setEditingService(s)} className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg"><Edit2 size={14}/></button>
                        <button onClick={() => handleDeleteService(s.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-black tracking-tighter">S/ {s.isPromo ? s.promoPrice : s.price}</span>
                      {s.isPromo && <span className="text-xs text-gray-300 line-through">S/ {s.price}</span>}
                    </div>
                    {s.isPromo && <span className="inline-block bg-red-100 text-red-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">En Oferta</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="p-12 max-w-3xl mx-auto">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-2xl flex gap-4 mb-10">
                <AlertTriangle className="text-amber-600 shrink-0" />
                <p className="text-sm text-amber-900 font-medium">
                  Los cambios aquí actualizan instantáneamente el comportamiento de la IA. Asegúrate de que los teléfonos y horarios sean correctos.
                </p>
              </div>
              
              <div className="space-y-8">
                {[
                  { label: 'Teléfono Principal', key: 'phone' },
                  { label: 'Línea de Emergencias 24h', key: 'emergency_phone', color: 'text-red-600' },
                  { label: 'Horarios de Atención', key: 'hours' },
                  { label: 'Dirección Principal', key: 'address' }
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">{field.label}</label>
                    <input 
                      type="text" 
                      value={(localConfig as any)[field.key]}
                      onChange={e => setLocalConfig({...localConfig, [field.key]: e.target.value})}
                      className={`w-full p-5 bg-gray-50 border-none rounded-2xl font-black outline-none focus:ring-2 focus:ring-sky-500 transition-all ${field.color || 'text-gray-900'}`}
                    />
                  </div>
                ))}

                <button 
                  onClick={handleUpdateConfig}
                  disabled={isSaving}
                  className="w-full bg-gray-900 text-white py-6 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-sky-600 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-gray-900/20"
                >
                  {isSaving ? <RefreshCw className="animate-spin" /> : <Save />}
                  Actualizar Configuración Maestro
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
