import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Header } from './components/SimpleHeader/Header';
import { SimpleFooter } from './components/SimpleFooter/SimpleFooter';
import { getColorSchemeCookie } from './lib/utils';
import { IsClientProvider } from './providers/client-provider';
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
  const colorScheme = getColorSchemeCookie();
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image" href="/public/images/icon.jpg" />
        <ColorSchemeScript defaultColorScheme={colorScheme} />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
          <ProgressProvider>
            <IsClientProvider>
              <Header />
              <Box
                mt={'lg'}
                display={'flex'}
                style={{
                  flexDirection: 'column',
                  height: '100%',
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
