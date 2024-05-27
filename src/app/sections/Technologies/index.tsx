import React from 'react';
import { Section } from '@/app/components/Section';
import {
  Card,
  Group,
  SimpleGrid,
  Tooltip,
  Image,
  rem,
  Box,
} from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import { url } from 'inspector';

const items = [
  {
    title: 'Python',
    description: 'A high-level, interpreted programming language',
    url: '/images/python-logo.svg',
  },
  {
    title: 'Java',
    description: 'A class-based, object-oriented programming language',
    url: '/images/java-logo.svg',
  },
  {
    title: 'C++',
    description: 'A general-purpose programming language',
    url: '/images/cpp-logo.svg',
  },
  {
    title: 'TypeScript',
    description:
      'A typed superset of JavaScript that compiles to plain JavaScript',
    url: '/images/typescript-logo.svg',
  },
  {
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    url: '/images/react-logo.svg',
  },
];

const Technologies: React.FC = () => {
  return (
    <Section title="Technologies">
      <SimpleGrid cols={5}>
        {items.map((item) => (
          <Tooltip key={item.title} label={item.description}>
            <Card
              shadow="sm"
              padding="xl"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--mantine-color-blue-filled)', // use a Mantine theme color
              }}
            >
              <Image
                alt={item.title}
                src={item.url}
                fit="contain"
                w={rem(50)}
              />
            </Card>
          </Tooltip>
        ))}
      </SimpleGrid>
    </Section>
  );
};

export default Technologies;
