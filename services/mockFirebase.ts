
import { Service, ClinicConfig, ChatSession, Message, Appointment } from '../types';
import { INITIAL_SERVICES, INITIAL_CONFIG } from '../constants';

class FirebaseMock {
  private services: Service[] = [...INITIAL_SERVICES];
  private config: ClinicConfig = { ...INITIAL_CONFIG };
  private chats: Record<string, ChatSession> = {};
  private appointments: Appointment[] = [];
  
  // Simulated Admin Collection
  private admins = [
    { email: 'admin@dentalpremium.com', password: 'admin123', role: 'root' }
  ];

  async validateAdmin(email: string, pass: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const found = this.admins.find(a => a.email === email && a.password === pass);
        resolve(!!found);
      }, 500);
    });
  }

  // Services CRUD
  async getServices(): Promise<Service[]> {
    return new Promise((resolve) => setTimeout(() => resolve(this.services), 300));
  }

  async updateService(service: Service): Promise<void> {
    const index = this.services.findIndex(s => s.id === service.id);
    if (index !== -1) {
      this.services[index] = service;
    }
  }

  async addService(service: Omit<Service, 'id'>): Promise<void> {
    this.services.push({ ...service, id: Math.random().toString(36).substr(2, 9) });
  }

  async deleteService(id: string): Promise<void> {
    this.services = this.services.filter(s => s.id !== id);
  }

  // Clinic Config
  async getConfig(): Promise<ClinicConfig> {
    return new Promise((resolve) => setTimeout(() => resolve(this.config), 200));
  }

  async updateConfig(newConfig: ClinicConfig): Promise<void> {
    this.config = { ...newConfig };
  }

  // Chats
  async createChatSession(id: string): Promise<ChatSession> {
    const session: ChatSession = {
      sessionId: id,
      createdAt: Date.now(),
      status: 'open',
      messages: []
    };
    this.chats[id] = session;
    return session;
  }

  async addMessage(sessionId: string, message: Message): Promise<void> {
    if (!this.chats[sessionId]) {
      await this.createChatSession(sessionId);
    }
    this.chats[sessionId].messages.push(message);
  }

  async getChatHistory(sessionId: string): Promise<Message[]> {
    return this.chats[sessionId]?.messages || [];
  }

  // Appointments
  async getAppointments(): Promise<Appointment[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...this.appointments].sort((a, b) => b.createdAt - a.createdAt)), 300));
  }

  async addAppointment(data: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<void> {
    const newAppointment: Appointment = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: Date.now(),
      status: 'pending'
    };
    this.appointments.push(newAppointment);
  }

  async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<void> {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index].status = status;
    }
  }

  async deleteAppointment(id: string): Promise<void> {
    this.appointments = this.appointments.filter(a => a.id !== id);
  }
}

export const firebaseMock = new FirebaseMock();
