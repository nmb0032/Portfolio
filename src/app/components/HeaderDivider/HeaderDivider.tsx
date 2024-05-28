import { Box, Title, Divider } from '@mantine/core';

interface HeadingDividerProps {
  title?: string;
}

export function HeadingDivider({ title = '' }: HeadingDividerProps) {
  return (
    <header>
      <Box
        display={'flex'}
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Title
          order={1}
          className="title"
          style={{ textAlign: 'center', textTransform: 'uppercase' }}
        >
          {title}
        </Title>
      </Box>
    </header>
  );
}
