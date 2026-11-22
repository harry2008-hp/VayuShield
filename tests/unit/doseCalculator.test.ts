import { describe, it, expect } from 'vitest';
import { calculateSegmentDose, calculateRoutineSavings, MINUTE_VENTILATION_RATES } from '../../src/core/domain/doseCalculator';

describe('Dose Calculator Domain Logic', () => {
  it('has calibrated EPA minute ventilation rates', () => {
    // Adult sedentary breathing rate should be 0.009 m³/min
    expect(MINUTE_VENTILATION_RATES.adult.sedentary).toBe(0.009);
    // Child vigorous exercise should be 0.028 m³/min
    expect(MINUTE_VENTILATION_RATES.child.vigorous_exercise).toBe(0.028);
  });

  it('calculates correct inhaled dose for an asthmatic child during vigorous exercise', () => {
    const dose = calculateSegmentDose({
      durationMinutes: 60,
      pm25Concentration: 350, // 350 µg/m³ severe smog
      isIndoor: false,
      activity: 'vigorous_exercise',
      age: 'child',
    });
    // Inhaled volume = 0.028 m³/min * 60 min = 1.68 m³
    // Inhaled mass = 1.68 m³ * 350 µg/m³ = 588.0 µg
    expect(dose).toBe(588.0);
  });

  it('correctly calculates indoor filtration protection factor', () => {
    // Room with DIY Corsi-Rosenthal filter (indoor protection factor ~0.15)
    const filteredDose = calculateSegmentDose({
      durationMinutes: 120,
      pm25Concentration: 300,
      isIndoor: true,
      indoorProtectionFactor: 0.15,
      activity: 'sedentary',
      age: 'adult',
    });
    // Effective indoor concentration = 300 * 0.15 = 45 µg/m³
    // Adult sedentary ventilation = 0.009 m³/min * 120 min = 1.08 m³
    // Inhaled dose = 45 * 1.08 = 48.6 µg
    expect(filteredDose).toBe(48.6);
  });

  it('computes routine mitigation savings and equivalent cigarettes avoided', () => {
    const baseline = [
      { durationMinutes: 60, pm25Concentration: 400, isIndoor: false, activity: 'light_exercise' as const, age: 'adult' as const },
    ];
    const optimized = [
      { durationMinutes: 60, pm25Concentration: 140, isIndoor: false, activity: 'light_exercise' as const, age: 'adult' as const },
    ];

    const results = calculateRoutineSavings(baseline, optimized);
    // Baseline = 400 * 0.022 * 60 = 528.0 µg
    // Optimized = 140 * 0.022 * 60 = 184.8 µg
    // Saved = 343.2 µg
    expect(results.baselineDoseUg).toBe(528.0);
    expect(results.optimizedDoseUg).toBe(184.8);
    expect(results.savedDoseUg).toBe(343.2);
    expect(results.reductionPercentage).toBe(65.0);
    // Berkeley Earth factor: 343.2 / 22 ~ 15.6 cigarettes
    expect(results.equivalentCigarettesAvoided).toBe(15.6);
  });
});
