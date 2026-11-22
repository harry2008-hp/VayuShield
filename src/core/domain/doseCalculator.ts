/**
 * Human Inhaled PM2.5 Mass Dose Calculator
 * Reference: US EPA Exposure Factors Handbook (Chapter 6) & ICRP Publication 66 (Human Respiratory Tract Model)
 * Formula: Dose (µg) = Ambient Concentration (µg/m³) × (1 - Filtration) × Ventilation Rate (m³/min) × Time (min)
 */

export type AgeBracket = 'infant' | 'child' | 'adult' | 'senior';
export type ActivityIntensity = 'sleep' | 'sedentary' | 'light_exercise' | 'vigorous_exercise';

export interface DoseSegment {
  durationMinutes: number;
  pm25Concentration: number; // in µg/m³
  isIndoor: boolean;
  indoorProtectionFactor?: number; // 0.0 (sealed medical HEPA) to 1.0 (unfiltered ambient)
  activity: ActivityIntensity;
  age: AgeBracket;
}

// Inhalation Minute Ventilation (m³/min) based on US EPA Table 6-1
export const MINUTE_VENTILATION_RATES: Record<AgeBracket, Record<ActivityIntensity, number>> = {
  infant: {
    sleep: 0.002,
    sedentary: 0.004,
    light_exercise: 0.008,
    vigorous_exercise: 0.014,
  },
  child: {
    sleep: 0.004,
    sedentary: 0.007,
    light_exercise: 0.015,
    vigorous_exercise: 0.028,
  },
  adult: {
    sleep: 0.005,
    sedentary: 0.009,
    light_exercise: 0.022,
    vigorous_exercise: 0.045,
  },
  senior: {
    sleep: 0.004,
    sedentary: 0.008,
    light_exercise: 0.019,
    vigorous_exercise: 0.038,
  },
};

/**
 * Calculates PM2.5 inhaled dose in micrograms (µg) for a single segment
 */
export function calculateSegmentDose(segment: DoseSegment): number {
  const ventilation = MINUTE_VENTILATION_RATES[segment.age][segment.activity];
  const effectiveConcentration = segment.isIndoor
    ? segment.pm25Concentration * (segment.indoorProtectionFactor ?? 0.70)
    : segment.pm25Concentration;

  const dose = effectiveConcentration * ventilation * segment.durationMinutes;
  return Number(dose.toFixed(2));
}

/**
 * Compares a baseline daily routine with an optimized low-emission & IAQ-protected routine
 */
export function calculateRoutineSavings(
  baseline: DoseSegment[],
  optimized: DoseSegment[]
): {
  baselineDoseUg: number;
  optimizedDoseUg: number;
  savedDoseUg: number;
  reductionPercentage: number;
  equivalentCigarettesAvoided: number;
} {
  const baselineDose = baseline.reduce((sum, seg) => sum + calculateSegmentDose(seg), 0);
  const optimizedDose = optimized.reduce((sum, seg) => sum + calculateSegmentDose(seg), 0);
  const savedDose = Math.max(0, baselineDose - optimizedDose);

  const reductionPercentage = baselineDose > 0
    ? Math.min(100, Math.max(0, (savedDose / baselineDose) * 100))
    : 0;

  // Berkeley Earth rule of thumb: ~22 µg of PM2.5 inhaled dose ~ 1 cigarette of toxic particulate burden
  const equivalentCigarettesAvoided = Number((savedDose / 22).toFixed(1));

  return {
    baselineDoseUg: Number(baselineDose.toFixed(1)),
    optimizedDoseUg: Number(optimizedDose.toFixed(1)),
    savedDoseUg: Number(savedDose.toFixed(1)),
    reductionPercentage: Number(reductionPercentage.toFixed(1)),
    equivalentCigarettesAvoided,
  };
}
