import React, { useState } from 'react';
import * as vehicleData from '../data/vehicles.json'; // استخدم * as
import TechnicalMap from './TechnicalMap';
import { useLanguage } from '../context/LanguageContext';

export default function VehicleSelector() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ brand: '', model: '', variant: '', year: '' });

  const brands = Object.keys(vehicleData);

  const handleBrandSelect = (brand: string) => {
    setSelection({ brand, model: '', variant: '', year: '' });
    setStep(2);
  };

  return (
    <div className="vehicle-selector">
      {/* 1. اختيار الماركة (السلايدر) */}
      <div className="slider-container">
        {brands.map(b => (
          <button key={b} onClick={() => handleBrandSelect(b)} className={selection.brand === b ? 'active' : ''}>
            {b}
          </button>
        ))}
      </div>

      {/* 2. اختيار الموديل */}
      {step >= 2 && (
        <div className="step-content">
          <h3>{lang === 'fr' ? 'Modèle' : 'الموديل'}</h3>
          {Object.keys(vehicleData[selection.brand as keyof typeof vehicleData].models).map(m => (
            <button key={m} onClick={() => { setSelection({...selection, model: m}); setStep(3); }}>{m}</button>
          ))}
        </div>
      )}

      {/* 3. اختيار الفارينت */}
      {step >= 3 && (
        <div className="step-content">
          <h3>{lang === 'fr' ? 'Variante' : 'الفارينت'}</h3>
          {vehicleData[selection.brand as keyof typeof vehicleData].models[selection.model as keyof any].variants.map(v => (
            <button key={v} onClick={() => { setSelection({...selection, variant: v}); setStep(4); }}>{v}</button>
          ))}
        </div>
      )}

      {/* 4. اختيار السنة */}
      {step >= 4 && (
        <div className="step-content">
          <h3>{lang === 'fr' ? 'Année' : 'السنة'}</h3>
          {vehicleData[selection.brand as keyof typeof vehicleData].models[selection.model as keyof any].years.map(y => (
            <button key={y} onClick={() => { setSelection({...selection, year: y}); setStep(5); }}>{y}</button>
          ))}
        </div>
      )}
      {step === 5 && (
        <div className="final-selection">
          <h3>
            {lang === 'fr' ? 'Configuration sélectionnée :' : 'السيارة المختارة:'}
            {` ${selection.brand} ${selection.model} (${selection.year})`}
          </h3>
          
          {/* المكون الذي يعرض الـ SVG الخاص بالسيارة المحددة */}
          <TechnicalMap 
             brand={selection.brand} 
             model={selection.model} 
             year={selection.year} 
          />
        </div>
      )}
    </div>
  );
}