import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getPostData,
  getAllPostIds,
  type FullPostData,
} from '@/app/lib/utils/posts';
import { formatDate } from '@/app/lib/utils';
import { redirects } from '@/app/lib/constants/redirects';

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
    title: `${postData.title} | Nick Belvin`,
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

export async function generateStaticParams() {
  return getAllPostIds();
}

export default async function PostPage({ params }: PostPageProps) {
  const postData: FullPostData = await getPostData((await params).id);

  return (
    <article>
      <p className="subtext">
        <Link href={redirects.blog}>&larr; blog</Link>
      </p>
      <h1>{postData.title}</h1>
      <p className="subtext">
        {formatDate(postData.date)}
        {postData.author && <> by {postData.author}</>}
      </p>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </article>
  );
}
