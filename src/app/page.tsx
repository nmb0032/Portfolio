import Image from 'next/image';
import AboutMe from '@/app/sections/AboutMe';
import Projects from './sections/Projects';
import Technologies from './sections/Technologies';

export default function Home() {
  return (
    <>
      <section>
        <AboutMe name="Nick Belvin" bio="Test123" />
      </section>
      <section>
        <Projects />
      </section>
      <section>
        <Technologies />
      </section>
    </>
  );
}
