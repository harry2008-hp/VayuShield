import { describe, it, expect } from 'vitest';
import { classifyInversionTrap } from '../../src/core/domain/inversionModel';

describe('Inversion Model Domain Logic', () => {
  it('identifies severe winter smog trap under cold shallow boundary conditions', () => {
    const result = classifyInversionTrap({
      pblHeightMeters: 120, // Shallow boundary layer
      windSpeedKmh: 3.0,    // Calms
      temperatureC: 11,
      hourOfDay: 7,         // Morning peak
    });

    expect(result.status).toBe('severe_trap');
    expect(result.isDispersionFavorable).toBe(false);
    expect(result.trapIntensityScore).toBeGreaterThanOrEqual(65);
  });

  it('identifies active thermal dispersion at solar noon', () => {
    const result = classifyInversionTrap({
      pblHeightMeters: 850, // Expanded boundary layer
      windSpeedKmh: 8.5,
      temperatureC: 24,
      hourOfDay: 13,        // 1 PM solar peak
    });

    expect(result.status).toBe('active_dispersion');
    expect(result.isDispersionFavorable).toBe(true);
  });
});
