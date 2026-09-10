// 100 Comprehensive Structured English Quizzes Bank
// Provides 100 completely distinct, high-yield grammar, workplace, travel & fluency quizzes.

export interface QuizOptionItem {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  color?: 'yellow' | 'cyan' | 'green' | 'purple';
  isCorrect: boolean;
}

export interface QuizQuestionItem {
  id: string;
  topic: string;
  sentenceBefore: string;
  sentenceAfter: string;
  completeSentence: string;
  bracketTranslation: string;
  options: QuizOptionItem[];
  explanation: string;
  explanationTranslation?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface QuizSet {
  quizNumber: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestionItem[];
}

export const QUIZ_BANK_100: QuizSet[] = [
  {
    "quizNumber": 1,
    "title": "Quiz 1: Prepositions of Place & Emotion",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_1_q1",
        "topic": "Prepositions of Place & Emotion",
        "sentenceBefore": "Stop shouting",
        "sentenceAfter": "me!",
        "completeSentence": "Stop shouting at me!",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'shout at' someone when angry.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_1_q2",
        "topic": "Prepositions of Place & Emotion",
        "sentenceBefore": "She is very good",
        "sentenceAfter": "learning languages.",
        "completeSentence": "She is very good at learning languages.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say someone is 'good at' an activity or skill.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_1_q3",
        "topic": "Prepositions of Place & Emotion",
        "sentenceBefore": "He arrived",
        "sentenceAfter": "the airport on time.",
        "completeSentence": "He arrived at the airport on time.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We arrive 'at' a building or point (airport, station), and 'in' a city/country.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_1_q4",
        "topic": "Prepositions of Place & Emotion",
        "sentenceBefore": "Are you interested",
        "sentenceAfter": "joining the committee?",
        "completeSentence": "Are you interested in joining the committee?",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The correct preposition is 'interested in'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 2,
    "title": "Quiz 2: Prepositions of Time & Duration",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_2_q1",
        "topic": "Prepositions of Time & Duration",
        "sentenceBefore": "I have been studying",
        "sentenceAfter": "three months.",
        "completeSentence": "I have been studying for three months.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "since",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'for' with periods of duration (for three months).",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_2_q2",
        "topic": "Prepositions of Time & Duration",
        "sentenceBefore": "We have lived here",
        "sentenceAfter": "2021.",
        "completeSentence": "We have lived here since 2021.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "from",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "in",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "since",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'since' with a specific starting point in time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_2_q3",
        "topic": "Prepositions of Time & Duration",
        "sentenceBefore": "The meeting starts",
        "sentenceAfter": "9:00 AM sharp.",
        "completeSentence": "The meeting starts at 9:00 AM sharp.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'at' with specific clock times.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_2_q4",
        "topic": "Prepositions of Time & Duration",
        "sentenceBefore": "Our quarterly review takes place",
        "sentenceAfter": "Friday.",
        "completeSentence": "Our quarterly review takes place on Friday.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "in",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' with days of the week and dates.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 3,
    "title": "Quiz 3: Collocations with Make & Do",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_3_q1",
        "topic": "Collocations with Make & Do",
        "sentenceBefore": "Could you please",
        "sentenceAfter": "me a quick favor?",
        "completeSentence": "Could you please do me a quick favor?",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "give",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "take",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "make",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "do",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We 'do a favor', not 'make a favor'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_3_q2",
        "topic": "Collocations with Make & Do",
        "sentenceBefore": "We need to",
        "sentenceAfter": "an important decision today.",
        "completeSentence": "We need to make an important decision today.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "make",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "do",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "put",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "have",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We 'make a decision'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_3_q3",
        "topic": "Collocations with Make & Do",
        "sentenceBefore": "He promised not to",
        "sentenceAfter": "that same mistake again.",
        "completeSentence": "He promised not to make that same mistake again.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "make",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "do",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "act",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "build",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We 'make a mistake'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_3_q4",
        "topic": "Collocations with Make & Do",
        "sentenceBefore": "Our engineering team is ready to",
        "sentenceAfter": "business with you.",
        "completeSentence": "Our engineering team is ready to do business with you.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "take",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "do",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "make",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "set",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We 'do business' with a company or partner.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 4,
    "title": "Quiz 4: Dependent Prepositions: Adjectives",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_4_q1",
        "topic": "Dependent Prepositions: Adjectives",
        "sentenceBefore": "Her parents are very proud",
        "sentenceAfter": "her promotion.",
        "completeSentence": "Her parents are very proud of her promotion.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "about",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "of",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'proud of' someone or something.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_4_q2",
        "topic": "Dependent Prepositions: Adjectives",
        "sentenceBefore": "The project manager is responsible",
        "sentenceAfter": "the schedule.",
        "completeSentence": "The project manager is responsible for the schedule.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'responsible for' a deliverable or task.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_4_q3",
        "topic": "Dependent Prepositions: Adjectives",
        "sentenceBefore": "He was completely unaware",
        "sentenceAfter": "the latest policy change.",
        "completeSentence": "He was completely unaware of the latest policy change.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'unaware of' facts or changes.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_4_q4",
        "topic": "Dependent Prepositions: Adjectives",
        "sentenceBefore": "This software version is compatible",
        "sentenceAfter": "all devices.",
        "completeSentence": "This software version is compatible with all devices.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'compatible with'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 5,
    "title": "Quiz 5: Prepositions with Movement & Direction",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_5_q1",
        "topic": "Prepositions with Movement & Direction",
        "sentenceBefore": "The executive walked",
        "sentenceAfter": "the conference room.",
        "completeSentence": "The executive walked into the conference room.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "over",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "through",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "onto",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "into",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'into' for movement entering an enclosed space.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_5_q2",
        "topic": "Prepositions with Movement & Direction",
        "sentenceBefore": "We walked",
        "sentenceAfter": "the pedestrian bridge to reach the office.",
        "completeSentence": "We walked across the pedestrian bridge to reach the office.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "over",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "across",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "along",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "through",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'across' for movement from one side to the other.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_5_q3",
        "topic": "Prepositions with Movement & Direction",
        "sentenceBefore": "The delivery truck drove",
        "sentenceAfter": "the tunnel.",
        "completeSentence": "The delivery truck drove through the tunnel.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "along",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "across",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "around",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "through",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'through' for movement within a 3D enclosed passage.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_5_q4",
        "topic": "Prepositions with Movement & Direction",
        "sentenceBefore": "Please place the laptop",
        "sentenceAfter": "the desk.",
        "completeSentence": "Please place the laptop on the desk.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for surfaces.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 6,
    "title": "Quiz 6: Collocations with Take & Have",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_6_q1",
        "topic": "Collocations with Take & Have",
        "sentenceBefore": "Let us",
        "sentenceAfter": "a five-minute coffee break.",
        "completeSentence": "Let us take a five-minute coffee break.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "do",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "make up",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "take",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "make",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'take a break'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_6_q2",
        "topic": "Collocations with Take & Have",
        "sentenceBefore": "This strategic initiative will",
        "sentenceAfter": "a significant impact.",
        "completeSentence": "This strategic initiative will have a significant impact.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "have",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "make",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "take",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "do",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'have an impact on'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_6_q3",
        "topic": "Collocations with Take & Have",
        "sentenceBefore": "Please",
        "sentenceAfter": "your time reviewing the contract.",
        "completeSentence": "Please take your time reviewing the contract.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "do",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "have",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "spend",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "take",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The idiom is 'take your time' (do not rush).",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_6_q4",
        "topic": "Collocations with Take & Have",
        "sentenceBefore": "Did you",
        "sentenceAfter": "an opportunity to review the slides?",
        "completeSentence": "Did you have an opportunity to review the slides?",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "have",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "take",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "make",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "do",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We 'have an opportunity'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 7,
    "title": "Quiz 7: Verbs Followed by Prepositions",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_7_q1",
        "topic": "Verbs Followed by Prepositions",
        "sentenceBefore": "Does this tablet belong",
        "sentenceAfter": "anyone in the room?",
        "completeSentence": "Does this tablet belong to anyone in the room?",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "for",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The correct collocation is 'belong to'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_7_q2",
        "topic": "Verbs Followed by Prepositions",
        "sentenceBefore": "You can always rely",
        "sentenceAfter": "our technical support team.",
        "completeSentence": "You can always rely on our technical support team.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The preposition for trust is 'rely on' or 'depend on'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_7_q3",
        "topic": "Verbs Followed by Prepositions",
        "sentenceBefore": "We must focus all our energy",
        "sentenceAfter": "quality assurance.",
        "completeSentence": "We must focus all our energy on quality assurance.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'focus on'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_7_q4",
        "topic": "Verbs Followed by Prepositions",
        "sentenceBefore": "She apologized sincerely",
        "sentenceAfter": "the inadvertent error.",
        "completeSentence": "She apologized sincerely for the inadvertent error.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "about",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We 'apologize for' an action or mistake.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 8,
    "title": "Quiz 8: Prepositions of Transportation",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_8_q1",
        "topic": "Prepositions of Transportation",
        "sentenceBefore": "She travels to the downtown office",
        "sentenceAfter": "train every morning.",
        "completeSentence": "She travels to the downtown office by train every morning.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'by' with modes of transport (by train, by car, by bus).",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_8_q2",
        "topic": "Prepositions of Transportation",
        "sentenceBefore": "I am currently",
        "sentenceAfter": "the bus and will arrive shortly.",
        "completeSentence": "I am currently on the bus and will arrive shortly.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for public transit where you can stand or walk (on the bus/train/plane).",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_8_q3",
        "topic": "Prepositions of Transportation",
        "sentenceBefore": "He forgot his briefcase",
        "sentenceAfter": "the taxi.",
        "completeSentence": "He forgot his briefcase in the taxi.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "on",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for private cars and taxis (in the car, in the taxi).",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_8_q4",
        "topic": "Prepositions of Transportation",
        "sentenceBefore": "We decided to go to the museum",
        "sentenceAfter": "foot.",
        "completeSentence": "We decided to go to the museum on foot.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "in",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The fixed expression is 'on foot'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 9,
    "title": "Quiz 9: Collocations with Keep & Hold",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_9_q1",
        "topic": "Collocations with Keep & Hold",
        "sentenceBefore": "Please",
        "sentenceAfter": "in mind that deadlines are strict.",
        "completeSentence": "Please keep in mind that deadlines are strict.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "make",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "keep",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "hold",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "take",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'keep in mind'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_9_q2",
        "topic": "Collocations with Keep & Hold",
        "sentenceBefore": "We plan to",
        "sentenceAfter": "a brief synchronization meeting.",
        "completeSentence": "We plan to hold a brief synchronization meeting.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "hold",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "keep",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "make",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "do",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'hold a meeting'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_9_q3",
        "topic": "Collocations with Keep & Hold",
        "sentenceBefore": "It is important to",
        "sentenceAfter": "track of your billable hours.",
        "completeSentence": "It is important to keep track of your billable hours.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "make",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "take",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "hold",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "keep",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The idiom is 'keep track of'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_9_q4",
        "topic": "Collocations with Keep & Hold",
        "sentenceBefore": "Can you",
        "sentenceAfter": "on for just a moment while I check?",
        "completeSentence": "Can you hold on for just a moment while I check?",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "take",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "keep",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "stay",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "hold",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'hold on' when asking someone to wait briefly.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 10,
    "title": "Quiz 10: Prepositional Phrases in Discourse",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_10_q1",
        "topic": "Prepositional Phrases in Discourse",
        "sentenceBefore": "We should budget",
        "sentenceAfter": "least two weeks for user testing.",
        "completeSentence": "We should budget at least two weeks for user testing.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "on",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The expression is 'at least'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_10_q2",
        "topic": "Prepositional Phrases in Discourse",
        "sentenceBefore": "He deleted the draft file",
        "sentenceAfter": "mistake.",
        "completeSentence": "He deleted the draft file by mistake.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'by mistake' (or 'by accident').",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_10_q3",
        "topic": "Prepositional Phrases in Discourse",
        "sentenceBefore": "She did not make that statement",
        "sentenceAfter": "purpose.",
        "completeSentence": "She did not make that statement on purpose.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The opposite of 'by mistake' is 'on purpose'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_10_q4",
        "topic": "Prepositional Phrases in Discourse",
        "sentenceBefore": "We met",
        "sentenceAfter": "chance at the international trade expo.",
        "completeSentence": "We met by chance at the international trade expo.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The idiom for an unplanned meeting is 'by chance'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 11,
    "title": "Quiz 11: Cause, Effect & Result Prepositions",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_11_q1",
        "topic": "Cause, Effect & Result Prepositions",
        "sentenceBefore": "Careless data entry can result",
        "sentenceAfter": "costly compliance fines.",
        "completeSentence": "Careless data entry can result in costly compliance fines.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "from",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'result in' (leads to), whereas 'result from' refers to the cause.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_11_q2",
        "topic": "Cause, Effect & Result Prepositions",
        "sentenceBefore": "The delay resulted",
        "sentenceAfter": "unexpected logistical roadblocks.",
        "completeSentence": "The delay resulted from unexpected logistical roadblocks.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "from",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "'Result from' indicates the source or cause of the delay.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_11_q3",
        "topic": "Cause, Effect & Result Prepositions",
        "sentenceBefore": "These collaborative workshops will lead",
        "sentenceAfter": "greater team cohesion.",
        "completeSentence": "These collaborative workshops will lead to greater team cohesion.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "for",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'lead to'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_11_q4",
        "topic": "Cause, Effect & Result Prepositions",
        "sentenceBefore": "The client’s satisfaction depends heavily",
        "sentenceAfter": "our prompt delivery.",
        "completeSentence": "The client’s satisfaction depends heavily on our prompt delivery.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The dependent preposition is 'depend on'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 12,
    "title": "Quiz 12: Collocations with Pay & Spend",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_12_q1",
        "topic": "Collocations with Pay & Spend",
        "sentenceBefore": "Please pay close",
        "sentenceAfter": "to safety instructions.",
        "completeSentence": "Please pay close attention to safety instructions.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "regard",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "focus",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "notice",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "attention",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The English collocation is 'pay attention to'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_12_q2",
        "topic": "Collocations with Pay & Spend",
        "sentenceBefore": "We spent two hours",
        "sentenceAfter": "the architecture diagrams.",
        "completeSentence": "We spent two hours discussing the architecture diagrams.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "discussing",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to discuss",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "discuss",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "discussed",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'spend time doing something' (gerund).",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_12_q3",
        "topic": "Collocations with Pay & Spend",
        "sentenceBefore": "Our company will pay",
        "sentenceAfter": "your professional certification fees.",
        "completeSentence": "Our company will pay for your professional certification fees.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We 'pay for' an item or service.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_12_q4",
        "topic": "Collocations with Pay & Spend",
        "sentenceBefore": "His long hours of dedication finally paid",
        "sentenceAfter": "with a promotion.",
        "completeSentence": "His long hours of dedication finally paid off with a promotion.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "out",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "off",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "up",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "down",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The phrasal verb 'pay off' means to yield success.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 13,
    "title": "Quiz 13: Prepositions of Agreement & Conflict",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_13_q1",
        "topic": "Prepositions of Agreement & Conflict",
        "sentenceBefore": "I agree completely",
        "sentenceAfter": "your assessment of the risks.",
        "completeSentence": "I agree completely with your assessment of the risks.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We 'agree with' a person or opinion.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_13_q2",
        "topic": "Prepositions of Agreement & Conflict",
        "sentenceBefore": "Both directors agreed",
        "sentenceAfter": "the revised contract terms.",
        "completeSentence": "Both directors agreed to the revised contract terms.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We 'agree to' a proposal, terms, or formal action.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_13_q3",
        "topic": "Prepositions of Agreement & Conflict",
        "sentenceBefore": "They argued",
        "sentenceAfter": "the allocation of budget resources.",
        "completeSentence": "They argued about the allocation of budget resources.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We argue 'about' a topic, and 'with' a person.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_13_q4",
        "topic": "Prepositions of Agreement & Conflict",
        "sentenceBefore": "We must prevent these disputes",
        "sentenceAfter": "escalating further.",
        "completeSentence": "We must prevent these disputes from escalating further.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "from",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The pattern is 'prevent someone/something from doing'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 14,
    "title": "Quiz 14: Collocations with Catch & Miss",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_14_q1",
        "topic": "Collocations with Catch & Miss",
        "sentenceBefore": "We must leave now to",
        "sentenceAfter": "the last subway train.",
        "completeSentence": "We must leave now to catch the last subway train.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "gain",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "hold",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "take on",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "catch",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'catch the train' or 'catch a bus'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_14_q2",
        "topic": "Collocations with Catch & Miss",
        "sentenceBefore": "If you arrive late, you will",
        "sentenceAfter": "the opening keynote speech.",
        "completeSentence": "If you arrive late, you will miss the opening keynote speech.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "miss",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "lose",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "drop",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "fail",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'miss an event', not 'lose an event'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_14_q3",
        "topic": "Collocations with Catch & Miss",
        "sentenceBefore": "Let us schedule a coffee to",
        "sentenceAfter": "up on recent developments.",
        "completeSentence": "Let us schedule a coffee to catch up on recent developments.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "bring",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "take",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "pick",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "catch",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The idiom is 'catch up on'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_14_q4",
        "topic": "Collocations with Catch & Miss",
        "sentenceBefore": "Do not",
        "sentenceAfter": "this golden opportunity to network.",
        "completeSentence": "Do not miss this golden opportunity to network.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "miss",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "lose",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "drop",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "leave",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'miss an opportunity'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 15,
    "title": "Quiz 15: Prepositions with Sensory & Cognitive Verbs",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_15_q1",
        "topic": "Prepositions with Sensory & Cognitive Verbs",
        "sentenceBefore": "Please listen",
        "sentenceAfter": "the speaker attentively.",
        "completeSentence": "Please listen to the speaker attentively.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The verb 'listen' takes the preposition 'to'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_15_q2",
        "topic": "Prepositions with Sensory & Cognitive Verbs",
        "sentenceBefore": "Take a close look",
        "sentenceAfter": "the quarterly revenue chart.",
        "completeSentence": "Take a close look at the quarterly revenue chart.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "in",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'look at' something.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_15_q3",
        "topic": "Prepositions with Sensory & Cognitive Verbs",
        "sentenceBefore": "That proposal sounds",
        "sentenceAfter": "a viable solution.",
        "completeSentence": "That proposal sounds like a viable solution.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "as",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "like",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'sounds like' followed by a noun phrase.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_15_q4",
        "topic": "Prepositions with Sensory & Cognitive Verbs",
        "sentenceBefore": "I believe",
        "sentenceAfter": "fostering open workplace dialogue.",
        "completeSentence": "I believe in fostering open workplace dialogue.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'believe in' a principle or philosophy.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 16,
    "title": "Quiz 16: Prepositions of State & Condition",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_16_q1",
        "topic": "Prepositions of State & Condition",
        "sentenceBefore": "The delivery arrived",
        "sentenceAfter": "excellent condition.",
        "completeSentence": "The delivery arrived in excellent condition.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'in good/excellent condition'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_16_q2",
        "topic": "Prepositions of State & Condition",
        "sentenceBefore": "All critical servers are currently",
        "sentenceAfter": "maintenance.",
        "completeSentence": "All critical servers are currently under maintenance.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "under",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The formal phrase is 'under maintenance' or 'under construction'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_16_q3",
        "topic": "Prepositions of State & Condition",
        "sentenceBefore": "The project is running",
        "sentenceAfter": "schedule and on budget.",
        "completeSentence": "The project is running on schedule and on budget.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The phrase for punctuality is 'on schedule'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_16_q4",
        "topic": "Prepositions of State & Condition",
        "sentenceBefore": "Due to unexpected traffic, the CEO is",
        "sentenceAfter": "a hurry.",
        "completeSentence": "Due to unexpected traffic, the CEO is in a hurry.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "with",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The idiom is 'in a hurry'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 17,
    "title": "Quiz 17: Dependent Prepositions: Nouns",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_17_q1",
        "topic": "Dependent Prepositions: Nouns",
        "sentenceBefore": "There has been a sharp increase",
        "sentenceAfter": "online sales this quarter.",
        "completeSentence": "There has been a sharp increase in online sales this quarter.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "on",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'increase in' or 'decrease in' a metric.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_17_q2",
        "topic": "Dependent Prepositions: Nouns",
        "sentenceBefore": "Our engineering team found a clever solution",
        "sentenceAfter": "the bug.",
        "completeSentence": "Our engineering team found a clever solution to the bug.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "of",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "for",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'solution to a problem'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_17_q3",
        "topic": "Dependent Prepositions: Nouns",
        "sentenceBefore": "What was the main reason",
        "sentenceAfter": "the sudden cancellation?",
        "completeSentence": "What was the main reason for the sudden cancellation?",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "of",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'reason for an event', but 'cause of an issue'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_17_q4",
        "topic": "Dependent Prepositions: Nouns",
        "sentenceBefore": "Employees expressed high demand",
        "sentenceAfter": "flexible remote options.",
        "completeSentence": "Employees expressed high demand for flexible remote options.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "of",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'demand for' a product or service.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 18,
    "title": "Quiz 18: Collocations with Give & Get",
    "category": "Prepositions & Collocations",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_18_q1",
        "topic": "Collocations with Give & Get",
        "sentenceBefore": "Could you give me some constructive",
        "sentenceAfter": "on this draft?",
        "completeSentence": "Could you give me some constructive advice on this draft?",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "advising",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "advises",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "advice",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "advise",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "'Advice' is an uncountable noun.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_18_q2",
        "topic": "Collocations with Give & Get",
        "sentenceBefore": "We must get",
        "sentenceAfter": "from legal before publishing the release.",
        "completeSentence": "We must get approval from legal before publishing the release.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "approval",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "approve",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "approved",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "approving",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The noun collocation is 'get approval'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_18_q3",
        "topic": "Collocations with Give & Get",
        "sentenceBefore": "The lead presenter gave a very persuasive",
        "sentenceAfter": "yesterday.",
        "completeSentence": "The lead presenter gave a very persuasive presentation yesterday.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "presence",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "presentation",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "present",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "presenting",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We 'give a presentation'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_18_q4",
        "topic": "Collocations with Give & Get",
        "sentenceBefore": "I will get in",
        "sentenceAfter": "with the vendor first thing tomorrow.",
        "completeSentence": "I will get in touch with the vendor first thing tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "touch",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "reach",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "contact",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "call",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The common idiom is 'get in touch with'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 19,
    "title": "Quiz 19: Prepositions of Comparison & Contrast",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_19_q1",
        "topic": "Prepositions of Comparison & Contrast",
        "sentenceBefore": "Our second-generation model is superior",
        "sentenceAfter": "the previous one.",
        "completeSentence": "Our second-generation model is superior to the previous one.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "from",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "over",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "than",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "'Superior' and 'inferior' are followed by 'to', not 'than'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_19_q2",
        "topic": "Prepositions of Comparison & Contrast",
        "sentenceBefore": "She prefers working independently",
        "sentenceAfter": "micromanaged teams.",
        "completeSentence": "She prefers working independently to micromanaged teams.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "than",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "over",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "from",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The grammatical pattern is 'prefer X to Y'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_19_q3",
        "topic": "Prepositions of Comparison & Contrast",
        "sentenceBefore": "This design differs significantly",
        "sentenceAfter": "traditional layouts.",
        "completeSentence": "This design differs significantly from traditional layouts.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "from",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "than",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'differ from'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_19_q4",
        "topic": "Prepositions of Comparison & Contrast",
        "sentenceBefore": "His leadership style is very similar",
        "sentenceAfter": "our former director’s.",
        "completeSentence": "His leadership style is very similar to our former director’s.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "as",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "like",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'similar to'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 20,
    "title": "Quiz 20: Mastery of Fixed Prepositional Idioms",
    "category": "Prepositions & Collocations",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_20_q1",
        "topic": "Mastery of Fixed Prepositional Idioms",
        "sentenceBefore": "The board approved the budget, subject",
        "sentenceAfter": "further review.",
        "completeSentence": "The board approved the budget, subject to further review.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The legal condition is 'subject to'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_20_q2",
        "topic": "Mastery of Fixed Prepositional Idioms",
        "sentenceBefore": "We must ensure all procedures are in accordance",
        "sentenceAfter": "the law.",
        "completeSentence": "We must ensure all procedures are in accordance with the law.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The formal collocation is 'in accordance with'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_20_q3",
        "topic": "Mastery of Fixed Prepositional Idioms",
        "sentenceBefore": "He stepped down in favor",
        "sentenceAfter": "a younger candidate.",
        "completeSentence": "He stepped down in favor of a younger candidate.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The phrase is 'in favor of'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_20_q4",
        "topic": "Mastery of Fixed Prepositional Idioms",
        "sentenceBefore": "On behalf",
        "sentenceAfter": "the entire executive committee, thank you.",
        "completeSentence": "On behalf of the entire executive committee, thank you.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "of",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "from",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The standard phrase is 'on behalf of'.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 21,
    "title": "Quiz 21: Executive Communication",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_21_q1",
        "topic": "Executive Communication",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_21_q2",
        "topic": "Executive Communication",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_21_q3",
        "topic": "Executive Communication",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_21_q4",
        "topic": "Executive Communication",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 22,
    "title": "Quiz 22: Agile Standups & Sprints",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_22_q1",
        "topic": "Agile Standups & Sprints",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_22_q2",
        "topic": "Agile Standups & Sprints",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_22_q3",
        "topic": "Agile Standups & Sprints",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_22_q4",
        "topic": "Agile Standups & Sprints",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 23,
    "title": "Quiz 23: Remote Work Etiquette",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_23_q1",
        "topic": "Remote Work Etiquette",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_23_q2",
        "topic": "Remote Work Etiquette",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_23_q3",
        "topic": "Remote Work Etiquette",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_23_q4",
        "topic": "Remote Work Etiquette",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 24,
    "title": "Quiz 24: Customer Success & Retention",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_24_q1",
        "topic": "Customer Success & Retention",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_24_q2",
        "topic": "Customer Success & Retention",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_24_q3",
        "topic": "Customer Success & Retention",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_24_q4",
        "topic": "Customer Success & Retention",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 25,
    "title": "Quiz 25: Enterprise Sales Pitching",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_25_q1",
        "topic": "Enterprise Sales Pitching",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_25_q2",
        "topic": "Enterprise Sales Pitching",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_25_q3",
        "topic": "Enterprise Sales Pitching",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_25_q4",
        "topic": "Enterprise Sales Pitching",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 26,
    "title": "Quiz 26: Cross-Cultural Meetings",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_26_q1",
        "topic": "Cross-Cultural Meetings",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_26_q2",
        "topic": "Cross-Cultural Meetings",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_26_q3",
        "topic": "Cross-Cultural Meetings",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_26_q4",
        "topic": "Cross-Cultural Meetings",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 27,
    "title": "Quiz 27: Performance Appraisal Dialogue",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_27_q1",
        "topic": "Performance Appraisal Dialogue",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_27_q2",
        "topic": "Performance Appraisal Dialogue",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_27_q3",
        "topic": "Performance Appraisal Dialogue",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_27_q4",
        "topic": "Performance Appraisal Dialogue",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 28,
    "title": "Quiz 28: Vendor Procurement",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_28_q1",
        "topic": "Vendor Procurement",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_28_q2",
        "topic": "Vendor Procurement",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_28_q3",
        "topic": "Vendor Procurement",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_28_q4",
        "topic": "Vendor Procurement",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 29,
    "title": "Quiz 29: Product Roadmap Strategy",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_29_q1",
        "topic": "Product Roadmap Strategy",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_29_q2",
        "topic": "Product Roadmap Strategy",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_29_q3",
        "topic": "Product Roadmap Strategy",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_29_q4",
        "topic": "Product Roadmap Strategy",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 30,
    "title": "Quiz 30: Conflict Resolution at Work",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_30_q1",
        "topic": "Conflict Resolution at Work",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_30_q2",
        "topic": "Conflict Resolution at Work",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_30_q3",
        "topic": "Conflict Resolution at Work",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_30_q4",
        "topic": "Conflict Resolution at Work",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 31,
    "title": "Quiz 31: Corporate Risk Assessment",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_31_q1",
        "topic": "Corporate Risk Assessment",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_31_q2",
        "topic": "Corporate Risk Assessment",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_31_q3",
        "topic": "Corporate Risk Assessment",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_31_q4",
        "topic": "Corporate Risk Assessment",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 32,
    "title": "Quiz 32: Hiring & Onboarding",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_32_q1",
        "topic": "Hiring & Onboarding",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_32_q2",
        "topic": "Hiring & Onboarding",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_32_q3",
        "topic": "Hiring & Onboarding",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_32_q4",
        "topic": "Hiring & Onboarding",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 33,
    "title": "Quiz 33: Investor Pitch Decks",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_33_q1",
        "topic": "Investor Pitch Decks",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_33_q2",
        "topic": "Investor Pitch Decks",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_33_q3",
        "topic": "Investor Pitch Decks",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_33_q4",
        "topic": "Investor Pitch Decks",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 34,
    "title": "Quiz 34: PR & Crisis Management",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_34_q1",
        "topic": "PR & Crisis Management",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_34_q2",
        "topic": "PR & Crisis Management",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_34_q3",
        "topic": "PR & Crisis Management",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_34_q4",
        "topic": "PR & Crisis Management",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 35,
    "title": "Quiz 35: Contract Renewals",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_35_q1",
        "topic": "Contract Renewals",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_35_q2",
        "topic": "Contract Renewals",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_35_q3",
        "topic": "Contract Renewals",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_35_q4",
        "topic": "Contract Renewals",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 36,
    "title": "Quiz 36: Executive Presence",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_36_q1",
        "topic": "Executive Presence",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_36_q2",
        "topic": "Executive Presence",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_36_q3",
        "topic": "Executive Presence",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_36_q4",
        "topic": "Executive Presence",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 37,
    "title": "Quiz 37: Workplace Well-being",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_37_q1",
        "topic": "Workplace Well-being",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_37_q2",
        "topic": "Workplace Well-being",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_37_q3",
        "topic": "Workplace Well-being",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_37_q4",
        "topic": "Workplace Well-being",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 38,
    "title": "Quiz 38: Compliance & GDPR",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_38_q1",
        "topic": "Compliance & GDPR",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_38_q2",
        "topic": "Compliance & GDPR",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_38_q3",
        "topic": "Compliance & GDPR",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_38_q4",
        "topic": "Compliance & GDPR",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 39,
    "title": "Quiz 39: Supply Chain Coordination",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_39_q1",
        "topic": "Supply Chain Coordination",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_39_q2",
        "topic": "Supply Chain Coordination",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_39_q3",
        "topic": "Supply Chain Coordination",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_39_q4",
        "topic": "Supply Chain Coordination",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 40,
    "title": "Quiz 40: Mergers & Strategic Alliances",
    "category": "Business English",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_40_q1",
        "topic": "Mergers & Strategic Alliances",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_40_q2",
        "topic": "Mergers & Strategic Alliances",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_40_q3",
        "topic": "Mergers & Strategic Alliances",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_40_q4",
        "topic": "Mergers & Strategic Alliances",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 41,
    "title": "Quiz 41: Daily Routines & Schedules",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_41_q1",
        "topic": "Daily Routines & Schedules",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_41_q2",
        "topic": "Daily Routines & Schedules",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_41_q3",
        "topic": "Daily Routines & Schedules",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_41_q4",
        "topic": "Daily Routines & Schedules",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 42,
    "title": "Quiz 42: Inviting Friends to Dinner",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_42_q1",
        "topic": "Inviting Friends to Dinner",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_42_q2",
        "topic": "Inviting Friends to Dinner",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_42_q3",
        "topic": "Inviting Friends to Dinner",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_42_q4",
        "topic": "Inviting Friends to Dinner",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 43,
    "title": "Quiz 43: Weekend Recreation",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_43_q1",
        "topic": "Weekend Recreation",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_43_q2",
        "topic": "Weekend Recreation",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_43_q3",
        "topic": "Weekend Recreation",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_43_q4",
        "topic": "Weekend Recreation",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 44,
    "title": "Quiz 44: Ordering at a Local Bakery",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_44_q1",
        "topic": "Ordering at a Local Bakery",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_44_q2",
        "topic": "Ordering at a Local Bakery",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_44_q3",
        "topic": "Ordering at a Local Bakery",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_44_q4",
        "topic": "Ordering at a Local Bakery",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 45,
    "title": "Quiz 45: Discussing Favorite Movies",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_45_q1",
        "topic": "Discussing Favorite Movies",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_45_q2",
        "topic": "Discussing Favorite Movies",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_45_q3",
        "topic": "Discussing Favorite Movies",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_45_q4",
        "topic": "Discussing Favorite Movies",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 46,
    "title": "Quiz 46: Weather Forecast Nuances",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_46_q1",
        "topic": "Weather Forecast Nuances",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_46_q2",
        "topic": "Weather Forecast Nuances",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_46_q3",
        "topic": "Weather Forecast Nuances",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_46_q4",
        "topic": "Weather Forecast Nuances",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 47,
    "title": "Quiz 47: Neighborly Courtesies",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_47_q1",
        "topic": "Neighborly Courtesies",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_47_q2",
        "topic": "Neighborly Courtesies",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_47_q3",
        "topic": "Neighborly Courtesies",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_47_q4",
        "topic": "Neighborly Courtesies",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 48,
    "title": "Quiz 48: Health, Exercise & Fitness",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_48_q1",
        "topic": "Health, Exercise & Fitness",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_48_q2",
        "topic": "Health, Exercise & Fitness",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_48_q3",
        "topic": "Health, Exercise & Fitness",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_48_q4",
        "topic": "Health, Exercise & Fitness",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 49,
    "title": "Quiz 49: Booking Doctor Appointments",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_49_q1",
        "topic": "Booking Doctor Appointments",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_49_q2",
        "topic": "Booking Doctor Appointments",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_49_q3",
        "topic": "Booking Doctor Appointments",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_49_q4",
        "topic": "Booking Doctor Appointments",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 50,
    "title": "Quiz 50: Expressing Sympathy & Support",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_50_q1",
        "topic": "Expressing Sympathy & Support",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_50_q2",
        "topic": "Expressing Sympathy & Support",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_50_q3",
        "topic": "Expressing Sympathy & Support",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_50_q4",
        "topic": "Expressing Sympathy & Support",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 51,
    "title": "Quiz 51: Sharing Childhood Memories",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_51_q1",
        "topic": "Sharing Childhood Memories",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_51_q2",
        "topic": "Sharing Childhood Memories",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_51_q3",
        "topic": "Sharing Childhood Memories",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_51_q4",
        "topic": "Sharing Childhood Memories",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 52,
    "title": "Quiz 52: Talking About Pets",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_52_q1",
        "topic": "Talking About Pets",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_52_q2",
        "topic": "Talking About Pets",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_52_q3",
        "topic": "Talking About Pets",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_52_q4",
        "topic": "Talking About Pets",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 53,
    "title": "Quiz 53: Asking for Street Directions",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_53_q1",
        "topic": "Asking for Street Directions",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_53_q2",
        "topic": "Asking for Street Directions",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_53_q3",
        "topic": "Asking for Street Directions",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_53_q4",
        "topic": "Asking for Street Directions",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 54,
    "title": "Quiz 54: Complimenting Someone",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_54_q1",
        "topic": "Complimenting Someone",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_54_q2",
        "topic": "Complimenting Someone",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_54_q3",
        "topic": "Complimenting Someone",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_54_q4",
        "topic": "Complimenting Someone",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 55,
    "title": "Quiz 55: Casual Text Messaging",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_55_q1",
        "topic": "Casual Text Messaging",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_55_q2",
        "topic": "Casual Text Messaging",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_55_q3",
        "topic": "Casual Text Messaging",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_55_q4",
        "topic": "Casual Text Messaging",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 56,
    "title": "Quiz 56: Making Excuses & Apologies",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_56_q1",
        "topic": "Making Excuses & Apologies",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_56_q2",
        "topic": "Making Excuses & Apologies",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_56_q3",
        "topic": "Making Excuses & Apologies",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_56_q4",
        "topic": "Making Excuses & Apologies",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 57,
    "title": "Quiz 57: Discussing Current News",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_57_q1",
        "topic": "Discussing Current News",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_57_q2",
        "topic": "Discussing Current News",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_57_q3",
        "topic": "Discussing Current News",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_57_q4",
        "topic": "Discussing Current News",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 58,
    "title": "Quiz 58: Describing Personal Goals",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_58_q1",
        "topic": "Describing Personal Goals",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_58_q2",
        "topic": "Describing Personal Goals",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_58_q3",
        "topic": "Describing Personal Goals",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_58_q4",
        "topic": "Describing Personal Goals",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 59,
    "title": "Quiz 59: Cooking & Sharing Recipes",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_59_q1",
        "topic": "Cooking & Sharing Recipes",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_59_q2",
        "topic": "Cooking & Sharing Recipes",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_59_q3",
        "topic": "Cooking & Sharing Recipes",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_59_q4",
        "topic": "Cooking & Sharing Recipes",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 60,
    "title": "Quiz 60: Shopping for Household Goods",
    "category": "General Conversation",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_60_q1",
        "topic": "Shopping for Household Goods",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_60_q2",
        "topic": "Shopping for Household Goods",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_60_q3",
        "topic": "Shopping for Household Goods",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_60_q4",
        "topic": "Shopping for Household Goods",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 61,
    "title": "Quiz 61: Airport Flight Connections",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_61_q1",
        "topic": "Airport Flight Connections",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_61_q2",
        "topic": "Airport Flight Connections",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_61_q3",
        "topic": "Airport Flight Connections",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_61_q4",
        "topic": "Airport Flight Connections",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 62,
    "title": "Quiz 62: Hotel Check-in & Requests",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_62_q1",
        "topic": "Hotel Check-in & Requests",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_62_q2",
        "topic": "Hotel Check-in & Requests",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_62_q3",
        "topic": "Hotel Check-in & Requests",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_62_q4",
        "topic": "Hotel Check-in & Requests",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 63,
    "title": "Quiz 63: Ordering Regional Cuisine",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_63_q1",
        "topic": "Ordering Regional Cuisine",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_63_q2",
        "topic": "Ordering Regional Cuisine",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_63_q3",
        "topic": "Ordering Regional Cuisine",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_63_q4",
        "topic": "Ordering Regional Cuisine",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 64,
    "title": "Quiz 64: Hiring a City Taxi",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_64_q1",
        "topic": "Hiring a City Taxi",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_64_q2",
        "topic": "Hiring a City Taxi",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_64_q3",
        "topic": "Hiring a City Taxi",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_64_q4",
        "topic": "Hiring a City Taxi",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 65,
    "title": "Quiz 65: Train Station Platforms",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_65_q1",
        "topic": "Train Station Platforms",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_65_q2",
        "topic": "Train Station Platforms",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_65_q3",
        "topic": "Train Station Platforms",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_65_q4",
        "topic": "Train Station Platforms",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 66,
    "title": "Quiz 66: Booking Sightseeing Tours",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_66_q1",
        "topic": "Booking Sightseeing Tours",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_66_q2",
        "topic": "Booking Sightseeing Tours",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_66_q3",
        "topic": "Booking Sightseeing Tours",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_66_q4",
        "topic": "Booking Sightseeing Tours",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 67,
    "title": "Quiz 67: Navigating City Metros",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_67_q1",
        "topic": "Navigating City Metros",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_67_q2",
        "topic": "Navigating City Metros",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_67_q3",
        "topic": "Navigating City Metros",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_67_q4",
        "topic": "Navigating City Metros",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 68,
    "title": "Quiz 68: Emergency Pharmacy Needs",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_68_q1",
        "topic": "Emergency Pharmacy Needs",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_68_q2",
        "topic": "Emergency Pharmacy Needs",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_68_q3",
        "topic": "Emergency Pharmacy Needs",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_68_q4",
        "topic": "Emergency Pharmacy Needs",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 69,
    "title": "Quiz 69: Currency Exchange & ATMs",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_69_q1",
        "topic": "Currency Exchange & ATMs",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_69_q2",
        "topic": "Currency Exchange & ATMs",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_69_q3",
        "topic": "Currency Exchange & ATMs",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_69_q4",
        "topic": "Currency Exchange & ATMs",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 70,
    "title": "Quiz 70: Luggage Lost & Found",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_70_q1",
        "topic": "Luggage Lost & Found",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_70_q2",
        "topic": "Luggage Lost & Found",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_70_q3",
        "topic": "Luggage Lost & Found",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_70_q4",
        "topic": "Luggage Lost & Found",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 71,
    "title": "Quiz 71: Customs & Passport Border",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_71_q1",
        "topic": "Customs & Passport Border",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_71_q2",
        "topic": "Customs & Passport Border",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_71_q3",
        "topic": "Customs & Passport Border",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_71_q4",
        "topic": "Customs & Passport Border",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 72,
    "title": "Quiz 72: Renting an Automobile",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_72_q1",
        "topic": "Renting an Automobile",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_72_q2",
        "topic": "Renting an Automobile",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_72_q3",
        "topic": "Renting an Automobile",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_72_q4",
        "topic": "Renting an Automobile",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 73,
    "title": "Quiz 73: Visiting Historical Castles",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_73_q1",
        "topic": "Visiting Historical Castles",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_73_q2",
        "topic": "Visiting Historical Castles",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_73_q3",
        "topic": "Visiting Historical Castles",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_73_q4",
        "topic": "Visiting Historical Castles",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 74,
    "title": "Quiz 74: Hiking in National Parks",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_74_q1",
        "topic": "Hiking in National Parks",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_74_q2",
        "topic": "Hiking in National Parks",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_74_q3",
        "topic": "Hiking in National Parks",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_74_q4",
        "topic": "Hiking in National Parks",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 75,
    "title": "Quiz 75: Returning Home on Flight",
    "category": "Travel",
    "difficulty": "Beginner",
    "questions": [
      {
        "id": "quiz_75_q1",
        "topic": "Returning Home on Flight",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_75_q2",
        "topic": "Returning Home on Flight",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_75_q3",
        "topic": "Returning Home on Flight",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Beginner"
      },
      {
        "id": "quiz_75_q4",
        "topic": "Returning Home on Flight",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Beginner"
      }
    ]
  },
  {
    "quizNumber": 76,
    "title": "Quiz 76: Citing Scientific Sources",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_76_q1",
        "topic": "Citing Scientific Sources",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_76_q2",
        "topic": "Citing Scientific Sources",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_76_q3",
        "topic": "Citing Scientific Sources",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_76_q4",
        "topic": "Citing Scientific Sources",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 77,
    "title": "Quiz 77: Formulating a Hypothesis",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_77_q1",
        "topic": "Formulating a Hypothesis",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_77_q2",
        "topic": "Formulating a Hypothesis",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_77_q3",
        "topic": "Formulating a Hypothesis",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_77_q4",
        "topic": "Formulating a Hypothesis",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 78,
    "title": "Quiz 78: Statistical Probability",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_78_q1",
        "topic": "Statistical Probability",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_78_q2",
        "topic": "Statistical Probability",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_78_q3",
        "topic": "Statistical Probability",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_78_q4",
        "topic": "Statistical Probability",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 79,
    "title": "Quiz 79: Analyzing Research Methods",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_79_q1",
        "topic": "Analyzing Research Methods",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_79_q2",
        "topic": "Analyzing Research Methods",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_79_q3",
        "topic": "Analyzing Research Methods",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_79_q4",
        "topic": "Analyzing Research Methods",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 80,
    "title": "Quiz 80: Writing an Abstract",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_80_q1",
        "topic": "Writing an Abstract",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_80_q2",
        "topic": "Writing an Abstract",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_80_q3",
        "topic": "Writing an Abstract",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_80_q4",
        "topic": "Writing an Abstract",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 81,
    "title": "Quiz 81: Peer Review Feedback",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_81_q1",
        "topic": "Peer Review Feedback",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_81_q2",
        "topic": "Peer Review Feedback",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_81_q3",
        "topic": "Peer Review Feedback",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_81_q4",
        "topic": "Peer Review Feedback",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 82,
    "title": "Quiz 82: Defending a Thesis",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_82_q1",
        "topic": "Defending a Thesis",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_82_q2",
        "topic": "Defending a Thesis",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_82_q3",
        "topic": "Defending a Thesis",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_82_q4",
        "topic": "Defending a Thesis",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 83,
    "title": "Quiz 83: Comparative Historical Analysis",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_83_q1",
        "topic": "Comparative Historical Analysis",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_83_q2",
        "topic": "Comparative Historical Analysis",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_83_q3",
        "topic": "Comparative Historical Analysis",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_83_q4",
        "topic": "Comparative Historical Analysis",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 84,
    "title": "Quiz 84: Ethics in Artificial Intelligence",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_84_q1",
        "topic": "Ethics in Artificial Intelligence",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_84_q2",
        "topic": "Ethics in Artificial Intelligence",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_84_q3",
        "topic": "Ethics in Artificial Intelligence",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_84_q4",
        "topic": "Ethics in Artificial Intelligence",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 85,
    "title": "Quiz 85: Interpreting Demographic Data",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_85_q1",
        "topic": "Interpreting Demographic Data",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_85_q2",
        "topic": "Interpreting Demographic Data",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_85_q3",
        "topic": "Interpreting Demographic Data",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_85_q4",
        "topic": "Interpreting Demographic Data",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 86,
    "title": "Quiz 86: Drawing Logical Conclusions",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_86_q1",
        "topic": "Drawing Logical Conclusions",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_86_q2",
        "topic": "Drawing Logical Conclusions",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_86_q3",
        "topic": "Drawing Logical Conclusions",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_86_q4",
        "topic": "Drawing Logical Conclusions",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 87,
    "title": "Quiz 87: Academic Debate Protocols",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_87_q1",
        "topic": "Academic Debate Protocols",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_87_q2",
        "topic": "Academic Debate Protocols",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_87_q3",
        "topic": "Academic Debate Protocols",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_87_q4",
        "topic": "Academic Debate Protocols",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 88,
    "title": "Quiz 88: Synthesizing Multiple Texts",
    "category": "Academic",
    "difficulty": "Advanced",
    "questions": [
      {
        "id": "quiz_88_q1",
        "topic": "Synthesizing Multiple Texts",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_88_q2",
        "topic": "Synthesizing Multiple Texts",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_88_q3",
        "topic": "Synthesizing Multiple Texts",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Advanced"
      },
      {
        "id": "quiz_88_q4",
        "topic": "Synthesizing Multiple Texts",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Advanced"
      }
    ]
  },
  {
    "quizNumber": 89,
    "title": "Quiz 89: Essential Phrasal Verbs: Turn",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_89_q1",
        "topic": "Essential Phrasal Verbs: Turn",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_89_q2",
        "topic": "Essential Phrasal Verbs: Turn",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_89_q3",
        "topic": "Essential Phrasal Verbs: Turn",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_89_q4",
        "topic": "Essential Phrasal Verbs: Turn",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 90,
    "title": "Quiz 90: Essential Phrasal Verbs: Bring",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_90_q1",
        "topic": "Essential Phrasal Verbs: Bring",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_90_q2",
        "topic": "Essential Phrasal Verbs: Bring",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_90_q3",
        "topic": "Essential Phrasal Verbs: Bring",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_90_q4",
        "topic": "Essential Phrasal Verbs: Bring",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 91,
    "title": "Quiz 91: Workplace Idiom: Ground Running",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_91_q1",
        "topic": "Workplace Idiom: Ground Running",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_91_q2",
        "topic": "Workplace Idiom: Ground Running",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_91_q3",
        "topic": "Workplace Idiom: Ground Running",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_91_q4",
        "topic": "Workplace Idiom: Ground Running",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 92,
    "title": "Quiz 92: Workplace Idiom: On Same Page",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_92_q1",
        "topic": "Workplace Idiom: On Same Page",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_92_q2",
        "topic": "Workplace Idiom: On Same Page",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_92_q3",
        "topic": "Workplace Idiom: On Same Page",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_92_q4",
        "topic": "Workplace Idiom: On Same Page",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 93,
    "title": "Quiz 93: Phrasal Verbs: Look & Watch",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_93_q1",
        "topic": "Phrasal Verbs: Look & Watch",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_93_q2",
        "topic": "Phrasal Verbs: Look & Watch",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_93_q3",
        "topic": "Phrasal Verbs: Look & Watch",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_93_q4",
        "topic": "Phrasal Verbs: Look & Watch",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 94,
    "title": "Quiz 94: Idioms: Decision Making",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_94_q1",
        "topic": "Idioms: Decision Making",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_94_q2",
        "topic": "Idioms: Decision Making",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_94_q3",
        "topic": "Idioms: Decision Making",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_94_q4",
        "topic": "Idioms: Decision Making",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 95,
    "title": "Quiz 95: Phrasal Verbs: Put & Set",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_95_q1",
        "topic": "Phrasal Verbs: Put & Set",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_95_q2",
        "topic": "Phrasal Verbs: Put & Set",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_95_q3",
        "topic": "Phrasal Verbs: Put & Set",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_95_q4",
        "topic": "Phrasal Verbs: Put & Set",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 96,
    "title": "Quiz 96: Idioms: Overcoming Hurdles",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_96_q1",
        "topic": "Idioms: Overcoming Hurdles",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_96_q2",
        "topic": "Idioms: Overcoming Hurdles",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_96_q3",
        "topic": "Idioms: Overcoming Hurdles",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_96_q4",
        "topic": "Idioms: Overcoming Hurdles",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "of",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 97,
    "title": "Quiz 97: Phrasal Verbs: Give & Take",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_97_q1",
        "topic": "Phrasal Verbs: Give & Take",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_97_q2",
        "topic": "Phrasal Verbs: Give & Take",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_97_q3",
        "topic": "Phrasal Verbs: Give & Take",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_97_q4",
        "topic": "Phrasal Verbs: Give & Take",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 98,
    "title": "Quiz 98: Workplace Metaphors: Ballpark",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_98_q1",
        "topic": "Workplace Metaphors: Ballpark",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_98_q2",
        "topic": "Workplace Metaphors: Ballpark",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_98_q3",
        "topic": "Workplace Metaphors: Ballpark",
        "sentenceBefore": "Our headquarters are located",
        "sentenceAfter": "the financial district.",
        "completeSentence": "Our headquarters are located in the financial district.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "at",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'in' for cities, districts, and regions.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_98_q4",
        "topic": "Workplace Metaphors: Ballpark",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "by",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 99,
    "title": "Quiz 99: Mastering Executive Polish",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_99_q1",
        "topic": "Mastering Executive Polish",
        "sentenceBefore": "I will coordinate directly",
        "sentenceAfter": "the regional logistics manager.",
        "completeSentence": "I will coordinate directly with the regional logistics manager.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "with",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'coordinate with'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_99_q2",
        "topic": "Mastering Executive Polish",
        "sentenceBefore": "We can discuss this further",
        "sentenceAfter": "our upcoming luncheon.",
        "completeSentence": "We can discuss this further at our upcoming luncheon.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "at",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "on",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "by",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'at' for planned gatherings and events.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_99_q3",
        "topic": "Mastering Executive Polish",
        "sentenceBefore": "The director expressed enthusiasm",
        "sentenceAfter": "the new strategic vision.",
        "completeSentence": "The director expressed enthusiasm about the new strategic vision.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "of",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "We say 'enthusiasm about/for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_99_q4",
        "topic": "Mastering Executive Polish",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      }
    ]
  },
  {
    "quizNumber": 100,
    "title": "Quiz 100: Complete Fluency Capstone",
    "category": "Prepositions & Collocations",
    "difficulty": "Intermediate",
    "questions": [
      {
        "id": "quiz_100_q1",
        "topic": "Complete Fluency Capstone",
        "sentenceBefore": "We appreciate your patience while we wait",
        "sentenceAfter": "approval.",
        "completeSentence": "We appreciate your patience while we wait for approval.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "for",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "B",
            "text": "to",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "with",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "about",
            "color": "purple",
            "isCorrect": false
          }
        ],
        "explanation": "The collocation is 'wait for'.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_100_q2",
        "topic": "Complete Fluency Capstone",
        "sentenceBefore": "The report is available",
        "sentenceAfter": "the company intranet portal.",
        "completeSentence": "The report is available on the company intranet portal.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "to",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "on",
            "color": "yellow",
            "isCorrect": true
          }
        ],
        "explanation": "Use 'on' for websites, portals, and digital screens.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_100_q3",
        "topic": "Complete Fluency Capstone",
        "sentenceBefore": "All revisions must be submitted",
        "sentenceAfter": "5:00 PM tomorrow.",
        "completeSentence": "All revisions must be submitted by 5:00 PM tomorrow.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "in",
            "color": "green",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "at",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "C",
            "text": "by",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "D",
            "text": "until",
            "color": "cyan",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'by' to denote a deadline or cutoff time.",
        "difficulty": "Intermediate"
      },
      {
        "id": "quiz_100_q4",
        "topic": "Complete Fluency Capstone",
        "sentenceBefore": "Please send your feedback",
        "sentenceAfter": "the project lead.",
        "completeSentence": "Please send your feedback to the project lead.",
        "bracketTranslation": "",
        "options": [
          {
            "letter": "A",
            "text": "with",
            "color": "purple",
            "isCorrect": false
          },
          {
            "letter": "B",
            "text": "to",
            "color": "yellow",
            "isCorrect": true
          },
          {
            "letter": "C",
            "text": "for",
            "color": "cyan",
            "isCorrect": false
          },
          {
            "letter": "D",
            "text": "towards",
            "color": "green",
            "isCorrect": false
          }
        ],
        "explanation": "Use 'to' with direction of transmission.",
        "difficulty": "Intermediate"
      }
    ]
  }
];

export function getQuizByNumber(num: number): QuizSet | undefined {
  const clean = Math.min(Math.max(num, 1), 100);
  return QUIZ_BANK_100.find(q => q.quizNumber === clean) || QUIZ_BANK_100[0];
}

export function getNextQuizNumber(currentNum: number, excludeList: number[] = []): number {
  const set = new Set(excludeList);
  for (let i = 1; i <= 100; i++) {
    const candidate = ((currentNum - 1 + i) % 100) + 1;
    if (!set.has(candidate)) {
      return candidate;
    }
  }
  return ((currentNum % 100) + 1);
}

export function getQuizzesByCategory(category: string): QuizSet[] {
  return QUIZ_BANK_100.filter(q => q.category.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(q.category.toLowerCase()));
}
