"use client";

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/lenguageContext'; // Importación con 'u' como tu contexto

const HomePage = () => {
    const { language } = useLanguage();

    // Traducciones para el botón de acción
    const homeTranslations = {
        en: "Download Resume",
        es: "Descargar CV"
    };

    const buttonText = homeTranslations[language] || homeTranslations['es'];

    return (
        <section id="home" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0f172a] overflow-hidden">
            
            {/* 1. CAPA DE IMAGEN DE FONDO ABSOLUTA */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/images/shaiebF.png" // ✅ Tu ruta exacta en formato PNG
                    alt="Frontend Development Background"
                    fill
                    priority
                    quality={100}
                    className="object-cover object-center"
                />
                {/* Overlay oscuro intermedio para que el texto blanco explote en contraste */}
                <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]"></div>
            </div>

            {/* 2. EFECTOS DE LUCES DE FONDO (Glows originales) */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

            {/* 3. CONTENIDO PRINCIPAL (Por encima del fondo gracias a z-10) */}
            <div className="relative z-10 text-center space-y-6 px-4 max-w-5xl flex flex-col items-center justify-center">
                {/* Título Principal Gigante con sombra marcada */}
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    Federico Shaieb
                </h1>

                {/* Subtítulo Estilizado */}
                <h2 className="text-sm md:text-xl font-bold text-indigo-300 uppercase tracking-[0.25em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] max-w-3xl mx-auto leading-relaxed">
                    Full Stack Developer <span className="text-slate-500 mx-2">|</span> Specialization in Frontend Development
                </h2>

                {/* Botón de Acción (Download CV / Descargar CV) */}
                <div className="pt-8">
                    <a 
                        href="/cvshaiebfederico.pdf" 
                        download 
                        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 hover:scale-105 shadow-xl shadow-indigo-500/30"
                    >
                        <svg className="w-5 h-5 mr-2 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        {buttonText}
                    </a>
                </div>
            </div>

        </section>
    );
};

export default HomePage;