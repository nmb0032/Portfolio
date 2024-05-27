import React from 'react';
import { Card, Container, Text } from '@mantine/core';
import { HeadingDivider } from '@/app/components/HeaderDivider/HeaderDivider';

const Projects = () => {
  return (
    <Container>
      <HeadingDivider title="Projects" />
      <Card shadow="sm" padding="lg">
        <Text size="xl" w={700} style={{ marginBottom: '1rem' }}>
          {''}
        </Text>
        <Text>{''}</Text>
      </Card>
    </Container>
  );
};

export default Projects;
