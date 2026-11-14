import type { Metadata } from 'next';
import Link from 'next/link';
import { redirects } from '@/app/lib/constants/redirects';
import { externalLinks } from '@/app/lib/constants/links';

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

interface Project {
  title: string;
  href: string;
  external?: boolean;
  description: string;
  tech: string[];
  extra?: { href: string; label: string };
}

const projects: Project[] = [
  {
    title: 'Markdown blog',
    href: redirects.blog,
    description:
      'Statically generated blog built from markdown files, with syntax highlighting done at build time.',
    tech: ['Next.js', 'TypeScript', 'React', 'Markdown'],
    extra: { href: '/blog/posts/building-markdown-blog', label: 'write-up' },
  },
  {
    title: 'Sudoku generator and solver',
    href: redirects.sudoku,
    description:
      'Puzzle generator with three difficulty levels and a backtracking solver.',
    tech: ['React', 'TypeScript', 'Algorithms'],
    extra: { href: '/blog/posts/sudoku-react-guide', label: 'write-up' },
  },
  {
    title: 'This site',
    href: externalLinks.repo,
    external: true,
    description: 'Source code for this portfolio.',
    tech: ['Next.js', 'TypeScript', 'CSS'],
  },
];

export default function Home() {
  return (
    <>
      <h1>Nick Belvin</h1>
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

      <h2>Projects</h2>
      <ol className="items">
        {projects.map((project) => (
          <li key={project.title}>
            {project.external ? (
              <a
                className="item-title"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.title}
              </a>
            ) : (
              <Link className="item-title" href={project.href}>
                {project.title}
              </Link>
            )}{' '}
            <span className="muted">{project.description}</span>
            <div className="subtext">
              {project.tech.join(', ')}
              {project.extra && (
                <>
                  {' | '}
                  <Link href={project.extra.href}>{project.extra.label}</Link>
                </>
              )}
            </div>
          </li>
        ))}
      </ol>

      <p>
        More in the <Link href={redirects.blog}>blog</Link>. Reach me on{' '}
        <a href={externalLinks.github}>GitHub</a> or{' '}
        <a href={externalLinks.linkedin}>LinkedIn</a>.
      </p>
    </>
  );
}
