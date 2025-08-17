export enum GameStatusType {
  NOT_STARTED,
  IN_PROGRESS,
  WON,
  LOST,
}

export type GameDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface GameDifficultyConfig {
  rows: number;
  columns: number;
  mines: number;
}

export const GameDifficultyConfig: Record<
  GameDifficulty,
  GameDifficultyConfig
> = {
  EASY: { rows: 8, columns: 8, mines: 10 },
  MEDIUM: { rows: 16, columns: 16, mines: 40 },
  HARD: { rows: 20, columns: 20, mines: 99 },
};
