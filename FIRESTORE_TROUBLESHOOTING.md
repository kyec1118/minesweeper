# Firestore Connection Troubleshooting Guide

## 🔍 Diagnostic Steps

### 1. Check Browser Console
Open your browser's Developer Tools (F12) and look for:

**✅ Expected Success Messages:**
```
🧪 Testing Firestore connection...
🔥 Firestore instance: [object Object]
📊 Project ID: mine-logic
📁 Test collection reference created
✅ Firestore connection successful!
🚀 Initializing leaderboard collection...
✅ Leaderboard collection initialized successfully
```

**❌ Common Error Messages:**
- `Firebase: Error (auth/network-request-failed)` - Network connectivity issue
- `Missing or insufficient permissions` - Firestore security rules issue
- `Firebase: Error (auth/invalid-api-key)` - Invalid API key in environment
- `Firebase: Error (auth/project-not-found)` - Wrong project ID

### 2. Verify Firebase Configuration

Check that your Firebase project is active:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select project: `mine-logic`
3. Verify project is not suspended/deleted

### 3. Check Security Rules

Your current rules should be:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Network Issues

If you see network errors:
- Check internet connection
- Try different browser
- Disable ad blockers/VPN
- Check firewall settings

### 5. Authentication Issues

Make sure you're logged in:
1. Go to login page first
2. Sign in with your account
3. Then navigate to minesweeper

## 🚀 Quick Fixes

### Fix 1: Restart Browser
Sometimes Firebase connections get stuck - restart your browser.

### Fix 2: Clear Browser Cache
Clear your browser's cache and local storage.

### Fix 3: Check Firebase Billing
Make sure your Firebase project has billing enabled (free tier is fine).

### Fix 4: Regenerate API Key
If API key is invalid:
1. Go to Firebase Console → Project Settings → General
2. Your apps → Web app → Config
3. Copy new configuration to `environment.ts`

## 📞 Next Steps

1. **Run the app** and check browser console for the diagnostic messages
2. **Copy any error messages** you see
3. **Let me know what specific errors appear** so I can help fix them

The diagnostic code I added will help identify exactly what's wrong with the Firestore connection!
