import { describe, it, expect } from 'vitest';
import { calculateCorsiRosenthalPerformance } from '../../src/core/domain/cadrSizer';

describe('Corsi-Rosenthal Box Sizer Domain Logic', () => {
  it('correctly calculates CADR and ACH for a typical bedroom', () => {
    // 15ft x 12ft x 9ft room = 1620 cu ft
    // 1200 CFM fan, 4 filters (0.55 derating), MERV-13 (85% efficiency)
    const result = calculateCorsiRosenthalPerformance({
      roomLengthFt: 15,
      roomWidthFt: 12,
      roomHeightFt: 9,
      fanCfm: 1200,
      filterRating: 'MERV-13',
      filterCount: 4,
    });

    // Effective airflow = 1200 * 0.55 = 660 CFM
    // CADR = 660 * 0.85 = 561 CFM
    expect(result.effectiveCadrCfm).toBe(561);
    expect(result.roomVolumeCuFt).toBe(1620);
    // ACH = (561 * 60) / 1620 = 20.78 ACH
    expect(result.ach).toBeGreaterThan(15);
    expect(result.efficacyScore).toBe('Medical-Grade (5+ ACH)');
  });

  it('correctly assesses sub-optimal configuration for large hall with weak fan', () => {
    // 40ft x 30ft x 12ft hall = 14400 cu ft
    // 600 CFM small fan
    const result = calculateCorsiRosenthalPerformance({
      roomLengthFt: 40,
      roomWidthFt: 30,
      roomHeightFt: 12,
      fanCfm: 600,
      filterRating: 'MERV-13',
      filterCount: 4,
    });

    expect(result.ach).toBeLessThan(3.0);
    expect(result.efficacyScore).toBe('Sub-Optimal');
  });
});
