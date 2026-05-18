"use client"; 

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/lenguageContext';

const projects = [
  {
    id: 1,
    category: "Frontend",
    title: "Trackifly: Logistics Ecosystem",
    description: {
      en: "Developed a comprehensive end-to-end logistics application. Implemented a Next.js Proxy for secure cookie-based authentication, integrated real-time map tracking, and designed a fully responsive UI using Tailwind CSS. The system features role-based access control (Company/Admin) and user profile management with Cloudinary integration for image uploads.",
      es: "Aplicación integral de logística de extremo a extremo. Implementación de un Proxy de Next.js para autenticación segura basada en cookies, integración de seguimiento de mapas en tiempo real y UI responsiva con Tailwind CSS. Sistema con control de accesos por rol (Empresa/Admin) y gestión de perfiles con Cloudinary para la carga de imágenes."
    },
    stack: ["Next.js", "React", "PostgreSQL", "Tailwind", "TypeScript", "Github", "Git"],
    deployUrl: "https://front-tracki-fly.vercel.app/es",
    githubUrl: "https://github.com/trackifly-app/Front-TrackiFly",
    images: [
      "/images/tracklifly1.jpeg",
      "/images/tracklifly2.jpeg", 
      "/images/tracklifly3.jpeg",
      "/images/tracklifly4.jpeg",
      "/images/tracklifly5.jpeg",
      "/images/tracklifly6.jpeg",
      "/images/tracklifly7.jpeg",
      "/images/tracklifly8.jpeg"
    ]
  },
  {
    id: 2,
    warning: "sin deploy activo",
    category: "Full Stack",
    title: "RetroStore",
    description: {
      en: "RetroStore – E-commerce Platform Developed a dynamic e-commerce application focused on user experience and seamless transactions. Key features include a robust shopping cart system, secure checkout integration, and a centralized state management architecture. Built with a mobile-first approach to ensure a high-performance shopping experience across all devices.",
      es: "RetroStore – Plataforma de E-commerce. Desarrollada enfocándose en la experiencia de usuario y transacciones fluidas. Las características clave incluyen un sistema de carrito de compras robusto, integración de checkout seguro y arquitectura de estado centralizada. Diseñado bajo un enfoque mobile-first para garantizar un alto rendimiento en cualquier dispositivo."
    },
    stack: ["Next.js", "React", "PostgreSQL", "Tailwind", "TypeScript", "Github", "Git"],
    deployUrl: "", 
    githubUrl: "https://github.com/Federicoivanshaieb-git/modulo-4-de-henry-con-enfoque-en-front",
    images: [
      "/images/retrostore1.jpeg", 
      "/images/retrostore2.jpeg", 
      "/images/retrostore3.jpeg",
      "/images/retrostore4.jpeg",
      "/images/retrostore5.jpeg",
      "/images/retrostore6.jpeg",
      "/images/retrostore7.jpeg"
    ]
  },
];

// Componente para el carrusel automático de las tarjetas principales
const ProjectCardImage = ({ images, title }: { images: string[], title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="p-4 h-64 w-full relative">
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-md bg-gray-900">
        {images.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image 
              src={img} 
              alt={`${title} view ${index + 1}`} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface Project {
  id: number;
  category: string;
  title: string;
  description: { en: string; es: string };
  stack: string[];
  deployUrl: string;
  githubUrl: string;
  images: string[];
}

// NUEVO: Componente Lightbox para ver la imagen a tamaño completo
const ImageLightbox = ({ image, onClose }: { image: string, onClose: () => void }) => {
  useEffect(() => {
    // Evitar scroll del modal principal cuando el lightbox está abierto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/95 z-60 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={onClose} // Cerrar al hacer clic en el fondo
    >
      <div 
        className="relative max-w-[95vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Evitar cerrar al hacer clic en la imagen
      >
        <Image
          src={image}
          alt="Expanded view"
          width={1920} // Ancho máximo
          height={1080} // Alto máximo (proporción 16:9)
          className="rounded-lg object-contain shadow-2xl"
          priority
        />
        <button
          onClick={onClose}
          className="absolute -top-12 -right-12 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
          aria-label="Close expanded view"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// NUEVO: Componente Modal de Detalle Completo con Galería Expandible
const ProjectModal = ({ project, onClose, lang }: { project: Project; onClose: () => void; lang: 'en' | 'es' }) => {
  // Estado para la imagen seleccionada en el lightbox
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);

  // Textos estáticos internos del modal traducidos
  const modalTranslations = {
    en: {
      techTitle: "Technologies Deployment",
      galleryTitle: "Project Interface Gallery",
      captures: "Captures"
    },
    es: {
      techTitle: "Tecnologías Desplegadas",
      galleryTitle: "Galería de Interfaces del Proyecto",
      captures: "Capturas"
    }
  };

  const mt = modalTranslations[lang];

  useEffect(() => {
    // Evitar scroll del fondo cuando el modal principal está abierto
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex justify-center items-center p-4 md:p-6 overflow-y-auto">
        <div className="bg-[#0f172a] border border-slate-800 text-white rounded-[40px] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col custom-scrollbar">
          
          {/* Botón Cerrar Flotante */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 bg-slate-800 hover:bg-indigo-600 text-white p-3 rounded-full transition-colors duration-200 z-10 shadow-lg"
            aria-label="Cerrar detalle"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8 md:p-12">
            {/* Encabezado */}
            <div className="mb-6">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 block mb-2">
                {project.category}
              </span>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                {project.title}
              </h3>
            </div>

            {/* BOTONES ADICIONALES: Live Demo & GitHub Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-bold rounded-xl border border-slate-700 transition-all duration-300 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.061.069-.061 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub Repo
              </a>
            </div>

            {/* Descripción Técnica Completa según Idioma */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-4xl">
              {project.description[lang]}
            </p>

            {/* Badges del Stack */}
            <div className="mb-12">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                {mt.techTitle}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-4 py-1.5 bg-slate-800 text-indigo-300 text-xs font-bold rounded-full border border-slate-700">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid de Colección Completa de Fotos con Interacción */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 border-b border-slate-800 pb-2">
                {mt.galleryTitle} ({project.images.length} {mt.captures})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative h-48 rounded-2xl overflow-hidden group border border-slate-800 bg-slate-900 shadow-md cursor-zoom-in"
                    onClick={() => setSelectedLightboxImage(img)} // Abrir lightbox al hacer clic
                  >
                    <Image 
                      src={img} 
                      alt={`${project.title} gallery asset ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Overlay al pasar el mouse */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                      <div className="bg-white/10 text-white p-4 rounded-full backdrop-blur-sm shadow-xl">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RENDERIZADO CONDICIONAL DEL LIGHTBOX SOBRE EL MODAL */}
      {selectedLightboxImage && (
        <ImageLightbox 
          image={selectedLightboxImage} 
          onClose={() => setSelectedLightboxImage(null)} 
        />
      )}
    </>
  );
};

const Projects = () => {
  // Estado para rastrear qué proyecto se está viendo en detalle
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { language } = useLanguage();

  // Diccionario general de traducción de la vista Projects
  const viewTranslations = {
    en: {
      sectionTitle: "Core Portfolio",
      sectionSubtitle: "Technical Excellence & Data-Driven Solutions",
      moreText: "more",
      btnDetails: "View Details"
    },
    es: {
      sectionTitle: "Portafolio Principal",
      sectionSubtitle: "Excelencia Técnica y Soluciones Basadas en Datos",
      moreText: "más",
      btnDetails: "Ver Detalles"
    }
  };

  const vt = viewTranslations[language];

  return (
    <section id="projects" className="py-24 bg-[#0f172a] px-6">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="mb-16 border-l-4 border-indigo-500 pl-6">
          <h2 className="text-white text-4xl font-black uppercase tracking-tighter">
            {vt.sectionTitle}
          </h2>
          <p className="text-indigo-300 font-medium tracking-widest text-sm mt-2 opacity-80">
            {vt.sectionSubtitle}
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-[40px] overflow-hidden shadow-2xl flex flex-col hover:scale-[1.01] transition-all duration-300 border border-slate-100">
              
              {/* Carrusel Automático */}
              <ProjectCardImage images={project.images} title={project.title} />

              {/* Contenido de la Tarjeta */}
              <div className="p-8 pt-4 flex-1 flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-2">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-indigo-950 mb-4 tracking-tight">
                  {project.title}
                </h3>
                
                {/* Texto truncado adaptado al idioma */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description[language]}
                </p>

                {/* Technical Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold rounded-full border border-indigo-100">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full">
                      +{project.stack.length - 5} {vt.moreText}
                    </span>
                  )}
                </div>

                {/* Botón de Acción */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                  </div>

                  {/* Botón "View Details" / "Ver Detalles" */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold rounded-full transition-all duration-300 shadow-md hover:shadow-indigo-200"
                  >
                    {vt.btnDetails}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* RENDERIZADO CONDICIONAL DEL MODAL PRINCIPAL ENVIANDO IDIOMA */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          lang={language}
        />
      )}
    </section>
  );
};

export default Projects;