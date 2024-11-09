import type { Metadata } from 'next';
import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Header } from './components/SimpleHeader/Header';
import { SimpleFooter } from './components/SimpleFooter/SimpleFooter';
import { getColorSchemeCookie } from './lib/utils';
import { IsClientProvider } from './providers/client-provider';
import { theme } from '@/app/theme';

import '@/app/globals.css';

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
              <Box style={{ flexGrow: 1 }}>{children}</Box>
              <SimpleFooter />
            </Box>
          </IsClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
