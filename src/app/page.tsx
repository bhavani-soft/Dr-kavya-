import LandingIntro from '@/components/LandingIntro';
import Header from '@/components/Header';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="relative bg-white min-h-screen selection:bg-accent selection:text-white">
      <Header />
      <LandingIntro />
      <About />
      <Experience />
      <Projects />
    </main>
  );
}
