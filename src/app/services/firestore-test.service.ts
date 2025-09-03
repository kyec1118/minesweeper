import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirestoreTestService {

  async testConnection(): Promise<boolean> {
    try {
      console.log('🧪 Testing Firestore connection...');
      console.log('🔥 Firestore instance:', firestore);
      console.log('📊 Project ID:', firestore.app.options.projectId);
      
      // Try to access a simple collection
      const testCollection = collection(firestore, 'test');
      console.log('📁 Test collection reference created');
      
      // Try to read from it (will work even if empty)
      const snapshot = await getDocs(testCollection);
      console.log('✅ Firestore connection successful!');
      console.log('📄 Test collection size:', snapshot.size);
      
      return true;
    } catch (error) {
      console.error('❌ Firestore connection failed:', error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: (error as any)?.code,
        details: (error as any)?.details
      });
      return false;
    }
  }
}
