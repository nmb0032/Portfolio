import {
  Title,
  SimpleGrid,
  Text,
  GridCol,
  ThemeIcon,
  Grid,
  rem,
  Box,
  Container,
} from '@mantine/core';
import {
  IconFileCode,
  IconSchool,
  IconSailboat,
  IconPresentation,
} from '@tabler/icons-react';
import classes from './Hero.module.css';

const features = [
  {
    icon: IconPresentation,
    title: 'Experience',
    description:
      'With experience at Juvare Inc., Lockheed Martin, and CACI, I have honed my skills in full stack and backend development, working with technologies like Typescript, React, Node.js, and C++',
  },
  {
    icon: IconFileCode,
    title: 'Skills',
    description:
      'I am proficient in a wide range of programming languages and frameworks, including Python, Java, C++, Typescript, React, and Angular, and I thrive in agile development environments',
  },
  {
    icon: IconSailboat,
    title: 'Hobbies',
    description: `Beyond coding, I enjoy rowing, hiking, and exploring the latest tech trends. I'm also passionate about continuous learning and contributing to open-source projects`,
  },
  {
    icon: IconSchool,
    title: 'Education',
    description: `Graduated Summa Cum Laude from Auburn University with a Bachelor's degree in Computer Engineering and a GPA of 3.91`,
  },
] as const;

const items = features.map((feature) => (
  <div key={feature.title}>
    <ThemeIcon
      size={44}
      radius="md"
      variant="gradient"
      gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
    >
      <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
    </ThemeIcon>
    <Text className="title" fz="lg" mt="sm" fw={500}>
      {feature.title}
    </Text>
    <Text c="dimmed" fz="sm">
      {feature.description}
    </Text>
  </div>
));

export function Hero() {
  return (
    <Container size={'lg'}>
      <Grid gutter={80}>
        <GridCol span={{ base: 12, md: 5 }}>
          <Title className={classes.title} order={2}>
            Hi There! 👋
          </Title>
          <Text c="dimmed">
            {` 
                I'm Nicholas Michael Belvin, a software developer based in
                Atlanta, GA. With a strong background in full stack
                development, I thrive on solving complex problems and creating
                innovative solutions. Outside of coding, I enjoy rowing, hiking, and
                exploring new tech trends. Welcome to my portfolio!
            `}
          </Text>
        </GridCol>
        <GridCol span={{ base: 12, md: 7 }}>
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
            {items}
          </SimpleGrid>
        </GridCol>
      </Grid>
    </Container>
  );
}
