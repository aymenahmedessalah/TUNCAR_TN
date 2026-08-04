import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaUserPlus, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './UsersManagement.css';

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'owner' | 'super_admin' | 'admin1' | 'admin2' | 'admin3' | 'supplier' | 'seller' | 'inspector' | 'user';
  tier: 'black' | 'gold' | 'silver' | 'classic';
  status: 'active' | 'pending' | 'suspended';
}

export default function UsersManagement({ users, setUsers }: { users: UserProfile[], setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>> }) {
  const { lang } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserProfile['role']>('user');
  const [newTier, setNewTier] = useState<UserProfile['tier']>('classic');

  const tierColors = {
    black: '#1a1a1a',
    gold: '#d4af37',
    silver: '#c0c0c0',
    classic: '#cd7f32'
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser: UserProfile = {
      id: Number(Date.now().toString().slice(-3)),
      name: newName,
      email: newEmail,
      role: newRole,
      tier: newTier,
      status: 'active'
    };

    setUsers([...users, newUser]);
    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'active' ? 'suspended' : 'active' };
      }
      return u;
    }));
  };

  return (
    <div className="users-management-container">
      <div className="header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2>{lang === 'ar' ? 'إدارة المستخدمين وقاعدة البيانات الحية' : 'Gestion Dynamique des Utilisateurs'}</h2>
          <p className="subtitle">{lang === 'ar' ? 'التحكم الكامل بالصلاحيات والأدوار الهرمية مباشرة' : 'Contrôle direct des rôles et statuts'}</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="add-user-btn">
          <FaUserPlus /> {lang === 'ar' ? 'إضافة مستخدم جديد' : 'Ajouter Utilisateur'}
        </button>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <form onSubmit={handleAddUser} className="modal-form">
            <h3>{lang === 'ar' ? 'إضافة مستخدم جديد للنظام' : 'Nouveau Utilisateur'}</h3>
            
            <div className="form-group">
              <label>{lang === 'ar' ? 'الاسم الكامل' : 'Nom'}</label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
              <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>{lang === 'ar' ? 'الدور الهرمي' : 'Rôle'}</label>
              <select value={newRole} onChange={e => setNewRole(e.target.value as any)}>
                <option value="owner">Owner (المالك السيادي)</option>
                <option value="super_admin">Super Admin (المدير العام)</option>
                <option value="admin1">Admin 1 (مدير أول)</option>
                <option value="admin2">Admin 2 (مدير ثان)</option>
                <option value="admin3">Admin 3 (مدير ثالث)</option>
                <option value="supplier">Supplier (المورد)</option>
                <option value="seller">Seller (البائع)</option>
                <option value="inspector">Inspector (المراقب)</option>
                <option value="user">User (مستخدم عادي)</option>
              </select>
            </div>

            <div className="form-group">
              <label>{lang === 'ar' ? 'درجة البطاقة' : 'Tier'}</label>
              <select value={newTier} onChange={e => setNewTier(e.target.value as any)}>
                <option value="black">Black Card</option>
                <option value="gold">Gold Card</option>
                <option value="silver">Silver Card</option>
                <option value="classic">Classic Card</option>
              </select>
            </div>

            <div className="modal-actions">
              <button type="submit" className="save-btn">{lang === 'ar' ? 'حفظ' : 'Enregistrer'}</button>
              <button type="button" onClick={() => setShowAddModal(false)} className="cancel-btn">{lang === 'ar' ? 'إلغاء' : 'Annuler'}</button>
            </div>
          </form>
        </div>
      )}

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>{lang === 'ar' ? 'الاسم' : 'Nom'}</th>
              <th>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</th>
              <th>{lang === 'ar' ? 'الدور الهرمي' : 'Rôle'}</th>
              <th>{lang === 'ar' ? 'درجة البطاقة' : 'Tier'}</th>
              <th>{lang === 'ar' ? 'الحالة' : 'Statut'}</th>
              <th>{lang === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="interactive-row">
                <td>#{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: tierColors[user.tier] }}></span>
                    {user.tier.toUpperCase()}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${user.status}`}>{user.status}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                      onClick={() => toggleStatus(Number(user.id))} 
                      title="تبديل الحالة"
                      className="action-icon-btn"
                      style={{ color: user.status === 'active' ? '#34d399' : '#f87171' }}
                    >
                      {user.status === 'active' ? <FaCheckCircle size={16} /> : <FaTimesCircle size={16} />}
                    </button>
                    {user.role !== 'owner' && (
                      <button 
                        onClick={() => handleDeleteUser(Number(user.id))} 
                        title="حذف المستخدم"
                        className="action-icon-btn"
                        style={{ color: '#ef4444' }}
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