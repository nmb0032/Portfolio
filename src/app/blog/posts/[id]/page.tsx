// app/posts/[id]/page.tsx
import { FullPostData, getPostData } from '@/app/lib/utils/posts';
import { Box, Text, Title, Container, Stack, Badge, rem } from '@mantine/core';
import { Metadata } from 'next';
import { IconCalendar, IconUser } from '@tabler/icons-react';
import { isoStringToLocalDate } from '@/app/lib/utils';

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const postData = await getPostData((await params).id);

  return {
    title: `${postData.title} | Nick's Portfolio`,
    description: postData.excerpt || '',
    openGraph: {
      images: [
        {
          url: postData.image || '/default-image.jpg',
          alt: postData.title,
        },
      ],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const postData: FullPostData = await getPostData((await params).id);

  return (
    <Container size="md" py={{ base: rem(40), md: rem(60) }}>
      <Stack gap="xl">
        <Box>
          <Title
            order={1}
            size={rem(42)}
            mb="lg"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
            }}
          >
            {postData.title}
          </Title>

          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: rem(12),
              flexWrap: 'wrap',
              paddingBottom: rem(24),
              borderBottom: '1px solid var(--mantine-color-dark-6)',
            }}
          >
            <Badge
              variant="light"
              color="blue"
              size="lg"
              leftSection={<IconCalendar size={16} />}
            >
              {isoStringToLocalDate(postData.date)}
            </Badge>
            {postData.author && (
              <Badge
                variant="light"
                color="cyan"
                size="lg"
                leftSection={<IconUser size={16} />}
              >
                {postData.author}
              </Badge>
            )}
          </Box>
        </Box>

        <Box
          mt="md"
          className="blog-post-content"
          style={{
            fontSize: rem(16),
            lineHeight: 1.8,
            color: 'var(--mantine-color-text)',
          }}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </Stack>
    </Container>
  );
}
