import { UserProfile } from '../types/adminTypes';

// استخراج نوع الدور مباشرة من الـ UserProfile لضمان التطابق التام دون أخطاء
type SystemRole = UserProfile['role'];

// تحديد الصلاحيات المتاحة لكل دور حسب المصفوفة
const PERMISSIONS_MAP: Record<SystemRole, string[]> = {
  owner: ['*'], // صلاحيات مطلقة وكاملة على النظام
  super_admin: ['users:read', 'catalog:*', 'orders:*', 'warranty:*', 'reports:read'],
  catalog_admin: ['catalog:*'],
  orders_admin: ['orders:*'],
  warranty_admin: ['warranty:*']
};

/**
 * دالة للتحقق مما إذا كان المستخدم يملك صلاحية معينة مع التأكد من حالته النشطة
 */
export function hasPermission(user: UserProfile | null, permission: string): boolean {
  if (!user || user.status !== 'active') return false;
  
  const userPerms = PERMISSIONS_MAP[user.role] || [];
  return userPerms.includes('*') || userPerms.includes(permission);
}