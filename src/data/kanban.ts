import { Card } from '../types';
import { chatExamples } from './chat-examples';

export const columns = [
  { id: 'offer', title: 'Oferta de Cargas', color: 'bg-blue-100' },
  { id: 'broadcast', title: 'Divulgação', color: 'bg-purple-100' },
  { id: 'negotiation', title: 'Em Negociação', color: 'bg-yellow-100' },
  { id: 'documentation', title: 'Documentação', color: 'bg-orange-100' },
  { id: 'risk', title: 'Análise de Risco', color: 'bg-red-100' },
  { id: 'contract', title: 'Contratação', color: 'bg-green-100' },
  { id: 'loading', title: 'Carregamento', color: 'bg-teal-100' },
  { id: 'transit', title: 'Em Trânsito', color: 'bg-cyan-100' },
  { id: 'unloading', title: 'Descarregamento', color: 'bg-indigo-100' },
  { id: 'completed', title: 'Concluído', color: 'bg-gray-100' }
];

const defaultDriver = {
  name: 'João Silva',
  photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150',
  phone: '(11) 98765-4321',
  rating: 4.8,
  trips: 342,
  badge: 'Ouro' as const,
  status: 'Disponível' as const,
  lastActivity: new Date()
};

const defaultTransportadora = {
  name: 'Transportadora Express',
  photo: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=150',
  category: 'Premium' as const,
  rating: 4.9,
  totalTrips: 1250,
  status: 'Ativa' as const,
  since: new Date('2020-01-01'),
  fleet: {
    total: 45,
    available: 12
  }
};

export const initialCards: Record<string, Card[]> = {
  offer: [
    {
      id: 'card-1',
      code: 'CARGA-001',
      title: 'Carga São Paulo → Rio de Janeiro',
      origin: {
        name: 'CD São Paulo',
        address: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        coordinates: [-46.6333, -23.5505]
      },
      destination: {
        name: 'CD Rio',
        address: 'Av. Brasil, 500',
        city: 'Rio de Janeiro',
        state: 'RJ',
        coordinates: [-43.1729, -22.9068]
      },
      status: 'Nova oferta',
      type: 'Carga Completa',
      weight: 12000,
      volume: 45,
      value: 3800,
      product: {
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos diversos',
        requirements: ['Ambiente seco', 'Temperatura controlada']
      },
      stops: [],
      documents: [],
      vehicle: {
        type: 'Truck',
        bodywork: ['Baú']
      },
      dates: {
        pickup: new Date('2024-03-20'),
        delivery: new Date('2024-03-21')
      },
      tags: ['Carga Geral'],
      chat: [],
      attachments: []
    }
  ],
  negotiation: [
    {
      id: 'card-2',
      code: 'CARGA-002',
      title: 'Carga Campinas → Santos',
      origin: {
        name: 'CD Campinas',
        address: 'Rod. Anhanguera, 500',
        city: 'Campinas',
        state: 'SP',
        coordinates: [-47.0626, -22.9064]
      },
      destination: {
        name: 'Porto de Santos',
        address: 'Av. Portuária, 100',
        city: 'Santos',
        state: 'SP',
        coordinates: [-46.3333, -23.9537]
      },
      status: 'Em negociação',
      type: 'Carga Completa',
      weight: 15000,
      volume: 55,
      value: 4200,
      product: {
        name: 'Produtos Químicos',
        description: 'Produtos químicos não perigosos',
        requirements: ['Licença ANTT', 'Seguro especial']
      },
      stops: [],
      documents: [],
      vehicle: {
        type: 'Carreta',
        bodywork: ['Tanque']
      },
      dates: {
        pickup: new Date('2024-03-21'),
        delivery: new Date('2024-03-22')
      },
      tags: ['Produtos Químicos', 'Exportação'],
      chat: chatExamples.negotiation,
      driver: defaultDriver,
      transportadora: defaultTransportadora,
      attachments: [
        {
          id: 'att-1',
          name: 'CNH_Joao_Silva.pdf',
          type: 'pdf',
          size: 2500000,
          uploadedAt: new Date(),
          uploadedBy: 'João Silva',
          tags: ['Documentação', 'CNH'],
          url: '/docs/cnh.pdf'
        },
        {
          id: 'att-2',
          name: 'CRLV_Truck_ABC1234.pdf',
          type: 'pdf',
          size: 1800000,
          uploadedAt: new Date(),
          uploadedBy: 'João Silva',
          tags: ['Documentação', 'CRLV'],
          url: '/docs/crlv.pdf'
        }
      ]
    }
  ],
  documentation: [
    {
      id: 'card-3',
      code: 'CARGA-003',
      title: 'Carga Curitiba → Florianópolis',
      origin: {
        name: 'CD Curitiba',
        address: 'Av. das Torres, 800',
        city: 'Curitiba',
        state: 'PR',
        coordinates: [-49.2731, -25.4195]
      },
      destination: {
        name: 'CD Florianópolis',
        address: 'Rod. SC-401, 200',
        city: 'Florianópolis',
        state: 'SC',
        coordinates: [-48.5482, -27.5945]
      },
      status: 'Docs pendentes',
      type: 'Carga Fracionada',
      weight: 8000,
      volume: 30,
      value: 2800,
      product: {
        name: 'Alimentos Refrigerados',
        description: 'Produtos alimentícios que necessitam refrigeração',
        requirements: ['Refrigeração', 'Controle de temperatura']
      },
      stops: [],
      documents: [],
      vehicle: {
        type: 'Truck',
        bodywork: ['Baú Refrigerado']
      },
      dates: {
        pickup: new Date('2024-03-22'),
        delivery: new Date('2024-03-23')
      },
      tags: ['Refrigerado', 'Alimentos'],
      chat: [
        {
          id: 'msg-1',
          sender: 'Sistema',
          content: 'Aguardando documentação do motorista e veículo.',
          timestamp: new Date(),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-2',
          sender: 'Transportadora Express',
          content: 'Enviando documentação solicitada.',
          timestamp: new Date(),
          type: 'text',
          status: 'read'
        },
        {
          id: 'msg-3',
          sender: 'Transportadora Express',
          content: 'Certificado do Curso MOPP',
          timestamp: new Date(),
          type: 'document',
          fileName: 'Certificado_MOPP.pdf',
          fileSize: 1500000,
          fileUrl: '/docs/mopp.pdf',
          status: 'read'
        }
      ],
      driver: {
        ...defaultDriver,
        name: 'Pedro Santos',
        photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
        badge: 'Diamante'
      },
      transportadora: defaultTransportadora,
      attachments: [
        {
          id: 'att-3',
          name: 'Certificado_MOPP.pdf',
          type: 'pdf',
          size: 1500000,
          uploadedAt: new Date(),
          uploadedBy: 'Pedro Santos',
          tags: ['Documentação', 'MOPP'],
          url: '/docs/mopp.pdf'
        }
      ]
    }
  ],
  loading: [
    {
      id: 'card-4',
      code: 'CARGA-004',
      title: 'Carga Belo Horizonte → São Paulo',
      origin: {
        name: 'CD Belo Horizonte',
        address: 'Av. Amazonas, 2000',
        city: 'Belo Horizonte',
        state: 'MG',
        coordinates: [-43.9346, -19.9208]
      },
      destination: {
        name: 'CD São Paulo',
        address: 'Rod. Anhanguera, 1000',
        city: 'São Paulo',
        state: 'SP',
        coordinates: [-46.6333, -23.5505]
      },
      status: 'Em carregamento',
      type: 'Carga Completa',
      weight: 14000,
      volume: 50,
      value: 4500,
      product: {
        name: 'Autopeças',
        description: 'Peças automotivas diversas',
        requirements: ['Cuidado especial', 'Amarração adequada']
      },
      stops: [],
      documents: [],
      vehicle: {
        type: 'Carreta',
        bodywork: ['Sider']
      },
      dates: {
        pickup: new Date('2024-03-24'),
        delivery: new Date('2024-03-25')
      },
      tags: ['Autopeças', 'Prioritário'],
      chat: chatExamples.loading,
      driver: {
        ...defaultDriver,
        name: 'Carlos Oliveira',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        badge: 'Prata'
      },
      transportadora: defaultTransportadora,
      attachments: [
        {
          id: 'att-4',
          name: 'Foto_Carregamento.jpg',
          type: 'image',
          size: 3500000,
          uploadedAt: new Date(),
          uploadedBy: 'Carlos Oliveira',
          tags: ['Foto', 'Carregamento'],
          url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'
        },
        {
          id: 'att-5',
          name: 'NF_12345_Assinada.pdf',
          type: 'pdf',
          size: 1200000,
          uploadedAt: new Date(),
          uploadedBy: 'Carlos Oliveira',
          tags: ['Documentação', 'Nota Fiscal'],
          url: '/docs/nf.pdf'
        }
      ]
    }
  ],
  transit: [],
  unloading: [],
  completed: []
};