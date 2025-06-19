import { Box, Loader } from '@mantine/core';
import React from 'react';

export default function Loading() {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Loader size={'sm'} />
    </Box>
  );
}
