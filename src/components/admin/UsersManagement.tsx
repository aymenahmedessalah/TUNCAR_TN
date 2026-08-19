// المسار: src/components/admin/UsersManagement.tsx

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { UserProfile, UserRole } from '../../types/adminTypes';
import { FaUserPlus, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './UsersManagement.css';

interface UsersManagementProps {
  users: UserProfile[];
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  currentUserRole?: UserRole;
}

export default function UsersManagement({ users, setUsers, currentUserRole = 'super_admin' }: UsersManagementProps) {
  const { lang } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('catalog_admin');

  // معمارية الأمان: إخفاء الـ Owner تماماً (ID '0' أو role 'owner') عن أي شخص ليس Owner
  const filteredUsers = users.filter((user) => {
    if (currentUserRole !== 'owner') {
      return user.role !== 'owner' && user.id !== '0';
    }
    return true;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newName) return;
    if (newRole === 'owner' && currentUserRole !== 'owner') return;

    const newUser: UserProfile = {
      id: Date.now().toString(),
      username: newUsername,
      name: newName,
      role: newRole,
      status: 'active'
    };

    setUsers([...users, newUser]);
    setNewUsername('');
    setNewName('');
    setShowAddModal(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="cmd-container">
      
      {/* رأس الصفحة السيبراني */}
      <div className="flex justify-between items-center border-b border-[#00f0ff40] pb-3 mb-6">
        <div>
          <h1 className="text-xl font-black text-white tracking-widest uppercase">
            TUNCAR <span className="text-[#00f0ff] sys-num">// USERS_MANAGEMENT</span>
          </h1>
          <p className="text-[#00ff66] text-xs sys-num mt-1">
            {lang === 'ar' ? 'التحكم الكامل بالصلاحيات والأدوار الهرمية مباشرة' : 'Contrôle direct des rôles et statuts'}
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="add-user-btn flex items-center gap-2">
          <FaUserPlus /> <span>{lang === 'ar' ? 'إضافة مستخدم جديد' : 'Ajouter Utilisateur'}</span>
        </button>
      </div>

      {/* نافذة الإضافة المنبثقة (Modal) */}
      {showAddModal && (
        <div className="modal-overlay">
          <form onSubmit={handleAddUser} className="modal-form">
            <h3 className="text-[#00f0ff] font-bold mb-4">
              {lang === 'ar' ? 'إضافة مستخدم جديد للنظام' : 'Nouveau Utilisateur'}
            </h3>
            
            <div className="form-group mb-4">
              <label className="block text-xs text-slate-400 mb-1">
                {lang === 'ar' ? 'اسم المستخدم (Username)' : "Nom d'utilisateur"}
              </label>
              <input 
                type="text" 
                value={newUsername} 
                onChange={e => setNewUsername(e.target.value)} 
                placeholder="e.g. catalog_mgr" 
                required 
                className="w-full bg-black/60 border border-[#00f0ff40] p-2 rounded text-white text-sm outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="form-group mb-4">
              <label className="block text-xs text-slate-400 mb-1">
                {lang === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
              </label>
              <input 
                type="text" 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                required 
                className="w-full bg-black/60 border border-[#00f0ff40] p-2 rounded text-white text-sm outline-none focus:border-[#00f0ff]"
              />
            </div>

            <div className="form-group mb-6">
              <label className="block text-xs text-slate-400 mb-1">
                {lang === 'ar' ? 'الدور الهرمي' : 'Rôle'}
              </label>
              <select 
                value={newRole} 
                onChange={e => setNewRole(e.target.value as UserRole)}
                className="w-full bg-black/60 border border-[#00f0ff40] p-2 rounded text-white text-sm outline-none focus:border-[#00f0ff]"
              >
                {currentUserRole === 'owner' && <option value="owner">Owner (المالك)</option>}
                <option value="super_admin">Super Admin (المدير العام)</option>
                <option value="catalog_admin">Catalog Admin (مدير الكتالوج)</option>
                <option value="orders_admin">Orders Admin (مشرف الطلبات)</option>
                <option value="warranty_admin">Warranty Admin (أخصائي الضمان)</option>
              </select>
            </div>

            <div className="modal-actions flex justify-end gap-3">
              <button type="submit" className="save-btn px-4 py-2 bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] rounded hover:bg-[#00f0ff] hover:text-black transition text-sm font-bold">
                {lang === 'ar' ? 'حفظ' : 'Enregistrer'}
              </button>
              <button type="button" onClick={() => setShowAddModal(false)} className="cancel-btn px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition text-sm">
                {lang === 'ar' ? 'إلغاء' : 'Annuler'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* جدول عرض المستخدمين */}
      <div className="users-table-wrapper bg-black/40 border border-[#00f0ff20] rounded p-4 overflow-x-auto">
        <table className="users-table w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-[#00f0ff30] text-[#00f0ff] text-xs font-mono">
              <th className="p-3">ID</th>
              <th className="p-3">{lang === 'ar' ? 'اسم المستخدم' : 'Username'}</th>
              <th className="p-3">{lang === 'ar' ? 'الاسم الكامل' : 'Nom'}</th>
              <th className="p-3">{lang === 'ar' ? 'الدور الهرمي' : 'Rôle'}</th>
              <th className="p-3">{lang === 'ar' ? 'الحالة' : 'Statut'}</th>
              <th className="p-3">{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="interactive-row border-b border-slate-800 hover:bg-white/[0.02] transition">
                <td className="p-3 sys-num text-xs text-slate-400">#{user.id}</td>
                <td className="p-3 sys-num font-bold text-white">{user.username}</td>
                <td className="p-3 text-slate-200">{user.name}</td>
                <td className="p-3">
                  <span className={`role-badge px-2 py-1 rounded text-[11px] font-mono bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 ${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`status-badge px-2 py-1 rounded text-[11px] font-mono ${user.status === 'active' ? 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30' : 'bg-[#ff5500]/10 text-[#ff5500] border border-[#ff5500]/30'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3 items-center">
                    <button 
                      onClick={() => toggleStatus(user.id)} 
                      title="تبديل الحالة"
                      className="action-icon-btn p-1 transition hover:scale-110"
                      style={{ color: user.status === 'active' ? '#00ff66' : '#ff5500' }}
                    >
                      {user.status === 'active' ? <FaCheckCircle size={16} /> : <FaTimesCircle size={16} />}
                    </button>
                    {user.role !== 'owner' && (
                      <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        title="حذف المستخدم"
                        className="action-icon-btn p-1 text-[#ff5500] hover:scale-110 transition"
                      >
                        <FaTrash size={15} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}