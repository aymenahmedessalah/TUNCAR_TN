// المسار: src/components/auth/AuthPage.tsx

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations';
import { FaLock, FaUser, FaSignInAlt, FaUserPlus, FaUserTag, FaStore, FaIdCard, FaPhone, FaEye, FaEyeSlash, FaMicrosoft, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { UserProfile } from '../../types/adminTypes';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [storeName, setStoreName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedRole, setSelectedRole] = useState<'client' | 'seller'>('client');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedUsername = username.trim().toLowerCase();

    if (isLogin) {
      if (!trimmedUsername) return;

      let foundUser: UserProfile | undefined = usersDb.find(u => 
        (u.username && u.username.toLowerCase() === trimmedUsername) || 
        (u.name && u.name.toLowerCase().includes(trimmedUsername))
      );

      if (!foundUser) {
        if (trimmedUsername.includes('owner') || trimmedUsername.includes('admin')) {
          foundUser = { 
            id: '1', 
            name: 'Aymen Essalah (Owner)', 
            username: trimmedUsername,
            role: 'owner' as any, 
            status: 'active' 
          };
        } else if (trimmedUsername.includes('seller')) {
          foundUser = { 
            id: '4', 
            name: 'Mecano Parts Partner', 
            username: trimmedUsername,
            role: 'seller' as any, 
            status: 'active' 
          };
        } else {
          foundUser = { 
            id: String(Date.now()), 
            name: trimmedUsername, 
            username: trimmedUsername,
            role: 'client' as any, 
            status: 'active' 
          };
        }
      }

      onAuthSuccess(foundUser);
    } else {
      if (!trimmedUsername || !password || !name) {
        setError(lang === 'ar' ? 'الرجاء ملء الحقول الأساسية' : 'Veuillez remplir les champs obligatoires');
        return;
      }

      if (password !== confirmPassword) {
        setError(lang === 'ar' ? 'كلمتا المرور غير متطابقتين' : 'Les mots de passe ne correspondent pas');
        return;
      }

      if (selectedRole === 'seller' && (!storeName || !taxId || !phone)) {
        setError(lang === 'ar' ? 'الرجاء إدخال معلومات المتجر والمعرف الضريبي ورقم الهاتف كاملة للبائع' : 'Veuillez remplir toutes les informations professionnelles pour le vendeur');
        return;
      }
      
      const newUser: UserProfile = {
        id: Date.now().toString(),
        name: selectedRole === 'seller' ? `${name} (${storeName})` : name,
        username: trimmedUsername,
        role: selectedRole as any, 
        status: 'active'
      };
      
      onAuthSuccess(newUser);
    }
  };

  // محاكاة تسجيل الدخول الاجتماعي السريع
  const handleSocialLogin = (provider: string) => {
    const socialUser: UserProfile = {
      id: Date.now().toString(),
      name: `${provider} User`,
      username: `${provider.toLowerCase()}_user`,
      role: 'client' as any,
      status: 'active'
    };
    onAuthSuccess(socialUser);
  };

  return (
    <div className="auth-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isLogin ? t.loginTitle : t.registerTitle}</h2>
          <p>
            {isLogin 
              ? (lang === 'ar' ? 'مرحباً بك مجدداً في TUNCAR.TN' : 'Bienvenue de retour sur TUNCAR.TN')
              : (lang === 'ar' ? 'أنشئ حساباً جديداً للبدء بسهولة' : 'Créez un compte pour commencer')}
          </p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {/* أزرار الدخول السريع الاجتماعية */}
        <div className="social-auth-grid">
          <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')} title="Google">
            <FcGoogle size={18} />
            <span>Google</span>
          </button>
          <button type="button" className="social-btn" onClick={() => handleSocialLogin('Microsoft')} title="Microsoft">
            <FaMicrosoft size={16} color="#00a4ef" />
            <span>Microsoft</span>
          </button>
          <button type="button" className="social-btn" onClick={() => handleSocialLogin('Facebook')} title="Facebook">
            <FaFacebook size={16} color="#1877f2" />
            <span>Facebook</span>
          </button>
        </div>

        <div className="auth-divider">
          <span>{lang === 'ar' ? 'أو عبر البريد الإلكتروني' : 'ou par e-mail'}</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              {/* اختيار نوع الحساب */}
              <div className="role-switch-container">
                <label className="role-label">
                  <FaUserTag /> {lang === 'ar' ? 'نوع الحساب' : 'Type de compte'}
                </label>
                <div className="role-buttons">
                  <button
                    type="button"
                    className={`role-tab ${selectedRole === 'client' ? 'active' : ''}`}
                    onClick={() => setSelectedRole('client')}
                  >
                    {t.buyer || 'Client'}
                  </button>
                  <button
                    type="button"
                    className={`role-tab ${selectedRole === 'seller' ? 'active' : ''}`}
                    onClick={() => setSelectedRole('seller')}
                  >
                    {t.seller || 'Vendeur'}
                  </button>
                </div>
              </div>

              <div className="input-group">
                <FaUser className="input-icon" />
                <input 
                  type="text" 
                  placeholder={t.namePlaceholder || (lang === 'ar' ? 'الاسم الكامل' : 'Nom complet')} 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required
                />
              </div>

              {/* الحقول الإضافية للبائع */}
              {selectedRole === 'seller' && (
                <div className="seller-extra-fields">
                  <div className="seller-title">
                    {lang === 'ar' ? 'معلومات المتجر المهني' : 'Informations professionnelles'}
                  </div>

                  <div className="input-group">
                    <FaStore className="input-icon" />
                    <input 
                      type="text" 
                      placeholder={t.storeNamePlaceholder || (lang === 'ar' ? 'اسم المتجر' : 'Nom du magasin')} 
                      value={storeName} 
                      onChange={(e) => setStoreName(e.target.value)} 
                      required={selectedRole === 'seller'}
                    />
                  </div>

                  <div className="input-group">
                    <FaIdCard className="input-icon" />
                    <input 
                      type="text" 
                      placeholder={t.taxIdPlaceholder || (lang === 'ar' ? 'المعرف الضريبي' : 'Identifiant fiscal')} 
                      value={taxId} 
                      onChange={(e) => setTaxId(e.target.value)} 
                      required={selectedRole === 'seller'}
                    />
                  </div>

                  <div className="input-group">
                    <FaPhone className="input-icon" />
                    <input 
                      type="tel" 
                      placeholder={t.phonePlaceholder || (lang === 'ar' ? 'رقم الهاتف' : 'Téléphone')} 
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
            <FaUser className="input-icon" />
            <input 
              type="text" 
              placeholder={lang === 'ar' ? 'اسم المستخدم (Username)' : 'Nom d\'utilisateur'} 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder={t.passwordPlaceholder || (lang === 'ar' ? 'كلمة المرور' : 'Mot de passe')} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {!isLogin && (
            <div className="input-group">
              <FaLock className="input-icon" />
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder={lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirmer le mot de passe'} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required={!isLogin}
              />
              <button 
                type="button" 
                className="password-toggle-btn" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? <FaSignInAlt /> : <FaUserPlus />}
            <span>{isLogin ? t.loginBtn : t.registerBtn}</span>
          </button>
        </form>

        <div className="auth-switch">
          <p>
            <span onClick={() => { setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? (t.registerLink || 'إنشاء حساب جديد') : (t.loginLink || 'لديك حساب بالفعل؟ تسجيل الدخول')}
            </span>
          </p>
        </div>

        {isLogin && (
          <div className="auth-hint">
            تجربة سريعة: <code>owner</code> أو <code>client</code>
          </div>
        )}
      </div>
    </div>
  );
}