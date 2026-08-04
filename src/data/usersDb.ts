import { UserProfile } from '../components/UsersManagement';

// قاعدة بيانات المستخدمين الأولية المستقلة
export const initialUsersDb: UserProfile[] = [
  { id: 0, name: 'Aymen Ahmed Essalah', email: 'owner@tuncar.tn', role: 'owner', tier: 'black', status: 'active' },
  { id: 1, name: 'General Manager', email: 'director@tuncar.tn', role: 'super_admin', tier: 'black', status: 'active' },
  { id: 4, name: 'Mecano Parts', email: 'seller@tuncar.tn', role: 'seller', tier: 'silver', status: 'pending' },
  { id: 7, name: 'Client Test', email: 'client@tuncar.tn', role: 'client', tier: 'classic', status: 'active' },
];