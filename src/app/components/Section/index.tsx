import React, { ReactNode } from 'react';
import { Box, Card, Container, Text } from '@mantine/core';
import { HeadingDivider } from '@/app/components/HeaderDivider/HeaderDivider';

export interface SectionProps {
  title: string;
  children?: ReactNode;
  margin?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  margin,
}) => {
  return (
    <Container fluid>
      <HeadingDivider title={title} />
      <Box m={margin ?? 'lg'}>{children}</Box>
    </Container>
  );
};
