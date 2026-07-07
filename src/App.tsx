import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VehicleSelector from './components/VehicleSelector';
import TechnicalMapPage from './components/TechnicalMapPage'; // استيراد صفحة الخريطة

export default function App() {
  // الحالة المسؤولة عن التنقل
  const [view, setView] = useState('buyer'); 
  const { lang } = useLanguage();

  useEffect(() => {
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}, [lang]);

  return (
    <div className="app-container">
      <Navbar setView={setView} cartCount={0} />
      
      <main className="main-content">
        {/* عرض اختيار السيارة */}
        {view === 'buyer' && (
          <div className="view-wrapper">
            <Hero />
            {/* عند اختيار سيارة، ننتقل لعرض الخريطة */}
            <VehicleSelector onSelect={() => setView('map')} />
          </div>
        )}
        
        {/* عرض الخريطة التقنية */}
        {view === 'map' && (
          <TechnicalMapPage onBack={() => setView('buyer')} />
        )}
      </main>
    </div>
  );
}