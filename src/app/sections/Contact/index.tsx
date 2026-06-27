'use client';

import React from 'react';
import {
  Container,
  Text,
  Title,
  rem,
  Stack,
  Box,
  Button,
  Group,
  Card,
} from '@mantine/core';
import { motion } from 'framer-motion';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMessage,
} from '@tabler/icons-react';

interface ContactMethod {
  name: string;
  label: string;
  icon: typeof IconBrandGithub;
  href: string;
  description: string;
  color: string;
}

const contactMethods: ContactMethod[] = [
  {
    name: 'LinkedIn',
    label: 'Connect on LinkedIn',
    icon: IconBrandLinkedin,
    href: 'https://www.linkedin.com/in/nicholas-belvin-9738181ab/',
    description: 'Professional networking and career opportunities',
    color: 'blue',
  },
  {
    name: 'GitHub',
    label: 'View My Code',
    icon: IconBrandGithub,
    href: 'https://github.com/nmb0032',
    description: 'Explore my projects and contributions',
    color: 'dark',
  },
];

export const Contact: React.FC = () => {
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
                background: 'var(--gradient-brand)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let&apos;s Connect
            </Title>
            <Text c="dimmed" size="lg" maw={rem(700)} mx="auto">
              I&apos;m always open to discussing new opportunities,
              collaborations, or just having a conversation about technology.
              Feel free to reach out through any of the channels below.
            </Text>
          </motion.div>
        </Stack>
      </Container>

      <Container size="md" py="xl">
        <Stack gap="xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Group gap="xl" justify="center" wrap="wrap">
              {contactMethods.map((method, index) => (
                <ContactCard key={method.name} method={method} index={index} />
              ))}
            </Group>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{ textAlign: 'center', marginTop: rem(40) }}
          >
            <Box
              p="xl"
              style={{
                borderRadius: rem(12),
                background: 'var(--mantine-color-body)',
                border: '1px solid var(--mantine-color-dark-6)',
              }}
            >
              <IconMessage
                size={rem(48)}
                style={{ margin: '0 auto', marginBottom: rem(16) }}
              />
              <Text size="lg" fw={600} mb="xs">
                Open to Opportunities
              </Text>
              <Text size="sm" c="dimmed" maw={rem(500)} mx="auto">
                Whether you&apos;re looking for a senior software engineer, want
                to collaborate on a project, or just want to chat about tech,
                I&apos;d love to hear from you!
              </Text>
            </Box>
          </motion.div>
        </Stack>
      </Container>
    </>
  );
};

function ContactCard({
  method,
  index,
}: {
  method: ContactMethod;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
    >
      <Card
        component="a"
        href={method.href}
        target={method.href.startsWith('mailto:') ? undefined : '_blank'}
        rel={
          method.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'
        }
        shadow="lg"
        padding="xl"
        radius="md"
        withBorder
        style={{
          minWidth: rem(280),
          maxWidth: rem(320),
          background: 'var(--mantine-color-body)',
          borderColor: 'var(--mantine-color-dark-6)',
          textDecoration: 'none',
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
            background: 'var(--gradient-brand-horizontal)',
            zIndex: 1,
          }}
        />
        <Stack gap="md" align="center" style={{ textAlign: 'center' }}>
          <Box
            style={{
              padding: rem(20),
              borderRadius: rem(50),
              background: `var(--mantine-color-${method.color}-9)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: rem(8),
            }}
          >
            <method.icon
              color="var(--mantine-color-white)"
              size={rem(32)}
              stroke={2}
            />
          </Box>
          <Box>
            <Title order={3} size={rem(20)} mb="xs">
              {method.name}
            </Title>
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
              {method.description}
            </Text>
          </Box>
          <Button
            variant="light"
            color={method.color}
            fullWidth
            mt="md"
            rightSection={<method.icon size={18} />}
          >
            {method.label}
          </Button>
        </Stack>
      </Card>
    </motion.div>
  );
}
