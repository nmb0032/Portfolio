import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { MantineColorScheme } from '@mantine/core';
import { ThemeCookieName } from '../constants';

export function getColorSchemeCookie(): MantineColorScheme {
  return (
    (getCookie(ThemeCookieName, { cookies }) as MantineColorScheme) ?? 'auto'
  );
}
