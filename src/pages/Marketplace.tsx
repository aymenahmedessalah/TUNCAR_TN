// المسار: src/pages/Marketplace.tsx

import React, { useState } from 'react';
import { Search, ArrowRight, Package, Filter } from 'lucide-react';
import { translations } from '../translations';
import { useLanguage } from '../context/LanguageContext';

interface MarketplaceProps {
  onBack: () => void;
}

export default function Marketplace({ onBack }: MarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { lang } = useLanguage();

  const t = translations[lang] || translations.fr;
  const isRtl = lang === 'ar';

  return (
    <div style={{
      padding: '24px',
      backgroundColor: '#090d16',
      border: '1px solid rgba(51, 65, 85, 0.8)',
      borderRadius: '16px',
      color: '#f8fafc',
      direction: isRtl ? 'rtl' : 'ltr',
      textAlign: isRtl ? 'right' : 'left',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {/* رأس اللوحة وزر الرجوع */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '16px',
        gap: '16px'
      }}>
        <div style={{
          fontSize: '0.75px',
          fontFamily: 'monospace',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          color: '#38bdf8',
          padding: '6px 12px',
          borderRadius: '9999px',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          textTransform: 'uppercase'
        }}>
          System Node // Virtual Exchange
        </div>

        <div>
          <button 
            onClick={onBack}
            style={{
              fontSize: '0.8rem',
              backgroundColor: '#1e293b',
              color: '#cbd5e1',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#334155'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
          >
            <ArrowRight style={{ width: '16px', height: '16px', transform: isRtl ? 'none' : 'rotate(180deg)' }} />
            <span>{t.backButton || 'Retour'}</span>
          </button>
        </div>
      </div>

      {/* شريط البحث والفلاتر */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ gridColumn: 'span 2', position: 'relative' }}>
          <Search style={{
            width: '18px',
            height: '18px',
            color: '#94a3b8',
            position: 'absolute',
            [isRtl ? 'right' : 'left']: '14px',
            top: '14px'
          }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.marketplace?.searchPlaceholder || 'Rechercher...'}
            style={{
              width: '100%',
              backgroundColor: '#020617',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '12px 16px',
              [isRtl ? 'paddingRight' : 'paddingLeft']: '44px',
              fontSize: '0.9rem',
              color: '#ffffff',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#020617',
          padding: '0 16px',
          borderRadius: '12px',
          border: '1px solid #1e293b',
          boxSizing: 'border-box'
        }}>
          <Filter style={{ width: '16px', height: '16px', color: '#38bdf8', flexShrink: 0 }} />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              color: '#e2e8f0',
              fontSize: '0.9rem',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              padding: '12px 0'
            }}
          >
            <option value="all" style={{ backgroundColor: '#090d16' }}>{t.marketplace?.filterAll || 'All'}</option>
            <option value="engine" style={{ backgroundColor: '#090d16' }}>{t.marketplace?.filterEngine || 'Engine'}</option>
            <option value="brakes" style={{ backgroundColor: '#090d16' }}>{t.marketplace?.filterBrakes || 'Brakes'}</option>
            <option value="suspension" style={{ backgroundColor: '#090d16' }}>{t.marketplace?.filterSuspension || 'Suspension'}</option>
            <option value="electronics" style={{ backgroundColor: '#090d16' }}>{t.marketplace?.filterElectronics || 'Electronics'}</option>
          </select>
        </div>
      </div>

      {/* مؤشرات الأمان وحماية الخصوصية */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{ backgroundColor: '#020617', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>هوية الطرف المقابل</span>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#38bdf8', marginTop: '6px' }}>محجوبة تماماً (حماية الخصوصية)</div>
        </div>
        <div style={{ backgroundColor: '#020617', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>الضمان والوساطة</span>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#10b981', marginTop: '6px' }}>الوسيط المالي الآمن</div>
        </div>
        <div style={{ backgroundColor: '#020617', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>إدارة الاعتراضات</span>
          <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f59e0b', marginTop: '6px' }}>مسار زمني محمي (Timeline)</div>
        </div>
      </div>

      {/* قسم المحتوى التوضيحي */}
      <div style={{
        padding: '32px',
        backgroundColor: 'rgba(2, 6, 23, 0.6)',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        textAlign: 'center'
      }}>
        <Package style={{ width: '40px', height: '40px', color: '#475569', margin: '0 auto 12px' }} />
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
          {t.marketplace?.title || 'Catalogue Pièces Détachées (TecDoc Engine)'}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '400px', margin: '0 auto' }}>
          {t.marketplace?.subtitle || 'Sélectionnez votre véhicule ou recherchez par référence OEM'}
        </p>
      </div>
    </div>
  );
}