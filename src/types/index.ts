export interface Location {
  name: string;
  address: string;
  city: string;
  state: string;
  coordinates?: [number, number];
}

export interface Product {
  name: string;
  description: string;
  requirements?: string[];
}

export interface Stop {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  date: Date;
  documents: string[];
  status: 'pending' | 'completed';
}

export interface Document {
  id: string;
  number: string;
  type: string;
  notes: string;
  date: Date;
  files: {
    name: string;
    url: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'document';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
}

export interface Driver {
  name: string;
  photo: string;
  phone: string;
  rating: number;
  trips: number;
  badge: 'Bronze' | 'Prata' | 'Ouro' | 'Diamante';
  status: 'Disponível' | 'Em viagem' | 'Em descanso';
  lastActivity: Date;
}

export interface Transportadora {
  name: string;
  photo: string;
  category: 'Premium' | 'Gold' | 'Silver' | 'Bronze';
  rating: number;
  totalTrips: number;
  status: 'Ativa' | 'Em análise' | 'Suspensa';
  since: Date;
  fleet: {
    total: number;
    available: number;
  };
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  uploadedBy: string;
  tags: string[];
  url: string;
}

export interface Card {
  id: string;
  code: string;
  title: string;
  origin: Location;
  destination: Location;
  status: string;
  type: string;
  weight: number;
  volume: number;
  value: number;
  product?: Product;
  stops: Stop[];
  documents: Document[];
  vehicle: {
    type: string;
    bodywork: string[];
  };
  dates: {
    pickup: Date;
    delivery: Date;
  };
  tags: string[];
  chat: ChatMessage[];
  driver?: Driver;
  transportadora?: Transportadora;
  attachments?: Attachment[];
}