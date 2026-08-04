import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';
import { FaSearch, FaShoppingCart, FaUser, FaLanguage, FaCoins, FaUserPlus, FaSignInAlt, FaUsers } from 'react-icons/fa';
import { UserProfile } from './UsersManagement'; 
import './Navbar.css';

export interface NavbarProps {
  setView: (view: string) => void;
  cartCount: number;
  cartTotal: number;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  onCartClick?: () => void;
}

export default function Navbar({ setView, cartCount = 0, cartTotal = 0, currentUser, setCurrentUser, onCartClick }: NavbarProps) {
  const { lang, setLang } = useLanguage();
  const { role } = useTheme();
  const [currency, setCurrency] = useState<'TND' | 'EUR' | 'USD'>('TND');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);
  const [showAuthMenu, setShowAuthMenu] = useState(false);
  
  const [searchType, setSearchType] = useState<'text' | 'vin'>('text');
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[lang];

  const authTimeoutRef = useRef<number | null>(null);
  const langTimeoutRef = useRef<number | null>(null);
  const currTimeoutRef = useRef<number | null>(null);

  const handleLogoClick = () => {
    if (!currentUser) {
      setView('buyer');
    } else {
      switch (currentUser.role) {
        case 'owner':
          setView('owner_command');
          break;
        case 'super_admin':
        case 'admin1':
        case 'admin2':
        case 'admin3':
          setView('users');
          break;
        case 'supplier':
          setView('dashboard_supplier');
          break;
        case 'seller':
          setView('dashboard_seller');
          break;
        case 'inspector':
          setView('telemetry');
          break;
        case 'user':
        default:
          setView('buyer');
          break;
      }
    }
  };

  // دالة التوجيه عند النقر على زر المستخدم بناءً على الـ role الخاص به
  const handleUserClick = () => {
    if (!currentUser) {
      setView('login');
    } else {
      switch (currentUser.role) {
        case 'owner':
          setView('owner_command');
          break;
        case 'super_admin':
        case 'admin1':
        case 'admin2':
        case 'admin3':
          setView('users');
          break;
        case 'supplier':
          setView('dashboard_supplier');
          break;
        case 'seller':
          setView('dashboard_seller');
          break;
        case 'inspector':
          setView('telemetry');
          break;
        case 'user':
        default:
          setView('profile'); // صفحة الملف الشخصي للمستخدم العادي
          break;
      }
    }
  };

  return (
    <nav className={`navbar ${role || 'buyer'}`}>
      
      {/* الجانب الأيسر: الشعار وقوائم اللغة والعملة */}
      <div className="left-group flex items-center gap-4">
        
        {/* Logo Section */}
        <div 
          onClick={handleLogoClick}
          className="cyber-atomic-glow cursor-pointer group select-none flex items-center"
        >
          <div className="cyber-logo-container flex items-center">
            <img src="/Logo.svg" alt="TUNCAR.TN Logo" />
          </div>
        </div>
        
        {/* قائمة اللغة */}
        <div 
          className="nav-dropdown-wrapper relative"
          onMouseEnter={() => { if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current); setShowLangMenu(true); setShowCurrMenu(false); setShowAuthMenu(false); }}
          onMouseLeave={() => { langTimeoutRef.current = window.setTimeout(() => setShowLangMenu(false), 200); }}
        >
          <div className="nav-icon" onClick={() => setShowLangMenu(!showLangMenu)}>
            <FaLanguage /> {lang.toUpperCase()}
          </div>
          {showLangMenu && (
            <div className="nav-dropdown">
              {['ar', 'fr', 'en'].filter(l => l !== lang).map(l => (
                <span key={l} onClick={() => {setLang(l as any); setShowLangMenu(false);}}>{l.toUpperCase()}</span>
              ))}
            </div>
          )}
        </div>

        {/* قائمة العملة */}
        <div 
          className="nav-dropdown-wrapper relative"
          onMouseEnter={() => { if (currTimeoutRef.current) clearTimeout(currTimeoutRef.current); setShowCurrMenu(true); setShowLangMenu(false); setShowAuthMenu(false); }}
          onMouseLeave={() => { currTimeoutRef.current = window.setTimeout(() => setShowCurrMenu(false), 200); }}
        >
          <div className="nav-icon" onClick={() => setShowCurrMenu(!showCurrMenu)}>
            <FaCoins /> {currency}
          </div>
          {showCurrMenu && (
            <div className="nav-dropdown">
              {['TND', 'EUR', 'USD'].filter(c => c !== currency).map(c => (
                <span key={c} onClick={() => {setCurrency(c as any); setShowCurrMenu(false);}}>{c}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* خانة البحث في المنتصف */}
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

      {/* الجانب الأيمن: عربة التسوق وبيانات المستخدم */}
      <div className="right-group">
        <div className="unified-slot">
          
          {currentUser && ['owner', 'super_admin', 'admin1', 'admin2', 'admin3'].includes(currentUser.role) && (
            <>
              <div className="side-part cursor-pointer flex items-center gap-1.5" onClick={() => setView('users')} title="إدارة المستخدمين">
                <FaUsers className="text-[#38bdf8]" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#38bdf8' }}>Users</span>
              </div>
              <div className="divider"></div>
            </>
          )}

          <div className="side-part cursor-pointer" onClick={() => {
            if (onCartClick) {
              onCartClick();
            } else if (!currentUser) {
              setView('login_inline');
            } else {
              setView('cart');
            }
          }}>
            <FaShoppingCart /> 
            {cartCount > 0 && <span>{cartTotal} {currency}</span>}
          </div>
          
          <div className="divider"></div>

          {currentUser ? (
            <div className="side-part cursor-pointer flex items-center gap-2" onClick={handleUserClick}>
              <FaUser className="text-[#10b981]" /> 
              <span>{currentUser.name} ({currentUser.role})</span>
            </div>
          ) : (
            <div 
              className="nav-dropdown-wrapper relative" 
              onMouseEnter={() => { if (authTimeoutRef.current) clearTimeout(authTimeoutRef.current); setShowAuthMenu(true); setShowLangMenu(false); setShowCurrMenu(false); }}
              onMouseLeave={() => { authTimeoutRef.current = window.setTimeout(() => setShowAuthMenu(false), 200); }}
            >
              <div 
                className="side-part cursor-pointer flex items-center gap-2" 
                onClick={() => { setView('login'); setShowAuthMenu(false); }}
              >
                <FaSignInAlt className="text-[#00e5ff]" />
                <span>{t.loginTitle || 'Se connecter'}</span>
              </div>

              {showAuthMenu && (
                <div className="nav-dropdown absolute right-0 w-40 shadow-2xl border border-gray-800 py-2 z-50 text-left">
                  <div 
                    className="px-4 py-2 hover:bg-[#10b981]/10 cursor-pointer flex items-center gap-2 text-sm text-[#10b981] font-medium"
                    onClick={() => { setView('register'); setShowAuthMenu(false); }}
                  >
                    <FaUserPlus /> Register
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}