import React from 'react';

export default function TechnicalMap({ brand, model, year }: { brand: string, model: string, year: string }) {
  // هذا الرابط هو افتراضي، يجب أن تضع ملفات الـ SVG في مجلد public/assets/
  const mapPath = `/assets/maps/${brand.toLowerCase()}_${model.toLowerCase()}_${year}.svg`;

  return (
    <div className="technical-map-wrapper">
      <h3>{brand} {model} - {year}</h3>
      <div className="svg-viewer" style={{ border: '2px solid #00f2fe', padding: '20px', borderRadius: '10px' }}>
        {/* هنا نقوم بتحميل الخريطة */}
        <img 
          src={mapPath} 
          alt={`Technical diagram for ${brand} ${model}`} 
          style={{ width: '100%', height: 'auto' }}
          onError={(e) => {
            e.currentTarget.src = '/assets/placeholder-map.svg'; // صورة بديلة إذا لم توجد الخريطة
          }}
        />
      </div>
      <p style={{ marginTop: '15px' }}>
        {/* يمكنك إضافة زر للبحث عن قطع الغيار داخل الخريطة هنا */}
        <button onClick={() => alert('تحديد القطع في الخريطة...')}>
          استعراض قطع الغيار
        </button>
      </p>
    </div>
  );
}