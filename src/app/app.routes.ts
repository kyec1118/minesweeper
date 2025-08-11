import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'game', loadComponent: () => import('./components/frame/frame.component').then(m => m.FrameComponent) },
  { path: '**', redirectTo: '' }
];
