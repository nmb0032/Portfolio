import GameGrid from '@/app/blog/examples/sudoku/gameGrid';
import Link from 'next/link';

export default function page() {
  return (
    <>
      <p className="subtext">
        <Link href="/blog/posts/sudoku-react-guide">&larr; how this works</Link>
      </p>
      <GameGrid />
    </>
  );
}
