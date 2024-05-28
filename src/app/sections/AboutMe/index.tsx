import React from 'react';
import { Section } from '@/app/components/Section';

interface AboutMeProps {
  name: string;
  bio: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ name, bio }) => {
  return <Section title="About Me"></Section>;
};

export default AboutMe;
