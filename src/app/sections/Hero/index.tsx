'use client';

import React from 'react';
import {
  Title,
  Text,
  Container,
  Button,
  Group,
  Box,
  rem,
  Stack,
} from '@mantine/core';
import { motion } from 'framer-motion';
import { IconArrowRight, IconDownload } from '@tabler/icons-react';
import classes from './Hero.module.css';
import Link from 'next/link';
import { redirects } from '@/app/lib/constants/redirects';

const roles = [
  'Senior Software Engineer',
  'Full-Stack Developer',
  'Cloud Architect',
  'Problem Solver',
];

export function Hero() {
  return (
    <Container size="lg" py={{ base: rem(60), md: rem(100) }}>
      <Stack gap="xl" align="center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', width: '100%' }}
        >
          <Title className={classes.title} order={1} size={rem(56)} mb="md">
            Hi There! <span className={classes['wave-emoji']}>👋</span>
          </Title>
          <Title
            order={2}
            size={rem(42)}
            fw={700}
            mb="lg"
            style={{
              background: 'var(--gradient-brand)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            I&apos;m Nick Belvin
          </Title>
          <TypewriterText roles={roles} />
          <Text c="dimmed" size="lg" mt="xl" maw={rem(700)} mx="auto">
            A Senior Software Engineer based in Atlanta, GA, specializing in
            building, scaling, and evolving end-to-end service platforms. I
            focus on scalable cloud architectures and high-performance data
            processing, crafting robust full-stack solutions that deliver
            first-class user experiences.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Group gap="md" justify="center" mt="xl">
            <Button
              component={Link}
              href={redirects.contact}
              size="lg"
              variant="gradient"
              gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
              rightSection={<IconArrowRight size={18} />}
              className="lift-on-hover"
            >
              Let&apos;s Connect
            </Button>
          </Group>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ width: '100%', marginTop: rem(40) }}
        >
          <StatsBar />
        </motion.div>
      </Stack>
    </Container>
  );
}

function TypewriterText({ roles }: { roles: string[] }) {
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 100);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
      }, 50);
    } else if (isDeleting && displayText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <Text size="xl" fw={500} style={{ minHeight: rem(32) }}>
      <span style={{ color: 'var(--mantine-color-dimmed)' }}>I&apos;m a </span>
      <span
        style={{
          color: 'var(--mantine-color-blue-6)',
          fontWeight: 600,
        }}
      >
        {displayText}
        <span className={classes.cursor}>|</span>
      </span>
    </Text>
  );
}

function StatsBar() {
  const stats = [
    { label: 'Years Experience', value: '4+' },
    { label: 'Projects Shipped', value: '50+' },
    { label: 'Technologies', value: '15+' },
  ];

  return (
    <Group gap="xl" justify="center" wrap="wrap">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
        >
          <Box
            style={{
              textAlign: 'center',
              padding: rem(20),
              borderRadius: rem(12),
              background: 'var(--mantine-color-body)',
              border: '1px solid var(--mantine-color-dark-6)',
              minWidth: rem(150),
            }}
            className="lift-on-hover"
          >
            <Text size={rem(32)} fw={700} c="blue">
              {stat.value}
            </Text>
            <Text size="sm" c="dimmed" mt={rem(4)}>
              {stat.label}
            </Text>
          </Box>
        </motion.div>
      ))}
    </Group>
  );
}
