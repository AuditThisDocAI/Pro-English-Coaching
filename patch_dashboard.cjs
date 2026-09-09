const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const target = `        {/* 8. Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <TalkPalDashboard
            profile={userProfileObj}
            trialInfo={trialInfo}
            onNavigate={(tab) => setActiveTab(tab as any)}
            onOpenPricing={() => navigate('/pricing')}
          />
        )}`;

const replacement = `        {/* 8. Dashboard Overview */}
        {activeTab === 'dashboard' && (
          trialInfo.canAccess ? (
            <TalkPalDashboard
              profile={userProfileObj}
              trialInfo={trialInfo}
              onNavigate={(tab) => setActiveTab(tab as any)}
              onOpenPricing={() => navigate('/pricing')}
            />
          ) : (
            <PaywallOverlay
              featureName="Dashboard & Progress Tracking"
              onUpgrade={() => navigate('/pricing')}
              onOpenSignIn={() => setIsAuthModalOpen(true)}
            />
          )
        )}`;

code = code.replace(target, replacement);
fs.writeFileSync('src/App.tsx', code);
