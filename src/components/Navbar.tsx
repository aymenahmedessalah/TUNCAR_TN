import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';
import { FaSearch, FaShoppingCart, FaUser, FaLanguage, FaCoins } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar({ setView, cartCount = 0, cartTotal = 0, userName = "", data = [] }: any) {
  const { lang, setLang } = useLanguage();
  const { role } = useTheme();
  const [currency, setCurrency] = useState<'TND' | 'EUR' | 'USD'>('TND');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [searchType, setSearchType] = useState<'text' | 'vin'>('text');
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[lang];

  return (
    <nav className={`navbar ${role || 'buyer'}`}>
      <div className="left-group">
        <div className="logo" onClick={() => setView('buyer')}>TUNCAR.TN</div>
        <div className="nav-dropdown-wrapper">
          <div className="nav-icon" onClick={() => {setShowLangMenu(!showLangMenu); setShowCurrMenu(false);}}><FaLanguage /> {lang.toUpperCase()}</div>
          {showLangMenu && <div className="nav-dropdown">{['ar', 'fr', 'en'].filter(l => l !== lang).map(l => <span key={l} onClick={() => {setLang(l as any); setShowLangMenu(false);}}>{l.toUpperCase()}</span>)}</div>}
        </div>
        <div className="nav-dropdown-wrapper">
          <div className="nav-icon" onClick={() => {setShowCurrMenu(!showCurrMenu); setShowLangMenu(false);}}><FaCoins /> {currency}</div>
          {showCurrMenu && <div className="nav-dropdown">{['TND', 'EUR', 'USD'].filter(c => c !== currency).map(c => <span key={c} onClick={() => {setCurrency(c as any); setShowCurrMenu(false);}}>{c}</span>)}</div>}
        </div>
      </div>

      <div className="search-container">
        <div className="search-slot">
          <FaSearch color="#64748b" />
          <input 
            placeholder={searchType === 'text' ? t.placeholderText : t.placeholderVin} 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            maxLength={searchType === 'vin' ? 17 : undefined}
            size={searchType === 'text' ? Math.max(20, searchTerm.length) : 17}
          />
          <span className="search-toggle" onClick={() => setSearchType(searchType === 'text' ? 'vin' : 'text')}>
            {searchType === 'text' ? 'VIN' : 'TXT'}
          </span>
        </div>
      </div>

      <div className="right-group">
        <div className="unified-slot">
          <div className="side-part" onClick={() => setView('cart')}><FaShoppingCart /> {cartCount > 0 && <span>{cartTotal} {currency}</span>}</div>
          <div className="divider"></div>
          <div className="side-part" onClick={() => setView('profile')}>
            <FaUser /> <span>{userName ? userName : t.loginTitle || 'login'}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}