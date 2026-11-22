import React, { useState } from 'react';
import { X, Check, MapPin, AlertCircle, Home, Bike, DollarSign } from 'lucide-react';
import { HouseholdProfile, VulnerabilityCategory, HousingType, CommuteMode, BudgetTier } from '../types';
import { CITIES_DATABASE } from '../data/mockEnvironmentalData';

interface ProfilerModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: HouseholdProfile;
  onSave: (newProfile: HouseholdProfile) => void;
}

export const HouseholdProfilerModal: React.FC<ProfilerModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave,
}) => {
  if (!isOpen) return null;

  const [selectedCity, setSelectedCity] = useState(profile.city);
  const [selectedVulnerabilities, setSelectedVulnerabilities] = useState<VulnerabilityCategory[]>(profile.vulnerabilities);
  const [housingType, setHousingType] = useState<HousingType>(profile.housingType);
  const [primaryCommute, setPrimaryCommute] = useState<CommuteMode>(profile.primaryCommute);
  const [budgetTier, setBudgetTier] = useState<BudgetTier>(profile.budgetTier);
  const [hasPurifier, setHasPurifier] = useState<boolean>(profile.hasAirPurifier);

  const toggleVulnerability = (v: VulnerabilityCategory) => {
    setSelectedVulnerabilities((prev) =>
      prev.includes(v) ? prev.filter((item) => item !== v) : [...prev, v]
    );
  };

  const handleSave = () => {
    // Generate simple mock geohash for city
    const geohashMap: Record<string, string> = {
      'New Delhi': 'ttnf2',
      'Lahore': 'ttq3m',
      'Salt Lake City': '9x0rf',
      'Beijing': 'wx4g0',
    };

    onSave({
      city: selectedCity,
      pinCode: '110001',
      geohash: geohashMap[selectedCity] || 'ttnf2',
      vulnerabilities: selectedVulnerabilities,
      housingType,
      primaryCommute,
      budgetTier,
      hasAirPurifier: hasPurifier,
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profiler-title"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Home className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            <h2 id="profiler-title" className="text-lg font-bold text-white">
              Household & Lifestyle Profiler
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

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* City Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Select Smog Basin / City:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-emerald-400 focus:outline-none"
            >
              {Object.keys(CITIES_DATABASE).map((city) => (
                <option key={city} value={city}>
                  {city} (Active Inversion Feed)
                </option>
              ))}
            </select>
          </div>

          {/* Household Vulnerabilities */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Vulnerable Family Members:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'infant', label: 'Infant (< 1 yr)' },
                { id: 'asthma_copd', label: 'Child or Adult with Asthma' },
                { id: 'elderly', label: 'Senior Citizen (65+)' },
                { id: 'pregnant', label: 'Pregnant Family Member' },
                { id: 'cardiac', label: 'Cardiovascular Condition' },
              ].map((item) => {
                const checked = selectedVulnerabilities.includes(item.id as VulnerabilityCategory);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleVulnerability(item.id as VulnerabilityCategory)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                      checked
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {checked && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Housing Construction */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Housing & Building Structure:
            </label>
            <select
              value={housingType}
              onChange={(e) => setHousingType(e.target.value as HousingType)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-emerald-400 focus:outline-none"
            >
              <option value="ground_floor">Ground Floor Apartment (High dust re-suspension)</option>
              <option value="mid_high_rise">Mid / High Rise (Elevated inversion layer)</option>
              <option value="leaky_vintage">Older Construction (Drafty doors & window gaps)</option>
              <option value="modern_sealed">Modern Sealed Construction (Double-glazed)</option>
            </select>
          </div>

          {/* Commute Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Primary Daily Commute:
            </label>
            <select
              value={primaryCommute}
              onChange={(e) => setPrimaryCommute(e.target.value as CommuteMode)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:border-emerald-400 focus:outline-none"
            >
              <option value="two_wheeler">Two-Wheeler / Scooter (Direct tailpipe exposure)</option>
              <option value="auto_rickshaw">Auto-Rickshaw / Open Transit</option>
              <option value="metro_bus">Metro Train / Closed Public Bus</option>
              <option value="walking_cycling">Walking / Cycling</option>
              <option value="car_ac">Closed Car with Cabin Air Filter</option>
            </select>
          </div>

          {/* Air Purifier Ownership */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">Do you own a commercial HEPA Air Purifier?</div>
              <div className="text-[11px] text-slate-400">If not, we emphasize zero-cost & DIY Corsi-Rosenthal boxes.</div>
            </div>
            <input
              type="checkbox"
              checked={hasPurifier}
              onChange={(e) => setHasPurifier(e.target.checked)}
              className="w-5 h-5 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
          >
            Save & Update Plan
          </button>
        </div>
      </div>
    </div>
  );
};
