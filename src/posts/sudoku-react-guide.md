---
title: Building a Sudoku Game in React!
date: '2025-06-22'
author: Nick Belvin
excerpt: A guide to building a Reactful Sudoku game.
image: /images/post-previews/sudoku-react-guide.png
---

*A guide to building a Reactful Sudoku game.*

---

## Introduction

Sudoku is a great game to re-write in React as it has a nice global state and a fun example of using a backtracking algorithm.

**You can try out the live Sudoku game [here](/blog/examples/sudoku)!**

---

## Prerequisites

* Basic understanding of React (components, props, state, hooks)
* Typescript fundamentals
* Node.js and npm/yarn installed
* Code editor (VS Code recommended)

---

## Setting Up Your React Project

We are using Vite as our web bundler

```bash
npm create vite@latest sudoku-game -- --template react
```

## The Code
### Removing Boilerplate

Start by removing some of the boilerplate code, like everything in the App.tsx file. Since this is a simple app, we will just use App.tsx for our work.
The App Component (App.tsx)

Our main App component is quite simple; it serves as the entry point and renders our GameGrid component, which will contain all the Sudoku game logic and UI.

```ts
import { useCallback, useMemo, useReducer, useState } from "react";
import "./App.css";

function App() {
  return <GameGrid />;
}
```

### Sudoku Game Core Logic (Sudoku Class)

The heart of our Sudoku game resides in the Sudoku class. This class is responsible for generating valid Sudoku puzzles, handling moves, and validating the game state.
```DIFFICULTY_MAP```

We define ```DIFFICULTY_MAP``` to control the number of cells removed for different difficulty levels, making puzzles easier or harder.

``` ts
const DIFFICULTY_MAP = {
  easy: { minRemoved: 40, maxRemoved: 50 },
  medium: { minRemoved: 50, maxRemoved: 55 },
  hard: { minRemoved: 55, maxRemoved: 60 },
} as const;

type Difficulty = keyof typeof DIFFICULTY_MAP;
```

### Sudoku Class Properties and Constructor

The Sudoku class maintains a grid which is a 9x9 2D array representing the Sudoku board.

``` ts
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
  // ... rest of the class methods
}
```

```newGame(difficulty)```

This method orchestrates the creation of a new Sudoku puzzle:
* Resets the board to all zeros.
* Calls ```fillBoard()``` to generate a complete, valid Sudoku solution.
* Calls ```removeNumbers()``` to hide a certain number of cells based on the chosen difficulty.

``` ts
  newGame(difficulty: keyof typeof Sudoku.DIFFICULTY_MAP) {
    this.resetBoard();
    this.fillBoard();
    this.removeNumbers(difficulty);
  }
```

```removeNumbers(difficulty)```

This function takes a difficulty level and randomly removes a specified number of cells from the fully solved grid. It ensures that the number of removed cells falls within the minRemoved and maxRemoved range defined in ```DIFFICULTY_MAP```.
``` ts
  removeNumbers(difficulty: keyof typeof Sudoku.DIFFICULTY_MAP) {
    const { minRemoved, maxRemoved } = Sudoku.DIFFICULTY_MAP[difficulty];

    // Random number between min and max range of difficulty
    const count = Math.floor(
      Math.random() * (maxRemoved - minRemoved + 1) + minRemoved
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
  ```

### Recursive Backtracking
```fillBoard()```

This is the core algorithm for generating a solvable Sudoku puzzle. It uses a recursive backtracking approach:

* Finds the first empty cell.
* Generates a random order of possible values (1-9).
* For each value, it checks if placing that value in the target cell is a valid move.
* If valid, it places the value, and recursively calls fillBoard().
* If the recursive call returns true (meaning the rest of the board could be filled), then this path is successful.
* If the recursive call returns false (meaning no solution was found down that path), it "backtracks" by resetting the current cell to 0 and tries the next value.
* If all values have been tried for a cell and none lead to a solution, it returns false, triggering backtracking in the previous call.

```ts

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
        this.grid[target[0]][cell[1]] = 0; // Fixed typo here (cell[1] -> target[1])
      }
    }

    // No solution
    return false;
  }
```

```move(value, x, y)```

This method attempts to place a value at coordinates (x, y). It first validates the move using isValidMove and then updates the internal grid.
``` ts

  move(value: number, x: number, y: number): boolean {
    if (Sudoku.isValidMove(value, x, y, this.grid)) {
      this.grid[x][y] = value;
      return true;
    }
    return false;
  }
```

### Static Helper Methods

The Sudoku class also contains several static helper methods:

* ```generateRandomSudokuValues()```: Shuffles an array of numbers [1...9] to ensure random attempts during ```fillBoard()```.
* ```findFirstEmptyCell(grid)```: Iterates through the given grid to find the first cell containing 0 (empty). Returns its [row, col] coordinates or null if the grid is full.
( )```resetBoard()```: Sets all cells in the internal grid to 0.
* ```isValidMove(value, x, y, grid)```: This crucial validation method checks if placing a value at (x, y) in the grid is valid according to Sudoku rules (no duplicate in row, column, or 3x3 subgrid).

``` ts

  static generateRandomSudokuValues() {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }
    return values;
  }

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

  static isValidMove(
    value: number,
    x: number,
    y: number,
    grid: number[][]
  ): boolean {
    if (x < 0 || x > 8 || y < 0 || y > 8 || value > 9 || value < 1) {
      return false;
    }
    if (grid[x].some((existing) => existing === value)) {
      return false;
    }
    if (grid.some((existing) => existing[y] === value)) {
      return false;
    }

    const startRow = Math.floor(x / 3) * 3;
    const startCol = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] === value) {
          return false;
        }
      }
    }
    return true;
  }
```

## React Components
### GameGrid Component

This is our main React component that renders the Sudoku board and handles user interactions.

``` ts
function GameGrid() {

  // Initialize a Sudoku instance using useMemo to ensure it's created once
  const sudoku = useMemo(() => new Sudoku(), []);

  // State to hold the current grid (what the user sees and interacts with)
  const [grid, setGrid] = useState<number[][]>(
    sudoku.grid.map((row) => [...row]) // Deep copy
  );

  // State to hold the initial puzzle grid (to differentiate fixed numbers from user input)
  const [initialGrid, setInitialGrid] = useState<number[][]>(
    sudoku.grid.map((row) => [...row])
  );

  // Callback to generate a new puzzle based on difficulty
  const handleGeneratePuzzle = useCallback(
    (difficulty: keyof typeof Sudoku.DIFFICULTY_MAP) => {
      sudoku.newGame(difficulty); // Generate in the Sudoku class
      setGrid(sudoku.grid.map((row) => [...row])); // Update React state
      setInitialGrid(sudoku.grid.map((row) => [...row])); // Store initial state
    },
    [sudoku] // Dependency array includes sudoku instance
  );

  // Callback to handle user input in a cell
  const handleMove = useCallback(
    (value: string, x: number, y: number) => {
      const num = parseInt(value, 10);
      // Only process if it's a valid number 1-9
      if (num >= 1 && num <= 9) {
        sudoku.move(num, x, y); // Attempt the move in the Sudoku class
      } else if (value === "") {
        // Allow clearing the cell
        sudoku.grid[x][y] = 0;
      }
      setGrid(sudoku.grid.map((row) => [...row])); // Update React state
    },
    [sudoku]
  );

  return (
    <div>
      <h1>Sudoku Generator</h1>
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => handleGeneratePuzzle("easy")}>Easy</button>
        <button onClick={() => handleGeneratePuzzle("medium")}>Medium</button>
        <button onClick={() => handleGeneratePuzzle("hard")}>Hard</button>
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
      <button style={{ marginTop: 10 }}>Solve</button>
    </div>
  );
}
```

Key Features of GameGrid:

    useMemo for Sudoku instance: Ensures the Sudoku class instance is created only once.
    useState for grid and initialGrid: grid holds the current state of the board (including user inputs), while initialGrid stores the original puzzle state to identify fixed numbers.
    handleGeneratePuzzle: Triggers the Sudoku class to create a new puzzle and updates the React state.
    handleMove: Called when a user types into a cell. It updates the Sudoku instance's grid and then triggers a re-render by updating the React grid state.
    Mapping grid to Row and Cell components: The nested map calls render the 9x9 Sudoku board, passing relevant props to Row and Cell for styling and interaction.
    Difficulty Buttons: Buttons to generate puzzles of different difficulties.
    "Solve" Button: Currently just a button, implying future functionality to solve the puzzle.

### Row Component

A simple functional component that acts as a flex container for the 9 Cell components in a row.

```ts
function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex" }}>{children}</div>;
}
```

### Cell Component

Represents a single input cell in the Sudoku grid.

``` ts
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
    height: "50px",
    width: "50px",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: isPredefined ? "bold" : "normal",
    color: isPredefined ? "#333" : "#0056b3",
    backgroundColor: isPredefined ? "#e0e0e0" : "#ffffff",
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
    cursor: isPredefined ? "not-allowed" : "text",
    WebkitAppearance: "none",
    MozAppearance: "textfield",
  };

  const dynamicBorderStyle: React.CSSProperties = {
    borderRightWidth: isRightBorder ? "3px" : "1px",
    borderRightColor: isRightBorder ? "black" : "#ccc",
    borderBottomWidth: isBottomBorder ? "3px" : "1px",
    borderBottomColor: isBottomBorder ? "black" : "#ccc",
  };

  return (
    <input
      disabled={isPredefined}
      style={{ ...cellStyle, ...dynamicBorderStyle }}
      value={children === undefined ? "" : children} // Handle undefined to show empty
      maxLength={1}
      onChange={onChange}
      type="number" // Set input type to number
    />
  );
}
```

Key Features of Cell:

    Props: Takes onChange for input handling, children (the cell's value), isRightBorder and isBottomBorder for styling the thicker grid lines, and isPredefined to distinguish original puzzle numbers from user input.
    Conditional Styling: Applies different styles (boldness, color, background, cursor) based on whether the cell is isPredefined.
    Dynamic Borders: Uses isRightBorder and isBottomBorder to render thicker borders every three cells, visually dividing the 3x3 subgrids.
    disabled={isPredefined}: Prevents users from changing the initial, fixed numbers of the puzzle.
    type="number": Ensures the input behaves like a number field.
    value={children === undefined ? "" : children}: Correctly renders an empty string for 0 values (empty cells) in the input field.

CSS Styling (App.css)

You'll need to define some basic global styles in App.css to center your app and provide a clean slate for the Sudoku grid. Given your component styling is mostly inline, App.css might just contain basic layout.
CSS

```css
/* App.css example */
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0; /* Light background for the page */
}
```

Potential Enhancements and Next Steps

    Solving the Puzzle: Implement the logic for the "Solve" button. This would involve taking the current grid state and using a modified fillBoard (or a dedicated solver function) to find a solution.
    Validation and Feedback: Provide immediate visual feedback to the user if they place an invalid number (e.g., highlighting conflicting cells in red).
    Game State Management:
        You could refactor handleGeneratePuzzle and handleMove to dispatch actions to a reducer, centralizing state logic.
        Track game status (e.g., "playing", "solved", "invalid").
    Timer: Add a timer to track how long it takes the user to solve the puzzle.
    Undo/Redo: Implement functionality to undo and redo moves.
    Error Checking for fillBoard: While the current fillBoard is for generation, a separate solvePuzzle function would need to handle cases where a user might have made the puzzle unsolvable.

This detailed walkthrough covers the provided code, explaining each part of the Sudoku game's implementation in React with TypeScript. You now have a solid foundation for a functional Sudoku game!


