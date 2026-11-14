'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { redirects } from '@/app/lib/constants/redirects';

const links = [
  { href: redirects.blog, label: 'blog' },
  { href: redirects.technologies, label: 'technologies' },
  { href: redirects.hobbies, label: 'hobbies' },
  { href: redirects.contact, label: 'contact' },
];

function isActive(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}

export function Header() {
  const path = usePathname();

  return (
    <header className="topbar">
      <Link href={redirects.home} className="brand">
        Nick Belvin
      </Link>
      <nav aria-label="Main">
        {links.map((link) => {
          const active = isActive(path, link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? 'active' : undefined}
              aria-current={active ? 'page' : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
