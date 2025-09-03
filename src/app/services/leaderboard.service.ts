import { Injectable } from '@angular/core';
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    Timestamp,
    where
} from 'firebase/firestore';
import { take } from 'rxjs/operators';
import { firestore } from '../firebase.config';
import { FirebaseService } from './firebase.service';

export interface LeaderboardEntry {
  displayName: string;
  time: number;
  tries: number;
  difficulty: string; // 'EASY', 'MEDIUM', 'HARD'
  timestamp?: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private collectionName = 'leaderboard';

  constructor(private firebaseService: FirebaseService) {}

  async addEntry(entry: LeaderboardEntry): Promise<void> {
    try {
      // Check if user is authenticated
      const currentUser = await this.firebaseService.getCurrentUser().pipe(take(1)).toPromise();
      if (!currentUser) {
        throw new Error('User must be authenticated to add leaderboard entries');
      }

      // Validate difficulty
      const validDifficulties = ['EASY', 'MEDIUM', 'HARD'];
      if (!validDifficulties.includes(entry.difficulty)) {
        throw new Error('Invalid difficulty level');
      }

      const entryWithTimestamp = {
        ...entry,
        timestamp: Timestamp.now()
      };
      
      await addDoc(collection(firestore, this.collectionName), entryWithTimestamp);
      console.log('Leaderboard entry added successfully');
    } catch (error) {
      console.error('Error adding leaderboard entry:', error);
      if (error instanceof Error && error.message.includes('permissions')) {
        throw new Error('Permission denied: Please check your Firebase security rules for the leaderboard collection');
      }
      throw error;
    }
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      // Check if user is authenticated
      const currentUser = await this.firebaseService.getCurrentUser().pipe(take(1)).toPromise();
      if (!currentUser) {
        console.log('User not authenticated, returning empty leaderboard');
        return [];
      }

      const q = query(
        collection(firestore, this.collectionName),
        orderBy('time', 'asc')
        // Note: Secondary sort by tries removed to avoid needing composite index
        // You can add it back after creating the index in Firebase Console
      );
      
      const querySnapshot = await getDocs(q);
      const leaderboardData: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        leaderboardData.push(doc.data() as LeaderboardEntry);
      });
      
      return leaderboardData;
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      if (error instanceof Error && error.message.includes('permissions')) {
        throw new Error('Permission denied: Please check your Firebase security rules for the leaderboard collection');
      }
      throw error;
    }
  }

  async getTopEntries(limit: number = 10): Promise<LeaderboardEntry[]> {
    const allEntries = await this.getLeaderboard();
    return allEntries.slice(0, limit);
  }

  async getLeaderboardByDifficulty(difficulty: string): Promise<LeaderboardEntry[]> {
    try {
      // Check if user is authenticated
      const currentUser = await this.firebaseService.getCurrentUser().pipe(take(1)).toPromise();
      if (!currentUser) {
        console.log('User not authenticated, returning empty leaderboard');
        return [];
      }

      // This query will require a composite index: difficulty (asc), time (asc)
      // Firebase will show an error with a link to create it automatically
      const q = query(
        collection(firestore, this.collectionName),
        where('difficulty', '==', difficulty),
        orderBy('time', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      const leaderboardData: LeaderboardEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        leaderboardData.push(doc.data() as LeaderboardEntry);
      });
      
      return leaderboardData;
    } catch (error) {
      console.error('Error loading leaderboard by difficulty:', error);
      throw error;
    }
  }

  /**
   * Initialize the leaderboard collection (creates it if it doesn't exist)
   * This method does nothing but ensures the collection reference exists
   */
  async initializeLeaderboard(): Promise<void> {
    try {
      // Just query the collection - this will create the reference
      const q = query(collection(firestore, this.collectionName));
      await getDocs(q);
      console.log('Leaderboard collection initialized');
    } catch (error) {
      console.error('Error initializing leaderboard:', error);
    }
  }
}
