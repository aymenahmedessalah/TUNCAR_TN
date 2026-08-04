import React, { useState } from 'react';
import { ShieldCheck, Users, Database, Activity, Lock, ArrowRight, Settings, AlertTriangle } from 'lucide-react';
import './Portal.css';

interface PortalProps {
  onBack: () => void;
}

export default function Portal({ onBack }: PortalProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'users' | 'system' | 'security'>('overview');

  return (
    <div className="command-panel p-6 bg-slate-900 border border-slate-700 rounded-2xl animate-fade-in" dir="rtl">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20 uppercase">
            System Node // Master Administrative Control
          </span>
        </div>
        <button 
          onClick={onBack}
          className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 transition-colors font-mono cursor-pointer flex items-center gap-1"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للوحة الرئيسية</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <button 
          onClick={() => setActiveSection('overview')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'overview' ? 'bg-purple-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
        >
          <Activity className="w-4 h-4" />
          <span>نظرة عامة والتحليلات</span>
        </button>
        <button 
          onClick={() => setActiveSection('users')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'users' ? 'bg-purple-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
        >
          <Users className="w-4 h-4" />
          <span>إدارة الصلاحيات والمستخدمين</span>
        </button>
        <button 
          onClick={() => setActiveSection('system')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'system' ? 'bg-purple-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
        >
          <Database className="w-4 h-4" />
          <span>هيكل البيانات (11-Tier)</span>
        </button>
        <button 
          onClick={() => setActiveSection('security')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeSection === 'security' ? 'bg-amber-500 text-slate-950' : 'text-amber-400 hover:bg-slate-900 border border-amber-500/30'}`}
        >
          <Lock className="w-4 h-4" />
          <span>سجلات الأمان والرقابة</span>
        </button>
      </div>

      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono">حالة النظام</span>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              نشط وآمن
            </div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono">العقد والوسطاء</span>
            <div className="text-lg font-bold text-white font-mono mt-2">142 عقد مفعل</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono">النزاعات المعلقة</span>
            <div className="text-lg font-bold text-amber-400 font-mono mt-2">3 نزاعات</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono">مستوى التشفير</span>
            <div className="text-lg font-bold text-purple-400 font-mono mt-2">AES-256</div>
          </div>
        </div>
      )}

      {activeSection === 'users' && (
        <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">إدارة الحسابات والصلاحيات المركزية</h3>
          <p className="text-xs text-slate-400">مراقبة وتعديل مستويات الوصول، تفعيل حسابات الموردين الجدد، وضبط الصلاحيات العليا دون الكشف عن الهويات للطرف الثالث.</p>
        </div>
      )}

      {activeSection === 'system' && (
        <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">إدارة الهيكل الطبقي (11-Tier Hierarchy)</h3>
          <p className="text-xs text-slate-400">التحكم في جداول البيانات، فئات السيارات، وتسلسل قطع الغيار والزيوت المعتمدة.</p>
        </div>
      )}

      {activeSection === 'security' && (
        <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <AlertTriangle className="w-4 h-4" />
            <span>سجل العمليات والرقابة السيادية</span>
          </div>
          <p className="text-xs text-slate-400">تتبع جميع العمليات المالية، والاعتراضات، وحركات الوسيط المالي لضمان الشفافية المطلقة وحماية سرية الأطراف.</p>
        </div>
      )}
    </div>
  );
}