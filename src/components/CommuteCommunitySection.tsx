import React, { useState } from 'react';
import { Users, Car, Flame, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import { calculateCommuteEmissionsSaved } from '../core/domain/emissionFactors';

interface CommuteCommunityProps {
  simpleMode: boolean;
}

export const CommuteCommunitySection: React.FC<CommuteCommunityProps> = ({ simpleMode }) => {
  const [commuteDistanceKm, setCommuteDistanceKm] = useState(12);
  const [targetMode, setTargetMode] = useState<'metro_rail' | 'electric_bus' | 'carpool_3plus'>('metro_rail');

  const savings = calculateCommuteEmissionsSaved({
    distanceKm: commuteDistanceKm,
    originalMode: 'car_solo',
    targetMode,
    frequencyPerWeek: 5,
  });

  return (
    <section 
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="community-heading"
    >
      <div>
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-indigo-400" aria-hidden="true" />
          <h2 id="community-heading" className="text-lg font-bold text-white tracking-tight">
            {simpleMode ? 'Community Clean Commutes & Clean Heating' : 'Sustainable Commute & Neighborhood Action Hub'}
          </h2>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {simpleMode
            ? 'See how switching from solo car/bike to metro or carpool helps the whole neighborhood.'
            : 'Quantifying community-scale emission abatement and collective smog suppression.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Commute Mode Switcher */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-white">
            <Car className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Interactive Commute Carbon & NOx Calculator</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>One-Way Commute Distance:</span>
                <span className="font-mono font-bold text-emerald-400">{commuteDistanceKm} km</span>
              </div>
              <input
                type="range"
                min={3}
                max={40}
                value={commuteDistanceKm}
                onChange={(e) => setCommuteDistanceKm(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
                aria-label="Commute distance in kilometers"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                Choose Sustainable Swap:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTargetMode('metro_rail')}
                  className={`p-2 rounded-lg text-xs font-semibold border transition ${
                    targetMode === 'metro_rail'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  Metro / Train
                </button>
                <button
                  type="button"
                  onClick={() => setTargetMode('electric_bus')}
                  className={`p-2 rounded-lg text-xs font-semibold border transition ${
                    targetMode === 'electric_bus'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  Electric Bus
                </button>
                <button
                  type="button"
                  onClick={() => setTargetMode('carpool_3plus')}
                  className={`p-2 rounded-lg text-xs font-semibold border transition ${
                    targetMode === 'carpool_3plus'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  3+ Carpool
                </button>
              </div>
            </div>
          </div>

          {/* Abatement Results */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Monthly CO2 Prevented</div>
              <div className="text-lg font-black font-mono text-emerald-400">
                {savings.co2SavedKgPerMonth} <span className="text-xs text-slate-400">kg CO2e</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <div className="text-[10px] text-slate-400">Monthly Toxic NOx Avoided</div>
              <div className="text-lg font-black font-mono text-teal-400">
                {savings.noxSavedGramsPerMonth} <span className="text-xs text-slate-400">grams</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Anti-Biomass & Safe Heating Community Protocol */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm font-bold text-white">
              <Flame className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Clean Winter Heating Alternatives</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              In cold urban mornings, roadside biomass, leaf, and waste wood burning are responsible for up to <strong>35% of ground-level PM2.5</strong> because nocturnal inversions trap smoke at chest height.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start space-x-2 text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Security Guard & Night Staff Heating:</strong> Provide radiant electric quartz heaters (400W) or thermal heating jackets instead of burning scrap wood in neighborhood alleys.
                </span>
              </div>
              <div className="flex items-start space-x-2 text-slate-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Composting over Leaf Burning:</strong> Garden leaves burned in winter release toxic polycyclic aromatic hydrocarbons (PAHs). Bag leaves for organic municipal composting.
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-800/40 text-xs text-indigo-200">
            <strong>Neighborhood Collective Impact:</strong> When 20 resident apartments pool together to heat guard posts with electric quartz blankets, outdoor PM2.5 in that street drops by ~45 µg/m³.
          </div>
        </div>
      </div>
    </section>
  );
};
