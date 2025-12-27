import { Metadata } from 'next';
import Technologies from '../sections/Technologies';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Technologies`,
  description:
    'Explore the comprehensive toolkit of technologies I use: programming languages, frameworks, databases, and DevOps tools for building scalable, modern applications.',
};

export default function page() {
  return <Technologies />;
}
