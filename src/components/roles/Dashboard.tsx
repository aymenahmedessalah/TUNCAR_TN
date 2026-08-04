import React, { useState } from 'react';
import { Package, ShieldCheck, DollarSign, ArrowRight, Store, AlertTriangle, Crown, ShoppingBag, Truck, BarChart3, Layers, PlusCircle, FileText } from 'lucide-react';
import './Dashboard.css';
interface DashboardProps {
  onBack: () => void;
  userRole?: 'supplier' | 'seller';
}

export default function Dashboard({ onBack, userRole = 'supplier' }: DashboardProps) {
  // حالات التنقل الداخلية للتبويب بناءً على نوع المستخدم
  const [supplierTab, setSupplierTab] = useState<'catalog' | 'orders' | 'settlements'>('catalog');
  const [sellerTab, setSellerTab] = useState<'inventory' | 'finances' | 'reclamations' | 'subscriptions'>('inventory');

  return (
    <div className="command-panel p-6 bg-slate-900 border border-slate-700 rounded-2xl animate-fade-in">
      {/* رأس اللوحة ومعلومات النظام */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full border border-sky-500/20 uppercase">
            System Node // {userRole === 'supplier' ? 'Supplier Secured Terminal' : 'Seller Commercial Node'}
          </span>
          <span className="text-xs text-slate-500 font-mono hidden md:inline-block">
            ID: SECURE-{userRole.toUpperCase()}-9042
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

      {/* ================= شريط التنقل الخاص بالمورد (Supplier) ================= */}
      {userRole === 'supplier' && (
        <>
          <div className="flex flex-wrap gap-2 mb-6 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <button 
              onClick={() => setSupplierTab('catalog')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${supplierTab === 'catalog' ? 'bg-purple-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              <Layers className="w-4 h-4" />
              <span>كتالوج المنتجات والزيوت الأصلية</span>
            </button>
            <button 
              onClick={() => setSupplierTab('orders')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${supplierTab === 'orders' ? 'bg-purple-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              <Truck className="w-4 h-4" />
              <span>طلبات التوريد الكبرى</span>
            </button>
            <button 
              onClick={() => setSupplierTab('settlements')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${supplierTab === 'settlements' ? 'bg-purple-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              <DollarSign className="w-4 h-4" />
              <span>التسويات المالية والعقود</span>
            </button>
          </div>

          {/* محتوى تبويبات المورد */}
          {supplierTab === 'catalog' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">طبيعة التوريد</span>
                <div className="text-sm font-bold text-white mt-1">زيوت أصلية & قطع غيار كبرى</div>
                <span className="text-xs text-emerald-400 mt-2 inline-block">عقد توريد معتمد ومفعل</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">هوامش الأسعار والتحكم</span>
                <div className="text-sm font-bold text-amber-400 mt-1">نشطة وآمنة (11-Tier)</div>
                <span className="text-xs text-slate-400 mt-2 inline-block">تحديث تلقائي للأسعار</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 font-mono">النطاق الجغرافي</span>
                <div className="text-sm font-bold text-purple-400 mt-1">شبكة التوزيع الوطنية</div>
                <span className="text-xs text-purple-300 mt-2 inline-block">جميع ولايات الجمهورية</span>
              </div>
            </div>
          )}

          {supplierTab === 'orders' && (
            <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">إدارة شحنات التوريد بالجملة</h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg">8 شحنات نشطة</span>
              </div>
              <p className="text-xs text-slate-400">متابعة جداول التوريد للورشات والمنصات الوسيطة دون الكشف عن هويات الأطراف النهائية المستفيدة.</p>
            </div>
          )}

          {supplierTab === 'settlements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">إجمالي عوائد التوريد الشهرية</span>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-2">48,200 TND</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">الحركات المالية المعلقة</span>
                <div className="text-xl font-bold text-amber-400 font-mono mt-2">3,400 TND</div>
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= شريط التنقل الخاص بالبائع / الورشة (Seller) ================= */}
      {userRole === 'seller' && (
        <>
          <div className="flex flex-wrap gap-2 mb-6 bg-slate-950 p-2 rounded-xl border border-slate-800">
            <button 
              onClick={() => setSellerTab('inventory')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'inventory' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>المتجر وإدخال القطع</span>
            </button>
            <button 
              onClick={() => setSellerTab('finances')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'finances' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              <DollarSign className="w-4 h-4" />
              <span>المعاملات والمحفظة</span>
            </button>
            <button 
              onClick={() => setSellerTab('reclamations')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'reclamations' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>الشكاوى والتايم لاين</span>
            </button>
            <button 
              onClick={() => setSellerTab('subscriptions')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'subscriptions' ? 'bg-amber-500 text-slate-950' : 'text-amber-400 hover:bg-slate-900 border border-amber-500/30'}`}
            >
              <Crown className="w-4 h-4" />
              <span>الباقات والامتيازات (VIP)</span>
            </button>
          </div>

          {/* محتوى تبويبات البائع */}
          {sellerTab === 'inventory' && (
            <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">إدارة مخزون قطع الغيار والقطع المتاحة</h3>
                <button className="text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة قطعة جديدة</span>
                </button>
              </div>
              <p className="text-xs text-slate-400">إدراج القطع ضمن معايير الهيكل الطبقي (11-Tier) مع إخفاء الهوية تماماً عن العملاء النهائيين.</p>
            </div>
          )}

          {sellerTab === 'finances' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">إجمالي المعاملات</span>
                <div className="text-lg font-bold text-white font-mono mt-2">12,450 TND</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">الطلبات المنجزة</span>
                <div className="text-lg font-bold text-emerald-400 font-mono mt-2">42 طلب</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">قيد المعالجة</span>
                <div className="text-lg font-bold text-amber-400 font-mono mt-2">5 طلبات</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">رصيد المحفظة</span>
                <div className="text-lg font-bold text-sky-400 font-mono mt-2">1,820 TND</div>
              </div>
            </div>
          )}

          {sellerTab === 'reclamations' && (
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-amber-300 text-xs">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>مراجعة حالة نزاع أو استرجاع مرتبطة بإحدى القطع (مع الحفاظ التام على سرية هوية الطرف الآخر عبر التايم لاين).</span>
                </div>
                <span className="font-mono bg-amber-500/20 px-2.5 py-1 rounded-lg">قيد التدقيق الآمن</span>
              </div>
            </div>
          )}

          {sellerTab === 'subscriptions' && (
            <div className="p-6 bg-slate-950/60 rounded-xl border border-amber-500/30 space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Crown className="w-5 h-5" />
                  <span>اشتراك الباقة المميزة (Black Tier Perks)</span>
                </div>
                <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">فعالة حتى نهاية الشهر</span>
              </div>
              <p className="text-xs text-slate-400">الحصول على أولوية الظهور في نتائج البحث للعملاء، دعم فني مخصص، وعمولات مخفضة عبر الوسيط المالي.</p>
            </div>
          )}
        </>
      )}

      {/* تذييل المكون المشترك */}
      <div className="p-6 bg-slate-950/40 rounded-xl border border-slate-800/80 text-center space-y-2">
        <Package className="w-8 h-8 text-slate-600 mx-auto" />
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          الواجهة تعمل ببروتوكول الخصوصية المطلقة، مع معالجة البيانات عبر قنوات مشفرة تضمن عدم تباين الهويات بين الأطراف التجارية.
        </p>
      </div>
    </div>
  );
}