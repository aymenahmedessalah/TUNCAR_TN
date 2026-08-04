import React, { useState } from 'react';
import { ShieldAlert, Radio, TrendingUp, Users, Package, MapPin, Server, DollarSign, Eye, RefreshCw, CheckCircle2, Store, Truck, ShoppingBag, Power } from 'lucide-react';
import TunisiaMapSvg from '../TunisiaMapSvg';
import './OwnerCommandCenter.css';
import { Dispatch, SetStateAction } from 'react';
import { UserProfile } from '../UsersManagement';

export interface OwnerCommandCenterProps {
  users: UserProfile[];
  setUsers: Dispatch<SetStateAction<UserProfile[]>>;
  onTriggerEmergencyKillSwitch: () => void;
  onNavigateToView: (targetView: string, userRole?: string) => void;
}

export default function OwnerCommandCenter({
  onNavigateToView,
  onTriggerEmergencyKillSwitch,
  users = []
}: OwnerCommandCenterProps) {
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastStatus, setBroadcastStatus] = useState(false);
  const [selectedGovernorate, setSelectedGovernorate] = useState('Tunis');
  const [systemHealth, setSystemHealth] = useState('Optimal');
  const [loading, setLoading] = useState(false);
  
  // حالة معاينة الدور السيادي
  const [previewRole, setPreviewRole] = useState<string>('owner');

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setBroadcastStatus(true);
      setLoading(false);
      setTimeout(() => setBroadcastStatus(false), 4000);
    }, 600);
  };

  // دالة التعامل مع تغيير منظور الدور ونقله للواجهة المناسبة فوراً مع تمرير الدور للدقة
  const handleRolePreviewChange = (newRole: string) => {
    setPreviewRole(newRole);
    if (!onNavigateToView) return;

    if (newRole === 'owner') {
      onNavigateToView('owner_command', 'owner');
    } else if (newRole === 'super_admin' || newRole === 'admin') {
      onNavigateToView('users', newRole);
    } else if (newRole === 'supplier') {
      onNavigateToView('dashboard_supplier', 'supplier');
    } else if (newRole === 'seller') {
      onNavigateToView('dashboard_seller', 'seller');
    } else if (newRole === 'client') {
      onNavigateToView('buyer', 'client');
    }
  };

  const safeUsersCount = Array.isArray(users) ? users.length : 84;

  return (
    <div className="owner-command-center space-y-6" dir="rtl">
      {/* رأس لوحة القيادة السيادية */}
      <header className="sovereign-header flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-xl">
        <div className="sovereign-title">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono tracking-wider rounded-full uppercase">
              Black Tier // Sovereign Core
            </span>
            <span className="flex items-center text-emerald-400 text-xs font-mono gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Status: {systemHealth}
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            TUNCAR.TN <span className="text-amber-500">Command Center</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">لوحة التحكم السيادية للمالك - معاينة الصلاحيات وإدارة كافة العقد الحية</p>
        </div>

        {/* أداة معاينة المنظور والدور */}
        <div className="flex flex-wrap items-center gap-3">
          {onTriggerEmergencyKillSwitch && (
            <button 
              onClick={onTriggerEmergencyKillSwitch}
              className="text-xs bg-red-600 hover:bg-red-500 text-white px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-red-600/20"
            >
              <Power className="w-4 h-4" />
              <span>طوارئ (Kill Switch)</span>
            </button>
          )}

          <div className="flex items-center gap-3 bg-slate-950 border border-slate-700 px-4 py-2.5 rounded-xl shadow-lg">
            <Eye className="w-5 h-5 text-amber-400 animate-pulse" />
            <div>
              <div className="text-[10px] text-slate-400 font-mono mb-0.5">معاينة منظور الدور:</div>
              <select 
                value={previewRole} 
                onChange={(e) => handleRolePreviewChange(e.target.value)}
                className="bg-slate-900 text-amber-400 font-bold border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="owner">👑 المالك الرئيسي (Owner)</option>
                <option value="super_admin">⚡ مشرف عام (Super Admin)</option>
                <option value="admin">🛡️ إداري النظام (Admin)</option>
                <option value="supplier">🏭 المورد الرئيسي (Supplier)</option>
                <option value="seller">🤝 الشريك أو الورشة (Seller)</option>
                <option value="client">👤 العميل النهائي (Client)</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* اختصارات التنقل المباشر */}
      {onNavigateToView && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => onNavigateToView('dashboard_supplier', 'supplier')}
            className="p-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-sky-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">معاينة لوحة المورد</div>
                <span className="text-[11px] text-slate-400">الزيوت الأصلية وشحنات التوريد</span>
              </div>
            </div>
            <span className="text-xs font-mono bg-sky-500/10 text-sky-400 px-2 py-1 rounded">دخول</span>
          </div>

          <div 
            onClick={() => onNavigateToView('dashboard_seller', 'seller')}
            className="p-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-purple-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">معاينة لوحة البائع</div>
                <span className="text-[11px] text-slate-400">إدارة المخزون والشكاوى</span>
              </div>
            </div>
            <span className="text-xs font-mono bg-purple-500/10 text-purple-400 px-2 py-1 rounded">دخول</span>
          </div>

          <div 
            onClick={() => onNavigateToView('marketplace', 'client')}
            className="p-4 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">معاينة متجر العملاء</div>
                <span className="text-[11px] text-slate-400">تصفح القطع عبر الهيكل (11-Tier)</span>
              </div>
            </div>
            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded">دخول</span>
          </div>
        </div>
      )}

      {/* مؤشرات الأداء السريعة */}
      <div className="telemetry-grid grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="telemetry-card blue bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="telemetry-card-header flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>إجمالي المعاملات اليومية</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="telemetry-card-value text-xl font-bold text-white font-mono">48,250 TND</div>
          <div className="telemetry-card-sub text-emerald-400 text-xs mt-1">
            <TrendingUp className="w-3.5 h-3.5 inline ml-1" /> +14.2% عن الأسبوع الماضي
          </div>
        </div>

        <div className="telemetry-card green bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="telemetry-card-header flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>الطلبات النشطة (11-Tier)</span>
            <Package className="w-5 h-5 text-amber-400" />
          </div>
          <div className="telemetry-card-value text-xl font-bold text-white font-mono">312 طلب</div>
          <div className="telemetry-card-sub text-slate-400 text-xs mt-1">موزعة على كافة الولايات</div>
        </div>

        <div className="telemetry-card yellow bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="telemetry-card-header flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>الموردون والورشات</span>
            <Users className="w-5 h-5 text-blue-400" />
          </div>
          <div className="telemetry-card-value text-xl font-bold text-white font-mono">{safeUsersCount} شريكاً</div>
          <div className="telemetry-card-sub text-blue-400 text-xs mt-1">معتمدون رسمياً بالمنصة</div>
        </div>

        <div className="telemetry-card red bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="telemetry-card-header flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>استقرار الخوادم</span>
            <Server className="w-5 h-5 text-purple-400" />
          </div>
          <div className="telemetry-card-value text-xl font-bold text-white font-mono">99.98%</div>
          <div className="telemetry-card-sub text-purple-400 text-xs mt-1">استجابة سريعة (&lt; 45ms)</div>
        </div>
      </div>

      {/* قسم الخريطة والبث السيادي */}
      <div className="command-main-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="command-panel bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <div className="panel-header flex items-center justify-between mb-4">
            <div className="panel-title flex items-center gap-2 text-white font-bold text-sm">
              <MapPin className="w-5 h-5 text-amber-500" />
              <span>توزيع العمليات حسب الولايات</span>
            </div>
            <span className="text-xs font-mono bg-slate-950 px-3 py-1 rounded-lg text-slate-300 border border-slate-800">
              الولاية: <strong className="text-amber-400">{selectedGovernorate}</strong>
            </span>
          </div>

          <div className="flex-1 min-h-[350px] flex items-center justify-center bg-slate-950/60 rounded-xl border border-slate-800 p-4">
            <TunisiaMapSvg
              selectedGovernorateId={selectedGovernorate}
              onSelectGovernorate={(gov) => setSelectedGovernorate(gov?.id || 'Tunis')}
            />
          </div>
        </div>

        <div className="command-panel bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="panel-header mb-4">
              <div className="panel-title flex items-center gap-2 text-white font-bold text-sm">
                <Radio className="w-5 h-5 text-amber-500 animate-pulse" />
                <span>نظام البث السيادي العام</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              إرسال تعاميم فورية أو تنبيهات تشغيلية لجميع المزودين والورشات عبر شبكة TUNCAR.
            </p>

            <form onSubmit={handleBroadcastSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2 uppercase">
                  محتوى البث المباشر
                </label>
                <textarea 
                  rows={4}
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder="اكتب التنبيه أو التعميم السيادي هنا..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-none text-right"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 cursor-pointer disabled:opacity-50 text-xs"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>جاري إرسال البث...</span>
                  </>
                ) : (
                  <>
                    <Radio className="w-4 h-4" />
                    <span>بث التعميم فوراً</span>
                  </>
                )}
              </button>
            </form>

            {broadcastStatus && (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تم بث التعميم بنجاح لجميع العقد المرتبطة بالشبكة.</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Sovereign Security Layer</span>
              <span className="text-emerald-400">SECURE [OK]</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}