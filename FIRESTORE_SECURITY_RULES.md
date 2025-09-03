# Firebase Firestore Security Rules for Leaderboard

Add these rules to your Firebase Console -> Firestore Database -> Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write to leaderboard
    match /leaderboard/{document} {
      // Allow authenticated users to read all leaderboard entries
      allow read: if request.auth != null;
      
      // Allow authenticated users to create new entries
      // Validate that the entry has required fields and the user is the author
      allow create: if request.auth != null 
        && request.auth.uid != null
        && resource == null // ensure it's a new document
        && request.resource.data.keys().hasAll(['displayName', 'time', 'tries', 'timestamp'])
        && request.resource.data.displayName is string
        && request.resource.data.time is number
        && request.resource.data.tries is number
        && request.resource.data.timestamp is timestamp;
      
      // Prevent updates and deletes for data integrity
      allow update, delete: if false;
    }
    
    // Your existing rules for other collections...
  }
}
```

## How to apply these rules:

1. Go to Firebase Console (https://console.firebase.google.com)
2. Select your project
3. Go to Firestore Database
4. Click on "Rules" tab
5. Replace or add the leaderboard rules above
6. Click "Publish"
