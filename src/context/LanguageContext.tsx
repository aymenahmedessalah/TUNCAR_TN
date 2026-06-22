import React, { createContext, useState, useContext } from 'react';

type Lang = 'fr' | 'ar' | 'en';
const LanguageContext = createContext({
  lang: 'fr' as Lang,
  setLang: (l: Lang) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Lang>('fr');
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);