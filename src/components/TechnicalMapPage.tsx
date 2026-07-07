import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import TechnicalMap from './TechnicalMap';
import './TechnicalMap.css';

export type PartType = 'engine' | 'transmission' | 'suspension' | 'electrique' | null;

export default function TechnicalMapPage({ onBack }: { onBack: () => void }) {
  const [activePart, setActivePart] = useState<PartType>(null);
  const { lang } = useLanguage();
console.log("هل يتم عرض المكون؟");
  return (
    <div className="main-wrapper" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="page-header">
        <button onClick={onBack} className="back-btn">{lang === 'ar' ? '→' : '←'} Back</button>
        <h1>Système de Spécifications Techniques</h1>
        <button onClick={() => setActivePart(null)} className="reset-btn">Réinitialiser</button>
      </header>
      
      <div className="app-content">
        <aside className="sidebar-menu">
          {['engine', 'transmission', 'suspension', 'electrique'].map((part) => (
            <button 
              key={part} 
              className={activePart === part ? 'active' : ''} 
              onClick={() => setActivePart(part as PartType)}
            >
              {part.toUpperCase()}
            </button>
          ))}
        </aside>
        
        <main className="canvas-area">
          <div className="map-border">
            <TechnicalMap activePart={activePart} onPartSelect={setActivePart} />
          </div>
        </main>
      </div>
    </div>
  );
}