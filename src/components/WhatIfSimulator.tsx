import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Sparkles, Cigarette, Leaf, Info } from 'lucide-react';
import { DoseSegment, calculateRoutineSavings } from '../core/domain/doseCalculator';
import { EnvironmentalSnapshot, HouseholdProfile } from '../types';

interface WhatIfSimulatorProps {
  env: EnvironmentalSnapshot;
  profile: HouseholdProfile;
  simpleMode: boolean;
  toggles: {
    shiftMorningWalk: boolean;
    useDiyFilter: boolean;
    wetMopping: boolean;
    metroCommute: boolean;
    doorSealing: boolean;
  };
  onToggle: (key: keyof WhatIfSimulatorProps['toggles']) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  env,
  profile,
  simpleMode,
  toggles,
  onToggle,
}) => {
  // Baseline Scenario: An unmitigated day in severe smog
  // 60 min outdoor walk at 7:30 AM (PM2.5 ~ 460 µg/m³)
  // 45 min commute on motorcycle/open car (PM2.5 ~ 420 µg/m³)
  // 600 min in unsealed indoor room with no purifier (penetration 70%, PM2.5 ~ 250 µg/m³)
  const baselineSegments: DoseSegment[] = [
    { durationMinutes: 60, pm25Concentration: env.currentPm25, isIndoor: false, activity: 'light_exercise', age: 'adult' },
    { durationMinutes: 45, pm25Concentration: env.currentPm25 * 1.1, isIndoor: false, activity: 'sedentary', age: 'adult' },
    { durationMinutes: 600, pm25Concentration: env.currentPm25, isIndoor: true, indoorProtectionFactor: 0.70, activity: 'sedentary', age: 'adult' },
  ];

  // Optimized Scenario based on active toggles
  // 1. If shiftMorningWalk: outdoor walk is shifted to 1:30 PM (PM2.5 drops to ~140 µg/m³)
  // 2. If useDiyFilter: indoor protection factor drops from 0.70 to 0.15 (85% removal)
  // 3. If doorSealing: indoor infiltration drops further to 0.10
  // 4. If wetMopping: removes settled dust re-suspension (~10% indoor benefit)
  // 5. If metroCommute: commute is in filtered underground/closed train (~70% lower exposure)
  
  let indoorFactor = 0.70;
  if (toggles.useDiyFilter) indoorFactor = 0.15;
  if (toggles.doorSealing) indoorFactor = Math.min(indoorFactor, 0.10);
  if (toggles.wetMopping) indoorFactor = Math.max(0.06, indoorFactor * 0.85);

  const outdoorWalkPm25 = toggles.shiftMorningWalk ? Math.round(env.currentPm25 * 0.35) : env.currentPm25;
  const commutePm25 = toggles.metroCommute ? Math.round(env.currentPm25 * 0.25) : Math.round(env.currentPm25 * 1.1);

  const optimizedSegments: DoseSegment[] = [
    { durationMinutes: 60, pm25Concentration: outdoorWalkPm25, isIndoor: false, activity: 'light_exercise', age: 'adult' },
    { durationMinutes: 45, pm25Concentration: commutePm25, isIndoor: false, activity: 'sedentary', age: 'adult' },
    { durationMinutes: 600, pm25Concentration: env.currentPm25, isIndoor: true, indoorProtectionFactor: indoorFactor, activity: 'sedentary', age: 'adult' },
  ];

  const results = calculateRoutineSavings(baselineSegments, optimizedSegments);

  // Community emissions calculation
  const co2AvoidedKg = toggles.metroCommute ? 2.1 : 0.4;

  return (
    <section 
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="impact-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <HeartPulse className="w-5 h-5 text-rose-400" aria-hidden="true" />
            <h2 id="impact-heading" className="text-lg font-bold text-white tracking-tight">
              {simpleMode ? 'Your Personal Lung Protection Calculator' : 'Deterministic "Impact Lens" & What-If Simulator'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {simpleMode
              ? 'Flip these switches to see how much poison you stop from entering your lungs today.'
              : 'Verifiable physical dose calculus: EPA minute ventilation rates × duration × infiltration fractions.'}
          </p>
        </div>

        <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto">
          EPA Table 6-1 Calibrated
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: What-If Checkboxes (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Toggle Today's Habits & Interventions:
          </span>

          {/* Toggle 1 */}
          <button
            type="button"
            onClick={() => onToggle('shiftMorningWalk')}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              toggles.shiftMorningWalk
                ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
            }`}
            aria-pressed={toggles.shiftMorningWalk}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={toggles.shiftMorningWalk}
                readOnly
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 accent-emerald-500"
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-bold">Shift Walk to Solar Noon (01:00 PM)</div>
                <div className="text-[11px] text-slate-400">Avoids 07:30 AM inversion trap</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">-65% exposure</span>
          </button>

          {/* Toggle 2 */}
          <button
            type="button"
            onClick={() => onToggle('useDiyFilter')}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              toggles.useDiyFilter
                ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
            }`}
            aria-pressed={toggles.useDiyFilter}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={toggles.useDiyFilter}
                readOnly
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 accent-emerald-500"
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-bold">Run DIY Corsi-Rosenthal / HEPA Unit</div>
                <div className="text-[11px] text-slate-400">Achieves 5+ room air changes per hour</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">-78% indoor PM2.5</span>
          </button>

          {/* Toggle 3 */}
          <button
            type="button"
            onClick={() => onToggle('wetMopping')}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              toggles.wetMopping
                ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
            }`}
            aria-pressed={toggles.wetMopping}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={toggles.wetMopping}
                readOnly
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 accent-emerald-500"
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-bold">Wet-Mop Hard Floors (No Dry Broom)</div>
                <div className="text-[11px] text-slate-400">Zero re-suspension of toxic dust</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">-15% dust load</span>
          </button>

          {/* Toggle 4 */}
          <button
            type="button"
            onClick={() => onToggle('metroCommute')}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              toggles.metroCommute
                ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
            }`}
            aria-pressed={toggles.metroCommute}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={toggles.metroCommute}
                readOnly
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 accent-emerald-500"
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-bold">Switch Commute to Metro Rail / Carpool</div>
                <div className="text-[11px] text-slate-400">Avoids tailpipe plume inhalation</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">+2.1 kg CO2 saved</span>
          </button>

          {/* Toggle 5 */}
          <button
            type="button"
            onClick={() => onToggle('doorSealing')}
            className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              toggles.doorSealing
                ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800/40'
            }`}
            aria-pressed={toggles.doorSealing}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={toggles.doorSealing}
                readOnly
                className="w-4 h-4 rounded text-emerald-500 focus:ring-0 accent-emerald-500"
                aria-hidden="true"
              />
              <div>
                <div className="text-xs font-bold">Seal Door Cracks with Damp Towels</div>
                <div className="text-[11px] text-slate-400">Blocks nocturnal inversion draft</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">-20% infiltration</span>
          </button>
        </div>

        {/* Right: Real-time SVG Meter & Savings (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Daily Inhaled PM2.5 Dose Reduction
          </span>

          {/* Animated Gauge Ring */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                fill="transparent"
                className="text-slate-800"
              />
              {/* Foreground progress */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * results.reductionPercentage) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="text-emerald-400 transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black font-mono text-white">
                {results.reductionPercentage}%
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Less Poison
              </span>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="w-full grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                <Cigarette className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
                <span>Smoked Equiv.</span>
              </div>
              <div className="text-base font-bold font-mono text-rose-300">
                -{results.equivalentCigarettesAvoided} <span className="text-xs font-normal text-slate-400">cigs</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center space-x-1 text-[10px] text-slate-400">
                <Leaf className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                <span>CO2 Saved</span>
              </div>
              <div className="text-base font-bold font-mono text-teal-300">
                {co2AvoidedKg} <span className="text-xs font-normal text-slate-400">kg</span>
              </div>
            </div>
          </div>

          {/* Dose Number */}
          <div className="text-xs text-slate-300">
            Prevented <strong className="text-emerald-400 font-mono">{results.savedDoseUg} µg</strong> of PM2.5 from depositing in respiratory alveoli today.
          </div>
        </div>
      </div>
    </section>
  );
};
