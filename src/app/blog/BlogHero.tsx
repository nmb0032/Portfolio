'use client';

import { Container, Text, Title, rem, Stack } from '@mantine/core';
import { motion } from 'framer-motion';

export function BlogHero() {
  return (
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
            Blog
          </Title>
          <Text c="dimmed" size="lg" maw={rem(700)} mx="auto">
            Technical articles, tutorials, and insights about software
            development, algorithms, and modern web technologies. Learn from my
            experiences and discoveries in the tech industry.
          </Text>
        </motion.div>
      </Stack>
    </Container>
  );
}

