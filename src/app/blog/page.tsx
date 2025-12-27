import {
  Container,
  rem,
  SimpleGrid,
} from '@mantine/core';
import { getSortedPostsData } from '@/app/lib/utils/posts';
import { Metadata } from 'next';
import { BlogPostCard } from './BlogPostCard';
import { BlogHero } from './BlogHero';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Blog`,
  description:
    'Explore technical articles, tutorials, and insights about software development, algorithms, and modern web technologies.',
};

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <BlogHero />
      <Container size="lg" py="xl">
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="xl"
          verticalSpacing="xl"
        >
          {allPostsData.map((article, index) => (
            <BlogPostCard key={article.id} article={article} index={index} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
