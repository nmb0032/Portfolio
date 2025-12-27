'use client';

import React from 'react';
import { Section } from '@/app/components/Section';
import {
  Card,
  CardSection,
  Image,
  Text,
  SimpleGrid,
  Container,
  Title,
  Stack,
  Box,
  rem,
  Badge,
} from '@mantine/core';
import { motion } from 'framer-motion';

interface Hobby {
  title: string;
  emoji: string;
  image: string;
  description: string;
  highlights?: string[];
}

const hobbies: Hobby[] = [
  {
    title: 'Rowing',
    emoji: '🚣‍♂️',
    image: '/images/rowing-nationals.jpg',
    description:
      "I have been rowing since high school and have competed in hundreds of regattas across the country. When I'm not coding you can find me on the water 3-5 times a week.",
    highlights: [
      'Hundreds of regattas competed',
      '3-5 times per week',
      'National competitions',
    ],
  },
  {
    title: 'Skiing',
    emoji: '⛷️',
    image: '/images/skiing.jpg',
    description:
      'Skiing has been a great hobby that I share with my family. It combines adventure, skill, and the beauty of mountain landscapes.',
    highlights: ['Family activity', 'Mountain adventures', 'Yearly tradition'],
  },
  {
    title: 'Hiking',
    emoji: '🗻',
    image: '/images/hiking.jpg',
    description:
      'Hiking is a great pastime that I like to do with my friends! Exploring trails and enjoying nature provides a perfect balance to my technical work.',
    highlights: ['Group activities', 'Nature exploration', 'Physical fitness'],
  },
];

export const Hobbies: React.FC = () => {
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
              My Hobbies
            </Title>
            <Text c="dimmed" size="lg" maw={rem(700)} mx="auto">
              Beyond coding, I enjoy staying active and exploring the outdoors.
              These hobbies help me maintain balance, build discipline, and
              connect with nature and community.
            </Text>
          </motion.div>
        </Stack>
      </Container>

      <Section title="" margin="xl">
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {hobbies.map((hobby, index) => (
            <HobbyCard key={hobby.title} hobby={hobby} index={index} />
          ))}
        </SimpleGrid>
      </Section>
    </>
  );
};

function HobbyCard({ hobby, index }: { hobby: Hobby; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Card
        shadow="lg"
        padding={0}
        radius="md"
        withBorder
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--mantine-color-body)',
          borderColor: 'var(--mantine-color-dark-6)',
          overflow: 'hidden',
          position: 'relative',
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
            zIndex: 1,
          }}
        />
        <CardSection
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: rem(280),
          }}
        >
          <Image
            src={hobby.image}
            alt={`${hobby.title} Image`}
            height={rem(280)}
            style={{
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            className="hobby-image"
          />
          <Box
            style={{
              position: 'absolute',
              top: rem(16),
              right: rem(16),
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: rem(50),
              padding: `${rem(8)} ${rem(16)}`,
              fontSize: rem(24),
            }}
          >
            {hobby.emoji}
          </Box>
        </CardSection>

        <Stack gap="md" p="lg" style={{ flex: 1 }}>
          <Box>
            <Title order={3} size={rem(24)} mb="xs">
              {hobby.title}
            </Title>
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
              {hobby.description}
            </Text>
          </Box>

          {hobby.highlights && hobby.highlights.length > 0 && (
            <Box mt="auto">
              <Text size="xs" fw={600} mb="xs" c="blue">
                Highlights:
              </Text>
              <Box
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: rem(8),
                }}
              >
                {hobby.highlights.map((highlight) => (
                  <Badge
                    key={highlight}
                    variant="light"
                    color="blue"
                    size="sm"
                    style={{ textTransform: 'none' }}
                  >
                    {highlight}
                  </Badge>
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}
