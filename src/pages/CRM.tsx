import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Building2,
  Truck,
  Phone,
  Mail,
  MapPin,
  Package,
  CircleDollarSign,
  BarChart3,
  Search,
  Plus,
  Filter,
  ArrowLeft,
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Card, Metric, Text, AreaChart, BarChart, DonutChart, Flex, Grid, Title } from '@tremor/react';

const customers = [
  {
    id: 1,
    name: 'Transportadora Silva',
    type: 'Transportadora',
    status: 'Ativo',
    city: 'São Paulo',
    state: 'SP',
    lastOrder: '2024-03-18',
    revenue: 125000,
    orders: 45,
    rating: 4.8,
    contacts: [
      { name: 'João Silva', role: 'Diretor', phone: '(11) 98765-4321', email: 'joao@silva.com' }
    ],
    recentActivity: [
      { type: 'message', content: 'Confirmação de entrega #4532', date: '2024-03-19T14:30:00' },
      { type: 'order', content: 'Nova carga registrada #4533', date: '2024-03-19T10:15:00' }
    ]
  },
  {
    id: 2,
    name: 'Express Logística',
    type: 'Operador Logístico',
    status: 'Ativo',
    city: 'Campinas',
    state: 'SP',
    lastOrder: '2024-03-19',
    revenue: 89000,
    orders: 32,
    rating: 4.5,
    contacts: [
      { name: 'Maria Santos', role: 'Gerente Operacional', phone: '(19) 98765-4321', email: 'maria@express.com' }
    ],
    recentActivity: [
      { type: 'message', content: 'Solicitação de cotação', date: '2024-03-19T15:45:00' },
      { type: 'order', content: 'Entrega finalizada #4531', date: '2024-03-18T16:20:00' }
    ]
  }
];

const metrics = {
  activeCustomers: 156,
  newCustomers: 12,
  averageOrderValue: 4500,
  customerSatisfaction: 94.5
};

const revenueData = [
  { date: 'Jan', value: 125000 },
  { date: 'Fev', value: 145000 },
  { date: 'Mar', value: 158000 }
];

const customerTypeData = [
  { type: 'Transportadora', value: 45 },
  { type: 'Operador Logístico', value: 30 },
  { type: 'Embarcador', value: 25 }
];

export default function CRM() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar ao Kanban
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/analytics')}
                className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                Dashboard
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="h-5 w-5 mr-2" />
                Novo Cliente
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card decoration="top" decorationColor="blue">
            <Flex>
              <div>
                <Text>Clientes Ativos</Text>
                <Metric>{metrics.activeCustomers}</Metric>
              </div>
              <Users className="h-12 w-12 text-blue-500" />
            </Flex>
          </Card>
          
          <Card decoration="top" decorationColor="green">
            <Flex>
              <div>
                <Text>Novos Clientes (Mês)</Text>
                <Metric>{metrics.newCustomers}</Metric>
              </div>
              <Plus className="h-12 w-12 text-green-500" />
            </Flex>
          </Card>
          
          <Card decoration="top" decorationColor="amber">
            <Flex>
              <div>
                <Text>Ticket Médio</Text>
                <Metric>R$ {metrics.averageOrderValue}</Metric>
              </div>
              <CircleDollarSign className="h-12 w-12 text-amber-500" />
            </Flex>
          </Card>
          
          <Card decoration="top" decorationColor="indigo">
            <Flex>
              <div>
                <Text>Satisfação</Text>
                <Metric>{metrics.customerSatisfaction}%</Metric>
              </div>
              <CheckCircle2 className="h-12 w-12 text-indigo-500" />
            </Flex>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <Card className="lg:col-span-2">
            <Title>Receita por Cliente</Title>
            <AreaChart
              className="h-64 mt-4"
              data={revenueData}
              index="date"
              categories={['value']}
              colors={['blue']}
              valueFormatter={(value) => `R$ ${value.toLocaleString()}`}
            />
          </Card>
          
          <Card>
            <Title>Distribuição por Tipo</Title>
            <DonutChart
              className="h-64 mt-4"
              data={customerTypeData}
              category="value"
              index="type"
              colors={['blue', 'cyan', 'indigo']}
              valueFormatter={(value) => `${value}%`}
            />
          </Card>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Clientes
              </h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar clientes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Filter className="h-5 w-5 mr-2" />
                  Filtros
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <div
                key={customer.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedCustomer(customer.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="text-lg font-medium text-gray-900 mr-3">
                        {customer.name}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {customer.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Building2 className="h-4 w-4 mr-2" />
                        {customer.type}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2" />
                        {customer.city}, {customer.state}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2" />
                        Último pedido: {new Date(customer.lastOrder).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Package className="h-4 w-4 mr-2" />
                        {customer.orders} pedidos
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <CircleDollarSign className="h-5 w-5 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          R$ {customer.revenue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          {customer.rating} / 5.0
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-6">
                    <div className="flex space-x-3">
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <Mail className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-500">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Atividade Recente
                  </h5>
                  <div className="space-y-2">
                    {customer.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-gray-600">{activity.content}</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-500">
                          {new Date(activity.date).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}