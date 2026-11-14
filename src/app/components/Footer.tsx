import Link from 'next/link';
import { externalLinks } from '@/app/lib/constants/links';
import { redirects } from '@/app/lib/constants/redirects';

export function Footer() {
  return (
    <footer className="footer">
      <p>
        <Link href={redirects.blog}>blog</Link> |{' '}
        <Link href={redirects.contact}>contact</Link> |{' '}
        <Link href={redirects.privacy}>privacy</Link> |{' '}
        <a href={externalLinks.github}>github</a>
      </p>
      <p>&copy; {new Date().getFullYear()} Nick Belvin</p>
    </footer>
  );
}
