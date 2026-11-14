import type { Metadata } from 'next';
import Link from 'next/link';
import { redirects } from '@/app/lib/constants/redirects';
import { externalLinks } from '@/app/lib/constants/links';
import { getSortedPostsData } from '@/app/lib/utils/posts';
import { formatDate } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: `Nick Belvin | Home`,
  description:
    'Senior software engineer at Microsoft with 5+ years of experience, working on confidential computing and specializing in attestation services with global impact, plus customer-facing full-stack web apps. Based in Atlanta, GA.',
};

const skills = [
  'Confidential computing: trusted execution environments and attestation services',
  'Systems: .NET, Rust, C++, Python, and secure service design',
  'Full stack: database, backend, and frontend apps for tens of thousands of daily users (TypeScript, React, Next.js, Node.js, PostgreSQL, Prisma)',
  'Cloud and delivery: Microsoft Azure, Kubernetes, Docker, CI/CD',
];

export default function Home() {
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <>
      <p>
        I&apos;m a senior software engineer at Microsoft, based in Atlanta, GA,
        with 5+ years of experience. I work on confidential computing,
        specializing in attestation services that operate globally.
      </p>
      <p>
        Before that, I worked directly with customers to build full-stack web
        apps end to end, from database and backend to frontend, serving tens of
        thousands of daily users.
      </p>

      <h2>Focus areas</h2>
      <ul className="bullets">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <h2>Recent posts</h2>
      <ol className="items">
        {recentPosts.map((post) => (
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

      <p>
        <Link href={redirects.blog}>View all posts</Link>. Reach me on{' '}
        <a href={externalLinks.github}>GitHub</a> or{' '}
        <a href={externalLinks.linkedin}>LinkedIn</a>.
      </p>
    </>
  );
}
