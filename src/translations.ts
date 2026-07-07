export const translations = {
  fr: {
    placeholderText: "Chercher une pièce OEM...",
    placeholderVin: "Entrez le VIN (17 caractères requis)...",
    cart: "Panier",
    steps: { brand: 'Marque', model: 'Modèle', year: 'Année', transmission: 'Transmission', energy: 'Énergie', variant: 'Variante' },
    energyTypes: { energy: 'Énergie', petrol: 'Essence', diesel: 'Diesel', electric: 'Électrique', hybrid: 'Hybride' },
    reset: 'Réinitialiser',
    instruction: 'Veuillez sélectionner:'
  },
  en: {
    placeholderText: "Search for an OEM part...",
    placeholderVin: "Enter VIN (17 characters required)...",
    cart: "Cart",
    steps: { brand: 'Brand', model: 'Model', year: 'Year', transmission: 'Transmission', energy: 'Energy', variant: 'Variant' },
    energyTypes: { energy: 'Energy', petrol: 'Petrol', diesel: 'Diesel', electric: 'Electric', hybrid: 'Hybrid' },
    reset: 'Reset',
    instruction: 'Please select:'
  },
  ar: {
    placeholderText: "ابحث عن قطعة سيارة OEM...",
    placeholderVin: "أدخل رقم الهيكل (VIN) (17 حرفاً)...",
    cart: "السلة",
    steps: { brand: 'الماركة', model: 'الموديل', year: 'السنة', transmission: 'ناقل الحركة', energy: 'الطاقة', variant: 'النسخة' },
    energyTypes: { energy: 'الطاقة', petrol: 'بنزين', diesel: 'ديزل', electric: 'كهرباء', hybrid: 'هجين' },
    reset: 'إعادة تعيين',
    instruction: 'يرجى اختيار:'
  }
} as const; // إضافة 'as const' تجعل الأنواع ثابتة ودقيقة جداً

// هذا النوع سيساعدك في إكمال الكود تلقائياً (Autocomplete) في المكونات
export type TranslationType = typeof translations.fr;