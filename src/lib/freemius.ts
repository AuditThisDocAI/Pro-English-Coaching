/// <reference types="vite/client" />
import { Checkout } from '@freemius/checkout';

export interface FreemiusCheckoutLaunchOptions {
  plan_id: string | number;
  billing_cycle?: 'monthly' | 'annual' | 'lifetime';
  trial?: boolean | 'free' | 'paid';
  user_email?: string;
  user_firstname?: string;
  user_lastname?: string;
  success?: (data?: any) => void;
  purchaseCompleted?: (data?: any) => void;
  cancel?: () => void;
  afterOpen?: () => void;
  afterClose?: () => void;
  [key: string]: any;
}

export interface FreemiusConfigValidation {
  isValid: boolean;
  missing: string[];
  config: {
    pluginId: string;
    planProId: string;
    publicKey: string;
  };
}

/**
 * Validates required Freemius environment variables.
 * Does not expose any secret keys.
 */
export function validateFreemiusConfig(): FreemiusConfigValidation {
  const pluginId = (import.meta.env.VITE_FREEMIUS_PLUGIN_ID || '33243').trim();
  const planProId = (import.meta.env.VITE_FREEMIUS_PLAN_PRO || '62979').trim();
  const publicKey = (import.meta.env.VITE_FREEMIUS_PUBLIC_KEY || 'pk_8999e34244161ab7d48b3f436630b').trim();

  const missing: string[] = [];
  if (!pluginId) missing.push('VITE_FREEMIUS_PLUGIN_ID');
  if (!planProId) missing.push('VITE_FREEMIUS_PLAN_PRO');
  if (!publicKey) missing.push('VITE_FREEMIUS_PUBLIC_KEY');

  return {
    isValid: missing.length === 0,
    missing,
    config: {
      pluginId,
      planProId,
      publicKey,
    },
  };
}

let checkoutInstance: Checkout | null = null;
let currentPluginId: string | null = null;
let currentPublicKey: string | null = null;

/**
 * Retrieves or creates a singleton Checkout instance using the official @freemius/checkout SDK.
 */
export function getFreemiusCheckoutInstance(): Checkout {
  const { isValid, missing, config } = validateFreemiusConfig();

  if (!isValid) {
    throw new Error(`Missing required Freemius configuration: ${missing.join(', ')}`);
  }

  // Re-instantiate if keys changed
  if (!checkoutInstance || currentPluginId !== config.pluginId || currentPublicKey !== config.publicKey) {
    checkoutInstance = new Checkout({
      product_id: config.pluginId,
      public_key: config.publicKey,
    });
    currentPluginId = config.pluginId;
    currentPublicKey = config.publicKey;
  }

  return checkoutInstance;
}

/**
 * Opens the Freemius checkout using the installed @freemius/checkout package.
 */
export async function openFreemiusCheckout(options: FreemiusCheckoutLaunchOptions): Promise<void> {
  const checkout = getFreemiusCheckoutInstance();

  await checkout.open({
    plan_id: options.plan_id,
    billing_cycle: options.billing_cycle || 'monthly',
    trial: options.trial !== undefined ? options.trial : true,
    user_email: options.user_email,
    user_firstname: options.user_firstname,
    user_lastname: options.user_lastname,
    success: options.success,
    purchaseCompleted: options.purchaseCompleted,
    cancel: options.cancel,
    afterOpen: options.afterOpen,
    afterClose: options.afterClose,
  });
}
