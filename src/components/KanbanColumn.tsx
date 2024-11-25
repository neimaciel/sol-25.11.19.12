import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { motion, AnimatePresence } from 'framer-motion';
import KanbanCard from './KanbanCard';
import { Card } from '../types';

interface KanbanColumnProps {
  title: string;
  color: string;
  cards: Card[];
  droppableId: string;
}

const KanbanColumn = ({
  title,
  color,
  cards,
  droppableId
}: KanbanColumnProps) => {
  return (
    <div className="flex flex-col w-80 rounded-lg">
      <div className={`p-4 rounded-t-lg ${color}`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-primary-dark">{title}</h3>
          <span className="px-3 py-1 text-sm font-medium bg-white bg-opacity-50 rounded-full">
            {cards.length} cargas
          </span>
        </div>
      </div>
      
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <motion.div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 min-h-[70vh] space-y-4 rounded-b-lg transition-colors`}
            animate={{ backgroundColor: snapshot.isDraggingOver ? '#E8F1F2' : '#F9FAFB' }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="popLayout">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  layout
                >
                  <KanbanCard card={card} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
            {provided.placeholder}
          </motion.div>
        )}
      </Droppable>
    </div>
  );
};

export default KanbanColumn;