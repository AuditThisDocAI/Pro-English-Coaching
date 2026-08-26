import { db } from './index.ts';
import { savedPhrases, users } from './schema.ts';
import { eq, desc, and } from 'drizzle-orm';
import { getOrCreateUser } from './users.ts';

export interface CreatePhraseInput {
  userUid: string;
  userEmail: string;
  userDisplayName?: string;
  original: string;
  professional: string;
  translation?: string;
  why?: string;
  practice?: string;
  mode?: string;
  jobType?: string;
}

export async function createSavedPhrase(input: CreatePhraseInput) {
  try {
    const user = await getOrCreateUser(input.userUid, input.userEmail, input.userDisplayName);
    
    const result = await db
      .insert(savedPhrases)
      .values({
        userId: user.id,
        userUid: input.userUid,
        original: input.original,
        professional: input.professional,
        translation: input.translation || null,
        why: input.why || null,
        practice: input.practice || null,
        mode: input.mode || null,
        jobType: input.jobType || null,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Failed to create saved phrase:', error);
    throw new Error('Failed to save phrase to database.', { cause: error });
  }
}

export async function getSavedPhrasesByUserUid(userUid: string) {
  try {
    return await db
      .select()
      .from(savedPhrases)
      .where(eq(savedPhrases.userUid, userUid))
      .orderBy(desc(savedPhrases.createdAt));
  } catch (error) {
    console.error('Failed to get saved phrases:', error);
    throw new Error('Failed to retrieve phrases from database.', { cause: error });
  }
}

export async function deleteSavedPhraseById(id: number, userUid: string) {
  try {
    const result = await db
      .delete(savedPhrases)
      .where(and(eq(savedPhrases.id, id), eq(savedPhrases.userUid, userUid)))
      .returning();

    return result[0] || null;
  } catch (error) {
    console.error('Failed to delete saved phrase:', error);
    throw new Error('Failed to delete phrase from database.', { cause: error });
  }
}
