import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';
import { Card } from '../types';

interface KanbanListProps {
  columns: { id: string; title: string; color: string }[];
  cards: Record<string, Card[]>;
  onCardClick: () => void;
}

export default function KanbanList({ columns, cards, onCardClick }: KanbanListProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {columns.map((column) => (
        <div key={column.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className={`px-6 py-4 ${column.color}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {column.title}
              </h3>
              <span className="px-3 py-1 text-sm font-medium bg-white bg-opacity-50 rounded-full">
                {cards[column.id]?.length || 0} cargas
              </span>
            </div>
          </div>
          
          <Droppable key={column.id} droppableId={column.id}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-4 transition-colors ${
                  snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-white'
                }`}
              >
                <div className="space-y-3">
                  {(cards[column.id] || []).map((card, index) => (
                    <div key={card.id} onClick={onCardClick}>
                      <KanbanCard card={card} index={index} />
                    </div>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  );
}