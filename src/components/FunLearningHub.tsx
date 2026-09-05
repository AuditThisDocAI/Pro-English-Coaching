import React, { useState } from 'react';
import { 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  RotateCcw, 
  Star, 
  Award, 
  Smile, 
  BookOpen, 
  Globe2, 
  Heart,
  HelpCircle
} from 'lucide-react';
import { NativeLanguage, SUPPORTED_LANGUAGES, CoachResponse } from '../types';
import { triggerProUpgradeConfetti } from '../lib/confetti';
import { useTTS } from '../lib/useTTS';
import { SpeakerSpeedControl } from './SpeakerSpeedControl';

interface FunLearningHubProps {
  nativeLanguage: NativeLanguage;
  onLanguageChange: (lang: NativeLanguage) => void;
  onSendToChat: (text: string) => void;
  onSavePhrase: (data: CoachResponse) => Promise<boolean | void>;
  onAddXP: (amount: number) => void;
  initialTopic?: string;
}

interface LessonPhrase {
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

const LESSON_PHRASES: LessonPhrase[] = [
  // COFFEE & FOOD
  {
    id: 'cf-1',
    topicId: 'coffee',
    topicName: 'Coffee & Food',
    emoji: '☕',
    level: 'starter',
    english: 'Can I please have a large latte with oat milk?',
    phonetic: 'kæn aɪ pliːz hæv ə lɑːrdʒ ˈlɑːteɪ wɪð oʊt mɪlk?',
    translations: {
      Spanish: '¿Me das un latte grande con leche de avena, por favor?',
      Portuguese: 'Por favor, você poderia me dar um latte grande com leite de aveia?',
      French: 'Puis-je avoir un grand latte avec du lait d\'avoine, s\'il vous plaît ?',
      German: 'Könnte ich bitte einen großen Latte mit Hafermilch haben?',
      Hindi: 'क्या मुझे कृपया ओट मिल्क के साथ एक बड़ा लाते मिल सकता है?',
      Mandarin: '请问可以给我一杯大杯燕麦奶拿铁吗？',
      Japanese: 'オーツミルク入りのラージラテを一杯いただけますか？',
      Korean: '오트밀크가 들어간 라지 라떼 한 잔 주시겠어요?',
      Arabic: 'هل يمكنني الحصول على لاتيه كبير مع حليب الشوفان من فضلك؟',
      Vietnamese: 'Cho tôi một ly latte lớn với sữa yến mạch được không?',
      Tagalog: 'Puwede po ba akong humingi ng malaking latte na may oat milk?',
      Italian: 'Posso avere un latte grande con latte d\'avena, per favore?',
      Russian: 'Можно мне, пожалуйста, большой латте на овсяном молоке?',
      Turkish: 'Lütfen yulaf sütlü büyük boy latte alabilir miyim?',
      Polish: 'Czy mogę poprosić o duże latte z mlekiem owsianym?',
      Indonesian: 'Bolehkah saya minta latte besar dengan susu oat, tolong?'
    },
    why: 'Using "Can I please have..." is the most natural and polite way to order anywhere.',
    scenario: 'At a cafe or bakery counter.'
  },
  {
    id: 'cf-2',
    topicId: 'coffee',
    topicName: 'Coffee & Food',
    emoji: '🍽️',
    level: 'starter',
    english: 'Could we please get the check when you have a moment?',
    phonetic: 'kʊd wiː pliːz gɛt ðə tʃɛk wɛn juː hæv ə ˈmoʊmənt?',
    translations: {
      Spanish: '¿Nos trae la cuenta cuando tenga un momento, por favor?',
      Portuguese: 'Você poderia nos trazer a conta quando tiver um momento, por favor?',
      French: 'Pourriez-vous nous apporter l\'addition quand vous aurez un moment, s\'il vous plaît ?',
      German: 'Könnten wir bitte die Rechnung haben, wenn Sie kurz Zeit haben?',
      Hindi: 'जब आपके पास समय हो, क्या आप कृपया बिल ला सकते हैं?',
      Mandarin: '有空的时候可以帮我们买单吗？',
      Japanese: 'お時間のある時にお会計をお願いできますか？',
      Korean: '시간 되실 때 계산서 좀 가져다주시겠어요?',
      Arabic: 'هل يمكننا الحصول على الفاتورة عندما يتوفر لديك وقت من فضلك؟',
      Vietnamese: 'Khi nào rảnh, bạn có thể tính tiền cho chúng tôi được không?',
      Tagalog: 'Puwede po ba naming makuha ang bill kapag may oras po kayo?',
      Italian: 'Potremmo avere il conto quando ha un momento, per favore?',
      Russian: 'Не могли бы вы принести нам счёт, когда освободитесь?',
      Turkish: 'Müsait olduğunuzda hesabı alabilir miyiz lütfen?',
      Polish: 'Czy moglibyśmy prosić o rachunek, kiedy będzie miał pan/pani chwilę?',
      Indonesian: 'Bisakah kami minta tagihannya saat Anda ada waktu luang?'
    },
    why: 'In American English use "the check", and in British English use "the bill". Both are polite!',
    scenario: 'Finishing a meal at a restaurant.'
  },
  {
    id: 'cf-3',
    topicId: 'coffee',
    topicName: 'Coffee & Food',
    emoji: '🥗',
    level: 'everyday',
    english: 'Is this dish spicy, and can it be made vegetarian?',
    phonetic: 'ɪz ðɪs dɪʃ ˈspaɪsi, ænd kæn ɪt biː meɪd ˌvɛdʒəˈtɛəriən?',
    translations: {
      Spanish: '¿Este plato es picante, y se puede preparar vegetariano?',
      Portuguese: 'Esse prato é apimentado? Dá para fazer vegetariano?',
      French: 'Ce plat est-il épicé, et peut-il être préparé en version végétarienne ?',
      German: 'Ist dieses Gericht scharf und kann es vegetarisch zubereitet werden?',
      Hindi: 'क्या यह व्यंजन तीखा है, और क्या इसे शाकाहारी बनाया जा सकता है?',
      Mandarin: '这道菜辣吗？可以做成素食的吗？',
      Japanese: 'この料理は辛いですか？ベジタリアン用に作ってもらえますか？',
      Korean: '이 요리는 매운가요? 채식으로 만들어 주실 수 있나요?',
      Arabic: 'هل هذا الطبق حار وهل يمكن تحضيره نباتياً؟',
      Vietnamese: 'Món này có cay không, và có thể làm món chay được không?',
      Tagalog: 'Maanghang po ba ang pagkaing ito, at puwede po bang gawing vegetarian?',
      Italian: 'Questo piatto è piccante, e si può avere vegetariano?',
      Russian: 'Это блюдо острое? Можно ли приготовить его вегетарианским?',
      Turkish: 'Bu yemek acı mı ve vejetaryen olarak yapılabilir mi?',
      Polish: 'Czy to danie jest pikantne i czy można je przygotować w wersji wegetariańskiej?',
      Indonesian: 'Apakah hidangan ini pedas, dan bisakah dibuat vegetarian?'
    },
    why: 'Asking about ingredients prevents surprises with allergies or spice tolerance.',
    scenario: 'Asking questions to a restaurant waiter.'
  },

  // TRAVEL & DIRECTIONS
  {
    id: 'tr-1',
    topicId: 'travel',
    topicName: 'Airport & Travel',
    emoji: '✈️',
    level: 'starter',
    english: 'Excuse me, which gate does the flight to New York depart from?',
    phonetic: 'ɪkˈskjuːz miː, wɪtʃ geɪt dʌz ðə flaɪt tuː nuː jɔːrk dɪˈpɑːrt frʌm?',
    translations: {
      Spanish: 'Disculpe, ¿de qué puerta sale el vuelo a Nueva York?',
      Portuguese: 'Com licença, de qual portão sai o voo para Nova York?',
      French: 'Excusez-moi, de quelle porte part le vol pour New York ?',
      German: 'Entschuldigung, von welchem Flugsteig fliegt der Flug nach New York ab?',
      Hindi: 'माफ़ कीजिए, न्यूयॉर्क के लिए उड़ान किस गेट से रवाना होती है?',
      Mandarin: '请问飞往纽约的航班在哪个登机口登机？',
      Japanese: 'すみません、ニューヨーク行きのフライトは何番ゲートから出発しますか？',
      Korean: '실례합니다, 뉴욕행 비행기는 몇 번 탑승구에서 출발하나요?',
      Arabic: 'معذرة، من أي بوابة تغادر الرحلة إلى نيويورك؟',
      Vietnamese: 'Xin lỗi, chuyến bay đi New York khởi hành từ cổng nào?',
      Tagalog: 'Excuse me po, saang gate po aalis ang flight papuntang New York?',
      Italian: 'Mi scusi, da quale gate parte il volo per New York?',
      Russian: 'Извините, от какого выхода вылетает рейс в Нью-Йорк?',
      Turkish: 'Afedersiniz, New York uçuşu hangi kapıdan kalkıyor?',
      Polish: 'Przepraszam, z której bramki odlatuje lot do Nowego Jorku?',
      Indonesian: 'Permisi, penerbangan ke New York berangkat dari gerbang mana?'
    },
    why: 'Airport personnel appreciate starting with "Excuse me" before asking questions.',
    scenario: 'Inside an international airport terminal.'
  },
  {
    id: 'tr-2',
    topicId: 'travel',
    topicName: 'Airport & Travel',
    emoji: '🏨',
    level: 'starter',
    english: 'Hi, I have a hotel reservation under my name for two nights.',
    phonetic: 'haɪ, aɪ hæv ə hoʊˈtɛl ˌrɛzərˈveɪʃən ˈʌndər maɪ neɪm fɔːr tuː naɪts.',
    translations: {
      Spanish: 'Hola, tengo una reservación de hotel a mi nombre por dos noches.',
      Portuguese: 'Oi, tenho uma reserva de hotel no meu nome por duas noites.',
      French: 'Bonjour, j\'ai une réservation à mon nom pour deux nuits.',
      German: 'Hallo, ich habe eine Hotelreservierung auf meinen Namen für zwei Nächte.',
      Hindi: 'नमस्ते, मेरे नाम पर दो रातों के लिए होटल का आरक्षण है।',
      Mandarin: '你好，我预订了两晚的房间，在我的名下。',
      Japanese: 'こんにちは、私の名前で2泊分の予約があります。',
      Korean: '안녕하세요, 제 이름으로 2박 호텔 예약이 되어 있습니다.',
      Arabic: 'مرحباً، لدي حجز فندقي باسمي لمدة ليلتين.',
      Vietnamese: 'Xin chào, tôi có đặt phòng khách sạn hai đêm dưới tên của tôi.',
      Tagalog: 'Hello po, may reservation po ako sa hotel sa pangalan ko para sa dalawang gabi.',
      Italian: 'Salve, ho una prenotazione alberghiera a mio nome per due notti.',
      Russian: 'Здравствуйте, у меня бронь на две ночи на моё имя.',
      Turkish: 'Merhaba, adıma iki gecelik otel rezervasyonu var.',
      Polish: 'Dzień dobry, mam rezerwację hotelową na moje nazwisko na dwie noce.',
      Indonesian: 'Halo, saya punya reservasi hotel atas nama saya untuk dua malam.'
    },
    why: 'Saying "under my name" is the exact native phrase hotel front desks look for.',
    scenario: 'Hotel check-in desk.'
  },
  {
    id: 'tr-3',
    topicId: 'travel',
    topicName: 'Airport & Travel',
    emoji: '🗺️',
    level: 'everyday',
    english: 'Could you please point me in the direction of the nearest subway station?',
    phonetic: 'kʊd juː pliːz pɔɪnt miː ɪn ðə dəˈrɛkʃən ʌv ðə ˈnɪrɪst ˈsʌbweɪ ˈsteɪʃən?',
    translations: {
      Spanish: '¿Podría indicarme la dirección hacia la estación de metro más cercana, por favor?',
      Portuguese: 'Você poderia me indicar o caminho para a estação de metrô mais próxima, por favor?',
      French: 'Pourriez-vous m\'indiquer la direction de la station de métro la plus proche, s\'il vous plaît ?',
      German: 'Könnten Sie mir bitte den Weg zur nächsten U-Bahn-Station zeigen?',
      Hindi: 'क्या आप मुझे निकटतम मेट्रो स्टेशन का रास्ता बता सकते हैं?',
      Mandarin: '请问你能指给我看最近的地铁站在哪个方向吗？',
      Japanese: '一番近い地下鉄の駅の方向を教えていただけますか？',
      Korean: '가장 가까운 지하철역이 어느 방향인지 알려주실 수 있나요?',
      Arabic: 'هل يمكنك إرشادي إلى اتجاه أقرب محطة مترو من فضلك؟',
      Vietnamese: 'Bạn có thể chỉ cho tôi hướng đến ga tàu điện ngầm gần nhất được không?',
      Tagalog: 'Puwede niyo po bang ituro kung saang direksyon ang pinakamalapit na istasyon ng subway?',
      Italian: 'Potrebbe indicarmi la direzione per la stazione della metropolitana più vicina?',
      Russian: 'Подскажите, пожалуйста, в какой стороне ближайшая станция метро?',
      Turkish: 'Lütfen bana en yakın metro istasyonunun yönünü gösterebilir misiniz?',
      Polish: 'Czy mógłby mi pan/pani wskazać drogę do najbliższej stacji metra?',
      Indonesian: 'Bisakah Anda menunjukkan arah ke stasiun kereta bawah tanah terdekat?'
    },
    why: '"Point me in the direction of..." sounds friendly, polite, and natural.',
    scenario: 'Asking pedestrians for directions in a new city.'
  },

  // MEETING PEOPLE & FRIENDS
  {
    id: 'fr-1',
    topicId: 'friends',
    topicName: 'Meeting People & Friends',
    emoji: '👋',
    level: 'starter',
    english: 'Hi! It is so great to meet you. How long have you lived here?',
    phonetic: 'haɪ! ɪt ɪz soʊ greɪt tuː miːt juː. haʊ lɔːŋ hæv juː lɪvd hɪər?',
    translations: {
      Spanish: '¡Hola! Es un gusto conocerte. ¿Cuánto tiempo llevas viviendo aquí?',
      Portuguese: 'Oi! É ótimo te conhecer. Há quanto tempo você mora aqui?',
      French: 'Salut ! C\'est formidable de te rencontrer. Depuis combien de temps vis-tu ici ?',
      German: 'Hallo! Schön dich kennenzulernen. Wie lange wohnst du schon hier?',
      Hindi: 'नमस्ते! आपसे मिलकर बहुत अच्छा लगा। आप यहाँ कितने समय से रह रहे हैं?',
      Mandarin: '嗨！很高兴认识你。你在这里住了多久了？',
      Japanese: 'こんにちは！お会いできて嬉しいです。ここに住んでどれくらいですか？',
      Korean: '안녕하세요! 만나서 정말 반가워요. 여기 사신 지 얼마나 되셨나요?',
      Arabic: 'مرحباً! رائع أن ألتقي بك. منذ متى وأنت تعيش هنا؟',
      Vietnamese: 'Chào bạn! Rất vui được gặp bạn. Bạn đã sống ở đây bao lâu rồi?',
      Tagalog: 'Kumusta! Napakasayang makilala ka. Gaano ka na katagal naninirahan dito?',
      Italian: 'Ciao! È un vero piacere conoscerti. Da quanto tempo vivi qui?',
      Russian: 'Привет! Очень приятно познакомиться. Как давно ты здесь живёшь?',
      Turkish: 'Merhaba! Tanıştığımıza çok memnun oldum. Ne zamandır burada yaşıyorsunuz?',
      Polish: 'Cześć! Wspaniale cię poznać. Jak długo tu mieszkasz?',
      Indonesian: 'Hai! Senang sekali bertemu dengan Anda. Sudah berapa lama Anda tinggal di sini?'
    },
    why: 'Asking about where someone lives opens up effortless, fun conversations.',
    scenario: 'Social gatherings, meetups, or parties.'
  },
  {
    id: 'fr-2',
    topicId: 'friends',
    topicName: 'Meeting People & Friends',
    emoji: '🎉',
    level: 'everyday',
    english: 'I really enjoyed our conversation! Would you like to stay in touch?',
    phonetic: 'aɪ ˈrɪəli ɪnˈdʒɔɪd ˈaʊər ˌkɒnvərˈseɪʃən! wʊd juː laɪk tuː steɪ ɪn tʌtʃ?',
    translations: {
      Spanish: '¡Disfruté mucho nuestra conversación! ¿Te gustaría que sigamos en contacto?',
      Portuguese: 'Gostei muito da nossa conversa! Gostaria de manter contato?',
      French: 'J\'ai beaucoup apprécié notre conversation ! Aimeriez-vous que l\'on reste en contact ?',
      German: 'Ich habe unser Gespräch wirklich genossen! Möchtest du in Kontakt bleiben?',
      Hindi: 'मुझे हमारी बातचीत में बहुत मज़ा आया! क्या आप संपर्क में रहना चाहेंगे?',
      Mandarin: '我真的很享受我们的对话！你想保持联系吗？',
      Japanese: 'お話しできてとても楽しかったです！連絡先を交換しませんか？',
      Korean: '오늘 대화 정말 즐거웠어요! 계속 연락하고 지낼래요?',
      Arabic: 'استمتعت حقاً بحديثنا! هل ترغب في البقاء على تواصل؟',
      Vietnamese: 'Tôi rất thích cuộc trò chuyện của chúng ta! Bạn có muốn giữ liên lạc không?',
      Tagalog: 'Talagang nag-enjoy ako sa usapan natin! Gusto mo bang manatiling may ugnayan tayo?',
      Italian: 'Mi è piaciuta molto la nostra conversazione! Ti andrebbe di rimanere in contatto?',
      Russian: 'Мне было очень приятно пообщаться! Хочешь оставаться на связи?',
      Turkish: 'Sohbetimizden gerçekten çok keyif aldım! İletişimde kalmak ister misiniz?',
      Polish: 'Bardzo podobała mi się nasza rozmowa! Czy chciałbyś pozostać w kontakcie?',
      Indonesian: 'Saya sangat menikmati percakapan kita! Apakah Anda ingin tetap saling berhubungan?'
    },
    why: '"Stay in touch" is the universal warm expression for making new friends.',
    scenario: 'Saying goodbye to someone you like.'
  },

  // SHOPPING & PRICES
  {
    id: 'sh-1',
    topicId: 'shopping',
    topicName: 'Shopping & Clothes',
    emoji: '🛍️',
    level: 'starter',
    english: 'Excuse me, where can I find the fitting rooms to try this on?',
    phonetic: 'ɪkˈskjuːz miː, wɛər kæn aɪ faɪnd ðə ˈfɪtɪŋ ruːmz tuː traɪ ðɪs ɒn?',
    translations: {
      Spanish: 'Disculpe, ¿dónde están los probadores para medirme esto?',
      Portuguese: 'Com licença, onde ficam os provadores para eu experimentar isso?',
      French: 'Excusez-moi, où sont les cabines d\'essayage pour essayer ceci ?',
      German: 'Entschuldigung, wo sind die Umkleidekabinen, um das anzuprobieren?',
      Hindi: 'माफ़ कीजिए, इसे पहनकर देखने के लिए ट्रायल रूम कहाँ है?',
      Mandarin: '打扰一下，请问试衣间在哪里？我想试穿一下。',
      Japanese: 'すみません、これを試着できる試着室はどこにありますか？',
      Korean: '실례합니다, 이것을 입어볼 수 있는 피팅룸이 어디에 있나요?',
      Arabic: 'معذرة، أين تقع غرف قياس الملابس لتجربة هذا؟',
      Vietnamese: 'Xin lỗi, phòng thay đồ ở đâu để tôi thử món đồ này?',
      Tagalog: 'Excuse me po, nasaan po ang fitting room para masukat ko ito?',
      Italian: 'Mi scusi, dove posso trovare i camerini per provare questo?',
      Russian: 'Извините, где находятся примерочные, чтобы примерить это?',
      Turkish: 'Afedersiniz, bunu denemek için soyunma kabinlerini nerede bulabilirim?',
      Polish: 'Przepraszam, gdzie znajdę przymierzalnie, żeby to przymierzyć?',
      Indonesian: 'Permisi, di mana saya bisa menemukan kamar pas untuk mencoba ini?'
    },
    why: '"Fitting rooms" is standard in clothing shops.',
    scenario: 'In a clothing store.'
  },

  // DAILY HELP & QUESTIONS
  {
    id: 'hl-1',
    topicId: 'daily_help',
    topicName: 'Help & Daily Questions',
    emoji: '🤝',
    level: 'everyday',
    english: 'Could you please help me with this when you have a free moment?',
    phonetic: 'kʊd juː pliːz hɛlp miː wɪð ðɪs wɛn juː hæv ə friː ˈmoʊmənt?',
    translations: {
      Spanish: '¿Podrías ayudarme con esto cuando tengas un momento libre, por favor?',
      Portuguese: 'Você poderia me ajudar com isso quando tiver um momento livre, por favor?',
      French: 'Pourriez-vous m\'aider avec ceci lorsque vous aurez un moment de libre, s\'il vous plaît ?',
      German: 'Könnten Sie mir bitte dabei helfen, wenn Sie einen Moment Zeit haben?',
      Hindi: 'जब आपके पास खाली समय हो, क्या आप कृपया इसमें मेरी मदद कर सकते हैं?',
      Mandarin: '有空的时候可以请你帮我看一下这个吗？',
      Japanese: 'お時間のある時に、こちらを手伝っていただけますか？',
      Korean: '시간 되실 때 이것 좀 도와주실 수 있나요?',
      Arabic: 'هل يمكنك مساعدتي في هذا عندما يكون لديك وقت فراغ من فضلك؟',
      Vietnamese: 'Bạn có thể giúp tôi việc này khi bạn rảnh rỗi được không?',
      Tagalog: 'Maaari mo ba akong tulungan dito kapag may libreng oras ka?',
      Italian: 'Potresti aiutarmi con questo quando hai un momento libero, per favore?',
      Russian: 'Не могли бы вы помочь мне с этим, когда у вас будет свободная минута?',
      Turkish: 'Boş bir vaktiniz olduğunda lütfen bana bu konuda yardımcı olabilir misiniz?',
      Polish: 'Czy mógłbyś mi w tym pomóc, kiedy będziesz miał wolną chwilę?',
      Indonesian: 'Bisakah Anda membantu saya dengan ini ketika Anda memiliki waktu luang?'
    },
    why: '"When you have a free moment" is a polite, considerate way to ask anyone for assistance without pressure.',
    scenario: 'Asking a neighbor, coworker, or friend for a quick favor.'
  }
];

export const FunLearningHub: React.FC<FunLearningHubProps> = ({
  nativeLanguage,
  onLanguageChange,
  onSendToChat,
  onSavePhrase,
  onAddXP,
  initialTopic
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic || 'all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'starter' | 'everyday' | 'confident'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const { speed, speak, isSpeaking, stop } = useTTS();

  // Filter phrases
  const filteredPhrases = LESSON_PHRASES.filter((p) => {
    const matchesTopic = selectedTopic === 'all' || p.topicId === selectedTopic;
    const matchesLevel = selectedLevel === 'all' || p.level === selectedLevel;
    return matchesTopic && matchesLevel;
  });

  const handlePlayAudio = (phrase: LessonPhrase, customSpeed?: number) => {
    const rateToUse = customSpeed ?? speed;
    const playKey = `${phrase.id}-${rateToUse}`;
    if (playingId === playKey) {
      stop();
      setPlayingId(null);
      return;
    }
    setPlayingId(playKey);
    speak(phrase.english, {
      rate: rateToUse,
      onStart: () => setPlayingId(playKey),
      onEnd: () => setPlayingId(null),
      onError: () => setPlayingId(null)
    });
  };

  const handleBookmarkPhrase = async (phrase: LessonPhrase) => {
    const translation = phrase.translations[nativeLanguage] || phrase.translations.Spanish;
    const coachData: CoachResponse = {
      original: phrase.english,
      professional: phrase.english,
      translation,
      why: phrase.why,
      practice: phrase.english
    };

    const isNew = !savedIds.has(phrase.id);
    await onSavePhrase(coachData);

    setSavedIds((prev) => {
      const next = new Set(prev);
      if (isNew) {
        next.add(phrase.id);
        onAddXP(15);
        triggerProUpgradeConfetti();
      } else {
        next.delete(phrase.id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Top Header & Language Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-neutral-200 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fun Everyday English Hub</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
            Learn Real English for Daily Life
          </h2>
          <p className="text-xs text-neutral-500">
            Listen at normal or slow speed, practice pronunciation, and chat with your AI buddy.
          </p>
        </div>

        {/* Language selector & Speaker speed setting */}
        <div className="flex flex-wrap items-center gap-2">
          <SpeakerSpeedControl variant="header" idPrefix="lessons-hub-speed" />

          <div className="flex items-center gap-2 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200">
            <Globe2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-neutral-600">Translations:</span>
            <select
              aria-label="Select translation language"
              value={nativeLanguage}
              onChange={(e) => onLanguageChange(e.target.value as NativeLanguage)}
              className="text-xs font-bold text-neutral-900 bg-transparent border-0 focus:ring-0 cursor-pointer outline-none"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.name} value={lang.name}>
                  {lang.flag} {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Topics', emoji: '🌟' },
          { id: 'coffee', label: 'Coffee & Food', emoji: '☕' },
          { id: 'travel', label: 'Airport & Travel', emoji: '✈️' },
          { id: 'friends', label: 'Making Friends', emoji: '👋' },
          { id: 'shopping', label: 'Shopping & Clothes', emoji: '🛍️' },
          { id: 'daily_help', label: 'Help & Daily Questions', emoji: '🤝' }
        ].map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedTopic(cat.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              selectedTopic === cat.id
                ? 'bg-indigo-600 text-white shadow-sm scale-102'
                : 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Level Filters */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-neutral-500">Filter Level:</span>
        {[
          { id: 'all', label: 'All Levels' },
          { id: 'starter', label: '🟢 Level 1: Starter' },
          { id: 'everyday', label: '🟡 Level 2: Everyday' },
          { id: 'confident', label: '🔵 Level 3: Confident' }
        ].map((lvl) => (
          <button
            key={lvl.id}
            type="button"
            onClick={() => setSelectedLevel(lvl.id as any)}
            className={`px-3 py-1 rounded-xl font-semibold transition-all cursor-pointer ${
              selectedLevel === lvl.id
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {lvl.label}
          </button>
        ))}
      </div>

      {/* Phrases List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPhrases.map((phrase) => {
          const translation = phrase.translations[nativeLanguage] || phrase.translations.Spanish;
          const isSaved = savedIds.has(phrase.id);

          return (
            <div
              key={phrase.id}
              className="bg-white rounded-3xl p-5 border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{phrase.emoji}</span>
                    <span className="text-[11px] font-bold text-neutral-500">
                      {phrase.topicName}
                    </span>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    phrase.level === 'starter'
                      ? 'bg-emerald-100 text-emerald-800'
                      : phrase.level === 'everyday'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {phrase.level}
                  </span>
                </div>

                {/* English Text */}
                <div>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 leading-snug">
                    "{phrase.english}"
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    /{phrase.phonetic}/
                  </p>
                </div>

                {/* Native Translation */}
                <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs">
                  <span className="font-bold text-indigo-950 block mb-0.5">
                    {nativeLanguage} Translation:
                  </span>
                  <p className="text-indigo-900 font-semibold italic">
                    "{translation}"
                  </p>
                </div>

                {/* Friendly Tip */}
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  💡 <strong>Tip:</strong> {phrase.why}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-2">
                
                {/* Audio Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(phrase, speed)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    title={`Listen with speakerphone at chosen speed (${speed}x)`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen ({speed}x)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePlayAudio(phrase, speed <= 0.8 ? 1.0 : 0.75)}
                    className="px-2.5 py-1.5 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-800 text-xs font-bold transition-all cursor-pointer"
                    title={speed <= 0.8 ? "Listen at normal speed (1.0x)" : "Listen slowly (0.75x) for clear pronunciation"}
                  >
                    <span>{speed <= 0.8 ? '🎯 1.0x' : '🐢 0.75x'}</span>
                  </button>
                </div>

                {/* Chat & Save */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleBookmarkPhrase(phrase)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                      isSaved
                        ? 'bg-amber-100 text-amber-800 border-amber-300'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                    }`}
                    title={isSaved ? 'Saved to your library' : 'Save phrase (+15 XP)'}
                  >
                    <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span className="text-[11px]">{isSaved ? 'Learned' : 'Save'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSendToChat(`I want to practice saying: "${phrase.english}". Can we roleplay this?`)}
                    className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat This</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
