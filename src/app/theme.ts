'use client';

import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  autoContrast: true,
  fontFamily: 'Source Code Pro, monospace',
  colors: {
    dark: [
      '#E0E0E0', // Lightest shade
      '#C0C0C0',
      '#A0A0A0',
      '#808080',
      '#606060',
      '#404040',
      '#303030',
      '#202020',
      '#101010',
      '#000000', // True black shade
    ],
  },
  primaryShade: { dark: 7 },
});
