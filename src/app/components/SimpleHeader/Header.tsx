'use client';
import { usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { Box, Group, Avatar, Title, Burger, Drawer } from '@mantine/core';
import classes from './Header.module.css';
import { ThemeButton } from '../ThemeButton';

const HEAD_SHOT = '/images/head_shot.JPG' as const;

const links = [
  { link: '/', label: 'Home' },
  { link: '/technologies', label: 'Technologies' },
  { link: '/hobbies', label: 'Hobbies' },
  { link: '/contact', label: 'Contact' },
  { link: '/blog', label: 'Blog' },
];

function determineActiveLink(path: string, link: string) {
  if (path === '/' || link === '/') {
    return path === link;
  }
  return path.includes(link);
}

export function Header() {
  const path = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      prefetch
      key={link.link}
      href={link.link}
      className={classes.link}
      data-active={determineActiveLink(path, link.link) || undefined}
      onClick={() => {
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header
      className={classes.header}
      role="navigation"
      aria-label="Main Navigation"
    >
      <Box className={classes.inner}>
        <Group>
          <Avatar src={HEAD_SHOT} alt="User Avatar" />
          <Title className="title" order={3}>
            @Nmb0032
          </Title>
        </Group>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Group>
          <ThemeButton />
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
        </Group>
      </Box>
      <Drawer opened={opened} onClose={close} title="@Nmb0032">
        {items}
      </Drawer>
    </header>
  );
}
