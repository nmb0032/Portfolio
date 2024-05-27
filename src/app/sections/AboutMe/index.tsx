import React from 'react';
import { Card, Container, Text } from '@mantine/core';
import { HeadingDivider } from '@/app/components/HeaderDivider/HeaderDivider';

interface AboutMeProps {
  name: string;
  bio: string;
}

const AboutMe: React.FC<AboutMeProps> = ({ name, bio }) => {
  return (
    <Container>
      <HeadingDivider title="About Me" />
      <Card shadow="sm" padding="lg">
        <Text size="xl" w={700} style={{ marginBottom: '1rem' }}>
          {name}
        </Text>
        <Text>{bio}</Text>
      </Card>
    </Container>
  );
};

export default AboutMe;
