import { Hero } from '@/app/sections/Hero';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Home`,
  description:
    'A tech enthusiast with a passion for innovative solutions and a love for learning.',
};

export default function page() {
  return <Hero />;
}
