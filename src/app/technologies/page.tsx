import { Metadata } from 'next';
import Technologies from '../sections/Technologies';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Technologies`,
  description:
    'A tech enthusiast with a passion for innovative solutions and a love for learning.',
};

export default function page() {
  return <Technologies />;
}
