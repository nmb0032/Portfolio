import { Container, Group, Anchor, Text } from '@mantine/core';
import classes from './SimpleFooter.module.css';
import { redirects } from '@/app/lib/constants/redirects';

const links = [
  { link: redirects.contact, label: 'Contact' },
  { link: redirects.privacy, label: 'Privacy' },
  { link: redirects.blog, label: 'Blog' },
];

export function SimpleFooter() {
  const items = links.map((link) => (
    <Anchor<'a'> c="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div role="contentinfo" className={classes.footer}>
      <Container className={classes.inner}>
        <Text>&copy; 2024 Nicholas Belvin</Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
