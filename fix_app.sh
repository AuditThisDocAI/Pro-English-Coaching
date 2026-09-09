#!/bin/bash
sed -i 's/nativeLanguage={nativeLanguage}/nativeLanguage={nativeLanguage}\n        savedPhrases={savedPhrases}/g' src/App.tsx
# But wait, it replaced all occurrences! Let's just fix the specific one.
