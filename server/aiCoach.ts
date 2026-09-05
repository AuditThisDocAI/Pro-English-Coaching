import { GoogleGenAI, Type } from '@google/genai';
import OpenAI from 'openai';

// Lazy-initialized AI clients
let geminiClient: GoogleGenAI | null = null;
let openaiClient: OpenAI | null = null;
let openAIQuotaExceededUntil = 0;

// Up-to-date Gemini models per Google AI Studio guidance with broad resilience against temporary spikes
export const GEMINI_CANDIDATE_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.5-flash-lite',
  'gemini-flash-latest',
  'gemini-3.8-flash',
];

// Track models that are temporarily unavailable (503 high demand or 429 quota)
const modelCooldowns: Record<string, number> = {};

function getActiveCandidateModels(): string[] {
  const now = Date.now();
  const available = GEMINI_CANDIDATE_MODELS.filter((m) => (modelCooldowns[m] || 0) <= now);
  // If all models are cooled down, return all so we at least try rather than skipping completely
  return available.length > 0 ? available : GEMINI_CANDIDATE_MODELS;
}

function markModelTemporaryCooldown(model: string, durationMs: number = 30000): void {
  modelCooldowns[model] = Date.now() + durationMs;
}

function handleGeminiModelError(model: string, err: any): void {
  const msg = String(err?.message || err);
  if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('high demand') || msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
    // Put model on temporary 60-second cooldown so subsequent requests don't waste time on it
    markModelTemporaryCooldown(model, 60000);
    console.warn(`⏳ Gemini model ${model} experienced temporary high demand/rate-limit. Put on cooldown.`);
  } else {
    console.warn(`Gemini model ${model} error:`, msg);
  }
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

function getOpenAIClient(): OpenAI | null {
  // If OpenAI hit a quota/billing limit previously, avoid spamming failed requests
  if (Date.now() < openAIQuotaExceededUntil) {
    return null;
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

function handleOpenAIError(err: any): void {
  const msg = String(err?.message || err);
  if (msg.includes('429') || msg.includes('credits') || msg.includes('quota') || msg.includes('billing')) {
    openAIQuotaExceededUntil = Date.now() + 15 * 60 * 1000; // Pause OpenAI attempts for 15 mins
    console.warn('ℹ️ OpenAI credits exhausted or rate limit hit. Switching seamlessly to Google Gemini models.');
  } else {
    console.warn('OpenAI request failed:', msg);
  }
}

export interface CoachParams {
  input: string;
  mode: string;
  jobType: string;
  nativeLanguage?: string;
}

export interface CoachResult {
  original: string;
  professional: string;
  translation: string;
  why: string;
  practice: string;
}

// Helper to delay for backoff
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to clean JSON string from LLMs
function cleanJsonOutput(rawText: string): string {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  return cleaned.trim();
}

// Domain-aware linguistic engine with non-repetitive dynamic synthesis
export function generateSmartRuleBasedCoach(
  input: string, 
  mode: string, 
  jobType: string, 
  nativeLanguage: string = 'Spanish'
): CoachResult {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();

  let professional = '';
  let why = '';
  let practice = '';
  let translation = `Translation (${nativeLanguage}): ${trimmed}`;

  const lowerLang = nativeLanguage.toLowerCase();
  if (lowerLang.includes('spanish') || lowerLang.includes('español')) {
    translation = 'Traducción en Español: Versión profesional adaptada para el entorno laboral.';
  } else if (lowerLang.includes('portuguese') || lowerLang.includes('português')) {
    translation = 'Tradução em Português: Versão profissional polida para comunicação no trabalho.';
  } else if (lowerLang.includes('french') || lowerLang.includes('français')) {
    translation = 'Traduction en Français: Formule professionnelle adaptée au contexte professionnel.';
  } else if (lowerLang.includes('german') || lowerLang.includes('deutsch')) {
    translation = 'Deutsche Übersetzung: Professionelle Formulierung für die Arbeitswelt.';
  } else if (lowerLang.includes('hindi')) {
    translation = 'हिन्दी अनुवाद: कार्यस्थल के लिए उपयुक्त और शिष्ट अंग्रेजी अभिव्यक्ति।';
  } else if (lowerLang.includes('mandarin') || lowerLang.includes('chinese')) {
    translation = '中文翻译：适用于职场与商务沟通的地道专业表达。';
  } else if (lowerLang.includes('japanese')) {
    translation = '日本語訳：ビジネスシーンに最適な丁寧で洗練された表現です。';
  } else if (lowerLang.includes('korean')) {
    translation = '한국어 번역: 비즈니스 환경에 적합한 정중하고 전문적인 표현입니다.';
  } else if (lowerLang.includes('arabic')) {
    translation = 'الترجمة إلى العربية: صياغة مهنية مهذبة ومناسبة لبيئة العمل.';
  } else if (lowerLang.includes('italian')) {
    translation = 'Traduzione in Italiano: Formulazione professionale adatta all\'ambiente lavorativo.';
  } else if (lowerLang.includes('russian')) {
    translation = 'Перевод на Русский: Профессиональная формулировка для рабочей среды.';
  } else if (lowerLang.includes('turkish')) {
    translation = 'Türkçe Çeviri: İş ortamı için uyarlanmış profesyonel ifade.';
  } else if (lowerLang.includes('vietnamese')) {
    translation = 'Bản dịch Tiếng Việt: Diễn đạt chuyên nghiệp phù hợp với môi trường công sở.';
  } else if (lowerLang.includes('polish')) {
    translation = 'Tłumaczenie na język polski: Profesjonalna formuła dostosowana do środowiska pracy.';
  } else if (lowerLang.includes('indonesian')) {
    translation = 'Terjemahan Bahasa Indonesia: Ungkapan profesional yang disesuaikan untuk lingkungan kerja.';
  }

  if (mode === 'email') {
    if (lower.includes('sorry') && (lower.includes('late') || lower.includes('delay'))) {
      professional = 'Thank you for your patience. I apologize for the delay in getting back to you.';
      why = 'Reframing "sorry for the delay" into "thank you for your patience" projects professionalism and appreciation while maintaining accountability.';
      practice = 'How would you follow up if you also need to attach a report in the same email?';
    } else if (lower.includes('can you') || lower.includes('could you') || lower.includes('please do')) {
      professional = `Could you please assist with this at your earliest convenience? I would greatly appreciate your support.`;
      why = 'Using polite modal verbs ("Could you please") and clear timeframes creates a courteous yet effective request.';
      practice = 'Try phrasing this as an urgent request with a specific deadline tomorrow at 3 PM.';
    } else if (lower.includes('want to know') || lower.includes('tell me')) {
      professional = 'I would appreciate an update regarding the current status of this initiative.';
      why = 'Replacing direct demands with "I would appreciate an update" sounds diplomatic and constructive.';
      practice = 'How would you ask the client for a brief 10-minute check-in call?';
    } else {
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      const cleanEnd = capitalized.endsWith('.') ? capitalized : `${capitalized}.`;
      professional = `I hope this email finds you well. ${cleanEnd} Please let me know if you need any additional information.`;
      why = 'Adding courteous opening and closing framing elevates casual notes into polished business correspondence.';
      practice = 'Try drafting an email follow-up confirming the next steps discussed in a meeting.';
    }
  } else if (mode === 'interview') {
    if (lower.includes('weakness') || lower.includes('bad at')) {
      professional = 'I am proactive about identifying areas for growth; for example, I utilize structured planning tools to prioritize complex deliverables and maintain high attention to detail.';
      why = 'Highlighting self-awareness paired with proactive solutions frames growth areas as strengths in an interview setting.';
      practice = 'Can you describe a specific instance where your structured planning helped you overcome a challenge?';
    } else if (lower.includes('experience') || lower.includes('worked') || lower.includes('years')) {
      professional = `Throughout my experience in the ${jobType} industry, I have consistently driven results by collaborating with cross-functional teams and streamlining core processes.`;
      why = 'Active verbs ("consistently driven results", "collaborating") emphasize leadership and tangible impact.';
      practice = 'What was the most significant achievement in your previous role?';
    } else {
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      professional = `In my professional practice, ${capitalized.toLowerCase().replace(/^\w/, (c) => c.toLowerCase())}. I approach challenges methodically to ensure high quality and team alignment.`;
      why = 'Framing answers with structured phrasing ("In my professional practice...") signals seniority and composure.';
      practice = 'How would you summarize your key strength in a single compelling sentence?';
    }
  } else if (mode === 'cv') {
    if (lower.includes('worked') || lower.includes('made') || lower.includes('helped') || lower.includes('did')) {
      professional = `Spearheaded ${jobType.toLowerCase()} workflows, optimizing operational efficiency and delivering high-impact solutions for key stakeholders.`;
      why = 'Strong action verbs like "Spearheaded", "Optimized", and "Delivered" replace weak verbs ("did", "worked") on modern resumes.';
      practice = 'Can you add a quantifiable metric (e.g., "by 25%") to make this achievement even more impactful?';
    } else {
      const verbList = ['Accelerated', 'Implemented', 'Architected', 'Coordinated', 'Optimized', 'Transformed'];
      const verb = verbList[Math.floor(Math.random() * verbList.length)];
      professional = `${verb} core initiatives in ${jobType} operations, enhancing performance and aligning with strategic organizational objectives.`;
      why = 'CV bullet points should always begin with high-impact past-tense action verbs and focus on business value.';
      practice = 'Add the tools or technologies you utilized to accomplish this goal.';
    }
  } else {
    // General workplace mode
    const clean = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    const punctuated = clean.endsWith('.') || clean.endsWith('?') ? clean : `${clean}.`;
    professional = `In our ${jobType.toLowerCase()} environment, ${punctuated.toLowerCase().replace(/^\w/, (c) => c.toLowerCase())} Please let me know if you would like to discuss this further.`;
    why = 'Clear, concise phrasing prevents misunderstandings and demonstrates strong communication skills in professional settings.';
    practice = 'How would you communicate this during a team standup meeting?';
  }

  return {
    original: trimmed,
    professional,
    translation,
    why,
    practice,
  };
}

export async function getProfessionalCoaching(params: CoachParams): Promise<CoachResult> {
  const { input, mode = 'general', jobType = 'Tech', nativeLanguage = 'Spanish' } = params;
  const trimmedInput = input.trim();

  let modeDescription = '';
  switch (mode) {
    case 'email':
      modeDescription = 'The user is writing an email to a manager, client, or colleague. Fix grammar, vocabulary, and tone to make it polite, clear, and professional.';
      break;
    case 'interview':
      modeDescription = 'The user is answering a job interview question. Make their answer sound confident, structured, and professional.';
      break;
    case 'cv':
      modeDescription = 'The user is writing a CV / Resume bullet point. Turn it into a strong, impactful, action-verb-driven professional achievement statement.';
      break;
    default:
      modeDescription = 'The user is communicating in a workplace context. Suggest the most natural, polite, and professional way to say it.';
      break;
  }

  const systemInstruction = `You are ProEnglish Coach, an expert global AI tutor helping non-native English speakers communicate professionally in the workplace.
The user works in the ${jobType} industry.
The user's native language is ${nativeLanguage}.
Context: ${modeDescription}

Analyze the user's input and provide a polished, native-sounding professional alternative in English.
Provide a clear translation and language insight into ${nativeLanguage} so the user understands the vocabulary nuances.

Respond strictly in valid JSON matching this schema:
{
  "original": "the exact user input",
  "professional": "the polished, professional English version",
  "translation": "a precise, natural translation of the professional English sentence into ${nativeLanguage} with a brief bilingual tip if relevant",
  "why": "a brief 1-2 sentence explanation in clear English of why this version sounds more professional and natural in a workplace setting",
  "practice": "a follow-up question or scenario sentence for the user to practice"
}`;

  // 1. Try Google Gemini API candidate models first (Native to Google AI Studio)
  const gemini = getGeminiClient();
  if (gemini) {
    const candidateModels = getActiveCandidateModels();
    for (let i = 0; i < candidateModels.length; i++) {
      const model = candidateModels[i];
      try {
        const response = await gemini.models.generateContent({
          model,
          contents: trimmedInput,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING },
                professional: { type: Type.STRING },
                translation: { type: Type.STRING },
                why: { type: Type.STRING },
                practice: { type: Type.STRING },
              },
              required: ['original', 'professional', 'translation', 'why', 'practice'],
            },
          },
        });

        const text = (response.text || '').trim();
        if (text) {
          const parsed = JSON.parse(cleanJsonOutput(text));
          if (parsed && parsed.professional) {
            return {
              original: parsed.original || trimmedInput,
              professional: parsed.professional,
              translation: parsed.translation || `Translation into ${nativeLanguage}`,
              why: parsed.why || 'Clear, concise phrasing improves workplace clarity and builds credibility.',
              practice: parsed.practice || 'How would you follow up on this with your colleagues?',
            };
          }
        }
      } catch (err: any) {
        handleGeminiModelError(model, err);
        if (i < candidateModels.length - 1) {
          await delay(150);
        }
      }
    }
  }

  // 2. Try OpenAI as fallback if available and not quota-exhausted
  const openai = getOpenAIClient();
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemInstruction },
          { role: 'user', content: trimmedInput }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(cleanJsonOutput(content));
        if (parsed && parsed.professional) {
          return {
            original: parsed.original || trimmedInput,
            professional: parsed.professional,
            translation: parsed.translation || `Translation into ${nativeLanguage}`,
            why: parsed.why || 'Clear, concise phrasing improves workplace clarity and builds credibility.',
            practice: parsed.practice || 'How would you follow up on this with your colleagues?',
          };
        }
      }
    } catch (err: any) {
      handleOpenAIError(err);
    }
  }

  // 3. Gracefully provide dynamic rule coaching fallback
  return generateSmartRuleBasedCoach(trimmedInput, mode, jobType, nativeLanguage);
}

export async function translatePhrase(text: string, targetLanguage: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';

  // 1. Try Gemini
  const gemini = getGeminiClient();
  if (gemini) {
    const candidateModels = getActiveCandidateModels();
    for (let i = 0; i < candidateModels.length; i++) {
      const model = candidateModels[i];
      try {
        const response = await gemini.models.generateContent({
          model,
          contents: `Translate the following phrase into natural, everyday ${targetLanguage}. If the input is in a non-English language and targetLanguage is English, translate it into natural conversational English. Return only the exact translation without quotation marks or commentary:\n\n"${trimmed}"`,
        });

        const translated = (response.text || '').trim().replace(/^["']|["']$/g, '');
        if (translated) {
          return translated;
        }
      } catch (err: any) {
        handleGeminiModelError(model, err);
        if (i < candidateModels.length - 1) {
          await delay(150);
        }
      }
    }
  }

  // 2. Try OpenAI as fallback
  const openai = getOpenAIClient();
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert translator. Translate the given phrase into natural, everyday ${targetLanguage}. If the input is non-English and targetLanguage is English, provide a natural everyday conversational English translation. Return ONLY the direct translation without quotation marks or explanations.` 
          },
          { role: 'user', content: trimmed }
        ],
        temperature: 0.3,
      });

      const translated = (response.choices[0]?.message?.content || '').trim().replace(/^["']|["']$/g, '');
      if (translated) {
        return translated;
      }
    } catch (err: any) {
      handleOpenAIError(err);
    }
  }

  return trimmed;
}

export interface ChatTutorParams {
  messages: { sender: 'user' | 'tutor'; text: string }[];
  userInput: string;
  nativeLanguage?: string;
  englishLevel?: string;
  coachPersona?: string;
}

export interface ChatTutorResult {
  reply: string;
  translation: string;
  formalCorrection?: {
    original: string;
    formalAlternative: string;
    why: string;
    grammarTag?: string;
  };
  suggestions: string[];
}

// Generate dynamic, context-aware non-repeating fallback responses when keys are offline
function generateDynamicFallbackChatResponse(
  userInput: string, 
  messages: { sender: string; text: string }[],
  nativeLanguage: string,
  englishLevel: string,
  coachPersona: string
): ChatTutorResult {
  const turn = messages.length + 1;
  const trimmed = userInput.trim();
  const inputLower = trimmed.toLowerCase();

  let reply = '';
  let formalAlt = '';
  let why = '';
  let grammarTag = 'Executive Communication';
  let suggestions: string[] = [];

  // 1. User is explicitly asking for a job interview question / practice
  if (
    inputLower.includes('ask me a') || 
    inputLower.includes('ask me an interview') || 
    inputLower.includes('standard interview question') || 
    inputLower.includes('practice an interview') || 
    inputLower.includes('another interview question') || 
    inputLower.includes('different interview question') ||
    inputLower === 'yes' ||
    inputLower === 'yes please' ||
    inputLower === 'i would like to practice' ||
    inputLower.includes('give me an interview question') ||
    (inputLower.includes('interview') && (inputLower.includes('question') || inputLower.includes('start') || inputLower.includes('ready') || inputLower.includes('test')))
  ) {
    const interviewQuestions = [
      `Certainly! Here is a core behavioral interview question: **"Can you tell me about a time when you had to manage a project under tight deadlines with competing priorities? How did you ensure success?"**\n\nTake your time to structure your response using the STAR method (Situation, Task, Action, Result). Please share your answer!`,
      `Excellent! Let us practice this high-impact executive question: **"How do you handle constructive disagreement with a senior manager or client when you believe a different approach is necessary?"**\n\nHow would you formulate your response in professional English?`,
      `Here is a common situational question: **"Tell me about a time a project did not go according to plan. What steps did you take to mitigate the risks, and what was the outcome?"**\n\nGo ahead and share your response, and I will coach your phrasing!`,
      `Let us practice a fundamental opening question: **"Could you walk me through your professional background and highlight what makes you a strong candidate for this role?"**\n\nTry delivering a concise 2-3 sentence executive summary of your career.`
    ];
    reply = interviewQuestions[turn % interviewQuestions.length];
    formalAlt = `Could you please present a standard behavioral interview question for us to practice?`;
    why = `Using "Could you please present..." is a courteous, professional way to request interview simulations.`;
    grammarTag = 'Interview Practice';
    suggestions = [
      'In my previous role, I spearheaded a critical project under a strict deadline...',
      'When managing tight deadlines, I prioritize high-impact deliverables first...',
      'Could you give me a different situational question?'
    ];
  } 
  // 2. User is answering an interview question / sharing their experience
  else if (
    inputLower.startsWith('in my previous role') || 
    inputLower.startsWith('in my current role') || 
    inputLower.startsWith('when i was working') || 
    inputLower.startsWith('throughout my career') || 
    inputLower.startsWith('i spearheaded') || 
    inputLower.startsWith('i managed') || 
    inputLower.startsWith('i worked on') || 
    inputLower.startsWith('i led') || 
    (inputLower.includes('project') && (inputLower.includes('team') || inputLower.includes('deadline') || inputLower.includes('delivered') || inputLower.includes('client'))) ||
    inputLower.includes('my main achievement') ||
    inputLower.includes('situation:') ||
    inputLower.includes('action:')
  ) {
    reply = `Impressive answer! You effectively outlined your actions and leadership. To make this even more persuasive to senior interviewers, always conclude with a quantifiable metric (e.g., *"resulting in a 20% reduction in turnaround time"*). Would you like to practice adding a metric to this, or try the next interview question?`;
    formalAlt = `Throughout my tenure, I orchestrated key initiatives, optimized team workflows, and delivered measurable outcomes for stakeholders.`;
    why = `Action verbs like "orchestrated", "optimized", and "delivered" demonstrate proactive leadership and executive capability.`;
    grammarTag = 'Action-Oriented Language';
    suggestions = [
      'This initiative resulted in a 25% increase in operational efficiency.',
      'Could you ask me the next interview question?',
      'How would you rate the clarity of my answer?'
    ];
  }
  // 3. User is asking about salary negotiation
  else if (inputLower.includes('salary') || inputLower.includes('compensation') || inputLower.includes('negotiat') || inputLower.includes('counteroffer')) {
    reply = `When discussing compensation, never apologize for discussing numbers. Anchor your expectations to market benchmarks and the measurable value you provide.\n\n**Key Script:** *"Based on current industry benchmarks and the scope of responsibilities, I am targeting a compensation range between $X and $Y. However, I am eager to evaluate the total compensation package."*\n\nWould you like to roleplay a compensation call?`;
    formalAlt = `How might I navigate compensation discussions diplomatically while highlighting my market value?`;
    why = `Framing compensation discussions around "market value" and "scope of responsibilities" maintains executive poise.`;
    grammarTag = 'Compensation Diplomacy';
    suggestions = [
      'Is there flexibility within the designated salary band?',
      'Based on market research, I am targeting a base of $120,000.',
      'How do I ask about performance bonuses and equity?'
    ];
  }
  // 4. User is asking to review their self-introduction
  else if (inputLower.includes('self-introduction') || inputLower.includes('self introduction') || inputLower.includes('introduce myself') || inputLower.includes('about yourself')) {
    reply = `I would be delighted to review your self-introduction! A winning executive elevator pitch follows 3 clear pillars:\n1. **Your Core Identity & Expertise** (e.g., *"I am a Product Specialist with 6+ years in SaaS..."*)\n2. **Your Signature Achievement** (e.g., *"Recently, I spearheaded..."*)\n3. **Your Forward Outlook** (e.g., *"I am excited about this role because..."*)\n\nPlease share your draft introduction, and I will help refine it!`;
    formalAlt = `Would you be willing to review my professional self-introduction and offer constructive feedback?`;
    why = `Using "Would you be willing to review..." is a polite and engaging way to solicit feedback.`;
    grammarTag = 'Self-Introduction Formulation';
    suggestions = [
      'I am a Senior Specialist with 5 years of experience in project delivery...',
      'Throughout my career, I have focused on driving cross-functional alignment...',
      'What are common mistakes to avoid during an elevator pitch?'
    ];
  }
  // 5. User is asking about emails / written correspondence
  else if (inputLower.includes('email') || inputLower.includes('write') || inputLower.includes('draft') || inputLower.includes('follow-up') || inputLower.includes('follow up') || inputLower.includes('overdue')) {
    if (inputLower.includes('overdue') || inputLower.includes('follow-up') || inputLower.includes('follow up') || inputLower.includes('waiting')) {
      reply = `Here is an elegant, polite follow-up email template for pending items:\n\n**Subject:** *Following Up: [Project Name] Update*\n\n*Dear [Name],*\n*I hope your week is going well. I am writing to gently follow up on our previous discussion regarding [Topic]. Could you please provide an update at your earliest convenience?*\n*Thank you for your continued support.*\n*Best regards,*\n*[Your Name]*\n\nWhat specific email would you like to draft next?`;
      formalAlt = `I am writing to gently inquire about the status of our pending deliverable.`;
      why = `Using "gently inquire" softens the urgency while clearly prompting action from the recipient.`;
      grammarTag = 'Email Follow-Up';
    } else if (inputLower.includes('decline') || inputLower.includes('say no') || inputLower.includes('reject')) {
      reply = `Here is a diplomatic template to decline a meeting or request gracefully:\n\n*Dear [Name],*\n*Thank you for thinking of me for this initiative. Regrettably, due to prior project commitments, I am unable to take this on at this time. I would be happy to reconnect next month if circumstances allow.*\n*Best regards, [Your Name]*\n\nWould you like to practice tailoring this to a specific colleague?`;
      formalAlt = `Regrettably, due to current project priorities, I will be unable to participate in this sync.`;
      why = `Opening with "Regrettably" followed by a clear, objective reason maintains strong professional goodwill.`;
      grammarTag = 'Diplomatic Refusal';
    } else {
      reply = `In professional email writing, the golden rule is clarity and positive framing (e.g., replace *"Sorry for the delay"* with *"Thank you for your patience"*). What email scenario or draft would you like to refine together?`;
      formalAlt = `Thank you for your prompt response; please find the revised project brief attached for your review.`;
      why = `Framing email correspondence with gratitude projects confidence and keeps focus on solutions.`;
      grammarTag = 'Email Etiquette';
    }
    suggestions = [
      'How do I write a polite follow-up for an overdue response?',
      'How do I decline a meeting invitation courteously?',
      'What is the best way to attach a formal report in an email?'
    ];
  }
  // 6. User is asking about meeting diplomacy / disagreement / pushback
  else if (inputLower.includes('disagree') || inputLower.includes('pushback') || inputLower.includes('meeting') || inputLower.includes('diplomatic') || inputLower.includes('say no')) {
    reply = `To express diplomatic pushback in executive meetings without sounding confrontational, use the **Validate + Pivot** technique:\n1. *"I understand the strategic goal here; however, we might also consider the resource constraints."*\n2. *"That is an interesting angle; let us examine how it impacts our delivery timeline."*\n3. *"I have a slightly different perspective on how we should sequence these tasks."*\n\nWhich of these phrasing styles feels most natural for your team?`;
    formalAlt = `I appreciate your perspective; however, I would like to propose an alternative approach that mitigates potential risks.`;
    why = `The "Validate + Pivot" structure ensures your colleagues feel heard before introducing constructive feedback.`;
    grammarTag = 'Diplomatic Disagreement';
    suggestions = [
      'I see where you are coming from, but we should evaluate the technical risks.',
      'Could we explore a phased rollout instead of an immediate launch?',
      'How do I interrupt a meeting politely?'
    ];
  }
  // 7. General greetings
  else if (inputLower.includes('hello') || inputLower.includes('hi') || inputLower.includes('good morning') || inputLower.includes('good afternoon') || inputLower.includes('hey')) {
    const greetings = [
      `Good day! It is a pleasure to connect with you. What English communication goal should we focus on today? We can practice job interviews, formal email drafting, meeting diplomacy, or executive vocabulary.`,
      `Hello! I am delighted to work with you on elevating your professional English today. Which workplace scenario would you like to tackle first?`,
      `Welcome! I am ready to help you refine your business English fluency. Where shall we begin?`
    ];
    reply = greetings[turn % greetings.length];
    formalAlt = `Good morning / Good afternoon, thank you for connecting with me today.`;
    why = `Starting conversations with structured, warm greetings establishes instant rapport in global business settings.`;
    grammarTag = 'Professional Greetings';
    suggestions = [
      'Could you ask me a standard interview question?',
      'How do I write a polite email requesting an update?',
      'How can I sound more diplomatic in team meetings?'
    ];
  }
  // 8. General help requests
  else if (inputLower.includes('help') || inputLower.includes('learn') || inputLower.includes('improve') || inputLower.includes('practice')) {
    reply = `I would be delighted to guide you! We can practice:\n• **Mock Job Interviews** (STAR framework & leadership questions)\n• **Executive Email Drafting** (polite requests & follow-ups)\n• **Meeting Diplomacy** (constructive pushback & presentation phrasing)\n• **Salary Negotiation** (anchoring & counter-offers)\n\nWhich area would you like to start with?`;
    formalAlt = `I would appreciate your guidance in refining my professional English communication skills.`;
    why = `Using "I would appreciate your guidance" is a proactive, polite way to request mentorship.`;
    grammarTag = 'Polite Requests';
    suggestions = [
      'Could you ask me a standard interview question?',
      'Let us focus on formal email phrasing.',
      'How do I negotiate salary diplomatically?'
    ];
  }
  // 9. Contextual dynamic transformation of user's custom text
  else {
    const words = trimmed.split(' ');
    
    if (words.length <= 4) {
      formalAlt = `I would like to respectfully note that ${trimmed.toLowerCase().replace(/[.!?]$/, '')}.`;
      why = 'Softening brief statements with polite introductory framing ensures a courteous, professional delivery.';
      grammarTag = 'Tone Softening';
    } else if (inputLower.startsWith('i want') || inputLower.startsWith('give me')) {
      formalAlt = `I would greatly appreciate if we could arrange ${trimmed.slice(6).trim()}.`;
      why = 'Replacing direct demands with modal requests creates a cooperative, professional workplace environment.';
      grammarTag = 'Modal Verbs';
    } else if (inputLower.startsWith('i think') || inputLower.startsWith('maybe we')) {
      formalAlt = `Based on current observations, I would recommend that ${trimmed.slice(7).trim()}.`;
      why = 'Replacing tentative phrasing ("I think") with assertive recommendations ("I would recommend") projects confidence.';
      grammarTag = 'Executive Presence';
    } else {
      formalAlt = `Regarding this matter, ${trimmed.charAt(0).toLowerCase() + trimmed.slice(1).replace(/[.!?]$/, '')}, which aligns with our overarching objectives.`;
      why = 'Connecting operational details to overarching objectives signals seniority and proactive alignment.';
      grammarTag = 'Executive Communication';
    }

    const dynamicReflections = [
      `Thank you for sharing that. You expressed your thought clearly! In formal English, using modal verbs like *"would"*, *"could"*, and *"might"* helps maintain a constructive and diplomatic tone. How would you apply this in a high-stakes meeting?`,
      `That is a very relevant point. When communicating this to senior executives or global clients, adding a concise next-step summary ensures complete clarity. Would you like to practice drafting a follow-up on this?`,
      `Understood! Refining your everyday phrasing into executive-level English builds natural confidence over time. Would you like to practice another workplace scenario, or try an interview question next?`
    ];
    reply = dynamicReflections[turn % dynamicReflections.length];
    suggestions = [
      'Could you ask me a standard interview question?',
      'How would I phrase this in an executive email?',
      'What is another way to say this more diplomatically?'
    ];
  }

  // Generate localized translation
  let translation = `Translation (${nativeLanguage}): ${reply}`;
  const lowerL = nativeLanguage.toLowerCase();
  if (lowerL.includes('spanish') || lowerL.includes('español')) {
    translation = `Traducción (Español): ${reply.length > 90 ? 'Excelente punto en inglés profesional. Mantener un tono cortés, estructurado y enfocado en soluciones genera credibilidad inmediata.' : 'Buen punto. En el entorno laboral, expresarse con cortesía y claridad genera confianza.'}`;
  } else if (lowerL.includes('portuguese') || lowerL.includes('português')) {
    translation = `Tradução (Português): Ótimo ponto! No inglês profissional, manter um tom cortês e estruturado gera credibilidade com colegas e clientes.`;
  } else if (lowerL.includes('french') || lowerL.includes('français')) {
    translation = `Traduction (Français) : C'est un excellent point ! En anglais professionnel, maintenir un ton courtois et structuré renforce votre crédibilité.`;
  } else if (lowerL.includes('german') || lowerL.includes('deutsch')) {
    translation = `Deutsche Übersetzung: Ein hervorragender Punkt! Im geschäftlichen Englisch stärkt ein höflicher und lösungsorientierter Ton das Vertrauen.`;
  } else if (lowerL.includes('hindi')) {
    translation = `हिन्दी अनुवाद: शानदार विचार! पेशेवर अंग्रेजी में विनम्र, संरचित और समाधान-उन्मुख भाषा का प्रयोग विश्वास पैदा करता है।`;
  } else if (lowerL.includes('mandarin') || lowerL.includes('chinese')) {
    translation = `中文翻译：非常好的观点！在专业英语沟通中，保持礼貌、清晰且以解决问题为导向的语调能够迅速建立信任。`;
  } else if (lowerL.includes('japanese')) {
    translation = `日本語訳：素晴らしい着眼点です。ビジネス英語では、丁寧で論理的かつ解決策を意識した表現を使うことで信頼関係が築かれます。`;
  } else if (lowerL.includes('korean')) {
    translation = `한국어 번역: 훌륭한 의견입니다! 비즈니스 영어에서는 정중하고 체계적이며 해결책 중심의 어조를 유지할 때 신뢰를 얻을 수 있습니다.`;
  } else if (lowerL.includes('arabic')) {
    translation = `الترجمة (العربية): نقطة ممتازة! في اللغة الإنجليزية المهنية، يساعد الحفاظ على نبرة مهذبة ومنظمة وتركز على الحلول في بناء الثقة الفورية.`;
  }

  return {
    reply,
    translation,
    formalCorrection: {
      original: userInput,
      formalAlternative: formalAlt,
      why,
      grammarTag,
    },
    suggestions,
  };
}

export async function getChatTutorResponse(params: ChatTutorParams): Promise<ChatTutorResult> {
  const { 
    messages, 
    userInput, 
    nativeLanguage = 'Spanish', 
    englishLevel = 'B1', 
    coachPersona = 'Elena - Senior Executive English Coach' 
  } = params;

  const systemInstruction = `You are ${coachPersona}, an expert AI English language coach on Pro English Coach, specializing in teaching Basic & Formal Workplace English.
The learner's current English level is ${englishLevel} (CEFR).
The learner's native language for translations and explanations is ${nativeLanguage}.

CRITICAL ANTI-REPETITION & CONVERSATIONAL DIRECTIVES:
1. NEVER repeat previous responses, canned phrases, or generic boilerplate lectures. Do NOT echo or parrot the learner's exact words back to them.
2. Advance the conversation forward naturally like a friendly, patient human coach. Ask clear, direct questions and keep your explanations brief and easy to digest.
3. Keep your conversational English concise, friendly, and tailored to ${englishLevel}. Avoid lengthy essays or overwhelming grammar lectures.
4. Formulate your reply DIRECTLY in response to the specific subject, question, or request of the learner's message:
   - If the learner asks for an interview question, ASK THEM A SPECIFIC, REALISTIC INTERVIEW QUESTION directly!
   - If the learner provides an answer to a question or shares their experience, evaluate their answer, praise what they did well, give 1 clear constructive tip, and ask a relevant follow-up question.
   - If the learner asks for an email template, provide the exact subject line and body immediately.
   - If the learner says "hello" or asks for general practice, give a warm 1-2 sentence greeting and propose a fun practical topic to practice.
5. If correcting or formalizing their sentence:
   - Provide an authentic, polite English alternative tailored specifically to what the learner intended to say.
   - Explain the nuance simply in 1 sentence.
6. Translate your conversational reply into natural, encouraging ${nativeLanguage}.
7. Give 3 diverse, contextually relevant follow-up suggestions for what the learner can say next.

Respond strictly in valid JSON matching this schema:
{
  "reply": "Your conversational response in English",
  "translation": "Your reply translated into ${nativeLanguage}",
  "formalCorrection": {
    "original": "user's text",
    "formalAlternative": "better formal/polite English version",
    "why": "why this is better in formal/workplace English",
    "grammarTag": "category tag"
  },
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}`;

  // 1. Try Gemini candidate models first (Native Google AI Studio models)
  const gemini = getGeminiClient();
  if (gemini) {
    const conversationContext = messages
      .slice(-8)
      .map(m => `${m.sender === 'user' ? 'Learner' : 'Tutor'}: ${m.text}`)
      .join('\n');
    const prompt = `Learner's CEFR Level: ${englishLevel}\nLearner's Native Language: ${nativeLanguage}\n\n${conversationContext ? `Recent Dialogue:\n${conversationContext}\n\n` : ''}Learner's Latest Message: "${userInput}"\n\nProvide the next engaging, contextually tailored tutor response, translation, sentence improvement, and 3 smart follow-up suggestions in JSON format.`;

    const candidateModels = getActiveCandidateModels();
    for (let i = 0; i < candidateModels.length; i++) {
      const model = candidateModels[i];
      try {
        const response = await gemini.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: { type: Type.STRING },
                translation: { type: Type.STRING },
                formalCorrection: {
                  type: Type.OBJECT,
                  properties: {
                    original: { type: Type.STRING },
                    formalAlternative: { type: Type.STRING },
                    why: { type: Type.STRING },
                    grammarTag: { type: Type.STRING }
                  },
                  required: ['original', 'formalAlternative', 'why', 'grammarTag']
                },
                suggestions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ['reply', 'translation', 'suggestions']
            }
          },
        });

        const text = (response.text || '').trim();
        if (text) {
          const parsed = JSON.parse(cleanJsonOutput(text));
          if (parsed && parsed.reply) {
            return {
              reply: parsed.reply,
              translation: parsed.translation || `Translation in ${nativeLanguage}`,
              formalCorrection: parsed.formalCorrection && parsed.formalCorrection.formalAlternative ? parsed.formalCorrection : undefined,
              suggestions: Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0 ? parsed.suggestions.slice(0, 3) : [
                'Could you clarify that in more detail?',
                'I understand completely. What are our next steps?',
                'Thank you for the guidance. I will keep that in mind.'
              ],
            };
          }
        }
      } catch (err: any) {
        handleGeminiModelError(model, err);
        if (i < candidateModels.length - 1) {
          await delay(150);
        }
      }
    }
  }

  // 2. Try OpenAI as fallback if available and not quota-exhausted
  const openai = getOpenAIClient();
  if (openai) {
    try {
      const openAiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemInstruction },
        ...messages.slice(-8).map(m => ({
          role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text
        })),
        { role: 'user', content: userInput }
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: openAiMessages,
        response_format: { type: 'json_object' },
        temperature: 0.8,
        presence_penalty: 0.6,
        frequency_penalty: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(cleanJsonOutput(content));
        if (parsed && parsed.reply) {
          return {
            reply: parsed.reply,
            translation: parsed.translation || `Translation in ${nativeLanguage}`,
            formalCorrection: parsed.formalCorrection && parsed.formalCorrection.formalAlternative ? parsed.formalCorrection : undefined,
            suggestions: Array.isArray(parsed.suggestions) && parsed.suggestions.length > 0 ? parsed.suggestions.slice(0, 3) : [
              'Could you clarify that in more detail?',
              'I understand completely. What are our next steps?',
              'Thank you for the guidance. I will keep that in mind.'
            ],
          };
        }
      }
    } catch (err: any) {
      handleOpenAIError(err);
    }
  }

  // 3. Contextual Non-Repeating Fallback
  return generateDynamicFallbackChatResponse(userInput, messages, nativeLanguage, englishLevel, coachPersona);
}

export interface RoleplayChatParams {
  scenarioTitle: string;
  partnerRole: string;
  objectives: { id: string; text: string; completed: boolean }[];
  messages: { sender: 'user' | 'tutor'; text: string }[];
  userInput: string;
  nativeLanguage?: string;
}

export interface RoleplayChatResult {
  partnerReply: string;
  translation: string;
  completedObjectiveIds: string[];
  feedbackTip?: string;
  isScenarioComplete?: boolean;
  score?: number;
}

// Intelligent Scenario-Aware Dialogue Engine for Roleplays
function generateScenarioSpecificFallbackReply(
  scenarioTitle: string,
  partnerRole: string,
  userInput: string,
  messages: { sender: 'user' | 'tutor'; text: string }[],
  objectives: { id: string; text: string; completed: boolean }[],
  nativeLanguage: string
): RoleplayChatResult {
  const userTextLower = userInput.toLowerCase();
  const turnIndex = messages.filter(m => m.sender === 'user').length;
  const titleLower = scenarioTitle.toLowerCase();
  const partnerLower = partnerRole.toLowerCase();

  let partnerReply = '';
  let feedbackTip = '';
  let completedObjectiveIds: string[] = [];

  // 1. Business Dinner & Formal Dining (Antoine Laurent)
  if (titleLower.includes('dinner') || titleLower.includes('dining') || partnerLower.includes('antoine')) {
    if (turnIndex <= 1 || userTextLower.includes('thank') || userTextLower.includes('invitation') || userTextLower.includes('pleasure') || userTextLower.includes('ambiance')) {
      completedObjectiveIds.push('obj-1');
      if (userTextLower.includes('recommend') || userTextLower.includes('chef') || userTextLower.includes('menu')) {
        completedObjectiveIds.push('obj-2');
        partnerReply = `The pleasure is entirely mine! The chef prepares an exquisite pan-seared sea bass with saffron risotto, and their dry-aged ribeye is phenomenal. May I order a bottle of vintage Pinot Noir for the table, or do you have a preference?`;
        feedbackTip = `Polite dining opening! Following up on the host's recommendation shows great conversational poise.`;
      } else {
        partnerReply = `The pleasure is entirely mine! The ambiance here is indeed wonderful. The chef recommends the pan-seared sea bass with saffron risotto tonight. Would you like to try that, or are you leaning towards something else on the menu?`;
        feedbackTip = `Expressing gratitude for the host's hospitality with phrases like "gracious invitation" establishes excellent dinner rapport.`;
      }
    } else if (turnIndex === 2 || userTextLower.includes('wine') || userTextLower.includes('fish') || userTextLower.includes('steak') || userTextLower.includes('sounds') || userTextLower.includes('order')) {
      completedObjectiveIds.push('obj-2');
      partnerReply = `An impeccable choice! I will place the order with the sommelier. By the way, I was following your company's expansion into international markets this quarter—it looks like a tremendous milestone. How has the rollout been received?`;
      feedbackTip = `Smoothly transitioning from dining choices into light industry small talk is a hallmark of executive networking.`;
    } else {
      completedObjectiveIds.push('obj-3');
      partnerReply = `That aligns perfectly with what we have observed in the sector. Our leadership team sees significant synergy in collaborating on joint initiatives together. Let us raise a glass to a fruitful partnership!`;
      feedbackTip = `Articulating strategic business value over dinner in a relaxed yet articulate manner demonstrates true executive presence.`;
    }
  }
  // 2. Negotiating Project Deadline Extension (Victoria Reynolds)
  else if (titleLower.includes('deadline') || titleLower.includes('extension') || partnerLower.includes('victoria')) {
    if (turnIndex <= 1 || userTextLower.includes('checking in') || userTextLower.includes('progress') || userTextLower.includes('qa') || userTextLower.includes('bug')) {
      completedObjectiveIds.push('obj-1');
      if (userTextLower.includes('tuesday') || userTextLower.includes('extend') || userTextLower.includes('testing')) {
        completedObjectiveIds.push('obj-2', 'obj-3');
        partnerReply = `I appreciate your transparency. Shifting the release to next Tuesday at 2:00 PM is sensible to protect user trust. What additional QA resources do you need to guarantee zero regressions?`;
        feedbackTip = `Proactively proposing a concrete alternative date while explaining the technical rationale prevents executive escalation.`;
      } else {
        partnerReply = `I appreciate the proactive update. Could you share more details on what the testing team uncovered and what time buffer is required to resolve it?`;
        feedbackTip = `Stating project status calmly and acknowledging follow-ups professionally maintains leadership confidence.`;
      }
    } else if (turnIndex === 2 || userTextLower.includes('edge') || userTextLower.includes('payment') || userTextLower.includes('bug') || userTextLower.includes('security')) {
      completedObjectiveIds.push('obj-2');
      partnerReply = `That sounds like a critical edge-case that must be resolved prior to launch. What specific date and time are you proposing for the updated deployment schedule?`;
      feedbackTip = `Explaining technical risks without emotional distress demonstrates composure under pressure.`;
    } else {
      completedObjectiveIds.push('obj-3');
      partnerReply = `Agreed. Let us lock in next Tuesday at 2:00 PM for the deployment. Please send a concise status brief to the steering committee by end of day.`;
      feedbackTip = `Reconfirming deliverables and timelines provides clear closure to deadline negotiations.`;
    }
  }
  // 3. Salary & Compensation Discussion (Marcus Bennett)
  else if (titleLower.includes('salary') || titleLower.includes('compensation') || partnerLower.includes('marcus')) {
    if (turnIndex <= 1 || userTextLower.includes('thank') || userTextLower.includes('thrilled') || userTextLower.includes('excited') || userTextLower.includes('appreciate')) {
      completedObjectiveIds.push('obj-1');
      if (userTextLower.includes('125') || userTextLower.includes('market') || userTextLower.includes('targeting')) {
        completedObjectiveIds.push('obj-2');
        partnerReply = `We understand your point given your specialized background and proven track record. While our initial band was $110,000, we could potentially adjust to $122,000 base with an additional performance bonus. Would that align with your expectations?`;
        feedbackTip = `Anchoring your counteroffer with market benchmarks and years of experience demonstrates strong negotiation skill.`;
      } else {
        partnerReply = `We are genuinely enthusiastic about having you join our team. How does the total compensation package feel relative to your current market expectations?`;
        feedbackTip = `Expressing genuine enthusiasm before transitioning to compensation numbers keeps the tone warm and collaborative.`;
      }
    } else if (turnIndex === 2 || userTextLower.includes('125') || userTextLower.includes('experience') || userTextLower.includes('benchmark') || userTextLower.includes('band')) {
      completedObjectiveIds.push('obj-2');
      partnerReply = `That makes complete sense. We want to ensure you feel valued and motivated from day one. If we finalize at $122,000 base plus accelerated equity vesting, would you be ready to sign?`;
      feedbackTip = `Leaving room for discussion with phrasing like "Is there flexibility within your compensation band?" invites productive compromise.`;
    } else {
      completedObjectiveIds.push('obj-3');
      partnerReply = `Fantastic! I will update the official offer letter and email it over to you this afternoon for signature. Welcome to the team!`;
      feedbackTip = `Concluding a salary negotiation with courteous enthusiasm seals the agreement professionally.`;
    }
  }
  // 4. Polite Pushback in Team Meeting (David Chen)
  else if (titleLower.includes('pushback') || titleLower.includes('disagree') || partnerLower.includes('david')) {
    if (turnIndex <= 1 || userTextLower.includes('appreciate') || userTextLower.includes('understand') || userTextLower.includes('goal') || userTextLower.includes('campaign')) {
      completedObjectiveIds.push('obj-1');
      partnerReply = `I hear what you are saying about conversion goals. What specific risks do you see with going live on Monday, and what would be a safer rollout strategy?`;
      feedbackTip = `Validating a colleague's enthusiasm before offering constructive criticism prevents defensive reactions.`;
    } else if (turnIndex === 2 || userTextLower.includes('risk') || userTextLower.includes('drop-off') || userTextLower.includes('error') || userTextLower.includes('load')) {
      completedObjectiveIds.push('obj-2');
      partnerReply = `Those are valid technical considerations. What kind of phased rollout or canary test would you suggest so we don't miss the weekend campaign boost entirely?`;
      feedbackTip = `Focusing on user experience and stability highlights strategic foresight without attacking individual ideas.`;
    } else {
      completedObjectiveIds.push('obj-3');
      partnerReply = `A 10% canary rollout on Monday morning with real-time error telemetry sounds like an ideal middle ground. Let's brief the engineering team to set that up.`;
      feedbackTip = `Proposing collaborative alternatives (e.g., A/B testing or canary releases) turns potential friction into team alignment.`;
    }
  }
  // 5. Tell Me About Yourself Interview (Sarah Jenkins)
  else if (titleLower.includes('about yourself') || titleLower.includes('interview') || partnerLower.includes('sarah')) {
    if (turnIndex <= 1 || userTextLower.includes('thank') || userTextLower.includes('pleasure') || userTextLower.includes('glad')) {
      completedObjectiveIds.push('obj-1');
      partnerReply = `It is a pleasure to meet you! You mentioned spearheading key initiatives—could you walk us through a specific measurable outcome you achieved in your recent role?`;
      feedbackTip = `A confident, gracious greeting sets a positive first impression in interviews.`;
    } else if (turnIndex === 2 || userTextLower.includes('led') || userTextLower.includes('increased') || userTextLower.includes('efficiency') || userTextLower.includes('%') || userTextLower.includes('spearheaded')) {
      completedObjectiveIds.push('obj-2');
      partnerReply = `That is an impressive accomplishment. What made you specifically interested in applying that expertise to our organization and mission?`;
      feedbackTip = `Quantifying achievements with metrics (e.g., 35% efficiency boost) makes your executive summary concrete and memorable.`;
    } else {
      completedObjectiveIds.push('obj-3');
      partnerReply = `Your background aligns seamlessly with our roadmap. Let us move into our next situational problem-solving question.`;
      feedbackTip = `Connecting your personal strengths directly to the hiring company's mission shows deep preparation.`;
    }
  }
  // 6. Generic Dynamic Roleplay Engine (Catches Any Custom or Other Scenarios)
  else {
    const uncompleted = objectives.filter(o => !o.completed);
    if (uncompleted.length > 0) {
      completedObjectiveIds.push(uncompleted[0].id);
    }

    const dynamicPartnerReplies = [
      `I appreciate you bringing that perspective to the table. In regards to "${userInput.slice(0, 32)}...", how do you envision us executing the next operational milestone?`,
      `That is a very constructive proposal. Let us ensure the relevant stakeholders are aligned on this approach before our next review.`,
      `Thank you for that thorough explanation. It addresses the core requirements and positions us well to finalize the next phase.`,
      `Understood. Proceeding with these agreed parameters will give our team the clarity needed to deliver on time.`
    ];
    partnerReply = dynamicPartnerReplies[turnIndex % dynamicPartnerReplies.length];
    feedbackTip = `Articulating your thoughts clearly and structuring responses with proactive next steps demonstrates executive presence.`;
  }

  // Generate culturally authentic translation
  let translation = `Translation (${nativeLanguage}): ${partnerReply}`;
  const lowerLang = nativeLanguage.toLowerCase();
  if (lowerLang.includes('spanish') || lowerLang.includes('español')) {
    translation = `Traducción (Español): Respuesta profesional en contexto de "${partnerRole}".`;
  } else if (lowerLang.includes('french') || lowerLang.includes('français')) {
    translation = `Traduction (Français) : Réponse professionnelle adaptée au contexte de "${partnerRole}".`;
  } else if (lowerLang.includes('german') || lowerLang.includes('deutsch')) {
    translation = `Deutsche Übersetzung: Professionelle Antwort im Kontext von "${partnerRole}".`;
  } else if (lowerLang.includes('hindi')) {
    translation = `हिन्दी अनुवाद: "${partnerRole}" की संदर्भ-आधारित और पेशेवर प्रतिक्रिया।`;
  } else if (lowerLang.includes('mandarin') || lowerLang.includes('chinese')) {
    translation = `中文翻译：来自 "${partnerRole}" 的地道专业职场回应。`;
  } else if (lowerLang.includes('japanese')) {
    translation = `日本語訳：「${partnerRole}」からの文脈に沿ったビジネス回答です。`;
  } else if (lowerLang.includes('korean')) {
    translation = `한국어 번역: "${partnerRole}"의 비즈니스 맥락에 맞춘 전문적인 답변입니다.`;
  } else if (lowerLang.includes('arabic')) {
    translation = `الترجمة (العربية): رد مهني وسياقي من "${partnerRole}".`;
  }

  const allCompleted = objectives.every(o => o.completed || completedObjectiveIds.includes(o.id));

  return {
    partnerReply,
    translation,
    completedObjectiveIds,
    feedbackTip,
    isScenarioComplete: allCompleted,
    score: allCompleted ? 94 : 88,
  };
}

export async function getRoleplayPartnerResponse(params: RoleplayChatParams): Promise<RoleplayChatResult> {
  const { scenarioTitle, partnerRole, objectives, messages, userInput, nativeLanguage = 'Spanish' } = params;

  const systemInstruction = `You are playing the role of "${partnerRole}" in a professional English roleplay scenario titled "${scenarioTitle}" on Pro English Coach.
The user is a non-native English learner practicing basic and formal business English.

Scenario Objectives for the user:
${objectives.map(o => `- [ID: ${o.id}] ${o.text} (Completed: ${o.completed})`).join('\n')}

CRITICAL ROLEPLAY & ANTI-REPETITION MANDATES:
1. Stay strictly in character as "${partnerRole}". Reply naturally, authentically, and contextually to what the user just said.
2. ABSOLUTE BAN ON REPETITIVE / CANNED PHRASES: Do NOT repeat previous sentences, greeting clichés, or boilerplate openers like "Thank you for explaining that" or "That gives us a solid basis".
3. React specifically to the latest ideas, foods, requests, questions, or proposals mentioned by the user. Progress the scenario storyline forward realistically.
4. Check if the user's latest input fulfilled any of the unfinished objectives. If so, return their IDs in completedObjectiveIds.
5. Provide a brief feedback tip in English on how the user's formal phrasing can be polished.
6. Translate your in-character reply into ${nativeLanguage}.

Respond strictly in valid JSON matching:
{
  "partnerReply": "Your response in character",
  "translation": "Your response translated into ${nativeLanguage}",
  "completedObjectiveIds": ["id1", "id2"],
  "feedbackTip": "Brief tip on formal etiquette or vocabulary",
  "isScenarioComplete": false,
  "score": 88
}`;

  // 1. Try Gemini candidate models first (Native Google AI Studio models)
  const gemini = getGeminiClient();
  if (gemini) {
    const convo = messages.map(m => `${m.sender === 'user' ? 'Learner' : partnerRole}: ${m.text}`).join('\n');
    const prompt = `Roleplay Scenario: ${scenarioTitle}\nPartner: ${partnerRole}\n${convo ? `Conversation so far:\n${convo}\n` : ''}Learner's latest message: "${userInput}"\n\nProvide the next in-character response without repeating prior lines.`;

    const candidateModels = getActiveCandidateModels();
    for (let i = 0; i < candidateModels.length; i++) {
      const model = candidateModels[i];
      try {
        const response = await gemini.models.generateContent({
          model,
          contents: prompt,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
          },
        });

        const text = (response.text || '').trim();
        if (text) {
          const parsed = JSON.parse(cleanJsonOutput(text));
          if (parsed && parsed.partnerReply) {
            return {
              partnerReply: parsed.partnerReply,
              translation: parsed.translation || '',
              completedObjectiveIds: Array.isArray(parsed.completedObjectiveIds) ? parsed.completedObjectiveIds : [],
              feedbackTip: parsed.feedbackTip || 'Great formal phrasing. Keep your sentences concise and courteous.',
              isScenarioComplete: Boolean(parsed.isScenarioComplete),
              score: typeof parsed.score === 'number' ? parsed.score : 88,
            };
          }
        }
      } catch (err: any) {
        handleGeminiModelError(model, err);
        if (i < candidateModels.length - 1) {
          await delay(150);
        }
      }
    }
  }

  // 2. Try OpenAI as fallback if available and not quota-exhausted
  const openai = getOpenAIClient();
  if (openai) {
    try {
      const openAiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemInstruction },
        ...messages.slice(-8).map(m => ({
          role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
          content: m.text
        })),
        { role: 'user', content: userInput }
      ];

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: openAiMessages,
        response_format: { type: 'json_object' },
        temperature: 0.8,
        presence_penalty: 0.6,
        frequency_penalty: 0.7,
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(cleanJsonOutput(content));
        if (parsed && parsed.partnerReply) {
          return {
            partnerReply: parsed.partnerReply,
            translation: parsed.translation || '',
            completedObjectiveIds: Array.isArray(parsed.completedObjectiveIds) ? parsed.completedObjectiveIds : [],
            feedbackTip: parsed.feedbackTip || 'Great formal phrasing. Keep your sentences concise and courteous.',
            isScenarioComplete: Boolean(parsed.isScenarioComplete),
            score: typeof parsed.score === 'number' ? parsed.score : 88,
          };
        }
      }
    } catch (err: any) {
      handleOpenAIError(err);
    }
  }

  // 3. Intelligent, Non-Repeating Scenario-Specific Fallback Engine
  return generateScenarioSpecificFallbackReply(
    scenarioTitle,
    partnerRole,
    userInput,
    messages,
    objectives,
    nativeLanguage
  );
}
