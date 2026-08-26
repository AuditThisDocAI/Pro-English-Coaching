import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { loadFreemiusScript, openFreemiusCheckout, FreemiusCheckoutOptions, isFreemiusConfigured } from '../lib/freemius';

interface FreemiusContextType {
  isReady: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  error: string | null;
  openCheckout: (options: FreemiusCheckoutOptions) => Promise<void>;
}

const FreemiusContext = createContext<FreemiusContextType>({
  isReady: false,
  isLoading: true,
  isConfigured: false,
  error: null,
  openCheckout: async () => {},
});

export const FreemiusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef<boolean>(false);
  const isConfigured = isFreemiusConfigured();

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;

    async function initFreemius() {
      try {
        setIsLoading(true);
        if (isConfigured) {
          await loadFreemiusScript();
        }
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
  }, [isConfigured]);

  const handleOpenCheckout = useCallback(async (options: FreemiusCheckoutOptions) => {
    await openFreemiusCheckout(options);
  }, []);

  return (
    <FreemiusContext.Provider
      value={{
        isReady,
        isLoading,
        isConfigured,
        error,
        openCheckout: handleOpenCheckout,
      }}
    >
      {children}
    </FreemiusContext.Provider>
  );
};

export const useFreemius = () => useContext(FreemiusContext);

