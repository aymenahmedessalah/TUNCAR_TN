export type UserRole = 'owner' | 'super_admin' | 'catalog_admin' | 'orders_admin' | 'warranty_admin';

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  status: 'active' | 'suspended';
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