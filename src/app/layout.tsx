import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
  Box,
} from '@mantine/core';
import { Header } from './components/SimpleHeader/Header';
import { SimpleFooter } from './components/SimpleFooter/SimpleFooter';
import { IsClientProvider } from './providers/client-provider';
import { SpaceWarpBackground } from './components/SpaceWarpBackground';
import { theme } from '@/app/theme';

import '@/app/globals.css';
import { ProgressProvider } from '@/app/providers/progress-provider';

export const metadata: Metadata = {
  title: `Nick's Portfolio`,
  description: 'All about my adventure',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="icon" type="image" href="/public/images/icon.jpg" />
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <ProgressProvider>
            <IsClientProvider>
              <SpaceWarpBackground />
              <Header />
              <Box
                mt={'lg'}
                display={'flex'}
                style={{
                  flexDirection: 'column',
                  height: '100%',
                  paddingTop: 'clamp(5rem, 8vw, 7rem)',
                }}
              >
                <Box role="main" style={{ flexGrow: 1 }}>
                  {children}
                </Box>
                <SimpleFooter />
              </Box>
            </IsClientProvider>
          </ProgressProvider>
        </MantineProvider>
        <Analytics />
      </body>
    </html>
  );
}
