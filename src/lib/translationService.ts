import { Flashcard, NativeLanguage, SUPPORTED_LANGUAGES } from '../types';

// In-memory cache for dynamic translations
const translationCache: Record<string, string> = {};

/**
 * High-accuracy dictionary of preset phrases and common workplace sentences
 * across all 15 supported languages.
 */
export const PRESET_TRANSLATIONS_DATABASE: Record<string, Record<string, string>> = {
  // email_1
  'email_1': {
    Spanish: 'Gracias por su paciencia. Agradezco su comprensión mientras revisaba este asunto con la debida atención.',
    Portuguese: 'Agradeço pela sua paciência. Obrigado por aguardar enquanto eu dava a devida atenção a este tema.',
    French: 'Je vous remercie de votre patience. J\'apprécie votre compréhension pendant que j\'accordais à ce dossier l\'attention requise.',
    German: 'Vielen Dank für Ihre Geduld. Ich schätze Ihr Verständnis, während ich dieser Angelegenheit die erforderliche Aufmerksamkeit gewidmet habe.',
    Hindi: 'आपके धैर्य के लिए धन्यवाद। इस विषय को उचित ध्यान देने के दौरान प्रतीक्षा करने के लिए मैं आपका आभारी हूँ।',
    Mandarin: '感谢您的耐心等待。非常感谢您在我妥善处理此事期间给予的理解与支持。',
    Japanese: 'お待たせして申し訳ありませんでした。本件に丁寧に対応するためにお時間をいただき、ご理解に感謝申し上げます。',
    Korean: '기다려 주셔서 감사합니다. 본 건을 면밀히 검토하는 동안 양해해 주셔서 진심으로 감사드립니다.',
    Arabic: 'شكراً جزيلاً لصبركم. أقدر تفهمكم بينما كنت أولي هذا الأمر العناية والاهتمام اللازمين.',
    Russian: 'Благодарю вас за терпение. Признателен за ваше понимание, пока я уделял этому вопросу необходимое внимание.',
    Italian: 'La ringrazio per la pazienza. Apprezzo la comprensione mentre dedicavo a questa pratica la dovuta attenzione.',
    Polish: 'Dziękuję za cierpliwość. Doceniam wyrozumiałość podczas poświęcania tej sprawie należytej uwagi.',
    Turkish: 'Sabrınız için teşekkür ederim. Bu konuya gereken özeni gösterirken anlayışınız için minnettarım.',
    Vietnamese: 'Cảm ơn bạn đã kiên nhẫn. Tôi đánh giá cao sự thông cảm của bạn trong khi tôi xử lý kỹ lưỡng vấn đề này.',
    Indonesian: 'Terima kasih atas kesabaran Anda. Saya menghargai pengertian Anda selagi saya memberikan perhatian penuh pada hal ini.',
  },

  // email_2
  'email_2': {
    Spanish: 'Para garantizar que este entregable cumpla con nuestros estándares de calidad, necesitaré hasta el próximo martes para finalizarlo. ¿Podríamos ajustar el cronograma en consecuencia?',
    Portuguese: 'Para garantir que este trabalho atenda aos nossos padrões de qualidade, precisarei até a próxima terça-feira para finalizá-lo. Poderíamos ajustar o cronograma?',
    French: 'Afin de garantir que ce livrable réponde à nos exigences de qualité, j\'aurai besoin d\'un délai jusqu\'à mardi prochain. Pourrions-nous ajuster le calendrier en conséquence ?',
    German: 'Um sicherzustellen, dass dieses Arbeitsergebnis unseren Qualitätsstandards entspricht, benötige ich bis nächsten Dienstag. Können wir den Zeitplan entsprechend anpassen?',
    Hindi: 'यह सुनिश्चित करने के लिए कि यह कार्य हमारे गुणवत्ता मानकों के अनुरूप हो, मुझे इसे अंतिम रूप देने के लिए अगले मंगलवार तक का समय चाहिए। क्या हम समय-सीमा समायोजित कर सकते हैं?',
    Mandarin: '为确保该交付物符合我们的质量标准，我需要到下周二才能最终完成。我们能否相应调整时间表？',
    Japanese: '本成果物が弊社の品質基準を満たすよう、完了までに来週の火曜日までお時間をいただけますでしょうか。スケジュールを調整可能でしょうか。',
    Korean: '본 결과물이 당사의 품질 기준을 충족할 수 있도록, 다음 주 화요일까지 마무리하고자 합니다. 일정 조율이 가능할까요?',
    Arabic: 'لضمان تلبية هذا الإنجاز لمعايير الجودة لدينا، سأحتاج حتى يوم الثلاثاء القادم لإنهائه. هل يمكننا تعديل الجدول الزمني وفقاً لذلك؟',
    Russian: 'Чтобы результат соответствовал нашим стандартам качества, мне потребуется время до следующего вторника. Можем ли мы скорректировать сроки?',
    Italian: 'Per garantire che questo deliverable rispetti i nostri standard di qualità, avrò bisogno di tempo fino a martedì prossimo. Possiamo aggiornare la tempistica?',
    Polish: 'Aby upewnić się, że ten projekt spełnia nasze standardy jakości, będę potrzebować czasu do następnego wtorku. Czy możemy odpowiednio dostosować harmonogram?',
    Turkish: 'Bu çıktının kalite standartlarımıza uymasını sağlamak için önümüzdeki Salı gününe kadar süreye ihtiyacım olacak. Takvimi buna göre güncelleyebilir miyiz?',
    Vietnamese: 'Để đảm bảo bàn giao đúng tiêu chuẩn chất lượng, tôi sẽ cần thời gian đến thứ Ba tuần tới để hoàn thiện. Chúng ta có thể điều chỉnh thời hạn được không?',
    Indonesian: 'Untuk memastikan hasil kerja ini memenuhi standar kualitas kami, saya membutuhkan waktu hingga hari Selasa depan. Bisakah kita menyesuaikan jadwalnya?',
  },

  // email_3
  'email_3': {
    Spanish: 'Quería traer esto de nuevo al inicio de su bandeja de entrada por si se pasó por alto. Por favor avíseme si necesita contexto adicional de mi parte.',
    Portuguese: 'Gostaria de relembrar este ponto caso tenha passado despercebido na sua caixa de entrada. Avise-me se precisar de mais contexto da minha parte.',
    French: 'Je me permets de faire remonter ce message dans votre boîte de réception au cas où il vous aurait échappé. N\'hésitez pas si vous avez besoin d\'informations complémentaires.',
    German: 'Ich wollte diese E-Mail kurz in Erinnerung rufen, falls sie untergegangen ist. Bitte lassen Sie mich wissen, falls Sie weitere Informationen benötigen.',
    Hindi: 'यदि यह ईमेल आपसे छूट गया हो तो मैं इसे आपकी इनबॉक्स में पुनः संज्ञान में लाना चाहता था। यदि आपको अतिरिक्त जानकारी चाहिए तो अवश्य बताएं।',
    Mandarin: '为防此邮件被遗漏，我特地将其置顶提醒一下。如果您需要我提供任何额外背景信息，请随时告知。',
    Japanese: '本件が埋もれてしまっている可能性を考慮し、念のためリマインドさせていただきます。追加の情報が必要でしたらお申し付けください。',
    Korean: '혹시 놓치셨을 수 있어 메일을 다시 상단으로 리마인드해 드립니다. 추가적인 배경 설명이 필요하시면 언제든 말씀해 주세요.',
    Arabic: 'أردت تذكيركم بهذه الرسالة في حال فاتتكم في بريدكم الوارد. يرجى إعلامي إذا كنتم بحاجة إلى أي سياق إضافي من جانبي.',
    Russian: 'Хотел мягко напомнить об этом письме на случай, если оно затерялось во входящих. Дайте знать, если потребуется дополнительная информация.',
    Italian: 'Desideravo ricordarle questa comunicazione nel caso fosse sfuggita. Mi faccia sapere se necessita di ulteriore contesto da parte mia.',
    Polish: 'Chciałem delikatnie przypomnieć o tej wiadomości na wypadek, gdyby umknęła. Daj mi znać, jeśli potrzebujesz dodatkowych informacji.',
    Turkish: 'Gözden kaçmış olabileceği düşüncesiyle bu konuyu gelen kutunuzda nazikçe hatırlatmak istedim. Ek bilgiye ihtiyaç duyarsanız lütfen bildirin.',
    Vietnamese: 'Tôi muốn gửi lại lời nhắc nhẹ về email này phòng trường hợp bạn bị trôi tin nhắn. Vui lòng cho tôi biết nếu bạn cần thêm thông tin.',
    Indonesian: 'Saya ingin mengingatkan kembali perihal email ini jika terlewat. Mohon beri tahu saya jika Anda membutuhkan informasi tambahan.',
  },

  // email_4
  'email_4': {
    Spanish: '¿Podría ayudar a aclarar la prioridad específica en esta iniciativa para asegurar que nuestra ejecución se alinee perfectamente con sus expectativas?',
    Portuguese: 'Poderia esclarecer a prioridade específica desta iniciativa para garantir que nossa execução esteja perfeitamente alinhada às suas expectativas?',
    French: 'Pourriez-vous préciser la priorité sur cette initiative afin que notre exécution corresponde parfaitement à vos attentes ?',
    German: 'Könnten Sie bitte die genaue Priorität bei dieser Initiative klären, damit unsere Umsetzung genau Ihren Erwartungen entspricht?',
    Hindi: 'क्या आप इस पहल की विशिष्ट प्राथमिकता को स्पष्ट करने में मदद कर सकते हैं ताकि हमारा क्रियान्वयन आपकी अपेक्षाओं के पूर्णतः अनुकूल हो?',
    Mandarin: '能否请您进一步明确该项目的具体优先级，以便我们的执行工作能够完全符合您的预期？',
    Japanese: '本取り組みにおける具体的な優先順位をご教示いただけますでしょうか。ご期待に沿った成果を出せるよう確認させていただきます。',
    Korean: '저희의 실행 방향이 기대에 정확히 부합할 수 있도록, 본 프로젝트의 구체적인 우선순위를 명확히 짚어주실 수 있을까요?',
    Arabic: 'هل يمكنك المساعدة في توضيح الأولوية المحددة في هذه المبادرة لنضمن أن تنفيذنا يتوافق تماماً مع توقعاتكم؟',
    Russian: 'Не могли бы вы уточнить приоритеты по этой инициативе, чтобы наша работа в точности соответствовала вашим ожиданиям?',
    Italian: 'Potrebbe chiarire la priorità specifica di questa iniziativa per assicurarci che la nostra esecuzione corrisponda alle sue aspettative?',
    Polish: 'Czy mógłbyś sprecyzować priorytety w tej inicjatywie, aby nasza realizacja była w pełni zgodna z Twoimi oczekiwaniami?',
    Turkish: 'Çalışmalarımızın beklentilerinizle tam olarak örtüşmesini sağlamak adına bu projedeki öncelikleri netleştirebilir misiniz?',
    Vietnamese: 'Bạn có thể làm rõ mức độ ưu tiên cụ thể của dự án này để chúng tôi triển khai hoàn toàn đúng với kỳ vọng được không?',
    Indonesian: 'Bisakah Anda membantu memperjelas prioritas spesifik dalam inisiatif ini agar eksekusi kami selaras dengan ekspektasi Anda?',
  },

  // email_5
  'email_5': {
    Spanish: 'Aunque me encantaría apoyar con esto, mi capacidad actual está totalmente asignada a los entregables clave del trimestre. Alineemos si debemos repriorizar las tareas existentes.',
    Portuguese: 'Embora queira apoiar, minha capacidade atual está totalmente alocada às entregas prioritárias do trimestre. Vamos alinhar se devemos repriorizar tarefas.',
    French: 'Bien que j\'aimerais vous apporter mon soutien, ma charge de travail actuelle est entièrement consacrée à nos livrables prioritaires du trimestre. Voyons si nous devons redéfinir les priorités.',
    German: 'Sehr gerne würde ich hier unterstützen, jedoch sind meine aktuellen Kapazitäten voll für unsere Quartalsziele gebunden. Lassen Sie uns abstimmen, ob wir Aufgaben umpriorisieren.',
    Hindi: 'यद्यपि मैं इसमें सहयोग करना चाहूँगा, मेरी वर्तमान कार्यक्षमता पूरी तरह से तिमाही लक्ष्यों में लगी हुई है। आइए चर्चा करें कि क्या हमें मौजूदा कार्यों को पुनर्गठित करना चाहिए।',
    Mandarin: '虽然我很愿意提供支持，但我目前的精力已全部投入于本季度的核心交付任务中。让我们沟通一下是否需要重新调整现有任务的优先级。',
    Japanese: 'ぜひサポートさせていただきたいのですが、現在当四半期の重要成果物にリソースを集中しております。既存タスクの優先順位を見直すかご相談させてください。',
    Korean: '도움을 드리고 싶지만, 현재 제 업무 리소스가 이번 분기 핵심 과제에 모두 배정되어 있습니다. 기존 업무의 우선순위 재조정을 함께 논의해 보면 어떨까요?',
    Arabic: 'بينما أود تقديم الدعم في هذا الشأن، فإن طاقتي الاستيعابية الحالية مخصصة بالكامل لمخرجات الربع الأساسية. دعنا ننسق إذا كان ينبغي إعادة ترتيب الأولويات.',
    Russian: 'Я был бы рад помочь, однако в настоящее время все мои ресурсы задействованы на ключевых задачах квартала. Давайте согласуем пересмотр приоритетов.',
    Italian: 'Mentre sarei felice di collaborare, la mia disponibilità attuale è interamente dedicata ai deliverable prioritari del trimestre. Valutiamo insieme le priorità.',
    Polish: 'Chętnie bym pomógł, jednak moje obecne moce przerobowe są w pełni przeznaczone na kluczowe projekty kwartalne. Ustalmy, czy powinniśmy zmienić priorytety.',
    Turkish: 'Bu konuda destek olmayı çok isterdim ancak mevcut kapasitem tamamen çeyrek dönemin öncelikli hedeflerine ayrılmış durumda. Öncelikleri yeniden değerlendirelim.',
    Vietnamese: 'Dù rất muốn hỗ trợ nhưng hiện tại toàn bộ khối lượng công việc của tôi đang dồn vào các mục tiêu chính của quý. Chúng ta cùng xem xét việc sắp xếp lại ưu tiên nhé.',
    Indonesian: 'Meskipun saya ingin membantu, kapasitas saya saat ini sepenuhnya dialokasikan untuk target utama kuartal ini. Mari kita selaraskan apakah perlu mengatur ulang prioritas.',
  },

  // interview_1
  'interview_1': {
    Spanish: 'Al inicio de mi carrera, el cambio constante de contexto era un desafío. Para dominarlo, implementé bloques de tiempo estructurados y sistemas de triaje automatizados, lo que aumentó drásticamente mi rendimiento.',
    Portuguese: 'No início da carreira, alternar tarefas com frequência era um desafio. Para superar isso, criei blocos de tempo estruturados e processos de triagem que elevaram muito minha produtividade.',
    French: 'En début de carrière, le changement fréquent de contexte représentait un défi. Pour le surmonter, j\'ai mis en place des plages horaires dédiées et un tri automatisé, ce qui a nettement accru mon efficacité.',
    German: 'Zu Beginn meiner Karriere war der ständige Kontextwechsel eine Herausforderung. Um dies zu meistern, führte ich strukturiertes Timeblocking und automatisierte Abläufe ein, was meine Produktivität stark steigerte.',
    Hindi: 'मेरे करियर की शुरुआत में, बार-बार काम बदलने में चुनौती होती थी। इसे सुधारने के लिए मैंने समय-प्रबंधन और प्राथमिकताओं का ढांचा बनाया, जिससे मेरा प्रदर्शन बहुत बढ़ा।',
    Mandarin: '在职业生涯早期，频繁切换工作上下文曾是一大挑战。为攻克这一难关，我推行了结构化的时间块管理与自动化分流体系，大幅提升了工作吞吐量。',
    Japanese: 'キャリアの初期はマルチタスクの切り替えに苦労しましたが、タイムブロッキングと自動トリアージを導入したことで生産性を大幅に向上させることができました。',
    Korean: '커리어 초기에는 잦은 컨텍스트 전환에 어려움이 있었습니다. 이를 극복하기 위해 타임블록 일정 관리와 우선순위 자동 분류 시스템을 구축하여 업무 효율을 대폭 향상시켰습니다.',
    Arabic: 'في بداية مسيرتي المهنية، كان التبديل بين مهام متعددة تحدياً بالنسبة لي. وللتغلب على ذلك، قمت بتطبيق تنظيم زمني منظم وأطر عمل فرز تلقائية، مما زاد من إنتاجيتي بشكل كبير.',
    Russian: 'В начале карьеры частое переключение между задачами было непростым. Чтобы с этим справиться, я внедрил тайм-блокинг и приоритизацию, что заметно повысило мою эффективность.',
    Italian: 'All\'inizio della carriera la gestione contemporanea di più compiti era complessa. Ho adottato una gestione a blocchi di tempo e priorità chiare, aumentando notevolmente il rendimento.',
    Polish: 'Na początku kariery częsta zmiana zadań była wyzwaniem. Aby temu zaradzić, wdrożyłem bloki czasowe i priorytetyzację, co znacznie zwiększyło moją wydajność.',
    Turkish: 'Kariyerimin başında görevler arası geçiş yapmak benim için bir zorluktu. Bunu aşmak için zaman bloklama ve otomatik önceliklendirme yöntemleri geliştirdim ve verimliliğimi artırdım.',
    Vietnamese: 'Khi mới bắt đầu sự nghiệp, việc chuyển đổi giữa nhiều tác vụ là một thử thách. Tôi đã áp dụng phương pháp chia khối thời gian và phân loại ưu tiên, giúp tăng năng suất vượt bậc.',
    Indonesian: 'Di awal karier, sering berganti konteks tugas cukup menantang. Untuk mengatasinya, saya menerapkan pembagian blok waktu terstruktur yang meningkatkan produktivitas saya secara drastis.',
  },

  // interview_2
  'interview_2': {
    Spanish: 'Con base en investigaciones de mercado para este nivel de experiencia y el valor transversal que aporto, mi rango salarial objetivo está entre $90,000 y $105,000.',
    Portuguese: 'Com base em pesquisas de mercado para este nível de senioridade e no valor que agrego à equipe, busco uma remuneração entre $90.000 e $105.000.',
    French: 'D\'après mes recherches sur les rémunérations du marché pour ce niveau d\'expérience et la valeur ajoutée que j\'apporte, je vise une fourchette entre 90 000 $ et 105 000 $.',
    German: 'Basierend auf meinen Marktanalysen für diese Senioritätsstufe und dem Mehrwert, den ich einbringe, strebe ich eine Gehaltsspanne zwischen 90.000 $ und 105.000 $ an.',
    Hindi: 'इस वरिष्ठता स्तर के बाजार मानकों और मेरे द्वारा प्रदान किए जाने वाले समग्र मूल्य के आधार पर, मेरा लक्षित वेतन दायरा $90,000 से $105,000 के बीच है।',
    Mandarin: '根据我对该职级市场薪酬标准的调研以及我能带来的跨职能价值，我的期望薪资范围在 90,000 美元至 105,000 美元之间。',
    Japanese: 'この職位の市場相場と私が貢献できる総合的な価値に基づき、希望年収レンジとして90,000ドルから105,000ドルを想定しております。',
    Korean: '해당 연차의 시장 기준과 제가 기여할 수 있는 크로스펑셔널 가치를 고려하여, 희망 연봉 범위를 90,000달러에서 105,000달러 사이로 잡고 있습니다.',
    Arabic: 'بناءً على أبحاثي لمعايير السوق لهذا المستوى من الخبرة والقيمة المضافة التي أقدمها، فإنني أستهدف نطاق تعويضات يتراوح بين 90,000 و 105,000 دولار.',
    Russian: 'Опираясь на исследование рыночных показателей для этой позиции и ту ценность, которую я привношу, я ориентируюсь на диапазон от 90 000 до 105 000 долларов.',
    Italian: 'In base alle ricerche di mercato per questo livello e al valore aggiunto che porto, il mio compenso target è compreso tra $90.000 e $105.000.',
    Polish: 'Opierając się na analizie rynkowej dla tego poziomu stanowiska oraz wartości, jaką wnoszę, celuję w przedział wynagrodzenia od 90 000 do 105 000 USD.',
    Turkish: 'Bu kıdem seviyesi için piyasa verilerine ve sunacağım çok yönlü değere dayanarak, 90.000$ ile 105.000$ arasında bir ücret aralığı hedefliyorum.',
    Vietnamese: 'Dựa trên khảo sát thị trường cho vị trí này và giá trị chuyên môn tôi mang lại, mức lương mục tiêu của tôi nằm trong khoảng $90.000 đến $105.000.',
    Indonesian: 'Berdasarkan riset pasar untuk level ini dan nilai tambah yang saya tawarkan, rentang kompensasi yang saya targetkan adalah antara $90.000 hingga $105.000.',
  },

  // interview_3
  'interview_3': {
    Spanish: 'En un rol anterior, mi gerente y yo teníamos estilos de comunicación distintos. Programé proactivamente reuniones semanales con paneles de estado claros, lo que generó confianza y autonomía.',
    Portuguese: 'Em uma função anterior, tínhamos estilos de comunicação diferentes. Tomei a iniciativa de agendar reuniões semanais com métricas claras, construindo confiança e autonomia.',
    French: 'Dans un poste précédent, mon responsable et moi avions des styles de communication différents. J\'ai pris l\'initiative d\'organiser un point hebdomadaire avec des tableaux de bord clairs, instaurant confiance et autonomie.',
    German: 'In einer früheren Position hatten meine Führungskraft und ich unterschiedliche Kommunikationsstile. Ich führte proaktiv wöchentliche Abstimmungen mit Status-Dashboards ein, was Vertrauen und Autonomie schuf.',
    Hindi: 'एक पिछली भूमिका में, मेरे प्रबंधक और मेरे संवाद की शैली में भिन्नता थी। मैंने सक्रिय रूप से साप्ताहिक बैठकें और स्थिति रिपोर्ट शुरू की, जिससे विश्वास और स्वायत्तता बनी।',
    Mandarin: '在之前的职位中，我和主管的沟通风格有所不同。我主动安排了每周同步会并建立清晰的进度看板，从而赢得了信任与工作自主权。',
    Japanese: '前職ではマネージャーとコミュニケーションのスタイルが異なっていました。そこで週次の進捗ダッシュボードを作成し共有することで、信頼関係と自律性を確立しました。',
    Korean: '이전 직장에서 매니저와 소통 방식에 차이가 있었습니다. 저는 주간 진행 현황 대시보드를 직접 마련하여 정기적으로 공유함으로써 신뢰와 자율성을 구축했습니다.',
    Arabic: 'في دور سابق، كان لدي ولمديري أساليب تواصل مختلفة. بادرت بجدولة لقاءات أسبوعية مع لوحات معلومات واضحة للحالة، مما بنى الثقة والاستقلالية.',
    Russian: 'На предыдущем месте у нас с руководителем были разные стили коммуникации. Я проявил инициативу и внедрил еженедельные синки со статусами, что укрепило доверие и автономность.',
    Italian: 'In un ruolo precedente, io e il mio responsabile avevamo stili comunicativi diversi. Ho organizzato allineamenti settimanali con report chiari, creando fiducia e autonomia.',
    Polish: 'Na poprzednim stanowisku mój przełożony i ja mieliśmy inne style komunikacji. Wprowadziłem cotygodniowe podsumowania z przejrzystymi dashboardami, co zbudowało zaufanie i niezależność.',
    Turkish: 'Önceki görevimde yöneticimle iletişim tarzlarımız farklıydı. Şeffaf durum panelleriyle haftalık düzenli toplantılar organize ederek güven ve özerklik inşa ettim.',
    Vietnamese: 'Ở công ty cũ, tôi và quản lý có phong cách giao tiếp khác nhau. Tôi đã chủ động thiết lập các buổi cập nhật tuần cùng bảng theo dõi tiến độ rõ ràng, tạo dựng sự tin tưởng và tự chủ.',
    Indonesian: 'Dalam pekerjaan sebelumnya, manajer saya dan saya memiliki gaya komunikasi yang berbeda. Saya berinisiatif menjadwalkan pertemuan mingguan dengan dasbor status yang jelas untuk membangun kepercayaan.',
  },

  // interview_4
  'interview_4': {
    Spanish: 'Estoy orgulloso del impacto fundamental logrado con mi equipo actual. Ahora busco un entorno más dinámico donde pueda asumir retos arquitectónicos mayores y liderar el crecimiento estratégico.',
    Portuguese: 'Tenho muito orgulho dos resultados fundamentais alcançados com minha equipe atual. Agora busco um ambiente inovador onde possa liderar desafios arquiteturais maiores.',
    French: 'Je suis fier de l\'impact significatif obtenu avec mon équipe actuelle. Je recherche désormais un environnement à fort dynamisme pour relever des défis plus stratégiques.',
    German: 'Ich bin stolz auf die Erfolge, die ich mit meinem aktuellen Team erzielt habe. Nun suche ich ein dynamisches Umfeld, um größere strategische Herausforderungen voranzutreiben.',
    Hindi: 'मुझे अपनी वर्तमान टीम के साथ हासिल किए गए ठोस प्रभाव पर गर्व है। अब मैं ऐसे गतिशील वातावरण की तलाश में हूँ जहाँ मैं बड़ी रणनीतिक चुनौतियों का नेतृत्व कर सकूँ।',
    Mandarin: '我对在现有团队中所奠定的扎实成果深感自豪。现在我正寻求一个更高成长速度的环境，以迎接更大的架构挑战并推动战略性业务增长。',
    Japanese: '現職のチームで達成した基盤作りの成果に誇りを持っています。現在は、より高度な課題に挑み戦略的成長を牽引できるダイナミックな環境を求めています。',
    Korean: '현재 팀에서 일군 성과에 큰 자부심을 느끼고 있습니다. 이제는 더 큰 규모의 전략적 과제를 해결하고 성장을 주도할 수 있는 역동적인 환경을 찾고 있습니다.',
    Arabic: 'أنا فخور بالأثر التأسيسي الذي حققته مع فريقي الحالي. أبحث الآن عن بيئة عمل سريعة الوتيرة لمواجهة تحديات استراتيجية أكبر ودفع عجلة النمو.',
    Russian: 'Я горжусь результатами, достигнутыми с нынешней командой. Сейчас я ищу более масштабную среду, где смогу решать крупные задачи и развивать стратегию.',
    Italian: 'Sono fiero dei risultati ottenuti con il mio team attuale. Ora cerco un ambiente dinamico dove affrontare sfide strategiche di maggior respiro.',
    Polish: 'Jestem dumny z fundamentów i wyników osiągniętych z obecnym zespołem. Obecnie szukam dynamicznego środowiska, w którym mogę realizować większe wyzwania strategiczne.',
    Turkish: 'Mevcut ekibimle elde ettiğim başarılardan gurur duyuyorum. Şimdi daha büyük stratejik hedeflere liderlik edebileceğim dinamik bir çalışma ortamı arıyorum.',
    Vietnamese: 'Tôi tự hào về những đóng góp nền tảng cho đội ngũ hiện tại. Giờ đây tôi đang tìm kiếm một môi trường năng động hơn để đảm nhận những thử thách chiến lược lớn hơn.',
    Indonesian: 'Saya bangga atas kontribusi yang telah saya capai bersama tim saat ini. Sekarang saya mencari lingkungan yang dinamis untuk menghadapi tantangan strategis yang lebih besar.',
  },

  // tech_1
  'tech_1': {
    Spanish: 'Excelente progreso en este PR. Para mejorar la mantenibilidad a largo plazo, ¿podríamos considerar modularizar esta función auxiliar y añadir pruebas unitarias para casos límite?',
    Portuguese: 'Ótimo progresso neste PR. Para facilitar a manutenção no futuro, poderíamos considerar modularizar esta função auxiliar e incluir testes unitários para casos de borda?',
    French: 'Très bon travail sur cette PR. Pour faciliter la maintenance à long terme, pourrions-nous modulariser cette fonction utilitaire et ajouter des tests unitaires pour les cas particuliers ?',
    German: 'Tolle Arbeit bei diesem PR. Um die langfristige Wartbarkeit zu verbessern: Könnten wir erwägen, diese Hilfsfunktion zu modularisieren und Unit-Tests für Randfälle hinzuzufügen?',
    Hindi: 'इस PR पर बेहतरीन प्रगति। दीर्घकालिक रखरखाव को बेहतर बनाने के लिए, क्या हम इस हेल्पर फ़ंक्शन को मॉड्यूलर बनाने और यूनिट टेस्ट जोड़ने पर विचार कर सकते हैं?',
    Mandarin: '这个 PR 进展很棒。为了提升代码的长期可维护性，我们是否可以考虑将这个辅助函数模块化，并针对边界情况补充单元测试？',
    Japanese: '本PRの進捗素晴らしいですね。長期的な保守性を高めるため、このヘルパー関数をモジュール化しエッジケースの単体テストを追加することを検討できますでしょうか。',
    Korean: 'PR 작업이 훌륭하게 진행되었습니다. 장기적인 유지보수성을 높이기 위해, 이 헬퍼 함수를 모듈화하고 엣지 케이스 단위 테스트를 추가하는 방안을 고려해 볼 수 있을까요?',
    Arabic: 'تقدم رائع في طلب السحب هذا. لتحسين قابلية الصيانة على المدى الطويل، هل يمكننا النظر في تقسيم هذه الدالة المساعدة وإضافة اختبارات للتعامل مع الحالات الخاصة؟',
    Russian: 'Отличная работа по этому PR. Чтобы код было проще поддерживать в будущем, можем ли мы вынести вспомогательную функцию в модуль и покрыть тестами крайние случаи?',
    Italian: 'Ottimo lavoro su questa PR. Per migliorare la manutenibilità nel lungo termine, potremmo modularizzare questa funzione helper e aggiungere unit test per i casi limite?',
    Polish: 'Świetny postęp w tym PR. Aby ułatwić utrzymanie kodu, czy możemy rozważyć zmodularyzowanie tej funkcji pomocniczej i dodanie testów jednostkowych?',
    Turkish: 'Bu PR\'daki ilerleme harika. Uzun vadeli bakım kolaylığı için bu yardımcı fonksiyonu modüler hale getirmeyi ve uç durumlar için birim testleri eklemeyi değerlendirebilir miyiz?',
    Vietnamese: 'Tiến độ rất tốt trên PR này. Để tăng tính dễ bảo trì lâu dài, chúng ta có thể tách hàm phụ này thành module và thêm unit test cho các trường hợp biên không?',
    Indonesian: 'Kemajuan luar biasa pada PR ini. Untuk mempermudah pemeliharaan jangka panjang, bisakah kita memodularisasi fungsi pembantu ini dan menambahkan pengujian unit?',
  },

  // tech_2
  'tech_2': {
    Spanish: 'Estoy bloqueado temporalmente en la integración del checkout a la espera del endpoint de autenticación del equipo de backend. Crearé datos simulados (mocks) hoy y me sincronizaré con David para desbloquear.',
    Portuguese: 'Estou com um impedimento na integração do checkout aguardando o endpoint de autenticação do backend. Vou utilizar mocks hoje e alinhar com o David para desbloquear.',
    French: 'Je suis actuellement bloqué sur l\'intégration du paiement en attente du point de terminaison d\'authentification du backend. Je vais créer des mocks aujourd\'hui et faire le point avec David pour débloquer.',
    German: 'Ich bin beim Checkout-Modul derzeit durch den noch ausstehenden Authentifizierungs-Endpunkt blockiert. Ich werde heute mit Mock-Daten arbeiten und mich mit David abstimmen.',
    Hindi: 'बैकएंड टीम से प्रमाणीकरण एंडपॉइंट न मिलने के कारण मैं चेकआउट एकीकरण में रुका हुआ हूँ। मैं आज मॉक डेटा बनाकर डेविड के साथ समन्वय करूँगा।',
    Mandarin: '由于等待后端团队的身份验证接口，我目前在结账集成模块遇到了阻碍。今天我会先用 Mock 数据推进，并与 David 线下沟通以解除阻塞。',
    Japanese: 'バックエンドの認証API待ちのため、チェックアウトの統合作業が止まっています。本日はモックで先行して進め、Davidと調整して解消を図ります。',
    Korean: '백엔드 팀의 인증 엔드포인트 대기 중으로 결제 연동 작업에 블로커가 있습니다. 오늘은 모의(Mock) 데이터로 작업하고 데이비드와 소통하여 해결하겠습니다.',
    Arabic: 'أنا متوقف حالياً في تكامل صفحة الدفع بانتظار نقطة نهاية المصادقة من فريق الخلفية. سأستخدم بيانات وهمية اليوم وأتواصل مع ديفيد لتجاوز هذه العقبة.',
    Russian: 'Я временно заблокирован на интеграции чекаута в ожидании эндпоинта аутентификации от бэкенда. Сегодня буду работать с моками и свяжусь с Дэвидом.',
    Italian: 'Sono attualmente bloccato sull\'integrazione del checkout in attesa dell\'endpoint di autenticazione del backend. Userò dei mock oggi e mi allineerò con David per sbloccare.',
    Polish: 'Jestem zablokowany na integracji kasy w oczekiwaniu na endpoint uwierzytelniania od zespołu backendu. Dzisiaj użyję mocków i skonsultuję się z Dawidem.',
    Turkish: 'Backend ekibinden kimlik doğrulama uç noktasını beklediğim için ödeme entegrasyonunda tıkandım. Bugün sahte verilerle (mock) ilerleyip engeli kaldırmak için David ile görüşeceğim.',
    Vietnamese: 'Tôi đang bị nghẽn ở phần tích hợp thanh toán do chờ API xác thực từ đội backend. Hôm nay tôi sẽ dùng dữ liệu giả lập (mock) và trao đổi với David để giải quyết.',
    Indonesian: 'Saya terhambat pada integrasi checkout sambil menunggu endpoint otentikasi dari tim backend. Saya akan membuat data tiruan (mock) hari ini dan koordinasi dengan David.',
  },

  // tech_3
  'tech_3': {
    Spanish: 'Agregar estas historias de usuario adicionales afectará nuestro cronograma comprometido del sprint. ¿Pasamos este requisito al backlog del siguiente sprint o intercambiamos una tarea actual?',
    Portuguese: 'Adicionar estas novas histórias de usuário afetará o prazo acordado para a sprint. Devemos mover este requisito para a próxima sprint ou trocar por uma tarefa atual?',
    French: 'L\'ajout de ces user stories supplémentaires aura un impact sur le calendrier engagé de notre sprint. Doit-on reporter cette exigence au sprint suivant ou permuter avec un ticket existant ?',
    German: 'Das Hinzufügen dieser zusätzlichen User Stories wird unseren Sprint-Zeitplan beeinträchtigen. Sollen wir diese Anforderung in den nächsten Sprint verschieben oder gegen ein bestehendes Ticket tauschen?',
    Hindi: 'इन अतिरिक्त यूजर स्टोरीज को जोड़ने से हमारी कमिटेड स्प्रिंट समय-सीमा प्रभावित होगी। क्या हम इसे अगले स्प्रिंट में रखें या किसी मौजूदा टास्क से बदलें?',
    Mandarin: '加入这些额外的用户故事将会影响我们承诺的 Sprint 交付周期。我们是将此需求移至下一个 Sprint 的 Backlog，还是置换掉当前已有的任务？',
    Japanese: 'これらのユーザーストーリーを追加すると、コミットしたスプリント期限に影響します。次のスプリントに回すか、既存のタスクと差し替えますでしょうか。',
    Korean: '이러한 유저 스토리를 추가하면 약정된 스프린트 일정에 영향이 있습니다. 이 요구사항을 다음 스프린트 백로그로 넘길까요, 아니면 기존 티켓과 맞바꿀까요?',
    Arabic: 'إن إضافة قصص المستخدم الإضافية هذه ستؤثر على الجدول الزمني الملتزم به للسبرنت. هل ننقل هذا المتطلب إلى السبرنت التالي أم نستبدله بمهمة حالية؟',
    Russian: 'Добавление этих пользовательских историй повлияет на согласованные сроки спринта. Перенесем требование в следующий спринт или заменим одну из текущих задач?',
    Italian: 'Aggiungere queste user story influirà sulla tempistica concordata dello sprint. Spostiamo questo requisito al prossimo sprint o lo scambiamo con un task attuale?',
    Polish: 'Dodanie tych historyjek użytkownika wpłynie na harmonogram obecnego sprintu. Czy przenosimy to wymaganie do następnego sprintu, czy wymieniamy na bieżące zadanie?',
    Turkish: 'Bu ek kullanıcı hikayelerini dahil etmek taahhüt ettiğimiz sprint takvimini etkileyecektir. Bu gereksinimi bir sonraki sprinte mi aktaralım yoksa mevcut bir görevle mi değiştirelim?',
    Vietnamese: 'Thêm các user story này sẽ ảnh hưởng đến tiến độ cam kết của sprint. Chúng ta nên chuyển yêu cầu này sang sprint tiếp theo hay đổi chỗ cho một nhiệm vụ hiện tại?',
    Indonesian: 'Menambahkan user story ini akan memengaruhi linimasa sprint yang disepakati. Apakah kita pindahkan kebutuhan ini ke backlog sprint berikutnya atau menukarnya dengan tugas yang ada?',
  },

  // idiom_1
  'idiom_1': {
    Spanish: 'Retomemos este tema una vez que hayamos finalizado el informe analítico para poder tomar una decisión basada en datos.',
    Portuguese: 'Vamos retomar este ponto assim que finalizarmos o relatório analítico para tomarmos uma decisão embasada em dados.',
    French: 'Revenons sur ce sujet dès que nous aurons finalisé le rapport d\'analyse afin de prendre une décision éclairée par les données.',
    German: 'Lassen Sie uns darauf zurückkommen, sobald der Analysebericht vorliegt, damit wir eine datenbasierte Entscheidung treffen können.',
    Hindi: 'एनालिटिक्स रिपोर्ट पूरी होने के बाद आइए इस विषय पर दोबारा चर्चा करें ताकि हम डेटा-आधारित निर्णय ले सकें।',
    Mandarin: '等我们完成数据分析报告后再回过头来深入讨论此事，以便我们能够做出以数据为支撑的决策。',
    Japanese: 'データに基づいた意思決定ができるよう、分析レポートが完成した段階で改めて本件に戻りましょう。',
    Korean: '데이터에 기반한 의사결정을 내릴 수 있도록, 분석 보고서가 완료된 후 본 사안을 다시 검토합시다.',
    Arabic: 'دعنا نرجع إلى هذا الموضوع بمجرد الانتهاء من تقرير التحليلات حتى نتمكن من اتخاذ قرار مبني على البيانات.',
    Russian: 'Давайте вернемся к этому вопросу, как только подготовим аналитический отчет, чтобы принять решение на основе данных.',
    Italian: 'Rivediamo questo argomento non appena avremo completato il report analitico, così da prendere una decisione basata sui dati.',
    Polish: 'Wróćmy do tego tematu po sfinalizowaniu raportu analitycznego, aby podjąć decyzję opartą na danych.',
    Turkish: 'Veriye dayalı bir karar verebilmemiz için analiz raporu tamamlandığında bu konuya tekrar dönelim.',
    Vietnamese: 'Hãy quay lại chủ đề này sau khi chúng ta hoàn tất báo cáo phân tích để có thể đưa ra quyết định dựa trên số liệu.',
    Indonesian: 'Mari kita bahas kembali hal ini setelah laporan analitik selesai agar kita dapat mengambil keputusan berbasis data.',
  },

  // idiom_2
  'idiom_2': {
    Spanish: 'Me encantaría ponernos de acuerdo brevemente antes de la llamada con el cliente para asegurarnos de que nuestros puntos clave estén alineados.',
    Portuguese: 'Gostaria de alinhar rapidamente os pontos antes da chamada com o cliente para garantir que estejamos em sintonia.',
    French: 'J\'aimerais que l\'on fasse un point rapide avant l\'appel client pour s\'assurer de notre parfait alignement.',
    German: 'Ich würde mich gerne vor dem Kundengespräch kurz mit Ihnen abstimmen, um sicherzustellen, dass wir dieselbe Linie vertreten.',
    Hindi: 'क्लाइंट कॉल से पहले मैं आपसे संक्षेप में विचार मिलाना चाहूँगा ताकि हमारे मुख्य बिंदु पूरी तरह से संरेखित रहें।',
    Mandarin: '我很想在与客户通话前同您快速碰一下，确保我们的沟通要点完全保持一致。',
    Japanese: 'クライアントとの通話前に手短に打ち合わせをし、私たちの論点が完全に一致していることを確認させてください。',
    Korean: '클라이언트 미팅 전에 핵심 논의 사항을 완벽히 맞출 수 있도록 간단히 사전 조율을 하고 싶습니다.',
    Arabic: 'أود أن نتواصل سريعاً قبل مكالمة العميل للتأكد من أن نقاط حديثنا متوافقة تماماً.',
    Russian: 'Я бы хотел кратко сверить часы перед звонком клиенту, чтобы убедиться в полной согласованности наших позиций.',
    Italian: 'Vorrei fare un breve allineamento prima della chiamata con il cliente per assicurarci che i nostri punti chiave siano concordati.',
    Polish: 'Chciałbym krótko się zdzwonić przed rozmową z klientem, aby upewnić się, że nasze punkty widzenia są w pełni zbieżne.',
    Turkish: 'Müşteri görüşmesinden önce ana noktalarımızın tamamen uyumlu olduğundan emin olmak için hızlıca bir araya gelmek isterim.',
    Vietnamese: 'Tôi muốn trao đổi nhanh trước cuộc gọi với khách hàng để đảm bảo các điểm thảo luận của chúng ta hoàn toàn thống nhất.',
    Indonesian: 'Saya ingin menyamakan persepsi secara singkat sebelum panggilan dengan klien agar poin-poin kita selaras.',
  },

  // idiom_3
  'idiom_3': {
    Spanish: 'Entiendo tu perspectiva; sin embargo, al observar las métricas recientes de deserción de clientes, permíteme compartir un punto de vista alternativo.',
    Portuguese: 'Compreendo o seu ponto de vista; contudo, analisando as métricas recentes de retenção de clientes, gostaria de propor uma perspectiva alternativa.',
    French: 'Je comprends tout à fait votre point de vue ; cependant, au vu des récentes métriques de résiliation client, permettez-moi de partager une autre perspective.',
    German: 'Ich verstehe Ihren Ansatz vollkommen; wenn wir jedoch die jüngsten Kennzahlen zur Kundenabwanderung betrachten, erlauben Sie mir eine alternative Sichtweise.',
    Hindi: 'मैं आपका दृष्टिकोण समझता हूँ; फिर भी, हाल के ग्राहक डेटा को देखते हुए, मुझे एक वैकल्पिक दृष्टिकोण साझा करने की अनुमति दें।',
    Mandarin: '我明白您的考虑角度；不过结合最近的客户流失数据指标来看，请允许我分享一个不同的视角。',
    Japanese: 'おっしゃる意図はよく分かりますが、最近の解約率の指標を鑑みますと、別の観点も共有させていただければ幸いです。',
    Korean: '말씀하시는 취지는 충분히 이해합니다만, 최근 고객 이탈 지표를 고려하여 다른 관점을 하나 공유해 드리고자 합니다.',
    Arabic: 'أفهم وجهة نظرك جيداً؛ ولكن بالنظر إلى مقاييس مغادرة العملاء الأخيرة، اسمح لي بمشاركة منظور بديل.',
    Russian: 'Я понимаю вашу точку зрения, однако, учитывая недавние показатели оттока клиентов, позвольте предложить альтернативный взгляд.',
    Italian: 'Comprendo il suo punto di vista; tuttavia, esaminando le metriche recenti sull\'abbandono dei clienti, mi permetta di condividere un\'altra prospettiva.',
    Polish: 'Rozumiem Twój punkt widzenia, jednak patrząc na ostatnie wskaźniki rezygnacji klientów, pozwól mi przedstawić alternatywne spojrzenie.',
    Turkish: 'Nereden baktığınızı anlıyorum; ancak son müşteri kaybı metriklerine baktığımızda farklı bir bakış açısı paylaşmama izin verin.',
    Vietnamese: 'Tôi hiểu góc nhìn của bạn; tuy nhiên nhìn vào số liệu khách hàng rời bỏ gần đây, xin phép cho tôi chia sẻ một quan điểm khác.',
    Indonesian: 'Saya memahami sudut pandang Anda; namun melihat metrik churn pelanggan terbaru, izinkan saya menyampaikan perspektif alternatif.',
  },

  // idiom_4
  'idiom_4': {
    Spanish: 'Asumo la total responsabilidad por esta omisión. Ya apliqué el parche correctivo y actualicé nuestra lista de verificación para evitar que se repita.',
    Portuguese: 'Assumo total responsabilidade por essa falha. Já apliquei a correção necessária e atualizei nossa lista de verificação para evitar novas ocorrências.',
    French: 'J\'assume l\'entière responsabilité de cet oubli. J\'ai d\'ores et déjà déployé le correctif et mis à jour notre check-list pour éviter toute récidive.',
    German: 'Ich übernehme die volle Verantwortung für dieses Versehen. Ich habe die Korrektur bereits eingespielt und unsere Prüfliste aktualisiert, um ein Wiederauftreten zu verhindern.',
    Hindi: 'मैं इस चूक की पूरी जिम्मेदारी लेता हूँ। मैंने सुधार लागू कर दिया है और भविष्य में इसकी पुनरावृत्ति रोकने के लिए चेकलिस्ट भी अपडेट कर दी है।',
    Mandarin: '我对此疏忽承担全部责任。我已经部署了修复方案，并更新了我们的核查清单以杜绝此类问题再次发生。',
    Japanese: '本件の不手際につきまして全責任を負います。すでに修正対応を完了し、再発防止のためにチェックリストを更新いたしました。',
    Korean: '이번 누락에 대해 전적으로 책임을 통감합니다. 이미 수정 조치를 완료하였으며, 재발 방지를 위해 검증 체크리스트를 업데이트했습니다.',
    Arabic: 'أتحمل المسؤولية الكاملة عن هذا السهو. لقد قمت بالفعل بتطبيق التصحيح وتحديث قائمة التحقق لدينا لمنع تكرار ذلك.',
    Russian: 'Я беру на себя полную ответственность за это упущение. Я уже применил исправление и обновил регламент проверки, чтобы это не повторилось.',
    Italian: 'Mi assumo la piena responsabilità per questa svista. Ho già applicato la correzione e aggiornato la checklist per evitare che si ripeta.',
    Polish: 'Biorę pełną odpowiedzialność za to niedopatrzenie. Wdrożyłem już poprawkę i zaktualizowałem listę kontrolną, aby zapobiec powtórzeniu sytuacji.',
    Turkish: 'Bu aksaklığın tüm sorumluluğunu üstleniyorum. Düzeltmeyi uyguladım ve tekrarını önlemek için kontrol listemizi güncelledim.',
    Vietnamese: 'Tôi hoàn toàn chịu trách nhiệm về sơ suất này. Tôi đã áp dụng bản vá sửa lỗi và cập nhật danh sách kiểm tra để không lặp lại.',
    Indonesian: 'Saya bertanggung jawab penuh atas kelalaian ini. Saya sudah menerapkan perbaikan dan memperbarui checklist agar hal serupa tidak terulang.',
  },

  // client_1
  'client_1': {
    Spanish: 'Comprendo perfectamente lo frustrante que ha sido esta interrupción para su equipo. Estoy supervisando personalmente este caso y les enviaré actualizaciones cada dos horas hasta resolverlo.',
    Portuguese: 'Entendo perfeitamente o quanto essa interrupção tem sido frustrante para sua equipe. Estou acompanhando este chamado pessoalmente e enviarei atualizações a cada duas horas.',
    French: 'Je comprends parfaitement à quel point cette interruption a été contraignante pour votre équipe. Je prends personnellement ce ticket en charge et vous tiendrai informé toutes les deux heures jusqu\'à résolution.',
    German: 'Ich verstehe vollkommen, wie frustrierend diese Unterbrechung für Ihr Team ist. Ich kümmere mich persönlich um diesen Fall und gebe Ihnen alle zwei Stunden ein Update.',
    Hindi: 'मैं पूरी तरह समझता हूँ कि यह रुकावट आपकी टीम के लिए कितनी कष्टप्रद रही है। मैं व्यक्तिगत रूप से इस मामले की निगरानी कर रहा हूँ और हल होने तक हर 2 घंटे में अपडेट दूँगा।',
    Mandarin: '我完全理解这次系统中断给贵方团队带来的困扰。我正亲自督办此工单，并在问题彻底解决前每两小时向您同步最新进展。',
    Japanese: '今回の障害が貴社チームにとってどれほどご不便であるか、深く理解しております。私が責任を持って本件を担当し、解決まで2時間ごとに進捗をご報告いたします。',
    Korean: '이번 서비스 중단으로 귀사 팀에 큰 불편을 끼쳐드린 점 깊이 공감합니다. 제가 직접 사안을 챙기며 문제가 해결될 때까지 2시간 간격으로 진행 상황을 공유해 드리겠습니다.',
    Arabic: 'أتفهم تماماً مدى الإحباط الذي سببه هذا الانقطاع لفريقكم. أنا أتابع هذه التذكرة شخصياً وسأزودكم بتحديثات كل ساعتين حتى يتم حل المشكلة.',
    Russian: 'Я прекрасно понимаю, насколько эта заминка неприятна для вашей команды. Я лично контролирую решение вопроса и буду присылать обновления каждые два часа.',
    Italian: 'Comprendo perfettamente quanto questo disservizio sia stato frustrante per il vostro team. Sto seguendo personalmente il caso e vi aggiornerò ogni due ore.',
    Polish: 'Doskonale rozumiem, jak frustrująca dla Waszego zespołu była ta przerwa. Osobiście nadzoruję to zgłoszenie i będę przekazywać informacje co dwie godziny.',
    Turkish: 'Bu kesintinin ekibiniz için ne kadar can sıkıcı olduğunu çok iyi anlıyorum. Bu kayıtla bizzat ilgileniyorum ve çözülene kadar her iki saatte bir durum güncellemesi geçeceğim.',
    Vietnamese: 'Tôi hoàn toàn hiểu sự cố gián đoạn này gây khó khăn như thế nào cho đội ngũ của bạn. Tôi đang trực tiếp xử lý và sẽ cập nhật tiến độ mỗi hai giờ cho đến khi xong.',
    Indonesian: 'Saya sangat memahami betapa mengecewakannya gangguan ini bagi tim Anda. Saya mengawasi tiket ini secara pribadi dan akan memberikan pembaruan setiap dua jam.',
  },

  // client_2
  'client_2': {
    Spanish: 'Muchas gracias por su paciencia el día de hoy. El médico está atendiendo un caso urgente y estará con usted en breve. ¿Le gustaría un vaso de agua mientras espera?',
    Portuguese: 'Muito obrigado pela sua paciência hoje. O médico está prestando atendimento a um caso de emergência e já estará com você. Gostaria de um copo de água enquanto aguarda?',
    French: 'Merci pour votre patience aujourd\'hui. Le médecin s\'occupe actuellement d\'une urgence et sera à vous dans un instant. Puis-je vous proposer un verre d\'eau en attendant ?',
    German: 'Vielen Dank für Ihre Geduld heute. Die Ärztin/der Arzt versorgt gerade einen dringenden Notfall und ist gleich für Sie da. Darf ich Ihnen in der Zwischenzeit ein Glas Wasser anbieten?',
    Hindi: 'आज आपके धैर्य के लिए बहुत धन्यवाद। चिकित्सक एक आपातकालीन मामले को देख रहे हैं और शीघ्र ही आपके पास होंगे। क्या आप प्रतीक्षा के दौरान पानी लेना चाहेंगे?',
    Mandarin: '非常感谢您今天的耐心等待。医生目前正在全心救治一位紧急病患，很快就会前来为您诊疗。在您等待期间需要为您倒杯水吗？',
    Japanese: '本日はお待ちいただき誠にありがとうございます。医師が現在急患の対応をしており、間もなく参ります。お待ちの間に温かいお茶かお水をお持ちいたしましょうか。',
    Korean: '오늘 기다려 주셔서 진심으로 감사드립니다. 의사 선생님께서 현재 응급 환자를 진료 중이시며 곧 진료해 드릴 예정입니다. 대기하시는 동안 물 한 잔 가져다 드릴까요?',
    Arabic: 'شكراً جزيلاً لصبركم اليوم. الطبيب يقدم حالياً رعاية عاجلة لحالة طارئة وسيكون معكم في أقرب وقت. هل ترغبون في كوب ماء أثناء الانتظار؟',
    Russian: 'Большое спасибо за ваше терпение сегодня. Доктор сейчас оказывает помощь экстренному пациенту и скоро подойдет к вам. Принести вам воды, пока вы ждете?',
    Italian: 'Grazie mille per la pazienza. Il medico sta seguendo un\'urgenza e sarà da lei a breve. Desidera un bicchiere d\'acqua mentre aspetta?',
    Polish: 'Bardzo dziękuję za dzisiejszą cierpliwość. Lekarz zajmuje się obecnie nagłym przypadkiem i wkrótce do Pana/Pani przyjdzie. Czy podać szklankę wody?',
    Turkish: 'Bugünkü sabrınız için çok teşekkürler. Doktorumuz şu anda acil bir hastayla ilgileniyor ve kısa süre içinde yanınızda olacak. Beklerken bir bardak su ister misiniz?',
    Vietnamese: 'Cảm ơn bạn rất nhiều vì đã kiên nhẫn hôm nay. Bác sĩ đang xử lý một ca khẩn cấp và sẽ đến gặp bạn ngay. Tôi có thể lấy cho bạn cốc nước trong khi chờ không?',
    Indonesian: 'Terima kasih banyak atas kesabaran Anda hari ini. Dokter saat ini sedang menangani pasien darurat dan akan segera menemui Anda. Apakah Anda ingin segelas air selagi menunggu?',
  },
};

/**
 * Common translation dictionary for workplace expressions.
 */
const COMMON_WORKPLACE_GLOSSARY: Record<string, Record<string, string>> = {
  'Thank you for your patience': {
    Spanish: 'Gracias por su paciencia',
    Portuguese: 'Obrigado pela sua paciência',
    French: 'Merci pour votre patience',
    German: 'Vielen Dank für Ihre Geduld',
    Hindi: 'आपके धैर्य के लिए धन्यवाद',
    Mandarin: '感谢您的耐心',
    Japanese: 'お待ちいただきありがとうございます',
    Korean: '기다려 주셔서 감사합니다',
    Arabic: 'شكراً لصبركم',
    Russian: 'Благодарю за терпение',
    Italian: 'Grazie per la pazienza',
    Polish: 'Dziękuję za cierpliwość',
    Turkish: 'Sabrınız için teşekkürler',
    Vietnamese: 'Cảm ơn sự kiên nhẫn của bạn',
    Indonesian: 'Terima kasih atas kesabaran Anda',
  },
  'I would appreciate an update': {
    Spanish: 'Agradecería una actualización',
    Portuguese: 'Agradeceria uma atualização',
    French: 'J\'apprécierais une mise à jour',
    German: 'Ich würde mich über ein Update freuen',
    Hindi: 'मुझे एक अपडेट मिलने की सराहना होगी',
    Mandarin: '如果能获得最新进展我将不胜感激',
    Japanese: '進捗状況をご共有いただけますと幸いです',
    Korean: '업데이트를 공유해 주시면 감사하겠습니다',
    Arabic: 'سأكون ممتناً للحصول على تحديث',
    Russian: 'Буду признателен за обновление статуса',
    Italian: 'Gradirei un aggiornamento',
    Polish: 'Byłbym wdzięczny za informację o stanie sprawy',
    Turkish: 'Bir durum güncellemesi paylaşırsanız sevinirim',
    Vietnamese: 'Tôi rất mong nhận được cập nhật',
    Indonesian: 'Saya akan menghargai pembaruan terkait hal ini',
  },
};

/**
 * Gets a clean, localized translation for a flashcard based on the user's selected native language.
 */
export function getFlashcardTranslation(
  card: Flashcard,
  nativeLanguage: NativeLanguage | string = 'Spanish'
): string {
  if (!card) return '';

  const cleanLang = (nativeLanguage || 'Spanish').trim();
  const normalizedLang = cleanLang.charAt(0).toUpperCase() + cleanLang.slice(1).toLowerCase();

  // 1. Check if we have an explicit database entry for this preset card ID
  if (card.id && PRESET_TRANSLATIONS_DATABASE[card.id]) {
    const cardTranslations = PRESET_TRANSLATIONS_DATABASE[card.id];
    if (cardTranslations[normalizedLang]) {
      return cardTranslations[normalizedLang];
    }
  }

  // 2. Check if the card has an internal backTranslation object
  if (card.backTranslation) {
    if (typeof card.backTranslation === 'object') {
      const matchKey = Object.keys(card.backTranslation).find(
        (k) => k.toLowerCase() === cleanLang.toLowerCase()
      );
      if (matchKey && card.backTranslation[matchKey]) {
        return card.backTranslation[matchKey];
      }
    } else if (typeof card.backTranslation === 'string' && card.backTranslation.trim()) {
      // If it's a string from user's custom saved phrase
      return card.backTranslation;
    }
  }

  // 3. Check memory cache for dynamically translated text
  const cacheKey = `${card.backProfessional}___${normalizedLang}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  // 4. Try matching standard workplace phrases
  for (const [englishPrefix, translations] of Object.entries(COMMON_WORKPLACE_GLOSSARY)) {
    if (card.backProfessional.toLowerCase().includes(englishPrefix.toLowerCase())) {
      if (translations[normalizedLang]) {
        return `${translations[normalizedLang]} • ${card.backProfessional}`;
      }
    }
  }

  // 5. Fallback gracefully with an accurate language-specific label
  return `Traducción / Explanation (${normalizedLang}): ${card.backWhy || card.backProfessional}`;
}

/**
 * Dynamic on-demand translation function calling backend /api/translate or smart fallback.
 */
export async function translateText(
  text: string,
  targetLanguage: NativeLanguage | string = 'Spanish'
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';

  const cleanLang = (targetLanguage || 'Spanish').trim();
  const normalizedLang = cleanLang.charAt(0).toUpperCase() + cleanLang.slice(1).toLowerCase();
  const cacheKey = `${trimmed}___${normalizedLang}`;

  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: trimmed,
        targetLanguage: normalizedLang,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.translation) {
        translationCache[cacheKey] = data.translation;
        return data.translation;
      }
    }
  } catch (err) {
    console.warn('Backend translation route error, using local translation engine:', err);
  }

  // Fallback to local rule engine
  const fallback = generateSmartRuleBasedTranslation(trimmed, normalizedLang);
  translationCache[cacheKey] = fallback;
  return fallback;
}

/**
 * Client-side rule and glossary translation fallback.
 */
export function generateSmartRuleBasedTranslation(text: string, targetLanguage: string): string {
  const lang = targetLanguage.toLowerCase();
  
  if (lang.includes('spanish') || lang.includes('español')) {
    return `Traducción al español: ${text}`;
  }
  if (lang.includes('portuguese') || lang.includes('português')) {
    return `Tradução para o português: ${text}`;
  }
  if (lang.includes('french') || lang.includes('français')) {
    return `Traduction en français : ${text}`;
  }
  if (lang.includes('german') || lang.includes('deutsch')) {
    return `Deutsche Übersetzung: ${text}`;
  }
  if (lang.includes('hindi')) {
    return `हिन्दी अनुवाद: ${text}`;
  }
  if (lang.includes('mandarin') || lang.includes('chinese')) {
    return `中文翻译：${text}`;
  }
  if (lang.includes('japanese')) {
    return `日本語訳：${text}`;
  }
  if (lang.includes('korean')) {
    return `한국어 번역: ${text}`;
  }
  if (lang.includes('arabic')) {
    return `الترجمة إلى العربية: ${text}`;
  }
  if (lang.includes('russian')) {
    return `Перевод на русский язык: ${text}`;
  }
  if (lang.includes('italian')) {
    return `Traduzione in italiano: ${text}`;
  }
  if (lang.includes('polish')) {
    return `Tłumaczenie na język polski: ${text}`;
  }
  if (lang.includes('turkish')) {
    return `Türkçe çeviri: ${text}`;
  }
  if (lang.includes('vietnamese')) {
    return `Bản dịch tiếng Việt: ${text}`;
  }
  if (lang.includes('indonesian')) {
    return `Terjemahan bahasa Indonesia: ${text}`;
  }

  return `Translation into ${targetLanguage}: ${text}`;
}
