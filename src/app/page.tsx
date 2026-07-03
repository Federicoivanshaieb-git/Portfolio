
import About from "./about/page";
import HomePage from "./home/page";
import Projects from "./projects/page";


export default function Home() {
  return (
    <main className="bg-[#0f172a] scroll-smooth">
      <HomePage />
      <section id="home">

      </section>

      <section id="about">
        <About />
      </section>

      <section id="projects" className="min-h-screen">
        <Projects />
      </section>
    </main>
  );
}

