// Update chat examples with more realistic document attachments
export const chatExamples = {
  negotiation: [
    {
      id: 'msg-1',
      sender: 'Transportadora Express',
      senderType: 'transportadora',
      senderPhoto: 'https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?w=150',
      content: 'Bom dia! Temos interesse na carga SP → RJ. Qual o valor base para negociação?',
      timestamp: new Date(),
      type: 'text',
      status: 'read'
    },
    {
      id: 'msg-2',
      sender: 'João Silva',
      senderType: 'motorista',
      senderPhoto: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150',
      content: 'Segue CNH e documentos do veículo para análise.',
      timestamp: new Date(),
      type: 'document',
      fileName: 'CNH_Joao_Silva.pdf',
      fileSize: 2500000,
      fileUrl: '/docs/cnh.pdf',
      status: 'read'
    },
    {
      id: 'msg-3',
      sender: 'João Silva',
      senderType: 'motorista',
      senderPhoto: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150',
      content: 'CRLV_Truck_ABC1234.pdf',
      timestamp: new Date(),
      type: 'document',
      fileName: 'CRLV_Truck_ABC1234.pdf',
      fileSize: 1800000,
      fileUrl: '/docs/crlv.pdf',
      status: 'read'
    }
  ],
  loading: [
    {
      id: 'msg-4',
      sender: 'João Silva',
      senderType: 'motorista',
      senderPhoto: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150',
      content: 'Carregamento iniciado. Segue foto da carga.',
      timestamp: new Date(),
      type: 'image',
      fileName: 'Foto_Carregamento.jpg',
      fileSize: 3500000,
      fileUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      status: 'read'
    },
    {
      id: 'msg-5',
      sender: 'João Silva',
      senderType: 'motorista',
      senderPhoto: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150',
      content: 'Nota fiscal assinada em anexo.',
      timestamp: new Date(),
      type: 'document',
      fileName: 'NF_12345_Assinada.pdf',
      fileSize: 1200000,
      fileUrl: '/docs/nf.pdf',
      status: 'read'
    }
  ]
};