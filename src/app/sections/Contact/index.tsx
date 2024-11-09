import { Section } from '@/app/components/Section';
import { ActionIcon, Box, Group, Text, ThemeIcon } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from '@tabler/icons-react';

export const Contact: React.FC = () => {
  return (
    <Section title="Follow Me" margin="0">
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Your content here */}
        <Text style={{ textAlign: 'center' }}>Find me on</Text>
        <Group mt={'md'} style={{ justifyContent: 'center' }}>
          <ActionIcon
            aria-label="My Linkedin Account"
            component="a"
            href="https://www.linkedin.com/in/nicholas-belvin-9738181ab/"
            variant={'gradient'}
            radius={'xl'}
            size={'xl'}
          >
            <IconBrandLinkedin />
          </ActionIcon>
          <ActionIcon
            aria-label="My GitHub Account"
            component="a"
            href="https://github.com/nmb0032"
            variant={'gradient'}
            radius={'xl'}
            size={'xl'}
          >
            <IconBrandGithub />
          </ActionIcon>
        </Group>
      </Box>
    </Section>
  );
};
