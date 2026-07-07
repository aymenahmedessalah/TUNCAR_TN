import React, { useState } from 'react';
import './TechnicalMap.css';

export default function PartsResults({ oem }: { oem: string }) {
  const [filter, setFilter] = useState<'ALL' | 'NEW' | 'USED'>('ALL');
  const parts = [
    { id: 1, name: 'Water Pump', status: 'NEW', price: 150, oem: '03C-121-004-J' },
    { id: 2, name: 'Alternator', status: 'USED', price: 80, oem: '03C-121-004-J' }
  ];

  const filtered = parts.filter(p => filter === 'ALL' || p.status === filter);

  return (
    <section className="results-panel">
      <div className="panel-header">
        <h3>Results for OEM: {oem}</h3>
        <div className="filter-tags">
          <button onClick={() => setFilter('ALL')}>ALL</button>
          <button onClick={() => setFilter('NEW')}>NEW</button>
          <button onClick={() => setFilter('USED')}>USED</button>
        </div>
      </div>
      <div className="parts-tags-grid">
        {filtered.map(p => (
          <div key={p.id} className="part-tag-card">
            <h4>{p.name}</h4>
            <span className={`tag ${p.status.toLowerCase()}`}>{p.status}</span>
            <span className="tag price">{p.price} TND</span>
          </div>
        ))}
      </div>
    </section>
  );
}