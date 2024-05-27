import Image from 'next/image';
import AboutMe from '@/app/sections/AboutMe';
import Projects from './sections/Projects';
import Technologies from './sections/Technologies';
import { Hero } from './sections/Hero';

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <Technologies />
      </section>
      <section>
        <AboutMe name="Nick Belvin" bio="Test123" />
      </section>
      <section>
        <Projects />
      </section>
    </>
  );
}
