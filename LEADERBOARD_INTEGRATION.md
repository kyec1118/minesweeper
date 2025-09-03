# Leaderboard Integration Guide

## Overview
The leaderboard component has been successfully created with the following features:
- Ranks players by lowest time first, then lowest attempts
- Records player's displayName, time, attempt count, and rank
- Stores data in Firebase Firestore
- Beautiful UI with special styling for top 3 players

## Files Created

### Core Components
- `src/app/components/shared/leaderboard/leaderboard.component.ts`
- `src/app/components/shared/leaderboard/leaderboard.component.html`
- `src/app/components/shared/leaderboard/leaderboard.component.scss`
- `src/app/components/shared/leaderboard/leaderboard.module.ts`

### Services
- `src/app/services/leaderboard.service.ts` - Handles Firestore operations
- `src/app/services/game-integration.service.ts` - Connects game events to leaderboard

### Test Files
- `src/app/components/shared/leaderboard/leaderboard.component.spec.ts`
- `src/app/services/leaderboard.service.spec.ts`

## Integration Steps

### 1. Import LeaderboardModule in your app module
```typescript
// In your app.module.ts or main component module
import { LeaderboardModule } from './components/shared/leaderboard/leaderboard.module';

@NgModule({
  imports: [
    // ... other imports
    LeaderboardModule
  ],
  // ...
})
export class YourModule { }
```

### 2. Add GameIntegrationService to providers
```typescript
// In your app.module.ts or app.config.ts
import { GameIntegrationService } from './services/game-integration.service';

// For standalone components (app.config.ts):
export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    GameIntegrationService
  ]
};

// For NgModule (app.module.ts):
@NgModule({
  providers: [
    // ... other providers
    GameIntegrationService
  ]
})
```

### 3. Use the leaderboard component in your templates
```html
<!-- In any component template where you want to show the leaderboard -->
<app-leaderboard></app-leaderboard>
```

### 4. Initialize GameIntegrationService in your main game component
```typescript
// In your main game component (e.g., minesweeper-home.component.ts)
import { GameIntegrationService } from '../../services/game-integration.service';

@Component({
  // ...
})
export class MinesweeperHomeComponent implements OnInit {
  constructor(
    // ... other services
    private gameIntegrationService: GameIntegrationService
  ) {
    // Service will automatically start tracking games
  }
}
```

## Firebase Firestore Structure

The leaderboard data will be stored in Firestore with this structure:

```
Collection: "leaderboard"
Document: (auto-generated ID)
{
  displayName: "Player Name",
  time: 45,           // seconds
  tries: 3,           // number of attempts
  timestamp: Timestamp
}
```

## Features

### Ranking Logic
1. **Primary Sort**: Lowest time (fastest completion)
2. **Secondary Sort**: Lowest attempts (fewest tries)

### UI Features
- **Top 3 Special Styling**: Gold, silver, bronze badges
- **Responsive Design**: Works on mobile and desktop
- **Loading States**: Shows loading indicator while fetching data
- **Error Handling**: Displays error messages with retry option
- **Empty State**: Shows message when no entries exist
- **Refresh Button**: Manual refresh capability

### Automatic Game Tracking
- **Attempt Counting**: Tracks number of game attempts per session
- **Win Detection**: Automatically saves to leaderboard when game is won
- **User Integration**: Uses authenticated user's displayName or email
- **Session Management**: Resets attempt count after successful game

## Usage Examples

### Display leaderboard in sidebar
```html
<div class="game-layout">
  <div class="game-area">
    <app-minesweeper-frame></app-minesweeper-frame>
  </div>
  <div class="sidebar">
    <app-leaderboard></app-leaderboard>
  </div>
</div>
```

### Show leaderboard in modal/dialog
```html
<button (click)="showLeaderboard = true">View Leaderboard</button>

<div class="modal" *ngIf="showLeaderboard">
  <div class="modal-content">
    <button (click)="showLeaderboard = false">Close</button>
    <app-leaderboard></app-leaderboard>
  </div>
</div>
```

### Get current attempt count
```typescript
// In your component
constructor(private gameIntegration: GameIntegrationService) {}

getCurrentAttempts(): number {
  return this.gameIntegration.getCurrentAttempts();
}
```

## Customization Options

### Styling
Modify `leaderboard.component.scss` to match your game's theme:
- Change colors in CSS variables
- Modify table layout
- Customize rank badges
- Update responsive breakpoints

### Leaderboard Limits
In `leaderboard.service.ts`, you can modify:
- `getTopEntries(limit)` to show only top N players
- Add difficulty-based collections (e.g., "leaderboard-easy", "leaderboard-hard")
- Add date filtering for daily/weekly leaderboards

### Data Fields
You can extend the `LeaderboardEntry` interface to include:
- Difficulty level
- Date/time of achievement
- Device type
- Game settings

## Security Rules (Firestore)

Add these rules to your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{document} {
      // Allow authenticated users to read all leaderboard entries
      allow read: if request.auth != null;
      
      // Allow authenticated users to create entries (prevent updates/deletes)
      allow create: if request.auth != null 
        && request.auth.uid != null
        && resource.data.keys().hasAll(['displayName', 'time', 'tries', 'timestamp']);
    }
  }
}
```

## Testing

Run the tests with:
```bash
ng test
```

The created test files ensure:
- Component renders correctly
- Service methods work as expected
- Error handling functions properly

## Next Steps

1. Import the LeaderboardModule in your app
2. Add the GameIntegrationService to your providers
3. Place `<app-leaderboard></app-leaderboard>` where you want to display it
4. Test with a few games to see the leaderboard populate
5. Customize styling and features as needed
