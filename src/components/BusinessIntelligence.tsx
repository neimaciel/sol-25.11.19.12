import React, { useState } from 'react';
import { Card, Title, AreaChart, DonutChart, BarChart, Text, Flex, Select, SelectItem } from '@tremor/react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const customColors = {
  delivery: {
    onTime: '#006494',    // primary.main
    late: '#DC2626',      // red.600
    early: '#1B98E0'      // primary.light
  },
  performance: {
    route: ['#006494', '#1B98E0', '#4FB3E8', '#89CEF0', '#C3E6F7'] // primary blues
  },
  vehicle: {
    distribution: ['#13293D', '#006494', '#247BA0', '#1B98E0', '#E8F1F2'] // primary variations
  },
  metrics: {
    positive: '#10B981', // green
    negative: '#EF4444', // red
    neutral: '#6B7280'   // gray
  }
};

const deliveryData = [
  {
    date: format(new Date(), 'MMM', { locale: ptBR }),
    'No Prazo': 156,
    'Atrasadas': 12,
    'Antecipadas': 34,
  },
  {
    date: format(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'MMM', { locale: ptBR }),
    'No Prazo': 178,
    'Atrasadas': 8,
    'Antecipadas': 42,
  },
  {
    date: format(new Date(new Date().setMonth(new Date().getMonth() - 2)), 'MMM', { locale: ptBR }),
    'No Prazo': 184,
    'Atrasadas': 15,
    'Antecipadas': 36,
  },
];

const vehicleDistribution = [
  { name: 'Truck', value: 45 },
  { name: 'Carreta', value: 35 },
  { name: 'Bitrem', value: 20 },
];

const routePerformance = [
  { route: 'SP → RJ', performance: 92 },
  { route: 'PR → SC', performance: 88 },
  { route: 'MG → SP', performance: 95 },
  { route: 'BA → PE', performance: 85 },
  { route: 'RS → PR', performance: 90 },
];

export default function BusinessIntelligence() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  return (
    <div className="p-6 bg-gray-50 border-t border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary-dark">Visão Geral das Operações</h2>
        <Select 
          value={selectedPeriod}
          onValueChange={setSelectedPeriod}
          className="max-w-xs"
        >
          <SelectItem value="today">Hoje</SelectItem>
          <SelectItem value="week">Esta Semana</SelectItem>
          <SelectItem value="month">Este Mês</SelectItem>
          <SelectItem value="quarter">Este Trimestre</SelectItem>
          <SelectItem value="year">Este Ano</SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <Title>Entregas por Período</Title>
          <AreaChart
            className="h-72 mt-4"
            data={deliveryData}
            index="date"
            categories={['No Prazo', 'Atrasadas', 'Antecipadas']}
            colors={[
              customColors.delivery.onTime,
              customColors.delivery.late,
              customColors.delivery.early
            ]}
            valueFormatter={(value) => value.toString()}
            showLegend
            showGridLines
            showAnimation
          />
        </Card>

        <Card>
          <Title>Distribuição de Veículos</Title>
          <DonutChart
            className="h-72 mt-4"
            data={vehicleDistribution}
            category="value"
            index="name"
            colors={customColors.vehicle.distribution}
            valueFormatter={(value) => `${value}%`}
            showAnimation
            showTooltip
          />
        </Card>

        <Card className="lg:col-span-2">
          <Title>Performance por Rota</Title>
          <BarChart
            className="h-72 mt-4"
            data={routePerformance}
            index="route"
            categories={['performance']}
            colors={[customColors.performance.route[0]]}
            valueFormatter={(value) => `${value}%`}
            showLegend
            showGridLines
            showAnimation
          />
        </Card>

        <Card>
          <Title>Métricas Gerais</Title>
          <div className="mt-4 space-y-6">
            <Flex>
              <Text>Taxa de Entrega no Prazo</Text>
              <Text className="text-primary-dark font-medium">94%</Text>
            </Flex>
            <Flex>
              <Text>Satisfação do Cliente</Text>
              <Text className="text-primary-dark font-medium">4.8/5.0</Text>
            </Flex>
            <Flex>
              <Text>Tempo Médio de Entrega</Text>
              <Text className="text-primary-dark font-medium">2.3 dias</Text>
            </Flex>
            <Flex>
              <Text>Custo por Km</Text>
              <Text className="text-primary-dark font-medium">R$ 3,45</Text>
            </Flex>
          </div>
        </Card>
      </div>
    </div>
  );
}