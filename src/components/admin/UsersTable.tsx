// المسار: src/components/admin/UsersTable.tsx

import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types/adminTypes';
import { FaUserShield, FaTrashAlt, FaCheckCircle, FaBan, FaPlus } from 'react-icons/fa';

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

  // معمارية الأمان: إخفاء الـ Owner تماماً (ID '0' أو Role owner) إذا لم يكن المستخدم الحالي هو الـ Owner
  const filteredUsers = users.filter((user) => {
    if (currentUserRole !== 'owner') {
      return user.role !== 'owner' && user.id !== '0';
    }
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !name) return;
    // منع إنشاء حساب بصلاحية owner عبر الواجهة العادية احتياطياً
    if (role === 'owner') return;
    onAddUser({ username, name, role, status: 'active' });
    setUsername('');
    setName('');
    setShowAddModal(false);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center bg-[#060a0f] p-4 rounded-xl border border-[#00f0ff40] shadow-[0_0_15px_rgba(0,240,255,0.05)]">
        <div>
          <h2 className="text-xl font-black text-white tracking-wide">إدارة مستخدمي ونظام Cyber Core</h2>
          <p className="text-xs text-[#00f0ff] font-mono mt-1">التحكم في الصلاحيات بناءً على اسم المستخدم</p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#00f0ff]/10 hover:bg-[#00f0ff] text-[#00f0ff] hover:text-black border border-[#00f0ff] px-4 py-2 rounded-lg transition-all text-sm font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]"
          >
            <FaPlus /> إضافة مشرف جديد
          </button>
        )}
      </div>

      <div className="overflow-x-auto w-full bg-[#060a0f] border border-[#00f0ff20] rounded-xl shadow-2xl">
        <table className="w-full text-left border-collapse" style={{ direction: 'rtl' }}>
          <thead>
            <tr className="border-b border-[#00f0ff30] bg-black/40 text-[#00f0ff] text-xs font-mono">
              <th className="py-4 px-6 font-semibold">المستخدم والاسم</th>
              <th className="py-4 px-6 font-semibold">اسم المستخدم</th>
              <th className="py-4 px-6 font-semibold">الدور التخصصي</th>
              <th className="py-4 px-6 font-semibold">الحالة</th>
              {canManage && <th className="py-4 px-6 font-semibold text-center">الإجراءات</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-white text-sm">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-medium flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                    <FaUserShield />
                  </div>
                  <span className="text-slate-100">{user.name}</span>
                </td>
                <td className="py-4 px-6 text-[#00f0ff] font-mono">@{user.username}</td>
                <td className="py-4 px-6">
                  {canManage ? (
                    <select
                      value={user.role}
                      onChange={(e) => onUpdateRole(user.id, e.target.value as UserRole)}
                      className="bg-black border border-[#00f0ff40] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00f0ff] font-mono"
                    >
                      {currentUserRole === 'owner' && <option value="owner">owner (المدير)</option>}
                      <option value="super_admin">super_admin (المشرف العام)</option>
                      <option value="catalog_admin">catalog_admin</option>
                      <option value="orders_admin">orders_admin</option>
                      <option value="warranty_admin">warranty_admin</option>
                    </select>
                  ) : (
                    <span className="px-3 py-1 rounded-md text-xs font-mono bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff]">
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="py-4 px-6">
                  {user.status === 'suspended' ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-[#ff5500]/10 border border-[#ff5500]/30 text-[#ff5500]">
                      <FaBan /> موقوف
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono bg-[#00ff66]/10 border border-[#00ff66]/30 text-[#00ff66]">
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
                            ? 'bg-[#ff5500]/10 border-[#ff5500]/30 text-[#ff5500] hover:bg-[#ff5500]/20'
                            : 'bg-[#00ff66]/10 border-[#00ff66]/30 text-[#00ff66] hover:bg-[#00ff66]/20'
                        }`}
                        title={user.status === 'active' ? 'إيقاف مؤقت' : 'تنشيط'}
                      >
                        {user.status === 'active' ? <FaBan size={14} /> : <FaCheckCircle size={14} />}
                      </button>
                      <button
                        onClick={() => onDeleteUser(user.id)}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all hover:scale-110"
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

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#060a0f] border border-[#00f0ff] rounded-xl p-6 w-full max-w-md space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.2)]" style={{ direction: 'rtl' }}>
            <h3 className="text-lg font-bold text-[#00f0ff] border-b border-[#00f0ff40] pb-2">إضافة مستخدم ومشرف جديد</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">الاسم الكامل</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-[#00f0ff40] rounded-lg p-2.5 text-white text-sm outline-none focus:border-[#00f0ff]"
                  placeholder="أدخل الاسم الكامل"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">اسم المستخدم</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-[#00f0ff40] rounded-lg p-2.5 text-white text-sm font-mono outline-none focus:border-[#00f0ff]"
                  placeholder="e.g. ahmed_admin"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1 font-semibold">الدور التخصصي</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-black border border-[#00f0ff40] rounded-lg p-2.5 text-white text-sm outline-none focus:border-[#00f0ff]"
                >
                  <option value="super_admin">super_admin (المشرف العام)</option>
                  <option value="catalog_admin">catalog_admin (مشرف الكتالوج)</option>
                  <option value="orders_admin">orders_admin (مشرف الطلبات)</option>
                  <option value="warranty_admin">warranty_admin (مسؤول الضمان)</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm hover:bg-slate-700 transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#00ff66]/20 border border-[#00ff66] text-[#00ff66] hover:bg-[#00ff66] hover:text-black rounded-lg text-sm font-bold transition shadow-[0_0_10px_rgba(0,255,102,0.2)]"
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