import React, { useState } from 'react';
import { Package, DollarSign, ArrowRight, ShoppingBag, AlertTriangle, Crown, PlusCircle } from 'lucide-react';
import { translations, SupportedLanguage } from '../translations'; // عدل المسار إلى '../translations' إذا كان في مجلد فرعي
import './Dashboard.css';

interface DashboardProps {
  onBack: () => void;
  userRole?: string; // أضف هذه الخاصية
}

export default function Dashboard({ onBack }: DashboardProps) {
  const [sellerTab, setSellerTab] = useState<'inventory' | 'finances' | 'reclamations' | 'subscriptions'>('inventory');
  const [lang, setLang] = useState<SupportedLanguage>('ar');

  const t = translations[lang];

  return (
    <div className={`command-panel p-6 bg-slate-900 border border-slate-700 rounded-2xl animate-fade-in ${lang === 'ar' ? 'rtl' : 'ltr'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* رأس اللوحة ومعلومات النظام */}
      <div className="flex flex-wrap items-center justify-between mb-6 border-b border-slate-800 pb-4 gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full border border-sky-500/20 uppercase">
            {t.systemNode}
          </span>
          <span className="text-xs text-slate-500 font-mono hidden md:inline-block">
            {t.idLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* محدد اللغات الثلاثة */}
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => setLang('ar')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${lang === 'ar' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              AR
            </button>
            <button 
              onClick={() => setLang('fr')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${lang === 'fr' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              FR
            </button>
            <button 
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${lang === 'en' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              EN
            </button>
          </div>

          <button 
            onClick={onBack}
            className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 transition-colors font-mono cursor-pointer flex items-center gap-1"
          >
            <ArrowRight className={`w-4 h-4 ${lang === 'ar' ? '' : 'rotate-180'}`} />
            <span>{t.backButton}</span>
          </button>
        </div>
      </div>

      {/* ================= شريط التنقل الخاص بالبائع (Seller) ================= */}
      <div className="flex flex-wrap gap-2 mb-6 bg-slate-950 p-2 rounded-xl border border-slate-800">
        <button 
          onClick={() => setSellerTab('inventory')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'inventory' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t.tabs.inventory}</span>
        </button>
        <button 
          onClick={() => setSellerTab('finances')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'finances' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
        >
          <DollarSign className="w-4 h-4" />
          <span>{t.tabs.finances}</span>
        </button>
        <button 
          onClick={() => setSellerTab('reclamations')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'reclamations' ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-900'}`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>{t.tabs.reclamations}</span>
        </button>
        <button 
          onClick={() => setSellerTab('subscriptions')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${sellerTab === 'subscriptions' ? 'bg-amber-500 text-slate-950' : 'text-amber-400 hover:bg-slate-900 border border-amber-500/30'}`}
        >
          <Crown className="w-4 h-4" />
          <span>{t.tabs.subscriptions}</span>
        </button>
      </div>

      {/* محتوى تبويبات البائع */}
      {sellerTab === 'inventory' && (
        <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 space-y-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h3 className="text-sm font-bold text-white">{t.inventoryCard.title}</h3>
            <button className="text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer">
              <PlusCircle className="w-4 h-4" />
              <span>{t.inventoryCard.addBtn}</span>
            </button>
          </div>
          <p className="text-xs text-slate-400">{t.inventoryCard.desc}</p>
        </div>
      )}

      {sellerTab === 'finances' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">{t.financesCard.totalTransactions}</span>
            <div className="text-lg font-bold text-white font-mono mt-2">12,450 TND</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">{t.financesCard.completedOrders}</span>
            <div className="text-lg font-bold text-emerald-400 font-mono mt-2">42</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">{t.financesCard.pendingProcessing}</span>
            <div className="text-lg font-bold text-amber-400 font-mono mt-2">5</div>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">{t.financesCard.walletBalance}</span>
            <div className="text-lg font-bold text-sky-400 font-mono mt-2">1,820 TND</div>
          </div>
        </div>
      )}

      {sellerTab === 'reclamations' && (
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-amber-300 text-xs flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{t.reclamationsCard.alertText}</span>
            </div>
            <span className="font-mono bg-amber-500/20 px-2.5 py-1 rounded-lg">{t.reclamationsCard.status}</span>
          </div>
        </div>
      )}

      {sellerTab === 'subscriptions' && (
        <div className="p-6 bg-slate-950/60 rounded-xl border border-amber-500/30 space-y-4 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Crown className="w-5 h-5" />
              <span>{t.subscriptionsCard.title}</span>
            </div>
            <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full">{t.subscriptionsCard.status}</span>
          </div>
          <p className="text-xs text-slate-400">{t.subscriptionsCard.desc}</p>
        </div>
      )}

      {/* تذييل المكون */}
      <div className="p-6 bg-slate-950/40 rounded-xl border border-slate-800/80 text-center space-y-2">
        <Package className="w-8 h-8 text-slate-600 mx-auto" />
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          {t.footer}
        </p>
      </div>
    </div>
  );
}