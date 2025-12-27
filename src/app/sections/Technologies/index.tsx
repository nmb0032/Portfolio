'use client';

import React from 'react';
import { Section } from '@/app/components/Section';
import {
  Card,
  SimpleGrid,
  Tooltip,
  Image,
  rem,
  Box,
  Text,
  Title,
  Stack,
  Badge,
  Container,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { IconExternalLink } from '@tabler/icons-react';

interface Technology {
  title: string;
  description: string;
  url: string;
  link: string;
  category: 'language' | 'framework' | 'tool' | 'database' | 'other';
}

const technologies: Technology[] = [
  {
    title: 'Python',
    description: 'A high-level, interpreted programming language',
    url: '/images/python-logo.svg',
    link: 'https://www.python.org/',
    category: 'language',
  },
  {
    title: 'Java',
    description: 'A class-based, object-oriented programming language',
    url: '/images/java-logo.svg',
    link: 'https://www.java.com/',
    category: 'language',
  },
  {
    title: 'C++',
    description: 'A general-purpose programming language',
    url: '/images/cpp-logo.svg',
    link: 'https://isocpp.org/',
    category: 'language',
  },
  {
    title: 'TypeScript',
    description:
      'A typed superset of JavaScript that compiles to plain JavaScript',
    url: '/images/typescript-logo.svg',
    link: 'https://www.typescriptlang.org/',
    category: 'language',
  },
  {
    title: 'Rust',
    description: 'A systems programming language that runs blazingly fast',
    url: '/images/rust-logo.svg',
    link: 'https://www.rust-lang.org/',
    category: 'language',
  },
  {
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    url: '/images/react-logo.svg',
    link: 'https://reactjs.org/',
    category: 'framework',
  },
  {
    title: 'Next Js',
    description: 'A React framework for production web applications',
    url: '/images/next-logo.svg',
    link: 'https://nextjs.org/',
    category: 'framework',
  },
  {
    title: 'Angular Js',
    description: 'A platform and framework for building web applications',
    url: '/images/angular-logo.svg',
    link: 'https://angular.io/',
    category: 'framework',
  },
  {
    title: 'Spring Boot',
    description: 'An open-source Java-based framework',
    url: '/images/spring-boot-logo.svg',
    link: 'https://spring.io/projects/spring-boot',
    category: 'framework',
  },
  {
    title: 'Node',
    description: `A JavaScript runtime built on Chrome's V8 JavaScript engine`,
    url: '/images/node-logo.svg',
    link: 'https://nodejs.org/',
    category: 'framework',
  },
  {
    title: 'Postgres',
    description: 'A powerful, open-source object-relational database system',
    url: '/images/postgres-logo.svg',
    link: 'https://www.postgresql.org/',
    category: 'database',
  },
  {
    title: 'Prisma',
    description: 'A modern database ORM for TypeScript & Node.js',
    url: '/images/prisma-logo.svg',
    link: 'https://www.prisma.io/',
    category: 'database',
  },
  {
    title: 'Docker',
    description: 'A platform for building, sharing, and running applications',
    url: '/images/docker-logo.svg',
    link: 'https://www.docker.com/',
    category: 'tool',
  },
  {
    title: 'GIT',
    description: 'A distributed version-control system for tracking changes',
    url: '/images/git-logo.svg',
    link: 'https://git-scm.com/',
    category: 'tool',
  },
  {
    title: 'Verilog',
    description:
      'A hardware description language used to model electronic systems',
    url: '/images/verilog-logo.svg',
    link: 'https://en.wikipedia.org/wiki/Verilog',
    category: 'other',
  },
];

const categoryLabels: Record<Technology['category'], string> = {
  language: 'Languages',
  framework: 'Frameworks & Libraries',
  tool: 'Tools & DevOps',
  database: 'Databases',
  other: 'Other',
};

const Technologies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<
    Technology['category'] | 'all'
  >('all');

  const filteredTechnologies =
    selectedCategory === 'all'
      ? technologies
      : technologies.filter((tech) => tech.category === selectedCategory);

  const categories: Array<Technology['category'] | 'all'> = [
    'all',
    'language',
    'framework',
    'database',
    'tool',
    'other',
  ];

  return (
    <>
      <Container size="lg" py={{ base: rem(40), md: rem(60) }}>
        <Stack gap="xl" align="center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', width: '100%' }}
          >
            <Title
              order={1}
              size={rem(48)}
              mb="md"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Technologies I Use
            </Title>
            <Text c="dimmed" size="lg" maw={rem(700)} mx="auto">
              A comprehensive toolkit for building scalable, modern
              applications. From languages to frameworks, databases to DevOps
              tools—here's what powers my development workflow.
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ width: '100%' }}
          >
            <Box
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: rem(12),
                justifyContent: 'center',
              }}
            >
              {categories.map((category) => (
                <Badge
                  key={category}
                  size="lg"
                  variant={selectedCategory === category ? 'filled' : 'light'}
                  color={selectedCategory === category ? 'blue' : 'gray'}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textTransform: 'capitalize',
                  }}
                  className="lift-on-hover"
                >
                  {category === 'all'
                    ? 'All Technologies'
                    : categoryLabels[category]}
                </Badge>
              ))}
            </Box>
          </motion.div>
        </Stack>
      </Container>

      <Section title="" margin="xl">
        <SimpleGrid
          cols={{ base: 2, sm: 3, md: 4, lg: 5 }}
          spacing="xl"
          style={{ justifyItems: 'center' }}
        >
          {filteredTechnologies.map((item, index) => (
            <TechnologyCard key={item.title} item={item} index={index} />
          ))}
        </SimpleGrid>
      </Section>
    </>
  );
};

function TechnologyCard({ item, index }: { item: Technology; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.05 }}
      style={{ width: '100%', maxWidth: rem(180) }}
    >
      <Tooltip label={item.description} position="top" withArrow>
        <Card
          component="a"
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          shadow="lg"
          padding="xl"
          radius="md"
          withBorder
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: rem(160),
            background: 'var(--mantine-color-body)',
            borderColor: 'var(--mantine-color-dark-6)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="lift-on-hover"
        >
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: rem(4),
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
            className="card-top-border"
          />
          <Stack gap="md" align="center" style={{ width: '100%' }}>
            <Box
              style={{
                padding: rem(16),
                borderRadius: rem(12),
                background: 'var(--mantine-color-gray-2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: rem(80),
                height: rem(80),
                transition: 'transform 0.3s ease',
              }}
            >
              <Image
                alt={item.title}
                src={item.url}
                fit="contain"
                w={rem(50)}
                h={rem(50)}
              />
            </Box>
            <Text fw={600} size="sm" ta="center">
              {item.title}
            </Text>
            <Badge
              variant="light"
              color="blue"
              size="xs"
              style={{ textTransform: 'capitalize' }}
            >
              {item.category}
            </Badge>
          </Stack>
        </Card>
      </Tooltip>
    </motion.div>
  );
}

export default Technologies;
