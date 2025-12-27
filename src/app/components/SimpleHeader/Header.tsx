'use client';
import { redirect, usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Group, Avatar, Title, Burger } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './Header.module.css';
import { ThemeButton } from '../ThemeButton';
import { redirects } from '@/app/lib/constants/redirects';

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

interface FloatingNavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  prefetch?: boolean;
}

function FloatingNavLink({
  href,
  children,
  isActive,
  onClick,
  prefetch,
}: FloatingNavLinkProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <Link
        prefetch={prefetch}
        href={href}
        className={`${classes.floatingNavLink} ${isActive ? classes.active : ''}`}
        onClick={onClick}
      >
        <motion.span
          initial={{ y: 0 }}
          whileHover={{ y: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {children}
        </motion.span>
        <motion.div
          className={classes.linkGlow}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
}

export function Header() {
  const path = usePathname();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = links.map((link) => (
    <FloatingNavLink
      key={link.link}
      href={link.link}
      isActive={determineActiveLink(path, link.link)}
      prefetch
      onClick={() => {
        close();
      }}
    >
      {link.label}
    </FloatingNavLink>
  ));

  return (
    <header
      className={`${classes.floatingHeader} ${isScrolled ? classes.isScrolled : ''}`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <Box className={classes.inner}>
        <Group>
          <Avatar
            style={{ cursor: 'pointer' }}
            onClick={() => redirect(redirects.home)}
            src={HEAD_SHOT}
            alt="User Avatar"
          />
          <Title className="title" order={3}>
            @Nmb0032
          </Title>
        </Group>
        <Group gap={5} visibleFrom="md">
          {items}
        </Group>
        <Group>
          <ThemeButton />
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </Box>
      <AnimatePresence>
        {opened && (
          <>
            <motion.div
              className={classes.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <motion.div
              className={classes.mobileMenu}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <button className={classes.menuClose} onClick={close}>
                Close
              </button>
              <div className={classes.menuLinks}>{items}</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
