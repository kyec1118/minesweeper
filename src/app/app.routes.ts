import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard] // Protect home page - redirect to login if not authenticated
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent),
    canActivate: [LoginGuard] // Prevent access to login if already authenticated
  },
  { 
    path: 'minesweeper', 
    loadComponent: () => import('./components/minesweeper/minesweeper-home/minesweeper-home.component').then(m => m.MinesweeperHomeComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'minesweeper/game', 
    loadComponent: () => import('./components/minesweeper/minesweeper-frame/minesweeper-frame.component').then(m => m.MinesweeperFrameComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];
