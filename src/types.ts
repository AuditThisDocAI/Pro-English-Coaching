export type Mode = 'general' | 'email' | 'interview' | 'cv';

export type JobType = 'Tech' | 'Healthcare' | 'Retail' | 'Call Center' | 'Admin';

export type NativeLanguage = 
  | 'Spanish' 
  | 'Portuguese' 
  | 'French' 
  | 'German' 
  | 'Hindi' 
  | 'Mandarin' 
  | 'Japanese' 
  | 'Korean' 
  | 'Arabic' 
  | 'Vietnamese' 
  | 'Tagalog' 
  | 'Italian' 
  | 'Russian' 
  | 'Turkish' 
  | 'Polish' 
  | 'Indonesian';

export const SUPPORTED_LANGUAGES: { name: NativeLanguage; label: string; flag: string }[] = [
  { name: 'Spanish', label: 'Español (Spanish)', flag: '🇪🇸' },
  { name: 'Portuguese', label: 'Português (Portuguese)', flag: '🇧🇷' },
  { name: 'French', label: 'Français (French)', flag: '🇫🇷' },
  { name: 'German', label: 'Deutsch (German)', flag: '🇩🇪' },
  { name: 'Hindi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { name: 'Mandarin', label: '中文 (Mandarin)', flag: '🇨🇳' },
  { name: 'Japanese', label: '日本語 (Japanese)', flag: '🇯🇵' },
  { name: 'Korean', label: '한국어 (Korean)', flag: '🇰🇷' },
  { name: 'Arabic', label: 'العربية (Arabic)', flag: '🇸🇦' },
  { name: 'Vietnamese', label: 'Tiếng Việt (Vietnamese)', flag: '🇻🇳' },
  { name: 'Tagalog', label: 'Filipino / Tagalog', flag: '🇵🇭' },
  { name: 'Italian', label: 'Italiano (Italian)', flag: '🇮🇹' },
  { name: 'Russian', label: 'Русский (Russian)', flag: '🇷🇺' },
  { name: 'Turkish', label: 'Türkçe (Turkish)', flag: '🇹🇷' },
  { name: 'Polish', label: 'Polski (Polish)', flag: '🇵🇱' },
  { name: 'Indonesian', label: 'Bahasa Indonesia', flag: '🇮🇩' },
];

export interface CoachResponse {
  original: string;
  professional: string;
  translation: string;
  why: string;
  practice: string;
}

export interface Message {
  id: string;
  type: 'user' | 'coach' | 'error';
  content?: string;
  coachData?: CoachResponse;
}

export interface SavedPhrase {
  id: string;
  userId: string;
  mode?: string;
  jobType?: string;
  original: string;
  professional: string;
  translation?: string;
  why?: string;
  practice?: string;
  createdAt: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName?: string;
  preferredJobType?: string;
  createdAt: string;
  updatedAt: string;
}

export type FlashcardMastery = 'new' | 'learning' | 'mastered';

export interface Flashcard {
  id: string;
  deckId?: string;
  category: string;
  front: string; // The casual thought, prompt, or scenario
  frontContext?: string; // E.g. "Polite Pushback", "Interview Answer", "Email Sign-off"
  backProfessional: string; // Polished executive English
  backWhy: string; // Linguistic reasoning & executive etiquette
  backTranslation?: Record<string, string> | string;
  backPractice?: string; // Follow-up drill
  mastery?: FlashcardMastery;
  reviewCount?: number;
  lastReviewedAt?: string;
  isCustom?: boolean;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  badgeColor: string;
  cards: Flashcard[];
}

