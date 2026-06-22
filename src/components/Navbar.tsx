import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ setView, cartCount = 0 }: { setView: (v: string) => void, cartCount?: number }) {
  const { lang, setLang } = useLanguage();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => setView('buyer')} style={{ cursor: 'pointer' }}>
          AutoTech
        </div>
        <div className="language-switcher">
          <button onClick={() => setLang('fr')} className={lang === 'fr' ? 'active' : ''}>FR</button>
          <button onClick={() => setLang('ar')} className={lang === 'ar' ? 'active' : ''}>AR</button>
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'active' : ''}>EN</button>
        </div>
      </div>

      <div className="navbar-right">
        <div className="cart-icon" onClick={() => setView('cart')} style={{ cursor: 'pointer' }}>
          {lang === 'fr' ? 'Panier' : lang === 'ar' ? 'السلة' : 'Cart'} ({cartCount})
        </div>
        
        {/* أيقونة المستخدم (SVG) بدلاً من النص */}
        <div className="user-icon" onClick={() => setView('profile')} style={{ cursor: 'pointer' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </nav>
  );
}