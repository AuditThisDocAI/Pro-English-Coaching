const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `          } else {
            const initialCount = loadUserChatCount(user);
            const initialPro = loadUserIsPro(user);
            const initialTrialStart = getUserTrialStartDate(user);`;

const replacement = `          } else {
            // New user registered: Grant a fresh 3-day trial and reset local counts
            const now = new Date().toISOString();
            const initialCount = 0;
            const initialPro = false;
            const initialTrialStart = now;

            // Overwrite any guest fallbacks on this device
            localStorage.setItem(getUserStorageKey(user, 'trial_start_date'), now);
            localStorage.setItem('proenglish_device_trial_start', now);
            localStorage.setItem('proenglish_guest_trial_start_date', now);
            localStorage.setItem(getUserStorageKey(user, 'chat_count'), '0');
            localStorage.setItem('proenglish_guest_chat_count', '0');
`;

code = code.replace(target, replacement);
fs.writeFileSync('src/App.tsx', code);
