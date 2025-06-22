import GameGrid from '@/app/blog/examples/sudoku/gameGrid';
import { Box } from '@mantine/core';

export default function page() {
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GameGrid />
    </Box>
  );
}
