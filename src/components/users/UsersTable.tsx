import React, { useState } from 'react';
import { UserProfile, UserRole } from './types';
import { FaUserShield, FaEdit, FaTrashAlt, FaCheckCircle, FaBan, FaPlus } from 'react-icons/fa';

interface UsersTableProps {
  users: UserProfile[];
  currentUserRole: UserRole;
  onUpdateRole: (userId: string, newRole: UserRole) => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser: (newUser: Omit<UserProfile, 'id'>) => void;
}

export default function UsersTable({
  users,
  currentUserRole,
  onUpdateRole,
  onToggleStatus,
  onDeleteUser,
  onAddUser
}: UsersTableProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('catalog_admin');

  const canManage = currentUserRole === 'owner' || currentUserRole === 'super_admin';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !name) return;
    onAddUser({ username, name, role, status: 'active' });
    setUsername('');
    setName('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full space-y-6">
      {/* رأس القسم وزر الإضافة */}
      <div className="flex justify-between items-center bg-[#0b1329] p-4 rounded-xl border border-[#334155]">
        <div>
          <h2 className="text-xl font-bold text-white">إدارة مستخدمي ونظام Cyber Core</h2>
          <p className="text-sm text-gray-400">التحكم في الصلاحيات بناءً على اسم المستخدم (Username)</p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all text-sm font-medium"
          >
            <FaPlus /> إضافة مشرف جديد
          </button>
        )}
      </div>

      {/* جدول المستخدمين */}
      <div className="overflow-x-auto w-full bg-[#0b1329] border border-[#334155] rounded-xl shadow-2xl">
        <table className="w-full text-left border-collapse" style={{ direction: 'rtl' }}>
          <thead>
            <tr className="border-b border-[#334155] bg-[#1e293b]/50 text-[#94a3b8] text-sm">
              <th className="py-4 px-6 font-semibold">المستخدم / الاسم</th>
              <th className="py-4 px-6 font-semibold">اسم المستخدم (Username)</th>
              <th className="py-4 px-6 font-semibold">الدور التخصصي (Role)</th>
              <th className="py-4 px-6 font-semibold">الحالة</th>
              {canManage && <th className="py-4 px-6 font-semibold text-center">الإجراءات</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#334155]/50 text-white text-sm">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#1e293b]/30 transition-colors">
                <td className="py-4 px-6 font-medium flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center text-[#3b82f6]">
                    <FaUserShield />
                  </div>
                  <span>{user.name}</span>
                </td>
                <td className="py-4 px-6 text-[#38bdf8] font-mono">@{user.username}</td>
                <td className="py-4 px-6">
                  {canManage ? (
                    <select
                      value={user.role}
                      onChange={(e) => onUpdateRole(user.id, e.target.value as UserRole)}
                      className="bg-[#1e293b] border border-[#334155] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500"
                    >
                      <option value="owner">owner (المدير)</option>
                      <option value="super_admin">super_admin (المشرف العام)</option>
                      <option value="catalog_admin">catalog_admin</option>
                      <option value="orders_admin">orders_admin</option>
                      <option value="warranty_admin">warranty_admin</option>
                    </select>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#1e293b] border border-[#334155] text-gray-300">
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  {user.status === 'suspended' ? (
                    <span className="inline-flex items-center gap-1.5 text-red-400 text-xs font-medium">
                      <FaBan /> موقوف
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                      <FaCheckCircle /> نشط
                    </span>
                  )}
                </td>
                {canManage && (
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onToggleStatus(user.id)}
                        className={`p-2 rounded-lg border text-xs transition-all ${
                          user.status === 'active'
                            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                        title={user.status === 'active' ? 'إيقاف مؤقت' : 'تنشيط'}
                      >
                        {user.status === 'active' ? <FaBan size={14} /> : <FaCheckCircle size={14} />}
                      </button>
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                        title="حذف"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* نافذة الإضافة */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b1329] border border-[#334155] rounded-xl p-6 w-full max-w-md space-y-4" style={{ direction: 'rtl' }}>
            <h3 className="text-lg font-bold text-white">إضافة مستخدم / مشرف جديد</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white text-sm"
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">اسم المستخدم (Username)</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white text-sm font-mono"
                  placeholder="e.g. ahmed_admin"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">الدور التخصصي</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-[#1e293b] border border-[#334155] rounded-lg p-2.5 text-white text-sm"
                >
                  <option value="super_admin">super_admin (المشرف العام)</option>
                  <option value="catalog_admin">catalog_admin (مشرف الكتالوج)</option>
                  <option value="orders_admin">orders_admin (مشرف الطلبات)</option>
                  <option value="warranty_admin">warranty_admin (مسؤول الضمان)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm"
                >
                  حفظ وتفعيل
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}