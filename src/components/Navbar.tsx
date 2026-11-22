import React from 'react';
import { Shield, MapPin, Eye, Contrast, Volume2, LifeBuoy, SlidersHorizontal } from 'lucide-react';
import { HouseholdProfile } from '../types';

interface NavbarProps {
  profile: HouseholdProfile;
  simpleMode: boolean;
  setSimpleMode: (v: boolean) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  onOpenProfiler: () => void;
  onOpenEmergencyGuide: () => void;
  onSpeakSummary: () => void;
  isSpeaking: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  simpleMode,
  setSimpleMode,
  highContrast,
  setHighContrast,
  onOpenProfiler,
  onOpenEmergencyGuide,
  onSpeakSummary,
  isSpeaking,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20" aria-hidden="true">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white">VayuShield</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">
                AI Smog Shield
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {simpleMode ? 'Family Clean Air Helper' : 'Urban Smog & Community Resilience Engine'}
            </p>
          </div>
        </div>

        {/* Location & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Location Badge */}
          <button
            onClick={onOpenProfiler}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={`Current location: ${profile.city}. Click to customize profile`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            <span className="font-medium max-w-[110px] sm:max-w-[160px] truncate">{profile.city}</span>
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">({profile.geohash})</span>
            <SlidersHorizontal className="w-3 h-3 text-slate-400 ml-1" />
          </button>

          {/* Accessibility: Simple Mode Toggle */}
          <button
            onClick={() => setSimpleMode(!simpleMode)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition flex items-center space-x-1.5 ${
              simpleMode
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle Simple Plain-English Mode (removes scientific jargon)"
            aria-pressed={simpleMode}
            aria-label="Toggle Simple Plain-English Mode"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden lg:inline">{simpleMode ? 'Simple Mode ON' : 'Plain Mode'}</span>
          </button>

          {/* Accessibility: High Contrast Toggle */}
          <button
            onClick={() => setHighContrast(!highContrast)}
            className={`p-2 rounded-lg text-xs border transition ${
              highContrast
                ? 'bg-white text-black border-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Toggle High Contrast Mode (WCAG 2.1 AA)"
            aria-pressed={highContrast}
            aria-label="Toggle High Contrast Mode"
          >
            <Contrast className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Voice Readout (Text to Speech) */}
          <button
            onClick={onSpeakSummary}
            className={`p-2 rounded-lg text-xs border transition ${
              isSpeaking
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 animate-pulse'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Listen to today's audio safety report"
            aria-label="Listen to audio briefing"
          >
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          </button>

          {/* Emergency Offline Guide */}
          <button
            onClick={onOpenEmergencyGuide}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold transition focus-visible:ring-2 focus-visible:ring-rose-400"
            aria-label="Open emergency smog crisis checklist"
          >
            <LifeBuoy className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
            <span className="hidden sm:inline">Emergency Guide</span>
          </button>
        </div>
      </div>
    </header>
  );
};
