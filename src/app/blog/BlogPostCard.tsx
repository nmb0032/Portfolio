'use client';

import {
  Card,
  CardSection,
  Text,
  Title,
  rem,
  Stack,
  Box,
  Badge,
} from '@mantine/core';
import Image from 'next/image';
import { isoStringToLocalDate } from '@/app/lib/utils';
import { motion } from 'framer-motion';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import Link from 'next/link';

interface BlogPostCardProps {
  article: {
    id: string;
    title: string;
    date: string;
    author?: string;
    excerpt?: string;
    image?: string;
  };
  index: number;
}

export function BlogPostCard({ article, index }: BlogPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        component={Link}
        href={`/blog/posts/${article.id}`}
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
          textDecoration: 'none',
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

        {article.image && (
          <CardSection
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: rem(200),
            }}
          >
            <Image
              quality={80}
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              className="blog-image"
            />
          </CardSection>
        )}

        <Stack gap="md" p="lg" style={{ flex: 1 }}>
          <Box>
            <Title order={3} size={rem(20)} mb="xs" lineClamp={2}>
              {article.title}
            </Title>
            {article.excerpt && (
              <Text
                size="sm"
                c="dimmed"
                lineClamp={3}
                style={{ lineHeight: 1.6 }}
              >
                {article.excerpt}
              </Text>
            )}
          </Box>

          <Box
            mt="auto"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: rem(16),
              flexWrap: 'wrap',
            }}
          >
            <Badge
              variant="light"
              color="blue"
              size="sm"
              leftSection={<IconCalendar size={14} />}
            >
              {isoStringToLocalDate(article.date)}
            </Badge>
            {article.author && (
              <Badge
                variant="light"
                color="cyan"
                size="sm"
                leftSection={<IconUser size={14} />}
              >
                {article.author}
              </Badge>
            )}
          </Box>
        </Stack>
      </Card>
    </motion.div>
  );
}
