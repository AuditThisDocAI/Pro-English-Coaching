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
  userId?: string;
  mode?: string;
  jobType?: string;
  original: string;
  professional: string;
  translation?: string;
  why?: string;
  practice?: string;
  createdAt?: string;
  timestamp?: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName?: string;
  preferredJobType?: string;
  nativeLanguage?: string;
  jobType?: string;
  isPro?: boolean;
  trialStartDate?: string;
  englishLevel?: EnglishCEFRLevel;
  learningGoal?: EnglishGoal;
  dailyGoalMinutes?: number;
  onboardingCompleted?: boolean;
  xpPoints?: number;
  streakDays?: number;
  lastActiveDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type EnglishCEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface CEFRLevelInfo {
  level: EnglishCEFRLevel;
  title: string;
  subtitle: string;
  description: string;
  badgeColor: string;
}

export type EnglishGoal = 
  | 'workplace_formal'
  | 'interview_career'
  | 'daily_polite'
  | 'grammar_etiquette';

export interface RoleplayObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface RoleplayScenario {
  id: string;
  title: string;
  category: 'workplace' | 'interview' | 'daily_formal';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  partnerName: string;
  partnerRole: string;
  partnerAvatar: string;
  partnerGender?: 'female' | 'male';
  description: string;
  initialMessage: string;
  objectives: RoleplayObjective[];
  starterSuggestions: string[];
}

export interface ChatTutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  translation?: string;
  formalCorrection?: {
    original: string;
    formalAlternative: string;
    why: string;
    grammarTag?: string;
  };
  suggestions?: string[];
  audioPlaying?: boolean;
  timestamp: string;
}

export type FlashcardMastery = 'new' | 'learning' | 'mastered';

export interface FlashcardOption {
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Flashcard {
  id: string;
  deckId?: string;
  category: string;
  front: string; // The casual thought, question, or scenario prompt
  frontContext?: string; // E.g. "Polite Pushback", "Interview Answer", "Manager Update"
  backProfessional: string; // Polished executive / professional English
  backWhy: string; // Linguistic reasoning & executive etiquette
  backTranslation?: Record<string, string> | string;
  backPractice?: string; // Follow-up drill or conversational prompt
  options?: FlashcardOption[]; // Structured multiple choice options (A, B, C)
  grammarNote?: string; // Educational grammar/etiquette booster
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  tier?: 'free' | 'pro'; // Free trial (20 cards) vs Pro (100+ cards)
  mastery?: FlashcardMastery;
  reviewCount?: number;
  lastReviewedAt?: string;
  isCustom?: boolean;
}

export interface QuizHistoryEntry {
  id: string;
  deckId: string;
  deckTitle: string;
  score: number;
  total: number;
  date: string;
  mistakeCardIds?: string[];
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

