import {
  Card,
  Container,
  Text,
  Group,
  Title,
  CardSection,
} from '@mantine/core';
import Image from 'next/image';
import { isoStringToLocalDate } from '../lib/utils';
import { getSortedPostsData } from '@/app/lib/utils/posts';

export const metadata = {
  title: "Nick's Blog",
  description: 'All about my adventure',
};

export default async function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <>
      <Title order={1} ta="center" mb="lg">
        Blog
      </Title>
      <Group justify="center" gap="md">
        {allPostsData.map((article) => (
          <Card
            key={article.id}
            shadow="sm"
            component="a"
            href={`/blog/posts/${article.id}`}
            padding="lg"
            radius="md"
            w={300}
            h={400}
            withBorder
          >
            <CardSection>
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  height={200}
                  width={300}
                />
              )}
            </CardSection>
            <Group mb={'md'} mt="sm" style={{ marginBottom: 5 }}>
              <Title order={3}>{article.title}</Title>{' '}
            </Group>
            <Text ml={'auto'}>{`${isoStringToLocalDate(article.date)}`}</Text>{' '}
          </Card>
        ))}
      </Group>
    </>
  );
}
