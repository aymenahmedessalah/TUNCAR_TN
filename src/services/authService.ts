import { getUsersDb, saveUserToDb, UserRecord } from './db';

const CURRENT_SESSION_KEY = 'tuncar_active_session_v1';

// دالة تسجيل الدخول الحقيقية
export const loginUser = (email: string): UserRecord => {
  const users = getUsersDb();
  const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
  
  if (!user) {
    throw new Error('البريد الإلكتروني غير موجود في قاعدة البيانات الحقيقية.');
  }

  if (user.status === 'suspended') {
    throw new Error('هذا الحساب معطل حالياً من قبل الإدارة.');
  }

  // حفظ الجلسة النشطة محلياً
  localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(user));
  return user;
};

// دالة تسجيل مستخدم جديد حقيقي (مثل تسجيل البائعين أو العملاء)
export const registerUser = (userData: {
  name: string;
  email: string;
  role: 'client' | 'seller';
  tier?: string;
  storeName?: string;
  taxId?: string;
  phone?: string;
}): UserRecord => {
  const newUser = saveUserToDb({
    ...userData,
    tier: userData.tier || 'classic',
    status: userData.role === 'seller' ? 'pending' : 'active' // البائعون يحتاجون موافقة، والعملاء مفعلون مباشرة
  });

  // تسجيل الدخول تلقائياً بعد التسجيل الناجح
  localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newUser));
  return newUser;
};

// استرجاع المستخدم الحالي النشط في الجلسة
export const getCurrentSession = (): UserRecord | null => {
  const session = localStorage.getItem(CURRENT_SESSION_KEY);
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
};

// إنهاء الجلسة (تسجيل الخروج)
export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_SESSION_KEY);
};