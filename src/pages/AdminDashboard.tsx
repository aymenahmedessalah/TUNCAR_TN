// المسار: src/pages/AdminDashboard.tsx

import React, { useState, useEffect } from 'react';
import { getCurrentSession, logoutUser, getUsersDb, saveUserToDb } from '../services/authService';
import { SharedOrderTask, UserProfile, UserRole } from '../types/adminTypes';
import UsersTable from '../components/admin/UsersTable';
import AdminCommandRoom from '../components/command-room/AdminCommandRoom';
import { CommandCenter } from './command_center';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { FaSignOutAlt, FaUsers, FaShieldAlt, FaTerminal } from 'react-icons/fa';

export default function AdminDashboard() {
  const currentUser = getCurrentSession();
  const [users, setUsers] = useState<UserProfile[]>(getUsersDb());
  const [activeTab, setActiveTab] = useState<'command' | 'users' | 'sys_core'>('command');
  const [sysTime, setSysTime] = useState<string>('');
  const { lang } = useLanguage();

  const t = translations[lang as keyof typeof translations] || translations.fr;

  const disconnectText = lang === 'ar' ? 'قطع الاتصال' : lang === 'en' ? 'Disconnect' : 'Déconnexion';

  // قائمة المهام المشتركة ومتابعة الطلبات وحالات الـ Claims لجميع الأدمينز
  const [tasks, setTasks] = useState<SharedOrderTask[]>([
    {
      id: '1',
      orderCode: 'TN-99201',
      clientUsername: 'golf6_owner',
      itemSku: 'VAG-06J115611F',
      generalStatus: 'Under Investigation',
      catalogStatus: 'Approved',
      ordersStatus: 'Unboxing Issue Flagged',
      warrantyStatus: 'Frozen',
      notes: lang === 'ar' ? 'تم الإبلاغ عن مشكلة في التغليف الخارجي، جاري التدقيق لمعالجة الـ Claim.' : lang === 'en' ? 'External packaging issue reported, investigating the claim.' : 'Problème d’emballage externe signalé, en cours d’investigation.'
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(new Date().toLocaleTimeString('en-GB'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#060a0f] flex items-center justify-center text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="bg-[#121826] p-8 rounded-2xl border border-[#334155] text-center space-y-4 max-w-md">
          <h2 className="text-xl font-bold text-red-400">{t.adminAccessError}</h2>
          <p className="text-sm text-slate-400">{t.authSubtitle}</p>
        </div>
      </div>
    );
  }

  const handleUpdateRole = (id: string, role: UserRole) => {
    const updated = users.map(u => u.id === id ? { ...u, role } : u);
    setUsers(updated);
    localStorage.setItem('cyber_core_users_db', JSON.stringify(updated));
  };

  const handleToggleStatus = (id: string) => {
    const updated = users.map(u => 
      u.id === id 
        ? { ...u, status: (u.status === 'active' ? 'suspended' : 'active') as 'active' | 'suspended' } 
        : u
    );
    setUsers(updated);
    localStorage.setItem('cyber_core_users_db', JSON.stringify(updated));
  };

  const handleDeleteUser = (id: string) => {
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    localStorage.setItem('cyber_core_users_db', JSON.stringify(updated));
  };

  const handleAddUser = (newUser: Omit<UserProfile, 'id'>) => {
    const created = saveUserToDb(newUser);
    setUsers([...users, created]);
  };

  const handleUpdateTaskStatus = (taskId: string, field: keyof SharedOrderTask, value: string) => {
    setTasks(prev => prev.map(item => item.id === taskId ? { ...item, [field]: value } : item));
  };

  const handleEmergencyKillSwitch = () => {
    alert(t.emergencyAlert);
  };

  // التحقق مما إذا كان المستخدم يملك صلاحية الوصول للـ CommandCenter (Owner أو Superuser)
  const hasSovereignAccess = currentUser.role === 'owner' || currentUser.role === 'super_admin';

  return (
    <div className="min-h-screen bg-[#060a0f] text-slate-100 p-6 font-sans select-none" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* الشريط العلوي لغرفة العمليات المشتركة */}
        <header className="bg-[#121826] border border-[#1e293b] rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <FaShieldAlt size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wider text-white uppercase">
                {lang === 'ar' ? 'غرفة العمليات المشتركة للإدارة' : lang === 'en' ? 'Shared Operations Command Room' : 'Salle de Commandement Opérationnelle'}
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.cmdCenter.welcome}: <span className="text-[#38bdf8] font-mono">@{currentUser.username}</span> | {t.cmdCenter.status}: <span className="text-[#00ff66] font-mono uppercase">{currentUser.role}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-[#0b1329] border border-[#334155] rounded-xl font-mono text-xs text-cyan-400">
              SYS_TIME: {sysTime}
            </div>

            <button 
              onClick={() => { logoutUser(); window.location.reload(); }}
              className="flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-900/40 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <FaSignOutAlt /> {disconnectText}
            </button>
          </div>
        </header>

        {/* أزرار التنقل بين الغرفة المشتركة، إدارة المستخدمين، ولوحة القيادة العليا */}
        <nav className="flex gap-3 flex-wrap">
          <button
            onClick={() => setActiveTab('command')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'command' 
              ? 'bg-[#0ea5e9] text-[#0b1329] shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
              : 'bg-[#121826] text-slate-400 border border-[#1e293b] hover:bg-[#1e293b] hover:text-white'
            }`}
          >
            <FaShieldAlt /> {lang === 'ar' ? 'متابعة الطلبات والـ Claims' : lang === 'en' ? 'Orders & Claims Hub' : 'Suivi Commandes & Réclamations'}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'users' 
              ? 'bg-[#0ea5e9] text-[#0b1329] shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
              : 'bg-[#121826] text-slate-400 border border-[#1e293b] hover:bg-[#1e293b] hover:text-white'
            }`}
          >
            <FaUsers /> {t.cmdCenter.usersTab}
          </button>

          {hasSovereignAccess && (
            <button
              onClick={() => setActiveTab('sys_core')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'sys_core' 
                ? 'bg-amber-500 text-[#0b1329] shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                : 'bg-[#121826] text-amber-400 border border-amber-500/30 hover:bg-amber-500/10'
              }`}
            >
              <FaTerminal /> {lang === 'ar' ? 'لوحة القيادة السيادية (Core)' : lang === 'en' ? 'Sovereign Core' : 'Noyau Souverain'}
            </button>
          )}
        </nav>

        {/* محتوى اللوحة الديناميكي */}
        <main className="bg-[#121826] border border-[#1e293b] rounded-2xl p-6 min-h-[550px] shadow-xl">
          
          {activeTab === 'command' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-[#0b1329] border border-[#1e293b] rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-cyan-400">
                    {lang === 'ar' ? 'محطة المتابعة والتحقق المباشر' : lang === 'en' ? 'Live Monitoring & Claims Processing' : 'Suivi en direct et traitement des réclamations'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {lang === 'ar' ? 'يمكن لكل الأدمينز مراجعة أطوار الطلبات وتحديث الحالات لحظياً.' : lang === 'en' ? 'All admins can review order states and update statuses live.' : 'Tous les administrateurs peuvent suivre l’état des commandes en temps réel.'}
                  </p>
                </div>
                <div className="text-xs font-mono bg-cyan-950/40 text-cyan-300 px-3 py-1.5 rounded-lg border border-cyan-800/40">
                  ACTIVE_TASKS: {tasks.length}
                </div>
              </div>

              <AdminCommandRoom 
                tasks={tasks} 
                currentRole={currentUser.role} 
                onUpdateTaskStatus={handleUpdateTaskStatus} 
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="animate-fadeIn">
              <UsersTable
                users={users}
                currentUserRole={currentUser.role}
                onUpdateRole={handleUpdateRole}
                onToggleStatus={handleToggleStatus}
                onDeleteUser={handleDeleteUser}
                onAddUser={handleAddUser}
              />
            </div>
          )}

          {activeTab === 'sys_core' && hasSovereignAccess && (
            <div className="animate-fadeIn">
              <CommandCenter 
                currentUser={currentUser}
                users={users}
                setUsers={setUsers}
                onTriggerEmergencyKillSwitch={handleEmergencyKillSwitch}
                onNavigateToView={(view) => setActiveTab(view as any)}
              />
            </div>
          )}
        </main>

      </div>
    </div>
  );
}