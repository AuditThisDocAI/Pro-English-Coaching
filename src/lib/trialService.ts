import { User } from 'firebase/auth';

export const TRIAL_DURATION_DAYS = 3;
export const TRIAL_DURATION_MS = TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000; // 3 days (72 hours)

export interface TrialInfo {
  isPro: boolean;
  trialStartDate: string;
  trialEndDate: string;
  isTrialActive: boolean;
  isTrialExpired: boolean;
  daysLeft: number;
  hoursLeft: number;
  totalSecondsLeft: number;
  percentRemaining: number;
  formattedTimeRemaining: string;
  canAccess: boolean;
}

function getStorageKey(user: User | null, key: string): string {
  if (user && user.uid) {
    return `proenglish_user_${user.uid}_${key}`;
  }
  return `proenglish_guest_${key}`;
}

/**
 * Retrieves the stored trial start timestamp or initializes one if none exists.
 * Persists across user sessions, device storage, and Firestore accounts.
 */
export function getUserTrialStartDate(user: User | null, remoteStartDate?: string | null): string {
  if (remoteStartDate) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(getStorageKey(user, 'trial_start_date'), remoteStartDate);
      localStorage.setItem('proenglish_device_trial_start', remoteStartDate);
    }
    return remoteStartDate;
  }

  if (typeof window !== 'undefined') {
    const key = getStorageKey(user, 'trial_start_date');
    const existing = localStorage.getItem(key);
    if (existing) {
      return existing;
    }
    // Check device fallback if user just signed in or switched auth state
    const deviceFallback = localStorage.getItem('proenglish_device_trial_start');
    if (deviceFallback) {
      localStorage.setItem(key, deviceFallback);
      return deviceFallback;
    }
    const guestFallback = localStorage.getItem('proenglish_guest_trial_start_date');
    if (guestFallback) {
      localStorage.setItem(key, guestFallback);
      return guestFallback;
    }

    const now = new Date().toISOString();
    localStorage.setItem(key, now);
    localStorage.setItem('proenglish_device_trial_start', now);
    localStorage.setItem('proenglish_guest_trial_start_date', now);
    return now;
  }

  return new Date().toISOString();
}

/**
 * Calculates current trial progress and state with millisecond precision.
 */
export function calculateTrialInfo(
  user: User | null,
  isPro: boolean,
  customStartDate?: string | null,
  nowMsOverride?: number
): TrialInfo {
  const startDateStr = customStartDate || getUserTrialStartDate(user);
  let startMs = new Date(startDateStr).getTime();
  if (isNaN(startMs) || startMs <= 0) {
    startMs = Date.now();
  }

  const nowMs = typeof nowMsOverride === 'number' ? nowMsOverride : Date.now();
  
  // Guard against future dates
  if (startMs > nowMs) {
    startMs = nowMs;
  }

  const endMs = startMs + TRIAL_DURATION_MS;
  const totalSecondsLeft = Math.max(0, Math.floor((endMs - nowMs) / 1000));
  const isTrialActive = !isPro && nowMs < endMs;
  const isTrialExpired = !isPro && nowMs >= endMs;

  const daysLeft = Math.ceil(totalSecondsLeft / (24 * 3600));
  const hoursLeft = Math.floor((totalSecondsLeft % (24 * 3600)) / 3600);
  const minutesLeft = Math.floor((totalSecondsLeft % 3600) / 60);

  let formattedTimeRemaining = '3-Day Free Trial';
  if (isPro) {
    formattedTimeRemaining = 'Pro Member (Unlimited)';
  } else if (isTrialExpired) {
    formattedTimeRemaining = '3-Day Free Trial Expired';
  } else if (daysLeft > 1) {
    formattedTimeRemaining = `${daysLeft} days left in free trial`;
  } else if (daysLeft === 1 && hoursLeft > 0) {
    formattedTimeRemaining = `${hoursLeft}h ${minutesLeft}m left in free trial`;
  } else if (totalSecondsLeft > 0) {
    formattedTimeRemaining = `${minutesLeft}m left in free trial`;
  }

  const elapsedMs = Math.max(0, nowMs - startMs);
  const percentRemaining = isPro 
    ? 100 
    : Math.max(0, Math.min(100, Math.round(((TRIAL_DURATION_MS - elapsedMs) / TRIAL_DURATION_MS) * 100)));

  return {
    isPro,
    trialStartDate: new Date(startMs).toISOString(),
    trialEndDate: new Date(endMs).toISOString(),
    isTrialActive,
    isTrialExpired,
    daysLeft,
    hoursLeft,
    totalSecondsLeft,
    percentRemaining,
    formattedTimeRemaining,
    canAccess: isPro || isTrialActive,
  };
}

/**
 * Resets the 3-day trial for testing/demonstration purposes.
 */
export function resetTrialForTesting(user: User | null): string {
  const now = new Date().toISOString();
  if (typeof window !== 'undefined') {
    const key = getStorageKey(user, 'trial_start_date');
    localStorage.setItem(key, now);
    localStorage.setItem('proenglish_guest_trial_start_date', now);
    localStorage.setItem('proenglish_device_trial_start', now);
  }
  return now;
}

/**
 * Simulates trial expiration for testing/demonstration purposes.
 */
export function expireTrialForTesting(user: User | null): string {
  const past = new Date(Date.now() - (TRIAL_DURATION_MS + 3600000)).toISOString();
  if (typeof window !== 'undefined') {
    const key = getStorageKey(user, 'trial_start_date');
    localStorage.setItem(key, past);
    localStorage.setItem('proenglish_guest_trial_start_date', past);
    localStorage.setItem('proenglish_device_trial_start', past);
  }
  return past;
}
