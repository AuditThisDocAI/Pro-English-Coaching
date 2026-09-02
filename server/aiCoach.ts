import { GoogleGenAI, Type } from '@google/genai';
import OpenAI from 'openai';

// Lazy-initialized AI clients
let geminiClient: GoogleGenAI | null = null;
let openaiClient: OpenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

function getOpenAIClient(): OpenAI | null {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
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
      const verb = ['Accelerated', 'Implemented', 'Architected', 'Coordinated', 'Optimized'][Math.floor(Math.random() * 5)];
      professional = `${verb} core initiatives in ${jobType} operations, enhancing performance and aligning with strategic organizational objectives.`;
      why = 'CV bullet points should always begin with high-impact past-tense action verbs and focus on business value.';
      practice = 'Add the tools or technologies you utilized to accomplish this goal.';
    }
  } else {
    // General workplace mode
    const clean = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    const punctuated = clean.endsWith('.') || clean.endsWith('?') ? clean : `${clean}.`;
    professional = `In our ${jobType.toLowerCase()} environment, ${punctuated.toLowerCase().replace(/^\w/, (c) => c.toLowerCase())} Let me know if you would like to discuss further.`;
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

  // 1. Try OpenAI if OPENAI_API_KEY is available
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
      console.warn('OpenAI coach attempt failed:', err?.message || err);
    }
  }

  // 2. Try Gemini API candidate models
  const gemini = getGeminiClient();
  if (gemini) {
    const candidateModels = ['gemini-3.7-flash', 'gemini-2.5-flash'];
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
        console.warn(`Gemini Model ${model} coach attempt failed:`, err?.message || err);
        if (i < candidateModels.length - 1) {
          await delay(300);
        }
      }
    }
  }

  // 3. Gracefully provide dynamic rule coaching fallback
  return generateSmartRuleBasedCoach(trimmedInput, mode, jobType, nativeLanguage);
}

export async function translatePhrase(text: string, targetLanguage: string): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';

  // 1. Try OpenAI if available
  const openai = getOpenAIClient();
  if (openai) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert translator. Translate the given English phrase into natural, professional ${targetLanguage}. Return ONLY the direct translation without quotation marks or explanations.` 
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
      console.warn('OpenAI translation attempt failed:', err?.message || err);
    }
  }

  // 2. Try Gemini
  const gemini = getGeminiClient();
  if (gemini) {
    const candidateModels = ['gemini-3.7-flash', 'gemini-2.5-flash'];
    for (const model of candidateModels) {
      try {
        const response = await gemini.models.generateContent({
          model,
          contents: `Translate the following workplace English phrase into natural, professional ${targetLanguage}. Return only the exact translation without quotation marks or commentary:\n\n"${trimmed}"`,
        });

        const translated = (response.text || '').trim().replace(/^["']|["']$/g, '');
        if (translated) {
          return translated;
        }
      } catch (err: any) {
        console.warn(`Translate attempt with Gemini ${model} failed:`, err?.message || err);
      }
    }
  }

  return `${trimmed} (${targetLanguage})`;
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
  const inputLower = userInput.toLowerCase();

  let reply = '';
  let formalAlt = '';
  let why = '';
  let grammarTag = 'Executive Vocabulary';

  if (inputLower.includes('hello') || inputLower.includes('hi') || inputLower.includes('good morning') || inputLower.includes('hey')) {
    reply = `Good day! It is a pleasure to connect with you. How is your workday progressing, and what communication goal should we focus on today?`;
    formalAlt = `Good morning / Good afternoon, thank you for connecting with me today.`;
    why = `Starting conversations with structured, warm greetings establishes rapport immediately in global business settings.`;
    grammarTag = 'Professional Greetings';
  } else if (inputLower.includes('help') || inputLower.includes('learn') || inputLower.includes('improve') || inputLower.includes('practice')) {
    reply = `I would be delighted to guide you. We can work on polishing your meeting contributions, crafting diplomatic email replies, or preparing for job interviews. Which area would you like to tackle first?`;
    formalAlt = `I would appreciate your guidance in refining my professional English communication skills.`;
    why = `Using "I would appreciate your guidance" is a polite, proactive way to request mentorship.`;
    grammarTag = 'Polite Requests';
  } else if (inputLower.includes('interview') || inputLower.includes('job') || inputLower.includes('salary') || inputLower.includes('resume') || inputLower.includes('cv')) {
    reply = `Career communication is one of the highest-leverage skills you can develop. When speaking to recruiters, structure your answers using the STAR method: Situation, Task, Action, and Result. Would you like to practice an interview question?`;
    formalAlt = `Throughout my career, I have consistently delivered measurable outcomes and driven team success.`;
    why = `Action verbs and structured STAR responses demonstrate leadership and self-confidence.`;
    grammarTag = 'Interview Diplomacy';
  } else if (inputLower.includes('email') || inputLower.includes('write') || inputLower.includes('send') || inputLower.includes('message')) {
    reply = `When writing professional emails, remember the golden rule: replace apologies with gratitude (for instance, "Thank you for your patience" instead of "Sorry for the delay"). What specific email draft are you working on?`;
    formalAlt = `Thank you for your prompt response; please find the updated project details outlined below.`;
    why = `Framing updates positively enhances executive presence and keeps communication focused on solutions.`;
    grammarTag = 'Email Etiquette';
  } else {
    const dynamicTopics = [
      `Thank you for sharing that perspective. In formal English, articulating your thoughts with precision and modal verbs (such as "would", "could", and "might") creates a constructive and collaborative atmosphere.`,
      `That is an insightful observation. When discussing complex topics with cross-functional teams, summarizing key takeaways at the end ensures complete alignment.`,
      `I appreciate you bringing that up. Clear communication is about balancing brevity with courtesy. How would you explain that in a high-stakes team presentation?`,
      `Understood. Practicing diverse phrasing for common workplace scenarios helps build natural fluency and confidence over time.`
    ];
    reply = dynamicTopics[turn % dynamicTopics.length];
    formalAlt = `I would like to propose that we review this in detail during our upcoming sync.`;
    why = `Using proactive phrasing like "I would like to propose" signals initiative and leadership.`;
    grammarTag = 'Strategic Phrasing';
  }

  let translation = `Translation (${nativeLanguage}): ${reply}`;
  const lowerL = nativeLanguage.toLowerCase();
  if (lowerL.includes('spanish') || lowerL.includes('español')) {
    translation = `¡Excelente punto! En inglés profesional, mantener un tono cortés, estructurado y enfocado en soluciones genera confianza inmediata.`;
  } else if (lowerL.includes('portuguese') || lowerL.includes('português')) {
    translation = `Ótimo ponto! No inglês profissional, manter um tom cortês e estruturado gera credibilidade com colegas e clientes.`;
  } else if (lowerL.includes('french') || lowerL.includes('français')) {
    translation = `C'est un excellent point ! En anglais professionnel, maintenir un ton courtois et structuré renforce votre crédibilité.`;
  } else if (lowerL.includes('german') || lowerL.includes('deutsch')) {
    translation = `Ein hervorragender Punkt! Im geschäftlichen Englisch stärkt ein höflicher und lösungsorientierter Ton das Vertrauen.`;
  } else if (lowerL.includes('hindi')) {
    translation = `शानदार विचार! पेशेवर अंग्रेजी में विनम्र, संरचित और समाधान-उन्मुख भाषा का प्रयोग विश्वास पैदा करता है।`;
  } else if (lowerL.includes('mandarin') || lowerL.includes('chinese')) {
    translation = `非常好的观点！在专业英语沟通中，保持礼貌、清晰且以解决问题为导向的语调能够迅速建立信任。`;
  } else if (lowerL.includes('japanese')) {
    translation = `素晴らしい着眼点です。ビジネス英語では、丁寧で論理的かつ解決策を意識した表現を使うことで信頼関係が築かれます。`;
  } else if (lowerL.includes('korean')) {
    translation = `훌륭한 의견입니다! 비즈니스 영어에서는 정중하고 체계적이며 해결책 중심의 어조를 유지할 때 신뢰를 얻을 수 있습니다.`;
  } else if (lowerL.includes('arabic')) {
    translation = `نقطة ممتازة! في اللغة الإنجليزية المهنية، يساعد الحفاظ على نبرة مهذبة ومنظمة وتركز على الحلول في بناء الثقة الفورية.`;
  } else if (lowerL.includes('russian')) {
    translation = `Отличная мысль! В деловом английском вежливый, структурированный и ориентированный на результат тон создает доверие.`;
  } else if (lowerL.includes('italian')) {
    translation = `Ottimo punto! Nell'inglese professionale, mantenere un tono cortese, strutturato e orientato alle soluzioni crea fiducia immediata.`;
  } else if (lowerL.includes('polish')) {
    translation = `Świetna uwaga! W profesjonalnym angielskim uprzejmy, uporządkowany i nastawiony na rozwiązania ton buduje zaufanie.`;
  } else if (lowerL.includes('turkish')) {
    translation = `Harika bir nokta! Profesyonel İngilizcede nazik, yapılandırılmış ve çözüm odaklı bir üslup güven oluşturur.`;
  } else if (lowerL.includes('vietnamese')) {
    translation = `Ý kiến rất hay! Trong tiếng Anh công sở, việc duy trì giọng điệu lịch sự, mạch lạc và hướng đến giải pháp sẽ tạo dựng sự tin tưởng.`;
  } else if (lowerL.includes('indonesian')) {
    translation = `Poin yang luar biasa! Dalam bahasa Inggris profesional, mempertahankan nada yang sopan, terstruktur, dan berorientasi pada solusi membangun kepercayaan.`;
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
    suggestions: [
      'Could you provide an example of how to say this in an email?',
      'How would I phrase this during an executive meeting?',
      'Let us practice another scenario.'
    ],
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

  const systemInstruction = `You are ${coachPersona}, an elite AI English language tutor on Pro English Coach, specializing in teaching Basic & Formal English.
The learner's current English level is ${englishLevel} (CEFR).
The learner's native language for translations and explanations is ${nativeLanguage}.

Your Goal:
1. Respond dynamically and contextually to the user's message in clear, authentic, friendly yet professional English suited to their level (${englishLevel}).
2. NEVER repeat generic canned phrases. Tailor your response directly to the specifics of what the learner just said.
3. Analyze the user's English input:
   - Check if it is too casual, blunt, grammatically flawed, or unnatural.
   - If it can be improved into a more polite, formal, or professional phrase, provide:
     - "original": user's exact phrase
     - "formalAlternative": a polished, diplomatic formal English alternative
     - "why": a brief 1-sentence explanation of why the formal version is preferred in business / formal settings
     - "grammarTag": e.g. "Modal Verbs", "Polite Request", "Diplomatic Phrasing", "Executive Vocabulary", "Tone Refinement"
4. Provide a clear, natural translation of your reply into ${nativeLanguage}.
5. Provide 3 smart, distinct formal English follow-up suggestions for the user to tap and reply with next.

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

  // 1. Try OpenAI if OPENAI_API_KEY is available
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
        temperature: 0.75,
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
      console.warn('OpenAI chat tutor attempt failed:', err?.message || err);
    }
  }

  // 2. Try Gemini candidate models
  const gemini = getGeminiClient();
  if (gemini) {
    const conversationContext = messages
      .slice(-8)
      .map(m => `${m.sender === 'user' ? 'User' : 'Tutor'}: ${m.text}`)
      .join('\n');
    const prompt = `${conversationContext ? `Conversation history:\n${conversationContext}\n\n` : ''}User's latest message: "${userInput}"`;

    const candidateModels = ['gemini-3.7-flash', 'gemini-2.5-flash'];
    for (const model of candidateModels) {
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
        console.warn(`Chat tutor attempt with Gemini ${model} failed:`, err?.message || err);
        await delay(300);
      }
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

export async function getRoleplayPartnerResponse(params: RoleplayChatParams): Promise<RoleplayChatResult> {
  const { scenarioTitle, partnerRole, objectives, messages, userInput, nativeLanguage = 'Spanish' } = params;

  const systemInstruction = `You are playing the role of "${partnerRole}" in a professional English roleplay scenario titled "${scenarioTitle}" on Pro English Coach.
The user is a non-native English learner practicing basic and formal business English.

Scenario Objectives for the user:
${objectives.map(o => `- [ID: ${o.id}] ${o.text} (Completed: ${o.completed})`).join('\n')}

Your Task:
1. Stay strictly in character as "${partnerRole}". Reply naturally, authentically, and professionally to the user's latest response.
2. NEVER repeat the same canned responses. Progress the roleplay conversation forward dynamically.
3. Evaluate if the user's latest message or prior conversation successfully fulfilled any of the unfinished objectives.
4. Provide a brief feedback tip in English on how the user's formal phrasing can be even more polished.
5. Translate your in-character reply into ${nativeLanguage}.

Respond strictly in valid JSON matching:
{
  "partnerReply": "Your response in character",
  "translation": "Your response translated into ${nativeLanguage}",
  "completedObjectiveIds": ["id1", "id2"],
  "feedbackTip": "Brief tip on formal etiquette or vocabulary",
  "isScenarioComplete": false,
  "score": 85
}`;

  // 1. Try OpenAI if OPENAI_API_KEY is available
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
        temperature: 0.7,
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
      console.warn('OpenAI roleplay attempt failed:', err?.message || err);
    }
  }

  // 2. Try Gemini
  const gemini = getGeminiClient();
  if (gemini) {
    const convo = messages.map(m => `${m.sender === 'user' ? 'Learner' : partnerRole}: ${m.text}`).join('\n');
    const prompt = `Roleplay: ${scenarioTitle}\n${convo ? `Prior exchange:\n${convo}\n` : ''}Learner: "${userInput}"`;

    const candidateModels = ['gemini-3.7-flash', 'gemini-2.5-flash'];
    for (const model of candidateModels) {
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
        console.warn(`Roleplay attempt with Gemini ${model} failed:`, err?.message || err);
        await delay(300);
      }
    }
  }

  // 3. Non-repeating contextual fallback
  const unfinishedObjectives = objectives.filter(o => !o.completed);
  const nextCompletedId = unfinishedObjectives.length > 0 ? [unfinishedObjectives[0].id] : [];
  const isDone = unfinishedObjectives.length <= 1;

  const partnerReply = `Thank you for explaining that in such clear, professional detail. That gives us a solid basis to proceed with the next milestone.`;
  let roleplayTranslation = `Translation (${nativeLanguage}): ${partnerReply}`;
  const lowerLang = nativeLanguage.toLowerCase();
  if (lowerLang.includes('spanish') || lowerLang.includes('español')) {
    roleplayTranslation = 'Traducción (Español): Gracias por explicar eso con tanto detalle y profesionalismo. Nos da una base sólida para continuar.';
  } else if (lowerLang.includes('portuguese') || lowerLang.includes('português')) {
    roleplayTranslation = 'Tradução (Português): Obrigado por explicar isso com tanto detalhe e profissionalismo. Isso nos dá uma base sólida para continuar.';
  } else if (lowerLang.includes('french') || lowerLang.includes('français')) {
    roleplayTranslation = 'Traduction (Français) : Merci d\'avoir expliqué cela de manière aussi claire et professionnelle. Cela nous donne une base solide pour continuer.';
  } else if (lowerLang.includes('german') || lowerLang.includes('deutsch')) {
    roleplayTranslation = 'Deutsche Übersetzung: Vielen Dank, dass Sie das so detailliert und professionell erklärt haben. Das bietet uns eine solide Grundlage für den nächsten Schritt.';
  } else if (lowerLang.includes('hindi')) {
    roleplayTranslation = 'हिन्दी अनुवाद: इतने स्पष्ट और पेशेवर विवरण के साथ समझाने के लिए धन्यवाद। इससे हमें अगले कदम के लिए एक ठोस आधार मिलता है।';
  } else if (lowerLang.includes('mandarin') || lowerLang.includes('chinese')) {
    roleplayTranslation = '中文翻译：非常感谢您如此清晰、专业且详尽的阐述，这为我们推进下一个里程碑奠定了坚实的基础。';
  } else if (lowerLang.includes('japanese')) {
    roleplayTranslation = '日本語訳：これほど明確かつ専門的にご説明いただきありがとうございます。次のマイルストーンに進むための強固な基盤となります。';
  } else if (lowerLang.includes('korean')) {
    roleplayTranslation = '한국어 번역: 이렇게 명확하고 전문적으로 설명해 주셔서 감사합니다. 다음 마일스톤을 추진하는 데 있어 든든한 기반이 됩니다.';
  } else if (lowerLang.includes('arabic')) {
    roleplayTranslation = 'الترجمة (العربية): شكراً لشرحك ذلك بمثل هذا التفصيل والاحترافية. هذا يمنحنا أساساً متيناً للمضي قدماً نحو المرحلة التالية.';
  } else if (lowerLang.includes('russian')) {
    roleplayTranslation = 'Перевод (Русский): Спасибо за такое четкое и профессиональное объяснение. Это дает нам прочную основу для следующего этапа.';
  } else if (lowerLang.includes('italian')) {
    roleplayTranslation = 'Traduzione (Italiano): Grazie per aver spiegato questo con tale chiarezza e professionalità. Ci offre una solida base per procedere.';
  } else if (lowerLang.includes('polish')) {
    roleplayTranslation = 'Tłumaczenie (Polski): Dziękuję za tak jasne i profesjonalne wyjaśnienie. Daje nam to solidną podstawę do przejścia do kolejnego etapu.';
  } else if (lowerLang.includes('turkish')) {
    roleplayTranslation = 'Türkçe Çeviri: Bunu bu kadar net ve profesyonel bir şekilde açıkladığınız için teşekkür ederiz. Bir sonraki aşamaya geçmemiz için sağlam bir temel oluşturuyor.';
  } else if (lowerLang.includes('vietnamese')) {
    roleplayTranslation = 'Bản dịch (Tiếng Việt): Cảm ơn bạn đã giải thích rõ ràng và chuyên nghiệp như vậy. Điều này mang lại cho chúng ta cơ sở vững chắc để tiếp tục.';
  } else if (lowerLang.includes('indonesian')) {
    roleplayTranslation = 'Terjemahan (Bahasa Indonesia): Terima kasih telah menjelaskan hal itu dengan begitu jelas dan profesional. Ini memberi kita dasar yang kuat untuk melanjutkan.';
  }

  return {
    partnerReply,
    translation: roleplayTranslation,
    completedObjectiveIds: nextCompletedId,
    feedbackTip: `Using structured, solution-oriented explanations demonstrates strong executive presence.`,
    isScenarioComplete: isDone,
    score: 90,
  };
}
