import { Metadata } from 'next';
import { Contact } from '../sections/Contact';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Contact`,
  description:
    'Connect with me through LinkedIn, GitHub, or email. Open to opportunities, collaborations, and conversations about technology.',
};

export default function page() {
  return <Contact />;
}
