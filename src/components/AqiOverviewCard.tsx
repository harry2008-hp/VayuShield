import React from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle2, Wind, Thermometer, Layers, Info } from 'lucide-react';
import { EnvironmentalSnapshot } from '../types';

interface AqiOverviewProps {
  env: EnvironmentalSnapshot;
  simpleMode: boolean;
}

export const AqiOverviewCard: React.FC<AqiOverviewProps> = ({ env, simpleMode }) => {
  // Determine severity tier
  let badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  let badgeIcon = <AlertOctagon className="w-5 h-5 text-rose-400" aria-hidden="true" />;
  let severityLabel = 'Hazardous Air — Emergency Level';
  let simpleLabel = 'Extremely Bad Air — Stay Inside';

  if (env.currentAqi <= 100) {
    badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    badgeIcon = <CheckCircle2 className="w-5 h-5 text-emerald-400" aria-hidden="true" />;
    severityLabel = 'Good / Moderate Air';
    simpleLabel = 'Air is Clean Enough';
  } else if (env.currentAqi <= 200) {
    badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    badgeIcon = <AlertTriangle className="w-5 h-5 text-amber-400" aria-hidden="true" />;
    severityLabel = 'Unhealthy for Sensitive Groups';
    simpleLabel = 'Poor Air — Protect Kids & Seniors';
  } else if (env.currentAqi <= 300) {
    badgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    badgeIcon = <AlertOctagon className="w-5 h-5 text-orange-400" aria-hidden="true" />;
    severityLabel = 'Very Unhealthy Air Quality';
    simpleLabel = 'Very Unhealthy — Wear N95 Mask';
  }

  const isInversionTrapped = env.inversionState === 'severe_trap';

  return (
    <section 
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden"
      aria-labelledby="aqi-heading"
    >
      {/* Decorative gradient glow */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true"
      />

      {/* Screen Reader Live Status */}
      <div className="sr-only" aria-live="polite">
        Current Air Quality in {env.city} is {env.currentAqi}, PM2.5 is {env.currentPm25} micrograms per cubic meter. Status: {severityLabel}. Inversion trap is {isInversionTrapped ? 'active and severe' : 'clearing'}.
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left: Main Metrics */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeColor}`}>
              {badgeIcon}
              <span>{simpleMode ? simpleLabel : severityLabel}</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Updated {env.lastUpdated}
            </span>
          </div>

          <div className="flex items-baseline space-x-4">
            <h1 id="aqi-heading" className="text-5xl sm:text-6xl font-black tracking-tight text-white font-mono">
              {env.currentAqi}
            </h1>
            <div>
              <div className="text-sm font-semibold text-slate-300">
                {simpleMode ? 'Air Pollution Index' : 'US-EPA AQI Index'}
              </div>
              <div className="text-xs text-slate-400">
                PM2.5: <span className="font-mono font-bold text-slate-200">{env.currentPm25} µg/m³</span>
                <span className="ml-2 text-rose-400 font-medium">({(env.currentPm25 / 15).toFixed(0)}x WHO safe limit)</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-xl">
            {simpleMode ? (
              <span>Cold winter morning air has locked dirty exhaust close to the ground like a lid on a pot. Clean air returns this afternoon between 12:30 PM and 3:30 PM.</span>
            ) : (
              <span><strong className="text-white">Boundary Layer Thermal Inversion:</strong> Nocturnal radiation cooling has collapsed the mixing height to <strong className="text-emerald-400">{env.currentPblMeters}m</strong>, trapping biomass and tailpipe emissions near street level.</span>
            )}
          </p>
        </div>

        {/* Right: Meteorological Inversion Sensors */}
        <div className="grid grid-cols-3 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 min-w-[280px]">
          {/* PBL Height */}
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-400 space-x-1">
              <Layers className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span>{simpleMode ? 'Air Ceiling' : 'PBL Height'}</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {env.currentPblMeters} m
            </div>
            <div className="text-[10px] text-rose-400 font-medium">
              {env.currentPblMeters < 200 ? 'Trap Cap Active' : 'Normal Mixing'}
            </div>
          </div>

          {/* Temperature */}
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-400 space-x-1">
              <Thermometer className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>Temp</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {env.currentTempC}°C
            </div>
            <div className="text-[10px] text-slate-400">
              Cold Ground
            </div>
          </div>

          {/* Wind Speed */}
          <div className="space-y-1">
            <div className="flex items-center text-xs text-slate-400 space-x-1">
              <Wind className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
              <span>Wind</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {env.windSpeedKmh} km/h
            </div>
            <div className="text-[10px] text-amber-400">
              Stagnant Breeze
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Stagnation Banner */}
      {isInversionTrapped && (
        <div className="mt-5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 flex items-start space-x-3 text-xs text-rose-200">
          <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="font-semibold text-rose-100">
              {simpleMode ? 'Warning: Morning Smog Trap Active' : 'Inversion Trap Warning (06:00 AM – 10:30 AM):'}
            </strong>{' '}
            {simpleMode
              ? 'Keep all windows closed right now. Avoid walking or outdoor jogging until 1:00 PM.'
              : 'Near-zero vertical ventilation. PM2.5 concentrations are 3.8x higher than afternoon values. Keep vulnerable members in sealed rooms.'}
          </div>
        </div>
      )}
    </section>
  );
};
