import Technologies from './sections/Technologies';
import { Element } from 'react-scroll';
import { Hero } from './sections/Hero';
import { Hobbies } from './sections/Hobbies';
import { Contact } from './sections/Contact';
import { ScrollSection } from './components/ScrollSection';

export default function Home() {
  return (
    <>
      <ScrollSection name="hero">
        <Hero />
      </ScrollSection>
      <ScrollSection name="technologies">
        <Technologies />
      </ScrollSection>
      <ScrollSection name="hobbies">
        <Hobbies />
      </ScrollSection>
      <ScrollSection name="contact">
        <Contact />
      </ScrollSection>
    </>
  );
}
