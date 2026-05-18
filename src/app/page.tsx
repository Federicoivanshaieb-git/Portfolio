
import About from "./about/page"; // Asegúrate de que la ruta sea correcta
import HomePage from "./home/page";
import Projects from "./projects/page";

// import Hero from "@/components/Hero"; 
// import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#0f172a] scroll-smooth">
      <HomePage />
      <section id="home">
        
      </section>

      {/* Sección Sobre Mí */}
      <section id="about">
        <About />
      </section>

      {/* Sección Proyectos */}
      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
    </main>
  );
}

