import { Box, Title, Divider } from '@mantine/core';

interface HeadingDividerProps {
  title?: string;
}

export function HeadingDivider({ title = '' }: HeadingDividerProps) {
  return (
    <header>
      <Box display={'flex'} style={{ alignItems: 'center' }}>
        <Title order={1} style={{ textTransform: 'uppercase' }}>
          {title}
        </Title>
        <Divider mx={10} style={{ flex: 1 }} color="gray" size={'md'} />
      </Box>
    </header>
  );
}
