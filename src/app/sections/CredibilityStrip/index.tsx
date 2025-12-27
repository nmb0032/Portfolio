'use client';

import React from 'react';
import {
  Container,
  SimpleGrid,
  Box,
  Text,
  ThemeIcon,
  rem,
  Title,
  Stack,
  Badge,
  Group,
} from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconCloud,
  IconCode,
  IconDatabase,
  IconRocket,
  IconShield,
  IconTools,
} from '@tabler/icons-react';

interface CredibilityItem {
  icon: typeof IconCode;
  title: string;
  description: string;
  metric?: string;
}

const credibilityItems: CredibilityItem[] = [
  {
    icon: IconCode,
    title: 'Full-Stack Expertise',
    description: 'TypeScript, React, Node.js, PostgreSQL',
    metric: '4+ Years',
  },
  {
    icon: IconCloud,
    title: 'Cloud Architecture',
    description: 'AWS (EC2, S3, Lambda, RDS), Kubernetes',
    metric: 'Scalable',
  },
  {
    icon: IconDatabase,
    title: 'Data Processing',
    description: 'High-performance data migrations & pipelines',
    metric: 'Large-Scale',
  },
  {
    icon: IconRocket,
    title: 'Mission-Critical Apps',
    description: 'Leading development for production systems',
    metric: '50+ Projects',
  },
  {
    icon: IconShield,
    title: 'Quality Focus',
    description: 'Robust solutions with first-class UX',
    metric: 'Enterprise',
  },
  {
    icon: IconTools,
    title: 'Modern Stack',
    description: 'Docker, CI/CD, Microservices',
    metric: 'DevOps',
  },
];

export function CredibilityStrip() {
  return (
    <Box
      py={{ base: rem(60), md: rem(80) }}
      style={{
        background:
          'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
        borderTop: '1px solid var(--mantine-color-dark-6)',
        borderBottom: '1px solid var(--mantine-color-dark-6)',
      }}
    >
      <Container size="lg">
        <Stack gap="xl" align="center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center' }}
          >
            <Title order={2} size={rem(36)} mb="sm">
              Built for Teams Shipping{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Excellence
              </span>
            </Title>
            <Text c="dimmed" size="lg" maw={rem(600)} mx="auto">
              Specializing in scalable cloud architectures and high-performance
              data processing. Crafting robust full-stack solutions that deliver
              truly first-class user experiences.
            </Text>
          </motion.div>

          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing="xl"
            mt="xl"
            style={{ width: '100%' }}
          >
            {credibilityItems.map((item, index) => (
              <CredibilityCard key={item.title} item={item} index={index} />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

function CredibilityCard({
  item,
  index,
}: {
  item: CredibilityItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        p="lg"
        style={{
          borderRadius: rem(12),
          background: 'var(--mantine-color-body)',
          border: '1px solid var(--mantine-color-dark-6)',
          height: '100%',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        className="lift-on-hover"
      >
        <Stack gap="sm">
          <Group gap="md">
            <ThemeIcon
              size={rem(48)}
              radius="md"
              variant="gradient"
              gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
            >
              <item.icon size={rem(24)} stroke={1.5} />
            </ThemeIcon>
            {item.metric && (
              <Badge
                variant="light"
                color="blue"
                size="lg"
                style={{ marginLeft: 'auto' }}
              >
                {item.metric}
              </Badge>
            )}
          </Group>
          <Title order={4} size={rem(18)}>
            {item.title}
          </Title>
          <Text c="dimmed" size="sm">
            {item.description}
          </Text>
        </Stack>
      </Box>
    </motion.div>
  );
}
