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
import { Link } from 'react-scroll';

const headShot = '/images/head_shot.JPG';

const links = [
  { link: 'hero', label: 'Home' },
  { link: 'technologies', label: 'Technologies' },
  { link: 'hobbies', label: 'Hobbies' },
  { link: 'contact', label: 'Contact' },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <Link
      key={link.link}
      to={link.link}
      smooth={true}
      duration={500}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link);
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
