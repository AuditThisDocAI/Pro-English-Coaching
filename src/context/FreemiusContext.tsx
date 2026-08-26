import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { 
  openFreemiusCheckout, 
  validateFreemiusConfig, 
  FreemiusCheckoutLaunchOptions,
  FreemiusConfigValidation 
} from '../lib/freemius';

interface FreemiusContextType {
  isConfigured: boolean;
  validation: FreemiusConfigValidation;
  error: string | null;
  openCheckout: (options: FreemiusCheckoutLaunchOptions) => Promise<void>;
}

const initialValidation = validateFreemiusConfig();

const FreemiusContext = createContext<FreemiusContextType>({
  isConfigured: initialValidation.isValid,
  validation: initialValidation,
  error: null,
  openCheckout: async () => {},
});

export const FreemiusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [validation, setValidation] = useState<FreemiusConfigValidation>(initialValidation);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentValidation = validateFreemiusConfig();
    setValidation(currentValidation);
    if (!currentValidation.isValid) {
      console.info(
        `[Freemius Trial] Environment configuration note: Missing ${currentValidation.missing.join(', ')}`
      );
    }
  }, []);

  const handleOpenCheckout = useCallback(async (options: FreemiusCheckoutLaunchOptions) => {
    try {
      setError(null);
      await openFreemiusCheckout(options);
    } catch (err: any) {
      setError(err?.message || 'Error opening checkout');
      throw err;
    }
  }, []);

  return (
    <FreemiusContext.Provider
      value={{
        isConfigured: validation.isValid,
        validation,
        error,
        openCheckout: handleOpenCheckout,
      }}
    >
      {children}
    </FreemiusContext.Provider>
  );
};

export const useFreemius = () => useContext(FreemiusContext);
