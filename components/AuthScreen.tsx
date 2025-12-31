import React, { useState } from 'react';
import { Lock, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

interface AuthScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err: any) {
      console.error("Auth Error:", err);
      let errorMsg = 'Error al iniciar sesión.';
      if (err.code === 'auth/invalid-credential') errorMsg = 'Credenciales inválidas.';
      if (err.code === 'auth/user-not-found') errorMsg = 'Usuario no encontrado.';
      if (err.code === 'auth/wrong-password') errorMsg = 'Contraseña incorrecta.';
      
      setError(errorMsg + ' Verifica tu configuración en Firebase Console.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-12 relative">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-2 text-gray-400 hover:text-sky-600 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-10">
          <div className="bg-sky-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-sky-600 h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Acceso Admin</h2>
          <p className="text-gray-500 mt-2 font-medium">Solo personal autorizado de Dental Premium</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Corporativo</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dentalpremium.com"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Contraseña</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all font-bold"
                required
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-gray-900/30 hover:bg-sky-600 transform active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Entrar al Panel'}
          </button>
        </form>

        <p className="mt-10 text-center text-xs text-gray-400 font-medium">
          Acceso seguro mediante Firebase Auth.
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;






















/*
import React, { useState } from 'react';
import { Lock, ArrowLeft, Loader2, ShieldCheck } from 'lucide-react';
import { firebaseMock } from '../services/mockFirebase';

interface AuthScreenProps {
  onLogin: () => void;
  onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const isValid = await firebaseMock.validateAdmin(email, password);
    
    if (isValid) {
      onLogin();
    } else {
      setError('Credenciales inválidas. Verifica tus datos en la base de datos de administradores.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden p-8 sm:p-12 relative">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 p-2 text-gray-400 hover:text-sky-600 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-center mb-10">
          <div className="bg-sky-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="text-sky-600 h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Acceso Admin</h2>
          <p className="text-gray-500 mt-2 font-medium">Solo personal autorizado de Dental Premium</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email Corporativo</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@dentalpremium.com"
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all font-bold"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Contraseña</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all font-bold"
                required
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-gray-900/30 hover:bg-sky-600 transform active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Entrar al Panel'}
          </button>
        </form>

        <p className="mt-10 text-center text-xs text-gray-400 font-medium">
          Acceso seguro y encriptado.
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
*/