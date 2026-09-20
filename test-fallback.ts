import { getChatTutorResponse } from './server/aiCoach.ts';

async function run() {
  const res = await getChatTutorResponse({
    messages: [],
    userInput: 'hello',
    nativeLanguage: 'Spanish'
  });
  console.log(res);
}
run();
