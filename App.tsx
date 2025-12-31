import React, { useState, useEffect } from 'react';
import { View, Service, ClinicConfig } from './types';
import { databaseService } from './services/databaseService';
import PublicLanding from './components/PublicLanding';
import AdminDashboard from './components/AdminDashboard';
import AuthScreen from './components/AuthScreen';
import { auth } from './services/firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { INITIAL_SERVICES, INITIAL_CONFIG } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.PUBLIC);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [config, setConfig] = useState<ClinicConfig | null>(INITIAL_CONFIG);
  const [user, setUser] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Intentamos inicializar pero con un timeout implícito si falla la conexión
        await databaseService.seedDatabase();
        const [s, c] = await Promise.all([
          databaseService.getServices(),
          databaseService.getConfig()
        ]);
        if (s.length > 0) setServices(s);
        if (c) setConfig(c);
      } catch (error) {
        console.warn("Firebase no configurado o error de red. Usando datos locales por defecto.");
      }
    };
    loadData();
  }, []);

  const refreshData = async () => {
    try {
      const [s, c] = await Promise.all([
        databaseService.getServices(),
        databaseService.getConfig()
      ]);
      setServices(s);
      setConfig(c);
    } catch (e) {
      console.error("Error al refrescar datos:", e);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentView(View.PUBLIC);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-600">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          <p className="text-white font-bold animate-pulse">Iniciando Dental Premium...</p>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case View.PUBLIC:
        return (
          <PublicLanding 
            services={services} 
            config={config} 
            onAdminAccess={() => setCurrentView(user ? View.ADMIN_DASHBOARD : View.ADMIN_LOGIN)} 
          />
        );
      case View.ADMIN_LOGIN:
        return (
          <AuthScreen 
            onLogin={() => setCurrentView(View.ADMIN_DASHBOARD)} 
            onBack={() => setCurrentView(View.PUBLIC)}
          />
        );
      case View.ADMIN_DASHBOARD:
        if (!user) {
          setCurrentView(View.ADMIN_LOGIN);
          return null;
        }
        return (
          <AdminDashboard 
            services={services} 
            config={config} 
            onRefresh={refreshData}
            onLogout={handleLogout}
          />
        );
      default:
        return <PublicLanding services={services} config={config} onAdminAccess={() => setCurrentView(View.ADMIN_LOGIN)} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;



















/*
import React, { useState, useEffect } from 'react';
import { View, Service, ClinicConfig } from './types';
import { databaseService } from './services/databaseService';
import PublicLanding from './components/PublicLanding';
import AdminDashboard from './components/AdminDashboard';
import AuthScreen from './components/AuthScreen';
import { auth } from './services/firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.PUBLIC);
  const [services, setServices] = useState<Service[]>([]);
  const [config, setConfig] = useState<ClinicConfig | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Escuchar estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  // Carga inicial de datos reales
  useEffect(() => {
    const loadData = async () => {
      // Intentamos inicializar si la base de datos está vacía
      await databaseService.seedDatabase();
      
      const [s, c] = await Promise.all([
        databaseService.getServices(),
        databaseService.getConfig()
      ]);
      setServices(s);
      setConfig(c);
    };
    loadData();
  }, []);

  const refreshData = async () => {
    const [s, c] = await Promise.all([
      databaseService.getServices(),
      databaseService.getConfig()
    ]);
    setServices(s);
    setConfig(c);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentView(View.PUBLIC);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sky-600">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case View.PUBLIC:
        return (
          <PublicLanding 
            services={services} 
            config={config} 
            onAdminAccess={() => setCurrentView(user ? View.ADMIN_DASHBOARD : View.ADMIN_LOGIN)} 
          />
        );
      case View.ADMIN_LOGIN:
        return (
          <AuthScreen 
            onLogin={() => setCurrentView(View.ADMIN_DASHBOARD)} 
            onBack={() => setCurrentView(View.PUBLIC)}
          />
        );
      case View.ADMIN_DASHBOARD:
        if (!user) {
          setCurrentView(View.ADMIN_LOGIN);
          return null;
        }
        return (
          <AdminDashboard 
            services={services} 
            config={config} 
            onRefresh={refreshData}
            onLogout={handleLogout}
          />
        );
      default:
        return <PublicLanding services={services} config={config} onAdminAccess={() => setCurrentView(View.ADMIN_LOGIN)} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
    </div>
  );
};

export default App;
*/