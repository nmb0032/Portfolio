'use client';
import {
  ActionIcon,
  Tooltip,
  Transition,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export const ThemeButton = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Tooltip label="Toggle Color Scheme">
      <ActionIcon
        size={'lg'}
        value={colorScheme === 'dark' ? 'dark' : 'light'}
        onClick={toggleColorScheme}
        variant="subtle"
      >
        {colorScheme !== 'light' ? (
          <IconMoon color="var(--mantine-primary-color-filled)" />
        ) : (
          <IconSun color="var(--mantine-color-yellow-5)" />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
