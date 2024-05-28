import Image from 'next/image';
import AboutMe from '@/app/sections/AboutMe';
import Projects from './sections/Projects';
import Technologies from './sections/Technologies';
import { Hero } from './sections/Hero';
import { Hobbies } from './sections/Hobbies';
import { Contact } from './sections/Contact';

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
        <Hobbies />
      </section>
      <section>
        <Contact />
      </section>
    </>
  );
}
