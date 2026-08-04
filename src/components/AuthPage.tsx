import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { FaEnvelope, FaLock, FaUser, FaSignInAlt, FaUserPlus, FaUserTag, FaStore, FaIdCard, FaPhone } from 'react-icons/fa';
import { UserProfile } from './UsersManagement';
import './AuthPage.css';

interface AuthPageProps {
  initialMode?: 'login' | 'register';
  usersDb?: UserProfile[];
  onAuthSuccess: (user: UserProfile) => void;
}

export default function AuthPage({ initialMode = 'login', usersDb = [], onAuthSuccess }: AuthPageProps) {
  const { lang } = useLanguage();
  const t = translations[lang] || translations.fr;
  
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // حقول إضافية خاصة بالبائع (Vendeur)
  const [storeName, setStoreName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedRole, setSelectedRole] = useState<'client' | 'seller'>('client');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();

    if (isLogin) {
      if (!trimmedEmail) return;

      // البحث في قاعدة البيانات المتاحة
      let foundUser = usersDb.find(u => u.email.toLowerCase() === trimmedEmail);

      // توليد ذكي للحسابات الإدارية أو السريعة في حال عدم تواجدها مسبقاً
      if (!foundUser) {
        if (trimmedEmail.includes('owner') || trimmedEmail.includes('admin')) {
          foundUser = { id: 1, name: 'Aymen Essalah (Owner)', email: trimmedEmail, role: 'owner', tier: 'black', status: 'active' };
        } else if (trimmedEmail.includes('seller')) {
          foundUser = { id: 4, name: 'Mecano Parts Partner', email: trimmedEmail, role: 'seller', tier: 'silver', status: 'active' };
        } else {
          foundUser = { id: Date.now(), name: trimmedEmail.split('@')[0], email: trimmedEmail, role: 'client', tier: 'classic', status: 'active' };
        }
      }

      onAuthSuccess(foundUser);
    } else {
      if (!trimmedEmail || !password || !name) {
        setError(lang === 'ar' ? 'الرجاء ملء الحقول الأساسية' : 'Veuillez remplir les champs obligatoires');
        return;
      }

      // التحقق من تعبئة معلومات البائع كاملة عند اختيار Vendeur
      if (selectedRole === 'seller' && (!storeName || !taxId || !phone)) {
        setError(lang === 'ar' ? 'الرجاء إدخال معلومات المتجر والمعرف الضريبي ورقم الهاتف كاملة للبائع' : 'Veuillez remplir toutes les informations professionnelles pour le vendeur');
        return;
      }
      
      const newUser: UserProfile = {
        id: Number(Date.now().toString().slice(-3)),
        name: selectedRole === 'seller' ? `${name} (${storeName})` : name,
        email: trimmedEmail,
        role: selectedRole, 
        tier: selectedRole === 'client' ? 'classic' : 'silver',
        status: selectedRole === 'seller' ? 'pending' : 'active'
      };
      
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="auth-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="auth-card" style={{ maxWidth: selectedRole === 'seller' && !isLogin ? '500px' : '420px', transition: 'all 0.3s ease' }}>
        <div className="auth-header">
          <h2>{isLogin ? t.loginTitle : t.registerTitle}</h2>
          <p>{lang === 'ar' ? 'منصة TUNCAR.TN لإدارة السيارات وقطع الغيار' : 'Plateforme TUNCAR.TN'}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              {/* اختيار نوع الحساب */}
              <div className="input-group" style={{ flexDirection: 'column', alignItems: 'stretch', background: '#0b1329', padding: '10px 15px', borderRadius: '8px', border: '1px solid #334155' }}>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaUserTag /> {t.selectAccountType}
                </label>
                <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('client')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: selectedRole === 'client' ? '2px solid #38bdf8' : '1px solid #475569',
                      background: selectedRole === 'client' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                      color: selectedRole === 'client' ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}
                  >
                    {t.buyer}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('seller')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      border: selectedRole === 'seller' ? '2px solid #38bdf8' : '1px solid #475569',
                      background: selectedRole === 'seller' ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
                      color: selectedRole === 'seller' ? '#38bdf8' : '#94a3b8',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}
                  >
                    {t.seller}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <FaUser className="input-icon" />
                <input 
                  type="text" 
                  placeholder={t.namePlaceholder} 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>

              {/* الحقول الإضافية للبائع */}
              {selectedRole === 'seller' && (
                <div className="seller-extra-fields" style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '12px', borderRadius: '8px', border: '1px dashed #38bdf8', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }}>
                    {t.sellerRequiredInfo}
                  </div>

                  <div className="input-group" style={{ margin: 0 }}>
                    <FaStore className="input-icon" />
                    <input 
                      type="text" 
                      placeholder={t.storeNamePlaceholder} 
                      value={storeName} 
                      onChange={(e) => setStoreName(e.target.value)} 
                      required={selectedRole === 'seller'}
                    />
                  </div>

                  <div className="input-group" style={{ margin: 0 }}>
                    <FaIdCard className="input-icon" />
                    <input 
                      type="text" 
                      placeholder={t.taxIdPlaceholder} 
                      value={taxId} 
                      onChange={(e) => setTaxId(e.target.value)} 
                      required={selectedRole === 'seller'}
                    />
                  </div>

                  <div className="input-group" style={{ margin: 0 }}>
                    <FaPhone className="input-icon" />
                    <input 
                      type="tel" 
                      placeholder={t.phonePlaceholder} 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required={selectedRole === 'seller'}
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input 
              type="email" 
              placeholder={t.emailPlaceholder} 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type="password" 
              placeholder={t.passwordPlaceholder} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            {isLogin ? <FaSignInAlt /> : <FaUserPlus />}
            <span>{isLogin ? t.loginBtn : t.registerBtn}</span>
          </button>
        </form>

        <div className="auth-switch">
          <p>
            <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', color: '#38bdf8' }}>
              {isLogin ? t.registerLink : t.loginLink}
            </span>
          </p>
        </div>

        {isLogin && (
          <div className="auth-hint" style={{ marginTop: '15px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
            تجربة سريعة: <code>owner@tuncar.tn</code><br />
            <code>client@tuncar.tn</code>
          </div>
        )}
      </div>
    </div>
  );
}