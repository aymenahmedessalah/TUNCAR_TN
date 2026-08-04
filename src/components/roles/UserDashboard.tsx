import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Wrench, User as UserIcon, 
  Bell, LogOut, Search, Activity, 
  Car, ArrowRight, ShieldCheck, Cpu, Wrench as MechanicIcon 
} from 'lucide-react';
import ProfilePage from '../ProfilePage';
import './UserDashboard.css';

interface UserDashboardProps {
  onBackToHome: () => void;
  userRole?: 'client' | 'mechanic' | 'admin';
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ onBackToHome, userRole = 'client' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'obd' | 'profile' | 'notifications' | 'role-tools'>('overview');
  const [obdStatus, setObdStatus] = useState<'idle' | 'scanning' | 'scanned'>('idle');
  const [obdCode, setObdCode] = useState('');
  const [obdResult, setObdResult] = useState<string | null>(null);

  // حالة الوقت والتاريخ المباشر
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString('ar-TN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const formattedTime = currentDateTime.toLocaleTimeString('ar-TN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const startScan = () => {
    setObdStatus('scanning');
    setTimeout(() => {
      setObdStatus('scanned');
      setObdResult('تم فحص النظام بنجاح: لا توجد أكواد أخطاء حرجة مسجلة في وحدة التحكم (ECU).');
    }, 2500);
  };

  const handleManualObdSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!obdCode) return;
    setObdResult(`تشخيص الكود ${obdCode.toUpperCase()}: غالباً ما يرتبط هذا الخطأ بحساس الضغط أو منظومة الحقن في محركات التوربو. يُنصح بمراجعة الفني المختص.`);
  };

  return (
    <div className="dashboard-container">
      {/* Main Content Area (يسار) */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-user">
            <div className="user-avatar-mini" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="User" />
            </div>
            <div className="notification-bell" onClick={() => setActiveTab('notifications')} style={{ cursor: 'pointer' }}>
              <Bell size={20} />
              <span className="badge">2</span>
            </div>
            <span className="role-badge">
              {userRole === 'client' ? 'عميل' : userRole === 'mechanic' ? 'فني صيانة' : 'مسؤول'}
            </span>
          </div>
          <div className="topbar-search">
            <input type="text" placeholder="البحث في لوحة التحكم..." />
            <Search size={18} />
          </div>
        </header>

        <div className="dashboard-content-body">
          {/* تبويب نظرة عامة */}
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>لوحة القيادة المركزية — {userRole.toUpperCase()}</h2>
              <p className="subtitle">عرض المكونات والبيانات المخصصة لصلاحيات هذا الحساب</p>

              <div className="stats-grid">
                <div className="stat-card">
                  <div>
                    <h3>السيارة المرتبطة</h3>
                    <p>Volkswagen Golf 6 Style</p>
                  </div>
                  <Car size={24} className="text-amber" />
                </div>

                {userRole === 'client' && (
                  <div className="stat-card">
                    <div>
                      <h3>الطلبات النشطة</h3>
                      <p>3 طلبات قيد التوصيل</p>
                    </div>
                    <ShoppingBag size={24} className="text-amber" />
                  </div>
                )}

                {userRole === 'mechanic' && (
                  <div className="stat-card">
                    <div>
                      <h3>الورشة / المهام</h3>
                      <p>5 سيارات قيد الفحص اليوم</p>
                    </div>
                    <MechanicIcon size={24} className="text-amber" />
                  </div>
                )}

                {userRole === 'admin' && (
                  <div className="stat-card">
                    <div>
                      <h3>حالة الخادم والنظام</h3>
                      <p className="text-green">متصل (TUNCAR Core V2)</p>
                    </div>
                    <Cpu size={24} className="text-amber" />
                  </div>
                )}

                <div className="stat-card">
                  <div>
                    <h3>حالة المحرك</h3>
                    <p className="text-green">ممتازة (لا توجد أخطاء حرجة)</p>
                  </div>
                  <Activity size={24} className="text-amber" />
                </div>
              </div>

              <div className="quick-actions-banner">
                <button className="amber-btn" onClick={() => setActiveTab(userRole === 'admin' ? 'role-tools' : 'obd')}>
                  <ArrowRight size={16} /> تنفيذ الإجراء
                </button>
                <div className="banner-text">
                  <h3>الفحص السريع عبر ماسح ELM OBD2</h3>
                  <p>تحقق من حالة الحساسات وأكواد الأخطاء بضغطة زر واحدة.</p>
                </div>
              </div>
            </div>
          )}

          {/* تبويب الطلبات */}
          {activeTab === 'orders' && (
            <div className="overview-section">
              <h2>طلباتي والقطع المشتراة</h2>
              <p className="subtitle">متابعة فواتير الشراء وحالة التوصيل في تونس</p>
              <div className="stat-card" style={{ marginTop: '1.5rem', display: 'block' }}>
                <h3 style={{ marginBottom: '0.5rem', color: '#f59e0b' }}>طلب رقم #TC-8821</h3>
                <p>فلتر زيت + طقم وسادات فرامل (Volkswagen Golf 6)</p>
                <span className="text-green" style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.85rem' }}>حالة الطلب: قيد التوصيل السريع</span>
              </div>
            </div>
          )}

          {/* تبويب فاحص OBD2 */}
          {activeTab === 'obd' && (
            <div className="overview-section">
              <h2>تشخيص أعطال السيارة OBD2</h2>
              <p className="subtitle">فحص مباشر عبر البلوتوث أو إدخال الكود يدوياً</p>
              
              <div className="stat-card" style={{ marginTop: '1.5rem', display: 'block' }}>
                <h3 style={{ marginBottom: '1rem', color: '#f59e0b' }}>فحص النظام الآلي (ELM327)</h3>
                <button 
                  onClick={startScan} 
                  className="amber-btn" 
                  disabled={obdStatus === 'scanning'}
                >
                  {obdStatus === 'scanning' ? 'جاري الاتصال بالسيارة...' : 'بدء فحص الحساسات الآن'}
                </button>

                <form onSubmit={handleManualObdSearch} style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="أدخل كود الخطأ يدوياً (مثال: P0299)..." 
                    value={obdCode}
                    onChange={(e) => setObdCode(e.target.value)}
                    style={{ flex: 1, padding: '0.75rem', background: '#020617', border: '1px solid #334155', borderRadius: '0.5rem', color: '#fff' }}
                  />
                  <button type="submit" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '0 1.5rem', borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer' }}>فحص الكود</button>
                </form>

                {obdResult && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: '#020617', border: '1px solid #f59e0b', borderRadius: '0.5rem' }}>
                    <h4 style={{ color: '#f59e0b', marginBottom: '0.25rem' }}>تقرير التشخيص:</h4>
                    <p style={{ color: '#f8fafc', fontSize: '0.9rem' }}>{obdResult}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* تبويب الإشعارات */}
          {activeTab === 'notifications' && (
            <div className="overview-section">
              <h2>الإشعارات والتنبيهات</h2>
              <p className="subtitle">آخر المستجدات المتعلقة بطلبك وصيانة السيارة</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                <div className="stat-card" style={{ display: 'block' }}>
                  <h4 style={{ color: '#f59e0b' }}>تم شحن طلبك بنجاح</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>طلبك الخاص بقطع غيار Golf 6 في طريقه إليك عبر شركة التوصيل.</p>
                </div>
                <div className="stat-card" style={{ display: 'block' }}>
                  <h4 style={{ color: '#f59e0b' }}>موعد الصيانة الدورية</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>اقترب موعد تغيير الزيت القادم بناءً على عدد الكيلومترات المسجلة.</p>
                </div>
              </div>
            </div>
          )}

          {/* تبويب إدارة النظام للـ Admin */}
          {activeTab === 'role-tools' && userRole === 'admin' && (
            <div className="overview-section">
              <h2>إدارة النظام والورش المركزية</h2>
              <p className="subtitle">أدوات تحكم المشرف العام في منصة TUNCAR.TN_V2</p>
              <div className="stat-card" style={{ marginTop: '1.5rem', display: 'block' }}>
                <h3 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>إدارة مستخدمي المنصة</h3>
                <p>التحكم في صلاحيات الموردين، البائعين، والفنيين المسجلين عبر الجمهورية.</p>
              </div>
            </div>
          )}

          {/* تبويب الملف الشخصي */}
          {activeTab === 'profile' && <ProfilePage />}
        </div>
      </main>

      {/* Sidebar (يمين) - يضم الوقت والتاريخ */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-datetime-box" onClick={onBackToHome} style={{ cursor: 'pointer' }}>
          <div className="time-display">{formattedTime}</div>
          <div className="date-display">{formattedDate}</div>
        </div>

        <nav className="sidebar-nav">
          <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
            <LayoutDashboard size={18} /> لوحة القيادة
          </button>
          
          {userRole === 'client' && (
            <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
              <ShoppingBag size={18} /> طلباتي والقطع
            </button>
          )}

          {(userRole === 'client' || userRole === 'mechanic') && (
            <button className={activeTab === 'obd' ? 'active' : ''} onClick={() => setActiveTab('obd')}>
              <Wrench size={18} /> تشخيص OBD2
            </button>
          )}

          {userRole === 'admin' && (
            <button className={activeTab === 'role-tools' ? 'active' : ''} onClick={() => setActiveTab('role-tools')}>
              <ShieldCheck size={18} /> إدارة النظام والورش
            </button>
          )}

          <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
            <Bell size={18} /> الإشعارات
          </button>
          <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
            <UserIcon size={18} /> الملف الشخصي
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onBackToHome}>
            <LogOut size={18} /> العودة للرئيسية
          </button>
        </div>
      </aside>
    </div>
  );
};

export default UserDashboard;