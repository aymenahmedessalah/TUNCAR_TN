import React, { useState } from 'react';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VehicleSelector from './components/VehicleSelector';
import Cart from './components/Cart';
import ProfilePage from './components/ProfilePage';
import TechnicalMap from './components/TechnicalMap';
import './index.css';
import './App.css';

export default function App() {
  const { lang } = useLanguage();
  const [view, setView] = useState<string>('buyer');
  const [cart, setCart] = useState<any[]>([]);

  return (
    <div className="app-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar setView={setView} cartCount={cart.length} />
      <main className="main-content">
        {view === 'buyer' && (
          <>
            <Hero />
            <VehicleSelector />
          </>
        )}
        {view === 'cart' && <Cart cart={cart} setCart={setCart} />}
        {view === 'profile' && <ProfilePage />}
      </main>
    </div>
  );
}
