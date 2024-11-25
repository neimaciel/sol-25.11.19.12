import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KanbanBoard from './components/KanbanBoard';
import Analytics from './pages/Analytics';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}