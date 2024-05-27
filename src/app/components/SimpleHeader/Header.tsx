'use client';
import { useState } from 'react';
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

const headShot = '/images/head_shot.JPG';

const links = [
  { link: '/about', label: 'About Me' },
  { link: '/pricing', label: 'My Projects' },
  { link: '/learn', label: 'Posts' },
  { link: '/community', label: 'Technologies' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
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
