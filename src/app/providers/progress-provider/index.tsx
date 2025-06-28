'use client';

import { ProgressProvider as NProgressProvider } from '@bprogress/next/app';

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NProgressProvider
      height="4px"
      color="var(--mantine-color-blue-filled)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </NProgressProvider>
  );
};
