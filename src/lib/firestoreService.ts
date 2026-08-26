import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { SavedPhrase, CoachResponse } from '../types';

export async function getUserProfile(userId: string) {
  if (!userId) return null;
  const path = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    const snap = await getDoc(userDocRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

export async function syncUserProfile(userId: string, data: {
  email?: string | null;
  displayName?: string | null;
  nativeLanguage?: string;
  jobType?: string;
  isPro?: boolean;
  chatCount?: number;
}) {
  if (!userId) return;
  const path = `users/${userId}`;
  try {
    const userDocRef = doc(db, 'users', userId);
    const payload: Record<string, any> = {
      userId,
      email: data.email || '',
      displayName: data.displayName || '',
      updatedAt: new Date().toISOString(),
    };
    if (data.nativeLanguage !== undefined) payload.nativeLanguage = data.nativeLanguage;
    if (data.jobType !== undefined) payload.jobType = data.jobType;
    if (data.isPro !== undefined) payload.isPro = data.isPro;
    if (data.chatCount !== undefined) payload.chatCount = data.chatCount;

    await setDoc(userDocRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function savePhraseToFirestore(
  userId: string, 
  phrase: CoachResponse & { mode: string; jobType: string }
): Promise<SavedPhrase> {
  const phraseId = `phrase_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const path = `users/${userId}/saved_phrases/${phraseId}`;
  
  const newPhrase: SavedPhrase = {
    id: phraseId,
    userId,
    mode: phrase.mode,
    jobType: phrase.jobType,
    original: phrase.original,
    professional: phrase.professional,
    translation: phrase.translation,
    why: phrase.why,
    practice: phrase.practice,
    createdAt: new Date().toISOString(),
  };

  try {
    const phraseDocRef = doc(db, 'users', userId, 'saved_phrases', phraseId);
    await setDoc(phraseDocRef, newPhrase);
    return newPhrase;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deletePhraseFromFirestore(userId: string, phraseId: string): Promise<void> {
  const path = `users/${userId}/saved_phrases/${phraseId}`;
  try {
    const phraseDocRef = doc(db, 'users', userId, 'saved_phrases', phraseId);
    await deleteDoc(phraseDocRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeToSavedPhrases(
  userId: string, 
  onPhrases: (phrases: SavedPhrase[]) => void
): () => void {
  if (!userId) return () => {};
  const path = `users/${userId}/saved_phrases`;
  try {
    const colRef = collection(db, 'users', userId, 'saved_phrases');
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const phrases: SavedPhrase[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as SavedPhrase;
          phrases.push({ ...data, id: docSnap.id });
        });
        // Sort descending by creation
        phrases.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        onPhrases(phrases);
      },
      (error) => {
        console.warn('Firestore snapshot listener event error:', error?.message || error);
        try {
          handleFirestoreError(error, OperationType.GET, path);
        } catch {
          // Handled
        }
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn('Error initiating saved phrases subscription:', error);
    try {
      handleFirestoreError(error, OperationType.GET, path);
    } catch {
      // Handled
    }
    return () => {};
  }
}
