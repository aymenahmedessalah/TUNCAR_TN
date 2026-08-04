import React, { useState } from 'react';
import { Car, Search, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';
import './Home.css';

interface HomeProps {
  onSelectCar: (brand: string, model: string) => void;
  onGoToDashboard: () => void;
}

const popularBrands = [
  { name: 'Volkswagen', logo: '🚗', models: ['Golf 6', 'Polo', 'Passat', 'Tiguan'] },
  { name: 'Renault', logo: '🚙', models: ['Clio', 'Megane', 'Symbol', 'Kangoo'] },
  { name: 'Peugeot', logo: '🏎️', models: ['208', '301', '3008', 'Partner'] },
  { name: 'Citroën', logo: '🚐', models: ['C3', 'C4', 'Berlingo', 'C-Elysée'] },
  { name: 'BMW', logo: '🚘', models: ['Serie 1', 'Serie 3', 'X1', 'X3'] },
];

export const Home: React.FC<HomeProps> = ({ onSelectCar, onGoToDashboard }) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  return (
    <div className="home-brands-container">
      {/* شريط علوي للتحويل للوحة التحكم */}
      <header className="home-top-bar">
        <div className="brand-logo-text">TUNCAR<span>.TN</span></div>
        <button onClick={onGoToDashboard} className="dashboard-redirect-btn">
          لوحة تحكم المستخدم (User Dashboard) <ArrowRight size={16} />
        </button>
      </header>

      {/* قسم البحث واختيار الماركة */}
      <div className="hero-section">
        <h1>منصة قطع غيار السيارات في تونس</h1>
        <p>اختر ماركة سيارتك وابدأ في تصفح القطع والتشخيص بكل سهولة</p>

        <div className="brands-grid">
          {popularBrands.map((b) => (
            <div 
              key={b.name} 
              className={`brand-card ${selectedBrand === b.name ? 'active' : ''}`}
              onClick={() => setSelectedBrand(b.name)}
            >
              <span className="brand-icon">{b.logo}</span>
              <h3>{b.name}</h3>
            </div>
          ))}
        </div>

        {/* اختيار الموديل إذا تم تحديد الماركة */}
        {selectedBrand && (
          <div className="models-selection-box">
            <h3>اختر موديل سيارة {selectedBrand}:</h3>
            <div className="models-chips">
              {popularBrands.find(b => b.name === selectedBrand)?.models.map((model) => (
                <button 
                  key={model} 
                  onClick={() => onSelectCar(selectedBrand, model)}
                  className="model-chip-btn"
                >
                  {model} <ArrowRight size={14} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* مميزات سريعة */}
      <div className="features-strip">
        <div className="feature-item">
          <ShieldCheck size={24} color="#f59e0b" />
          <span>ضمان موثوق على كافة القطع</span>
        </div>
        <div className="feature-item">
          <Wrench size={24} color="#f59e0b" />
          <span>أدوات تشخيص OBD متطورة</span>
        </div>
      </div>
    </div>
  );
};

export default Home;