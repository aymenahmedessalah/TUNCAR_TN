import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import vehicleData from '../data/vehicles.json';
import TechnicalMap from './TechnicalMap';
import './VehicleSelector.css';

const data = (vehicleData as any) || {};

export default function VehicleSelector({ onSelect }: { onSelect: () => void }) {
  const { lang } = useLanguage();
  const t = translations[lang as 'fr' | 'ar' | 'en'];

  const [selection, setSelection] = useState<any>({ 
    brand: '', model: '', year: '', transmission: '', energy: '', variant: '' 
  });

  const steps = [
    { key: 'brand', label: t.steps.brand },
    { key: 'model', label: t.steps.model },
    { key: 'year', label: t.steps.year },
    { key: 'transmission', label: t.steps.transmission },
    { key: 'energy', label: t.energyTypes.energy },
    { key: 'variant', label: t.steps.variant }
  ];

  const isFinished = steps.every(s => selection[s.key] !== '');
  const currentStep = steps.find(s => !selection[s.key]) || { key: 'final', label: 'Map' };
  const currentStepIndex = steps.findIndex(s => !selection[s.key]);

  const handleStepClick = (index: number) => {
    const newState = { ...selection };
    steps.forEach((s, i) => { if (i >= index) newState[s.key] = ''; });
    setSelection(newState);
  };

  const getOptions = () => {
    const { brand, model, energy, year } = selection;
    if (currentStep.key === 'brand') return Object.keys(data || {});
    if (!brand || !data[brand]) return [];
    if (currentStep.key === 'model') return Object.keys(data[brand]?.models || {});
    if (!model || !data[brand]?.models[model]) return [];
    if (currentStep.key === 'year') return data[brand]?.models[model]?.phases?.map((p: any) => p.name) || [];
    if (currentStep.key === 'transmission') return data[brand]?.models[model]?.transmissions || [];
    if (currentStep.key === 'energy') return [
      { id: 'petrol', label: t.energyTypes.petrol },
      { id: 'diesel', label: t.energyTypes.diesel },
      { id: 'electric', label: t.energyTypes.electric },
      { id: 'hybrid', label: t.energyTypes.hybrid }
    ];
    if (currentStep.key === 'variant') {
      return data[brand]?.models[model]?.variants?.filter((v: any) => v.energy === energy && v.phase === year) || [];
    }
    return [];
  };

  return (
    <div className="vs-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {selection.brand && (
        <div className="vs-status-bar">
          {steps.map((s, i) => selection[s.key] && (
            <div key={s.key} className="status-group">
              <span className="status-text" onClick={() => handleStepClick(i)}>
                {selection[s.key]}
              </span>
              {i < (isFinished ? steps.length - 1 : currentStepIndex - 1) && 
                <span className="status-arrow">›</span>
              }
            </div>
          ))}
          <button className="reset-btn" onClick={() => handleStepClick(0)}>{t.reset}</button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {isFinished ? (
          <motion.div key="map" className="vs-map-wrapper"><TechnicalMap {...selection} /></motion.div>
        ) : (
          <motion.div 
            key="selection" 
            initial={{ opacity: 0, x: lang === 'ar' ? 20 : -20 }} 
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="vs-instruction">{t.instruction} {currentStep.label}</h2>
            <div className="vs-grid">
              {getOptions().map((opt: any) => {
                const isEnergy = currentStep.key === 'energy';
                const labelFull = isEnergy ? opt.label : (typeof opt === 'object' ? opt.name : opt);
                const val = isEnergy ? opt.id : labelFull;
                
                const match = String(labelFull).match(/(.*) \((.*)\)/);
                const displayName = match ? match[1] : labelFull;
                const techCode = match ? match[2] : null;

                return (
                  <button 
                    key={val} 
                    onClick={() => setSelection({...selection, [currentStep.key]: val})} 
                    className="vs-card"
                  >
                    {currentStep.key === 'brand' && (
                      <img src={`/logos/${displayName.toLowerCase().trim()}.svg`} alt={displayName} className="vs-card-logo" />
                    )}
                    
                    <div className="vs-card-content">
                      <span className="vs-card-main-text">{displayName}</span>
                      {techCode && (
                        <span className="vs-card-sub-text">
                          {techCode}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}