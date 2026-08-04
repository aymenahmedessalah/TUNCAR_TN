import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VehicleSelector from './components/VehicleSelector';
import TechnicalMapPage from './components/TechnicalMapPage';
import AuthPage from './components/AuthPage';
import UsersManagement, { UserProfile } from './components/UsersManagement';
import OwnerCommandCenter from './components/roles/OwnerCommandCenter';
import Dashboard from './components/roles/Dashboard';
import Marketplace from './components/roles/Marketplace';
import UserDashboard from './components/roles/UserDashboard';
import ProfilePage from './components/ProfilePage';
import { initialUsersDb } from './data/usersDb';
import { translations } from './translations'; // استيراد ملف الترجمات

export default function App() {
  const [view, setView] = useState('buyer'); 
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  
  const { lang } = useLanguage();
  const t = translations[lang as keyof typeof translations] || translations.fr; // جلب نصوص اللغة الحالية

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [usersDb, setUsersDb] = useState<UserProfile[]>(initialUsersDb);

  useEffect(() => {
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const handleCartClick = () => {
    if (!currentUser) {
      setView('login_inline');
    } else {
      setView('cart');
    }
  };

  const handleAuthSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    
    if (user.role === 'owner') {
      setView('owner_command');
    } else if (user.role === 'super_admin') {
      setView('users');
    } else if (user.role === 'supplier') {
      setView('dashboard_supplier');
    } else if (user.role === 'seller') {
      setView('dashboard_seller');
    } else {
      setView('user_dashboard');
    }
  };

  return (
    <ThemeProvider>
      <div className="app-container">
        <Navbar 
          setView={setView} 
          cartCount={cartCount} 
          cartTotal={cartTotal} 
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onCartClick={handleCartClick}
        />
        
        <main className="main-content">
          {view === 'buyer' && (
            <div className="view-wrapper">
              <Hero />
              <VehicleSelector onSelect={() => setView('map')} />
            </div>
          )}

          {view === 'user_dashboard' && (
            <div className="view-wrapper">
              <UserDashboard onBackToHome={() => setView('buyer')} />
            </div>
          )}
          
          {view === 'map' && (
            <TechnicalMapPage onBack={() => setView('buyer')} />
          )}

          {view === 'marketplace' && (
            <Marketplace onBack={() => setView('buyer')} />
          )}

          {(view === 'login' || view === 'login_inline') && (
            <div className="view-wrapper" style={{ maxWidth: '500px', margin: '40px auto', padding: '20px' }}>
              <AuthPage initialMode="login" onAuthSuccess={handleAuthSuccess} />
            </div>
          )}

          {view === 'register' && (
            <AuthPage 
              initialMode="register" 
              onAuthSuccess={(user) => {
                setUsersDb(prev => [...prev, user]);
                handleAuthSuccess(user);
              }} 
            />
          )}

          {view === 'dashboard_seller' && (
            currentUser && (currentUser.role === 'seller' || currentUser.role === 'owner') ? (
              <div className="seller-hybrid-view">
                <div style={{ background: '#1e293b', padding: '15px', color: '#38bdf8', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{t.sellerDashboardTitle}</span>
                  <button onClick={() => setView('buyer')} style={{ padding: '8px 15px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {t.browseStore}
                  </button>
                </div>
                <Dashboard onBack={() => setView('buyer')} userRole="seller" />
              </div>
            ) : (
              <div className="view-wrapper" style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
                <h2>{t.sellerAccessError}</h2>
                <button onClick={() => setView('buyer')} style={{ marginTop: '20px', padding: '10px 20px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  {t.backToHome}
                </button>
              </div>
            )
          )}

          {view === 'dashboard_supplier' && (
            currentUser && (currentUser.role === 'supplier' || currentUser.role === 'owner') ? (
              <Dashboard onBack={() => setView('buyer')} userRole="supplier" />
            ) : null
          )}

          {view === 'users' && (
            currentUser && (currentUser.role === 'super_admin' || currentUser.role === 'owner') ? (
              <div className="admin-exclusive-view" style={{ padding: '20px' }}>
                <div style={{ background: '#0f172a', border: '1px solid #334155', padding: '15px', borderRadius: '8px', marginBottom: '20px', color: '#f8fafc' }}>
                  <h2>{t.adminTitle}</h2>
                  <p>{t.adminSubtitle}</p>
                </div>
                <UsersManagement users={usersDb} setUsers={setUsersDb} />
              </div>
            ) : (
              <div className="view-wrapper" style={{ padding: '40px', color: 'white', textAlign: 'center' }}>
                <h2>{t.adminAccessError}</h2>
                <button onClick={() => setView('buyer')} style={{ marginTop: '20px', padding: '10px 20px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  {t.backToHome}
                </button>
              </div>
            )
          )}

          {view === 'owner_command' && (
            currentUser && currentUser.role === 'owner' ? (
              <OwnerCommandCenter 
                users={usersDb} 
                setUsers={setUsersDb} 
                onTriggerEmergencyKillSwitch={() => {
                  alert(t.emergencyAlert);
                }}
                onNavigateToView={(targetView) => setView(targetView)}
              />
            ) : null
          )}

          {view === 'profile' && (
            <ProfilePage />
          )}
          
          {view === 'cart' && (
            <div className="view-wrapper" style={{ padding: '40px', color: 'white' }}>
              <h2>{t.cartTitle}</h2>
              <p>{t.cartCountText} {cartCount}</p>
              <button onClick={() => setView('buyer')} style={{ marginTop: '20px', padding: '10px 20px', background: '#0284c7', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {t.continueShopping}
              </button>
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}