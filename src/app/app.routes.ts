import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'minesweeper', loadComponent: () => import('./components/minesweeper/minesweeper-home/minesweeper-home.component').then(m => m.MinesweeperHomeComponent) },
  { path: 'minesweeper/game', loadComponent: () => import('./components/minesweeper/minesweeper-frame/minesweeper-frame.component').then(m => m.MinesweeperFrameComponent) },
  { path: '**', redirectTo: '' }
];
