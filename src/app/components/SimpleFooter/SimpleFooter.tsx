import { Container, Group, Anchor, Text } from '@mantine/core';
import classes from './SimpleFooter.module.css';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
];

export function SimpleFooter() {
  const items = links.map((link) => (
    <Anchor<'a'> c="dimmed" key={link.label} href={link.link} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text>&copy; 2024 Nicholas Belvin</Text>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
