import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser } from './src/db/users.ts';
import { 
  createSavedPhrase, 
  getSavedPhrasesByUserUid, 
  deleteSavedPhraseById 
} from './src/db/phrases.ts';
import { 
  getProfessionalCoaching, 
  translatePhrase,
  getChatTutorResponse,
  getRoleplayPartnerResponse
} from './server/aiCoach.ts';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Cloud SQL & Auth API Routes
  app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || 'user@example.com';
      const name = (req.user as any)?.name || undefined;

      if (!uid) {
        return res.status(401).json({ error: 'Unauthorized: missing user identifier' });
      }

      const user = await getOrCreateUser(uid, email, name);
      return res.json({ status: 'ok', user });
    } catch (error: any) {
      console.error('User sync error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to synchronize user profile.' });
    }
  });

  app.get('/api/phrases', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const phrases = await getSavedPhrasesByUserUid(uid);
      return res.json({ phrases });
    } catch (error: any) {
      console.error('Fetch phrases error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to fetch saved phrases.' });
    }
  });

  app.post('/api/phrases', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const email = req.user?.email || 'user@example.com';
      const displayName = (req.user as any)?.name || undefined;

      if (!uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { original, professional, translation, why, practice, mode, jobType } = req.body || {};
      if (!original || !professional) {
        return res.status(400).json({ error: 'Original and professional texts are required.' });
      }

      const saved = await createSavedPhrase({
        userUid: uid,
        userEmail: email,
        userDisplayName: displayName,
        original,
        professional,
        translation,
        why,
        practice,
        mode,
        jobType,
      });

      return res.json({ status: 'ok', phrase: saved });
    } catch (error: any) {
      console.error('Save phrase error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to save phrase.' });
    }
  });

  app.delete('/api/phrases/:id', requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      const id = parseInt(req.params.id, 10);

      if (!uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid phrase ID' });
      }

      const deleted = await deleteSavedPhraseById(id, uid);
      return res.json({ status: 'ok', deleted });
    } catch (error: any) {
      console.error('Delete phrase error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to delete phrase.' });
    }
  });

  // AI Coach API Route
  app.post('/api/coach', async (req, res) => {
    // Ensure response is always application/json
    res.setHeader('Content-Type', 'application/json');

    try {
      const { input, mode = 'general', jobType = 'Tech', nativeLanguage = 'Spanish' } = req.body || {};

      if (!input || typeof input !== 'string' || !input.trim()) {
        return res.status(400).json({ error: 'Please enter a sentence or phrase to practice.' });
      }

      const result = await getProfessionalCoaching({
        input,
        mode,
        jobType,
        nativeLanguage,
      });

      return res.json(result);
    } catch (error: any) {
      console.error('Unhandled error in /api/coach:', error);
      return res.status(500).json({ 
        error: error?.message || 'Failed to generate coaching suggestions. Please try again.' 
      });
    }
  });

  // AI Translation API Route
  app.post('/api/translate', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { text, targetLanguage = 'Spanish' } = req.body || {};
      if (!text || typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: 'Text is required for translation.' });
      }

      const translation = await translatePhrase(text, targetLanguage);
      return res.json({ status: 'ok', translation, targetLanguage });
    } catch (error: any) {
      console.error('Translation error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to translate phrase.' });
    }
  });

  // TalkPal AI Chat Tutor API Route
  app.post('/api/chat-tutor', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { messages = [], userInput = '', nativeLanguage = 'Spanish', englishLevel = 'B1', coachPersona } = req.body || {};
      if (!userInput || typeof userInput !== 'string' || !userInput.trim()) {
        return res.status(400).json({ error: 'User input is required.' });
      }

      const result = await getChatTutorResponse({
        messages,
        userInput,
        nativeLanguage,
        englishLevel,
        coachPersona
      });

      return res.json({ status: 'ok', ...result });
    } catch (error: any) {
      console.error('Chat tutor error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to get chat tutor response.' });
    }
  });

  // TalkPal AI Roleplay Partner API Route
  app.post('/api/roleplay-chat', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { scenarioTitle, partnerRole, objectives = [], messages = [], userInput = '', nativeLanguage = 'Spanish' } = req.body || {};
      if (!userInput || typeof userInput !== 'string' || !userInput.trim()) {
        return res.status(400).json({ error: 'User input is required.' });
      }

      const result = await getRoleplayPartnerResponse({
        scenarioTitle,
        partnerRole,
        objectives,
        messages,
        userInput,
        nativeLanguage
      });

      return res.json({ status: 'ok', ...result });
    } catch (error: any) {
      console.error('Roleplay chat error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to get roleplay response.' });
    }
  });

  // Support Inbox & Helpdesk Routing API
  app.post('/api/support', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { email, name, category = 'General Question', message } = req.body || {};
      const targetRecipient = 'ProEnglishAICoach@protonmail.com';

      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ error: 'A valid email address is required.' });
      }

      if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Please enter your message.' });
      }

      const ticketId = `PRO-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
      const timestamp = new Date().toISOString();

      console.log('📬 [SUPPORT INBOX TICKET DISPATCHED]', {
        ticketId,
        recipient: targetRecipient,
        senderEmail: email.trim(),
        senderName: name?.trim() || 'Anonymous',
        category,
        message: message.trim(),
        timestamp,
        userAgent: req.headers['user-agent'],
      });

      const subject = `[ProEnglish Support Ticket #${ticketId}] ${category} - ${name || email}`;
      const body = `Hello ProEnglish Support Team,\n\nTicket ID: ${ticketId}\nSender: ${name || 'User'} (${email})\nCategory: ${category}\nSubmitted At: ${timestamp}\n\nMessage:\n${message}\n\n---\nProEnglish AI Coach Support System`;

      const mailtoUrl = `mailto:${targetRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetRecipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const protonMailUrl = `https://mail.proton.me/compose?to=${targetRecipient}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      return res.json({
        success: true,
        ticketId,
        recipient: targetRecipient,
        senderEmail: email.trim(),
        timestamp,
        mailtoUrl,
        gmailUrl,
        protonMailUrl,
        message: 'Your message has been received and routed to ProEnglishAICoach@protonmail.com. Our support team will reply to you directly.',
      });
    } catch (error: any) {
      console.error('Support ticket handling error:', error);
      return res.status(500).json({ error: error?.message || 'Failed to process support request.' });
    }
  });

  // Freemius Webhook Handler
  app.post('/api/freemius/webhook', express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    }
  }), async (req: any, res) => {
    try {
      const secret = process.env.FREEMIUS_SECRET_KEY;
      const signature = req.headers['http_x_freemius_signature'] as string || req.headers['x-freemius-signature'] as string;

      if (secret && signature && req.rawBody) {
        // Optional: Implement Freemius signature verification here
      }

      const event = req.body;
      const eventType = event?.type;
      const data = event?.data;

      console.log(`🔔 [FREEMIUS WEBHOOK RECEIVED] Event: ${eventType}`, {
        orderId: data?.id,
        userEmail: data?.user_email || data?.customer?.email,
      });

      // Handle subscription & order lifecycle events
      switch (eventType) {
        case 'install.created':
        case 'license.created':
          console.log(`✅ License created/installed: ${data?.user_email}`);
          break;
        case 'subscription.created':
          console.log(`✅ Subscription created: ${data?.user_email}`);
          break;
        case 'subscription.cancelled':
        case 'subscription.expired':
          console.log(`⚠️ Subscription cancelled/expired: ${data?.user_email}`);
          break;
        case 'payment.created':
          console.log(`💳 Payment created for ${data?.user_email}`);
          break;
        case 'payment.failed':
          console.warn(`❌ Payment failed for ${data?.user_email}`);
          break;
        default:
          console.log(`ℹ️ Unhandled Freemius event: ${eventType}`);
      }

      return res.status(200).json({ received: true });
    } catch (err: any) {
      console.error('❌ Freemius Webhook error:', err);
      return res.status(500).json({ error: err?.message || 'Webhook processing failed' });
    }
  });

  // Country detection for localized pricing & currency
  app.get('/api/country', (req, res) => {
    const country = 
      req.headers['x-vercel-ip-country'] || 
      req.headers['x-country'] || 
      req.headers['cf-ipcountry'] || 
      req.headers['x-appengine-country'] || 
      '';
    
    return res.json({ country: typeof country === 'string' ? country.toUpperCase() : '' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

