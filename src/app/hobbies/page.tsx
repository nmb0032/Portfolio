import { Metadata } from 'next';
import { Hobbies } from '../sections/Hobbies';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Hobbies`,
  description:
    'Explore my hobbies including rowing, skiing, and hiking. These activities help me maintain balance, build discipline, and connect with nature and community.',
};

export default function page() {
  return <Hobbies />;
}
