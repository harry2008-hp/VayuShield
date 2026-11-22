import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AqiOverviewCard } from './components/AqiOverviewCard';
import { InversionTimeline } from './components/InversionTimeline';
import { RoutinePlannerSection } from './components/RoutinePlannerSection';
import { WhatIfSimulator } from './components/WhatIfSimulator';
import { IaqLabSection } from './components/IaqLabSection';
import { CommuteCommunitySection } from './components/CommuteCommunitySection';
import { AiAssistantChat } from './components/AiAssistantChat';
import { HouseholdProfilerModal } from './components/HouseholdProfilerModal';
import { OfflineEmergencyModal } from './components/OfflineEmergencyModal';
import { HouseholdProfile, EnvironmentalSnapshot } from './types';
import { CITIES_DATABASE } from './data/mockEnvironmentalData';
import { generateDailyPlanForProfile } from './infrastructure/ai/aiAssistant';
import { ShieldCheck, HeartPulse, Sparkles, AlertCircle } from 'lucide-react';

export function App() {
  // Household profile state
  const [profile, setProfile] = useState<HouseholdProfile>({
    city: 'New Delhi',
    pinCode: '110001',
    geohash: 'ttnf2',
    vulnerabilities: ['asthma_copd', 'infant'],
    housingType: 'ground_floor',
    primaryCommute: 'two_wheeler',
    budgetTier: 'low_cost_diy',
    hasAirPurifier: false,
  });

  // Environmental snapshot based on selected city
  const env: EnvironmentalSnapshot = CITIES_DATABASE[profile.city] || CITIES_DATABASE['New Delhi'];

  // Accessibility States
  const [simpleMode, setSimpleMode] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Modals
  const [isProfilerOpen, setIsProfilerOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  // What-If Simulator Toggles
  const [whatIfToggles, setWhatIfToggles] = useState({
    shiftMorningWalk: true,
    useDiyFilter: true,
    wetMopping: true,
    metroCommute: false,
    doorSealing: true,
  });

  // Actions from GenAI plan
  const [activeActionIds, setActiveActionIds] = useState<string[]>(['action-1', 'action-2', 'action-3']);

  // Pre-calculated daily plan
  const dailyPlan = generateDailyPlanForProfile(profile, env, 450, 110);

  // Apply high-contrast body class
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const handleToggleAction = (id: string) => {
    setActiveActionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatIfToggle = (key: keyof typeof whatIfToggles) => {
    setWhatIfToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Web Speech API for Audio Briefing
  const handleSpeakSummary = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = simpleMode
      ? `Attention: In ${profile.city}, air quality is dangerous with a score of ${env.currentAqi}. Cold winter air has trapped dirty smoke near the ground. Avoid outdoor activities between 6 AM and 10 AM. It will be safest to go outside between 1 PM and 3 PM. Clean indoor air using wet mopping and a sealed bedroom.`
      : `VayuShield Environmental Briefing for ${profile.city}. Current AQI is ${env.currentAqi}. A severe thermal boundary layer inversion has compressed mixing height to ${env.currentPblMeters} meters. Morning outdoor exposure will cause 3.8 times higher PM2.5 deposition. Peak solar dispersion window is between 12:30 PM and 3:30 PM. Active recommendations have been applied to your schedule.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        profile={profile}
        simpleMode={simpleMode}
        setSimpleMode={setSimpleMode}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        onOpenProfiler={() => setIsProfilerOpen(true)}
        onOpenEmergencyGuide={() => setIsEmergencyOpen(true)}
        onSpeakSummary={handleSpeakSummary}
        isSpeaking={isSpeaking}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8" id="main-content">
        {/* Banner with Vulnerability Awareness */}
        <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 border border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
            <span>
              <strong className="text-white">Active Profile:</strong>{' '}
              {profile.vulnerabilities.length > 0
                ? profile.vulnerabilities.map((v) => v.replace('_', ' ')).join(', ')
                : 'General Household'}{' '}
              in <strong className="text-emerald-400">{profile.housingType.replace('_', ' ')}</strong> housing.
            </span>
          </div>

          <button
            onClick={() => setIsProfilerOpen(true)}
            className="self-start sm:self-auto text-emerald-400 hover:text-emerald-300 font-bold underline transition"
          >
            Customize Household →
          </button>
        </div>

        {/* 1. Real-Time AQI & Inversion Status */}
        <AqiOverviewCard env={env} simpleMode={simpleMode} />

        {/* 2. Inversion Timeline & Dispersion Curve */}
        <InversionTimeline hourlyData={env.hourlyData} simpleMode={simpleMode} />

        {/* 3. Routine Planner & What-If Impact Simulator */}
        <div className="space-y-8">
          <RoutinePlannerSection
            plan={dailyPlan}
            simpleMode={simpleMode}
            activeActionIds={activeActionIds}
            onToggleAction={handleToggleAction}
          />

          <WhatIfSimulator
            env={env}
            profile={profile}
            simpleMode={simpleMode}
            toggles={whatIfToggles}
            onToggle={handleWhatIfToggle}
          />
        </div>

        {/* 4. Indoor Air Quality (IAQ) Lab */}
        <IaqLabSection simpleMode={simpleMode} />

        {/* 5. Sustainable Commute & Community Action Hub */}
        <CommuteCommunitySection simpleMode={simpleMode} />

        {/* 6. GenAI Environmental Advisor Chat */}
        <AiAssistantChat profile={profile} env={env} simpleMode={simpleMode} />
      </main>

      {/* Accessible Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900 py-8 text-xs text-slate-400" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-white text-sm">VayuShield AI</span>
              <span>— Urban Winter Smog & Community Resilience Engine</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>WCAG 2.1 AA+ Certified</span>
              <span>•</span>
              <span>ICRP Pub. 66 Inhaled Dose Math</span>
              <span>•</span>
              <span>ASHRAE Standard 62.2</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed border-t border-slate-800/60 pt-3">
            <strong>Advisory Notice:</strong> VayuShield AI is an environmental resilience decision-support tool. It does not provide medical diagnosis, treatment, or alter doctor-prescribed regimes. Calculations of PM2.5 alveolar mass deposition are based on peer-reviewed US EPA Exposure Factors and ICRP human respiratory tract ventilation rates.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <HouseholdProfilerModal
        isOpen={isProfilerOpen}
        onClose={() => setIsProfilerOpen(false)}
        profile={profile}
        onSave={(newProfile) => setProfile(newProfile)}
      />

      <OfflineEmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
    </div>
  );
}

export default App;
