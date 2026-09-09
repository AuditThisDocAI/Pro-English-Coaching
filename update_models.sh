#!/bin/bash
sed -i "s/'gemini-2.5-flash',/'gemini-2.5-flash',/g" server/aiCoach.ts
sed -i "s/'gemini-3.1-flash-lite',/'gemini-2.0-flash',/g" server/aiCoach.ts
sed -i "s/'gemini-flash-latest',/'gemini-2.0-flash-lite-preview-02-05',/g" server/aiCoach.ts
sed -i "s/'gemini-3.8-flash',/'gemini-1.5-flash',/g" server/aiCoach.ts
sed -i "s/'gemini-3.6-flash',/'gemini-1.5-flash-8b',/g" server/aiCoach.ts
sed -i "s/'gemini-3.5-flash-lite',/'gemini-1.5-pro',/g" server/aiCoach.ts
