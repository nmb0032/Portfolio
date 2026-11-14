import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';

import '@/app/globals.css';

const designContract = `<!--
THESIS: A personal portfolio reads like a useful index, not a sales page; it refuses the category's hero-and-card marketing layout.
OWN-WORLD: Monochrome, text-first pages with a continuous white or near-black ground. Retro console monospace, underlined links, plain lists, and a CSS system light/dark palette.
STORY: Hiring teams and engineers can quickly scan Nick's background, tools, projects, posts, and contact paths.
FIRST VIEWPORT: An underlined name above a wrapping text navigation and a thin rule, then Nick's name and experience summary, followed by skills and project entries.
FORM: Simple personal index with generous spacing, selected directly by the user's screenshot; no concept seed because the brief pins the form.
-->`;

export const metadata: Metadata = {
  title: `Nick Belvin`,
  description:
    'Nick Belvin: senior software engineer building confidential computing and attestation services, and full-stack web apps.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <template
            data-design-contract
            dangerouslySetInnerHTML={{ __html: designContract }}
          />
          <Header />
          <main className="content">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
