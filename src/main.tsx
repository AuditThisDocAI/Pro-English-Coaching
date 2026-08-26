import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { PricingPage } from './components/PricingPage';
import { WelcomePage } from './components/WelcomePage';
import { TermsPage, PrivacyPage, RefundPage } from './components/LegalPages';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FreemiusProvider } from './context/FreemiusContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <FreemiusProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/pricing" element={<PricingPage onSuccess={() => {}} />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/terms-of-service" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/refund-policy" element={<RefundPage />} />
            <Route path="/refunds" element={<RefundPage />} />
          </Routes>
        </BrowserRouter>
      </FreemiusProvider>
    </ErrorBoundary>
  </StrictMode>,
);
