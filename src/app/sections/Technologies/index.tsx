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
    link: 'https://www.python.org/',
  },
  {
    title: 'Java',
    description: 'A class-based, object-oriented programming language',
    url: '/images/java-logo.svg',
    link: 'https://www.java.com/',
  },
  {
    title: 'C++',
    description: 'A general-purpose programming language',
    url: '/images/cpp-logo.svg',
    link: 'https://isocpp.org/',
  },
  {
    title: 'TypeScript',
    description:
      'A typed superset of JavaScript that compiles to plain JavaScript',
    url: '/images/typescript-logo.svg',
    link: 'https://www.typescriptlang.org/',
  },
  {
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    url: '/images/react-logo.svg',
    link: 'https://reactjs.org/',
  },
  {
    title: 'Node',
    description: 'A JavaScript runtime built on Chrome’s V8 JavaScript engine',
    url: '/images/node-logo.svg',
    link: 'https://nodejs.org/',
  },
  {
    title: 'Postgres',
    description: 'A powerful, open-source object-relational database system',
    url: '/images/postgres-logo.svg',
    link: 'https://www.postgresql.org/',
  },
  {
    title: 'Docker',
    description: 'A platform for building, sharing, and running applications',
    url: '/images/docker-logo.svg',
    link: 'https://www.docker.com/',
  },
  {
    title: 'GIT',
    description: 'A distributed version-control system for tracking changes',
    url: '/images/git-logo.svg',
    link: 'https://git-scm.com/',
  },
  {
    title: 'Prisma',
    description: 'A modern database ORM for TypeScript & Node.js',
    url: '/images/prisma-logo.svg',
    link: 'https://www.prisma.io/',
  },
  {
    title: 'Next Js',
    description: 'A React framework for production web applications',
    url: '/images/next-logo.svg',
    link: 'https://nextjs.org/',
  },
  {
    title: 'Angular Js',
    description: 'A platform and framework for building web applications',
    url: '/images/angular-logo.svg',
    link: 'https://angular.io/',
  },
  {
    title: 'Rust',
    description: 'A systems programming language that runs blazingly fast',
    url: '/images/rust-logo.svg',
    link: 'https://www.rust-lang.org/',
  },
  {
    title: 'Spring Boot',
    description: 'An open-source Java-based framework',
    url: '/images/spring-boot-logo.svg',
    link: 'https://spring.io/projects/spring-boot',
  },
  {
    title: 'Verilog',
    description:
      'A hardware description language used to model electronic systems',
    url: '/images/verilog-logo.svg',
    link: 'https://en.wikipedia.org/wiki/Verilog',
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
              component="a"
              href={item.link}
              shadow="lg"
              padding="xl"
              style={{
                maxWidth: rem(175),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid var(--mantine-color-default-border)',
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
