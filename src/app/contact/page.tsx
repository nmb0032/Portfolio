import type { Metadata } from 'next';
import { externalLinks } from '@/app/lib/constants/links';

export const metadata: Metadata = {
  title: `Nick Belvin | Contact`,
  description:
    'Connect with Nick Belvin on LinkedIn or GitHub to talk about software, security, and collaboration.',
};

export default function ContactPage() {
  return (
    <>
      <h1>Contact</h1>
      <p>Reach out about software, security, or collaboration.</p>
      <ul className="plain-list">
        <li>
          GitHub:{' '}
          <a
            href={externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/nmb0032
          </a>
        </li>
        <li>
          LinkedIn:{' '}
          <a
            href={externalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/nicholas-belvin-9738181ab
          </a>
        </li>
      </ul>
    </>
  );
}
