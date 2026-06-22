import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const products = [{ id: 1, name: "Filtre à huile", price: "45.000 DT" }];

export default function Catalog() {
  const { lang } = useLanguage();
  
  return (
    <section className="catalog-section">
      <h3>{lang === 'fr' ? 'Catalogue' : lang === 'ar' ? 'كتالوج' : 'Catalog'}</h3>
      <div className="catalog-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <h4>{p.name}</h4>
            <span>{p.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}