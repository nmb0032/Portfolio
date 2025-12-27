'use client';

import React from 'react';
import { Section } from '@/app/components/Section';
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  SimpleGrid,
  Box,
  rem,
  Title,
  Button,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { IconExternalLink, IconCode } from '@tabler/icons-react';
import Link from 'next/link';
import { redirects } from '@/app/lib/constants/redirects';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  impact: string;
  link?: string;
  githubLink?: string;
  image?: string;
}

const featuredProjects: Project[] = [
  {
    title: 'Markdown Blog Platform',
    description:
      'Built a high-performance, SEO-optimized blog using Next.js App Router with static site generation. Features include syntax highlighting, markdown parsing, and dynamic routing.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Markdown'],
    impact: 'Fast, maintainable content management system',
    link: redirects.blog,
  },
  {
    title: 'Interactive Sudoku Solver',
    description:
      'Developed a React-based Sudoku game with real-time validation, solving algorithms, and an intuitive UI. Demonstrates algorithmic thinking and frontend expertise.',
    technologies: ['React', 'TypeScript', 'Algorithms'],
    impact: 'Educational tool showcasing problem-solving skills',
    link: `${redirects.blog}/examples/sudoku`,
  },
  {
    title: 'Portfolio Website',
    description:
      'Designed and developed this responsive portfolio using Next.js, Mantine UI, and modern web technologies. Features dark mode, animations, and optimized performance.',
    technologies: ['Next.js', 'TypeScript', 'Mantine', 'Framer Motion'],
    impact: 'Showcasing technical skills and projects',
    githubLink: 'https://github.com/nmb0032',
  },
];

export function ProjectShowcase() {
  return (
    <Section
      title="Featured Projects"
      margin="xl"
      style={{ marginTop: 'var(--mantine-spacing-xl)' }}
    >
      <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl" mt="xl">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </SimpleGrid>
      <Box mt="xl" style={{ textAlign: 'center' }}>
        <Button
          component={Link}
          href={redirects.blog}
          variant="light"
          size="md"
          rightSection={<IconExternalLink size={18} />}
        >
          View All Projects & Blog Posts
        </Button>
      </Box>
    </Section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        shadow="lg"
        padding="lg"
        radius="md"
        withBorder
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--mantine-color-body)',
          borderColor: 'var(--mantine-color-dark-6)',
        }}
        className="lift-on-hover"
      >
        <Stack gap="md" style={{ flex: 1 }}>
          <Group justify="space-between" align="flex-start">
            <Title order={3} size={rem(20)}>
              {project.title}
            </Title>
            <Group gap="xs">
              {project.link && (
                <Button
                  component={Link}
                  href={project.link}
                  variant="subtle"
                  size="xs"
                  p={rem(4)}
                >
                  <IconExternalLink size={16} />
                </Button>
              )}
              {project.githubLink && (
                <Button
                  component="a"
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  size="xs"
                  p={rem(4)}
                >
                  <IconCode size={16} />
                </Button>
              )}
            </Group>
          </Group>

          <Text c="dimmed" size="sm" style={{ flex: 1 }}>
            {project.description}
          </Text>

          <Box>
            <Text size="xs" fw={600} mb="xs" c="blue">
              Impact:
            </Text>
            <Text size="sm" mb="md">
              {project.impact}
            </Text>
            <Group gap="xs" wrap="wrap">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="gradient"
                  gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
                  size="sm"
                >
                  {tech}
                </Badge>
              ))}
            </Group>
          </Box>
        </Stack>
      </Card>
    </motion.div>
  );
}
