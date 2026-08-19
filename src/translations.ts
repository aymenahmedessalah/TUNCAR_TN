// المسار: src/translations.ts

export const translations = {
  fr: {
    // 1. Authentification & Compte
    loginTitle: "Connexion",
    registerTitle: "Créer un compte",
    authSubtitle: "Connectez-vous pour continuer vers le panier et gérer vos commandes",
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

    // 2. Champs Professionnels (Vendeurs)
    storeNamePlaceholder: "Nom du Magasin / Entreprise",
    taxIdPlaceholder: "Matricule Fiscale",
    phonePlaceholder: "Téléphone Professionnel",
    sellerRequiredInfo: "Informations professionnelles requises",
    selectAccountType: "Type de compte",

    // 3. Recherche & Véhicules
    placeholderText: "Chercher une pièce OEM...",
    placeholderVin: "Entrez le VIN (17 caractères requis)...",
    reset: "Réinitialiser",
    instruction: "Veuillez sélectionner:",
    steps: {
      brand: "Marque",
      model: "Modèle",
      year: "Année",
      transmission: "Transmission",
      energy: "Énergie",
      variant: "Variante"
    },
    energyTypes: {
      energy: "Énergie",
      petrol: "Essence",
      diesel: "Diesel",
      electric: "Électrique",
      hybrid: "Hybride"
    },

    // 4. Panier & Commandes
    cart: "Panier",
    cartTitle: "Mon Panier d'Achats",
    cartEmpty: "Votre panier est vide",
    checkoutBtn: "Passer la commande",
    cartCountText: "articles dans le panier",
    continueShopping: "Continuer vos achats",

    // 5. Tableaux de Bord & Administration
    sellerDashboardTitle: "🛠️ Tableau de bord Vendeur & Ateliers",
    browseStore: "Parcourir la boutique",
    sellerAccessError: "Désolé, ce tableau de bord est réservé aux vendeurs agréés.",
    backToHome: "Retour à l'accueil",
    adminTitle: "🛡️ Tableau de bord Administratif Souverain",
    adminSubtitle: "Gestion du système, utilisateurs, permissions et contrôle général",
    adminAccessError: "Désolé, cette page est strictement administrative et réservée aux administrateurs.",
    emergencyAlert: "⚠️ Protocole d'urgence souverain activé avec succès !",

    // 6. Command Center & Owner Dashboard (لوحة القيادة السيادية)
    cmdCenter: {
      kill: "KILL",
      welcome: "Bienvenue",
      status: "Statut: Actif",
      mainTab: "Tableau de bord",
      usersTab: "Utilisateurs",
      marketTab: "Marketplace",
      adminTab: "Administration",
      sales: "Ventes totales",
      activeParts: "Pièces actives",
      sysStatus: "État du système",
      secureStatus: "SÉCURISÉ / 99.9%",
      marketCardTitle: "Gestion Marketplace",
      marketCardDesc: "Contrôle des pièces, catégories et prix",
      usersCardTitle: "Gestion des Utilisateurs",
      usersCardDesc: "Suivi des comptes, rôles et activités",
      logsTitle: "JOURNAUX ET TÉLÉMÉTRIE DU SYSTÈME",
      confirmTitle: "Êtes-vous sûr de vouloir exécuter la commande d'arrêt (KILL) ?",
      confirmBtn: "Confirmer",
      cancelBtn: "Annuler"
    },

    // 7. Marketplace
    marketplace: {
      title: "Catalogue Pièces Détachées (TecDoc Engine)",
      subtitle: "Sélectionnez votre véhicule ou recherchez par référence OEM",
      searchPlaceholder: "Rechercher par référence OEM ou nom...",
      filterAll: "Tous",
      filterEngine: "Moteur",
      filterBrakes: "Freinage",
      filterSuspension: "Suspension",
      filterElectronics: "Électronique",
      noPartsFound: "Aucune pièce trouvée pour cette configuration.",
      addToCart: "Ajouter au Panier",
      priceLabel: "Prix indicatif",
      stockAvailable: "En Stock",
      oemReference: "Réf OEM"
    },

    // 8. Tableau de bord Vendeur (Seller Dashboard Extra)
    systemNode: "Nœud Système // Nœud Commercial Vendeur",
    idLabel: "ID : SECURE-SELLER-9042",
    backButton: "Retour au Tableau de Bord",
    tabs: {
      inventory: "Boutique & Pièces",
      finances: "Transactions & Portefeuille",
      reclamations: "Réclamations & Timeline",
      subscriptions: "Abonnements & Avantages (VIP)"
    },
    inventoryCard: {
      title: "Gestion du stock des pièces de rechange",
      addBtn: "Ajouter une nouvelle pièce",
      desc: "Insertion des pièces selon les normes de la structure stratifiée (11-Tier) avec anonymat complet vis-à-vis des clients finaux."
    },
    financesCard: {
      totalTransactions: "Transactions Totales",
      completedOrders: "Commandes Terminées",
      pendingProcessing: "En Cours de Traitement",
      walletBalance: "Solde du Portefeuille"
    },
    reclamationsCard: {
      alertText: "Examen d'un litige ou d'un retour lié à une pièce (en préservant strictement l'anonymat de l'autre partie via la timeline).",
      status: "Audit Sécurisé En Cours"
    },
    subscriptionsCard: {
      title: "Abonnement Pack Premium (Black Tier Perks)",
      status: "Actif jusqu'à la fin du mois",
      desc: "Bénéficiez d'une visibilité prioritaire dans les résultats de recherche, d'un support dédié et de commissions réduites."
    },
    footer: "L'interface fonctionne sous protocole de confidentialité absolue, avec un traitement des données via des canaux cryptés."
  },

  en: {
    // 1. Authentication & Account
    loginTitle: "Login",
    registerTitle: "Register",
    authSubtitle: "Sign in to continue to your cart and manage your orders",
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

    // 2. Professional Fields (Sellers)
    storeNamePlaceholder: "Store / Company Name",
    taxIdPlaceholder: "Tax ID (Matricule Fiscale)",
    phonePlaceholder: "Professional Phone",
    sellerRequiredInfo: "Required professional information",
    selectAccountType: "Account Type",

    // 3. Search & Vehicles
    placeholderText: "Search for an OEM part...",
    placeholderVin: "Enter VIN (17 characters required)...",
    reset: "Reset",
    instruction: "Please select:",
    steps: {
      brand: "Brand",
      model: "Model",
      year: "Year",
      transmission: "Transmission",
      energy: "Energy",
      variant: "Variant"
    },
    energyTypes: {
      energy: "Energy",
      petrol: "Petrol",
      diesel: "Diesel",
      electric: "Electric",
      hybrid: "Hybrid"
    },

    // 4. Cart & Checkout
    cart: "Cart",
    cartTitle: "My Shopping Cart",
    cartEmpty: "Your cart is empty",
    checkoutBtn: "Proceed to Checkout",
    cartCountText: "items in cart",
    continueShopping: "Continue Shopping",

    // 5. Dashboards & Administration
    sellerDashboardTitle: "🛠️ Seller & Workshops Dashboard",
    browseStore: "Browse Store",
    sellerAccessError: "Sorry, this dashboard is restricted to approved sellers.",
    backToHome: "Back to Home",
    adminTitle: "🛡️ Sovereign Administrative Control Center",
    adminSubtitle: "System management, users, permissions, and general control",
    adminAccessError: "Sorry, this page is strictly administrative and restricted to admins.",
    emergencyAlert: "⚠️ Sovereign emergency kill switch protocol triggered successfully!",

    // 6. Command Center & Owner Dashboard
    cmdCenter: {
      kill: "KILL",
      welcome: "Welcome",
      status: "Status: Active",
      mainTab: "Dashboard",
      usersTab: "Users",
      marketTab: "Marketplace",
      adminTab: "Admin Management",
      sales: "Total Sales",
      activeParts: "Active Parts",
      sysStatus: "System Status",
      secureStatus: "SECURE / 99.9%",
      marketCardTitle: "Marketplace Management",
      marketCardDesc: "Control spare parts, categories, and pricing",
      usersCardTitle: "Users Management",
      usersCardDesc: "Monitor accounts, permissions, and activities",
      logsTitle: "SYSTEM TELEMETRY & OWNER LOGS",
      confirmTitle: "Are you sure you want to execute the KILL switch command?",
      confirmBtn: "Confirm",
      cancelBtn: "Cancel"
    },

    // 7. Marketplace
    marketplace: {
      title: "Spare Parts Catalog (TecDoc Engine)",
      subtitle: "Select your vehicle or search by OEM reference",
      searchPlaceholder: "Search by OEM reference or name...",
      filterAll: "All",
      filterEngine: "Engine",
      filterBrakes: "Brakes",
      filterSuspension: "Suspension",
      filterElectronics: "Electronics",
      noPartsFound: "No parts found for this configuration.",
      addToCart: "Add to Cart",
      priceLabel: "Indicative Price",
      stockAvailable: "In Stock",
      oemReference: "OEM Ref"
    },

    // 8. Seller Dashboard Extra
    systemNode: "System Node // Seller Commercial Node",
    idLabel: "ID: SECURE-SELLER-9042",
    backButton: "Return to Main Dashboard",
    tabs: {
      inventory: "Store & Inventory",
      finances: "Transactions & Wallet",
      reclamations: "Reclamations & Timeline",
      subscriptions: "Packages & Perks (VIP)"
    },
    inventoryCard: {
      title: "Spare Parts & Available Inventory Management",
      addBtn: "Add New Part",
      desc: "List parts under the 11-Tier structural standard with complete anonymity from end customers."
    },
    financesCard: {
      totalTransactions: "Total Transactions",
      completedOrders: "Completed Orders",
      pendingProcessing: "Pending Processing",
      walletBalance: "Wallet Balance"
    },
    reclamationsCard: {
      alertText: "Review dispute or return status related to a part (while maintaining strict identity privacy via timeline).",
      status: "Secure Audit Pending"
    },
    subscriptionsCard: {
      title: "Premium Subscription (Black Tier Perks)",
      status: "Active until end of month",
      desc: "Gain priority visibility in customer search results, dedicated support, and reduced commissions via financial intermediary."
    },
    footer: "The interface operates under an absolute privacy protocol, processing data through encrypted channels ensuring total anonymity."
  },

  ar: {
    // 1. المصادقة والحساب
    loginTitle: "تسجيل الدخول",
    registerTitle: "إنشاء حساب",
    authSubtitle: "تسجيل الدخول للمتابعة إلى سلة المشتريات وإدارة طلباتك",
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

    // 2. حقول البائعين الإضافية
    storeNamePlaceholder: "اسم المحل أو الشركة التجارية",
    taxIdPlaceholder: "المعرف الضريبي / الباتينت (Matricule Fiscale)",
    phonePlaceholder: "رقم الهاتف المهني",
    sellerRequiredInfo: "معلومات المتجر التجارية الإجبارية",
    selectAccountType: "حدد نوع الحساب",

    // 3. البحث والمركبات
    placeholderText: "ابحث عن قطعة سيارة OEM...",
    placeholderVin: "أدخل رقم الهيكل (VIN) (17 حرفاً)...",
    reset: "إعادة تعيين",
    instruction: "يرجى اختيار:",
    steps: {
      brand: "الماركة",
      model: "الموديل",
      year: "السنة",
      transmission: "ناقل الحركة",
      energy: "الطاقة",
      variant: "النسخة"
    },
    energyTypes: {
      energy: "الطاقة",
      petrol: "بنزين",
      diesel: "ديزل",
      electric: "كهرباء",
      hybrid: "هجين"
    },

    // 4. السلة وإتمام الشراء
    cart: "السلة",
    cartTitle: "سلة المشتريات",
    cartEmpty: "سلة المشتريات فارغة",
    checkoutBtn: "إتمام الشراء",
    cartCountText: "منتجات في السلة",
    continueShopping: "مواصلة التسوق",

    // 5. لوحات التحكم والإدارة
    sellerDashboardTitle: "🛠️ لوحة تحكم البائع والورشات",
    browseStore: "تصفح متجر القطع",
    sellerAccessError: "عذراً، هذه اللوحة مخصصة للبائعين المعتمدين فقط.",
    backToHome: "العودة للرئيسية",
    adminTitle: "🛡️ لوحة التحكم الإدارية السيادية",
    adminSubtitle: "إدارة النظام، المستخدمين، الصلاحيات، والرقابة العامة",
    adminAccessError: "عذراً، هذه الصفحة إدارية بحتة ومخصصة للمشرفين فقط.",
    emergencyAlert: "⚠️ تم استدعاء بروتوكول الطوارئ السيادي بنجاح!",

    // 6. Command Center & Owner Dashboard
    cmdCenter: {
      kill: "KILL",
      welcome: "مرحباً",
      status: "الحالة: نشط",
      mainTab: "لوحة القيادة",
      usersTab: "المستخدمون",
      marketTab: "السوق",
      adminTab: "إدارة المشرفين",
      sales: "إجمالي المبيعات",
      activeParts: "القطع المسجلة",
      sysStatus: "حالة النظام",
      secureStatus: "آمن / 99.9%",
      marketCardTitle: "إدارة السوق (Marketplace)",
      marketCardDesc: "التحكم في قطع الغيار، التصنيفات، والأسعار",
      usersCardTitle: "إدارة المستخدمين",
      usersCardDesc: "متابعة الحسابات، الصلاحيات، والنشاطات",
      logsTitle: "سجلات النظام والمراقبة الحية",
      confirmTitle: "هل أنت متأكد من تنفيذ أمر الإيقاف (KILL)؟",
      confirmBtn: "تأكيد",
      cancelBtn: "إلغاء"
    },

    // 7. Marketplace
    marketplace: {
      title: "كتالوج قطع الغيار (محرك TecDoc)",
      subtitle: "حدد مركبتك أو ابحث برقم القطع الأصلي OEM",
      searchPlaceholder: "ابحث برقم القطع OEM أو بالاسم...",
      filterAll: "الكل",
      filterEngine: "المحرك",
      filterBrakes: "نظام الفرامل",
      filterSuspension: "التعليق",
      filterElectronics: "الإلكترونيات",
      noPartsFound: "لم يتم العثور على قطع غيار مطابقة لهذه الهيكلة.",
      addToCart: "إضافة للسلة",
      priceLabel: "السعر التقديري",
      stockAvailable: "متوفر بالمخزون",
      oemReference: "رقم القطع OEM"
    },

    // 8. لوحة تحكم البائع (Seller Dashboard Extra)
    systemNode: "عقدة النظام // عقدة التجارة للبائع",
    idLabel: "المعرف: SECURE-SELLER-9042",
    backButton: "العودة للوحة الرئيسية",
    tabs: {
      inventory: "المتجر وإدخال القطع",
      finances: "المعاملات والمحفظة",
      reclamations: "الشكاوى والتايم لاين",
      subscriptions: "الباقات والامتيازات (VIP)"
    },
    inventoryCard: {
      title: "إدارة مخزون قطع الغيار والقطع المتاحة",
      addBtn: "إضافة قطعة جديدة",
      desc: "إدراج القطع ضمن معايير الهيكل الطبقي (11-Tier) مع إخفاء الهوية تماماً عن العملاء النهائيين."
    },
    financesCard: {
      totalTransactions: "إجمالي المعاملات",
      completedOrders: "الطلبات المنجزة",
      pendingProcessing: "قيد المعالجة",
      walletBalance: "رصيد المحفظة"
    },
    reclamationsCard: {
      alertText: "مراجعة حالة نزاع أو استرجاع مرتبطة بإحدى القطع (مع الحفاظ التام على سرية هوية الطرف الآخر عبر التايم لاين).",
      status: "قيد التدقيق الآمن"
    },
    subscriptionsCard: {
      title: "اشتراك الباقة المميزة (Black Tier Perks)",
      status: "فعالة حتى نهاية الشهر",
      desc: "الحصول على أولوية الظهور في نتائج البحث للعملاء، دعم فني مخصص، وعمولات مخفضة عبر الوسيط المالي."
    },
    footer: "الواجهة تعمل ببروتوكول الخصوصية المطلقة، مع معالجة البيانات عبر قنوات مشفرة تضمن عدم تباين الهويات بين الأطراف التجارية."
  }
} as const;

export type TranslationType = typeof translations.fr;
export type SupportedLanguage = 'ar' | 'fr' | 'en';