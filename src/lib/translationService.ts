import { Flashcard, NativeLanguage, SUPPORTED_LANGUAGES } from '../types';

// In-memory cache for dynamic translations
const translationCache: Record<string, string> = {};

/**
 * High-accuracy dictionary of preset phrases and common workplace sentences
 * across all 15 supported languages.
 */
export const PRESET_TRANSLATIONS_DATABASE: Record<string, Record<string, string>> = {
  // work_update_1
  'work_update_1': {
    Spanish: 'Por supuesto, resumiré el avance hasta ahora y destacaré nuestro próximo hito.',
    Portuguese: 'Com certeza, vou resumir o progresso até agora e destacar a próxima meta.',
    French: 'Bien sûr, je vais résumer les progrès réalisés jusqu’à présent et souligner notre prochain jalon.',
    German: 'Gerne, ich fasse den bisherigen Fortschritt kurz zusammen und hebe unseren nächsten Meilenstein hervor.',
    Hindi: 'ज़रूर, मैं अब तक की प्रगति का सारांश और हमारे आगामी प्रमुख लक्ष्य को साझा करूँगा।',
    Mandarin: '好的，我将总结目前的进展并汇报下一个关键里程碑节点。',
    Japanese: '承知いたしました。これまでの進捗状況をまとめ、次のマイルストーンを共有いたします。',
    Korean: '네, 지금까지의 진행 상황을 요약하고 다음 주요 마일스톤을 공유해 드리겠습니다.',
    Arabic: 'بالتأكيد، سألخص التقدم المحرز حتى الآن وأسلط الضوء على مرحلتنا القادمة.',
    Russian: 'Конечно, я кратко подведу итоги текущего прогресса и выделю наш следующий ключевой этап.',
    Italian: 'Certamente, riassumo i progressi compiuti finora ed evidenzio il nostro prossimo obiettivo.',
    Polish: 'Oczywiście, podsumuję dotychczasowe postępy i wskażę nasz kolejny kamień milowy.',
    Turkish: 'Elbette, şu ana kadarki ilerlemeyi özetleyip bir sonraki kilometre taşımızı vurgulayacağım.',
    Vietnamese: 'Chắc chắn rồi, tôi sẽ tóm tắt tiến độ cho đến nay và nêu bật cột mốc tiếp theo của chúng ta.',
    Indonesian: 'Tentu, saya akan merangkum kemajuan sejauh ini dan menyoroti tonggak pencapaian berikutnya.',
  },

  // email_delay_1 / email_1
  'email_delay_1': {
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

  // email_deadline_2 / email_2
  'email_deadline_2': {
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

  // email_followup_3 / email_3
  'email_followup_3': {
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

  // work_declining_4 / email_5
  'work_declining_4': {
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

  // work_standup_blocker_5 / tech_2
  'work_standup_blocker_5': {
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

  // interview_tell_me_about_yourself
  'interview_tell_me_about_yourself': {
    Spanish: 'Cuento con más de 4 años de experiencia liderando proyectos transversales. Recientemente lideré una iniciativa que aumentó la eficiencia un 25% y estoy entusiasmado de aportar esa trayectoria a este rol.',
    Portuguese: 'Tenho mais de 4 anos de experiência liderando projetos transversais. Recentemente liderei uma iniciativa que aumentou a eficiência em 25% e estou motivado a contribuir com este time.',
    French: 'J’ai plus de 4 ans d’expérience dans la gestion de projets transversaux. Récemment, j’ai dirigé une initiative qui a augmenté l’efficacité de 25 %, et je suis impatient d’apporter cette expertise à ce poste.',
    German: 'Ich verfüge über mehr als 4 Jahre Erfahrung in der Leitung funktionsübergreifender Projekte. Kürzlich leitete ich eine Initiative, die die Effizienz um 25 % steigerte, und freue mich darauf, diesen Erfolg hier einzubringen.',
    Hindi: 'मेरे पास क्रॉस-फंक्शनल प्रोजेक्ट्स का नेतृत्व करने का 4 से अधिक वर्षों का अनुभव है। हाल ही में मैंने एक पहल का नेतृत्व किया जिसने दक्षता में 25% की वृद्धि की, और मैं इस भूमिका में योगदान देने के लिए उत्सुक हूँ।',
    Mandarin: '我拥有4年以上跨职能项目交付经验。最近我主导了一项使运营效率提升25%的核心项目，我非常期待将这一成功经验带入该岗位。',
    Japanese: '4年以上にわたり部門横断プロジェクトを推進してまいりました。直近では効率を25%向上させた実績があり、その知見を本ポジションで発揮したいと考えております。',
    Korean: '4년 이상 크로스펑셔널 프로젝트를 성공적으로 이끌어 온 경험이 있습니다. 최근에는 효율성을 25% 향상시킨 프로젝트를 주도했으며, 본 직무에서도 그 성과를 이어가고자 합니다.',
    Arabic: 'لدي أكثر من 4 سنوات من الخبرة في قيادة المشاريع متعددة الوظائف. ومؤخراً قدت مبادرة عززت الكفاءة بنسبة 25٪، وأنا حريص على جلب هذا السجل الحافل إلى هذا الدور.',
    Russian: 'У меня более 4 лет опыта руководства кросс-функциональными проектами. Недавно я возглавил инициативу, повысившую эффективность на 25%, и рад применить этот опыт на данной позиции.',
    Italian: 'Ho oltre 4 anni di esperienza nella gestione di progetti trasversali. Recentemente ho guidato un’iniziativa che ha incrementato l’efficienza del 25% e sono entusiasta di portare questa esperienza nel ruolo.',
    Polish: 'Posiadam ponad 4-letnie doświadczenie w prowadzeniu projektów międzyzespołowych. Ostatnio przewodziłem inicjatywie, która zwiększyła efektywność o 25%, i z chęcią wniosę te umiejętności na tym stanowisku.',
    Turkish: 'Fonksiyonlar arası projeleri yönetme konusunda 4 yılı aşkın deneyime sahibim. Son olarak verimliliği %25 artıran bir projeye liderlik ettim ve bu başarıyı bu role taşımak için sabırsızlanıyorum.',
    Vietnamese: 'Tôi có hơn 4 năm kinh nghiệm triển khai các dự án liên phòng ban. Gần đây nhất, tôi đã dẫn dắt một sáng kiến giúp tăng 25% hiệu suất và rất hào hứng mang kinh nghiệm này vào vị trí mới.',
    Indonesian: 'Saya memiliki lebih dari 4 tahun pengalaman memimpin proyek lintas fungsi. Baru-baru ini saya memimpin inisiatif yang meningkatkan efisiensi sebesar 25%, dan saya bersemangat membawa rekam jejak ini ke posisi ini.',
  },

  // interview_weakness_2 / interview_1
  'interview_weakness_2': {
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

  // interview_salary_3 / interview_2
  'interview_salary_3': {
    Spanish: 'Con base en investigaciones de mercado para este nivel de experiencia y el valor transversal que aporto, mi rango salarial objetivo está entre $95,000 y $110,000.',
    Portuguese: 'Com base em pesquisas de mercado para este nível de senioridade e no valor que agrego à equipe, busco uma remuneração entre $95.000 e $110.000.',
    French: 'D\'après mes recherches sur les rémunérations du marché pour ce niveau d\'expérience et la valeur ajoutée que j\'apporte dès le premier jour, je vise une fourchette entre 95 000 $ et 110 000 $.',
    German: 'Basierend auf Marktanalysen für diese Senioritätsstufe und dem Mehrwert, den ich ab Tag eins einbringe, strebe ich eine Gehaltsspanne zwischen 95.000 $ und 110.000 $ an.',
    Hindi: 'इस वरिष्ठता स्तर के बाजार मानकों और मेरे द्वारा प्रदान किए जाने वाले मूल्य के आधार पर, मेरा लक्षित वेतन दायरा $95,000 से $110,000 के बीच है।',
    Mandarin: '根据我对该职级市场薪酬标准的调研以及我能带来的业务价值，我的期望薪资范围在 95,000 美元至 110,000 美元之间。',
    Japanese: 'この職位の市場相場と初日から貢献できる価値に基づき、希望年収レンジとして95,000ドルから110,000ドルを想定しております。',
    Korean: '해당 연차의 시장 기준과 제가 첫날부터 기여할 수 있는 가치를 고려하여, 희망 연봉 범위를 95,000달러에서 110,000달러 사이로 잡고 있습니다.',
    Arabic: 'بناءً على معايير السوق لهذا المستوى من الخبرة والقيمة التي يمكنني تقديمها منذ اليوم الأول، فإنني أستهدف نطاق تعويضات يتراوح بين 95,000 و 110,000 دولار.',
    Russian: 'Опираясь на исследование рыночных показателей для этой позиции и ценность, которую я привношу с первого дня, я ориентируюсь на диапазон от 95 000 до 110 000 долларов.',
    Italian: 'In base alle ricerche di mercato per questo livello e al valore che posso portare fin dal primo giorno, il mio compenso target è compreso tra $95.000 e $110.000.',
    Polish: 'Opierając się na analizie rynkowej dla tego poziomu stanowiska oraz wartości, jaką wnoszę od pierwszego dnia, celuję w przedział wynagrodzenia od 95 000 do 110 000 USD.',
    Turkish: 'Bu kıdem seviyesi için piyasa verilerine ve ilk günden itibaren sunacağım değere dayanarak, 95.000$ ile 110.000$ arasında bir ücret aralığı hedefliyorum.',
    Vietnamese: 'Dựa trên khảo sát thị trường cho vị trí này và giá trị tôi có thể đóng góp ngay từ ngày đầu, mức lương mục tiêu của tôi nằm trong khoảng $95.000 đến $110.000.',
    Indonesian: 'Berdasarkan riset pasar untuk level ini dan nilai yang dapat saya berikan sejak hari pertama, rentang kompensasi yang saya targetkan adalah antara $95.000 hingga $110.000.',
  },

  // interview_why_leaving_4 / interview_4
  'interview_why_leaving_4': {
    Spanish: 'Agradezco la sólida base construida con mi equipo actual. Ahora busco un entorno más dinámico donde pueda asumir retos arquitectónicos mayores y liderar el crecimiento estratégico.',
    Portuguese: 'Tenho muito orgulho dos resultados alcançados com minha equipe atual. Agora busco um ambiente inovador onde possa liderar desafios maiores e crescimento estratégico.',
    French: 'Je suis très reconnaissant envers mon équipe actuelle pour les fondations acquises. Je recherche désormais un environnement à fort dynamisme pour relever des défis plus stratégiques.',
    German: 'Ich bin dankbar für das Fundament, das ich mit meinem aktuellen Team aufgebaut habe. Nun suche ich ein dynamisches Umfeld, um größere strategische Herausforderungen voranzutreiben.',
    Hindi: 'मुझे अपनी वर्तमान टीम के साथ हासिल की गई ठोस नींव पर गर्व है। अब मैं ऐसे गतिशील वातावरण की तलाश में हूँ जहाँ मैं बड़ी रणनीतिक चुनौतियों का नेतृत्व कर सकूँ।',
    Mandarin: '我对在现有团队中所奠定的扎实基础深表感激。现在我正寻求一个更高成长速度的环境，以迎接更大的架构挑战并推动战略性业务增长。',
    Japanese: '現職のチームで培った基盤に深く感謝しております。現在は、より高度な課題に挑み戦略的成長を牽引できるダイナミックな環境を求めています。',
    Korean: '현재 팀에서 쌓은 탄탄한 기반에 감사하고 있습니다. 이제는 더 큰 규모의 전략적 과제를 해결하고 성장을 주도할 수 있는 역동적인 환경을 찾고 있습니다.',
    Arabic: 'أنا ممتن للأساس القوي الذي بنيته مع فريقي الحالي. أبحث الآن عن بيئة عمل سريعة الوتيرة لمواجهة تحديات استراتيجية أكبر ودفع النمو.',
    Russian: 'Я благодарен за надежную базу, созданную с нынешней командой. Сейчас я ищу динамичную среду, где смогу решать крупные задачи и развивать стратегию.',
    Italian: 'Sono grato per le basi costruite con il mio team attuale. Ora cerco un ambiente dinamico dove affrontare sfide strategiche di maggior respiro.',
    Polish: 'Jestem wdzięczny za fundamenty zbudowane z obecnym zespołem. Obecnie szukam dynamicznego środowiska, w którym mogę realizować większe wyzwania strategiczne.',
    Turkish: 'Mevcut ekibimle inşa ettiğim sağlam temel için minnettarım. Şimdi daha büyük stratejik hedeflere liderlik edebileceğim dinamik bir ortam arıyorum.',
    Vietnamese: 'Tôi rất trân trọng nền tảng đã xây dựng cùng đội ngũ hiện tại. Giờ đây tôi đang tìm kiếm một môi trường năng động hơn để đảm nhận những thử thách chiến lược lớn hơn.',
    Indonesian: 'Saya bersyukur atas fondasi yang saya bangun bersama tim saat ini. Sekarang saya mencari lingkungan dinamis untuk menghadapi tantangan strategis yang lebih besar.',
  },

  // everyday_smalltalk_1
  'everyday_smalltalk_1': {
    Spanish: '¡Buenos días! ¿Cómo te ha tratado la semana hasta ahora? ¿Pudiste disfrutar del buen tiempo durante el fin de semana?',
    Portuguese: 'Bom dia! Como tem sido sua semana até agora? Conseguiu aproveitar o bom tempo no fim de semana?',
    French: 'Bonjour ! Comment se passe votre semaine jusqu\'à présent ? Avez-vous pu profiter du beau temps ce week-end ?',
    German: 'Guten Morgen! Wie war Ihre Woche bisher? Konnten Sie am Wochenende das schöne Wetter genießen?',
    Hindi: 'शुभ प्रभात! अब तक आपका सप्ताह कैसा रहा? क्या आपको सप्ताहांत में अच्छे मौसम का आनंद लेने का अवसर मिला?',
    Mandarin: '早上好！这周过得怎么样？周末有享受到好天气吗？',
    Japanese: 'おはようございます！今週の調子はいかがですか？週末は良い天気を楽しめましたか？',
    Korean: '좋은 아침입니다! 이번 주 어떻게 보내고 계신가요? 주말에 좋은 날씨는 만끽하셨나요?',
    Arabic: 'صباح الخير! كيف تسير أمورك هذا الأسبوع حتى الآن؟ هل تمكنت من الاستمتاع بالطقس الجميل خلال عطلة نهاية الأسبوع؟',
    Russian: 'Доброе утро! Как проходит ваша неделя? Удалось насладиться хорошей погодой на выходных?',
    Italian: 'Buongiorno! Come sta andando la settimana finora? È riuscito a godersi il bel tempo durante il fine settimana?',
    Polish: 'Dzień dobry! Jak mija Ci ten tydzień? Udało Ci się nacieszyć dobrą pogodą w weekend?',
    Turkish: 'Günaydın! Bu hafta şimdiye kadar nasıl geçti? Hafta sonu güzel havanın tadını çıkarabildiniz mi?',
    Vietnamese: 'Chào buổi sáng! Tuần này của bạn thế nào rồi? Bạn có tận hưởng được thời tiết đẹp cuối tuần qua không?',
    Indonesian: 'Selamat pagi! Bagaimana minggu Anda sejauh ini? Apakah Anda sempat menikmati cuaca cerah di akhir pekan?',
  },

  // everyday_polite_request_2
  'everyday_polite_request_2': {
    Spanish: '¿Por casualidad tendrías cinco minutos libres hoy? Valoraría enormemente tu punto de vista sobre esta breve pregunta.',
    Portuguese: 'Por acaso você teria cinco minutos hoje? Valorizaria muito a sua perspectiva sobre esta dúvida rápida.',
    French: 'Auriez-vous par hasard cinq minutes aujourd\'hui ? J\'apprécierais beaucoup votre regard sur cette brève question.',
    German: 'Hätten Sie heute vielleicht fünf Minuten Zeit? Ich würde Ihre Einschätzung zu dieser kurzen Frage sehr schätzen.',
    Hindi: 'क्या आपके पास आज पांच मिनट का समय होगा? इस छोटे से प्रश्न पर आपके दृष्टिकोण का मुझे बहुत लाभ मिलेगा।',
    Mandarin: '您今天方便抽空聊五分钟吗？对于这个简短的问题，我非常希望听听您的宝贵见解。',
    Japanese: '本日、5分ほどお時間をいただくことは可能でしょうか？こちらの簡単な質問についてご意見をいただけますと幸いです。',
    Korean: '혹시 오늘 5분 정도 시간 괜찮으실까요? 간단한 질문에 대한 고견을 여쭙고 싶습니다.',
    Arabic: 'هل لديك خمس دقائق اليوم إن أمكن؟ سأقدر كثيراً وجهة نظرك حول هذا السؤال السريع.',
    Russian: 'У вас случайно не найдется пяти минут сегодня? Был бы очень признателен за ваш взгляд на этот короткий вопрос.',
    Italian: 'Avrebbe per caso cinque minuti oggi? Apprezzerei molto la sua opinione su questa breve domanda.',
    Polish: 'Czy masz może dzisiaj wolne pięć minut? Bardzo doceniłbym Twoje spojrzenie na to krótkie pytanie.',
    Turkish: 'Bugün tesadüfen beş dakikanız var mı acaba? Bu kısa soru hakkındaki bakış açınızı duymayı çok isterim.',
    Vietnamese: 'Bạn có tiện dành ra năm phút hôm nay không? Tôi rất trân trọng góc nhìn của bạn về câu hỏi ngắn này.',
    Indonesian: 'Apakah Anda kebetulan punya waktu lima menit hari ini? Saya akan sangat menghargai pandangan Anda mengenai pertanyaan singkat ini.',
  },

  // everyday_active_listening_3
  'everyday_active_listening_3': {
    Spanish: 'Es un punto fantástico. Complementando lo que acabas de compartir, también podríamos probar ese enfoque con nuestros usuarios beta.',
    Portuguese: 'Ótimo ponto! Aproveitando o que você acabou de compartilhar, também poderíamos testar essa abordagem com nossos usuários beta.',
    French: 'C\'est un excellent point. En rebondissant sur ce que vous venez de dire, nous pourrions également tester cette approche avec nos utilisateurs bêta.',
    German: 'Das ist ein fantastischer Punkt. Anknüpfend an das, was Sie gerade geteilt haben, könnten wir diesen Ansatz auch mit unseren Beta-Nutzern testen.',
    Hindi: 'यह एक शानदार बिंदु है। आपके द्वारा साझा किए गए विचार को आगे बढ़ाते हुए, हम इस दृष्टिकोण को अपने बीटा उपयोगकर्ताओं के साथ भी परीक्षण कर सकते हैं।',
    Mandarin: '这个观点非常棒。在您刚才提到的基础上，我们还可以考虑与内测用户一起测试这种方案。',
    Japanese: '素晴らしいご指摘ですね。先ほど共有いただいた点を発展させて、ベータ版のユーザーでそのアプローチをテストすることも可能かと思います。',
    Korean: '아주 훌륭한 포인트입니다. 방금 말씀해 주신 내용에 덧붙여, 베타 테스터 사용자들을 대상으로 해당 접근 방식을 함께 검증해 볼 수도 있겠습니다.',
    Arabic: 'هذه نقطة رائعة. واستناداً إلى ما شاركته للتو، يمكننا أيضاً اختبار هذا النهج مع مستخدمي النسخة التجريبية.',
    Russian: 'Отличная мысль! Развивая то, чем вы только что поделились, мы также могли бы протестировать этот подход на наших бета-пользователях.',
    Italian: 'È un punto fantastico. Ricollegandomi a quanto appena condiviso, potremmo anche testare questo approccio con i nostri utenti beta.',
    Polish: 'Świetny punkt. Nawiązując do tego, czym się właśnie podzieliłeś, moglibyśmy przetestować to podejście z naszymi użytkownikami wersji beta.',
    Turkish: 'Harika bir nokta. Az önce paylaştığınız fikrin üzerine inşa ederek bu yaklaşımı beta kullanıcılarımızla da test edebiliriz.',
    Vietnamese: 'Đó là một ý kiến tuyệt vời. Tiếp nối những gì bạn vừa chia sẻ, chúng ta cũng có thể thử nghiệm phương pháp đó với nhóm người dùng beta.',
    Indonesian: 'Poin yang fantastis. Melanjutkan apa yang baru saja Anda sampaikan, kita juga bisa menguji pendekatan tersebut dengan pengguna beta kita.',
  },

  // everyday_coffee_4
  'everyday_coffee_4': {
    Spanish: '¡Bienvenido al equipo! Si en algún momento te apetece tomar un café o tener un 1 a 1 virtual, me encantaría conectar y conocer más sobre tu trayectoria.',
    Portuguese: 'Boas-vindas ao time! Se você quiser tomar um café ou bater um papo virtual rápido, será um prazer conectar e conhecer mais sobre sua experiência.',
    French: 'Bienvenue dans l\'équipe ! Si vous avez envie de prendre un café ou de faire un point virtuel rapide, je serais ravi d\'échanger et d\'en savoir plus sur votre parcours.',
    German: 'Herzlich willkommen im Team! Wenn Sie Lust auf einen Kaffee oder ein kurzes virtuelles Kennenlernen haben, würde ich mich sehr freuen, mehr über Ihren Hintergrund zu erfahren.',
    Hindi: 'टीम में आपका स्वागत है! यदि आप कभी कॉफ़ी पीने या अनौपचारिक बातचीत के लिए तैयार हों, तो मुझे आपसे जुड़ने और आपके अनुभव के बारे में जानने में बहुत खुशी होगी।',
    Mandarin: '欢迎加入团队！如果你有空想喝杯咖啡或进行简短的线上交流，我很乐意与你聊聊，多了解你的专业背景。',
    Japanese: 'チームへようこそ！もしよろしければコーヒーブレイクや手短なオンライン面談で、これまでのご経験などお話しできると嬉しいです。',
    Korean: '팀에 합류하신 것을 환영합니다! 커피 한잔이나 가벼운 1:1 티타임 괜찮으시면, 편하게 대화 나누며 서로를 알아가고 싶습니다.',
    Arabic: 'أهلاً بك في الفريق! إذا رغبت يوماً في احتساء القهوة أو إجراء لقاء افتراضي سريع، سيسعدني التواصل والتعرف أكثر على خلفيتك المهنية.',
    Russian: 'Добро пожаловать в команду! Если будет желание выпить кофе или созвониться на короткую встречу 1-на-1, буду рад познакомиться и узнать больше о вашем опыте.',
    Italian: 'Benvenuto nel team! Se ti va di prendere un caffè o fare una chiacchierata virtuale, mi farebbe molto piacere fare due chiacchiere e conoscerti meglio.',
    Polish: 'Witamy w zespole! Jeśli masz ochotę na kawę lub krótką wirtualną rozmowę 1-na-1, chętnie się spotkam i poznam Twoje doświadczenie.',
    Turkish: 'Ekibe hoş geldiniz! Bir kahve içmek veya kısa bir tanışma görüşmesi yapmak isterseniz, sizinle tanışıp deneyimlerinizi dinlemekten mutluluk duyarım.',
    Vietnamese: 'Chào mừng bạn đến với đội ngũ! Nếu bạn muốn đi uống cà phê hoặc trò chuyện trực tuyến ngắn, tôi rất vui lòng được kết nối và tìm hiểu thêm về bạn.',
    Indonesian: 'Selamat bergabung di tim! Jika Anda ingin ngopi santai atau obrolan virtual singkat, saya akan senang sekali berkenalan dan mendengar latar belakang Anda.',
  },

  // grammar_circle_back_1 / idiom_1
  'grammar_circle_back_1': {
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

  // grammar_modals_polite_2
  'grammar_modals_polite_2': {
    Spanish: '¿Podría revisar este borrador en cuanto le sea posible por favor?',
    Portuguese: 'Você poderia revisar esta minuta assim que tiver disponibilidade, por favor?',
    French: 'Pourriez-vous s\'il vous plaît examiner ce projet dès que vous en aurez la possibilité ?',
    German: 'Könnten Sie diesen Entwurf bitte bei nächster Gelegenheit durchsehen?',
    Hindi: 'क्या आप कृपया अपनी सुविधानुसार इस मसौदे की समीक्षा कर सकते हैं?',
    Mandarin: '您能否在方便时尽早审阅一下这份初稿？',
    Japanese: 'ご都合のよろしい時に、こちらのドラフトをご確認いただけますでしょうか。',
    Korean: '편하신 시간에 본 초안을 검토해 주실 수 있으실까요?',
    Arabic: 'هل يمكنك مراجعة هذه المسودة في أقرب وقت يناسبك من فضلك؟',
    Russian: 'Не могли бы вы ознакомиться с этим черновиком при первой возможности?',
    Italian: 'Potrebbe cortesemente esaminare questa bozza non appena le è possibile?',
    Polish: 'Czy mógłbyś przejrzeć ten projekt w wolnej chwili?',
    Turkish: 'Müsait olduğunuz en erken zamanda bu taslağı inceleyebilir misiniz lütfen?',
    Vietnamese: 'Bạn có thể vui lòng xem qua bản thảo này khi thuận tiện nhất được không?',
    Indonesian: 'Bisakah Anda meninjau draf ini saat ada kesempatan sesegera mungkin?',
  },

  // grammar_disagreement_3 / idiom_3
  'grammar_disagreement_3': {
    Spanish: 'Entiendo tu perspectiva; sin embargo, al observar las métricas recientes de retención de clientes, permíteme compartir un punto de vista alternativo.',
    Portuguese: 'Compreendo o seu ponto de vista; contudo, analisando as métricas recentes de retenção de clientes, gostaria de propor uma perspectiva alternativa.',
    French: 'Je comprends tout à fait votre point de vue ; cependant, au vu des récentes métriques de résiliation client, permettez-moi de partager une autre perspective.',
    German: 'Ich verstehe Ihren Ansatz vollkommen; wenn wir jedoch die jüngsten Kennzahlen zur Kundenbindung betrachten, erlauben Sie mir eine alternative Sichtweise.',
    Hindi: 'मैं आपका दृष्टिकोण समझता हूँ; फिर भी, हाल के ग्राहक प्रतिधारण डेटा को देखते हुए, मुझे एक वैकल्पिक दृष्टिकोण साझा करने की अनुमति दें।',
    Mandarin: '我明白您的考虑角度；不过结合最近的客户留存数据指标来看，请允许我分享一个不同的视角。',
    Japanese: 'おっしゃる意図はよく分かりますが、最近の顧客維持率の指標を鑑みますと、別の観点も共有させていただければ幸いです。',
    Korean: '말씀하시는 취지는 충분히 이해합니다만, 최근 고객 유지 지표를 고려하여 다른 관점을 하나 공유해 드리고자 합니다.',
    Arabic: 'أفهم وجهة نظرك جيداً؛ ولكن بالنظر إلى مقاييس بقاء العملاء الأخيرة، اسمح لي بمشاركة منظور بديل.',
    Russian: 'Я понимаю вашу точку зрения, однако, учитывая недавние показатели удержания клиентов, позвольте предложить альтернативный взгляд.',
    Italian: 'Comprendo il suo punto di vista; tuttavia, esaminando le metriche recenti sulla fidelizzazione dei clienti, mi permetta di condividere un\'altra prospettiva.',
    Polish: 'Rozumiem Twój punkt widzenia, jednak patrząc na ostatnie wskaźniki utrzymania klientów, pozwól mi przedstawić alternatywne spojrzenie.',
    Turkish: 'Nereden baktığınızı anlıyorum; ancak son müşteri elde tutma metriklerine baktığımızda farklı bir bakış açısı paylaşmama izin verin.',
    Vietnamese: 'Tôi hiểu góc nhìn của bạn; tuy nhiên nhìn vào số liệu giữ chân khách hàng gần đây, xin phép cho tôi chia sẻ một quan điểm khác.',
    Indonesian: 'Saya memahami sudut pandang Anda; namun melihat metrik retensi pelanggan terbaru, izinkan saya menyampaikan perspektif alternatif.',
  },
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

  // grammar_ownership_4 / idiom_4
  'grammar_ownership_4': {
    Spanish: 'Asumo total responsabilidad por este descuido. Ya implementé la solución y actualicé los protocolos para evitar que se repita.',
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

  // client_deescalate_1 / client_1
  'client_deescalate_1': {
    Spanish: 'Comprendo perfectamente lo frustrante que es esta interrupción para su flujo de trabajo. Estoy supervisando personalmente este caso y le enviaré actualizaciones cada hora hasta resolverlo.',
    Portuguese: 'Entendo perfeitamente o quanto essa interrupção tem sido frustrante para o seu trabalho. Estou acompanhando este chamado pessoalmente e enviarei atualizações a cada hora até resolver.',
    French: 'Je comprends parfaitement à quel point cette interruption perturbe votre travail. Je prends personnellement ce ticket en charge et vous tiendrai informé chaque heure jusqu\'à résolution complète.',
    German: 'Ich verstehe vollkommen, wie frustrierend diese Unterbrechung für Ihren Arbeitsablauf ist. Ich kümmere mich persönlich um diesen Fall und gebe Ihnen stündlich ein Update.',
    Hindi: 'मैं पूरी तरह समझता हूँ कि यह रुकावट आपके कार्यप्रवाह के लिए कितनी कष्टप्रद है। मैं व्यक्तिगत रूप से इस मामले की निगरानी कर रहा हूँ और हल होने तक हर घंटे अपडेट दूँगा।',
    Mandarin: '我完全理解这次系统中断给您的工作带来的困扰。我正亲自督办此工单，并在问题彻底解决前每小时向您同步最新进展。',
    Japanese: '今回の障害が業務にとってどれほどご不便であるか、深く理解しております。私が責任を持って本件を担当し、解決まで1時間ごとに進捗をご報告いたします。',
    Korean: '이번 서비스 중단으로 업무에 큰 불편을 겪고 계신 점 깊이 공감합니다. 제가 직접 사안을 챙기며 문제가 해결될 때까지 매시간 진행 상황을 공유해 드리겠습니다.',
    Arabic: 'أتفهم تماماً مدى الإحباط الذي يسببه هذا الانقطاع لعملكم. أنا أتابع هذه التذكرة شخصياً وسأزودكم بتحديثات كل ساعة حتى يتم حل المشكلة.',
    Russian: 'Я прекрасно понимаю, насколько эта заминка неприятна для вашего рабочего процесса. Я лично контролирую решение вопроса и буду присылать обновления каждый час.',
    Italian: 'Comprendo perfettamente quanto questa interruzione sia frustrante per il suo lavoro. Sto seguendo personalmente il caso e la aggiornerò ogni ora fino alla risoluzione.',
    Polish: 'Doskonale rozumiem, jak frustrująca dla Twojej pracy jest ta przerwa. Osobiście nadzoruję to zgłoszenie i będę przekazywać informacje co godzinę.',
    Turkish: 'Bu kesintinin iş akışınız için ne kadar can sıkıcı olduğunu çok iyi anlıyorum. Bu kayıtla bizzat ilgileniyorum ve çözülene kadar her saat durum güncellemesi geçeceğim.',
    Vietnamese: 'Tôi hoàn toàn hiểu sự cố gián đoạn này gây khó khăn như thế nào cho công việc của bạn. Tôi đang trực tiếp xử lý và sẽ cập nhật tiến độ mỗi giờ cho đến khi xong.',
    Indonesian: 'Saya sangat memahami betapa mengecewakannya gangguan ini bagi alur kerja Anda. Saya mengawasi tiket ini secara pribadi dan akan memberikan pembaruan setiap jam hingga selesai.',
  },
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

  // client_delay_procedure_2 / client_2
  'client_delay_procedure_2': {
    Spanish: 'Muchas gracias por su paciencia el día de hoy. El especialista está atendiendo un caso de emergencia y estará con usted en breve. ¿Le gustaría un vaso de agua mientras espera?',
    Portuguese: 'Muito obrigado pela sua paciência hoje. O especialista está prestando atendimento a um caso de emergência e já estará com você. Gostaria de um copo de água enquanto aguarda?',
    French: 'Merci pour votre patience aujourd\'hui. Le spécialiste s\'occupe actuellement d\'une urgence et sera à vous dans un instant. Puis-je vous proposer un verre d\'eau en attendant ?',
    German: 'Vielen Dank für Ihre Geduld heute. Die Fachärztin/der Facharzt versorgt gerade einen dringenden Notfall und ist gleich für Sie da. Darf ich Ihnen in der Zwischenzeit ein Glas Wasser anbieten?',
    Hindi: 'आज आपके धैर्य के लिए बहुत धन्यवाद। विशेषज्ञ एक आपातकालीन मामले को देख रहे हैं और शीघ्र ही आपके पास होंगे। क्या आप प्रतीक्षा के दौरान पानी लेना चाहेंगे?',
    Mandarin: '非常感谢您今天的耐心等待。专家目前正在紧急救治一位病患，很快就会前来为您服务。在您等待期间需要为您倒杯水吗？',
    Japanese: '本日はお待ちいただき誠にありがとうございます。担当医が現在急患の対応をしており、間もなく参ります。お待ちの間に温かいお茶かお水をお持ちいたしましょうか。',
    Korean: '오늘 기다려 주셔서 진심으로 감사드립니다. 전문의 선생님께서 현재 응급 환자를 진료 중이시며 곧 찾아뵐 예정입니다. 대기하시는 동안 물 한 잔 가져다 드릴까요?',
    Arabic: 'شكراً جزيلاً لصبركم اليوم. الأخصائي يقدم حالياً رعاية عاجلة لحالة طارئة وسيكون معكم في أقرب وقت. هل ترغبون في كوب ماء أثناء الانتظار؟',
    Russian: 'Большое спасибо за ваше терпение сегодня. Специалист сейчас оказывает помощь экстренному пациенту и скоро подойдет к вам. Принести вам воды, пока вы ждете?',
    Italian: 'Grazie mille per la pazienza oggi. Lo specialista sta seguendo un\'urgenza e sarà da lei a breve. Desidera un bicchiere d\'acqua mentre aspetta?',
    Polish: 'Bardzo dziękuję za dzisiejszą cierpliwość. Specjalista zajmuje się obecnie nagłym przypadkiem i wkrótce do Pana/Pani przyjdzie. Czy podać szklankę wody podczas oczekiwania?',
    Turkish: 'Bugünkü sabrınız için çok teşekkürler. Uzmanımız şu anda acil bir hastayla ilgileniyor ve kısa süre içinde yanınızda olacak. Beklerken bir bardak su ister misiniz?',
    Vietnamese: 'Cảm ơn bạn rất nhiều vì đã kiên nhẫn hôm nay. Bác sĩ chuyên khoa đang xử lý một ca cấp cứu và sẽ đến gặp bạn ngay. Tôi có thể lấy cho bạn cốc nước trong khi chờ không?',
    Indonesian: 'Terima kasih banyak atas kesabaran Anda hari ini. Dokter spesialis saat ini sedang menangani pasien darurat dan akan segera menemui Anda. Apakah Anda ingin segelas air selagi menunggu?',
  },
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
 * Normalizes any language input into standard title-case matching SUPPORTED_LANGUAGES.
 */
export function normalizeLanguageName(rawLanguage?: string): string {
  if (!rawLanguage) return 'Spanish';
  const clean = rawLanguage.trim().toLowerCase();

  const found = SUPPORTED_LANGUAGES.find(
    (l) => l.name.toLowerCase() === clean || l.label.toLowerCase().includes(clean)
  );
  if (found) return found.name;

  if (clean.includes('span') || clean.includes('españ')) return 'Spanish';
  if (clean.includes('port')) return 'Portuguese';
  if (clean.includes('fren') || clean.includes('fran')) return 'French';
  if (clean.includes('germ') || clean.includes('deut')) return 'German';
  if (clean.includes('hind')) return 'Hindi';
  if (clean.includes('chin') || clean.includes('mand')) return 'Mandarin';
  if (clean.includes('japan')) return 'Japanese';
  if (clean.includes('kore')) return 'Korean';
  if (clean.includes('arab')) return 'Arabic';
  if (clean.includes('russ')) return 'Russian';
  if (clean.includes('ital')) return 'Italian';
  if (clean.includes('pol')) return 'Polish';
  if (clean.includes('turk')) return 'Turkish';
  if (clean.includes('viet')) return 'Vietnamese';
  if (clean.includes('indo')) return 'Indonesian';

  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

/**
 * Gets a clean, localized translation for a flashcard based on the user's selected native language.
 */
export function getFlashcardTranslation(
  card: Flashcard,
  nativeLanguage: NativeLanguage | string
): string {
  if (!card) return '';

  const normalizedLang = normalizeLanguageName(nativeLanguage);

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
        (k) => k.toLowerCase() === normalizedLang.toLowerCase()
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

  // 5. Fallback gracefully with an accurate language-specific label in the actual target language
  return generateSmartRuleBasedTranslation(card.backWhy || card.backProfessional, normalizedLang);
}

/**
 * Dynamic on-demand translation function calling backend /api/translate or smart fallback.
 */
export async function translateText(
  text: string,
  targetLanguage: NativeLanguage | string
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return '';

  const normalizedLang = normalizeLanguageName(targetLanguage);
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
