import React from 'react';
import { Star, Award, Truck, Calendar, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Driver, Transportadora } from '../types';

interface ProfileInfoProps {
  type: 'driver' | 'transportadora';
  data: Driver | Transportadora;
}

export default function ProfileInfo({ type, data }: ProfileInfoProps) {
  const getBadgeColor = (badge: string) => {
    const colors = {
      Bronze: 'bg-amber-100 text-amber-800',
      Prata: 'bg-gray-100 text-gray-800',
      Ouro: 'bg-yellow-100 text-yellow-800',
      Diamante: 'bg-blue-100 text-blue-800',
      Premium: 'bg-purple-100 text-purple-800',
      Gold: 'bg-yellow-100 text-yellow-800',
      Silver: 'bg-gray-100 text-gray-800'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Disponível: 'text-green-500',
      'Em viagem': 'text-blue-500',
      'Em descanso': 'text-amber-500',
      Ativa: 'text-green-500',
      'Em análise': 'text-amber-500',
      Suspensa: 'text-red-500'
    };
    return colors[status as keyof typeof colors] || 'text-gray-500';
  };

  if (type === 'driver') {
    const driver = data as Driver;
    return (
      <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
        <img
          src={driver.photo}
          alt={driver.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-lg font-medium text-primary-dark">{driver.name}</h4>
            <span className={`px-2 py-0.5 text-xs rounded-full ${getBadgeColor(driver.badge)}`}>
              {driver.badge}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{driver.rating.toFixed(1)}/5.0</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Truck className="h-4 w-4 text-primary-medium" />
              <span>{driver.trips} viagens</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <CheckCircle2 className={`h-4 w-4 ${getStatusColor(driver.status)}`} />
              <span>{driver.status}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Calendar className="h-4 w-4 text-primary-medium" />
              <span>Última atividade: {format(new Date(driver.lastActivity), "dd/MM/yyyy", { locale: ptBR })}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const transportadora = data as Transportadora;
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
      <img
        src={transportadora.photo}
        alt={transportadora.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="text-lg font-medium text-primary-dark">{transportadora.name}</h4>
          <span className={`px-2 py-0.5 text-xs rounded-full ${getBadgeColor(transportadora.category)}`}>
            {transportadora.category}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{transportadora.rating.toFixed(1)}/5.0</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Truck className="h-4 w-4 text-primary-medium" />
            <span>{transportadora.totalTrips} viagens realizadas</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <CheckCircle2 className={`h-4 w-4 ${getStatusColor(transportadora.status)}`} />
            <span>{transportadora.status}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-4 w-4 text-primary-medium" />
            <span>Desde {format(new Date(transportadora.since), "MM/yyyy", { locale: ptBR })}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-4 text-sm text-primary-medium">
          <span>Frota total: {transportadora.fleet.total}</span>
          <span>•</span>
          <span>Veículos disponíveis: {transportadora.fleet.available}</span>
        </div>
      </div>
    </div>
  );
}