export const translations = {
  fr: {
    // واجهة الدخول والتسجيل
    loginTitle: "Connexion",
    registerTitle: "Créer un compte",
    namePlaceholder: "Nom complet",
    emailPlaceholder: "Adresse e-mail",
    passwordPlaceholder: "Mot de passe",
    loginBtn: "Se connecter",
    registerBtn: "S'inscrire",
    noAccount: "Pas de compte ?",
    hasAccount: "Déjà un compte ?",
    registerLink: "Inscrivez-vous",
    loginLink: "Connectez-vous",
    buyer: "Client",
    seller: "Vendeur",
    // البحث
    placeholderText: "Chercher une pièce OEM...",
    placeholderVin: "Entrez le VIN (17 caractères requis)...",
    cart: "Panier",
    steps: { brand: 'Marque', model: 'Modèle', year: 'Année', transmission: 'Transmission', energy: 'Énergie', variant: 'Variante' },
    energyTypes: { energy: 'Énergie', petrol: 'Essence', diesel: 'Diesel', electric: 'Électrique', hybrid: 'Hybride' },
    reset: 'Réinitialiser',
    instruction: 'Veuillez sélectionner:'
  },
  en: {
    // واجهة الدخول والتسجيل
    loginTitle: "Login",
    registerTitle: "Register",
    namePlaceholder: "Full Name",
    emailPlaceholder: "Email Address",
    passwordPlaceholder: "Password",
    loginBtn: "Login",
    registerBtn: "Register",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    registerLink: "Register now",
    loginLink: "Log in",
    buyer: "Buyer",
    seller: "Seller",
    // البحث
    placeholderText: "Search for an OEM part...",
    placeholderVin: "Enter VIN (17 characters required)...",
    cart: "Cart",
    steps: { brand: 'Brand', model: 'Model', year: 'Year', transmission: 'Transmission', energy: 'Energy', variant: 'Variant' },
    energyTypes: { energy: 'Energy', petrol: 'Petrol', diesel: 'Diesel', electric: 'Electric', hybrid: 'Hybrid' },
    reset: 'Reset',
    instruction: 'Please select:'
  },
  ar: {
    // واجهة الدخول والتسجيل
    loginTitle: "تسجيل الدخول",
    registerTitle: "إنشاء حساب",
    namePlaceholder: "الاسم الكامل",
    emailPlaceholder: "البريد الإلكتروني",
    passwordPlaceholder: "كلمة المرور",
    loginBtn: "دخول",
    registerBtn: "تسجيل",
    noAccount: "ليس لديك حساب؟",
    hasAccount: "لديك حساب بالفعل؟",
    registerLink: "سجل الآن",
    loginLink: "سجل الدخول",
    buyer: "زبون",
    seller: "بائع",
    // البحث
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