import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Filter, X, Truck, Clock, Calendar } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FilterPopoverProps {
  onFilterChange?: (filters: any) => void;
}

export default function FilterPopover({ onFilterChange }: FilterPopoverProps) {
  const [filters, setFilters] = useState({
    status: [] as string[],
    vehicleType: [] as string[],
    date: 'all',
    customRange: {
      start: null as Date | null,
      end: null as Date | null
    }
  });
  const [isCustomDate, setIsCustomDate] = useState(false);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDateChange = (option: string) => {
    if (option === 'custom') {
      setIsCustomDate(true);
      handleFilterChange({
        ...filters,
        date: 'custom',
        customRange: {
          start: new Date(),
          end: new Date()
        }
      });
    } else {
      setIsCustomDate(false);
      handleFilterChange({
        ...filters,
        date: option,
        customRange: {
          start: null,
          end: null
        }
      });
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="flex items-center px-4 py-2 bg-primary-pale text-primary-dark rounded-lg hover:bg-primary-pale/80 transition-colors"
          aria-label="Filtros"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span className="mr-2">Filtros</span>
          {(filters.status.length > 0 || filters.vehicleType.length > 0 || filters.date !== 'all') && (
            <span className="bg-primary-light text-white text-xs rounded-full px-2 py-0.5">
              {filters.status.length + filters.vehicleType.length + (filters.date !== 'all' ? 1 : 0)}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="bg-white rounded-lg shadow-xl p-6 w-96 border border-gray-200"
          sideOffset={5}
        >
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center text-primary-dark">
                <Clock className="h-4 w-4 mr-2 text-primary-medium" />
                Status
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Nova oferta',
                  'Em divulgação',
                  'Em negociação',
                  'Docs pendentes',
                  'Em trânsito',
                  'Concluído'
                ].map((status) => (
                  <label key={status} className="flex items-center p-2 bg-primary-pale rounded-lg hover:bg-primary-pale/80 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={(e) => {
                        const newStatus = e.target.checked
                          ? [...filters.status, status]
                          : filters.status.filter(s => s !== status);
                        handleFilterChange({ ...filters, status: newStatus });
                      }}
                      className="mr-2 rounded border-primary-medium text-primary-light focus:ring-primary-light"
                    />
                    <span className="text-sm text-primary-dark">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center text-primary-dark">
                <Truck className="h-4 w-4 mr-2 text-primary-medium" />
                Tipo de Veículo
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['Van', 'Truck', 'Carreta', 'Bitrem'].map((vehicle) => (
                  <label key={vehicle} className="flex items-center p-2 bg-primary-pale rounded-lg hover:bg-primary-pale/80 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.vehicleType.includes(vehicle)}
                      onChange={(e) => {
                        const newVehicles = e.target.checked
                          ? [...filters.vehicleType, vehicle]
                          : filters.vehicleType.filter(v => v !== vehicle);
                        handleFilterChange({ ...filters, vehicleType: newVehicles });
                      }}
                      className="mr-2 rounded border-primary-medium text-primary-light focus:ring-primary-light"
                    />
                    <span className="text-sm text-primary-dark">{vehicle}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 flex items-center text-primary-dark">
                <Calendar className="h-4 w-4 mr-2 text-primary-medium" />
                Período
              </h3>
              <div className="space-y-2">
                <select
                  className="w-full p-2 border rounded-lg bg-primary-pale text-primary-dark text-sm"
                  value={filters.date}
                  onChange={(e) => handleDateChange(e.target.value)}
                >
                  <option value="all">Todos os períodos</option>
                  <option value="today">Hoje</option>
                  <option value="yesterday">Ontem</option>
                  <option value="week">Esta semana</option>
                  <option value="month">Este mês</option>
                  <option value="custom">Período personalizado</option>
                </select>

                {isCustomDate && (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label className="block text-xs text-primary-medium mb-1">Data inicial</label>
                      <DatePicker
                        selected={filters.customRange.start}
                        onChange={(date) =>
                          handleFilterChange({
                            ...filters,
                            customRange: { ...filters.customRange, start: date }
                          })
                        }
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                        className="w-full p-2 border rounded-lg text-sm"
                        placeholderText="Selecione..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-primary-medium mb-1">Data final</label>
                      <DatePicker
                        selected={filters.customRange.end}
                        onChange={(date) =>
                          handleFilterChange({
                            ...filters,
                            customRange: { ...filters.customRange, end: date }
                          })
                        }
                        dateFormat="dd/MM/yyyy"
                        locale={ptBR}
                        className="w-full p-2 border rounded-lg text-sm"
                        placeholderText="Selecione..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => handleFilterChange({
                  status: [],
                  vehicleType: [],
                  date: 'all',
                  customRange: { start: null, end: null }
                })}
                className="text-sm text-primary-medium hover:text-primary-dark"
              >
                Limpar filtros
              </button>
              <Popover.Close className="px-4 py-2 bg-primary-light text-white text-sm rounded-lg hover:bg-primary-medium transition-colors">
                Aplicar filtros
              </Popover.Close>
            </div>
          </div>

          <Popover.Close className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
            <X className="h-4 w-4" />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}