import { Flashcard } from '../types';
import { translateText } from './translationService';
import { lookupDictionaryTranslation } from './translationsDict';

export interface StarterCardPack {
  id: string;
  title: string;
  description: string;
  icon: string;
  cards: Flashcard[];
}

export const BASIC_ENGLISH_TOPICS = [
  { id: 'supermarket', label: 'Supermarket & Shopping', icon: '🛒', prompt: 'Shopping at a supermarket, asking for items and prices' },
  { id: 'cafe', label: 'Café & Ordering Food', icon: '☕', prompt: 'Ordering coffee, pastries, and asking for the bill' },
  { id: 'greetings', label: 'Daily Greetings & Small Talk', icon: '👋', prompt: 'Saying hello, asking how someone is, and pleasant small talk' },
  { id: 'directions', label: 'Directions & Bus/Train', icon: '🗺️', prompt: 'Asking for directions, bus stop, and train station' },
  { id: 'doctor', label: 'Doctor & Pharmacy', icon: '🏥', prompt: 'Explaining a symptom and buying medicine at a pharmacy' },
  { id: 'work_basics', label: 'Simple Daily Work Tasks', icon: '💼', prompt: 'Talking to a coworker, asking for help, and taking a break' },
  { id: 'home_neighborhood', label: 'Home & Neighbors', icon: '🏠', prompt: 'Saying hello to neighbors and asking simple apartment questions' },
  { id: 'phone_call', label: 'Simple Phone Calls', icon: '📞', prompt: 'Answering the phone politely and asking to speak to someone' },
  { id: 'restaurant', label: 'Dining Out at a Restaurant', icon: '🍽️', prompt: 'Asking for a table for two, ordering water, and paying' },
  { id: 'emergency', label: 'Asking for Help & Safety', icon: '🆘', prompt: 'Asking someone for urgent help or calling assistance' },
];

/**
 * Pre-curated Basic English Starter Packs (App-Provided)
 */
export const PRESET_STARTER_PACKS: StarterCardPack[] = [
  {
    id: 'pack_supermarket',
    title: 'Supermarket & Grocery Basics',
    description: '5 everyday phrases for shopping, asking prices, and paying at checkout.',
    icon: '🛒',
    cards: [
      {
        id: 'pack_sm_1',
        category: 'Supermarket & Shopping',
        frontContext: 'Finding Items',
        front: 'How do you ask an employee where the eggs are?',
        backProfessional: 'Excuse me, where can I find the eggs?',
        backWhy: '"Excuse me" is polite, and "where can I find..." is natural and clear.',
        grammarNote: 'Use "Excuse me" before asking questions in public.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Excuse me, where can I find the eggs?', isCorrect: true, explanation: 'Polite, clear, and very natural basic English.' },
          { text: 'Where eggs? Give now.', isCorrect: false, explanation: 'Too aggressive and sounds demanding.' },
          { text: 'Eggs please where?', isCorrect: false, explanation: 'Incomplete sentence structure.' },
        ],
      },
      {
        id: 'pack_sm_2',
        category: 'Supermarket & Shopping',
        frontContext: 'Asking Prices',
        front: 'How do you ask how much an item costs?',
        backProfessional: 'How much is this, please?',
        backWhy: '"How much is this?" is the standard polite way to ask for a price.',
        grammarNote: 'Use "How much is this?" for singular items and "How much are these?" for plural items.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'How much is this, please?', isCorrect: true, explanation: 'Simple, direct, and very polite.' },
          { text: 'Price this thing now.', isCorrect: false, explanation: 'Sounds impolite and rude.' },
          { text: 'What money for it?', isCorrect: false, explanation: 'Unnatural phrasing. Say "How much is this?".' },
        ],
      },
      {
        id: 'pack_sm_3',
        category: 'Supermarket & Shopping',
        frontContext: 'Checkout Line',
        front: 'How do you tell the cashier you need a shopping bag?',
        backProfessional: 'Could I please have a bag?',
        backWhy: '"Could I please have..." is friendly and polite.',
        grammarNote: '"Could I have..." + item is the best phrase for requesting items.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Could I please have a bag?', isCorrect: true, explanation: 'Warm, polite, and standard English.' },
          { text: 'Bag me right now.', isCorrect: false, explanation: 'Too demanding.' },
          { text: 'Give bag to me.', isCorrect: false, explanation: 'Sounds blunt.' },
        ],
      },
      {
        id: 'pack_sm_4',
        category: 'Supermarket & Shopping',
        frontContext: 'Payment Method',
        front: 'How do you ask if you can pay with a credit card?',
        backProfessional: 'Do you accept credit cards?',
        backWhy: '"Do you accept..." is universal and easy for cashiers to understand.',
        grammarNote: 'Use "Do you accept card/cash?" at any store checkout.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Do you accept credit cards?', isCorrect: true, explanation: 'Accurate, polite, and standard checkout English.' },
          { text: 'Card take now?', isCorrect: false, explanation: 'Broken phrasing.' },
          { text: 'I pay card you agree?', isCorrect: false, explanation: 'Awkward wording. Say "Do you accept credit cards?".' },
        ],
      },
      {
        id: 'pack_sm_5',
        category: 'Supermarket & Shopping',
        frontContext: 'Leaving the Store',
        front: 'How do you say goodbye to the cashier politely after paying?',
        backProfessional: 'Thank you, have a great day!',
        backWhy: 'Leaves a friendly, positive impression and is very polite.',
        grammarNote: '"Have a great day" is widely used throughout English-speaking countries.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Thank you, have a great day!', isCorrect: true, explanation: 'Polite, friendly, and complete.' },
          { text: 'Okay bye.', isCorrect: false, explanation: 'A bit too dry and brief.' },
          { text: 'I am finished leaving.', isCorrect: false, explanation: 'Sounds robotic. Use "Thank you, have a great day!".' },
        ],
      },
    ],
  },
  {
    id: 'pack_cafe',
    title: 'Café & Coffee Shop Basics',
    description: '5 essential phrases to order your favorite coffee, snacks, and ask for the receipt.',
    icon: '☕',
    cards: [
      {
        id: 'pack_cf_1',
        category: 'Café & Food',
        frontContext: 'Ordering Coffee',
        front: 'How do you order a medium latte with oat milk politely?',
        backProfessional: 'Could I please get a medium latte with oat milk?',
        backWhy: '"Could I please get..." is the most common, polite everyday phrasing.',
        grammarNote: 'State the size first, then the drink, then special milk/syrup.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Could I please get a medium latte with oat milk?', isCorrect: true, explanation: 'Natural, polite, and clear order.' },
          { text: 'I want medium latte oat milk.', isCorrect: false, explanation: 'Too blunt without "please" or "could".' },
          { text: 'Make me latte quick.', isCorrect: false, explanation: 'Rude and impatient.' },
        ],
      },
      {
        id: 'pack_cf_2',
        category: 'Café & Food',
        frontContext: 'Dining In or To-Go',
        front: 'How do you say you want your drink to take away?',
        backProfessional: 'To go, please.',
        backWhy: '"To go, please" is short, standard, and crystal-clear.',
        grammarNote: 'In American English say "To go"; in British English say "Take away".',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'To go, please.', isCorrect: true, explanation: 'Standard, polite, and instantly understood.' },
          { text: 'I take away myself.', isCorrect: false, explanation: 'Unnecessarily complex.' },
          { text: 'Walking drink.', isCorrect: false, explanation: 'Incorrect idiom. Say "To go, please".' },
        ],
      },
      {
        id: 'pack_cf_3',
        category: 'Café & Food',
        frontContext: 'Asking for Water',
        front: 'How do you ask for a glass of tap water?',
        backProfessional: 'May I also have a glass of tap water, please?',
        backWhy: '"May I also have..." is respectful and gentle.',
        grammarNote: '"Tap water" means regular free drinking water from the faucet.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'May I also have a glass of tap water, please?', isCorrect: true, explanation: 'Polite and easy to understand.' },
          { text: 'Water here now.', isCorrect: false, explanation: 'Sounds rude.' },
          { text: 'Give water free.', isCorrect: false, explanation: 'Too demanding.' },
        ],
      },
      {
        id: 'pack_cf_4',
        category: 'Café & Food',
        frontContext: 'Wi-Fi Password',
        front: 'How do you ask for the café Wi-Fi password?',
        backProfessional: 'Excuse me, what is the Wi-Fi password?',
        backWhy: 'Simple, direct, and very polite.',
        grammarNote: 'Use "Excuse me, what is..." when asking for information.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Excuse me, what is the Wi-Fi password?', isCorrect: true, explanation: 'Standard polite question.' },
          { text: 'Wi-Fi code give me.', isCorrect: false, explanation: 'Sounds bossy.' },
          { text: 'How internet works here?', isCorrect: false, explanation: 'Ambiguous question.' },
        ],
      },
      {
        id: 'pack_cf_5',
        category: 'Café & Food',
        frontContext: 'Receipt',
        front: 'How do you ask for a receipt after paying?',
        backProfessional: 'Could I have a receipt, please?',
        backWhy: '"Receipt" has a silent "p" (/rɪˈsiːt/). The phrase is short and polite.',
        grammarNote: 'Pronounce receipt as "re-seet" (the "p" is completely silent).',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Could I have a receipt, please?', isCorrect: true, explanation: 'Clear, polite, and standard.' },
          { text: 'Print paper for money.', isCorrect: false, explanation: 'Awkward wording.' },
          { text: 'Bill paper now.', isCorrect: false, explanation: 'Too abrupt.' },
        ],
      },
    ],
  },
  {
    id: 'pack_directions',
    title: 'Directions & Public Transport Basics',
    description: '5 survival phrases for taking the bus, train, and finding places without getting lost.',
    icon: '🗺️',
    cards: [
      {
        id: 'pack_dir_1',
        category: 'Travel & Directions',
        frontContext: 'Finding the Station',
        front: 'How do you ask how to get to the train station?',
        backProfessional: 'Excuse me, how do I get to the train station?',
        backWhy: '"How do I get to..." is the most natural way to ask for directions.',
        grammarNote: '"How do I get to..." + place is the standard pattern for directions.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Excuse me, how do I get to the train station?', isCorrect: true, explanation: 'Natural, polite, and standard English.' },
          { text: 'Train station where go?', isCorrect: false, explanation: 'Broken grammar.' },
          { text: 'Point train station to me.', isCorrect: false, explanation: 'Sounds rude.' },
        ],
      },
      {
        id: 'pack_dir_2',
        category: 'Travel & Directions',
        frontContext: 'Bus Route',
        front: 'How do you ask the bus driver if this bus goes downtown?',
        backProfessional: 'Excuse me, does this bus go downtown?',
        backWhy: 'Clear yes/no question that the driver can answer immediately.',
        grammarNote: 'Use "Does this bus / train go to..." + destination.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Excuse me, does this bus go downtown?', isCorrect: true, explanation: 'Clear and easy for the driver to answer.' },
          { text: 'You drive downtown yes or no?', isCorrect: false, explanation: 'Sounds confrontational.' },
          { text: 'Downtown this bus?', isCorrect: false, explanation: 'Incomplete sentence.' },
        ],
      },
      {
        id: 'pack_dir_3',
        category: 'Travel & Directions',
        frontContext: 'Walking Distance',
        front: 'How do you ask if a place is within walking distance?',
        backProfessional: 'Is it far from here, or can I walk?',
        backWhy: 'Simple words that convey your exact meaning politely.',
        grammarNote: '"Can I walk?" or "Is it within walking distance?" are common phrasing.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Is it far from here, or can I walk?', isCorrect: true, explanation: 'Natural, friendly, and easy to understand.' },
          { text: 'How many kilometers leg walk?', isCorrect: false, explanation: 'Awkward phrasing.' },
          { text: 'Tell me meters now.', isCorrect: false, explanation: 'Too abrupt.' },
        ],
      },
      {
        id: 'pack_dir_4',
        category: 'Travel & Directions',
        frontContext: 'Ticket Machine',
        front: 'How do you ask someone for help using the ticket machine?',
        backProfessional: 'Excuse me, could you please help me with this machine?',
        backWhy: '"Could you please help me..." is respectful and encourages people to assist.',
        grammarNote: 'Use "Could you please help me with..." when stuck with machines.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Excuse me, could you please help me with this machine?', isCorrect: true, explanation: 'Polite, clear, and very courteous.' },
          { text: 'Press buttons for me.', isCorrect: false, explanation: 'Bossy and demanding.' },
          { text: 'Machine broke help.', isCorrect: false, explanation: 'Incomplete.' },
        ],
      },
      {
        id: 'pack_dir_5',
        category: 'Travel & Directions',
        frontContext: 'Thanking for Directions',
        front: 'How do you thank someone who gave you directions?',
        backProfessional: 'Thank you so much, I really appreciate your help!',
        backWhy: '"I appreciate your help" shows sincere gratitude.',
        grammarNote: '"I appreciate your help" is a high-impact phrase in everyday English.',
        level: 'Beginner',
        tier: 'free',
        options: [
          { text: 'Thank you so much, I really appreciate your help!', isCorrect: true, explanation: 'Warm, sincere, and perfectly polite.' },
          { text: 'Good. Bye.', isCorrect: false, explanation: 'Too cold and dismissive.' },
          { text: 'You gave words thanks.', isCorrect: false, explanation: 'Unnatural English.' },
        ],
      },
    ],
  },
];

/**
 * Generate Basic English Cards using backend API or local intelligent generator
 */
export async function generateBasicEnglishCards(
  topic: string,
  nativeLanguage: string = 'Spanish',
  count: number = 3
): Promise<Flashcard[]> {
  try {
    const res = await fetch('/api/generate-cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, nativeLanguage, count }),
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.cards) && data.cards.length > 0) {
        return data.cards.map((c: any) => ({
          ...c,
          level: 'Beginner',
          tier: 'free',
          isCustom: true,
        }));
      }
    }
  } catch (err) {
    console.warn('Backend card generator offline or delayed. Using local generator fallback.', err);
  }

  // Local fallback generator if network or API fails
  const matchedPreset = PRESET_STARTER_PACKS.find(p => 
    p.title.toLowerCase().includes(topic.toLowerCase()) || 
    p.id.toLowerCase().includes(topic.toLowerCase())
  );

  if (matchedPreset) {
    return matchedPreset.cards.slice(0, count).map(c => {
      const dictHit = lookupDictionaryTranslation(c.backProfessional, nativeLanguage);
      return {
        ...c,
        id: `gen_preset_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        backTranslation: dictHit || undefined,
        isCustom: true,
      };
    });
  }

  // Dynamic synthesized card
  const promptTranslation = await translateText(topic, nativeLanguage);
  
  let genericTranslation = `Translation in ${nativeLanguage}`;
  if (nativeLanguage.toLowerCase().includes('span')) {
    genericTranslation = promptTranslation ? `Disculpe, ¿podría ayudarme con ${promptTranslation}?` : 'Disculpe, ¿podría ayudarme?';
  } else if (nativeLanguage.toLowerCase().includes('zulu')) {
    genericTranslation = promptTranslation ? `Uxolo, ungangisiza nge ${promptTranslation}?` : 'Uxolo, ungangisiza?';
  } else if (nativeLanguage.toLowerCase().includes('xhosa')) {
    genericTranslation = promptTranslation ? `Ndicela uxolo, ungandinceda nge ${promptTranslation}?` : 'Ndicela uxolo, ungandinceda?';
  } else if (promptTranslation) {
    genericTranslation = `[${nativeLanguage}]: Excuse me, could you please help me with ${promptTranslation}?`;
  }

  return [
    {
      id: `gen_dyn_${Date.now()}_1`,
      category: topic,
      frontContext: topic,
      front: `How do you speak politely about "${topic}" in everyday English?`,
      backProfessional: `Excuse me, could you please help me with ${topic.toLowerCase()}?`,
      backWhy: '"Could you please help me with..." is simple, polite, and universally understood.',
      backTranslation: genericTranslation,
      grammarNote: 'Always use "Could you please..." for polite everyday requests.',
      level: 'Beginner',
      tier: 'free',
      isCustom: true,
      options: [
        { text: `Excuse me, could you please help me with ${topic.toLowerCase()}?`, isCorrect: true, explanation: 'Polite, clear, and natural basic English.' },
        { text: `Give me ${topic.toLowerCase()} right now.`, isCorrect: false, explanation: 'Too aggressive and demanding.' },
        { text: `I want talk ${topic.toLowerCase()}.`, isCorrect: false, explanation: 'Incomplete sentence structure.' },
      ],
    },
  ];
}
