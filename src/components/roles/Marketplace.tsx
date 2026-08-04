import React, { useState } from 'react';
import { ShoppingBag, Search, ShieldCheck, ArrowRight, Package, Filter, Star } from 'lucide-react';

interface MarketplaceProps {
  onBack: () => void;
}

export default function Marketplace({ onBack }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="command-panel p-6 bg-slate-900 border border-slate-700 rounded-2xl animate-fade-in">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full border border-sky-500/20 uppercase">
            System Node // Virtual Exchange
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الهيكل VIN أو اسم القطعة المطلوبة..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-3 text-sm text-white focus:outline-none focus:border-sky-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <Filter className="w-4 h-4 text-sky-400" />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-transparent text-slate-200 text-sm focus:outline-none cursor-pointer"
          >
            <option value="all">جميع المستويات (11-Tier Hierarchy)</option>
            <option value="engine">المحرك وملحقاته</option>
            <option value="brakes">نظام الفرامل</option>
            <option value="oils">الزيوت والسوائل المعتمدة</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-mono">هوية الطرف المقابل</span>
          <div className="text-sm font-bold text-sky-400 mt-1">محجوبة تماماً (حماية الخصوصية)</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-mono">الضمان والوساطة</span>
          <div className="text-sm font-bold text-emerald-400 mt-1">الوسيط المالي الآمن</div>
        </div>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-400 font-mono">إدارة الاعتراضات</span>
          <div className="text-sm font-bold text-amber-400 mt-1">مسار زمني محمي (Timeline)</div>
        </div>
      </div>

      <div className="p-8 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-3">
        <Package className="w-10 h-10 text-slate-600 mx-auto" />
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          استعراض القطع المتاحة، مقارنة الأسعار المعتمدة، وإتمام عمليات الطلب والاستلام بسلاسة تامة دون أي احتكاك مباشر مع الموردين أو الورشات.
        </p>
      </div>
    </div>
  );
}