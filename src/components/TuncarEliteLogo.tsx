export default function TuncarEliteLogo({ onClick }: { onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-3.5 cursor-pointer group select-none py-1"
    >
      {/* الأيقونة الرمزية: دمج سيادي بين خط السيارة الهيكلي وتروس قطع الغيار */}
      <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-amber-500/50 rounded-2xl shadow-xl shadow-amber-500/10 group-hover:border-amber-400 group-hover:shadow-amber-500/25 transition-all duration-500 overflow-hidden">
        {/* خلفية مضيئة خفيفة */}
        <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <svg 
          className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.75" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* خط الانسيابية العلوية للسيارة */}
          <path d="M2 13C4 11 8 8.5 12 8.5C16 8.5 20 11 22 13" className="text-amber-400" />
          <path d="M4 12.5L7 10.5H17L20 12.5" className="text-slate-300" strokeWidth="1.2" />
          
          {/* ترس قطع الغيار في الأسفل */}
          <circle cx="12" cy="17" r="3" className="text-amber-500" strokeWidth="1.5" />
          <path d="M12 13.5V14.5M12 19.5V20.5M8.5 17H9.5M14.5 17H15.5" strokeWidth="1.5" />
        </svg>
      </div>

      {/* اسم العلامة التجارية بخطوط هندسية فاخرة */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight">
          <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 group-hover:from-amber-200 group-hover:to-amber-400 transition-all duration-300">
            TUNCAR
          </span>
          <span className="text-amber-400 font-mono font-extrabold text-xs ml-1 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">
            .TN
          </span>
        </div>
        <span className="text-[9px] font-mono text-slate-400 tracking-[0.25em] uppercase -mt-0.5 group-hover:text-amber-500/70 transition-colors">
          Auto Parts Marketplace
        </span>
      </div>
    </div>
  );
}