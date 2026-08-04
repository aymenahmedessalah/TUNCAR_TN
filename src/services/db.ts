export interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'super_admin' | 'client' | 'seller';
  tier: string;
  status: 'active' | 'pending' | 'suspended';
  storeName?: string;
  taxId?: string;
  phone?: string;
  createdAt: string;
}

const DB_KEY = 'tuncar_real_db_v1';

// تهيئة قاعدة البيانات الحقيقية مع تسجيل المالك المؤسس حصراً إذا كانت فارغة
export const initializeDatabase = (): UserRecord[] => {
  const existing = localStorage.getItem(DB_KEY);
  if (!existing) {
    const initialOwner: UserRecord = {
      id: 'owner-root-01',
      name: 'Aymen Ahmed Essalah',
      email: 'owner@tuncar.tn',
      role: 'owner',
      tier: 'black',
      status: 'active',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(DB_KEY, JSON.stringify([initialOwner]));
    return [initialOwner];
  }
  try {
    return JSON.parse(existing);
  } catch {
    return [];
  }
};

// استرجاع كافة المستخدمين من قاعدة البيانات الحقيقية
export const getUsersDb = (): UserRecord[] => {
  return initializeDatabase();
};

// حفظ مستخدم جديد حقيقي في القاعدة مع فحص التكرار
export const saveUserToDb = (newUser: Omit<UserRecord, 'id' | 'createdAt'>): UserRecord => {
  const users = getUsersDb();
  
  const exists = users.find(u => u.email.toLowerCase() === newUser.email.toLowerCase());
  if (exists) {
    throw new Error('البريد الإلكتروني مسجل مسبقاً في قاعدة البيانات.');
  }

  const createdUser: UserRecord = {
    ...newUser,
    id: 'user_' + Date.now() + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString()
  };

  users.push(createdUser);
  localStorage.setItem(DB_KEY, JSON.stringify(users));
  return createdUser;
};

// تدمير وتصفير قاعدة البيانات بالكامل (بروتوكول الطوارئ النووي)
export const wipeDatabase = (): void => {
  localStorage.removeItem(DB_KEY);
};