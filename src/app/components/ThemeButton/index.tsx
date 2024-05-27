'use client';
import { ThemeCookieName } from '@/app/lib/constants';
import { useIsClient } from '@/app/providers/client-provider';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export const ThemeButton = () => {
  const isClient = useIsClient();

  useEffect(() => {
    const theme = getCookie(ThemeCookieName);

    if (theme === undefined && isClient) {
      const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return setTheme(dark ? 'dark' : 'light');
    }

    if (theme === undefined) {
      return setTheme('light');
    }

    return setTheme(theme);
  }, [isClient]);

  const [theme, setTheme] = useState('light');

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setCookie(ThemeCookieName, newTheme);
    isClient && window.location.reload();
  };

  return (
    <Tooltip label="Toggle Color Scheme">
      <ActionIcon
        size={'lg'}
        value={theme === 'dark' ? 'dark' : 'light'}
        onClick={handleThemeChange}
        variant="subtle"
      >
        {theme !== 'light' ? (
          <IconMoon color="var(--mantine-primary-color-filled)" />
        ) : (
          <IconSun color="var(--mantine-color-yellow-5)" />
        )}
      </ActionIcon>
    </Tooltip>
  );
};
