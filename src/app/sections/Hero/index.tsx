import {
  Title,
  SimpleGrid,
  Text,
  GridCol,
  ThemeIcon,
  Grid,
  rem,
  Box, // Box is imported but not used, consider removing if not needed.
  Container,
} from '@mantine/core';
import {
  IconFileCode,
  IconSchool,
  IconSailboat,
  IconPresentation,
} from '@tabler/icons-react';
import classes from './Hero.module.css'; // Ensure this path is correct for your wave-emoji animation

const features = [
  {
    icon: IconPresentation,
    title: 'Experience',
    description:
      '4+ years as a Senior Software Engineer, leading full-stack development for mission-critical applications and specializing in scalable cloud architectures and large-scale data migrations. ',
  },
  {
    icon: IconFileCode,
    title: 'Skills',
    description:
      'Expert in full-stack (TypeScript, React, Node.js, PostgreSQL) and backend (C++, Java) development, with strong proficiency in AWS (EC2, S3, Lambda, RDS), Kubernetes, Docker, and CI/CD. ',
  },
  {
    icon: IconSailboat,
    title: 'Hobbies',
    description: `Beyond coding, I enjoy rowing, hiking, and exploring the latest tech trends. I'm also passionate about continuous learning and contributing to open-source projects.`,
  },
  {
    icon: IconSchool,
    title: 'Education',
    description: `Graduated Summa Cum Laude from Auburn University with a Bachelor's degree in Computer Engineering and a GPA of 3.91. `,
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
            Hi There! <span className={classes['wave-emoji']}>👋</span>
          </Title>
          <Text c="dimmed">
            {`
                I'm Nick, a Senior Software Engineer based in Atlanta, GA. 
                I specialize in building, scaling, and evolving end-to-end service platforms, with a strong focus on scalable cloud architectures and high-performance data processing. 
                My passion lies in crafting robust full-stack solutions and delivering truly first-class user experiences. Welcome to my portfolio!
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
