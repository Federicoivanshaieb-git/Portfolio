"use client";
import Image from 'next/image'
import { useLanguage } from '@/context/lenguageContext';

const About = () => {
  const { language } = useLanguage();

  // Diccionario de traducciones manteniendo tu estructura exacta
  const translations = {
    en: {
      title: "About Me",
      p1: (
        <>
          I am a <strong>Systems Analysis student at UNPAZ</strong> and a <strong>Full Stack Developer</strong> with a strategic foundation in <strong>Data Science</strong>, certified by Coderhouse. {"My approach to technology isn't just about writing code; it's about a meticulous synergy between analytical precision, inherited from my data background, and a deep-seated passion for high-end frontend aesthetics."}
        </>
      ),
      p2: (
        <>
          {"Currently, I specialize in architecting robust, scalable applications using the Next.js, React, and Tailwind CSS ecosystem. I don't just build interfaces; I engineer digital experiences."} A definitive milestone in my career is <strong>Trackifly</strong>, a comprehensive logistics and distribution platform. In this project, I took the lead in transforming complex logistical data into an intuitive, user-centric dashboard, proving that even the most intricate backend problems can be solved with a clean and functional frontend.
        </>
      ),
      p3: (
        <>
          What truly sets me apart is my <strong>dual perspective</strong>. My experience in data analysis (utilizing tools like SQL and Python) allows me to interpret user behavior through a quantitative lens. {"This ensures that every UI decision I make—from a button's placement to a loading state—is backed by logic, performance efficiency, and a drive to optimize the user journey."}
        </>
      ),
      p4: (
        <>
          Beyond my technical stack, I thrive in <strong>agile, high-performance environments</strong>. I am a firm believer in the power of collaborative engineering and continuous learning. As a native Spanish speaker with <strong>advanced C2 English proficiency</strong>, I am prepared to integrate into international teams and contribute to global projects.
        </>
      ),
      highlight: "I am looking for challenges where I can leverage my versatility to build the next generation of financial digital products, ensuring they are as reliable as they are visually compelling."
    },
    es: {
      title: "Sobre Mí",
      p1: (
        <>
          Soy estudiante de <strong>Analista de Sistemas en la UNPAZ</strong> y <strong>Desarrollador Full Stack</strong> con una base estratégica en <strong>Ciencia de Datos</strong>, certificado por Coderhouse. Mi enfoque de la tecnología no se trata solo de escribir código; se trata de una sinergia meticulosa entre la precisión analítica, heredada de mi experiencia en datos, y una profunda pasión por la estética frontend de alto nivel.
        </>
      ),
      p2: (
        <>
          Actualmente, me especializo en la arquitectura de aplicaciones robustas y escalables utilizando el ecosistema de Next.js, React y Tailwind CSS. No solo construyo interfaces; diseño experiencias digitales. Un hito definitivo en mi carrera es <strong>Trackifly</strong>, una plataforma integral de logística y distribución. En este proyecto, lideré la transformación de datos logísticos complejos en un panel intuitivo y centrado en el usuario, demostrando que incluso los problemas de backend más intrincados se pueden resolver con un frontend limpio y funcional.
        </>
      ),
      p3: (
        <>
          Lo que realmente me diferencia es mi <strong>doble perspectiva</strong>. Mi experiencia en análisis de datos (utilizando herramientas como SQL y Python) me permite interpretar el comportamiento del usuario a través de una lente cuantitativa. Esto asegura que cada decisión de UI que tomo —desde la ubicación de un botón hasta un estado de carga— esté respaldada por la lógica, la eficiencia del rendimiento y el impulso de optimizar el recorrido del usuario.
        </>
      ),
      p4: (
        <>
          Más allá de mi stack técnico, me desenvuelvo muy bien en <strong>entornos ágiles y de alto rendimiento</strong>. Creo firmemente en el poder de la ingeniería colaborativa y el aprendizaje continuo. Como hablante nativo de español con un nivel de <strong>inglés avanzado C2</strong>, estoy preparado para integrarme en equipos internacionales y contribuir a proyectos globales.
        </>
      ),
      highlight: "Busco desafíos donde pueda aprovechar mi versatilidad para construir la próxima generación de productos digitales financieros, asegurando que sean tan confiables como visualmente atractivos."
    }
  };

  const t = translations[language];

  return (
    /* Contenedor padre: flex-col y py-20 para que la tarjeta fluya hacia abajo sin cortarse */
    <div className="py-20 bg-[#0f172a] flex justify-center px-6">
      
      {/* Tarjeta blanca: h-auto y pb-16 aseguran que el fondo llegue hasta después del botón */}
      <div className="bg-white rounded-[30px] shadow-xl p-8 pb-16 max-w-7xl flex flex-col items-center gap-1 w-full h-auto">

        {/* Contenedor de la Imagen con el borde circular */}
        <div className="relative shrink-0">
          <div className="w-48 h-48 rounded-full border-[5px] border-indigo-500 overflow-hidden shadow-inner">
            <Image 
              src="/images/shaieb.jpg" 
              alt="Federico Ivan Shaieb" 
              width={200} 
              height={200}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Contenido de Texto */}
        <div className="text-left w-full mt-6">
          <h1 className="text-indigo-600 text-3xl font-bold mb-4">{t.title}</h1>
          
          <div className="text-gray-700 font-sans leading-relaxed space-y-4 text-sm sm:text-base">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
            <p>{t.p4}</p>

            <p className="bg-indigo-50 p-4 rounded-xl text-indigo-800 font-medium border-l-4 border-indigo-500 italic">
              {t.highlight}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;