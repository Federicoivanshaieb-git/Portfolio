"use client";

import React from 'react';
import { useLanguage } from '@/context/lenguageContext'; // Importación correcta con 'u'

const NavbarPersonalizada = () => {
  const { language, changeLanguage } = useLanguage();

  const navTranslations = {
    en: { home: "Home", about: "About", projects: "Projects" },
    es: { home: "Inicio", about: "Sobre Mí", projects: "Proyectos" }
  };

  const t = navTranslations[language] || navTranslations['es'];

  return (
    <header className="w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-white font-black tracking-tighter text-xl">
          Federico Ivan Shaieb<span className="text-indigo-500">.</span>
        </div>

        {/* Links de Navegación con el ORDEN CORREGIDO */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-white transition-colors">{t.home}</a>
          <a href="#about" className="hover:text-white transition-colors">{t.about}</a>
          <a href="#projects" className="hover:text-white transition-colors">{t.projects}</a>
        </nav>

        {/* Selector de Idiomas Fijo */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl shadow-inner">
          
          {/* Botón Español */}
          <button
            onClick={() => changeLanguage('es')}
            className={`px-3 py-1.5 text-xs font-black tracking-wider rounded-lg transition-all duration-200 uppercase ${
              language === 'es'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ESP
          </button>

          {/* Botón Inglés */}
          <button
            onClick={() => changeLanguage('en')}
            className={`px-3 py-1.5 text-xs font-black tracking-wider rounded-lg transition-all duration-200 uppercase ${
              language === 'en'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ENG
          </button>

        </div>

      </div>
    </header>
  );
};

export default NavbarPersonalizada;