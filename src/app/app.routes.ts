import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'minesweeper', loadComponent: () => import('./components/minesweeper/home/minesweeper-home.component').then(m => m.MinesweeperHomeComponent) },
  { path: 'minesweeper/game', loadComponent: () => import('./components/minesweeper/frame/frame.component').then(m => m.FrameComponent) },
  { path: '**', redirectTo: '' }
];
