// المسار: src/services/authService.ts

import { UserProfile } from '../types/adminTypes';
import { usersdb } from '../data/usersDb'; 

const CURRENT_SESSION_KEY = 'cyber_core_active_session_v1';
const USERS_DB_KEY = 'cyber_core_users_db';

// جلب قاعدة البيانات (من LocalStorage أو الاعتماد على usersdb الحقيقية كأصل)
export const getUsersDb = (): UserProfile[] => {
  const localDb = localStorage.getItem(USERS_DB_KEY);
  if (!localDb) {
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(usersdb));
    return usersdb;
  }
  try {
    return JSON.parse(localDb);
  } catch {
    return usersdb;
  }
};

// حفظ مستخدم جديد وتحديث LocalStorage
export const saveUserToDb = (userData: Omit<UserProfile, 'id'>): UserProfile => {
  const users = getUsersDb();
  const newUser: UserProfile = {
    id: Date.now().toString(),
    ...userData,
  };
  users.push(newUser);
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  return newUser;
};

// تسجيل الدخول بالـ username
export const loginUser = (username: string): UserProfile => {
  const users = getUsersDb();
  const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
  
  if (!user) {
    throw new Error('اسم المستخدم غير موجود في قاعدة بيانات النظام.');
  }

  if (user.status === 'suspended') {
    throw new Error('هذا الحساب معطل حالياً من قبل الإدارة العليا.');
  }

  localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(user));
  return user;
};

// تسجيل مستخدم جديد
export const registerUser = (userData: {
  username: string;
  name: string;
  role: UserProfile['role'];
}): UserProfile => {
  const users = getUsersDb();
  const exists = users.some(u => u.username.toLowerCase() === userData.username.trim().toLowerCase());
  
  if (exists) {
    throw new Error('اسم المستخدم مستخدم مسبقاً.');
  }

  const newUser = saveUserToDb({
    ...userData,
    status: 'active'
  });

  localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newUser));
  return newUser;
};

// استرجاع الجلسة الحالية
export const getCurrentSession = (): UserProfile | null => {
  const session = localStorage.getItem(CURRENT_SESSION_KEY);
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
};

// تسجيل الخروج
export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_SESSION_KEY);
};