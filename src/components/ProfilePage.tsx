import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function ProfilePage() {
  const { lang } = useLanguage();
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | null>(null);

  const texts = {
    fr: { title: "Choisissez votre rôle", buyer: "Acheteur", seller: "Vendeur", desc: "Quel est votre objectif sur AutoTech ?" },
    ar: { title: "اختر صفتك", buyer: "مشتري", seller: "بائع", desc: "ما هو هدفك من استخدام أوتوتك؟" },
    en: { title: "Choose your role", buyer: "Buyer", seller: "Seller", desc: "What is your goal on AutoTech?" }
  };

  const t = texts[lang];

  return (
    <div className="profile-container">
      <h2>{t.title}</h2>
      <p>{t.desc}</p>
      
      <div className="role-selection">
        <button 
          className={userRole === 'buyer' ? 'active' : ''} 
          onClick={() => setUserRole('buyer')}
        >
          {t.buyer}
        </button>
        <button 
          className={userRole === 'seller' ? 'active' : ''} 
          onClick={() => setUserRole('seller')}
        >
          {t.seller}
        </button>
      </div>

      {userRole && (
        <div className="role-confirmation">
          <p>{lang === 'fr' ? `Vous êtes maintenant : ${userRole}` : lang === 'ar' ? `أنت الآن: ${userRole === 'buyer' ? 'مشتري' : 'بائع'}` : `You are now: ${userRole}`}</p>
        </div>
      )}
    </div>
  );
}