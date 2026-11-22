import React, { useState } from 'react';
import { Sun, AlertOctagon, CheckCircle2, AlertTriangle, ArrowRight, Clock } from 'lucide-react';
import { HourlyForecast } from '../types';

interface InversionTimelineProps {
  hourlyData: HourlyForecast[];
  simpleMode: boolean;
}

export const InversionTimeline: React.FC<InversionTimelineProps> = ({ hourlyData, simpleMode }) => {
  const [selectedHour, setSelectedHour] = useState<HourlyForecast>(hourlyData[7] || hourlyData[0]); // default to 12 PM or available

  return (
    <section 
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5"
      aria-labelledby="timeline-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="timeline-heading" className="text-lg font-bold text-white tracking-tight">
              {simpleMode ? 'Best & Worst Hours Today' : 'Hourly Smog-Trap & Dispersion Curve'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {simpleMode
              ? 'Find out when it is safe to step out and when to seal the house.'
              : 'Models diurnal boundary layer expansion to identify exact windows of safe ventilation vs trap zones.'}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center space-x-3 text-[11px] font-medium" role="region" aria-label="Timeline legend">
          <span className="flex items-center space-x-1 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" aria-hidden="true" />
            <span>{simpleMode ? 'Smog Trap' : 'Inversion Trap'}</span>
          </span>
          <span className="flex items-center space-x-1 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" aria-hidden="true" />
            <span>{simpleMode ? 'Cleanest Hours' : 'Active Dispersion'}</span>
          </span>
        </div>
      </div>

      {/* Hourly Scrollable Bar Strip */}
      <div 
        className="overflow-x-auto pb-2 focus:outline-none" 
        tabIndex={0} 
        aria-label="Hourly timeline strip. Use left and right arrow keys to explore hours"
      >
        <div className="flex space-x-2.5 min-w-[700px]">
          {hourlyData.map((hour) => {
            const isSelected = selectedHour.hour === hour.hour;
            const isTrap = hour.smogStatus === 'severe_trap';
            const isSafe = hour.smogStatus === 'active_dispersion';

            return (
              <button
                key={hour.hour}
                onClick={() => setSelectedHour(hour)}
                className={`flex-1 p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[115px] focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isSelected
                    ? 'ring-2 ring-emerald-400 bg-slate-800 border-emerald-400 scale-[1.02]'
                    : isTrap
                    ? 'bg-rose-950/20 border-rose-900/40 hover:bg-rose-950/40'
                    : isSafe
                    ? 'bg-emerald-950/20 border-emerald-900/40 hover:bg-emerald-950/40'
                    : 'bg-slate-950/40 border-slate-800 hover:bg-slate-800/60'
                }`}
                aria-pressed={isSelected}
                aria-label={`${hour.timeLabel}: PM2.5 ${hour.pm25} µg/m³, ${hour.smogStatus.replace('_', ' ')}`}
              >
                <span className="text-[11px] font-mono text-slate-400 font-semibold">{hour.timeLabel}</span>
                
                {/* Icon indicator */}
                <div className="my-1.5" aria-hidden="true">
                  {isSafe ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isTrap ? (
                    <AlertOctagon className="w-5 h-5 text-rose-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  )}
                </div>

                <div className="space-y-0.5">
                  <div className={`text-xs font-bold font-mono ${
                    isSafe ? 'text-emerald-300' : isTrap ? 'text-rose-300' : 'text-amber-300'
                  }`}>
                    {hour.pm25} <span className="text-[9px] font-normal text-slate-400">µg</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {hour.boundaryLayerMeters}m
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Hour Insight Card */}
      <div className={`p-4 rounded-xl border transition-colors ${
        selectedHour.smogStatus === 'active_dispersion'
          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-100'
          : selectedHour.smogStatus === 'severe_trap'
          ? 'bg-rose-950/30 border-rose-800/60 text-rose-100'
          : 'bg-amber-950/30 border-amber-800/60 text-amber-100'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-900/80 text-white border border-slate-700">
              {selectedHour.timeLabel}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">
              {selectedHour.smogStatus === 'active_dispersion'
                ? '✅ Optimal Dispersion Window'
                : selectedHour.smogStatus === 'severe_trap'
                ? '🚨 Severe Inversion Trap (Ground Stagnation)'
                : '⚠️ Moderate Mixing Layer'}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span>Air Ceiling: <strong>{selectedHour.boundaryLayerMeters}m</strong></span>
            <span>•</span>
            <span>Temp: <strong>{selectedHour.temperatureC}°C</strong></span>
          </div>
        </div>

        <div className="mt-2.5 text-xs sm:text-sm text-slate-200 flex items-start space-x-2">
          <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span><strong>Actionable Guidance:</strong> {selectedHour.recommendedAction}</span>
        </div>
      </div>
    </section>
  );
};
