import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext'; // استيراد مزود الثيم
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VehicleSelector from './components/VehicleSelector';
import TechnicalMapPage from './components/TechnicalMapPage';
import AuthPage from './components/AuthPage';

export default function App() {
  const [view, setView] = useState('buyer'); 
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    // التغليف بـ ThemeProvider ضروري ليعمل نظام الألوان الديناميكي
    <ThemeProvider>
      <div className="app-container">
        <Navbar 
          setView={setView} 
          cartCount={cartCount} 
          cartTotal={cartTotal} 
        />
        
        <main className="main-content">
          {view === 'buyer' && (
            <div className="view-wrapper">
              <Hero />
              <VehicleSelector onSelect={() => setView('map')} />
            </div>
          )}
          
          {view === 'map' && (
            <TechnicalMapPage onBack={() => setView('buyer')} />
          )}

          {view === 'profile' && (
            <AuthPage onAuthSuccess={() => setView('buyer')} />
          )}
          
          {view === 'cart' && (
            <div className="view-wrapper">
              <h2>سلة المشتريات</h2>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}