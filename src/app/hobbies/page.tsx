import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Nick Belvin | Hobbies`,
  description:
    'Explore my hobbies including rowing, skiing, and hiking. These activities help me maintain balance, build discipline, and connect with nature and community.',
};

const hobbies = [
  {
    title: 'Rowing',
    image: '/images/rowing-nationals.jpg',
    alt: 'Rowing at nationals',
    description:
      "I've rowed since high school and have raced in hundreds of regattas across the country, including national competitions. I'm on the water 3-5 times a week.",
  },
  {
    title: 'Skiing',
    image: '/images/skiing.jpg',
    alt: 'Skiing',
    description: 'A yearly family tradition in the mountains.',
  },
  {
    title: 'Hiking',
    image: '/images/hiking.jpg',
    alt: 'Hiking with friends',
    description: 'Something I do with friends to get outside and stay active.',
  },
];

export default function HobbiesPage() {
  return (
    <>
      <h1>Hobbies</h1>
      <p>Outside of work I&apos;m usually rowing, skiing, or hiking.</p>
      {hobbies.map((hobby) => (
        <article key={hobby.title} className="hobby">
          <Image
            src={hobby.image}
            alt={hobby.alt}
            width={200}
            height={150}
            className="hobby-img"
          />
          <div>
            <h2>{hobby.title}</h2>
            <p>{hobby.description}</p>
          </div>
        </article>
      ))}
    </>
  );
}
