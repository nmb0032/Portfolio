import type { Metadata } from 'next';
import { hostname } from '@/app/lib/utils';

export const metadata: Metadata = {
  title: `Nick Belvin | Technologies`,
  description:
    'Languages, frameworks, and tools I use to build secure, reliable systems, from confidential computing services to full-stack web apps.',
};

type Category = 'language' | 'framework' | 'database' | 'tool' | 'other';

interface Technology {
  title: string;
  description: string;
  link: string;
  category: Category;
}

const categories: { id: Category; label: string }[] = [
  { id: 'language', label: 'Languages' },
  { id: 'framework', label: 'Frameworks & libraries' },
  { id: 'database', label: 'Databases' },
  { id: 'tool', label: 'Tools & DevOps' },
  { id: 'other', label: 'Other' },
];

const technologies: Technology[] = [
  {
    title: 'Rust',
    description: 'A memory-safe systems programming language',
    link: 'https://www.rust-lang.org/',
    category: 'language',
  },
  {
    title: 'C++',
    description: 'A general-purpose programming language',
    link: 'https://isocpp.org/',
    category: 'language',
  },
  {
    title: 'Python',
    description: 'A high-level, interpreted programming language',
    link: 'https://www.python.org/',
    category: 'language',
  },
  {
    title: 'Java',
    description: 'A class-based, object-oriented programming language',
    link: 'https://www.java.com/',
    category: 'language',
  },
  {
    title: 'TypeScript',
    description:
      'A typed superset of JavaScript that compiles to plain JavaScript',
    link: 'https://www.typescriptlang.org/',
    category: 'language',
  },
  {
    title: '.NET',
    description: 'A cross-platform framework for building C# applications',
    link: 'https://dotnet.microsoft.com/',
    category: 'framework',
  },
  {
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    link: 'https://reactjs.org/',
    category: 'framework',
  },
  {
    title: 'Next.js',
    description: 'A React framework for production web applications',
    link: 'https://nextjs.org/',
    category: 'framework',
  },
  {
    title: 'Angular',
    description: 'A platform and framework for building web applications',
    link: 'https://angular.io/',
    category: 'framework',
  },
  {
    title: 'Spring Boot',
    description: 'An open-source Java-based framework',
    link: 'https://spring.io/projects/spring-boot',
    category: 'framework',
  },
  {
    title: 'Node',
    description: `A JavaScript runtime built on Chrome's V8 JavaScript engine`,
    link: 'https://nodejs.org/',
    category: 'framework',
  },
  {
    title: 'Postgres',
    description: 'A powerful, open-source object-relational database system',
    link: 'https://www.postgresql.org/',
    category: 'database',
  },
  {
    title: 'Prisma',
    description: 'A modern database ORM for TypeScript & Node.js',
    link: 'https://www.prisma.io/',
    category: 'database',
  },
  {
    title: 'Docker',
    description: 'A platform for building, sharing, and running applications',
    link: 'https://www.docker.com/',
    category: 'tool',
  },
  {
    title: 'Git',
    description: 'A distributed version-control system for tracking changes',
    link: 'https://git-scm.com/',
    category: 'tool',
  },
  {
    title: 'Verilog',
    description:
      'A hardware description language used to model electronic systems',
    link: 'https://en.wikipedia.org/wiki/Verilog',
    category: 'other',
  },
];

export default function TechnologiesPage() {
  return (
    <>
      <h1>Technologies</h1>
      <p>
        The languages and tools behind my work on secure, reliable systems and
        the web apps around them.
      </p>
      <p className="muted">
        At work, I build and operate attestation services with global reach,
        where security and reliability come first. With customers, I used
        TypeScript, React, Next.js, Node.js, and PostgreSQL to ship full-stack
        apps from database to frontend.
      </p>
      <p className="subtext">
        jump to:{' '}
        {categories.map((category, index) => (
          <span key={category.id}>
            {index > 0 && ' | '}
            <a href={`#${category.id}`}>{category.label.toLowerCase()}</a>
          </span>
        ))}
      </p>

      {categories.map((category) => (
        <section key={category.id} id={category.id}>
          <h2>{category.label}</h2>
          <ul className="plain-list">
            {technologies
              .filter((tech) => tech.category === category.id)
              .map((tech) => (
                <li key={tech.title}>
                  <a href={tech.link} target="_blank" rel="noopener noreferrer">
                    {tech.title}
                  </a>{' '}
                  <span className="site">({hostname(tech.link)})</span>{' '}
                  <span className="muted">{tech.description}</span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
