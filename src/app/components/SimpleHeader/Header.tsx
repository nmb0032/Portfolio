'use client';
import { useEffect, useState } from 'react';
import {
  Container,
  Group,
  Burger,
  Title,
  Avatar,
  Box,
  Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';
import { ThemeButton } from '../ThemeButton';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const headShot = '/images/head_shot.JPG';

const links = [
  { link: '/home', label: 'Home' },
  { link: '/technologies', label: 'Technologies' },
  { link: '/hobbies', label: 'Hobbies' },
  { link: '/contact', label: 'Contact' },
  { link: '/blog', label: 'Blog' },
];

export function Header() {
  const path = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => (
    <Link
      prefetch
      key={link.link}
      href={link.link}
      className={classes.link}
      data-active={path.includes(link.link) || undefined}
      onClick={() => {
        close();
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Box className={classes.inner}>
        <Group>
          <Avatar src={headShot} />
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
