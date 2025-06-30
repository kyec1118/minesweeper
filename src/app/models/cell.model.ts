export enum CellStatusType {
  HIDDEN,
  REVEALED,
  FLAGGED,
}
export interface Cell {
  x: number;
  y: number;
  isMine: boolean;
  adjacentMines: number;
  status: CellStatusType;
}
