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
      '#505050', // Adjusted to ensure contrast
      '#404040', // Adjusted to ensure contrast
      '#303030', // Adjusted to ensure contrast
      '#202020', // Adjusted to ensure contrast
      '#000000', // True black shade
    ],
  },
  primaryShade: { dark: 7 },
});
