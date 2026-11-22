import React, { useState, useId } from 'react';
import { Sparkles, Wrench, ShieldCheck, Calculator, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { calculateCorsiRosenthalPerformance } from '../core/domain/cadrSizer';
import { CorsiRosenthalParams } from '../types';

interface IaqLabSectionProps {
  simpleMode: boolean;
}

export const IaqLabSection: React.FC<IaqLabSectionProps> = ({ simpleMode }) => {
  const [activeTab, setActiveTab] = useState<'zero_cost' | 'diy_box_fan' | 'tech_purifier'>('diy_box_fan');

  // DIY Sizer State
  const [roomLength, setRoomLength] = useState(15);
  const [roomWidth, setRoomWidth] = useState(12);
  const [roomHeight, setRoomHeight] = useState(9);
  const [fanCfm, setFanCfm] = useState(1200);
  const [filterRating, setFilterRating] = useState<CorsiRosenthalParams['filterRating']>('MERV-13');
  const [filterCount, setFilterCount] = useState<4 | 5>(4);

  // Generate unique stable IDs for accessibility
  const roomLengthId = useId();
  const roomWidthId = useId();
  const roomHeightId = useId();
  const fanCfmId = useId();
  const filterRatingId = useId();
  const filterCountId = useId();

  const cadrResults = calculateCorsiRosenthalPerformance({
    roomLengthFt: roomLength,
    roomWidthFt: roomWidth,
    roomHeightFt: roomHeight,
    fanCfm,
    filterRating,
    filterCount,
  });

  return (
    <section 
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="iaq-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-teal-400" aria-hidden="true" />
            <h2 id="iaq-heading" className="text-lg font-bold text-white tracking-tight">
              {simpleMode ? 'Indoor Air Cleaning Hacks' : 'Indoor Air Quality (IAQ) Lab & Engineering Hacks'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {simpleMode
              ? 'Proven ways to clean indoor air for free or on a small budget.'
              : 'Scientifically validated indoor particulate reduction protocols tailored by budget tier.'}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold" role="tablist" aria-label="Indoor air quality tiers">
          <button
            role="tab"
            aria-selected={activeTab === 'zero_cost'}
            onClick={() => setActiveTab('zero_cost')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'zero_cost' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Zero-Cost Hacks
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'diy_box_fan'}
            onClick={() => setActiveTab('diy_box_fan')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'diy_box_fan' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            DIY Corsi-Rosenthal
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'tech_purifier'}
            onClick={() => setActiveTab('tech_purifier')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'tech_purifier' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Smart Purifiers
          </button>
        </div>
      </div>

      {/* Tab 1: Zero Cost Hacks */}
      {activeTab === 'zero_cost' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="tabpanel">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-sm font-bold text-white">Dynamic Window Sealing</h3>
            <p className="text-xs text-slate-300">
              Roll a damp towel along the bottom crack of external doors. In severe smog, window gaps leak ~40% of outdoor PM2.5 within 90 minutes.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 font-medium">
              Impact: ~35% less indoor particulate seepage
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-sm font-bold text-white">Wet-Mopping vs. Dry Sweeping</h3>
            <p className="text-xs text-slate-300">
              Never use dry brooms during smog season. Sweeping re-suspends settled toxic heavy metals and PM2.5 right into child breathing height. Wet-mop with water only.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 font-medium">
              Impact: Prevents 60% particle re-suspension
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-sm font-bold text-white">Kitchen Draft Compartment</h3>
            <p className="text-xs text-slate-300">
              Oil frying and gas cooking generate PM2.5 spikes exceeding 600 µg/m³. Close kitchen doors and keep kitchen exhaust on for 15 minutes after cooking completes.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 font-medium">
              Impact: Keeps living room PM2.5 50% lower
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: DIY Corsi-Rosenthal Box Calculator */}
      {activeTab === 'diy_box_fan' && (
        <div className="space-y-5" role="tabpanel">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Controls */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm font-bold text-white">
                <Calculator className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Interactive Room CADR & Sizing Engine</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor={roomLengthId} className="block text-[11px] font-medium text-slate-400 mb-1">
                    Room Length (ft)
                  </label>
                  <input
                    id={roomLengthId}
                    type="number"
                    min={6}
                    max={50}
                    value={roomLength}
                    onChange={(e) => setRoomLength(Number(e.target.value) || 10)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={roomWidthId} className="block text-[11px] font-medium text-slate-400 mb-1">
                    Room Width (ft)
                  </label>
                  <input
                    id={roomWidthId}
                    type="number"
                    min={6}
                    max={50}
                    value={roomWidth}
                    onChange={(e) => setRoomWidth(Number(e.target.value) || 10)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={roomHeightId} className="block text-[11px] font-medium text-slate-400 mb-1">
                    Ceiling (ft)
                  </label>
                  <input
                    id={roomHeightId}
                    type="number"
                    min={7}
                    max={20}
                    value={roomHeight}
                    onChange={(e) => setRoomHeight(Number(e.target.value) || 9)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={filterRatingId} className="block text-[11px] font-medium text-slate-400 mb-1">
                    Filter Media
                  </label>
                  <select
                    id={filterRatingId}
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value="MERV-13">MERV-13 (Recommended ~$12/ea)</option>
                    <option value="MERV-14">MERV-14 (Higher Capture ~$16/ea)</option>
                    <option value="HEPA">HEPA Pleated (~$25/ea)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={filterCountId} className="block text-[11px] font-medium text-slate-400 mb-1">
                    Filter Design
                  </label>
                  <select
                    id={filterCountId}
                    value={filterCount}
                    onChange={(e) => setFilterCount(Number(e.target.value) as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:border-emerald-400 focus:outline-none"
                  >
                    <option value={4}>4-Filter Cube (Standard)</option>
                    <option value={5}>5-Filter Compactor (Quietest / Lower Resistance)</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor={fanCfmId} className="block text-[11px] font-medium text-slate-400 mb-1">
                  Box Fan Speed: {fanCfm} CFM
                </label>
                <input
                  id={fanCfmId}
                  type="range"
                  min={800}
                  max={2000}
                  step={100}
                  value={fanCfm}
                  onChange={(e) => setFanCfm(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Results */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Engineering Performance Output
                </span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Clean Air Flow (CADR)</div>
                    <div className="text-xl font-black font-mono text-emerald-400">
                      {cadrResults.effectiveCadrCfm} <span className="text-xs text-slate-400">CFM</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Air Changes / Hr (ACH)</div>
                    <div className="text-xl font-black font-mono text-teal-400">
                      {cadrResults.ach} <span className="text-xs text-slate-400">ACH</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-300 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>
                    Rating: <strong className="text-white">{cadrResults.efficacyScore}</strong>
                    {cadrResults.ach >= 5.0 ? ' (Cleans room air every 12 mins)' : ''}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Estimated Build Cost:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  ${cadrResults.estimatedDiyCostUsd} USD <span className="text-slate-500 font-normal">(vs $450 retail)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Assembly Blueprint */}
          <div className="p-3 rounded-xl bg-teal-950/20 border border-teal-800/40 text-xs text-teal-200 flex items-start space-x-2">
            <Wrench className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <strong>Quick Assembly Note:</strong> Tape the 4 filters into a square with air-flow arrows pointing <em>inward</em>. Place fan on top blowing <em>upward/outward</em>. Add a 2-inch cardboard shroud collar around the fan edge to eliminate blade back-pressure.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tech-Assisted Purifier */}
      {activeTab === 'tech_purifier' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="tabpanel">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Smart Duty-Cycle Scheduling</span>
            </h3>
            <p className="text-xs text-slate-300">
              Running a commercial purifier 24/7 saturates HEPA filters 4x faster during smog peaks without added benefit. Run on high 45 minutes before bedtime, then switch to low-speed continuous maintenance mode.
            </p>
            <div className="text-[11px] text-emerald-400 font-mono">
              Saves ~40% electricity and doubles HEPA filter lifespan.
            </div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Pre-Filter Mesh Vacuuming</span>
            </h3>
            <p className="text-xs text-slate-300">
              During high-smog periods, coarse dust clogs the front mesh within 7 days. Vacuum or wash the reusable mesh pre-filter every Sunday to maintain rated CADR CFM without airflow drop.
            </p>
            <div className="text-[11px] text-amber-400 font-mono">
              Restores ~25% lost airflow efficiency.
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
