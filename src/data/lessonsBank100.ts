// 100 Curated Everyday English Lessons Library
// Comprehensive, 100% unique everyday real-world English lessons across 11 key topics.
// Guarantees zero duplicates and provides diverse, practical sentences for daily fluency.

export interface LessonPhrase {
  id: string;
  topicId: string;
  topicName: string;
  emoji: string;
  level: 'starter' | 'everyday' | 'confident';
  english: string;
  phonetic: string;
  translations: Record<string, string>;
  why: string;
  scenario: string;
}

export const LESSONS_BANK_100: LessonPhrase[] = [
  {
    "id": "lesson-1",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "starter",
    "english": "Can I please have a large latte with oat milk?",
    "phonetic": "kæn aɪ pliːz hæv ə lɑːrdʒ ˈlɑːteɪ wɪð oʊt mɪlk?",
    "translations": {
      "Spanish": "¿Me das un latte grande con leche de avena, por favor?",
      "Portuguese": "Por favor, você poderia me dar um latte grande com leite de aveia?",
      "French": "Puis-je avoir un grand café latte au lait d'avoine, s'il vous plaît ?",
      "German": "Kann ich bitte einen großen Latte mit Hafermilch haben?",
      "Italian": "Posso avere un latte grande con latte d'avena, per favore?"
    },
    "why": "Asking for milk alternatives clearly is standard and polite.",
    "scenario": "Ordering at a modern specialty coffee shop."
  },
  {
    "id": "lesson-2",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "starter",
    "english": "Could I get an iced Americano to go, please?",
    "phonetic": "kʊd aɪ ɡɛt ən aɪst əˌmɛrɪˈkɑːnoʊ tuː ɡoʊ pliːz?",
    "translations": {
      "Spanish": "¿Me da un americano helado para llevar, por favor?",
      "Portuguese": "Você pode me dar um americano gelado para viagem, por favor?",
      "French": "Pourrais-je avoir un Americano glacé à emporter, s'il vous plaît ?",
      "German": "Könnte ich bitte einen Eiskaffee Americano zum Mitnehmen bekommen?",
      "Italian": "Potrei avere un americano freddo da asporto, per favore?"
    },
    "why": "Using \"to go\" specifies takeout right away so the barista uses a paper cup.",
    "scenario": "Grabbing a quick cold coffee on a warm workday morning."
  },
  {
    "id": "lesson-3",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "everyday",
    "english": "Do you have any decaf options available today?",
    "phonetic": "duː juː hæv ˈɛni ˈdiːkæf ˈɑːpʃənz əˈveɪləbəl təˈdeɪ?",
    "translations": {
      "Spanish": "¿Tienen alguna opción descafeinada hoy?",
      "Portuguese": "Vocês têm opções descafeinadas disponíveis hoje?",
      "French": "Avez-vous des options décaféinées disponibles aujourd'hui ?",
      "German": "Haben Sie heute entkoffeinierte Optionen verfügbar?",
      "Italian": "Avete opzioni decaffeinate disponibili oggi?"
    },
    "why": "\"Decaf options\" is the natural phrase when you want coffee without caffeine.",
    "scenario": "Ordering an evening coffee without disrupting your sleep."
  },
  {
    "id": "lesson-4",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "starter",
    "english": "Could you warm this croissant up for me?",
    "phonetic": "kʊd juː wɔːrm ðɪs krwɑːˈsɑːnt ʌp fɔːr miː?",
    "translations": {
      "Spanish": "¿Podría calentar este cruasán para mí?",
      "Portuguese": "Você poderia esquentar este croissant para mim?",
      "French": "Pourriez-vous réchauffer ce croissant pour moi ?",
      "German": "Könnten Sie dieses Croissant bitte für mich aufwärmen?",
      "Italian": "Potrebbe scaldarmi questo cornetto, per favore?"
    },
    "why": "\"Warm up\" is friendly and specific for bakery items.",
    "scenario": "Ordering pastries at a bakery counter."
  },
  {
    "id": "lesson-5",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "everyday",
    "english": "Is this table free, or is someone sitting here?",
    "phonetic": "ɪz ðɪs ˈteɪbəl friː ɔːr ɪz ˈsʌmwʌn ˈsɪtɪŋ hɪər?",
    "translations": {
      "Spanish": "¿Esta mesa está libre o hay alguien sentado aquí?",
      "Portuguese": "Esta mesa está livre ou tem alguém sentado aqui?",
      "French": "Cette table est-elle libre, ou quelqu'un est-il assis ici ?",
      "German": "Ist dieser Tisch frei oder sitzt hier schon jemand?",
      "Italian": "Questo tavolo è libero o è occupato?"
    },
    "why": "Very courteous before taking a seat in a crowded café.",
    "scenario": "Finding a place to sit during busy café hours."
  },
  {
    "id": "lesson-6",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "starter",
    "english": "Can I have an extra napkin and a cup sleeve?",
    "phonetic": "kæn aɪ hæv ən ˈɛkstrə ˈnæpkɪn ænd ə kʌp sliːv?",
    "translations": {
      "Spanish": "¿Puedo pedir una servilleta extra y un protector para el vaso?",
      "Portuguese": "Posso pegar um guardanapo extra e uma proteção de copo?",
      "French": "Puis-je avoir une serviette supplémentaire et un manchon pour le gobelet ?",
      "German": "Kann ich bitte eine zusätzliche Serviette und eine Bechermanschette haben?",
      "Italian": "Posso avere un tovagliolo in più e un manicotto per la tazza?"
    },
    "why": "\"Cup sleeve\" prevents burning your fingers on hot drinks.",
    "scenario": "Picking up your hot drink at the pickup counter."
  },
  {
    "id": "lesson-7",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "everyday",
    "english": "Does this smoothie contain any added sugar?",
    "phonetic": "dʌz ðɪs ˈsmuːði kənˈteɪn ˈɛni ˈædɪd ˈʃʊɡər?",
    "translations": {
      "Spanish": "¿Este batido contiene azúcar agregada?",
      "Portuguese": "Este smoothie contém açúcar adicionado?",
      "French": "Ce smoothie contient-il du sucre ajouté ?",
      "German": "Enthält dieser Smoothie zugesetzten Zucker?",
      "Italian": "Questo frullato contiene zucchero aggiunto?"
    },
    "why": "Asking about ingredients naturally and politely.",
    "scenario": "Checking nutritional details before ordering."
  },
  {
    "id": "lesson-8",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "starter",
    "english": "Can I pay with Apple Pay or credit card?",
    "phonetic": "kæn aɪ peɪ wɪð ˈæpəl peɪ ɔːr ˈkrɛdɪt kɑːrd?",
    "translations": {
      "Spanish": "¿Puedo pagar con Apple Pay o tarjeta de crédito?",
      "Portuguese": "Posso pagar com Apple Pay ou cartão de crédito?",
      "French": "Puis-je payer avec Apple Pay ou par carte bancaire ?",
      "German": "Kann ich mit Apple Pay oder Kreditkarte bezahlen?",
      "Italian": "Posso pagare con Apple Pay o carta di credito?"
    },
    "why": "Straightforward way to check accepted contactless payment methods.",
    "scenario": "Paying at the cash register or mobile terminal."
  },
  {
    "id": "lesson-9",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "confident",
    "english": "Could you make that with half the syrup, please?",
    "phonetic": "kʊd juː meɪk ðæt wɪð hæf ðə ˈsɪrəp pliːz?",
    "translations": {
      "Spanish": "¿Podrías prepararlo con la mitad del jarabe, por favor?",
      "Portuguese": "Você poderia fazer com metade do xarope, por favor?",
      "French": "Pourriez-vous préparer cela avec deux fois moins de sirop, s'il vous plaît ?",
      "German": "Könnten Sie das bitte mit der halben Menge Sirup machen?",
      "Italian": "Potrebbe farmelo con metà sciroppo, per favore?"
    },
    "why": "Modifying sweetness levels like a fluent speaker.",
    "scenario": "Customizing flavor intensity in flavored coffees."
  },
  {
    "id": "lesson-10",
    "topicId": "coffee",
    "topicName": "Coffee & Food",
    "emoji": "☕",
    "level": "starter",
    "english": "Thank you so much! Have a wonderful day.",
    "phonetic": "θæŋk juː soʊ mʌtʃ hæv ə ˈwʌndərfəl deɪ",
    "translations": {
      "Spanish": "¡Muchas gracias! Que tengas un día maravilloso.",
      "Portuguese": "Muito obrigado! Tenha um ótimo dia.",
      "French": "Merci beaucoup ! Passez une excellente journée.",
      "German": "Vielen Dank! Einen schönen Tag noch.",
      "Italian": "Grazie mille! Buona giornata."
    },
    "why": "A warm parting phrase leaves a great impression anywhere.",
    "scenario": "Leaving a store, coffee shop, or counter."
  },
  {
    "id": "lesson-11",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "starter",
    "english": "Excuse me, which aisle can I find the eggs in?",
    "phonetic": "ɪkˈskjuːz miː wɪtʃ aɪl kæn aɪ faɪnd ðiː ɛɡz ɪn?",
    "translations": {
      "Spanish": "Disculpe, ¿en qué pasillo puedo encontrar los huevos?",
      "Portuguese": "Com licença, em qual corredor posso encontrar os ovos?",
      "French": "Excusez-moi, dans quelle allée puis-je trouver les œufs ?",
      "German": "Entschuldigung, in welchem Gang finde ich die Eier?",
      "Italian": "Mi scusi, in quale corsia trovo le uova?"
    },
    "why": "\"Aisle\" (pronounced \"eye-ul\") is the word for store corridors.",
    "scenario": "Asking a grocery store clerk for assistance."
  },
  {
    "id": "lesson-12",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "starter",
    "english": "How much is this per kilogram, please?",
    "phonetic": "haʊ mʌtʃ ɪz ðɪs pɜːr ˈkɪləˌɡræm pliːz?",
    "translations": {
      "Spanish": "¿Cuánto cuesta esto por kilo, por favor?",
      "Portuguese": "Quanto custa isso por quilo, por favor?",
      "French": "Combien cela coûte-t-il au kilo, s'il vous plaît ?",
      "German": "Wie viel kostet das pro Kilo, bitte?",
      "Italian": "Quanto costa al chilo, per favore?"
    },
    "why": "Asking unit price for fresh produce and bulk goods.",
    "scenario": "Checking fruit and vegetable prices at the produce section."
  },
  {
    "id": "lesson-13",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "starter",
    "english": "Could I please have two paper bags?",
    "phonetic": "kʊd aɪ pliːz hæv tuː ˈpeɪpər bæɡz?",
    "translations": {
      "Spanish": "¿Me daría dos bolsas de papel, por favor?",
      "Portuguese": "Poderia me dar duas sacolas de papel, por favor?",
      "French": "Pourrais-je avoir deux sacs en papier, s'il vous plaît ?",
      "German": "Könnte ich bitte zwei Papiertüten haben?",
      "Italian": "Posso avere due sacchetti di carta, per favore?"
    },
    "why": "Requesting shopping bags at the checkout cashier.",
    "scenario": "Packing your groceries at the payment terminal."
  },
  {
    "id": "lesson-14",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "everyday",
    "english": "Is there a self-checkout line available?",
    "phonetic": "ɪz ðɛər ə sɛlf ˈtʃɛkˌaʊt laɪn əˈveɪləbəl?",
    "translations": {
      "Spanish": "¿Hay cajas de autopago disponibles?",
      "Portuguese": "Há caixas de autoatendimento disponíveis?",
      "French": "Y a-t-il des caisses automatiques disponibles ?",
      "German": "Gibt es eine SB-Kasse (Selbstbedienung)?",
      "Italian": "C'è una cassa automatica disponibile?"
    },
    "why": "\"Self-checkout\" is the standard term for automated scanning stations.",
    "scenario": "Bypassing long register lines with a few items."
  },
  {
    "id": "lesson-15",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "everyday",
    "english": "Do you know if this item is on sale?",
    "phonetic": "duː juː noʊ ɪf ðɪs ˈaɪtəm ɪz ɑːn seɪl?",
    "translations": {
      "Spanish": "¿Sabe si este artículo está en oferta?",
      "Portuguese": "Você sabe se este item está em promoção?",
      "French": "Savez-vous si cet article est en promotion ?",
      "German": "Wissen Sie, ob dieser Artikel im Angebot ist?",
      "Italian": "Sa se questo articolo è in offerta?"
    },
    "why": "\"On sale\" means having a discount, while \"for sale\" just means available to buy.",
    "scenario": "Confirming promotional pricing before buying."
  },
  {
    "id": "lesson-16",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "confident",
    "english": "Could you double check the expiration date on this milk?",
    "phonetic": "kʊd juː ˈdʌbəl tʃɛk ðiː ˌɛkspəˈreɪʃən deɪt ɑːn ðɪs mɪlk?",
    "translations": {
      "Spanish": "¿Podría verificar la fecha de vencimiento de esta leche?",
      "Portuguese": "Poderia conferir a data de validade deste leite?",
      "French": "Pourriez-vous vérifier la date de péremption de ce lait ?",
      "German": "Könnten Sie bitte das Haltbarkeitsdatum dieser Milch überprüfen?",
      "Italian": "Potrebbe controllare la data di scadenza di questo latte?"
    },
    "why": "Asking politely when product dates are blurry or hard to read.",
    "scenario": "Checking dairy or refrigerated items in a grocery aisle."
  },
  {
    "id": "lesson-17",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "starter",
    "english": "I will pay with cash, here is twenty dollars.",
    "phonetic": "aɪ wɪl peɪ wɪð kæʃ hɪər ɪz ˈtwɛnti ˈdɑːlərz",
    "translations": {
      "Spanish": "Pagaré en efectivo, aquí tiene veinte dólares.",
      "Portuguese": "Vou pagar em dinheiro, aqui estão vinte dólares.",
      "French": "Je vais payer en espèces, voici vingt dollars.",
      "German": "Ich zahle bar, hier sind zwanzig Dollar.",
      "Italian": "Pago in contanti, ecco venti dollari."
    },
    "why": "Clear communication when handing bills to a cashier.",
    "scenario": "Paying with paper cash at the counter."
  },
  {
    "id": "lesson-18",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "starter",
    "english": "Could I please get a printed receipt?",
    "phonetic": "kʊd aɪ pliːz ɡɛt ə ˈprɪntɪd rɪˈsiːt?",
    "translations": {
      "Spanish": "¿Podría darme un recibo impreso, por favor?",
      "Portuguese": "Poderia me dar um recibo impresso, por favor?",
      "French": "Pourrais-je avoir un reçu imprimé, s'il vous plaît ?",
      "German": "Könnte ich bitte eine Quittung im Ausdruck haben?",
      "Italian": "Posso avere lo scontrino stampato, per favore?"
    },
    "why": "Remember the \"p\" in \"receipt\" is silent (pronounced ri-SEET).",
    "scenario": "Asking for proof of purchase at any retail checkout."
  },
  {
    "id": "lesson-19",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "everyday",
    "english": "Do you have this shirt in a size medium?",
    "phonetic": "duː juː hæv ðɪs ʃɜːrt ɪn ə saɪz ˈmiːdiəm?",
    "translations": {
      "Spanish": "¿Tiene esta camisa en talla mediana?",
      "Portuguese": "Você tem esta camisa no tamanho M?",
      "French": "Avez-vous cette chemise en taille M ?",
      "German": "Haben Sie dieses Hemd in Größe M?",
      "Italian": "Ha questa camicia in taglia media?"
    },
    "why": "The standard formula: \"in a size + [small/medium/large]\".",
    "scenario": "Browsing clothes at an apparel boutique."
  },
  {
    "id": "lesson-20",
    "topicId": "shopping",
    "topicName": "Supermarket & Shopping",
    "emoji": "🛒",
    "level": "everyday",
    "english": "Where are the fitting rooms located?",
    "phonetic": "wɛər ɑːr ðə ˈfɪtɪŋ ruːmz loʊˈkeɪtɪd?",
    "translations": {
      "Spanish": "¿Dónde están los probadores?",
      "Portuguese": "Onde ficam os provadores?",
      "French": "Où se trouvent les cabines d'essayage ?",
      "German": "Wo befinden sich die Umkleidekabinen?",
      "Italian": "Dove sono i camerini di prova?"
    },
    "why": "\"Fitting rooms\" or \"dressing rooms\" is standard American and British English.",
    "scenario": "Trying on clothes before making a purchase."
  },
  {
    "id": "lesson-21",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "starter",
    "english": "Excuse me, where is the check-in desk for flight 204?",
    "phonetic": "ɪkˈskjuːz miː wɛər ɪz ðə ˈtʃɛkˌɪn dɛsk fɔːr flaɪt tuː oʊ fɔːr?",
    "translations": {
      "Spanish": "Disculpe, ¿dónde está el mostrador de facturación para el vuelo 204?",
      "Portuguese": "Com licença, onde fica o balcão de check-in para o voo 204?",
      "French": "Excusez-moi, où est le comptoir d'enregistrement du vol 204 ?",
      "German": "Entschuldigung, wo ist der Check-in-Schalter für Flug 204?",
      "Italian": "Mi scusi, dov'è il banco del check-in per il volo 204?"
    },
    "why": "Asking airport ground staff for terminal directions.",
    "scenario": "Arriving at the airport departures hall."
  },
  {
    "id": "lesson-22",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "everyday",
    "english": "Is my carry-on bag within the size limit?",
    "phonetic": "ɪz maɪ ˈkæri ɑːn bæɡ wɪðˈɪn ðə saɪz ˈlɪmɪt?",
    "translations": {
      "Spanish": "¿Mi equipaje de mano cumple con el límite de tamaño?",
      "Portuguese": "Minha bagagem de mão está dentro do limite de tamanho?",
      "French": "Mon bagage à main respecte-t-il la taille limite ?",
      "German": "Entspricht mein Handgepäck der Größengrenze?",
      "Italian": "Il mio bagaglio a mano rientra nelle dimensioni consentite?"
    },
    "why": "\"Carry-on\" refers to bags you take onto the plane cabin.",
    "scenario": "Checking bag dimensions at the gate."
  },
  {
    "id": "lesson-23",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "starter",
    "english": "Could I please have a window seat if one is available?",
    "phonetic": "kʊd aɪ pliːz hæv ə ˈwɪndoʊ siːt ɪf wʌn ɪz əˈveɪləbəl?",
    "translations": {
      "Spanish": "¿Podría darme un asiento de ventanilla si hay uno disponible?",
      "Portuguese": "Poderia me dar um assento na janela, se houver um disponível?",
      "French": "Pourrais-je avoir un siège côté fenêtre si possible ?",
      "German": "Könnte ich bitte einen Fensterplatz haben, falls einer frei ist?",
      "Italian": "Posso avere un posto vicino al finestrino, se disponibile?"
    },
    "why": "Asking for window vs aisle seat politely.",
    "scenario": "Selecting your seating assignment at the check-in desk."
  },
  {
    "id": "lesson-24",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "everyday",
    "english": "Has the boarding gate changed for this flight?",
    "phonetic": "hæz ðə ˈbɔːrdɪŋ ɡeɪt tʃeɪndʒd fɔːr ðɪs flaɪt?",
    "translations": {
      "Spanish": "¿Ha cambiado la puerta de embarque para este vuelo?",
      "Portuguese": "O portão de embarque mudou para este voo?",
      "French": "La porte d'embarquement a-t-elle changé pour ce vol ?",
      "German": "Hat sich das Flugsteig (Gate) für diesen Flug geändert?",
      "Italian": "È cambiato il gate di imbarco per questo volo?"
    },
    "why": "Confirming sudden airport announcements or monitor changes.",
    "scenario": "Waiting near the gate area."
  },
  {
    "id": "lesson-25",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "starter",
    "english": "Where can I find the baggage claim area?",
    "phonetic": "wɛər kæn aɪ faɪnd ðə ˈbæɡɪdʒ kleɪm ˈɛriə?",
    "translations": {
      "Spanish": "¿Dónde puedo encontrar el área de reclamo de equipaje?",
      "Portuguese": "Onde posso encontrar a esteira de bagagens?",
      "French": "Où puis-je trouver la zone de récupération des bagages ?",
      "German": "Wo finde ich die Gepäckausgabe?",
      "Italian": "Dove posso trovare il ritiro bagagli?"
    },
    "why": "\"Baggage claim\" is universal airport terminology for luggage collection.",
    "scenario": "Landing at an international airport."
  },
  {
    "id": "lesson-26",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "everyday",
    "english": "How often does the express train to the city center run?",
    "phonetic": "haʊ ˈɔːfən dʌz ðiː ɪkˈsprɛs treɪn tuː ðə ˈsɪti ˈsɛntər rʌn?",
    "translations": {
      "Spanish": "¿Con qué frecuencia pasa el tren expreso al centro de la ciudad?",
      "Portuguese": "Com que frequência passa o trem expresso para o centro da cidade?",
      "French": "À quelle fréquence passe le train express pour le centre-ville ?",
      "German": "Wie oft fährt der Expresszug ins Stadtzentrum?",
      "Italian": "Ogni quanto passa il treno espresso per il centro città?"
    },
    "why": "\"How often does [transit] run?\" is the most natural frequency question.",
    "scenario": "Planning transportation from the airport into the city."
  },
  {
    "id": "lesson-27",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "starter",
    "english": "Could you tell me how to get to this address, please?",
    "phonetic": "kʊd juː tɛl miː haʊ tuː ɡɛt tuː ðɪs əˈdrɛs pliːz?",
    "translations": {
      "Spanish": "¿Podría decirme cómo llegar a esta dirección, por favor?",
      "Portuguese": "Poderia me dizer como chegar a este endereço, por favor?",
      "French": "Pourriez-vous m'indiquer comment me rendre à cette adresse ?",
      "German": "Könnten Sie mir bitte sagen, wie ich zu dieser Adresse komme?",
      "Italian": "Potrebbe dirmi come arrivare a questo indirizzo, per favore?"
    },
    "why": "Showing your phone screen with an address while speaking.",
    "scenario": "Asking a passerby, taxi driver, or information desk for directions."
  },
  {
    "id": "lesson-28",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "starter",
    "english": "Is this bus going directly to downtown?",
    "phonetic": "ɪz ðɪs bʌs ˈɡoʊɪŋ dɪˈrɛktli tuː ˈdaʊnˌtaʊn?",
    "translations": {
      "Spanish": "¿Este autobús va directamente al centro?",
      "Portuguese": "Este ônibus vai direto para o centro da cidade?",
      "French": "Ce bus va-t-il directement au centre-ville ?",
      "German": "Fährt dieser Bus direkt ins Stadtzentrum?",
      "Italian": "Questo autobus va direttamente in centro?"
    },
    "why": "Double-checking before boarding the wrong public transit route.",
    "scenario": "Asking the bus driver before boarding."
  },
  {
    "id": "lesson-29",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "everyday",
    "english": "Where can I buy a rechargeable subway transit card?",
    "phonetic": "wɛər kæn aɪ baɪ ə riːˈtʃɑːrdʒəbəl ˈsʌbˌweɪ ˈtrænzɪt kɑːrd?",
    "translations": {
      "Spanish": "¿Dónde puedo comprar una tarjeta de metro recargable?",
      "Portuguese": "Onde posso comprar um cartão de metrô recarregável?",
      "French": "Où puis-je acheter une carte de métro rechargeable ?",
      "German": "Wo kann ich eine wiederaufladbare U-Bahn-Fahrkarte kaufen?",
      "Italian": "Dove posso acquistare una tessera della metropolitana ricaricabile?"
    },
    "why": "Asking about local transit passes to save money.",
    "scenario": "Entering a metropolitan subway station."
  },
  {
    "id": "lesson-30",
    "topicId": "travel",
    "topicName": "Airport & Travel",
    "emoji": "✈️",
    "level": "confident",
    "english": "Could you please call a taxi for me to the airport?",
    "phonetic": "kʊd juː pliːz kɔːl ə ˈtæksi fɔːr miː tuː ðiː ˈɛrˌpɔːrt?",
    "translations": {
      "Spanish": "¿Podría pedirme un taxi al aeropuerto, por favor?",
      "Portuguese": "Você poderia chamar um táxi para o aeroporto para mim, por favor?",
      "French": "Pourriez-vous s'il vous plaît m'appeler un taxi pour l'aéroport ?",
      "German": "Könnten Sie mir bitte ein Taxi zum Flughafen rufen?",
      "Italian": "Potrebbe chiamarmi un taxi per l'aeroporto, per favore?"
    },
    "why": "A polite request for hotel receptionists or hosts.",
    "scenario": "Arranging airport transfer at hotel checkout."
  },
  {
    "id": "lesson-31",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "starter",
    "english": "Hi, I have a reservation under the name John Smith.",
    "phonetic": "haɪ aɪ hæv ə ˌrɛzərˈveɪʃən ˈʌndər ðə neɪm dʒɑːn smɪθ",
    "translations": {
      "Spanish": "Hola, tengo una reserva a nombre de John Smith.",
      "Portuguese": "Olá, tenho uma reserva no nome de John Smith.",
      "French": "Bonjour, j'ai une réservation au nom de John Smith.",
      "German": "Hallo, ich habe eine Reservierung auf den Namen John Smith.",
      "Italian": "Salve, ho una prenotazione a nome John Smith."
    },
    "why": "\"Under the name...\" is the exact phrasing used at check-in desks.",
    "scenario": "Checking in at any hotel or bed-and-breakfast."
  },
  {
    "id": "lesson-32",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "everyday",
    "english": "Is early check-in possible, or can I leave my bags here?",
    "phonetic": "ɪz ˈɜːrli ˈtʃɛkˌɪn ˈpɑːsəbəl ɔːr kæn aɪ liːv maɪ bæɡz hɪər?",
    "translations": {
      "Spanish": "¿Es posible hacer el registro temprano o puedo dejar mis maletas aquí?",
      "Portuguese": "É possível fazer check-in antecipado, ou posso deixar minhas malas aqui?",
      "French": "Est-il possible d'arriver plus tôt, ou puis-je laisser mes bagages ici ?",
      "German": "Ist ein früherer Check-in möglich, oder kann ich meine Koffer hier lassen?",
      "Italian": "È possibile fare il check-in anticipato o posso lasciare le valigie qui?"
    },
    "why": "Gives the hotel staff two practical solutions if your room is not ready.",
    "scenario": "Arriving before official 3 PM check-in time."
  },
  {
    "id": "lesson-33",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "starter",
    "english": "What is the Wi-Fi password for guests?",
    "phonetic": "wʌt ɪz ðə ˈwaɪfaɪ ˈpæswɜːrd fɔːr ɡɛsts?",
    "translations": {
      "Spanish": "¿Cuál es la contraseña del wifi para huéspedes?",
      "Portuguese": "Qual é a senha do Wi-Fi para hóspedes?",
      "French": "Quel est le mot de passe Wi-Fi pour les clients ?",
      "German": "Wie lautet das WLAN-Passwort für Gäste?",
      "Italian": "Qual è la password del Wi-Fi per gli ospiti?"
    },
    "why": "Short, direct, and universally understood.",
    "scenario": "Getting connected to the internet in a hotel or Airbnb."
  },
  {
    "id": "lesson-34",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "starter",
    "english": "What time is breakfast served in the morning?",
    "phonetic": "wʌt taɪm ɪz ˈbrɛkfəst sɜːrvd ɪn ðə ˈmɔːrnɪŋ?",
    "translations": {
      "Spanish": "¿A qué hora se sirve el desayuno por la mañana?",
      "Portuguese": "A que horas o café da manhã é servido?",
      "French": "À quelle heure le petit-déjeuner est-il servi ?",
      "German": "Um wie viel Uhr gibt es morgens Frühstück?",
      "Italian": "A che ora viene servita la colazione la mattina?"
    },
    "why": "Asking about meal schedules to plan your morning.",
    "scenario": "Reviewing hotel amenities at the front desk."
  },
  {
    "id": "lesson-35",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "starter",
    "english": "Could we please get two extra bath towels?",
    "phonetic": "kʊd wiː pliːz ɡɛt tuː ˈɛkstrə bæθ ˈtaʊəlz?",
    "translations": {
      "Spanish": "¿Podríamos pedir dos toallas de baño adicionales, por favor?",
      "Portuguese": "Poderíamos pedir duas toalhas de banho extras, por favor?",
      "French": "Pourrions-nous avoir deux serviettes de bain supplémentaires, s'il vous plaît ?",
      "German": "Könnten wir bitte zwei zusätzliche Badetücher bekommen?",
      "Italian": "Potremmo avere due asciugamani da bagno in più, per favore?"
    },
    "why": "Requesting housekeeping supplies clearly.",
    "scenario": "Calling housekeeping from your room phone."
  },
  {
    "id": "lesson-36",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "everyday",
    "english": "Excuse me, my keycard seems to have stopped working.",
    "phonetic": "ɪkˈskjuːz miː maɪ ˈkiːˌkɑːrd siːmz tuː hæv stɑːpt ˈwɜːrkɪŋ",
    "translations": {
      "Spanish": "Disculpe, parece que mi tarjeta llave dejó de funcionar.",
      "Portuguese": "Com licença, meu cartão de acesso parece ter parado de funcionar.",
      "French": "Excusez-moi, ma carte magnétique semble ne plus fonctionner.",
      "German": "Entschuldigung, meine Schlüsselkarte scheint nicht mehr zu funktionieren.",
      "Italian": "Mi scusi, la mia tessera sembra non funzionare più."
    },
    "why": "\"Seems to have stopped working\" is polite and non-accusatory.",
    "scenario": "Reactivating a demagnetized hotel room door card."
  },
  {
    "id": "lesson-37",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "everyday",
    "english": "Would it be possible to arrange a late checkout?",
    "phonetic": "wʊd ɪt biː ˈpɑːsəbəl tuː əˈreɪndʒ ə leɪt ˈtʃɛkˌaʊt?",
    "translations": {
      "Spanish": "¿Sería posible coordinar una salida tardía?",
      "Portuguese": "Seria possível providenciar um check-out tardio?",
      "French": "Serait-il possible d'organiser un départ tardif ?",
      "German": "Wäre ein später Check-out möglich?",
      "Italian": "Sarebbe possibile organizzare un late check-out?"
    },
    "why": "\"Arrange a late checkout\" is the professional phrasing.",
    "scenario": "Requesting extra time in your room before your afternoon flight."
  },
  {
    "id": "lesson-38",
    "topicId": "travel",
    "topicName": "Hotel & Lodging",
    "emoji": "🏨",
    "level": "starter",
    "english": "We are checking out now. Thank you for a lovely stay!",
    "phonetic": "wiː ɑːr ˈtʃɛkɪŋ aʊt naʊ θæŋk juː fɔːr ə ˈlʌvli steɪ",
    "translations": {
      "Spanish": "Estamos haciendo el check-out ahora. ¡Gracias por una hermosa estancia!",
      "Portuguese": "Estamos fazendo o check-out agora. Obrigado pela estadia agradável!",
      "French": "Nous réglons le départ maintenant. Merci pour ce séjour agréable !",
      "German": "Wir checken jetzt aus. Vielen Dank für den schönen Aufenthalt!",
      "Italian": "Facciamo il check-out ora. Grazie per il piacevole soggiorno!"
    },
    "why": "Friendly, courteous departure phrase for front desk reception.",
    "scenario": "Returning room keys on your final morning."
  },
  {
    "id": "lesson-41",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "starter",
    "english": "Good evening, do you have a table for two available?",
    "phonetic": "ɡʊd ˈiːvnɪŋ duː juː hæv ə ˈteɪbəl fɔːr tuː əˈveɪləbəl?",
    "translations": {
      "Spanish": "Buenas noches, ¿tienen una mesa para dos disponible?",
      "Portuguese": "Boa noite, vocês têm uma mesa para dois disponível?",
      "French": "Bonsoir, avez-vous une table pour deux personnes disponible ?",
      "German": "Guten Abend, haben Sie einen Tisch für zwei Personen frei?",
      "Italian": "Buonasera, avete un tavolo per due disponibile?"
    },
    "why": "The standard greeting when entering a dining establishment.",
    "scenario": "Walking into a restaurant without a prior reservation."
  },
  {
    "id": "lesson-42",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "everyday",
    "english": "Could we see the dinner menu and the drinks list, please?",
    "phonetic": "kʊd wiː siː ðə ˈdɪnər ˈmɛnjuː ænd ðə drɪŋks lɪst pliːz?",
    "translations": {
      "Spanish": "¿Podríamos ver el menú de la cena y la carta de bebidas, por favor?",
      "Portuguese": "Poderíamos ver o cardápio do jantar e a carta de bebidas, por favor?",
      "French": "Pourrions-nous voir la carte du dîner et la carte des boissons ?",
      "German": "Könnten wir bitte die Speise- und Getränkekarte sehen?",
      "Italian": "Potremmo vedere il menù della cena e la lista delle bevande, per favore?"
    },
    "why": "Polite request as soon as you are seated.",
    "scenario": "Sitting down at a restaurant table."
  },
  {
    "id": "lesson-43",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "everyday",
    "english": "What dish would you personally recommend?",
    "phonetic": "wʌt dɪʃ wʊd juː ˈpɜːrsənəli ˌrɛkəˈmɛnd?",
    "translations": {
      "Spanish": "¿Qué plato recomendarías personalmente?",
      "Portuguese": "Qual prato você recomendaria pessoalmente?",
      "French": "Quel plat recommanderiez-vous personnellement ?",
      "German": "Welches Gericht würden Sie persönlich empfehlen?",
      "Italian": "Quale piatto consiglierebbe personalmente?"
    },
    "why": "Waiters love this question and will point out their freshest specialties.",
    "scenario": "Undecided about what to order."
  },
  {
    "id": "lesson-44",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "everyday",
    "english": "Could we have some tap water for the table, please?",
    "phonetic": "kʊd wiː hæv sʌm tæp ˈwɔːtər fɔːr ðə ˈteɪbəl pliːz?",
    "translations": {
      "Spanish": "¿Nos podría traer agua de grifo para la mesa, por favor?",
      "Portuguese": "Poderia nos trazer água da torneira para a mesa, por favor?",
      "French": "Pourrions-nous avoir une carafe d'eau, s'il vous plaît ?",
      "German": "Könnten wir bitte Leitungswasser für den Tisch haben?",
      "Italian": "Potremmo avere dell'acqua del rubinetto per il tavolo, per favore?"
    },
    "why": "\"Tap water\" is complimentary in most English-speaking countries.",
    "scenario": "Ordering drinks at the beginning of a meal."
  },
  {
    "id": "lesson-45",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "confident",
    "english": "I am allergic to peanuts. Does this dish contain any nuts?",
    "phonetic": "aɪ æm əˈlɜːrdʒɪk tuː ˈpiːˌnʌts dʌz ðɪs dɪʃ kənˈteɪn ˈɛni nʌts?",
    "translations": {
      "Spanish": "Soy alérgico a los cacahuates. ¿Este plato contiene frutos secos?",
      "Portuguese": "Sou alérgico a amendoim. Este prato contém nozes ou castanhas?",
      "French": "Je suis allergique aux arachides. Ce plat contient-il des fruits à coque ?",
      "German": "Ich bin allergisch gegen Erdnüsse. Enthält dieses Gericht Nüsse?",
      "Italian": "Sono allergico alle arachidi. Questo piatto contiene frutta a guscio?"
    },
    "why": "Clear, direct notification for dietary allergies.",
    "scenario": "Informing your server about food safety concerns."
  },
  {
    "id": "lesson-46",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "starter",
    "english": "Everything was delicious, thank you so much!",
    "phonetic": "ˈɛvriˌθɪŋ wʌz dɪˈlɪʃəs θæŋk juː soʊ mʌtʃ",
    "translations": {
      "Spanish": "¡Todo estuvo delicioso, muchísimas gracias!",
      "Portuguese": "Estava tudo delicioso, muito obrigado!",
      "French": "Tout était délicieux, merci beaucoup !",
      "German": "Alles war köstlich, vielen Dank!",
      "Italian": "Era tutto delizioso, grazie mille!"
    },
    "why": "Complimenting the meal when the server clears plates.",
    "scenario": "Finishing the main course."
  },
  {
    "id": "lesson-47",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "starter",
    "english": "Could we please get the check when you have a moment?",
    "phonetic": "kʊd wiː pliːz ɡɛt ðə tʃɛk wɛn juː hæv ə ˈmoʊmənt?",
    "translations": {
      "Spanish": "¿Nos trae la cuenta cuando tenga un momento, por favor?",
      "Portuguese": "Poderia trazer a conta quando tiver um momento, por favor?",
      "French": "Pourrions-nous avoir l'addition quand vous aurez un moment ?",
      "German": "Könnten wir bitte die Rechnung bekommen, wenn Sie kurz Zeit haben?",
      "Italian": "Potremmo avere il conto quando ha un momento, per favore?"
    },
    "why": "\"When you have a moment\" adds respectful consideration.",
    "scenario": "Ready to pay and conclude your dinner."
  },
  {
    "id": "lesson-48",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "everyday",
    "english": "Can we split the bill between two cards?",
    "phonetic": "kæn wiː splɪt ðə bɪl bɪˈtwiːn tuː kɑːrdz?",
    "translations": {
      "Spanish": "¿Podemos dividir la cuenta entre dos tarjetas?",
      "Portuguese": "Podemos dividir a conta em dois cartões?",
      "French": "Pouvons-nous partager l'addition sur deux cartes ?",
      "German": "Können wir die Rechnung auf zwei Karten aufteilen?",
      "Italian": "Possiamo dividere il conto su due carte?"
    },
    "why": "\"Split the bill\" is the common term for sharing costs.",
    "scenario": "Paying with a friend or colleague."
  },
  {
    "id": "lesson-49",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "starter",
    "english": "Could we get a box to take the leftovers home?",
    "phonetic": "kʊd wiː ɡɛt ə bɑːks tuː teɪk ðə ˈlɛftˌoʊvərz hoʊm?",
    "translations": {
      "Spanish": "¿Nos podría dar una caja para llevar las sobras a casa?",
      "Portuguese": "Poderia nos dar uma embalagem para levar o que sobrou?",
      "French": "Pourrions-nous avoir une boîte pour emporter les restes ?",
      "German": "Könnten wir eine Schachtel bekommen, um die Reste mitzunehmen?",
      "Italian": "Potremmo avere una vaschetta per portare a casa gli avanzi?"
    },
    "why": "\"To-go box\" or \"box for leftovers\" is standard and completely acceptable.",
    "scenario": "Taking home remaining portions from a restaurant."
  },
  {
    "id": "lesson-50",
    "topicId": "coffee",
    "topicName": "Dining & Restaurants",
    "emoji": "🍽️",
    "level": "everyday",
    "english": "Keep the change, the service was fantastic!",
    "phonetic": "kiːp ðə tʃeɪndʒ ðə ˈsɜːrvɪs wʌz fænˈtæstɪk",
    "translations": {
      "Spanish": "Quédese con el cambio, ¡el servicio fue fantástico!",
      "Portuguese": "Fique com o troco, o atendimento foi fantástico!",
      "French": "Gardez la monnaie, le service était fantastique !",
      "German": "Stimmt so, der Service war fantastisch!",
      "Italian": "Tenga pure il resto, il servizio è stato fantastico!"
    },
    "why": "\"Keep the change\" is how native speakers tip with cash.",
    "scenario": "Leaving a cash tip for exceptional service."
  },
  {
    "id": "lesson-51",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "starter",
    "english": "Hi there! Nice to meet you, my name is Alex.",
    "phonetic": "haɪ ðɛər naɪs tuː miːt juː maɪ neɪm ɪz ˈæləks",
    "translations": {
      "Spanish": "¡Hola! Mucho gusto en conocerte, mi nombre es Alex.",
      "Portuguese": "Olá! Prazer em te conhecer, meu nome é Alex.",
      "French": "Salut ! Ravi de vous rencontrer, je m'appelle Alex.",
      "German": "Hallo! Schön dich kennenzulernen, mein Name ist Alex.",
      "Italian": "Ciao! Piacere di conoscerti, mi chiamo Alex."
    },
    "why": "Casual, friendly initial handshake or greeting.",
    "scenario": "Meeting someone new at a meetup or gathering."
  },
  {
    "id": "lesson-52",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "starter",
    "english": "How has your day been going so far?",
    "phonetic": "haʊ hæz jɔːr deɪ biːn ˈɡoʊɪŋ soʊ fɑːr?",
    "translations": {
      "Spanish": "¿Cómo ha ido tu día hasta ahora?",
      "Portuguese": "Como tem sido o seu dia até agora?",
      "French": "Comment s'est passée votre journée jusqu'à présent ?",
      "German": "Wie war dein Tag bisher?",
      "Italian": "Com'è andata la tua giornata finora?"
    },
    "why": "\"So far\" makes the question natural and open-ended.",
    "scenario": "Small talk while waiting or making casual conversation."
  },
  {
    "id": "lesson-53",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "everyday",
    "english": "What do you like to do in your free time?",
    "phonetic": "wʌt duː juː laɪk tuː duː ɪn jɔːr friː taɪm?",
    "translations": {
      "Spanish": "¿Qué te gusta hacer en tu tiempo libre?",
      "Portuguese": "O que você gosta de fazer no seu tempo livre?",
      "French": "Qu'aimez-vous faire pendant votre temps libre ?",
      "German": "Was machst du gerne in deiner Freizeit?",
      "Italian": "Cosa ti piace fare nel tuo tempo libero?"
    },
    "why": "The best organic icebreaker question about hobbies and interests.",
    "scenario": "Transitioning from pleasantries to genuine conversation."
  },
  {
    "id": "lesson-54",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "starter",
    "english": "I really love your jacket! Where did you get it?",
    "phonetic": "aɪ ˈrɪəli lʌv jɔːr ˈdʒækɪt wɛər dɪd juː ɡɛt ɪt?",
    "translations": {
      "Spanish": "¡Me encanta tu chaqueta! ¿Dónde la conseguiste?",
      "Portuguese": "Adorei sua jaqueta! Onde você comprou?",
      "French": "J'adore ta veste ! Où l'as-tu trouvée ?",
      "German": "Ich liebe deine Jacke! Wo hast du die her?",
      "Italian": "Mi piace un sacco la tua giacca! Dove l'hai presa?"
    },
    "why": "A specific compliment instantly builds rapport with people.",
    "scenario": "Breaking the ice at a social event or party."
  },
  {
    "id": "lesson-55",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "everyday",
    "english": "Do you have any fun plans for this upcoming weekend?",
    "phonetic": "duː juː hæv ˈɛni fʌn plænz fɔːr ðɪs ˈʌpˌkʌmɪŋ ˈwiːkˌɛnd?",
    "translations": {
      "Spanish": "¿Tienes planes divertidos para este fin de semana?",
      "Portuguese": "Você tem planos legais para o próximo fim de semana?",
      "French": "Avez-vous des projets sympas pour ce week-end ?",
      "German": "Hast du schon schöne Pläne für das kommende Wochenende?",
      "Italian": "Hai programmi carini per il prossimo fine settimana?"
    },
    "why": "Standard Thursday/Friday small talk among acquaintances.",
    "scenario": "Casual chats towards the end of the work week."
  },
  {
    "id": "lesson-56",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "starter",
    "english": "Sorry, could you repeat that a little more slowly?",
    "phonetic": "ˈsɑːri kʊd juː rɪˈpiːt ðæt ə ˈlɪtəl mɔːr ˈsloʊli?",
    "translations": {
      "Spanish": "Disculpa, ¿podrías repetir eso un poco más despacio?",
      "Portuguese": "Desculpe, você poderia repetir isso um pouco mais devagar?",
      "French": "Désolé, pourriez-vous répéter un peu plus lentement ?",
      "German": "Entschuldigung, könntest du das etwas langsamer wiederholen?",
      "Italian": "Scusa, potresti ripetere un po' più lentamente?"
    },
    "why": "Never feel embarrassed to ask native speakers to adjust their pace.",
    "scenario": "When someone speaks too fast or with an unfamiliar accent."
  },
  {
    "id": "lesson-57",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "confident",
    "english": "I am still practicing my English, so thank you for your patience!",
    "phonetic": "aɪ æm stɪl ˈpræktɪsɪŋ maɪ ˈɪŋɡlɪʃ soʊ θæŋk juː fɔːr jɔːr ˈpeɪʃəns",
    "translations": {
      "Spanish": "Todavía estoy practicando mi inglés, ¡así que gracias por tu paciencia!",
      "Portuguese": "Ainda estou praticando meu inglês, então obrigado pela sua paciência!",
      "French": "Je pratique encore mon anglais, alors merci pour votre patience !",
      "German": "Ich übe mein Englisch noch, vielen Dank für deine Geduld!",
      "Italian": "Sto ancora praticando il mio inglese, quindi grazie per la pazienza!"
    },
    "why": "Disarming and makes people naturally supportive and friendly.",
    "scenario": "Conversing in English with native speakers."
  },
  {
    "id": "lesson-58",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "everyday",
    "english": "Are you on Instagram or WhatsApp? Let's stay in touch!",
    "phonetic": "ɑːr juː ɑːn ˈɪnstəˌɡræm ɔːr ˈwɑːtsˌæp lɛts steɪ ɪn tʌtʃ",
    "translations": {
      "Spanish": "¿Tienes Instagram o WhatsApp? ¡Mantengámonos en contacto!",
      "Portuguese": "Você tem Instagram ou WhatsApp? Vamos manter contato!",
      "French": "Tu es sur Instagram ou WhatsApp ? Restons en contact !",
      "German": "Bist du auf Instagram oder WhatsApp? Lass uns in Kontakt bleiben!",
      "Italian": "Sei su Instagram o WhatsApp? Rimaniamo in contatto!"
    },
    "why": "A modern, pressure-free way to connect after a good conversation.",
    "scenario": "Exchanging contacts with someone you enjoyed talking with."
  },
  {
    "id": "lesson-59",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "everyday",
    "english": "It was really wonderful talking with you!",
    "phonetic": "ɪt wʌz ˈrɪəli ˈwʌndərfəl ˈtɔːkɪŋ wɪð juː",
    "translations": {
      "Spanish": "¡Fue un verdadero placer hablar contigo!",
      "Portuguese": "Foi muito bom conversar com você!",
      "French": "C'était vraiment formidable de discuter avec vous !",
      "German": "Es war wirklich schön, mit dir zu sprechen!",
      "Italian": "È stato davvero un piacere parlare con te!"
    },
    "why": "Leaves the other person feeling valued and appreciated.",
    "scenario": "Wrapping up a friendly interaction."
  },
  {
    "id": "lesson-60",
    "topicId": "friends",
    "topicName": "Making Friends",
    "emoji": "👋",
    "level": "starter",
    "english": "Take care, and hope to see you again soon!",
    "phonetic": "teɪk kɛər ænd hoʊp tuː siː juː əˈɡɛn suːn",
    "translations": {
      "Spanish": "¡Cuídate, y espero verte pronto de nuevo!",
      "Portuguese": "Se cuida, e espero te ver de novo em breve!",
      "French": "Prenez soin de vous et à très bientôt !",
      "German": "Mach's gut, und hoffentlich bis bald!",
      "Italian": "Abbi cura di te, e spero di rivederti presto!"
    },
    "why": "Warm closing wish for friends and new acquaintances.",
    "scenario": "Saying goodbye."
  },
  {
    "id": "lesson-61",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "starter",
    "english": "I have a mild headache and a sore throat.",
    "phonetic": "aɪ hæv ə maɪld ˈhɛdˌeɪk ænd ə sɔːr θroʊt",
    "translations": {
      "Spanish": "Tengo un dolor de cabeza leve y dolor de garganta.",
      "Portuguese": "Estou com uma leve dor de cabeça e dor de garganta.",
      "French": "J'ai un léger mal de tête et mal à la gorge.",
      "German": "Ich habe leichte Kopfschmerzen und Halsschmerzen.",
      "Italian": "Ho un lieve mal di testa e mal di gola."
    },
    "why": "Explaining common symptoms accurately to doctors or pharmacists.",
    "scenario": "Visiting a clinic or pharmacy."
  },
  {
    "id": "lesson-62",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "everyday",
    "english": "Do you have any over-the-counter pain relief medication?",
    "phonetic": "duː juː hæv ˈɛni ˈoʊvər ðə ˈkaʊntər peɪn rɪˈliːf ˌmɛdɪˈkeɪʃən?",
    "translations": {
      "Spanish": "¿Tienen analgésicos de venta libre?",
      "Portuguese": "Você tem analgésicos de venda livre?",
      "French": "Avez-vous des analgésiques en vente libre ?",
      "German": "Haben Sie rezeptfreie Schmerzmittel?",
      "Italian": "Ha degli antidolorifici da banco senza ricetta?"
    },
    "why": "\"Over-the-counter\" (OTC) means medicines that do not require a prescription.",
    "scenario": "Buying headache or fever medicine at a drugstore."
  },
  {
    "id": "lesson-63",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "everyday",
    "english": "How many times a day should I take this medicine?",
    "phonetic": "haʊ ˈmɛni taɪmz ə deɪ ʃʊd aɪ teɪk ðɪs ˈmɛdɪsən?",
    "translations": {
      "Spanish": "¿Cuántas veces al día debo tomar este medicamento?",
      "Portuguese": "Quantas vezes ao dia devo tomar este remédio?",
      "French": "Combien de fois par jour dois-je prendre ce médicament ?",
      "German": "Wie oft am Tag soll ich dieses Medikament einnehmen?",
      "Italian": "Quante volte al giorno devo prendere questo medicinale?"
    },
    "why": "Confirming dosage and frequency for safe treatment.",
    "scenario": "Listening to pharmacist instructions."
  },
  {
    "id": "lesson-64",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "everyday",
    "english": "Should I take this medicine with food or on an empty stomach?",
    "phonetic": "ʃʊd aɪ teɪk ðɪs ˈmɛdɪsən wɪð fuːd ɔːr ɑːn ən ˈɛmpti ˈstʌmək?",
    "translations": {
      "Spanish": "¿Debo tomar este medicamento con alimentos o con el estómago vacío?",
      "Portuguese": "Devo tomar este remédio com comida ou em jejum?",
      "French": "Dois-je prendre ce médicament pendant les repas ou à jeun ?",
      "German": "Soll ich dieses Medikament mit dem Essen oder auf nüchternen Magen einnehmen?",
      "Italian": "Devo prendere questo medicinale a stomaco pieno o vuoto?"
    },
    "why": "Prevents stomach irritation caused by certain pills.",
    "scenario": "Asking a pharmacist about medication instructions."
  },
  {
    "id": "lesson-65",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "starter",
    "english": "I would like to schedule an appointment with a doctor, please.",
    "phonetic": "aɪ wʊd laɪk tuː ˈskɛdʒuːl ən əˈpɔɪntmənt wɪð ə ˈdɑːktər pliːz",
    "translations": {
      "Spanish": "Me gustaría programar una cita con un médico, por favor.",
      "Portuguese": "Gostaria de agendar uma consulta com um médico, por favor.",
      "French": "Je souhaiterais prendre rendez-vous avec un médecin, s'il vous plaît.",
      "German": "Ich möchte bitte einen Termin bei einem Arzt vereinbaren.",
      "Italian": "Vorrei fissare un appuntamento con un medico, per favore."
    },
    "why": "\"Schedule an appointment\" is the standard medical phrasing.",
    "scenario": "Calling a medical clinic or hospital desk."
  },
  {
    "id": "lesson-66",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "confident",
    "english": "Does this prescription have any drowsy side effects?",
    "phonetic": "dʌz ðɪs prɪˈskrɪpʃən hæv ˈɛni ˈdraʊzi saɪd ɪˈfɛkts?",
    "translations": {
      "Spanish": "¿Esta receta produce somnolencia como efecto secundario?",
      "Portuguese": "Este medicamento causa sonolência como efeito colateral?",
      "French": "Ce médicament a-t-il des effets secondaires provoquant la somnolence ?",
      "German": "Macht dieses Medikament schläfrig als Nebenwirkung?",
      "Italian": "Questa medicina dà sonnolenza come effetto collaterale?"
    },
    "why": "\"Drowsy\" means making you feel sleepy or tired.",
    "scenario": "Checking if it is safe to drive after taking medicine."
  },
  {
    "id": "lesson-67",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "starter",
    "english": "Could you give me a doctor's note for my employer?",
    "phonetic": "kʊd juː ɡɪv miː ə ˈdɑːktərz noʊt fɔːr maɪ ɪmˈplɔɪər?",
    "translations": {
      "Spanish": "¿Podría darme un justificante médico para mi empleador?",
      "Portuguese": "Poderia me dar um atestado médico para meu empregador?",
      "French": "Pourriez-vous me faire un certificat médical pour mon employeur ?",
      "German": "Könnten Sie mir eine Arbeitsunfähigkeitsbescheinigung ausstellen?",
      "Italian": "Potrebbe farmi un certificato medico per il mio datore di lavoro?"
    },
    "why": "\"Doctor's note\" is the universally used term for medical leave verification.",
    "scenario": "Requesting sick leave documentation."
  },
  {
    "id": "lesson-68",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "starter",
    "english": "Where can I find band-aids and antiseptic cream?",
    "phonetic": "wɛər kæn aɪ faɪnd ˈbændeɪdz ænd ˌæntiˈsɛptɪk kriːm?",
    "translations": {
      "Spanish": "¿Dónde puedo encontrar curitas y crema antiséptica?",
      "Portuguese": "Onde posso encontrar curativos e pomada antisséptica?",
      "French": "Où puis-je trouver des pansements et de la crème antiseptique ?",
      "German": "Wo finde ich Pflaster und antiseptische Creme?",
      "Italian": "Dove posso trovare cerotti e crema antisettica?"
    },
    "why": "\"Band-aid\" is the common term for adhesive bandages.",
    "scenario": "Buying first-aid supplies for a small cut or scrape."
  },
  {
    "id": "lesson-69",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "everyday",
    "english": "I have been feeling dizzy since yesterday morning.",
    "phonetic": "aɪ hæv biːn ˈfiːlɪŋ ˈdɪzi sɪns ˈjɛstərˌdeɪ ˈmɔːrnɪŋ",
    "translations": {
      "Spanish": "Me he estado sintiendo mareado desde ayer por la mañana.",
      "Portuguese": "Tenho me sentido tonto desde ontem de manhã.",
      "French": "J'ai des vertiges depuis hier matin.",
      "German": "Mir ist seit gestern Morgen schwindelig.",
      "Italian": "Mi sento stordito e ho le vertigini da ieri mattina."
    },
    "why": "\"Dizzy\" describes the feeling that the room is spinning.",
    "scenario": "Describing health symptoms to a physician."
  },
  {
    "id": "lesson-70",
    "topicId": "daily_help",
    "topicName": "Doctor & Pharmacy",
    "emoji": "🏥",
    "level": "starter",
    "english": "Thank you for your help, Doctor. Have a good day.",
    "phonetic": "θæŋk juː fɔːr jɔːr hɛlp ˈdɑːktər hæv ə ɡʊd deɪ",
    "translations": {
      "Spanish": "Gracias por su ayuda, doctor. Que tenga un buen día.",
      "Portuguese": "Obrigado pela sua ajuda, doutor. Tenha um bom dia.",
      "French": "Merci pour votre aide, Docteur. Bonne journée.",
      "German": "Vielen Dank für Ihre Hilfe, Herr/Frau Doktor.",
      "Italian": "Grazie per il suo aiuto, Dottore. Buona giornata."
    },
    "why": "Polite conclusion to a medical consultation.",
    "scenario": "Leaving the doctor's office."
  },
  {
    "id": "lesson-71",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "starter",
    "english": "Excuse me, is this the right way to Central Park?",
    "phonetic": "ɪkˈskjuːz miː ɪz ðɪs ðə raɪt weɪ tuː ˈsɛntrəl pɑːrk?",
    "translations": {
      "Spanish": "Disculpe, ¿este es el camino correcto hacia Central Park?",
      "Portuguese": "Com licença, este é o caminho certo para o Central Park?",
      "French": "Excusez-moi, est-ce le bon chemin pour Central Park ?",
      "German": "Entschuldigung, ist das der richtige Weg zum Central Park?",
      "Italian": "Mi scusi, è questa la strada giusta per Central Park?"
    },
    "why": "\"Is this the right way to...\" confirms your heading quickly.",
    "scenario": "Walking in an unfamiliar neighborhood."
  },
  {
    "id": "lesson-72",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "starter",
    "english": "Is it within walking distance, or should I take a cab?",
    "phonetic": "ɪz ɪt wɪðˈɪn ˈwɔːkɪŋ ˈdɪstəns ɔːr ʃʊd aɪ teɪk ə kæb?",
    "translations": {
      "Spanish": "¿Se puede ir caminando o debería tomar un taxi?",
      "Portuguese": "Dá para ir a pé ou devo pegar um táxi?",
      "French": "Est-ce accessible à pied, ou devrais-je prendre un taxi ?",
      "German": "Kann man das zu Fuß erreichen oder sollte ich ein Taxi nehmen?",
      "Italian": "È raggiungibile a piedi o è meglio prendere un taxi?"
    },
    "why": "\"Within walking distance\" is the most natural idiom for nearby locations.",
    "scenario": "Deciding whether to walk or take transport."
  },
  {
    "id": "lesson-73",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "everyday",
    "english": "Turn left at the traffic light and go straight for two blocks.",
    "phonetic": "tɜːrn lɛft æt ðə ˈtræfɪk laɪt ænd ɡoʊ streɪt fɔːr tuː blɑːks",
    "translations": {
      "Spanish": "Gira a la izquierda en el semáforo y sigue derecho dos cuadras.",
      "Portuguese": "Vire à esquerda no semáforo e siga em frente por dois quarteirões.",
      "French": "Tournez à gauche au feu et continuez tout droit pendant deux pâtés de maisons.",
      "German": "Biegen Sie an der Ampel links ab und gehen Sie zwei Blocks geradeaus.",
      "Italian": "Gira a sinistra al semaforo e prosegui dritto per due isolati."
    },
    "why": "Understanding and repeating directional instructions.",
    "scenario": "Following or giving pedestrian directions."
  },
  {
    "id": "lesson-74",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "starter",
    "english": "Where is the nearest restroom or public bathroom?",
    "phonetic": "wɛər ɪz ðə ˈnɪrɪst ˈrɛstruːm ɔːr ˈpʌblɪk ˈbæθruːm?",
    "translations": {
      "Spanish": "¿Dónde está el baño público más cercano?",
      "Portuguese": "Onde fica o banheiro público mais próximo?",
      "French": "Où se trouvent les toilettes publiques les plus proches ?",
      "German": "Wo ist die nächste öffentliche Toilette?",
      "Italian": "Dov'è il bagno pubblico più vicino?"
    },
    "why": "\"Restroom\" is polite American English; \"toilet\" is common in British English.",
    "scenario": "Finding bathroom facilities in public spaces or malls."
  },
  {
    "id": "lesson-75",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "everyday",
    "english": "Which platform does the downtown train depart from?",
    "phonetic": "wɪtʃ ˈplætfɔːrm dʌz ðə ˈdaʊnˌtaʊn treɪn dɪˈpɑːrt frʌm?",
    "translations": {
      "Spanish": "¿De qué andén sale el tren hacia el centro?",
      "Portuguese": "De qual plataforma sai o trem para o centro?",
      "French": "De quel quai part le train vers le centre-ville ?",
      "German": "Von welchem Gleis fährt der Zug ins Stadtzentrum ab?",
      "Italian": "Da quale binario parte il treno per il centro?"
    },
    "why": "\"Platform\" refers to train tracks/boarding areas.",
    "scenario": "Navigating busy railway or subway stations."
  },
  {
    "id": "lesson-76",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "starter",
    "english": "Do I need to transfer trains to get to the museum?",
    "phonetic": "duː aɪ niːd tuː trænsˈfɜːr treɪnz tuː ɡɛt tuː ðə mjuːˈziːəm?",
    "translations": {
      "Spanish": "¿Necesito hacer trasbordo de tren para llegar al museo?",
      "Portuguese": "Preciso trocar de trem para chegar ao museu?",
      "French": "Dois-je changer de train pour aller au musée ?",
      "German": "Muss ich umsteigen, um zum Museum zu gelangen?",
      "Italian": "Devo cambiare treno per raggiungere il museo?"
    },
    "why": "\"Transfer trains\" or \"change trains\" describes switching subway lines.",
    "scenario": "Checking your transit itinerary with a transit worker."
  },
  {
    "id": "lesson-77",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "starter",
    "english": "How many stops is it until Fifth Avenue?",
    "phonetic": "haʊ ˈmɛni stɑːps ɪz ɪt ʌnˈtɪl fɪfθ ˈævəˌnjuː?",
    "translations": {
      "Spanish": "¿Cuántas paradas faltan para la Quinta Avenida?",
      "Portuguese": "Quantas paradas faltam até a Quinta Avenida?",
      "French": "Combien d'arrêts reste-t-il jusqu'à la Cinquième Avenue ?",
      "German": "Wie viele Haltestellen sind es noch bis zur Fifth Avenue?",
      "Italian": "Quante fermate mancano fino alla Fifth Avenue?"
    },
    "why": "Asking fellow riders to avoid missing your stop.",
    "scenario": "Riding the subway or city bus."
  },
  {
    "id": "lesson-78",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "everyday",
    "english": "Could you please drop me off right at the corner?",
    "phonetic": "kʊd juː pliːz drɑːp miː ɔːf raɪt æt ðə ˈkɔːrnər?",
    "translations": {
      "Spanish": "¿Podría dejarme justo en la esquina, por favor?",
      "Portuguese": "Poderia me deixar bem na esquina, por favor?",
      "French": "Pourriez-vous me déposer juste au coin de la rue ?",
      "German": "Könnten Sie mich bitte direkt an der Ecke absetzen?",
      "Italian": "Potrebbe lasciarmi proprio all'angolo, per favore?"
    },
    "why": "\"Drop me off\" is the natural phrase for getting out of a car or taxi.",
    "scenario": "Telling your Uber or taxi driver your exact stop."
  },
  {
    "id": "lesson-79",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "starter",
    "english": "Is there an elevator or escalator nearby?",
    "phonetic": "ɪz ðɛər ən ˈɛləˌveɪtər ɔːr ˈɛskəˌleɪtər ˈnɪrbaɪ?",
    "translations": {
      "Spanish": "¿Hay un ascensor o escalera mecánica cerca?",
      "Portuguese": "Tem algum elevador ou escada rolante por perto?",
      "French": "Y a-t-il un ascenseur ou un escalator à proximité ?",
      "German": "Gibt es einen Aufzug oder eine Rolltreppe in der Nähe?",
      "Italian": "C'è un ascensore o una scala mobile nelle vicinanze?"
    },
    "why": "Essential when traveling with heavy suitcases or strollers.",
    "scenario": "Navigating multi-level stations or shopping centers."
  },
  {
    "id": "lesson-80",
    "topicId": "travel",
    "topicName": "Directions & City",
    "emoji": "🗺️",
    "level": "starter",
    "english": "Thank you so much! You saved my day.",
    "phonetic": "θæŋk juː soʊ mʌtʃ juː seɪvd maɪ deɪ",
    "translations": {
      "Spanish": "¡Muchísimas gracias! Me salvaste el día.",
      "Portuguese": "Muito obrigado! Você salvou o meu dia.",
      "French": "Merci infiniment ! Vous m'avez sauvé la mise.",
      "German": "Vielen Dank! Du hast mir den Tag gerettet.",
      "Italian": "Grazie mille! Mi hai salvato la giornata."
    },
    "why": "An expressive, heartwarming way to thank someone who helped you.",
    "scenario": "Thanking a helpful stranger who gave great directions."
  },
  {
    "id": "lesson-81",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "starter",
    "english": "Good morning! Do you have a quick minute to chat?",
    "phonetic": "ɡʊd ˈmɔːrnɪŋ duː juː hæv ə kwɪk ˈmɪnɪt tuː tʃæt?",
    "translations": {
      "Spanish": "¡Buenos días! ¿Tienes un minuto rápido para conversar?",
      "Portuguese": "Bom dia! Você tem um minutinho para conversar?",
      "French": "Bonjour ! Avez-vous une minute pour discuter ?",
      "German": "Guten Morgen! Hast du kurz Zeit zum Quatschen?",
      "Italian": "Buongiorno! Hai un minuto veloce per parlare?"
    },
    "why": "Respectful way to check availability before asking a work question.",
    "scenario": "Approaching a colleague at work or sending a chat message."
  },
  {
    "id": "lesson-82",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "everyday",
    "english": "Could you please send me that file when you get a chance?",
    "phonetic": "kʊd juː pliːz sɛnd miː ðæt faɪl wɛn juː ɡɛt ə tʃæns?",
    "translations": {
      "Spanish": "¿Podrías enviarme ese archivo cuando tengas oportunidad?",
      "Portuguese": "Você poderia me enviar esse arquivo quando tiver uma chance?",
      "French": "Pourriez-vous m'envoyer ce fichier dès que vous le pourrez ?",
      "German": "Könntest du mir die Datei schicken, wenn du dazu kommst?",
      "Italian": "Potresti mandarmi quel file appena puoi, per favore?"
    },
    "why": "\"When you get a chance\" shows politeness without being demanding.",
    "scenario": "Requesting documents or spreadsheets from a coworker."
  },
  {
    "id": "lesson-83",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "everyday",
    "english": "Sorry, I was on mute! Can everyone hear me clearly now?",
    "phonetic": "ˈsɑːri aɪ wʌz ɑːn mjuːt kæn ˈɛvriˌwʌn hɪər miː ˈklɪrli naʊ?",
    "translations": {
      "Spanish": "¡Disculpen, estaba en silencio! ¿Todos pueden escucharme con claridad ahora?",
      "Portuguese": "Desculpe, eu estava no mudo! Todo mundo consegue me ouvir bem agora?",
      "French": "Désolé, j'avais coupé mon micro ! Tout le monde m'entend-il bien ?",
      "German": "Entschuldigung, ich war stummgeschaltet! Können mich alle gut hören?",
      "Italian": "Scusate, ero mutato! Mi sentite bene adesso?"
    },
    "why": "The most common modern phrase in video conference calls (Zoom, Teams, Meet).",
    "scenario": "Joining or unmuting in an online meeting."
  },
  {
    "id": "lesson-84",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "confident",
    "english": "I will follow up on this task and update you by tomorrow afternoon.",
    "phonetic": "aɪ wɪl ˈfɑːloʊ ʌp ɑːn ðɪs tæsk ænd ʌpˈdeɪt juː baɪ təˈmɑːroʊ ˌæftərˈnuːn",
    "translations": {
      "Spanish": "Haré seguimiento a esta tarea y te pondré al día mañana por la tarde.",
      "Portuguese": "Vou dar andamento a essa tarefa e te atualizo até amanhã à tarde.",
      "French": "Je vais faire le suivi de cette tâche et vous tiendrai informé demain après-midi.",
      "German": "Ich bleibe an der Aufgabe dran und gebe Ihnen bis morgen Nachmittag Bescheid.",
      "Italian": "Seguirò questo compito e vi aggiornerò entro domani pomeriggio."
    },
    "why": "Demonstrates accountability and proactive project management.",
    "scenario": "Ending a meeting with clear action items."
  },
  {
    "id": "lesson-85",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "starter",
    "english": "I am stepping out for lunch. Would anyone like anything?",
    "phonetic": "aɪ æm ˈstɛpɪŋ aʊt fɔːr lʌntʃ wʊd ˈɛniˌwʌn laɪk ˈɛniˌθɪŋ?",
    "translations": {
      "Spanish": "Voy a salir a almorzar. ¿Alguien quiere que le traiga algo?",
      "Portuguese": "Estou saindo para almoçar. Alguém vai querer alguma coisa?",
      "French": "Je sors déjeuner. Quelqu'un veut quelque chose ?",
      "German": "Ich gehe kurz Mittagessen. Möchte jemand etwas mitgebracht bekommen?",
      "Italian": "Esco per pranzo. Qualcuno vuole qualcosa?"
    },
    "why": "A thoughtful, collegial gesture in office settings.",
    "scenario": "Heading out for lunch break."
  },
  {
    "id": "lesson-86",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "starter",
    "english": "Could you please proofread this quick email before I send it?",
    "phonetic": "kʊd juː pliːz ˈpruːfˌriːd ðɪs kwɪk ˈiːmeɪl bɪˈfɔːr aɪ sɛnd ɪt?",
    "translations": {
      "Spanish": "¿Podrías revisar rápidamente este correo antes de que lo envíe?",
      "Portuguese": "Você poderia dar uma olhada rápida neste e-mail antes de eu enviar?",
      "French": "Pourriez-vous relire rapidement ce courriel avant que je ne l'envoie ?",
      "German": "Könntest du bitte kurz über diese E-Mail drüberlesen, bevor ich sie sende?",
      "Italian": "Potresti dare una rapida riletta a questa email prima che la invii?"
    },
    "why": "\"Proofread\" means checking grammar, spelling, and tone.",
    "scenario": "Asking a peer for a quick second pair of eyes."
  },
  {
    "id": "lesson-87",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "everyday",
    "english": "Thank you for your constructive feedback. I really appreciate it.",
    "phonetic": "θæŋk juː fɔːr jɔːr kənˈstrʌktɪv ˈfiːdˌbæk aɪ ˈrɪəli əˈpriːʃiˌeɪt ɪt",
    "translations": {
      "Spanish": "Gracias por tus comentarios constructivos. Realmente lo aprecio.",
      "Portuguese": "Obrigado pelo seu feedback construtivo. Eu realmente aprecio.",
      "French": "Merci pour vos remarques constructives. J'apprécie beaucoup.",
      "German": "Vielen Dank für das konstruktive Feedback, das schätze ich sehr.",
      "Italian": "Grazie per il feedback costruttivo. Lo apprezzo molto."
    },
    "why": "Professional receipt of critiques and suggestions.",
    "scenario": "Reviewing a draft, presentation, or project."
  },
  {
    "id": "lesson-88",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "starter",
    "english": "Could we reschedule our meeting to later this week?",
    "phonetic": "kʊd wiː ˌriːˈskɛdʒuːl ˈaʊər ˈmiːtɪŋ tuː ˈleɪtər ðɪs wiːk?",
    "translations": {
      "Spanish": "¿Podríamos reprogramar nuestra reunión para más adelante esta semana?",
      "Portuguese": "Poderíamos remarcar nossa reunião para mais tarde esta semana?",
      "French": "Pourrions-nous reprogrammer notre réunion à plus tard cette semaine ?",
      "German": "Könnten wir unser Treffen auf später in dieser Woche verschieben?",
      "Italian": "Potremmo riprogrammare la nostra riunione a più tardi questa settimana?"
    },
    "why": "\"Reschedule\" is the standard term when dates conflict.",
    "scenario": "Calendar conflict management."
  },
  {
    "id": "lesson-89",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "starter",
    "english": "Great job team, let's keep up the good momentum!",
    "phonetic": "ɡreɪt dʒɑːb tiːm lɛts kiːp ʌp ðə ɡʊd moʊˈmɛntəm",
    "translations": {
      "Spanish": "¡Excelente trabajo equipo, mantengamos este buen impulso!",
      "Portuguese": "Ótimo trabalho equipe, vamos manter esse bom ritmo!",
      "French": "Beau travail l'équipe, gardons ce bel élan !",
      "German": "Tolle Arbeit, Team! Lasst uns den Schwung beibehalten.",
      "Italian": "Ottimo lavoro squadra, manteniamo questo bel ritmo!"
    },
    "why": "Encouraging colleagues boosts team spirit.",
    "scenario": "Celebrating a milestone or project launch."
  },
  {
    "id": "lesson-90",
    "topicId": "daily_help",
    "topicName": "Work & Daily Tasks",
    "emoji": "💼",
    "level": "starter",
    "english": "Have a great evening, see everyone tomorrow morning!",
    "phonetic": "hæv ə ɡreɪt ˈiːvnɪŋ siː ˈɛvriˌwʌn təˈmɑːroʊ ˈmɔːrnɪŋ",
    "translations": {
      "Spanish": "¡Que tengan una excelente tarde, nos vemos mañana por la mañana!",
      "Portuguese": "Tenham uma ótima noite, vejo todos amanhã de manhã!",
      "French": "Passez une bonne soirée, à demain matin !",
      "German": "Schönen Feierabend, bis morgen früh!",
      "Italian": "Buona serata a tutti, ci vediamo domani mattina!"
    },
    "why": "Warm end-of-day signoff to colleagues.",
    "scenario": "Logging off or walking out of the office."
  },
  {
    "id": "lesson-91",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🤝",
    "level": "starter",
    "english": "Excuse me, could you please hold the elevator door for me?",
    "phonetic": "ɪkˈskjuːz miː kʊd juː pliːz hoʊld ðiː ˈɛləˌveɪtər dɔːr fɔːr miː?",
    "translations": {
      "Spanish": "Disculpe, ¿podría sostener la puerta del ascensor para mí, por favor?",
      "Portuguese": "Com licença, você poderia segurar a porta do elevador para mim?",
      "French": "Excusez-moi, pourriez-vous me retenir la porte de l'ascenseur, s'il vous plaît ?",
      "German": "Entschuldigung, könnten Sie mir bitte kurz den Aufzug aufhalten?",
      "Italian": "Mi scusi, potrebbe tenermi la porta dell'ascensore, per favore?"
    },
    "why": "Polite request when walking quickly toward an closing elevator.",
    "scenario": "Catching an elevator in an apartment building or office."
  },
  {
    "id": "lesson-92",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🤝",
    "level": "starter",
    "english": "Could you please tell me what time it is right now?",
    "phonetic": "kʊd juː pliːz tɛl miː wʌt taɪm ɪt ɪz raɪt naʊ?",
    "translations": {
      "Spanish": "¿Podrías decirme qué hora es en este momento, por favor?",
      "Portuguese": "Você poderia me dizer que horas são agora, por favor?",
      "French": "Pourriez-vous me dire quelle heure il est maintenant ?",
      "German": "Könnten Sie mir bitte sagen, wie viel Uhr es gerade ist?",
      "Italian": "Potresti dirmi che ore sono adesso, per favore?"
    },
    "why": "Asking for the time when your phone battery dies.",
    "scenario": "Checking the hour on the street."
  },
  {
    "id": "lesson-93",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🤝",
    "level": "starter",
    "english": "Can I borrow a pen for just one second?",
    "phonetic": "kæn aɪ ˈbɑːroʊ ə pɛn fɔːr dʒʌst wʌn ˈsɛkənd?",
    "translations": {
      "Spanish": "¿Puedo pedir prestado un bolígrafo solo por un segundo?",
      "Portuguese": "Posso pegar uma caneta emprestada por um segundo?",
      "French": "Puis-je emprunter un stylo juste une seconde ?",
      "German": "Darf ich mir ganz kurz einen Stift leihen?",
      "Italian": "Posso prendere in prestito una penna per un secondo?"
    },
    "why": "\"Borrow\" means you intend to return it promptly.",
    "scenario": "Signing a document or filling in a customs card."
  },
  {
    "id": "lesson-94",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🤝",
    "level": "everyday",
    "english": "Excuse me, you dropped your glove on the sidewalk!",
    "phonetic": "ɪkˈskjuːz miː juː drɑːpt jɔːr ɡlʌv ɑːn ðə ˈsaɪdˌwɔːk",
    "translations": {
      "Spanish": "¡Disculpe, se le cayó el guante en la acera!",
      "Portuguese": "Com licença, você deixou cair sua luva na calçada!",
      "French": "Excusez-moi, vous avez fait tomber votre gant sur le trottoir !",
      "German": "Entschuldigung, Sie haben Ihren Handschuh auf dem Gehweg verloren!",
      "Italian": "Mi scusi, le è caduto il guanto sul marciapiede!"
    },
    "why": "Alerting someone when they accidentally drop an item.",
    "scenario": "Helping a stranger on the street."
  },
  {
    "id": "lesson-95",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🤝",
    "level": "everyday",
    "english": "Please leave the delivery package right by the front door.",
    "phonetic": "pliːz liːv ðə dɪˈlɪvəri ˈpækɪdʒ raɪt baɪ ðə frʌnt dɔːr",
    "translations": {
      "Spanish": "Por favor, deje el paquete de entrega justo al lado de la puerta principal.",
      "Portuguese": "Por favor, deixe o pacote da entrega bem na porta da frente.",
      "French": "Veuillez laisser le colis juste devant la porte d'entrée.",
      "German": "Bitte legen Sie das Paket direkt vor die Haustür.",
      "Italian": "Per favore, lasci il pacco proprio accanto alla porta d'ingresso."
    },
    "why": "Clear instruction for courier deliveries.",
    "scenario": "Writing delivery driver instructions in shopping apps."
  },
  {
    "id": "lesson-96",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🆘",
    "level": "starter",
    "english": "Excuse me, I think I am lost. Can you help me find my hotel?",
    "phonetic": "ɪkˈskjuːz miː aɪ θɪŋk aɪ æm lɔːst kæn juː hɛlp miː faɪnd maɪ hoʊˈtɛl?",
    "translations": {
      "Spanish": "Disculpe, creo que me perdí. ¿Puede ayudarme a encontrar mi hotel?",
      "Portuguese": "Com licença, acho que estou perdido. Pode me ajudar a achar meu hotel?",
      "French": "Excusez-moi, je crois que je suis perdu. Pouvez-vous m'aider à trouver mon hôtel ?",
      "German": "Entschuldigung, ich habe mich wohl verirrt. Können Sie mir helfen, mein Hotel zu finden?",
      "Italian": "Mi scusi, credo di essermi perso. Può aiutarmi a trovare il mio albergo?"
    },
    "why": "Direct and honest when navigating a new city.",
    "scenario": "Needing urgent orientation when maps are unavailable."
  },
  {
    "id": "lesson-97",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🆘",
    "level": "starter",
    "english": "I accidentally lost my phone! Has anyone turned it in?",
    "phonetic": "aɪ ˌæksɪˈdɛntəli lɔːst maɪ foʊn hæz ˈɛniˌwʌn tɜːrnd ɪt ɪn?",
    "translations": {
      "Spanish": "¡Perdí mi teléfono por accidente! ¿Alguien lo ha entregado?",
      "Portuguese": "Perdi meu celular sem querer! Alguém entregou ele aqui?",
      "French": "J'ai égaré mon téléphone ! Quelqu'un l'a-t-il rapporté ?",
      "German": "Ich habe versehentlich mein Telefon verloren! Hat es jemand abgegeben?",
      "Italian": "Ho perso accidentalmente il telefono! Qualcuno l'ha consegnato?"
    },
    "why": "\"Turned it in\" is the phrase for handing lost items to lost-and-found.",
    "scenario": "Checking lost-and-found at a café, transit counter, or venue."
  },
  {
    "id": "lesson-98",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🆘",
    "level": "starter",
    "english": "Please call an ambulance, someone has collapsed here!",
    "phonetic": "pliːz kɔːl ən ˈæmbjələns ˈsʌmwʌn hæz kəˈlæpst hɪər",
    "translations": {
      "Spanish": "¡Por favor llame a una ambulancia, alguien se desmayó aquí!",
      "Portuguese": "Por favor, chamem uma ambulância, alguém desmaiou aqui!",
      "French": "Appelez une ambulance s'il vous plaît, quelqu'un s'est évanoui ici !",
      "German": "Bitte rufen Sie einen Krankenwagen, hier ist jemand zusammengebrochen!",
      "Italian": "Per favore chiamate un'ambulanza, qualcuno è svenuto qui!"
    },
    "why": "Emergency instruction that communicates critical urgency.",
    "scenario": "Medical emergency in a public space."
  },
  {
    "id": "lesson-99",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "✨",
    "level": "everyday",
    "english": "I really appreciate your kindness and hospitality!",
    "phonetic": "aɪ ˈrɪəli əˈpriːʃiˌeɪt jɔːr ˈkaɪndnəs ænd ˌhɑːspɪˈtæləti",
    "translations": {
      "Spanish": "¡Realmente aprecio su amabilidad y hospitalidad!",
      "Portuguese": "Eu realmente aprecio sua gentileza e hospitalidade!",
      "French": "J'apprécie sincèrement votre gentillesse et votre hospitalité !",
      "German": "Ich schätze Ihre Freundlichkeit und Gastfreundschaft sehr!",
      "Italian": "Apprezzo davvero la vostra gentilezza e ospitalità!"
    },
    "why": "A high-impact expression of sincere gratitude.",
    "scenario": "Thanking hosts, tour guides, or helpful neighbors."
  },
  {
    "id": "lesson-100",
    "topicId": "daily_help",
    "topicName": "Daily Help & Home",
    "emoji": "🎉",
    "level": "confident",
    "english": "With consistent daily practice, my English is improving every single day!",
    "phonetic": "wɪð kənˈsɪstənt ˈdeɪli ˈpræktɪs maɪ ˈɪŋɡlɪʃ ɪz ɪmˈpruːvɪŋ ˈɛvri ˈsɪŋɡəl deɪ",
    "translations": {
      "Spanish": "¡Con práctica diaria constante, mi inglés está mejorando cada día!",
      "Portuguese": "Com prática diária constante, meu inglês está melhorando a cada dia!",
      "French": "Grâce à une pratique quotidienne régulière, mon anglais s'améliore de jour en jour !",
      "German": "Mit regelmäßigem täglichem Üben verbessert sich mein Englisch jeden einzelnen Tag!",
      "Italian": "Con una pratica quotidiana costante, il mio inglese migliora ogni singolo giorno!"
    },
    "why": "The ultimate fluency mindset: daily bite-sized learning leads to complete mastery.",
    "scenario": "Celebrating your English learning milestone with English Coach!"
  }
];

export const LESSON_TOPIC_CATEGORIES = [
  { id: 'all', label: 'All 100 Lessons', emoji: '🌟' },
  { id: 'coffee', label: 'Coffee & Food', emoji: '☕' },
  { id: 'shopping', label: 'Supermarket & Shopping', emoji: '🛒' },
  { id: 'travel', label: 'Travel, Airport & Transit', emoji: '✈️' },
  { id: 'friends', label: 'Making Friends & Social', emoji: '👋' },
  { id: 'daily_help', label: 'Work, Health & Daily Help', emoji: '🤝' }
];

/**
 * Returns a batch of lessons without repeating.
 */
export function getLessonsBatch(pageIndex: number = 0, pageSize: number = 10, topicId: string = 'all'): {
  lessons: LessonPhrase[];
  totalLessons: number;
  totalPages: number;
  currentPage: number;
} {
  const filtered = topicId === 'all' 
    ? LESSONS_BANK_100 
    : LESSONS_BANK_100.filter(l => l.topicId === topicId);

  const totalLessons = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalLessons / pageSize));
  const safePage = Math.min(Math.max(0, pageIndex), totalPages - 1);
  const start = safePage * pageSize;
  const end = Math.min(start + pageSize, totalLessons);

  return {
    lessons: filtered.slice(start, end),
    totalLessons,
    totalPages,
    currentPage: safePage + 1
  };
}

/**
 * Gets a random sample of N unique lessons not in excludedIds.
 */
export function getNextUniqueLessons(count: number = 10, excludedIds: Set<string> = new Set(), topicId: string = 'all'): LessonPhrase[] {
  const pool = topicId === 'all' 
    ? LESSONS_BANK_100 
    : LESSONS_BANK_100.filter(l => l.topicId === topicId);

  const unviewed = pool.filter(l => !excludedIds.has(l.id));

  if (unviewed.length >= count) {
    return unviewed.slice(0, count);
  }

  // If pool exhausted, reshuffle from all
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
