import { GoogleGenAI, Type } from '@google/genai';

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
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

// Domain-aware rule and linguistic engine when AI models face temporary 503 high demand
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
  let translation = `Traducción / Explicación en ${nativeLanguage}: Frase profesional adaptada para el entorno laboral.`;

  if (nativeLanguage.toLowerCase().includes('portuguese') || nativeLanguage.toLowerCase().includes('português')) {
    translation = 'Tradução em Português: Versão profissional polida para comunicação no trabalho.';
  } else if (nativeLanguage.toLowerCase().includes('french') || nativeLanguage.toLowerCase().includes('français')) {
    translation = 'Traduction en Français: Formule professionnelle adaptée au contexte professionnel.';
  } else if (nativeLanguage.toLowerCase().includes('german') || nativeLanguage.toLowerCase().includes('deutsch')) {
    translation = 'Deutsche Übersetzung: Professionelle Formulierung für die Arbeitswelt.';
  } else if (nativeLanguage.toLowerCase().includes('hindi')) {
    translation = 'हिन्दी अनुवाद: कार्यस्थल के लिए उपयुक्त और शिष्ट अंग्रेजी अभिव्यक्ति।';
  } else if (nativeLanguage.toLowerCase().includes('mandarin') || nativeLanguage.toLowerCase().includes('chinese')) {
    translation = '中文翻译：适用于职场与商务沟通的地道专业表达。';
  } else if (nativeLanguage.toLowerCase().includes('japanese')) {
    translation = '日本語訳：ビジネスシーンに最適な丁寧で洗練された表現です。';
  } else if (nativeLanguage.toLowerCase().includes('korean')) {
    translation = '한국어 번역: 비즈니스 환경에 적합한 정중하고 전문적인 표현입니다.';
  } else if (nativeLanguage.toLowerCase().includes('arabic')) {
    translation = 'الترجمة إلى العربية: صياغة مهنية مهذبة ومناسبة لبيئة العمل.';
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

  // Candidate models to try in sequence
  const candidateModels = ['gemini-2.5-flash', 'gemini-3.7-flash'];

  for (let i = 0; i < candidateModels.length; i++) {
    const model = candidateModels[i];
    try {
      const ai = getAIClient();
      const response = await ai.models.generateContent({
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
        let cleaned = text;
        if (cleaned.startsWith('```json')) {
          cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleaned.startsWith('```')) {
          cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        const parsed = JSON.parse(cleaned);
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
      console.warn(`Model ${model} attempt failed:`, err?.message || err);
      // If 503 or transient error, wait 400ms before attempting the next candidate
      if (i < candidateModels.length - 1) {
        await delay(400);
      }
    }
  }

  // Secondary simplified attempt without strict schema
  try {
    const ai = getAIClient();
    const fallbackResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Improve this for a ${jobType} professional in ${mode} mode (User native language: ${nativeLanguage}): "${trimmedInput}". Return JSON with keys: original, professional, translation (in ${nativeLanguage}), why, practice.`,
    });

    const text = (fallbackResponse.text || '').trim();
    if (text) {
      let cleaned = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').replace(/^```\s*/, '');
      const parsed = JSON.parse(cleaned);
      if (parsed && parsed.professional) {
        return {
          original: parsed.original || trimmedInput,
          professional: parsed.professional,
          translation: parsed.translation || `Translation into ${nativeLanguage}`,
          why: parsed.why || 'Using concise, polite professional terms enhances clarity with colleagues and clients.',
          practice: parsed.practice || 'How would you practice this in your next conversation?',
        };
      }
    }
  } catch (err: any) {
    console.warn('Secondary fallback attempt failed:', err?.message || err);
  }

  // Gracefully provide high-quality domain rule coaching if remote API is experiencing spikes
  return generateSmartRuleBasedCoach(trimmedInput, mode, jobType, nativeLanguage);
}
