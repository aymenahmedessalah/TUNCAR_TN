// src/assets/LogoProvider.ts

// هنا نقوم باستيراد اللوجوهات
import volkswagen from './logos/volkswagen.svg';
import toyota from './logos/toyota.svg';
import bmw from './logos/bmw.svg';
// أضف أي ماركة أخرى بنفس الطريقة

const logos: { [key: string]: string } = {
  volkswagen,
  toyota,
  bmw,
};

export const getLogo = (brandName: string) => {
  return logos[brandName.toLowerCase()] || '/default-logo.svg'; 
};