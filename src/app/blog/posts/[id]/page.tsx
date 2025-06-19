// app/posts/[id]/page.tsx
import { FullPostData, getPostData } from '@/app/lib/utils/posts';
import { Box, Text, Title } from '@mantine/core';
import { Metadata } from 'next';

interface PostPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const postData = await getPostData(params.id);

  return {
    title: postData.title,
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

// This component is a Server Component by default
export default async function PostPage({ params }: PostPageProps) {
  // Data fetching for a single post
  // This replaces `getStaticProps` in the Pages Router
  const postData: FullPostData = await getPostData(params.id);

  return (
    <>
      <Box mt="md">
        <Title order={1} style={{ marginTop: 0, marginBottom: '10px' }}>
          {postData.title}
        </Title>
        <Text size="sm" color="dimmed" mt="md">
          {postData.date}
          {postData.author && (
            <>
              {' '}
              <span role="separator" aria-hidden="true">
                |
              </span>{' '}
              By {postData.author}
            </>
          )}
        </Text>
      </Box>
      <Box mt="md" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </>
  );
}
