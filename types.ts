
export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
  isPromo: boolean;
  promoPrice?: number;
}

export interface LocationInfo {
  id: string;
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
}

export interface ClinicConfig {
  phone: string;
  emergency_phone: string;
  address: string;
  hours: string;
  email: string;
  vision: string;
  mision: string;
  valores: string;
  calidad: string;
  locations: LocationInfo[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  sessionId: string;
  createdAt: number;
  status: 'open' | 'closed';
  messages: Message[];
}

export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  locationId: string;
  date: string;
  time: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: number;
}

export enum View {
  PUBLIC = 'public',
  ADMIN_LOGIN = 'admin-login',
  ADMIN_DASHBOARD = 'admin-dashboard'
}
