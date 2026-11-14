import type { Metadata } from 'next';
import Link from 'next/link';
import { getSortedPostsData } from '@/app/lib/utils/posts';
import { formatDate } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: `Nick Belvin | Blog`,
  description:
    'Explore technical articles, tutorials, and insights about software development, algorithms, and modern web technologies.',
};

export default function Blog() {
  const posts = getSortedPostsData();

  return (
    <>
      <h1>Blog</h1>
      <ol className="items">
        {posts.map((post) => (
          <li key={post.id}>
            <Link className="item-title" href={`/blog/posts/${post.id}`}>
              {post.title}
            </Link>
            <div className="subtext">
              {formatDate(post.date)}
              {post.author && <> by {post.author}</>}
              {post.excerpt && <> | {post.excerpt}</>}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
