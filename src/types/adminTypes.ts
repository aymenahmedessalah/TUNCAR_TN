// المسار: src/types/adminTypes.ts

export type UserRole = 
  | 'owner' 
  | 'super_admin' 
  | 'catalog_admin' 
  | 'orders_admin' 
  | 'warranty_admin' 
  | 'client' 
  | 'seller' 
  | 'supplier';

export interface UserProfile {
  id: string;
  username?: string;
  name: string;
  email?: string;
  role: UserRole;
  tier?: string;
  status?: 'active' | 'suspended' | 'pending';
}

export interface SharedOrderTask {
  id: string;
  orderCode: string;
  clientUsername: string;
  itemSku: string;
  generalStatus: 'Normal' | 'Under Investigation' | 'Replacement Needed' | 'Resolved';
  catalogStatus: 'Pending' | 'Approved' | 'Image Error Corrected';
  ordersStatus: 'Pending' | 'Unboxing Issue Flagged' | 'Wrong Item Confirmed';
  warrantyStatus: 'Not Activated' | 'Frozen' | 'Active';
  notes: string;
}