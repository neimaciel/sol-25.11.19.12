import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Sun, Filter } from 'lucide-react';
import KanbanColumn from './KanbanColumn';
import NewCardModal from './NewCardModal';
import FilterPopover from './FilterPopover';
import BusinessIntelligence from './BusinessIntelligence';
import { initialCards, columns } from '../data/kanban';

const KanbanBoard = () => {
  const [cards, setCards] = useState(initialCards);
  const [showDashboard, setShowDashboard] = useState(true);
  const [isNewCardModalOpen, setNewCardModalOpen] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = Array.isArray(cards[source.droppableId]) ? [...cards[source.droppableId]] : [];
    const destColumn = Array.isArray(cards[destination.droppableId]) ? [...cards[destination.droppableId]] : [];
    
    const [draggedCard] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, draggedCard);

    setCards(prev => ({
      ...prev,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-primary-dark text-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Sun className="h-8 w-8 text-primary-light" />
                <span className="text-xl font-bold">S.O.L</span>
              </div>
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="px-4 py-2 text-sm bg-primary-medium rounded-lg hover:bg-primary-light transition-colors"
              >
                {showDashboard ? 'Ocultar Dashboard' : 'Mostrar Dashboard'}
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar cargas..."
                  className="pl-10 pr-4 py-2 w-80 border border-primary-medium rounded-lg bg-primary-pale text-primary-dark"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-primary-medium" />
              </div>
              
              <FilterPopover />
              
              <button
                onClick={() => setNewCardModalOpen(true)}
                className="flex items-center px-4 py-2 bg-primary-light text-white rounded-lg hover:bg-primary-medium transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Nova Carga
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BusinessIntelligence />
          </motion.div>
        )}
      </AnimatePresence>

      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div 
          className="p-6 overflow-x-auto"
          layout
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex space-x-4 min-w-max">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                title={column.title}
                color={column.color}
                cards={cards[column.id] || []}
                droppableId={column.id}
              />
            ))}
          </div>
        </motion.div>
      </DragDropContext>

      {isNewCardModalOpen && (
        <NewCardModal onClose={() => setNewCardModalOpen(false)} />
      )}
    </div>
  );
};

export default KanbanBoard;