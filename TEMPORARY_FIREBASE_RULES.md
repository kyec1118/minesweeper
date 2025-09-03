# TEMPORARY - Open Firebase Rules for Testing (NOT for production!)

⚠️ **WARNING: These rules are for testing only. Do NOT use in production!**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // TEMPORARY: Allow all reads and writes for testing
    match /leaderboard/{document} {
      allow read, write: if true;
    }
    
    // Your existing rules for other collections...
  }
}
```

## After testing, change to the secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leaderboard/{document} {
      // Allow authenticated users to read
      allow read: if request.auth != null;
      
      // Allow authenticated users to create entries only
      allow create: if request.auth != null 
        && request.auth.uid != null
        && resource == null
        && request.resource.data.keys().hasAll(['displayName', 'time', 'tries', 'timestamp']);
      
      // Prevent updates and deletes
      allow update, delete: if false;
    }
  }
}
```
