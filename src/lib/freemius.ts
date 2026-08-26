/// <reference types="vite/client" />

declare global {
  interface Window {
    FS?: {
      Checkout: {
        configure: (options: any) => any;
      };
    };
  }
}

let freemiusScriptPromise: Promise<void> | null = null;
let freemiusHandler: any = null;

export function loadFreemiusScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (window.FS?.Checkout) {
    return Promise.resolve();
  }

  if (freemiusScriptPromise) {
    return freemiusScriptPromise;
  }

  freemiusScriptPromise = new Promise<void>((resolve, reject) => {
    // Check if script element already exists
    const existing = document.querySelector('script[src*="checkout.freemius.com/checkout.min.js"]');
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.freemius.com/checkout.min.js';
    script.async = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (err) => {
      console.error('Failed to load Freemius checkout script:', err);
      reject(new Error('Failed to load Freemius checkout library.'));
    };

    document.head.appendChild(script);
  });

  return freemiusScriptPromise;
}

export interface FreemiusCheckoutOptions {
  plan_id: string;
  billing_cycle: 'monthly' | 'annual';
  trial?: boolean | string;
  trial_days?: number;
  user_email?: string;
  user_firstname?: string;
  user_lastname?: string;
  success?: (data: any) => void;
  cancel?: () => void;
  [key: string]: any;
}

export function isFreemiusConfigured(): boolean {
  const pluginId = import.meta.env.VITE_FREEMIUS_PLUGIN_ID;
  const publicKey = import.meta.env.VITE_FREEMIUS_PUBLIC_KEY;
  return Boolean(pluginId && publicKey && pluginId !== 'your_plugin_id' && publicKey !== 'your_public_key');
}

/**
 * Opens a Freemius checkout overlay
 */
export async function openFreemiusCheckout(options: FreemiusCheckoutOptions): Promise<void> {
  const pluginId = import.meta.env.VITE_FREEMIUS_PLUGIN_ID;
  const publicKey = import.meta.env.VITE_FREEMIUS_PUBLIC_KEY;

  if (!pluginId || !publicKey || pluginId === 'your_plugin_id') {
    throw new Error('VITE_FREEMIUS_PLUGIN_ID and VITE_FREEMIUS_PUBLIC_KEY are not configured yet.');
  }

  await loadFreemiusScript();

  if (!window.FS?.Checkout) {
    throw new Error('Freemius Checkout SDK failed to load.');
  }

  if (!freemiusHandler) {
    freemiusHandler = window.FS.Checkout.configure({
      plugin_id: pluginId,
      public_key: publicKey,
    });
  }

  freemiusHandler.open({
    trial: 'free',
    trial_days: options.trial_days || 3,
    ...options,
  });
}

