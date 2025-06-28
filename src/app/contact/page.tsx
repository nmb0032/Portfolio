import { Metadata } from 'next';
import { Contact } from '../sections/Contact';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Contact`,
  description: 'Contact me if you have any questions or want to work together.',
};

export default function page() {
  return <Contact />;
}
