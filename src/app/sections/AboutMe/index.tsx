import React from 'react';
import { Section } from '@/app/components/Section';
import { AboutMeFeatures } from '@/app/components/AboutMeFeatures';

interface AboutMeProps {
  name: string;
  bio: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ name, bio }) => {
  return <Section title="About Me"></Section>;
};

export default AboutMe;
