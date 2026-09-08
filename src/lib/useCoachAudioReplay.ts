import { useEffect, useState, useCallback, useRef } from 'react';
import { coachAudioService, CoachAudioTarget, ReplayEventDetail } from './coachAudioService';

/**
 * Hook to register the most recent coach/lesson response for the 'R' keyboard shortcut.
 * Automatically clears or updates when the component unmounts or target changes.
 */
export function useCoachAudioReplay(target: CoachAudioTarget | null) {
  const [isRecentlyTriggered, setIsRecentlyTriggered] = useState(false);
  const targetRef = useRef<CoachAudioTarget | null>(target);
  targetRef.current = target;

  useEffect(() => {
    if (target) {
      coachAudioService.setTarget(target);
    }
  }, [
    target?.id,
    target?.text,
    target?.source,
    target?.options?.rate,
    target?.options?.pitch,
    target?.options?.gender,
    target?.options?.lang
  ]);

  useEffect(() => {
    const unsubscribeTrigger = coachAudioService.onTrigger((event: ReplayEventDetail) => {
      if (targetRef.current && event.target.id === targetRef.current.id) {
        setIsRecentlyTriggered(true);
        const timer = setTimeout(() => {
          setIsRecentlyTriggered(false);
        }, 1800);
        return () => clearTimeout(timer);
      }
    });

    return () => {
      unsubscribeTrigger();
    };
  }, []);

  const triggerReplay = useCallback(() => {
    return coachAudioService.triggerReplay();
  }, []);

  return {
    isRecentlyTriggered,
    triggerReplay,
    currentTarget: coachAudioService.getTarget()
  };
}
