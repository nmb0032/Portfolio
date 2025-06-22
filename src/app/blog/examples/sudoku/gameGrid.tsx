'use client';

import { useCallback, useMemo, useReducer, useState } from 'react';

const DIFFICULTY_MAP = {
  easy: { minRemoved: 40, maxRemoved: 50 },
  medium: { minRemoved: 50, maxRemoved: 55 },
  hard: { minRemoved: 55, maxRemoved: 60 },
} as const;

type Difficulty = keyof typeof DIFFICULTY_MAP;

export default function GameGrid() {
  // 9x9 grid of boxes
  const sudoku = useMemo(() => new Sudoku(), []);

  // Maintain react state of grid
  const [grid, setGrid] = useState<number[][]>(
    // Deep copy
    sudoku.grid.map((row) => [...row]),
  );

  const [initialGrid, setInitialGrid] = useState<number[][]>(
    sudoku.grid.map((row) => [...row]),
  );

  const handleGeneratePuzzle = useCallback(
    (difficulty: keyof typeof Sudoku.DIFFICULTY_MAP) => {
      sudoku.newGame(difficulty);

      setGrid(sudoku.grid.map((row) => [...row]));
      setInitialGrid(sudoku.grid.map((row) => [...row]));
    },
    [sudoku],
  );

  const handleMove = useCallback(
    (value: string, x: number, y: number) => {
      const num = parseInt(value, 10);
      sudoku.move(num, x, y);
      setGrid(sudoku.grid.map((row) => [...row]));
    },
    [sudoku],
  );

  const handleSolve = useCallback(() => {
    sudoku.fillBoard();
    setGrid(sudoku.grid.map((row) => [...row]));
  }, [sudoku]);

  return (
    <div>
      <h1>Sudoku Generator</h1>
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => handleGeneratePuzzle('easy')}>Easy</button>
        <button onClick={() => handleGeneratePuzzle('medium')}>Medium</button>
        <button onClick={() => handleGeneratePuzzle('hard')}>Hard</button>
      </div>
      <div>
        {grid.map((row, rowIndex) => (
          <Row key={`row-${rowIndex}`}>
            {row.map((col, colIndex) => (
              <Cell
                onChange={(e) => handleMove(e.target.value, rowIndex, colIndex)}
                isPredefined={Boolean(initialGrid[rowIndex][colIndex] !== 0)}
                key={`cell-${colIndex}-${rowIndex}-${col}`}
                isRightBorder={(colIndex + 1) % 3 === 0 && colIndex !== 8}
                isBottomBorder={(rowIndex + 1) % 3 === 0 && rowIndex !== 8}
              >
                {col === 0 ? undefined : col}
              </Cell>
            ))}
          </Row>
        ))}
      </div>
      <button onClick={handleSolve} style={{ marginTop: 10 }}>
        Solve
      </button>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex' }}>{children}</div>;
}

// Represents a sudoku box
function Cell({
  onChange,
  children,
  isRightBorder,
  isBottomBorder,
  isPredefined,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: number;
  isBottomBorder: boolean;
  isRightBorder: boolean;
  isPredefined: boolean;
}) {
  const cellStyle: React.CSSProperties = {
    height: '50px',
    width: '50px',
    textAlign: 'center', // Center text horizontally
    fontSize: '24px', // Larger font size
    fontWeight: isPredefined ? 'bold' : 'normal', // Bold for initial numbers
    color: isPredefined ? '#333' : '#0056b3', // Different color for user input
    backgroundColor: isPredefined ? '#e0e0e0' : '#ffffff', // Background for fixed vs. user input
    border: '1px solid #ccc',
    outline: 'none', // Remove default input focus outline
    boxSizing: 'border-box', // Ensure padding and border are included in width/height
    cursor: isPredefined ? 'not-allowed' : 'text', // Cursor changes for fixed cells
    WebkitAppearance: 'none', // For webkit browsers (Chrome, Safari)
    MozAppearance: 'textfield', // For Firefox - to hide spinner for number inputs
  };

  const dynamicBorderStyle: React.CSSProperties = {
    borderRightWidth: isRightBorder ? '3px' : '1px',
    borderRightColor: isRightBorder ? 'black' : '#ccc',
    borderBottomWidth: isBottomBorder ? '3px' : '1px',
    borderBottomColor: isBottomBorder ? 'black' : '#ccc',
  };

  return (
    <input
      disabled={isPredefined}
      style={{ ...cellStyle, ...dynamicBorderStyle }}
      value={children}
      maxLength={1}
      onChange={onChange}
    />
  );
}

class Sudoku {
  grid: number[][];

  static readonly DIFFICULTY_MAP = {
    easy: { minRemoved: 40, maxRemoved: 50 },
    medium: { minRemoved: 50, maxRemoved: 55 },
    hard: { minRemoved: 55, maxRemoved: 60 },
  };

  constructor() {
    this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  newGame(difficulty: keyof typeof Sudoku.DIFFICULTY_MAP) {
    this.resetBoard();
    this.fillBoard();
    this.removeNumbers(difficulty);
  }

  removeNumbers(difficulty: keyof typeof Sudoku.DIFFICULTY_MAP) {
    const { minRemoved, maxRemoved } = Sudoku.DIFFICULTY_MAP[difficulty];

    const count = Math.floor(
      Math.random() * (maxRemoved - minRemoved + 1) + minRemoved,
    );

    // Load all cell indexes
    const cellsToRemove: [number, number][] = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        cellsToRemove.push([r, c]);
      }
    }

    // Shuffle them randomly
    for (let i = cellsToRemove.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cellsToRemove[i], cellsToRemove[j]] = [
        cellsToRemove[j],
        cellsToRemove[i],
      ];
    }

    // Now remove
    let removedCount = 0;
    for (const [r, c] of cellsToRemove) {
      if (removedCount >= count) {
        break;
      }

      if (this.grid[r][c] !== 0) {
        this.grid[r][c] = 0;
        removedCount++;
      }
    }
  }

  // Back fill valid sudoku board typically uses recursion
  fillBoard(): boolean {
    const target = Sudoku.findFirstEmptyCell(this.grid);

    // Board is solved
    if (target === null) {
      return true;
    }

    const possibleValues = Sudoku.generateRandomSudokuValues();
    for (const value of possibleValues) {
      if (Sudoku.isValidMove(value, target[0], target[1], this.grid)) {
        // Place and recurse
        this.grid[target[0]][target[1]] = value;

        if (this.fillBoard()) {
          return true;
        }

        // Back track
        this.grid[target[0]][target[1]] = 0;
      }
    }

    // No solution
    return false;
  }

  move(value: number, x: number, y: number): boolean {
    if (Sudoku.isValidMove(value, x, y, this.grid)) {
      this.grid[x][y] = value;
      return true;
    }
    return false;
  }

  static generateRandomSudokuValues() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = values.length - 1; i > 0; i--) {
      //Pick random j to shuffle with
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  }

  // Finds first empty cell or returns null
  static findFirstEmptyCell(grid: number[][]): [number, number] | null {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j] === 0) {
          return [i, j];
        }
      }
    }

    return null;
  }

  resetBoard() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  // Determines if the value can be placed in the location
  static isValidMove(
    value: number,
    x: number,
    y: number,
    grid: number[][],
  ): boolean {
    // Number out of grid
    if (x < 0 || x > 8 || y < 0 || y > 8 || value > 9 || value < 1) {
      return false;
    }

    // All Cells in row must not yet contain the value
    if (grid[x].some((existing) => existing === value)) {
      return false;
    }

    // All cells in column must not yet contain the value
    if (grid.some((existing) => existing[y] === value)) {
      return false;
    }

    // All cells in 3x3 grid must not yet contain the value
    // determine what grid we are in
    const startRow = Math.floor(x / 3) * 3;
    const startCol = Math.floor(y / 3) * 3;

    // Loop i 0 to 2 adding grid offset which is grid + 3 1 + 3 * grid
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === value) {
          return false;
        }
      }
    }

    return true;
  }
}
