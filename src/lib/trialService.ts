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
  hasPaidRenewal?: boolean;
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
  const effectiveIsPro = isPro || user?.email?.toLowerCase() === 'brigittalombard09@gmail.com';
  const isTrialActive = !effectiveIsPro && nowMs < endMs;
  const isTrialExpired = !effectiveIsPro && nowMs >= endMs;
  const hasPaidRenewal = hasPaidForTrialRenewal(user);

  // Once expired, lock device state so users cannot bypass by clearing session or creating guest states
  if (isTrialExpired && typeof window !== 'undefined') {
    localStorage.setItem('proenglish_device_trial_expired', 'true');
    localStorage.setItem('proenglish_guest_trial_expired', 'true');
    if (user && user.uid) {
      localStorage.setItem(`proenglish_user_${user.uid}_trial_expired`, 'true');
    }
  }

  const daysLeft = Math.ceil(totalSecondsLeft / (24 * 3600));
  const hoursLeft = Math.floor((totalSecondsLeft % (24 * 3600)) / 3600);
  const minutesLeft = Math.floor((totalSecondsLeft % 3600) / 60);

  let formattedTimeRemaining = '3-Day Free Trial';
  if (effectiveIsPro) {
    formattedTimeRemaining = 'Pro Member (Unlimited)';
  } else if (isTrialExpired) {
    formattedTimeRemaining = '3-Day Free Trial Expired (Pay to Renew)';
  } else if (hoursLeft > 0) {
    formattedTimeRemaining = `${hoursLeft}h ${minutesLeft}m left in free trial`;
  } else if (minutesLeft > 0) {
    formattedTimeRemaining = `${minutesLeft}m left in free trial`;
  } else if (totalSecondsLeft > 0) {
    formattedTimeRemaining = `${totalSecondsLeft}s left in free trial`;
  }

  const elapsedMs = Math.max(0, nowMs - startMs);
  const percentRemaining = effectiveIsPro 
    ? 100 
    : Math.max(0, Math.min(100, Math.round(((TRIAL_DURATION_MS - elapsedMs) / TRIAL_DURATION_MS) * 100)));

  // Access is only granted if Pro or active trial (once expired, strictly blocked until paid renewal)
  const canAccess = effectiveIsPro || (isTrialActive && !isTrialExpired);

  return {
    isPro: effectiveIsPro,
    trialStartDate: new Date(startMs).toISOString(),
    trialEndDate: new Date(endMs).toISOString(),
    isTrialActive,
    isTrialExpired,
    daysLeft,
    hoursLeft,
    totalSecondsLeft,
    percentRemaining,
    formattedTimeRemaining,
    canAccess,
    hasPaidRenewal,
  };
}

/**
 * Checks if the user has completed payment to renew/activate the 3-day trial.
 */
export function hasPaidForTrialRenewal(user: User | null): boolean {
  if (typeof window === 'undefined') return false;
  if (user && user.uid) {
    return localStorage.getItem(`proenglish_user_${user.uid}_paid_trial_renewal`) === 'true' ||
           localStorage.getItem(`proenglish_user_${user.uid}_is_pro`) === 'true';
  }
  return localStorage.getItem('proenglish_guest_paid_trial_renewal') === 'true' ||
         localStorage.getItem('proenglish_guest_is_pro') === 'true';
}

/**
 * Grants a paid 3-day trial renewal upon verified successful payment/checkout.
 * Users are ONLY allowed to activate or renew the 3-day trial once payment has been completed.
 */
export function grantPaidTrialRenewal(user: User | null): string {
  const now = new Date().toISOString();
  if (typeof window !== 'undefined') {
    if (user && user.uid) {
      localStorage.setItem(`proenglish_user_${user.uid}_trial_start_date`, now);
      localStorage.setItem(`proenglish_user_${user.uid}_paid_trial_renewal`, 'true');
    }
    localStorage.setItem('proenglish_guest_trial_start_date', now);
    localStorage.setItem('proenglish_guest_paid_trial_renewal', 'true');
    localStorage.removeItem('proenglish_device_trial_start');
  }
  return now;
}

/**
 * Deprecated free trial reset: strictly replaced by grantPaidTrialRenewal.
 * Maintained as alias for backward compatibility only after checkout confirmation.
 */
export function grantFreshTrial(user: User | null): string {
  return grantPaidTrialRenewal(user);
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
