import React from 'react';
import { X, LifeBuoy, AlertTriangle, CheckCircle, PhoneCall, ShieldAlert, Download } from 'lucide-react';
import { MANDATORY_ADVISORY_NOTICE } from '../infrastructure/ai/guardrails';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineEmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="emergency-title"
    >
      <div className="bg-slate-900 border border-rose-800/80 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-rose-400">
            <LifeBuoy className="w-6 h-6 stroke-[2.2]" aria-hidden="true" />
            <h2 id="emergency-title" className="text-lg font-bold text-white">
              Emergency Severe Smog Crisis Checklist (Offline Ready)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-200 max-h-[70vh] overflow-y-auto pr-1">
          {/* Medical Red Flags */}
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 space-y-2">
            <div className="flex items-center space-x-2 text-rose-300 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-rose-400" aria-hidden="true" />
              <span>Immediate Medical Attention Triggers:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-rose-100 text-xs">
              <li>Severe wheezing, stridor, or audible breathing distress in infants or children.</li>
              <li>Blueish discoloration around lips or fingernails (cyanosis / low oxygen).</li>
              <li>Inability to speak in full sentences without gasping for breath.</li>
              <li>Persistent chest pressure, pain, or dizziness during smog episodes.</li>
            </ul>
          </div>

          {/* Rapid Quarantine Protocol */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm">
              Step 1: Create a Home "Clean Air Sanctuary"
            </h3>
            <p className="text-xs text-slate-300">
              Pick one small bedroom with the fewest windows. Concentrate family members and pets inside this room.
            </p>
            <ul className="space-y-1 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Roll damp towels tightly along the bottom threshold of all external doors.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tape painter's tape or masking tape over leaky window sills and AC vents.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turn on any available fan-filter scrubber or HEPA purifier inside this sealed room.</span>
              </li>
            </ul>
          </div>

          {/* What to strictly avoid */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-sm">
              Step 2: Strict Indoor Smog Prohibitions
            </h3>
            <ul className="space-y-1 text-xs text-slate-300">
              <li className="flex items-center space-x-2 text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>NO incense, scented candles, or mosquito coils (adds thousands of VOCs).</span>
              </li>
              <li className="flex items-center space-x-2 text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>NO dry sweeping (only damp micro-fiber mops).</span>
              </li>
              <li className="flex items-center space-x-2 text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>NO outdoor exercise between 05:00 AM and 11:00 AM under any circumstance.</span>
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
            {MANDATORY_ADVISORY_NOTICE}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Print / Save as PDF</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
