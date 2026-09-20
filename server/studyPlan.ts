import { GoogleGenAI } from '@google/genai';
import { StudyPlanItem } from '../src/types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateStudyPlan(options: {
  count: number;
  nativeLanguage: string;
  level: string;
}): Promise<StudyPlanItem[]> {
  const { count, nativeLanguage, level } = options;
  
  const systemPrompt = `You are an expert English learning coach. 
Generate a personalized study plan for a student whose native language is ${nativeLanguage} and their English level is ${level}.
You must return exactly a JSON array containing ${count} objects, with no markdown formatting or extra text.
Each object must match this schema:
{
  "dayNumber": number,
  "title": "Short title of the day's topic (e.g. Ordering Coffee)",
  "description": "Short explanation of what the student will learn or practice.",
  "durationMins": number (between 5 and 30),
  "topic": "A string mapping to one of the basic topics (e.g. 'cafe', 'supermarket', 'greetings', 'directions', 'doctor', 'work_basics')"
}
Make sure topics progress logically.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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
      
      if (Array.isArray(parsed)) {
        return parsed.map((item, idx) => ({
          id: `plan_${Date.now()}_${idx}`,
          dayNumber: item.dayNumber || (idx + 1),
          title: item.title || `Day ${idx + 1}`,
          description: item.description || '',
          durationMins: item.durationMins || 15,
          completed: false,
          topic: item.topic || 'Everyday Life'
        }));
      }
    }
  } catch (error) {
    console.error('Error generating study plan with AI:', error);
  }
  
  // Fallback if AI fails
  return Array.from({length: count}).map((_, i) => ({
    id: `plan_${Date.now()}_${i}`,
    dayNumber: i + 1,
    title: `Day ${i + 1}: General Practice`,
    description: `Continue practicing everyday English.`,
    durationMins: 15,
    completed: false,
    topic: 'Everyday Life'
  }));
}
