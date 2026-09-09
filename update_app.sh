#!/bin/bash
sed -i 's/<FlashcardsPracticeHub/<BasicGrammarQuiz/g' src/App.tsx
sed -i 's/savedPhrases={savedPhrases}//g' src/App.tsx
sed -i 's/onOpenSavedModal={() => setIsSavedModalOpen(true)}//g' src/App.tsx
sed -i 's/selectedDeckId={flashcardDeckId}//g' src/App.tsx
sed -i 's/onSelectDeckId={(id) => setFlashcardDeckId(id)}//g' src/App.tsx
sed -i 's/onSavePhrase={handleSavePhrase}//g' src/App.tsx
sed -i 's/onSendToChat={handleOpenSendToChat}//g' src/App.tsx
