import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface NewCardModalProps {
  onClose: () => void;
}

export default function NewCardModal({ onClose }: NewCardModalProps) {
  const [freightType, setFreightType] = useState('normal');
  const [loadType, setLoadType] = useState('complete');
  const [needsReturn, setNeedsReturn] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [bodyTypes, setBodyTypes] = useState<string[]>([]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Cadastro de Frete</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Dados da coleta e entrega */}
          <section>
            <h3 className="text-lg font-medium mb-4">Dados da coleta e entrega</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="freightType"
                    value="normal"
                    checked={freightType === 'normal'}
                    onChange={(e) => setFreightType(e.target.value)}
                    className="mr-2"
                  />
                  Normal
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="freightType"
                    value="emergency"
                    checked={freightType === 'emergency'}
                    onChange={(e) => setFreightType(e.target.value)}
                    className="mr-2"
                  />
                  Emergencial
                </label>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade de coleta
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data da coleta
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cidade de entrega
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data da entrega
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Dados da carga */}
          <section>
            <h3 className="text-lg font-medium mb-4">Dados da carga</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="loadType"
                    value="complete"
                    checked={loadType === 'complete'}
                    onChange={(e) => setLoadType(e.target.value)}
                    className="mr-2"
                  />
                  Carga completa
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="loadType"
                    value="partial"
                    checked={loadType === 'partial'}
                    onChange={(e) => setLoadType(e.target.value)}
                    className="mr-2"
                  />
                  Carga fracionada
                </label>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Produto
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Peso total da carga
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={needsReturn}
                    onChange={(e) => setNeedsReturn(e.target.checked)}
                    className="mr-2"
                  />
                  Precisa de retorno?
                </label>
              </div>
            </div>
          </section>

          {/* Veículos */}
          <section>
            <h3 className="text-lg font-medium mb-4">Escolha quantos veículos quiser</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2">Leves</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" value="van" />
                    Van
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" value="furgao" />
                    Furgão
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" value="vuc" />
                    VUC
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Médios</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" value="toco" />
                    Toco
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" value="truck" />
                    Truck
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Pesados</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" value="carreta" />
                    Carreta
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" value="bitrem" />
                    Bi-trem
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Carrocerias */}
          <section>
            <h3 className="text-lg font-medium mb-4">Escolha quantas carrocerias quiser</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="bau" />
                  Baú
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="refrigerada" />
                  Refrigerada
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="sider" />
                  Sider
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="graneleira" />
                  Graneleira
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="cacamba" />
                  Caçamba
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="grade-baixa" />
                  Grade baixa
                </label>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="prancha" />
                  Prancha
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" value="container" />
                  Container
                </label>
              </div>
            </div>
          </section>

          {/* Dados de pagamento */}
          <section>
            <h3 className="text-lg font-medium mb-4">Dados de pagamento</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor do frete
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Forma de pagamento
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>À vista</option>
                    <option>30 dias</option>
                    <option>45 dias</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex items-center justify-end space-x-4 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancelar
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Cadastrar Frete
          </button>
        </div>
      </div>
    </div>
  );
}