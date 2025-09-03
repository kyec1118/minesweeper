import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInitService {
  private isInitialized = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private async initializeAuth() {
    // Wait for Firebase auth to initialize
    this.firebaseService.getCurrentUser().pipe(
      take(1) // Take the first emission after auth initializes
    ).subscribe(() => {
      this.isInitialized = true;
      console.log('Auth initialization complete');
    });
  }

  async waitForAuthInit(): Promise<void> {
    if (this.isInitialized) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const checkInit = () => {
        if (this.isInitialized) {
          resolve();
        } else {
          setTimeout(checkInit, 50);
        }
      };
      checkInit();
    });
  }
}
