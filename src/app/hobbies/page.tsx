import { Metadata } from 'next';
import { Hobbies } from '../sections/Hobbies';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Hobbies`,
  description:
    'My hobbies include skiing, hiking, and rowing. I also enjoy learning new things and working on personal projects.',
};

export default function page() {
  return <Hobbies />;
}
