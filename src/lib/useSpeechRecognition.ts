import { useState, useEffect, useCallback, useRef } from 'react';

// Extend window object for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [transcript, setTranscript] = useState('');
  
  const recognitionRef = useRef<any>(null);
  
  // We need to keep track of the transcript from PREVIOUS sessions
  // so that stopping and starting doesn't overwrite it.
  const accumulatedTranscriptRef = useRef('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = 'en-US';

          rec.onresult = (event: any) => {
            try {
              let currentSessionFinal = '';
              let currentSessionInterim = '';

              for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                  currentSessionFinal += event.results[i][0].transcript;
                } else {
                  currentSessionInterim += event.results[i][0].transcript;
                }
              }
              
              const fullTranscript = accumulatedTranscriptRef.current + currentSessionFinal;
              setTranscript(fullTranscript + currentSessionInterim);
            } catch (_) {}
          };

          rec.onerror = (event: any) => {
            console.warn('Speech recognition error handled:', event?.error);
            setIsListening(false);
          };

          rec.onend = () => {
            setIsListening(false);
          };

          recognitionRef.current = rec;
        } else {
          setIsSupported(false);
        }
      } catch (err) {
        console.warn('Speech recognition not available:', err);
        setIsSupported(false);
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isListening && recognitionRef.current) {
      try {
        // Ensure there is a space between previous transcript and new dictation
        let baseTranscript = transcript;
        if (baseTranscript.length > 0 && !baseTranscript.endsWith(' ')) {
          baseTranscript += ' ';
        }
        accumulatedTranscriptRef.current = baseTranscript;
        
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e: any) {
        console.error('Error starting speech recognition:', e);
        // Fallback for some mobile browsers that might throw if already started
        if (e.name === 'InvalidStateError') {
          setIsListening(true);
        }
      }
    }
  }, [isListening, transcript]);

  const stopListening = useCallback(() => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    accumulatedTranscriptRef.current = '';
  }, []);

  // Update transcript externally (e.g. if user types)
  const setExternalTranscript = useCallback((text: string) => {
    setTranscript(text);
    if (!isListening) {
      accumulatedTranscriptRef.current = text;
    }
  }, [isListening]);

  return {
    transcript,
    setTranscript: setExternalTranscript,
    resetTranscript,
    isListening,
    isSupported,
    toggleListening,
    startListening,
    stopListening
  };
}
