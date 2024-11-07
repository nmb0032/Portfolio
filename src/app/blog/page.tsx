import { executeQuery } from '@/app/lib/datocms/executeQuery';
import {
  Anchor,
  Card,
  Container,
  Text,
  Group,
  Title,
  ActionIcon,
  Divider,
  Image,
  CardSection,
} from '@mantine/core';
import { IconEye } from '@tabler/icons-react';
import { graphql } from 'gql.tada';
import { isoStringToLocalDate } from '../lib/utils';

const PAGE_CONTENT_QUERY = graphql(`
  query {
    allPages {
      id
      title
      titlePhoto {
        url
      }
      _status
      _firstPublishedAt
    }

    _allPagesMeta {
      count
    }
  }
`);

interface PageContent {
  allPages: {
    id: string;
    title: string;
    titlePhoto: {
      url: string;
    } | null;
    _status: string;
    _firstPublishedAt: string;
  }[];
  _allPagesMeta: {
    count: number;
  };
}

export default async function Blog() {
  const content = (await executeQuery(PAGE_CONTENT_QUERY)) as PageContent;
  return (
    <Container>
      <Title order={1} ta="center" mb="lg">
        Blog
      </Title>
      <Group justify="center" gap="md">
        {content.allPages.map((article) => (
          <Card
            key={article.id}
            shadow="sm"
            component="a"
            href={`/blog/article/${article.id}`}
            padding="lg"
            radius="md"
            w={400}
            withBorder
          >
            <CardSection>
              <Image
                src={article.titlePhoto?.url}
                alt={article.title}
                height={200}
              />
            </CardSection>
            <Group mb={'md'} mt="sm" style={{ marginBottom: 5 }}>
              <Title order={3}>{article.title}</Title>
            </Group>
            <Text
              ml={'auto'}
            >{`${isoStringToLocalDate(article._firstPublishedAt)}`}</Text>
          </Card>
        ))}
      </Group>
    </Container>
  );
}
