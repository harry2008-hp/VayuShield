/**
 * Corsi-Rosenthal Box Air Filtration Sizing Engine
 * Models single-pass particle removal efficiency, static pressure derating,
 * Clean Air Delivery Rate (CADR in CFM), and Air Changes per Hour (ACH).
 * Reference: ASHRAE Standard 62.2 / Dr. Richard Corsi & Jim Rosenthal filtration studies.
 */

import { CorsiRosenthalParams, CorsiRosenthalResult } from '../../types';

export const FILTER_EFFICIENCY: Record<CorsiRosenthalParams['filterRating'], number> = {
  'MERV-13': 0.85, // 85% capture of 0.3 - 1.0 µm PM2.5
  'MERV-14': 0.90, // 90% capture
  'HEPA': 0.9997,  // 99.97% capture
};

export function calculateCorsiRosenthalPerformance(params: CorsiRosenthalParams): CorsiRosenthalResult {
  const roomAreaSqFt = params.roomLengthFt * params.roomWidthFt;
  const roomVolumeCuFt = roomAreaSqFt * params.roomHeightFt;

  // Derating factor due to pressure drop across parallel filter pleats
  // 5 filters (compactor cube) has lower resistance than 4 filters
  const airflowDeratingFactor = params.filterCount === 5 ? 0.65 : 0.55;
  const effectiveAirflowCfm = params.fanCfm * airflowDeratingFactor;

  const efficiency = FILTER_EFFICIENCY[params.filterRating];
  const effectiveCadrCfm = Math.round(effectiveAirflowCfm * efficiency);

  // ACH = (CADR in CFM * 60 minutes) / Room Volume (cu ft)
  const ach = roomVolumeCuFt > 0 ? Number(((effectiveCadrCfm * 60) / roomVolumeCuFt).toFixed(1)) : 0;

  let efficacyScore: CorsiRosenthalResult['efficacyScore'] = 'Adequate (3-4 ACH)';
  if (ach < 3.0) {
    efficacyScore = 'Sub-Optimal';
  } else if (ach >= 5.0) {
    efficacyScore = 'Medical-Grade (5+ ACH)';
  }

  // Cost estimation: Box fan ($25) + 4-5 filters ($10-$15 each) + Duct tape & cardboard ($5)
  const filterUnitCost = params.filterRating === 'HEPA' ? 25 : 12;
  const estimatedDiyCostUsd = 25 + params.filterCount * filterUnitCost + 5;

  return {
    roomAreaSqFt,
    roomVolumeCuFt,
    effectiveCadrCfm,
    ach,
    efficacyScore,
    estimatedDiyCostUsd,
  };
}
