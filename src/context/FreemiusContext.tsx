import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { loadFreemiusScript, openFreemiusCheckout, FreemiusCheckoutOptions } from '../lib/freemius';

interface FreemiusContextType {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  openCheckout: (options: FreemiusCheckoutOptions) => Promise<void>;
}

const FreemiusContext = createContext<FreemiusContextType>({
  isReady: false,
  isLoading: true,
  error: null,
  openCheckout: async () => {},
});

export const FreemiusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    async function initFreemius() {
      try {
        setIsLoading(true);
        await loadFreemiusScript();
        setIsReady(true);
        setError(null);
      } catch (err: any) {
        console.warn('Freemius SDK initialization note:', err);
        setError(err?.message || 'Could not load Freemius SDK');
      } finally {
        setIsLoading(false);
      }
    }

    initFreemius();
  }, []);

  const handleOpenCheckout = useCallback(async (options: FreemiusCheckoutOptions) => {
    try {
      await openFreemiusCheckout(options);
    } catch (err: any) {
      console.error('Failed to open Freemius checkout:', err);
    }
  }, []);

  return (
    <FreemiusContext.Provider
      value={{
        isReady,
        isLoading,
        error,
        openCheckout: handleOpenCheckout,
      }}
    >
      {children}
    </FreemiusContext.Provider>
  );
};

export const useFreemius = () => useContext(FreemiusContext);
