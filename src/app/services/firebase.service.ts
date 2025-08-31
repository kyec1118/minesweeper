import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { auth, firestore } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private auth: Auth = auth;
  private firestore: Firestore = firestore;
  private currentUserSubject = new BehaviorSubject<User | null | undefined>(undefined);
  private authInitialized = false;

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      // Set persistence to local (survives browser restarts)
      await setPersistence(this.auth, browserLocalPersistence);
      
      // Listen to auth state changes
      onAuthStateChanged(this.auth, (user) => {
        console.log('Auth state changed:', user?.email || 'No user');
        this.currentUserSubject.next(user);
        this.authInitialized = true;
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.authInitialized = true;
    }
  }

  // Get current user as Observable
  getCurrentUser(): Observable<User | null | undefined> {
    return this.currentUserSubject.asObservable();
  }

  // Get current user synchronously (use carefully)
  getCurrentUserSync(): User | null | undefined {
    return this.currentUserSubject.value;
  }

  // Check if auth is initialized
  isAuthInitialized(): boolean {
    return this.authInitialized;
  }

  // Auth methods
  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      return userCredential.user;
    } catch (error) {
      console.error('Google sign in error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signUp(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  // Firestore methods
  async addDocument(collectionName: string, data: any) {
    try {
      const docRef = await addDoc(collection(this.firestore, collectionName), data);
      return docRef.id;
    } catch (error) {
      console.error('Add document error:', error);
      throw error;
    }
  }

  async updateDocument(collectionName: string, docId: string, data: any) {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Update document error:', error);
      throw error;
    }
  }

  async deleteDocument(collectionName: string, docId: string) {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Delete document error:', error);
      throw error;
    }
  }

  async getDocument(collectionName: string, docId: string) {
    try {
      const docRef = doc(this.firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Get document error:', error);
      throw error;
    }
  }

  async getCollection(collectionName: string) {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, collectionName));
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      console.error('Get collection error:', error);
      throw error;
    }
  }
}
