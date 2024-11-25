import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { 
  MapPin, 
  Calendar, 
  Package, 
  Truck, 
  CircleDollarSign, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  Clock,
  AlertTriangle,
  FileText,
  User,
  Phone
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card } from '../types';
import CardModal from './CardModal';

interface KanbanCardProps {
  card: Card;
  index: number;
}

export default function KanbanCard({ card, index }: KanbanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    const colors = {
      'Nova oferta': 'bg-blue-100 text-blue-800',
      'Em divulgação': 'bg-purple-100 text-purple-800',
      'Em negociação': 'bg-yellow-100 text-yellow-800',
      'Docs pendentes': 'bg-orange-100 text-orange-800',
      'Em análise': 'bg-red-100 text-red-800',
      'Contratação': 'bg-green-100 text-green-800',
      'Em carregamento': 'bg-teal-100 text-teal-800',
      'Em trânsito': 'bg-cyan-100 text-cyan-800',
      'Descarregando': 'bg-indigo-100 text-indigo-800',
      'Concluído': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="bg-white rounded-lg shadow-sm border border-primary-pale p-4 hover:shadow-md transition-shadow"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary-medium">{card.code}</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(card.status)}`}>
                    {card.status}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-primary-dark">{card.title}</h4>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-primary-medium hover:text-primary-dark"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Basic Info - Always Visible */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-primary-medium">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{card.origin.city}, {card.origin.state}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="truncate">{card.destination.city}, {card.destination.state}</span>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="space-y-3 mt-4 border-t border-gray-100 pt-3">
                {/* Dates */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center text-primary-medium">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Coleta: {format(new Date(card.dates.pickup), "dd/MM/yyyy", { locale: ptBR })}</span>
                  </div>
                  <div className="flex items-center text-primary-medium">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Entrega: {format(new Date(card.dates.delivery), "dd/MM/yyyy", { locale: ptBR })}</span>
                  </div>
                </div>

                {/* Cargo Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center text-primary-medium">
                    <Package className="h-3 w-3 mr-1" />
                    <span>{card.weight.toLocaleString('pt-BR')} kg • {card.volume} m³</span>
                  </div>
                  <div className="flex items-center text-primary-medium">
                    <CircleDollarSign className="h-3 w-3 mr-1" />
                    <span>{formatCurrency(card.value)}</span>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center text-primary-medium">
                    <Truck className="h-3 w-3 mr-1" />
                    <span>{card.vehicle.type}</span>
                  </div>
                  <div className="flex items-center text-primary-medium">
                    <FileText className="h-3 w-3 mr-1" />
                    <span>{card.vehicle.bodywork.join(', ')}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {card.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs font-medium bg-primary-pale text-primary-dark rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-primary-dark">Atividade Recente</div>
                  {card.chat.slice(-2).map((message, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs">
                      <MessageCircle className="h-3 w-3 text-primary-medium mt-0.5" />
                      <div>
                        <span className="font-medium text-primary-dark">{message.sender}</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-gray-500">
                          {format(new Date(message.timestamp), "HH:mm", { locale: ptBR })}
                        </span>
                        <p className="text-primary-medium mt-0.5">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-2 px-3 py-1.5 text-xs font-medium text-primary-medium hover:text-primary-dark border border-primary-pale rounded-md hover:bg-primary-pale transition-colors"
                >
                  Ver detalhes completos
                </button>
              </div>
            )}
          </div>
        )}
      </Draggable>

      {isModalOpen && (
        <CardModal card={card} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}