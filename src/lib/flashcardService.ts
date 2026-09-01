import { Flashcard, FlashcardMastery, FlashcardDeck, SavedPhrase, NativeLanguage } from '../types';
import { PRESET_FLASHCARD_DECKS, convertSavedPhrasesToFlashcards } from '../data/flashcardDecks';
import { User } from 'firebase/auth';

export interface FlashcardStats {
  totalCards: number;
  masteredCount: number;
  learningCount: number;
  newCount: number;
  reviewedTodayCount: number;
  streakDays: number;
}

function getStorageKey(user: User | null, suffix: string): string {
  const userId = user?.uid || 'guest';
  return `proenglish_flashcards_${userId}_${suffix}`;
}

export function loadMasteryMap(user: User | null): Record<string, FlashcardMastery> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(getStorageKey(user, 'mastery_map'));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveMasteryMap(user: User | null, masteryMap: Record<string, FlashcardMastery>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(user, 'mastery_map'), JSON.stringify(masteryMap));
  } catch (e) {
    console.error('Failed to save flashcard mastery map:', e);
  }
}

export function loadCustomFlashcards(user: User | null): Flashcard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getStorageKey(user, 'custom_cards'));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomFlashcards(user: User | null, cards: Flashcard[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(user, 'custom_cards'), JSON.stringify(cards));
  } catch (e) {
    console.error('Failed to save custom flashcards:', e);
  }
}

export function loadReviewStats(user: User | null): { reviewedTodayCount: number; lastReviewDate: string; streakDays: number } {
  if (typeof window === 'undefined') {
    return { reviewedTodayCount: 0, lastReviewDate: '', streakDays: 1 };
  }
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(getStorageKey(user, 'review_stats'));
    if (!raw) return { reviewedTodayCount: 0, lastReviewDate: today, streakDays: 1 };

    const data = JSON.parse(raw);
    if (data.lastReviewDate === today) {
      return data;
    }
    // New day
    const lastDate = new Date(data.lastReviewDate);
    const currDate = new Date(today);
    const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

    return {
      reviewedTodayCount: 0,
      lastReviewDate: today,
      streakDays: diffDays === 1 ? (data.streakDays || 1) + 1 : 1,
    };
  } catch {
    return { reviewedTodayCount: 0, lastReviewDate: '', streakDays: 1 };
  }
}

export function incrementReviewedCount(user: User | null): void {
  if (typeof window === 'undefined') return;
  try {
    const stats = loadReviewStats(user);
    const today = new Date().toISOString().split('T')[0];
    const updated = {
      reviewedTodayCount: stats.reviewedTodayCount + 1,
      lastReviewDate: today,
      streakDays: stats.streakDays || 1,
    };
    localStorage.setItem(getStorageKey(user, 'review_stats'), JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update review stats:', e);
  }
}

export function loadQuizMistakes(user: User | null): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getStorageKey(user, 'quiz_mistakes'));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveQuizMistakes(user: User | null, mistakeCardIds: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(user, 'quiz_mistakes'), JSON.stringify(mistakeCardIds));
  } catch (e) {
    console.error('Failed to save quiz mistakes:', e);
  }
}

export function recordQuizMistake(user: User | null, cardId: string): string[] {
  const current = loadQuizMistakes(user);
  if (!current.includes(cardId)) {
    const updated = [...current, cardId];
    saveQuizMistakes(user, updated);
    return updated;
  }
  return current;
}

export function removeQuizMistake(user: User | null, cardId: string): string[] {
  const current = loadQuizMistakes(user);
  const updated = current.filter((id) => id !== cardId);
  saveQuizMistakes(user, updated);
  return updated;
}

/**
 * Combines preset decks, saved vault cards, and custom cards into a unified deck list with accurate mastery states.
 */
export function getAllDecks(
  user: User | null,
  savedPhrases: SavedPhrase[],
  masteryMap: Record<string, FlashcardMastery>,
  customCards: Flashcard[]
): FlashcardDeck[] {
  const decks: FlashcardDeck[] = [];

  // 1. Saved Vault Deck (if user has saved phrases)
  const vaultCards = convertSavedPhrasesToFlashcards(savedPhrases).map((card) => ({
    ...card,
    mastery: masteryMap[card.id] || 'new',
  }));

  if (vaultCards.length > 0) {
    decks.push({
      id: 'saved-vault',
      title: 'My Saved Phrase Vault',
      description: 'Review and master phrases you saved during your live AI coaching sessions.',
      category: 'Personal Vault',
      icon: 'Bookmark',
      badgeColor: 'amber',
      cards: vaultCards,
    });
  }

  // 2. Custom Cards Deck (if any custom cards created)
  if (customCards.length > 0) {
    const userCards = customCards.map((card) => ({
      ...card,
      mastery: masteryMap[card.id] || 'new',
    }));
    decks.push({
      id: 'custom-deck',
      title: 'My Custom Flashcards',
      description: 'Personalized flashcards you created for your specific workplace needs.',
      category: 'Custom Deck',
      icon: 'PenTool',
      badgeColor: 'teal',
      cards: userCards,
    });
  }

  // 3. Preset Curated Decks
  PRESET_FLASHCARD_DECKS.forEach((preset) => {
    const populatedCards = preset.cards.map((card) => ({
      ...card,
      mastery: masteryMap[card.id] || 'new',
    }));
    decks.push({
      ...preset,
      cards: populatedCards,
    });
  });

  return decks;
}
