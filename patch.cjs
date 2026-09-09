const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  /<FlashcardsModal\s+isOpen={isFlashcardsModalOpen}\s+onClose={\(\) => setIsFlashcardsModalOpen\(false\)}\s+nativeLanguage={nativeLanguage}\s+initialDeckId={flashcardDeckId}\s+isExpired={trialInfo.isTrialExpired && !isPro}\s+onOpenPricing={\(\) => navigate\('\/pricing'\)}\s+\/>/g,
  `<FlashcardsModal
        isOpen={isFlashcardsModalOpen}
        onClose={() => setIsFlashcardsModalOpen(false)}
        savedPhrases={savedPhrases}
        nativeLanguage={nativeLanguage}
        initialDeckId={flashcardDeckId}
        isExpired={trialInfo.isTrialExpired && !isPro}
        onOpenPricing={() => navigate('/pricing')}
      />`
);
fs.writeFileSync('src/App.tsx', code);
