import React, { useState } from 'react';
import './TunisiaMapSvg.css';

export interface GovernorateData {
  id: string;
  name: string;
  colorCode: string; // اللون الأصلي الخاص بها من الصورة
}

interface TunisiaMapSvgProps {
  selectedGovernorateId?: string;
  onSelectGovernorate: (gov: GovernorateData) => void;
}

// قائمة الولايات مع ربط مسارات الـ SVG الخاصة بها
const tunisiaGovernorates: GovernorateData[] = [
  { id: 'tunis', name: 'تونس العاصمة', colorCode: '#38bdf8' },
  { id: 'ariana', name: 'أريانة', colorCode: '#f472b6' },
  { id: 'ben_arous', name: 'بن عروس', colorCode: '#fb923c' },
  { id: 'sousse', name: 'سوسة', colorCode: '#34d399' },
  { id: 'sfax', name: 'صفاقس', colorCode: '#60a5fa' },
  { id: 'bizerte', name: 'بنزرت', colorCode: '#a78bfa' },
];

export default function TunisiaMapSvg({ selectedGovernorateId, onSelectGovernorate }: TunisiaMapSvgProps) {
  const [hoveredGov, setHoveredGov] = useState<string | null>(null);

  const handleRegionClick = (gov: GovernorateData) => {
    onSelectGovernorate(gov);
  };

  return (
    <div className="tunisia-map-wrapper">
      <div className="map-header-info">
        <span className="map-badge">📍 خريطة الولايات (وضع العزل السيادي للون)</span>
      </div>

      <div className="svg-container-box">
        {/* خريطة SVG تفاعلية تعزل الألوان وتظهر الولاية المختارة فقط */}
        <svg className="tunisia-interactive-svg" viewBox="0 0 300 400">
          
          {tunisiaGovernorates.map((gov) => {
            const isSelected = selectedGovernorateId === gov.id;
            
            // تحديد مسار الـ Path الخاص بكل ولاية بناءً على خريطة تونس
            let pathD = "";
            if (gov.id === 'bizerte') pathD = "M120,40 L160,45 L155,75 L115,65 Z";
            if (gov.id === 'ariana') pathD = "M115,65 L145,75 L140,95 L110,85 Z";
            if (gov.id === 'tunis') pathD = "M145,75 L175,80 L170,105 L140,95 Z";
            if (gov.id === 'ben_arous') pathD = "M140,95 L170,105 L165,135 L135,125 Z";
            if (gov.id === 'sousse') pathD = "M150,160 L190,170 L185,205 L145,195 Z";
            if (gov.id === 'sfax') pathD = "M160,220 L220,235 L210,280 L150,265 Z";

            return (
              <path
                key={gov.id}
                d={pathD}
                className={`isolated-map-path ${isSelected ? 'active-isolated' : ''}`}
                onClick={() => handleRegionClick(gov)}
                onMouseEnter={() => setHoveredGov(gov.name)}
                onMouseLeave={() => setHoveredGov(null)}
              />
            );
          })}

        </svg>

        <div className="map-tooltip-bar">
          {hoveredGov ? (
            <span className="hover-text">📍 معاينة: {hoveredGov}</span>
          ) : (
            <span className="default-text">اختر ولاية لعزل لونها وإظهار تفاصيلها حصرياً</span>
          )}
        </div>
      </div>
    </div>
  );
}