import confetti from 'canvas-confetti';

/**
 * Triggers a celebratory particle explosion for reaching milestones (e.g. 20th chat completed).
 */
export function triggerCelebrationConfetti() {
  const count = 180;
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 99999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Realistic multi-tier physics burst
  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors: ['#10B981', '#14B8A6', '#F59E0B', '#3B82F6', '#EC4899'],
  });
  fire(0.2, {
    spread: 65,
    colors: ['#059669', '#10B981', '#FBBF24', '#FCD34D'],
  });
  fire(0.35, {
    spread: 110,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#34D399', '#6EE7B7', '#FCD34D', '#60A5FA'],
  });
  fire(0.1, {
    spread: 130,
    startVelocity: 28,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#10B981', '#F59E0B', '#FFFFFF', '#6366F1'],
  });
  fire(0.1, {
    spread: 140,
    startVelocity: 45,
    colors: ['#10B981', '#047857', '#F59E0B', '#F43F5E'],
  });
}

/**
 * Triggers a continuous dual-cannon fireworks shower for Pro upgrade success.
 */
export function triggerProUpgradeConfetti() {
  // Instant initial centerpiece burst
  triggerCelebrationConfetti();

  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 99999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon launch
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#10B981'],
    });

    // Right cannon launch
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#10B981', '#F59E0B', '#3B82F6', '#EC4899', '#FBBF24'],
    });
  }, 220);
}
