import React from 'react';
import { Calendar, Check, ArrowRight, Zap, TrendingDown, DollarSign } from 'lucide-react';
import { DailySmogPlan, TieredAction } from '../core/schemas/recommendation.schema';

interface RoutinePlannerProps {
  plan: DailySmogPlan;
  simpleMode: boolean;
  activeActionIds: string[];
  onToggleAction: (id: string) => void;
}

export const RoutinePlannerSection: React.FC<RoutinePlannerProps> = ({
  plan,
  simpleMode,
  activeActionIds,
  onToggleAction,
}) => {
  return (
    <section 
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6"
      aria-labelledby="routine-heading"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="routine-heading" className="text-lg font-bold text-white tracking-tight">
              {simpleMode ? 'Your Daily Clean-Air Plan' : 'Low-Emission Daily Routines & Resilience Actions'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {simpleMode
              ? 'Check off the actions you are doing today to see your live exposure drop.'
              : 'GenAI-formulated schedule shifting high-risk exposure and emissions away from thermal inversion traps.'}
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 self-start sm:self-auto">
          <Zap className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{activeActionIds.length} of {plan.actions.length} Actions Active</span>
        </div>
      </div>

      {/* Action Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plan.actions.map((action: TieredAction) => {
          const isSelected = activeActionIds.includes(action.id);

          return (
            <div
              key={action.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40'
              }`}
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-900 text-slate-300 border border-slate-700">
                    {action.targetTimeWindow}
                  </span>

                  {/* Toggle Button */}
                  <button
                    onClick={() => onToggleAction(action.id)}
                    className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                    aria-pressed={isSelected}
                    aria-label={`Toggle action: ${action.headline}`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isSelected ? 'stroke-[3]' : 'opacity-40'}`} aria-hidden="true" />
                    <span>{isSelected ? 'Committed' : 'Add to Plan'}</span>
                  </button>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {action.headline}
                </h3>

                {/* Practical Steps */}
                <ul className="space-y-1.5 pt-1 text-xs text-slate-300" aria-label="Action steps">
                  {action.practicalSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rationale & Metrics Footer */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                <p className="text-[11px] text-slate-400 italic">
                  💡 <strong>Why it works:</strong> {action.healthRationale}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center space-x-1 text-emerald-400 font-bold">
                    <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>-{action.metrics.pm25DoseReductionPct}% Inhaled Dose</span>
                  </span>

                  <span className="text-slate-400">
                    Cost: {action.metrics.estimatedCostUsd === 0 ? 'Free ($0)' : `$${action.metrics.estimatedCostUsd}`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
