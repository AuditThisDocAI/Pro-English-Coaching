import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `Translate the following phrase into natural, everyday Xhosa. If the input is in a non-English language and targetLanguage is English, translate it into natural conversational English. Return only the exact translation without quotation marks or commentary:\n\n"Good morning, how are you?"`
  });
  console.log("Xhosa:", response.text);
}
test();
