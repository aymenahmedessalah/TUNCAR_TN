// المسار: src/pages/command_center.tsx

import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types/adminTypes';
import UsersManagement from '../components/admin/UsersManagement';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import './command_center.css';

interface CommandCenterProps {
  currentUser: UserProfile;
  users: UserProfile[];
  setUsers: React.Dispatch<React.SetStateAction<UserProfile[]>>;
  onTriggerEmergencyKillSwitch: () => void;
  onNavigateToView: (view: string) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  currentUser,
  users,
  setUsers,
  onTriggerEmergencyKillSwitch,
  onNavigateToView
}) => {
  const [sysTime, setSysTime] = useState('');
  const [activeView, setActiveView] = useState<'main' | 'users' | 'marketplace' | 'sys_status'>('main');
  const [showKillConfirm, setShowKillConfirm] = useState(false);
  const { lang } = useLanguage();

  const t = translations[lang as keyof typeof translations] || translations.fr;

  useEffect(() => {
    const timer = setInterval(() => {
      setSysTime(new Date().toLocaleTimeString('en-GB'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="cmd-container" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      <div className="cmd-top-section">
        <div className="cmd-header-bar">
          
          <div className="text-[#00ff66] text-sm opacity-80 font-semibold">
            {t.cmdCenter.welcome}, {currentUser.name} | [ROOT_ACCESS_ACTIVE]
          </div>

          <div className="kill-time-wrapper">
            <button 
              onClick={() => setShowKillConfirm(true)} 
              className="kill-switch-btn"
            >
              {t.cmdCenter.kill}
            </button>
            
            <div className="time-display">
              {sysTime}
            </div>
          </div>

        </div>

        {/* أزرار التنقل السيادية */}
        <div className="cmd-tags-container">
          {[
            { id: 'main', label: t.cmdCenter.mainTab },
            { id: 'users', label: t.cmdCenter.usersTab },
            { id: 'marketplace', label: t.cmdCenter.marketTab },
            { id: 'sys_status', label: lang === 'ar' ? 'حالة النظام' : lang === 'en' ? 'System Status' : 'État Système' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`cmd-tag-btn ${activeView === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cmd-content-area">
        {/* 1. لوحة المؤشرات الرئيسية */}
        {activeView === 'main' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="metrics-grid">
              <div className="metric-box">
                <span className="text-[11px] text-slate-400 block mb-1">{t.cmdCenter.sales}</span>
                <div className="sys-num text-xl font-bold text-[#00f0ff]">TND 415,200</div>
                <span className="text-[10px] text-[#00ff66] mt-1 block">▲ +14.2%</span>
              </div>
              
              <div className="metric-box">
                <span className="text-[11px] text-slate-400 block mb-1">{t.cmdCenter.activeParts}</span>
                <div className="sys-num text-xl font-bold text-[#00ff66]">1,482</div>
                <span className="text-[10px] text-slate-400 mt-1 block">Live Sync</span>
              </div>

              <div className="metric-box">
                <span className="text-[11px] text-slate-400 block mb-1">{t.cmdCenter.sysStatus}</span>
                <div className="sys-num text-sm font-bold text-[#00f0ff] uppercase tracking-wider">{t.cmdCenter.secureStatus}</div>
                <span className="text-[10px] text-[#00ff66] mt-1 block">● Online</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-xs font-mono text-slate-400 tracking-wider">{t.cmdCenter.logsTitle}</div>
              <div className="terminal-box">
                <div className="log-row success">
                  <span className="sys-num">[SYS_ROOT]</span> Owner clearance verified. Full system access granted.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. إدارة المستخدمين */}
        {activeView === 'users' && (
          <div className="animate-fadeIn">
            <UsersManagement 
              users={users} 
              setUsers={setUsers} 
            />
          </div>
        )}

        {/* 3. السوق والقطع */}
        {activeView === 'marketplace' && (
          <div className="flex flex-col gap-6 animate-fadeIn bg-[#121826] border border-[#1e293b] p-6 rounded-xl">
            <h3 className="text-lg font-bold text-[#f8fafc] m-0">{t.cmdCenter.marketCardTitle}</h3>
            <p className="text-sm text-[#94a3b8] m-0">{t.cmdCenter.marketCardDesc}</p>
            <div className="p-4 bg-[#0b1329] border border-[#334155] rounded-lg text-xs font-mono text-[#00f0ff]">
              STATUS: Marketplace module operational. 1,482 auto components indexed.
            </div>
          </div>
        )}

        {/* 4. حالة النظام والأمان السيادي */}
        {activeView === 'sys_status' && (
          <div className="flex flex-col gap-6 animate-fadeIn bg-[#121826] border border-[#1e293b] p-6 rounded-xl">
            <h3 className="text-lg font-bold text-[#f8fafc] m-0">Sovereign Security Protocol</h3>
            <p className="text-sm text-[#94a3b8] m-0">All communication channels are encrypted under TUNCAR core standards.</p>
            <div className="p-4 bg-[#0b1329] border border-[#334155] rounded-lg text-xs font-mono text-emerald-400">
              FIREWALL: SECURE | ENCRYPTION: AES-256 | ACTIVE NODES: 3
            </div>
          </div>
        )}
      </div>

      {/* نافذة التأكيد للطوارئ */}
      {showKillConfirm && (
        <div className="cmd-modal-overlay">
          <div className="cmd-modal-box">
            <h2 className="text-white text-lg font-bold mb-6">
              {t.cmdCenter.confirmTitle}
            </h2>
            <div className="flex gap-4 justify-center">
              <button onClick={() => { onTriggerEmergencyKillSwitch(); setShowKillConfirm(false); }} className="bg-red-600 text-white px-6 py-2 rounded font-bold cursor-pointer">
                {t.cmdCenter.confirmBtn}
              </button>
              <button onClick={() => setShowKillConfirm(false)} className="bg-slate-700 text-white px-6 py-2 rounded font-bold cursor-pointer">
                {t.cmdCenter.cancelBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};