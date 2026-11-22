/**
 * Atmospheric Boundary Layer & Thermal Inversion Classifier
 * Winter smog is trapped when the Planetary Boundary Layer (PBL) collapses close to the ground (<200m)
 * and wind speed is low (<5 km/h), creating an inversion cap.
 */

import { SmogTrapLevel } from '../../types';

export interface InversionInputs {
  pblHeightMeters: number;
  windSpeedKmh: number;
  temperatureC: number;
  hourOfDay: number; // 0 - 23
}

export function classifyInversionTrap(inputs: InversionInputs): {
  status: SmogTrapLevel;
  description: string;
  isDispersionFavorable: boolean;
  trapIntensityScore: number; // 0 (Clear) to 100 (Deadly Trap)
} {
  const { pblHeightMeters, windSpeedKmh, hourOfDay } = inputs;

  // Severe nocturnal / morning inversion conditions:
  // Shallow boundary layer (< 250m) and low surface wind (< 6 km/h) typically between 04:00 and 10:30
  const isMorningWindow = hourOfDay >= 5 && hourOfDay <= 10;
  const isEveningWindow = hourOfDay >= 18 && hourOfDay <= 23;
  const isMiddayDispersion = hourOfDay >= 12 && hourOfDay <= 15;

  let score = 0;
  if (pblHeightMeters < 150) score += 50;
  else if (pblHeightMeters < 300) score += 30;
  else if (pblHeightMeters < 600) score += 10;

  if (windSpeedKmh < 4) score += 35;
  else if (windSpeedKmh < 8) score += 20;

  if (isMorningWindow || isEveningWindow) score += 15;

  score = Math.min(100, score);

  if (score >= 65 || (pblHeightMeters < 200 && windSpeedKmh < 5)) {
    return {
      status: 'severe_trap',
      description: 'Severe Winter Inversion Trap: Cold ground air sealed under warm ceiling. Zero vertical dispersion.',
      isDispersionFavorable: false,
      trapIntensityScore: score,
    };
  }

  if (score >= 35 && !isMiddayDispersion) {
    return {
      status: 'moderate_inversion',
      description: 'Moderate Inversion: Slow mixing layer with accumulation of localized emissions.',
      isDispersionFavorable: false,
      trapIntensityScore: score,
    };
  }

  return {
    status: 'active_dispersion',
    description: 'Active Thermal Dispersion: Solar warming has lifted boundary layer. Safest window for outdoor shifts.',
    isDispersionFavorable: true,
    trapIntensityScore: score,
  };
}
