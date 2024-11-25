export const chatTemplates = {
  offer: [
    {
      sender: 'Sistema',
      content: 'Nova carga cadastrada no sistema.',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Carga disponível para cotação. Interessados favor entrar em contato.',
      type: 'text'
    }
  ],
  broadcast: [
    {
      sender: 'Transportadora',
      content: 'Temos interesse. Qual o valor base para negociação?',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Valor base é R$ 4.500,00. Podemos negociar.',
      type: 'text'
    }
  ],
  negotiation: [
    {
      sender: 'Transportadora',
      content: 'Conseguimos fazer por R$ 4.200,00. Temos veículo disponível na região.',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Fechamos por R$ 4.300,00 com adiantamento de 30%. Pode ser?',
      type: 'text'
    },
    {
      sender: 'Transportadora',
      content: 'Acordo fechado. Enviarei os documentos do veículo e motorista.',
      type: 'text'
    }
  ],
  documentation: [
    {
      sender: 'Sistema',
      content: 'Aguardando documentação do motorista e veículo.',
      type: 'text'
    },
    {
      sender: 'Transportadora',
      content: 'Documentos enviados: CNH, CRLV e Seguro.',
      type: 'document'
    },
    {
      sender: 'Operador',
      content: 'Documentos recebidos. Em análise.',
      type: 'text'
    }
  ],
  risk: [
    {
      sender: 'Sistema',
      content: 'Análise de risco em andamento.',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Documentação aprovada. Gerando contrato.',
      type: 'text'
    }
  ],
  contract: [
    {
      sender: 'Operador',
      content: 'Contrato enviado para assinatura.',
      type: 'document'
    },
    {
      sender: 'Transportadora',
      content: 'Contrato assinado e enviado.',
      type: 'document'
    }
  ],
  loading: [
    {
      sender: 'Motorista',
      content: 'Cheguei ao local de carregamento.',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Confirmado. Pode iniciar o carregamento.',
      type: 'text'
    },
    {
      sender: 'Motorista',
      content: 'Carregamento finalizado. Nota fiscal conferida.',
      type: 'text'
    }
  ],
  transit: [
    {
      sender: 'Motorista',
      content: 'Em trânsito. Previsão de chegada conforme programado.',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Recebido. Mantenha-nos informados.',
      type: 'text'
    },
    {
      sender: 'Sistema',
      content: 'Localização atualizada: BR-116, km 432',
      type: 'text'
    }
  ],
  unloading: [
    {
      sender: 'Motorista',
      content: 'Chegamos ao destino. Aguardando autorização para descarga.',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Autorizado. Pode iniciar a descarga.',
      type: 'text'
    },
    {
      sender: 'Motorista',
      content: 'Descarga finalizada. Canhoto assinado.',
      type: 'document'
    }
  ],
  completed: [
    {
      sender: 'Sistema',
      content: 'Entrega concluída com sucesso.',
      type: 'text'
    },
    {
      sender: 'Cliente',
      content: 'Mercadoria recebida em perfeitas condições.',
      type: 'text'
    },
    {
      sender: 'Operador',
      content: 'Ótimo! Processo finalizado. Pagamento será liberado em 24h.',
      type: 'text'
    }
  ]
};