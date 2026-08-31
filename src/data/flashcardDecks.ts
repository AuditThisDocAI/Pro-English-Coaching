import { Flashcard, FlashcardDeck, SavedPhrase, NativeLanguage } from '../types';

export const PRESET_FLASHCARD_DECKS: FlashcardDeck[] = [
  {
    id: 'executive-email',
    title: 'Executive Email & Workplace Correspondence',
    description: 'Master polite follow-ups, pushback without offending, deadline negotiations, and diplomatic status updates.',
    category: 'Email & Business',
    icon: 'Mail',
    badgeColor: 'emerald',
    cards: [
      {
        id: 'email_1',
        deckId: 'executive-email',
        category: 'Email',
        frontContext: 'Apologizing for a Delay',
        front: 'Sorry for the late reply, I was super busy with other stuff.',
        backProfessional: 'Thank you for your patience. I appreciate you bearing with me while I gave this matter the attention it requires.',
        backWhy: 'Shifting from "sorry I\'m late" to "thank you for your patience" projects executive composure and gratitude rather than guilt.',
        backTranslation: {
          Spanish: 'Gracias por su paciencia. Agradezco su comprensión mientras revisaba este asunto.',
          Portuguese: 'Agradeço pela sua paciência. Obrigado por aguardar enquanto eu dava a devida atenção ao tema.',
          French: 'Je vous remercie de votre patience. J\'apprécie votre compréhension.',
          German: 'Vielen Dank für Ihre Geduld und Ihr Verständnis.',
          Mandarin: '感谢您的耐心等待，非常感谢您给予我时间妥善处理此事。',
          Hindi: 'आपके धैर्य के लिए धन्यवाद। इस विषय को समय देने के दौरान प्रतीक्षा करने के लिए आभारी हूँ।',
        },
        backPractice: 'Try saying this out loud when starting an email reply to your manager.',
        mastery: 'new',
      },
      {
        id: 'email_2',
        deckId: 'executive-email',
        category: 'Email',
        frontContext: 'Polite Pushback on Unrealistic Deadlines',
        front: 'No way I can finish this by Friday, you gave it to me too late.',
        backProfessional: 'To ensure this deliverable meets our quality standards, I will need until next Tuesday to finalize it. Could we adjust the timeline accordingly?',
        backWhy: 'Focuses on maintaining high quality deliverables rather than making personal accusations about late assignments.',
        backTranslation: {
          Spanish: 'Para garantizar que el entregable cumpla con nuestros estándares de calidad, necesitaré hasta el próximo martes. ¿Podríamos ajustar el plazo?',
          Portuguese: 'Para garantir que o trabalho atenda aos nossos padrões de qualidade, precisarei até a próxima terça-feira.',
          French: 'Afin de garantir un livrable conforme à nos exigences de qualité, j\'aurai besoin d\'un délai jusqu\'à mardi prochain.',
        },
        backPractice: 'Practice offering a partial delivery by Friday if an immediate draft is required.',
        mastery: 'new',
      },
      {
        id: 'email_3',
        deckId: 'executive-email',
        category: 'Email',
        frontContext: 'Following Up on an Unanswered Request',
        front: 'Did you see my last email? You didn\'t answer me.',
        backProfessional: 'I wanted to gently bump this to the top of your inbox in case it slipped through. Please let me know if you need any additional context from my end.',
        backWhy: 'Graciously gives the recipient an out ("in case it slipped through") while clearly requesting the needed response.',
        backTranslation: {
          Spanish: 'Quería traer esto al principio de su bandeja de entrada por si se pasó por alto.',
          Portuguese: 'Gostaria de relembrar este ponto caso tenha passado despercebido na sua caixa de entrada.',
          French: 'Je me permets de faire remonter ce message dans votre boîte de réception.',
        },
        backPractice: 'Combine this with a clear call to action and the date you need a decision.',
        mastery: 'new',
      },
      {
        id: 'email_4',
        deckId: 'executive-email',
        category: 'Email',
        frontContext: 'Clarifying Confusing Instructions',
        front: 'Your email makes no sense, what do you want me to do?',
        backProfessional: 'Could you please help clarify the specific priority on this initiative so I can ensure our execution aligns perfectly with your expectations?',
        backWhy: 'Frames confusion as an alignment check, making the conversation collaborative rather than critical.',
        backTranslation: {
          Spanish: '¿Podría aclararme la prioridad específica para asegurar que nuestra ejecución se alinee con sus expectativas?',
          Portuguese: 'Poderia esclarecer a prioridade deste projeto para garantir o alinhamento com suas expectativas?',
        },
        backPractice: 'Ask for a 5-minute sync if the thread has exceeded 3 back-and-forth messages.',
        mastery: 'new',
      },
      {
        id: 'email_5',
        deckId: 'executive-email',
        category: 'Email',
        frontContext: 'Declining Extra Work Outside Scope',
        front: 'That\'s not my job and I have no time for it.',
        backProfessional: 'While I would love to support this, my current bandwidth is fully allocated to our primary Q3 deliverables. Let\'s align on whether we should reprioritize existing tasks.',
        backWhy: 'References business priorities and team bandwidth, shifting the decision back to strategic prioritization.',
        backTranslation: {
          Spanish: 'Aunque me encantaría apoyar, mi capacidad actual está asignada a los entregables clave del trimestre.',
          Portuguese: 'Embora queira apoiar, minha capacidade atual está totalmente alocada às entregas prioritárias.',
        },
        backPractice: 'Practice proposing a teammate who might have complementary bandwidth.',
        mastery: 'new',
      },
    ],
  },
  {
    id: 'interview-power',
    title: 'Job Interview & STAR Method Mastery',
    description: 'Transform informal thoughts into structured, high-impact STAR responses that impress hiring managers.',
    category: 'Interview & Career',
    icon: 'Briefcase',
    badgeColor: 'blue',
    cards: [
      {
        id: 'interview_1',
        deckId: 'interview-power',
        category: 'Interview',
        frontContext: 'Explaining a Weakness or Growth Area',
        front: 'I get stressed when too many people ask me for stuff at once.',
        backProfessional: 'Early in my career, I found high-volume context switching challenging. To master this, I implemented structured time-blocking and automated triage frameworks, which dramatically increased my throughput.',
        backWhy: 'Demonstrates self-awareness coupled with concrete systems and proactive habit formation.',
        backTranslation: {
          Spanish: 'Al inicio de mi carrera, el cambio frecuente de tareas era un desafío. Para solucionarlo, implementé bloques de tiempo estructurados.',
          Portuguese: 'No início da minha carreira, mudar de contexto constantemente era um desafio. Desenvolvi métodos de priorização estruturados.',
        },
        backPractice: 'Use the STAR format: Situation, Task, Action taken, and Result achieved.',
        mastery: 'new',
      },
      {
        id: 'interview_2',
        deckId: 'interview-power',
        category: 'Interview',
        frontContext: 'Discussing Salary Expectations',
        front: 'I want at least $90k because things are expensive now.',
        backProfessional: 'Based on my research of market benchmarks for this seniority and the cross-functional value I bring, I am targeting a compensation range between $90,000 and $105,000.',
        backWhy: 'Anchors your request in objective market data and proven value creation rather than personal cost-of-living needs.',
        backTranslation: {
          Spanish: 'Con base en referencias de mercado para este nivel y el valor que aporto, mi rango objetivo es de $90,000 a $105,000.',
          Portuguese: 'Com base nas pesquisas de mercado para este nível de senioridade, meu objetivo está entre $90.000 e $105.000.',
        },
        backPractice: 'State the range confidently without ending with upward inflection ("uptalk").',
        mastery: 'new',
      },
      {
        id: 'interview_3',
        deckId: 'interview-power',
        category: 'Interview',
        frontContext: 'Describing Conflict with a Colleague',
        front: 'My previous manager was micromanaging everything and drove me crazy.',
        backProfessional: 'In a previous role, my manager and I had differing communication styles. I proactively scheduled a weekly cadence with clear status dashboards, which established trust and autonomy.',
        backWhy: 'Reframes interpersonal tension into constructive communication optimization and trust building.',
        backTranslation: {
          Spanish: 'Teníamos estilos de comunicación distintos. Programé reuniones semanales con paneles de avance para fomentar la autonomía.',
          Portuguese: 'Tínhamos estilos de comunicação diferentes. Agendei alinhamentos semanais que fortaleceram a confiança.',
        },
        backPractice: 'Keep the focus 80% on the solution and positive outcome.',
        mastery: 'new',
      },
      {
        id: 'interview_4',
        deckId: 'interview-power',
        category: 'Interview',
        frontContext: 'Why Are You Leaving Your Current Job?',
        front: 'The pay is bad and there is no room to grow.',
        backProfessional: 'I am proud of the foundational impact I achieved with my current team. I am now seeking a high-velocity environment where I can tackle larger architectural challenges and drive strategic growth.',
        backWhy: 'Maintains respect for past employers while clearly communicating ambition and readiness for bigger challenges.',
        backTranslation: {
          Spanish: 'Estoy orgulloso del impacto logrado y ahora busco un entorno más dinámico para asumir retos estratégicos mayores.',
          Portuguese: 'Tenho orgulho do trabalho realizado e busco um ambiente onde possa liderar desafios estratégicos maiores.',
        },
        backPractice: 'Align your answer directly with one of the target company\'s core values.',
        mastery: 'new',
      },
    ],
  },
  {
    id: 'tech-agile',
    title: 'Tech, Software & Daily Standups',
    description: 'Articulate technical blockers, code review feedback, architectural trade-offs, and async updates with precision.',
    category: 'Engineering & Tech',
    icon: 'Code',
    badgeColor: 'purple',
    cards: [
      {
        id: 'tech_1',
        deckId: 'tech-agile',
        category: 'Tech',
        frontContext: 'Giving Code Review Feedback',
        front: 'This code is messy and you need to rewrite it completely.',
        backProfessional: 'Great progress on this PR. To improve long-term maintainability, could we consider modularizing this helper function and adding unit tests for edge cases?',
        backWhy: 'Framing suggestions as collaborative queries ("could we consider...") invites constructive discussion without defensive reactions.',
        backTranslation: {
          Spanish: 'Gran avance en este PR. Para mejorar el mantenimiento a largo plazo, ¿podríamos modularizar esta función auxiliar?',
          Portuguese: 'Ótimo progresso neste PR. Para melhorar a manutenção, poderíamos modularizar esta função?',
        },
        backPractice: 'Suggest a small code snippet or pattern as a concrete reference.',
        mastery: 'new',
      },
      {
        id: 'tech_2',
        deckId: 'tech-agile',
        category: 'Tech',
        frontContext: 'Reporting a Blocker in Daily Standup',
        front: 'I cannot do anything because backend team didn\'t give me the API.',
        backProfessional: 'I am currently blocked on the checkout integration pending the authentication endpoint from the backend team. I will mock the responses today and sync with David offline to unblock.',
        backWhy: 'States the dependency factually while immediately sharing a proactive workaround (mocking) and owner contact.',
        backTranslation: {
          Spanish: 'Estoy bloqueado temporalmente en la integración a la espera del endpoint de autenticación. Crearé datos simulados para avanzar.',
          Portuguese: 'Estou com um bloqueio na integração aguardando o endpoint. Vou criar mocks provisórios para adiantar o fluxo.',
        },
        backPractice: 'Share your estimated ETA once the blocker is resolved.',
        mastery: 'new',
      },
      {
        id: 'tech_3',
        deckId: 'tech-agile',
        category: 'Tech',
        frontContext: 'Pushing Back on Feature Creep / Scope Changes',
        front: 'You keep adding new features, the sprint is going to fail.',
        backProfessional: 'Adding these additional user stories will impact our committed sprint timeline. Shall we move this requirement to the next sprint backlog or swap out an existing ticket?',
        backWhy: 'Uses Agile trade-off mechanics ("swap out an existing ticket") to maintain control over workload.',
        backTranslation: {
          Spanish: 'Agregar estas historias afectará el plazo comprometido. ¿Las pasamos al próximo sprint o intercambiamos una tarea actual?',
          Portuguese: 'Incluir esses requisitos afetará o prazo acordado. Devemos priorizar para o próximo sprint ou trocar por outro item?',
        },
        backPractice: 'Offer 2 distinct scope options for product managers to choose from.',
        mastery: 'new',
      },
    ],
  },
  {
    id: 'diplomatic-idioms',
    title: 'Diplomatic Workplace Idioms & Phrasing',
    description: 'Sound like a native executive with polished corporate idioms, diplomatic phrasing, and confident transition words.',
    category: 'Workplace Idioms',
    icon: 'Sparkles',
    badgeColor: 'amber',
    cards: [
      {
        id: 'idiom_1',
        deckId: 'diplomatic-idioms',
        category: 'Idioms',
        frontContext: 'Revisiting a Topic Later ("Circle Back")',
        front: 'Let\'s talk about this again next week when we know more.',
        backProfessional: 'Let\'s circle back on this once we have finalized the analytics report so we can make a data-driven decision.',
        backWhy: '"Circle back" is the standard executive idiom for returning to a subject with updated information.',
        backTranslation: {
          Spanish: 'Retomemos este tema una vez que tengamos el informe analítico para tomar una decisión informada.',
          Portuguese: 'Vamos retomar este ponto assim que tivermos os dados completos para uma decisão fundamentada.',
        },
        backPractice: 'Use "circle back" in your next team meeting.',
        mastery: 'new',
      },
      {
        id: 'idiom_2',
        deckId: 'diplomatic-idioms',
        category: 'Idioms',
        frontContext: 'Quick Alignment ("Touch Base")',
        front: 'I want to talk to you for 2 minutes to see if we agree.',
        backProfessional: 'I would love to quickly touch base before the client call to ensure our talking points are completely aligned.',
        backWhy: '"Touch base" conveys a low-friction, high-efficiency check-in.',
        backTranslation: {
          Spanish: 'Me gustaría ponernos de acuerdo brevemente antes de la llamada con el cliente.',
          Portuguese: 'Gostaria de alinhar rapidamente os pontos antes da chamada com o cliente.',
        },
        backPractice: 'Propose a specific 5-minute window for touching base.',
        mastery: 'new',
      },
      {
        id: 'idiom_3',
        deckId: 'diplomatic-idioms',
        category: 'Idioms',
        frontContext: 'Polite Disagreement in a Meeting',
        front: 'I think you are totally wrong about that.',
        backProfessional: 'I see where you\'re coming from; however, looking at recent customer churn metrics, allow me to share an alternative perspective.',
        backWhy: 'Validates the speaker before introducing contrasting evidence, preventing emotional friction.',
        backTranslation: {
          Spanish: 'Entiendo tu punto de vista; sin embargo, al observar las métricas recientes, permíteme compartir una perspectiva diferente.',
          Portuguese: 'Compreendo sua colocação; contudo, analisando os dados recentes, gostaria de propor uma perspectiva alternativa.',
        },
        backPractice: 'Practice delivering this with a calm, neutral vocal tone.',
        mastery: 'new',
      },
      {
        id: 'idiom_4',
        deckId: 'diplomatic-idioms',
        category: 'Idioms',
        frontContext: 'Taking Responsibility Without Self-Deprecation',
        front: 'It was my mistake, I messed up badly.',
        backProfessional: 'I take full ownership of this oversight. I have already applied the corrective patch and updated our verification checklist to prevent recurrence.',
        backWhy: 'Executive ownership focuses on immediate remediation and structural prevention rather than self-blame.',
        backTranslation: {
          Spanish: 'Asumo total responsabilidad por esta omisión. Ya apliqué la corrección y actualicé nuestro protocolo para evitar que se repita.',
          Portuguese: 'Assumo total responsabilidade por essa falha. Já apliquei a correção e atualizei o checklist para evitar reincidências.',
        },
        backPractice: 'Always pair an acknowledgment with the solution already in motion.',
        mastery: 'new',
      },
    ],
  },
  {
    id: 'healthcare-customer',
    title: 'Customer Success & Healthcare Empathy',
    description: 'Calm anxious clients or patients, provide reassuring timelines, and de-escalate high-stress workplace conversations.',
    category: 'Client & Healthcare',
    icon: 'HeartHandshake',
    badgeColor: 'rose',
    cards: [
      {
        id: 'client_1',
        deckId: 'healthcare-customer',
        category: 'Customer Success',
        frontContext: 'De-escalating an Upset Customer',
        front: 'Calm down, screaming at me is not going to fix your issue.',
        backProfessional: 'I completely understand how frustrating this disruption has been for your team. I am personally overseeing this ticket and will provide updates every two hours until resolved.',
        backWhy: 'Acknowledges emotional impact, avoids triggering phrases like "calm down", and commits to dedicated ownership.',
        backTranslation: {
          Spanish: 'Comprendo perfectamente lo frustrante que ha sido esta situación. Estoy supervisando personalmente este caso y le enviaré actualizaciones periódicas.',
          Portuguese: 'Entendo perfeitamente o impacto dessa situação. Estou acompanhando este chamado pessoalmente e manterei você informado.',
        },
        backPractice: 'State the exact time of the next communication update.',
        mastery: 'new',
      },
      {
        id: 'client_2',
        deckId: 'healthcare-customer',
        category: 'Healthcare',
        frontContext: 'Explaining a Procedure Delay to a Patient',
        front: 'The doctor is running late so you just have to wait.',
        backProfessional: 'Thank you for your patience today. The physician is currently giving thorough care to an emergency case and will be with you shortly. May I get you a glass of water while you wait?',
        backWhy: 'Shows empathy, explains the clinical necessity respectfully, and offers comforting hospitality.',
        backTranslation: {
          Spanish: 'Gracias por su paciencia. El médico está atendiendo un caso urgente y estará con usted en breve. ¿Le gustaría un vaso de agua mientras espera?',
          Portuguese: 'Obrigado por sua paciência. O médico está finalizando um atendimento de emergência e já irá atendê-lo.',
        },
        backPractice: 'Speak slowly with warm eye contact and open body posture.',
        mastery: 'new',
      },
    ],
  },
];

/**
 * Converts a user's saved phrases into dynamic flashcards.
 */
export function convertSavedPhrasesToFlashcards(savedPhrases: SavedPhrase[]): Flashcard[] {
  return savedPhrases.map((phrase) => {
    return {
      id: `saved_${phrase.id}`,
      deckId: 'saved-vault',
      category: phrase.mode ? phrase.mode.toUpperCase() : 'SAVED VAULT',
      frontContext: `${phrase.jobType || 'Workplace'} • ${phrase.mode ? phrase.mode.toUpperCase() : 'EXPRESSION'}`,
      front: phrase.original,
      backProfessional: phrase.professional,
      backWhy: phrase.why || 'Enhanced for executive clarity and professional workplace impact.',
      backTranslation: phrase.translation || '',
      backPractice: phrase.practice || 'Practice speaking this phrase with confidence in your next meeting.',
      mastery: 'new',
      isCustom: true,
    };
  });
}

/**
 * Helper to get a translation text for a given user native language.
 */
export function getFlashcardTranslation(
  card: Flashcard,
  nativeLanguage: NativeLanguage | string = 'Spanish'
): string {
  if (!card.backTranslation) return '';

  if (typeof card.backTranslation === 'string') {
    return card.backTranslation;
  }

  if (typeof card.backTranslation === 'object') {
    const langKey = Object.keys(card.backTranslation).find(
      (k) => k.toLowerCase() === nativeLanguage.toLowerCase()
    );
    if (langKey && card.backTranslation[langKey]) {
      return card.backTranslation[langKey];
    }
    // Fallback to Spanish or first available
    return card.backTranslation['Spanish'] || Object.values(card.backTranslation)[0] || '';
  }

  return '';
}
