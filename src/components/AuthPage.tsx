import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../translations';
import { FaUserTie, FaShoppingCart } from 'react-icons/fa';
import './AuthPage.css';

export default function AuthPage({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const { lang } = useLanguage();
  const { setRole } = useTheme();
  const t = translations[lang];
  
  const [isLogin, setIsLogin] = useState(true); // افتراضياً نبدأ بصفحة الدخول
  const [userType, setUserType] = useState<'buyer' | 'seller' | null>(null);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        
        {/* حالة الدخول */}
        {isLogin ? (
          <div className="auth-form">
            <h2>{t.loginTitle}</h2>
            <input type="email" placeholder={t.emailPlaceholder} className="auth-input" />
            <input type="password" placeholder={t.passwordPlaceholder} className="auth-input" />
            <button className="auth-submit" onClick={onAuthSuccess}>{t.loginBtn}</button>
            <p className="auth-toggle" onClick={() => setIsLogin(false)}>
              {t.noAccount} <span>{t.registerLink}</span>
            </p>
          </div>
        ) : (
          /* حالة التسجيل - تبدأ باختيار النوع (tags) */
          <div className="auth-form">
            <h2>{t.registerTitle}</h2>
            
            {!userType ? (
              <div className="role-selector">
                <div className="role-tag buyer" onClick={() => setUserType('buyer')}>
                  <FaShoppingCart size={30} /> <span>{t.buyer || "زبون"}</span>
                </div>
                <div className="role-tag seller" onClick={() => setUserType('seller')}>
                  <FaUserTie size={30} /> <span>{t.seller || "بائع"}</span>
                </div>
              </div>
            ) : (
              /* بعد اختيار النوع تظهر بقية الحقول */
              <>
                <input type="text" placeholder={t.namePlaceholder} className="auth-input" />
                <input type="email" placeholder={t.emailPlaceholder} className="auth-input" />
                <input type="password" placeholder={t.passwordPlaceholder} className="auth-input" />
                {userType === 'seller' && (
                  <>
                    <input type="text" placeholder="عنوان المحل" className="auth-input" />
                    <input type="text" placeholder="رقم بطاقة التعريف" className="auth-input" />
                    <input type="text" placeholder="رقم الباتينت" className="auth-input" />
                  </>
                )}
                <button className="auth-submit" onClick={() => { setRole(userType); onAuthSuccess(); }}>
                  {t.registerBtn}
                </button>
              </>
            )}
            
            <p className="auth-toggle" onClick={() => {setIsLogin(true); setUserType(null);}}>
              {t.hasAccount} <span>{t.loginLink}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}