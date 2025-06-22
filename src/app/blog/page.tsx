// app/blog/page.js or pages/blog.js
// Make sure your global CSS (e.g., globals.css) contains the .lift-on-hover styles

import {
  Card,
  Container,
  Text,
  Group, // Group is not explicitly used here but good to keep if needed elsewhere
  Title,
  CardSection,
  rem,
  SimpleGrid,
} from '@mantine/core';
import Image from 'next/image';
import { getSortedPostsData } from '@/app/lib/utils/posts'; // Adjust path if necessary
import { isoStringToLocalDate } from '@/app/lib/utils';

export const metadata = {
  title: "Nick's Blog",
  description: 'All about my adventure',
};

export default async function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">
        Blog
      </Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="lg"
        verticalSpacing="xl"
      >
        {allPostsData.map((article) => (
          <Card
            key={article.id}
            shadow="md"
            component="a"
            href={`/blog/posts/${article.id}`}
            padding="0"
            radius="md"
            h="auto"
            withBorder
            className="lift-on-hover" // <<< APPLY THE CLASS HERE
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {article.image && (
              <CardSection>
                <Image
                  src={article.image}
                  alt={article.title}
                  height={200}
                  width={300} // width property is required for Image component
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes for better performance
                />
              </CardSection>
            )}

            <div style={{ padding: rem(20) }}>
              <Title order={3} mt="sm" mb="xs" lineClamp={2}>
                {article.title}
              </Title>
              <Text size="sm" c="dimmed" style={{ marginTop: 'auto' }}>
                {`${isoStringToLocalDate(article.date)}`}
              </Text>
            </div>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
