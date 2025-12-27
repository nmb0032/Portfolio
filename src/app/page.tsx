import { Hero } from '@/app/sections/Hero';
import { ProjectShowcase } from '@/app/sections/ProjectShowcase';
import { CredibilityStrip } from '@/app/sections/CredibilityStrip';
import { Metadata } from 'next';
import { Box } from '@mantine/core';

export const metadata: Metadata = {
  title: `Nick's Portfolio | Home`,
  description:
    'Senior Software Engineer specializing in scalable cloud architectures, full-stack development, and high-performance data processing. Based in Atlanta, GA.',
};

export default function page() {
  return (
    <Box>
      <Hero />
      <CredibilityStrip />
      <ProjectShowcase />
    </Box>
  );
}
