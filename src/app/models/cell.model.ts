export interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
}

export const DEFAULT_CELL = {
  x: 0,
  y: 0,
  isMine: false,
  isRevealed: false,
  isFlagged: false,
  adjacentMines: 0,
};
