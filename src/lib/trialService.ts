import { User } from 'firebase/auth';

export const TRIAL_DURATION_DAYS = 1;
export const TRIAL_DURATION_MS = TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000; // 1 day (24 hours)

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
 * Prevents device fallbacks from backdating newly registered user accounts.
 */
export function getUserTrialStartDate(user: User | null, remoteStartDate?: string | null): string {
  const now = new Date().toISOString();

  // For Authenticated Users
  if (user && user.uid) {
    const userKey = `proenglish_user_${user.uid}_trial_start_date`;
    const creationTime = user.metadata?.creationTime 
      ? new Date(user.metadata.creationTime).toISOString() 
      : null;

    // 1. Remote Firestore Profile Start Date
    if (remoteStartDate) {
      // If remote date was accidentally backdated prior to account registration, honor creationTime
      if (creationTime && new Date(remoteStartDate).getTime() < new Date(creationTime).getTime()) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(userKey, creationTime);
        }
        return creationTime;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem(userKey, remoteStartDate);
      }
      return remoteStartDate;
    }

    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem(userKey);
      if (existing) {
        // Guard against any corrupted/backdated timestamp older than account creation
        if (creationTime && new Date(existing).getTime() < new Date(creationTime).getTime()) {
          localStorage.setItem(userKey, creationTime);
          return creationTime;
        }
        return existing;
      }

      // Brand new user registration: Trial starts at account creation time or right now!
      const initialTrial = creationTime || now;
      localStorage.setItem(userKey, initialTrial);
      return initialTrial;
    }

    return creationTime || now;
  }

  // For Guest / Anonymous Visitors
  if (typeof window !== 'undefined') {
    const guestKey = 'proenglish_guest_trial_start_date';
    const existingGuest = localStorage.getItem(guestKey);
    if (existingGuest) {
      return existingGuest;
    }

    localStorage.setItem(guestKey, now);
    return now;
  }

  return now;
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

  let formattedTimeRemaining = '1-Day Free Trial';
  if (isPro) {
    formattedTimeRemaining = 'Pro Member (Unlimited)';
  } else if (isTrialExpired) {
    formattedTimeRemaining = '1-Day Free Trial Expired';
  } else if (hoursLeft > 0) {
    formattedTimeRemaining = `${hoursLeft}h ${minutesLeft}m left in free trial`;
  } else if (minutesLeft > 0) {
    formattedTimeRemaining = `${minutesLeft}m left in free trial`;
  } else if (totalSecondsLeft > 0) {
    formattedTimeRemaining = `${totalSecondsLeft}s left in free trial`;
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
 * Grants a fresh 1-day trial period, clearing any stale expired flags.
 */
export function grantFreshTrial(user: User | null): string {
  const now = new Date().toISOString();
  if (typeof window !== 'undefined') {
    if (user && user.uid) {
      localStorage.setItem(`proenglish_user_${user.uid}_trial_start_date`, now);
    }
    localStorage.setItem('proenglish_guest_trial_start_date', now);
    localStorage.removeItem('proenglish_device_trial_start');
  }
  return now;
}

/**
 * Resets the 1-day trial for testing/demonstration purposes.
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
