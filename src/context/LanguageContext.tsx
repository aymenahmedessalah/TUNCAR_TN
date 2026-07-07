import React, { createContext, useState, useContext } from 'react';

// تعريف أنواع اللغات المدعومة
type Language = 'ar' | 'fr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({ 
  lang: 'fr', 
  setLang: () => {} 
});

export const LanguageProvider = ({ children }: any) => {
  const [lang, setLang] = useState<Language>('fr');
  
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);