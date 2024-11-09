import HeadingWithAnchorLink from '@/app/components/HeadingWithAnchorLink';
import ImageBlock, {
  ImageBlockFragment,
} from '@/app/components/blocks/ImageBlock';
import ImageGalleryBlock, {
  ImageGalleryBlockFragment,
} from '@/app/components/blocks/ImageGalleryBlock';
import { VideoBlockFragment } from '@/app/components/blocks/VideoBlock';
import { redirects } from '@/app/lib/constants/redirects';
import { TagFragment } from '@/app/lib/datocms/commonFragments';
import { executeQuery } from '@/app/lib/datocms/executeQuery';
import { generateMetadataFn } from '@/app/lib/datocms/generateMetadataFn';
import { graphql } from '@/app/lib/datocms/graphql';
import { isoStringToLocalDate } from '@/app/lib/utils';
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Text,
  Title,
} from '@mantine/core';
import { isCode, isHeading } from 'datocms-structured-text-utils';
import { FragmentOf, TadaDocumentNode } from 'gql.tada';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { StructuredText, renderNodeRule, toNextMetadata } from 'react-datocms';

/*
 * By using next/dynamic, the components will not be included in the page's
 * initial JavaScript bundle. It allows you to defer loading of Client
 * Components and imported libraries, and only include them in the client bundle
 * when they're needed.
 */
const VideoBlock = dynamic(() => import('@/app/components/blocks/VideoBlock'));
const Code = dynamic(() => import('@/app/components/Code'));

/**
 * We use a helper to generate function that fits the Next.js
 * `generateMetadata()` format, automating the creation of meta tags based on
 * the `_seoMetaTags` present in a DatoCMS GraphQL query.
 */

export default async function Page({ params }: { params: { id: string } }) {
  /**
   * The GraphQL query that will be executed for this route to generate the page
   * content and metadata.
   *
   * Thanks to gql.tada, the result will be fully typed!
   */
  const query: TadaDocumentNode = graphql(
    `
      query {
        page(filter: {id: {eq: "${params.id}"}}) {
          _seoMetaTags {
            ...TagFragment
          }
          title
          _firstPublishedAt
          structuredText {
            value
            blocks {
              ... on RecordInterface {
                id
                __typename
              }
              ... on ImageBlockRecord {
                ...ImageBlockFragment
              }
              ... on ImageGalleryBlockRecord {
                ...ImageGalleryBlockFragment
              }
              ... on VideoBlockRecord {
                ...VideoBlockFragment
              }
            }
            links {
              ... on RecordInterface {
                id
                __typename
              }
              ... on PageRecord {
          title
              }
            }
          }
        }
      }
    `,
    [
      TagFragment,
      ImageBlockFragment,
      ImageGalleryBlockFragment,
      VideoBlockFragment,
    ],
  );

  const { isEnabled: isDraftModeEnabled } = draftMode();

  const { page } = await executeQuery(query, {
    includeDrafts: isDraftModeEnabled,
  });

  if (!page) {
    notFound();
  }

  return (
    <Container size={'sm'}>
      <Group gap={0} justify="space-between">
        <Box>
          <Title order={2}>{page.title}</Title>
          <Text size="sm" c="dimmed">
            {`Published on
            ${isoStringToLocalDate(page._firstPublishedAt)}`}
          </Text>
        </Box>
        <Button
          p={0}
          miw={115}
          variant="subtle"
          component="a"
          href={redirects.blog}
        >
          Back to Posts
        </Button>
      </Group>

      <Divider />
      {/*
       * Structured Text is a JSON format similar to HTML, but with the advantage
       * of a significantly reduced and tailored set of possible tags
       * for editorial content, along with the capability to create hyperlinks
       * to other DatoCMS records and embed custom DatoCMS blocks.
       */}
      <StructuredText
        data={page.structuredText}
        customNodeRules={
          /*
           * Although the component knows how to convert all "standard" elements
           * (headings, bullet lists, etc.) into HTML, it's possible to
           * customize the rendering of each node.
           */
          [
            renderNodeRule(isCode, ({ node, key }) => (
              <Code key={key} node={node} />
            )),
            renderNodeRule(isHeading, ({ node, key, children }) => (
              <HeadingWithAnchorLink node={node} key={key}>
                {children}
              </HeadingWithAnchorLink>
            )),
          ]
        }
        renderBlock={
          /*
           * If the structured text embeds any blocks, it's up to you to decide
           * how to render them:
           */
          ({ record }) => {
            switch (record.__typename) {
              case 'VideoBlockRecord': {
                return (
                  <VideoBlock
                    data={
                      record as unknown as FragmentOf<typeof VideoBlockFragment>
                    }
                  />
                );
              }
              case 'ImageBlockRecord': {
                return (
                  <ImageBlock
                    data={
                      record as unknown as FragmentOf<typeof ImageBlockFragment>
                    }
                  />
                );
              }
              case 'ImageGalleryBlockRecord': {
                return (
                  <ImageGalleryBlock
                    data={
                      record as unknown as FragmentOf<
                        typeof ImageGalleryBlockFragment
                      >
                    }
                  />
                );
              }
              default: {
                return null;
              }
            }
          }
        }
        renderInlineRecord={
          /*
           * If the structured text includes a reference to another DatoCMS
           * record, it's up to you to decide how to render them:
           */
          ({ record }) => {
            switch (record.__typename) {
              case 'PageRecord': {
                return (
                  <Link href="/" className="pill">
                    {record.title as unknown as string}
                  </Link>
                );
              }
              default: {
                return null;
              }
            }
          }
        }
        renderLinkToRecord={
          /*
           * If the structured text includes a link to another DatoCMS record,
           * it's your decision to determine where the link should lead, or if
           * you wish to customize its appearance:
           */
          ({ transformedMeta, record, children }) => {
            switch (record.__typename) {
              case 'PageRecord': {
                return (
                  <Link {...transformedMeta} href="/">
                    {children}
                  </Link>
                );
              }
              default: {
                return null;
              }
            }
          }
        }
      />
    </Container>
  );
}
