import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, filter, map, take, tap } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.firebaseService.getCurrentUser().pipe(
      // Wait for auth to be initialized (skip initial null/undefined states)
      filter(user => user !== undefined), 
      take(1),
      map(user => !!user), // Convert user to boolean
      tap(isAuthenticated => {
        console.log('Auth guard check:', isAuthenticated);
        if (!isAuthenticated) {
          console.log('User not authenticated, redirecting to login...');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
