import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInitService } from './services/auth-init.service';
import { FirebaseService } from './services/firebase.service';
import { GameIntegrationService } from './services/game-integration.service';
import { LeaderboardService } from './services/leaderboard.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    FirebaseService,
    AuthInitService,
    LeaderboardService,
    GameIntegrationService
  ]
};
