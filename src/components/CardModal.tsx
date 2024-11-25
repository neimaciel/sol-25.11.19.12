import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Tabs from '@radix-ui/react-tabs';
import { 
  X, 
  MapPin, 
  Calendar, 
  Package, 
  Truck, 
  CircleDollarSign, 
  MessageCircle, 
  Paperclip,
  Star,
  User,
  Phone,
  Award,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../types';
import RouteMap from './RouteMap';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import DocumentTab from './DocumentTab';
import AttachmentsTab from './AttachmentsTab';

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

export default function CardModal({ card, onClose }: CardModalProps) {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-primary-medium">{card.code}</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-primary-pale text-primary-dark rounded-full">
                  {card.type}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-primary-dark">{card.title}</h3>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Tabs */}
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex border-b border-gray-200">
              <Tabs.Trigger
                value="info"
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'info'
                    ? 'border-primary-light text-primary-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Informações
              </Tabs.Trigger>
              <Tabs.Trigger
                value="chat"
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'chat'
                    ? 'border-primary-light text-primary-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Chat
              </Tabs.Trigger>
              <Tabs.Trigger
                value="attachments"
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'attachments'
                    ? 'border-primary-light text-primary-dark'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Anexos
              </Tabs.Trigger>
            </Tabs.List>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <Tabs.Content value="info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Route Map */}
                    <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
                      <RouteMap
                        origin={{
                          city: card.origin.city,
                          state: card.origin.state,
                          coordinates: card.origin.coordinates
                        }}
                        destination={{
                          city: card.destination.city,
                          state: card.destination.state,
                          coordinates: card.destination.coordinates
                        }}
                        stops={card.stops?.map(stop => ({
                          city: stop.city,
                          state: stop.state,
                          coordinates: stop.coordinates
                        })) || []}
                      />
                    </div>

                    {/* Product Information */}
                    {card.product && (
                      <div>
                        <h4 className="text-sm font-medium text-primary-dark mb-3">Produto</h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-primary-dark">{card.product.name}</p>
                          <p className="text-sm text-primary-medium mt-1">{card.product.description}</p>
                          {card.product.requirements && card.product.requirements.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {card.product.requirements.map((req, index) => (
                                <span key={index} className="px-2 py-1 text-xs bg-white rounded-full text-primary-medium">
                                  {req}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Driver Information */}
                    {card.driver && (
                      <div>
                        <h4 className="text-sm font-medium text-primary-dark mb-3">Motorista</h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4 mb-3">
                            {card.driver.photo && (
                              <img
                                src={card.driver.photo}
                                alt={card.driver.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-primary-dark">{card.driver.name}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium text-primary-dark">{card.driver.rating}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-1">
                                  <Truck className="h-4 w-4 text-primary-medium" />
                                  <span className="text-sm text-primary-medium">{card.driver.trips} viagens</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Award className="h-4 w-4 text-primary-medium" />
                                  <span className="text-sm text-primary-medium">Motorista {card.driver.badge}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-primary-medium" />
                            <span className="text-sm text-primary-medium">{card.driver.phone}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cargo Details */}
                    <div>
                      <h4 className="text-sm font-medium text-primary-dark mb-3">Informações da Carga</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Package className="h-4 w-4 mr-2 text-primary-medium" />
                          <span className="text-primary-dark">
                            {card.weight.toLocaleString('pt-BR')} kg • {card.volume} m³
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CircleDollarSign className="h-4 w-4 mr-2 text-primary-medium" />
                          <span className="text-primary-dark">
                            R$ {card.value.toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Truck className="h-4 w-4 mr-2 text-primary-medium" />
                          <span className="text-primary-dark">
                            {card.vehicle.type} • {card.vehicle.bodywork.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Route Information */}
                    <div>
                      <h4 className="text-sm font-medium text-primary-dark mb-3">Rota</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-primary-pale rounded-lg">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 text-primary-medium mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-primary-dark">{card.origin.name}</p>
                              <p className="text-sm text-primary-medium">{card.origin.address}</p>
                              <p className="text-sm text-primary-medium">
                                {card.origin.city}, {card.origin.state}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-primary-pale rounded-lg">
                          <div className="flex items-start">
                            <MapPin className="h-4 w-4 mr-2 text-primary-medium mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-primary-dark">{card.destination.name}</p>
                              <p className="text-sm text-primary-medium">{card.destination.address}</p>
                              <p className="text-sm text-primary-medium">
                                {card.destination.city}, {card.destination.state}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div>
                      <h4 className="text-sm font-medium text-primary-dark mb-3">Datas</h4>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-primary-medium" />
                          <span className="text-primary-dark">
                            Coleta: {format(new Date(card.dates.pickup), "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-primary-medium" />
                          <span className="text-primary-dark">
                            Entrega: {format(new Date(card.dates.delivery), "dd/MM/yyyy", { locale: ptBR })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Transportadora Information */}
                    {card.transportadora && (
                      <div>
                        <h4 className="text-sm font-medium text-primary-dark mb-3">Transportadora</h4>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            {card.transportadora.photo && (
                              <img
                                src={card.transportadora.photo}
                                alt={card.transportadora.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <p className="text-sm font-medium text-primary-dark">
                                {card.transportadora.name}
                              </p>
                              <p className="text-sm text-primary-medium">
                                {card.transportadora.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Tabs.Content>

              <Tabs.Content value="chat" className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 h-[500px] flex flex-col">
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {card.chat.map((message, index) => (
                      <ChatMessage
                        key={index}
                        message={message}
                        isOperator={message.sender === 'Operador'}
                      />
                    ))}
                  </div>
                  <ChatInput onSendMessage={(message, files) => {
                    console.log('Message:', message, 'Files:', files);
                  }} />
                </div>
              </Tabs.Content>

              <Tabs.Content value="attachments">
                <div className="space-y-6">
                  <AttachmentsTab attachments={card.attachments || []} />
                  <DocumentTab documents={card.documents} status={card.status} />
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-primary-pale text-primary-dark rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}