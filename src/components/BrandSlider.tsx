import React, { useRef, useEffect } from 'react';

const brands = ['Volkswagen', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Ford', 'Renault', 'Peugeot', 'Hyundai', 'Kia', 'Nissan', 'Skoda'];

export default function BrandSlider({ onSelect }: { onSelect: (brand: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const isAutoScrolling = useRef(true);

  const animate = () => {
    if (isAutoScrolling.current && containerRef.current) {
      containerRef.current.scrollLeft += 0.5;
      if (containerRef.current.scrollLeft >= containerRef.current.scrollWidth / 2) {
        containerRef.current.scrollLeft = 0;
      }
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isAutoScrolling.current = false;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    if (x < width * 0.2) containerRef.current.scrollLeft -= 3;
    else if (x > width * 0.8) containerRef.current.scrollLeft += 3;
  };

  return (
    <div className="slider-container" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => { isAutoScrolling.current = true; }}>
      <div className="slider-wrapper">
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className="brand-card" onClick={() => onSelect(brand)}>
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
}