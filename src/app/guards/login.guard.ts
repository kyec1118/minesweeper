import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, filter, map, take, tap } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.firebaseService.getCurrentUser().pipe(
      // Wait for auth to be initialized (skip initial undefined state)
      filter(user => user !== undefined),
      take(1),
      map(user => !user), // Allow access only if user is NOT authenticated
      tap(canAccess => {
        if (!canAccess) {
          console.log('User already authenticated, redirecting to minesweeper...');
          this.router.navigate(['/minesweeper']);
        }
      })
    );
  }
}
