// المسار: src/data/usersDb.ts

import { UserProfile } from '../types/adminTypes';

// قاعدة بيانات المستخدمين الأولية المستقلة المتوافقة مع هيكل Cyber Core
export const usersdb: UserProfile[] = [
  {
    id: '0',
    username: 'Aymen',
    name: 'Aymen Ahmed Essalah',
    role: 'owner',
    status: 'active'
  },
  {
    id: '1',
    username: 'super_admin',
    name: 'General Director',
    role: 'super_admin',
    status: 'active'
  },
  {
    id: '2',
    username: 'catalog_mgr',
    name: 'Catalog Manager',
    role: 'catalog_admin',
    status: 'active'
  },
  {
    id: '3',
    username: 'orders_mgr',
    name: 'Orders Supervisor',
    role: 'orders_admin',
    status: 'active'
  },
  {
    id: '4',
    username: 'warranty_mgr',
    name: 'Warranty Specialist',
    role: 'warranty_admin',
    status: 'active'
  }
];