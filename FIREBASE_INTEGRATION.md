# Firebase Integration for Minesweeper App

This document explains how Firebase has been integrated into your Angular Minesweeper application.

## Firebase Configuration

### Files Added/Modified:

1. **Firebase Configuration** (`src/app/firebase.config.ts`)
   - Initializes Firebase app with your configuration
   - Exports Firebase services (Auth, Firestore, Analytics)

2. **Environment Files**
   - `src/environments/environment.ts` - Development configuration
   - `src/environments/environment.prod.ts` - Production configuration

3. **Firebase Service** (`src/app/services/firebase.service.ts`)
   - Wrapper service for Firebase authentication and Firestore operations
   - Provides methods for sign in, sign up, sign out
   - Includes Firestore CRUD operations

4. **Authentication Guard** (`src/app/guards/auth.guard.ts`)
   - Protects routes that require authentication
   - Redirects to login page if user is not authenticated

5. **Login Component** (`src/app/components/login/`)
   - Provides UI for user authentication
   - Handles sign in and sign up functionality

## Features Implemented:

### Authentication
- **Sign In**: Users can log in with email/password
- **Sign Up**: New users can create accounts
- **Sign Out**: Users can log out
- **Auth Guard**: Protected routes require authentication

### Firestore Integration
- **Add Document**: Save data to Firestore collections
- **Update Document**: Modify existing documents
- **Delete Document**: Remove documents
- **Get Document**: Retrieve single documents
- **Get Collection**: Retrieve entire collections

## How to Use:

### 1. Authentication Flow
1. Visit the home page (`http://localhost:4200`)
2. Click "Login" in the top-right corner
3. Enter email and password, then click "Sign In" or "Sign Up"
4. After authentication, you'll be redirected to the Minesweeper game
5. The home page will show your email and a "Logout" button

### 2. Protected Routes
- `/minesweeper` - Requires authentication
- `/minesweeper/game` - Requires authentication
- Users are automatically redirected to `/login` if not authenticated

### 3. Using Firebase Service in Components

```typescript
import { FirebaseService } from './services/firebase.service';

constructor(private firebaseService: FirebaseService) {}

// Authentication
async signIn(email: string, password: string) {
  try {
    const user = await this.firebaseService.signIn(email, password);
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Sign in error:', error);
  }
}

// Firestore operations
async saveGameScore(score: any) {
  try {
    const docId = await this.firebaseService.addDocument('scores', score);
    console.log('Score saved with ID:', docId);
  } catch (error) {
    console.error('Error saving score:', error);
  }
}
```

### 4. Observing Authentication State

```typescript
// Subscribe to auth state changes
this.firebaseService.getCurrentUser().subscribe(user => {
  if (user) {
    console.log('User is logged in:', user.email);
  } else {
    console.log('User is logged out');
  }
});
```

## Firebase Console Setup:

1. **Authentication**: Enable Email/Password authentication in Firebase Console
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider

2. **Firestore**: Set up Firestore database
   - Go to Firestore Database
   - Create database in test/production mode
   - Set up security rules as needed

## Security Notes:

- API keys are stored in environment files
- In production, ensure proper Firestore security rules
- Consider implementing additional validation
- Monitor authentication usage in Firebase Console

## Next Steps:

1. **Game Data Storage**: Store high scores, game statistics in Firestore
2. **User Profiles**: Add user profile management
3. **Leaderboards**: Create global leaderboards using Firestore
4. **Real-time Features**: Use Firestore real-time listeners for live updates
5. **Cloud Functions**: Add server-side logic for complex operations

## Commands:

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

Your Firebase integration is now complete and ready to use!
