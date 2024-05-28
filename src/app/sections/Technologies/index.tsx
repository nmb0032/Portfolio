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
  {
    title: 'Node',
    description: 'A JavaScript runtime built on Chrome’s V8 JavaScript engine',
    url: '/images/node-logo.svg',
  },
  {
    title: 'Postgres',
    description: 'A powerful, open-source object-relational database system',
    url: '/images/postgres-logo.svg',
  },
  {
    title: 'Docker',
    description: 'A platform for building, sharing, and running applications',
    url: '/images/docker-logo.svg',
  },
  {
    title: 'GIT',
    description: 'A distributed version-control system for tracking changes',
    url: '/images/git-logo.svg',
  },
  {
    title: 'Prisma',
    description: 'A modern database ORM for TypeScript & Node.js',
    url: '/images/prisma-logo.svg',
  },
  {
    title: 'Next Js',
    description: 'A React framework for production web applications',
    url: '/images/next-logo.svg',
  },
  {
    title: 'Angular Js',
    description: 'A platform and framework for building web applications',
    url: '/images/angular-logo.svg',
  },
  {
    title: 'Rust',
    description: 'A systems programming language that runs blazingly fast',
    url: '/images/rust-logo.svg',
  },
  {
    title: 'Spring Boot',
    description: 'An open-source Java-based framework',
    url: '/images/spring-boot-logo.svg',
  },
  {
    title: 'Verilog',
    description:
      'A hardware description language used to model electronic systems',
    url: '/images/verilog-logo.svg',
  },
];

const Technologies: React.FC = () => {
  return (
    <Section title="Technologies I Use">
      <SimpleGrid
        style={{ justifyItems: 'center' }}
        cols={{ base: 2, sm: 3, md: 5, lg: 6 }}
      >
        {items.map((item) => (
          <Tooltip key={item.title} label={item.description}>
            <Card
              shadow="sm"
              padding="xl"
              style={{
                maxWidth: rem(175),
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
