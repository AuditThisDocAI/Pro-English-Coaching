import { GoogleGenAI } from '@google/genai';
import { StudyPlanItem } from '../src/types';

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const RICH_STUDY_TOPICS = [
  { topic: 'Ordering Coffee & Snacks', desc: 'Practice polite ordering, customizing milk/sugar, and paying at a cafe.' },
  { topic: 'Supermarket & Groceries', desc: 'Ask where items are, inquire about prices, and check out smoothly.' },
  { topic: 'Friendly Greetings & Small Talk', desc: 'Break the ice with neighbors, coworkers, and strangers with confidence.' },
  { topic: 'Asking for Directions', desc: 'Understand maps, turns, landmarks, and public transit directions.' },
  { topic: 'Doctor & Pharmacy Visits', desc: 'Describe symptoms, understand medication dosages, and ask for help.' },
  { topic: 'Workplace Email & Updates', desc: 'Draft courteous status updates, confirm meetings, and follow up politely.' },
  { topic: 'Dining Out at a Restaurant', desc: 'Reserve a table, ask for recommendations, and request the bill courteously.' },
  { topic: 'Public Transit & Commuting', desc: 'Buy train tickets, ask about bus stops, and navigate delays easily.' },
  { topic: 'Talking About Hobbies & Weekends', desc: 'Share your favorite movies, music, outdoor activities, and pastimes.' },
  { topic: 'Phone Calls & Voicemails', desc: 'Introduce yourself clearly on the phone and leave professional messages.' },
  { topic: 'Expressing Opinions Politely', desc: 'Agree, respectfully disagree, and offer constructive alternative ideas.' },
  { topic: 'Job Interview Introductions', desc: 'Deliver an engaging 60-second summary of your career and skills.' },
  { topic: 'Hotel Check-In & Travel Needs', desc: 'Inquire about breakfast, request room amenities, and check out.' },
  { topic: 'Making Plans with Friends', desc: 'Suggest weekend outings, propose times, and confirm meeting spots.' },
  { topic: 'Returning Items & Customer Support', desc: 'Explain a receipt issue, exchange sizes, and ask for refunds politely.' },
  { topic: 'Weather & Daily Chit-Chat', desc: 'Discuss the forecast, seasons, and daily observations with ease.' },
  { topic: 'Job Interview Behavioral Questions', desc: 'Structure answers using the STAR method for teamwork and challenges.' },
  { topic: 'Describing Your Family & Home', desc: 'Talk about your family members, hometown, and daily household life.' },
  { topic: 'Airport & Flight Travel', desc: 'Find your gate, talk to flight attendants, and clear customs smoothly.' },
  { topic: 'Banking & Financial Inquiries', desc: 'Open accounts, ask about transfer fees, and verify statements.' },
];

export async function generateStudyPlan(options: {
  count: number;
  nativeLanguage: string;
  level: string;
}): Promise<StudyPlanItem[]> {
  const { count, nativeLanguage, level } = options;
  const safeCount = Math.min(Math.max(count || 3, 1), 200);
  const ai = getGeminiClient();

  if (ai) {
    const requestedBatch = Math.min(safeCount, 30);
    const systemPrompt = `You are an expert English learning coach. 
Generate a personalized study plan for a student whose native language is ${nativeLanguage} and their English level is ${level}.
You must return exactly a JSON array containing ${requestedBatch} objects, with no markdown formatting or extra text.
Each object must match this schema:
{
  "dayNumber": number,
  "title": "Short title of the day's topic (e.g. Ordering Coffee)",
  "description": "Short explanation of what the student will learn or practice.",
  "durationMins": number (between 10 and 25),
  "topic": "Topic category name"
}
Ensure progressive difficulty and diverse everyday scenarios.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: systemPrompt,
        config: {
          temperature: 0.7,
          responseMimeType: 'application/json',
        }
      });
      
      if (response.text) {
        let rawText = response.text || '';
        rawText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(rawText);
        
        if (Array.isArray(parsed) && parsed.length > 0) {
          const aiPlans: StudyPlanItem[] = [];
          for (let i = 0; i < safeCount; i++) {
            const template = parsed[i % parsed.length];
            const cycle = Math.floor(i / parsed.length);
            aiPlans.push({
              id: `plan_${Date.now()}_${i + 1}`,
              dayNumber: i + 1,
              title: cycle === 0 ? template.title : `${template.title} (Part ${cycle + 1})`,
              description: template.description || 'Practice conversational English with confidence.',
              durationMins: template.durationMins || 15,
              completed: false,
              topic: template.topic || 'Everyday Life'
            });
          }
          return aiPlans;
        }
      }
    } catch (error) {
      console.warn('Error generating study plan with AI, using curated roadmap:', error);
    }
  }
  
  // High-yield curated fallback roadmap supporting up to 200 distinct days
  return Array.from({ length: safeCount }).map((_, i) => {
    const topicIdx = i % RICH_STUDY_TOPICS.length;
    const topicItem = RICH_STUDY_TOPICS[topicIdx];
    const cycle = Math.floor(i / RICH_STUDY_TOPICS.length);
    const titleSuffix = cycle > 0 ? ` - Mastery Vol. ${cycle + 1}` : '';

    return {
      id: `plan_${Date.now()}_${i + 1}`,
      dayNumber: i + 1,
      title: `Day ${i + 1}: ${topicItem.topic}${titleSuffix}`,
      description: topicItem.desc,
      durationMins: 15,
      completed: false,
      topic: topicItem.topic
    };
  });
}
