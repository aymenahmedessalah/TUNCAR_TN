import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import './Navbar.css';

export default function Navbar({ setView, cartCount = 0 }: any) {
  const { lang, setLang } = useLanguage();
  const [searchType, setSearchType] = useState<'text' | 'vin'>('text');
  const t = translations[lang];

  return (
    <nav className="navbar">
      {/* الكتلة الأولى: اللوغو */}
      <div className="logo" onClick={() => setView('buyer')}>TUNCAR.TN</div>
      <div className="search-container">
        <div className="search-slot">
          <input className="search-input" placeholder={searchType === 'text' ? t.placeholderText : t.placeholderVin} />
          <span className="search-toggle" onClick={() => setSearchType(searchType === 'text' ? 'vin' : 'text')}>
            {searchType === 'text' ? 'VIN' : 'TXT'}
          </span>
        </div>
        </div>
      {/* الكتلة الثانية: المحتوى الجانبي */}
      <div className="navbar-right">
        <div className="lang-tags">
          {['ar', 'fr', 'en'].filter(c => c !== lang).map((code) => (
            <button key={code} className="lang-tag" onClick={() => setLang(code as any)}>
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        
        <div onClick={() => setView('cart')}>{t.cart} ({cartCount})</div>
      </div>
    </nav>
  );
}