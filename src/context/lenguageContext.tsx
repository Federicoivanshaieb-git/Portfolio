"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    changeLanguage: (lang: Language) => void; // Ahora acepta el idioma destino
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es'); // Podés dejar 'es' o 'en' por defecto

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
        {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
      throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
    }
    return context;
};