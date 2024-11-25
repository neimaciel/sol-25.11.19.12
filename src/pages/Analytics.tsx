import React from 'react';
import { Card, Title, BarChart, DonutChart, AreaChart, Text, Flex, Grid } from '@tremor/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const deliveryData = [
  {
    date: '2024-01',
    'No Prazo': 156,
    'Atrasadas': 12,
    'Antecipadas': 34,
  },
  {
    date: '2024-02',
    'No Prazo': 178,
    'Atrasadas': 8,
    'Antecipadas': 42,
  },
  {
    date: '2024-03',
    'No Prazo': 184,
    'Atrasadas': 15,
    'Antecipadas': 36,
  },
];

const vehicleDistribution = [
  {
    name: 'Truck',
    value: 45,
  },
  {
    name: 'Carreta',
    value: 35,
  },
  {
    name: 'Bitrem',
    value: 20,
  },
];

const routePerformance = [
  {
    route: 'SP → RJ',
    performance: 92,
  },
  {
    route: 'PR → SC',
    performance: 88,
  },
  {
    route: 'MG → SP',
    performance: 95,
  },
  {
    route: 'BA → PE',
    performance: 85,
  },
  {
    route: 'RS → PR',
    performance: 90,
  },
];

export default function Analytics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar ao Kanban
          </button>
          <img src="/logo.png" alt="Logo" className="h-8" />
        </div>

        <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
          <Card>
            <Title>Entregas por Mês</Title>
            <AreaChart
              className="h-72 mt-4"
              data={deliveryData}
              index="date"
              categories={['No Prazo', 'Atrasadas', 'Antecipadas']}
              colors={['emerald', 'red', 'blue']}
            />
          </Card>

          <Card>
            <Title>Distribuição de Veículos</Title>
            <DonutChart
              className="h-72 mt-4"
              data={vehicleDistribution}
              category="value"
              index="name"
              colors={['blue', 'cyan', 'indigo']}
            />
          </Card>

          <Card>
            <Title>Performance por Rota</Title>
            <BarChart
              className="h-72 mt-4"
              data={routePerformance}
              index="route"
              categories={['performance']}
              colors={['blue']}
            />
          </Card>

          <Card>
            <Title>Métricas Gerais</Title>
            <div className="mt-4 space-y-6">
              <Flex>
                <Text>Taxa de Entrega no Prazo</Text>
                <Text>94%</Text>
              </Flex>
              <Flex>
                <Text>Satisfação do Cliente</Text>
                <Text>4.8/5.0</Text>
              </Flex>
              <Flex>
                <Text>Tempo Médio de Entrega</Text>
                <Text>2.3 dias</Text>
              </Flex>
              <Flex>
                <Text>Custo por Km</Text>
                <Text>R$ 3,45</Text>
              </Flex>
            </div>
          </Card>
        </Grid>
      </div>
    </div>
  );
}