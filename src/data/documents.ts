export const requiredDocuments = {
  vehicle: [
    {
      type: 'CRLV',
      description: 'Certificado de Registro e Licenciamento do Veículo',
      required: true
    },
    {
      type: 'AET',
      description: 'Autorização Especial de Trânsito',
      required: false,
      conditions: ['Carga excedente', 'Produtos perigosos']
    },
    {
      type: 'MOPP',
      description: 'Movimentação Operacional de Produtos Perigosos',
      required: false,
      conditions: ['Produtos perigosos']
    }
  ],
  driver: [
    {
      type: 'CNH',
      description: 'Carteira Nacional de Habilitação',
      required: true,
      categories: ['C', 'D', 'E']
    },
    {
      type: 'Curso MOPP',
      description: 'Certificado do Curso MOPP',
      required: false,
      conditions: ['Produtos perigosos']
    }
  ],
  cargo: [
    {
      type: 'CTE',
      description: 'Conhecimento de Transporte Eletrônico',
      required: true
    },
    {
      type: 'NF-e',
      description: 'Nota Fiscal Eletrônica',
      required: true
    },
    {
      type: 'MDF-e',
      description: 'Manifesto Eletrônico de Documentos Fiscais',
      required: true,
      conditions: ['Transporte interestadual']
    },
    {
      type: 'Declaração de Carga',
      description: 'Descrição detalhada da carga',
      required: true
    }
  ],
  insurance: [
    {
      type: 'RCTR-C',
      description: 'Seguro de Responsabilidade Civil do Transportador Rodoviário de Carga',
      required: true
    },
    {
      type: 'RCF-DC',
      description: 'Seguro de Responsabilidade Civil Facultativa por Desaparecimento de Carga',
      required: false,
      recommended: true
    }
  ]
};