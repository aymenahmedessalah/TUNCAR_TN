import React, { useState, useEffect } from 'react';
import { UserProfile, SharedOrderTask, UserRole } from '../types/adminTypes';
import UsersTable from '../components/users/UsersTable';
import AdminCommandRoom from '../components/command-room/AdminCommandRoom';

export default function AdminDashboard() {
  // محاكاة المستخدم الحالي (يمكنك تبديل الـ role هنا لتجربة الصلاحيات المختلفة)
  const [currentUser] = useState<{ username: string; role: UserRole }>({
    username: 'owner_master',
    role: 'owner'
  });

  // تخزين واسترجاع المستخدمين من localStorage
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('cyber_core_users');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', username: 'ahmed_owner', name: 'أحمد (المالك)', role: 'owner', status: 'active' },
      { id: '2', username: 'catalog_expert', name: 'سامي (مشرف الكتالوج)', role: 'catalog_admin', status: 'active' },
      { id: '3', username: 'orders_boss', name: 'خالد (مشرف الطلبات)', role: 'orders_admin', status: 'active' },
      { id: '4', username: 'warranty_guard', name: 'عمر (مسؤول الضمان)', role: 'warranty_admin', status: 'active' },
    ];
  });

  // تخزين واسترجاع مهام غرفة العمليات من localStorage
  const [tasks, setTasks] = useState<SharedOrderTask[]>(() => {
    const saved = localStorage.getItem('cyber_core_tasks');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 't1',
        orderCode: 'ORD-9921',
        clientUsername: 'customer_ali',
        itemSku: 'VW-G6-BUMP-01',
        generalStatus: 'Under Investigation',
        catalogStatus: 'Image Error Corrected',
        ordersStatus: 'Unboxing Issue Flagged',
        warrantyStatus: 'Frozen',
        notes: 'البائع أضاف صورة خاطئة للصدام، العميل فتح علبة ووجد قطعة غير مطابقة، والضمان مجمّد لحين الحل.'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('cyber_core_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('cyber_core_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // دوال إدارة المستخدمين
  const handleUpdateRole = (userId: string, newRole: UserRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleAddUser = (newUser: Omit<UserProfile, 'id'>) => {
    const created: UserProfile = { ...newUser, id: Date.now().toString() };
    setUsers([...users, created]);
  };

  // دالة تحديث مهام غرفة العمليات المشتركة
  const handleUpdateTaskStatus = (taskId: string, field: keyof SharedOrderTask, value: string) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updated = { ...t, [field]: value };
        // تحديث تلقائي للحالة العامة بناءً على تفاعل المشرفين
        if (updated.catalogStatus === 'Approved' && updated.ordersStatus === 'Pending' && updated.warrantyStatus === 'Active') {
          updated.generalStatus = 'Resolved';
        } else {
          updated.generalStatus = 'Under Investigation';
        }
        return updated;
      }
      return t;
    }));
  };

  return (
    <div className="min-h-screen bg-[#050b18] p-6 space-y-10" style={{ direction: 'rtl' }}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* شريط معلومات المستخدم الحالي */}
        <div className="bg-[#0b1329] border border-[#334155] p-4 rounded-xl flex justify-between items-center text-white">
          <div>
            <h1 className="text-lg font-bold">لوحة تحكم Cyber Core الرئسية</h1>
            <p className="text-xs text-gray-400">مرحباً بك، <span className="text-[#38bdf8]">@{currentUser.username}</span> (الصلاحية: {currentUser.role})</p>
          </div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-mono">
            Live LocalStorage Active
          </span>
        </div>

        {/* غرفة العمليات المشتركة */}
        <AdminCommandRoom 
          tasks={tasks} 
          currentRole={currentUser.role} 
          onUpdateTaskStatus={handleUpdateTaskStatus} 
        />

        {/* جدول المستخدمين الحقيقي */}
        <UsersTable 
          users={users}
          currentUserRole={currentUser.role}
          onUpdateRole={handleUpdateRole}
          onToggleStatus={handleToggleStatus}
          onDeleteUser={handleDeleteUser}
          onAddUser={handleAddUser}
        />

      </div>
    </div>
  );
}