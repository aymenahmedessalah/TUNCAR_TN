import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { lang } = useLanguage();

  // تعريف المحتويات بناءً على اللغة
  const content = {
    fr: { title: "Système de Spécifications Techniques", desc: "Choisissez votre marque" },
    ar: { title: "نظام استدعاء بيانات السيارات", desc: "اختر الماركة التجارية" },
    en: { title: "Automotive Tech Specs", desc: "Select your brand" }
  };

  // تأكد من جلب اللغة الحالية، وإذا لم تكن موجودة، استخدم الفرنسية كافتراضي
  const currentContent = content[lang] || content.fr;

  return (
    <section className="hero-section" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h2>{currentContent.title}</h2>
      <p>{currentContent.desc}</p>
    </section>
  );
}