export type VulnerabilityCategory = 'infant' | 'asthma_copd' | 'elderly' | 'cardiac' | 'pregnant' | 'healthy_adult';

export type HousingType = 'ground_floor' | 'mid_high_rise' | 'leaky_vintage' | 'modern_sealed';

export type CommuteMode = 'two_wheeler' | 'walking_cycling' | 'auto_rickshaw' | 'metro_bus' | 'car_ac';

export type BudgetTier = 'zero_cost' | 'low_cost_diy' | 'tech_equipped';

export interface HouseholdProfile {
  city: string;
  pinCode: string;
  geohash: string; // Coarsened for privacy
  vulnerabilities: VulnerabilityCategory[];
  housingType: HousingType;
  primaryCommute: CommuteMode;
  budgetTier: BudgetTier;
  hasAirPurifier: boolean;
}

export type SmogTrapLevel = 'severe_trap' | 'moderate_inversion' | 'active_dispersion';

export interface HourlyForecast {
  hour: number; // 0 - 23
  timeLabel: string; // e.g. "06:00 AM"
  pm25: number; // µg/m³
  aqi: number;
  temperatureC: number;
  boundaryLayerMeters: number; // Planetary Boundary Layer height in meters
  smogStatus: SmogTrapLevel;
  activitySafety: 'hazardous' | 'unhealthy' | 'caution' | 'safe';
  recommendedAction: string;
}

export interface EnvironmentalSnapshot {
  city: string;
  currentAqi: number;
  currentPm25: number; // µg/m³
  currentTempC: number;
  currentPblMeters: number;
  inversionState: SmogTrapLevel;
  windSpeedKmh: number;
  dominantSource: string; // e.g., "Biomass Burning + Vehicular Cold Starts"
  hourlyData: HourlyForecast[];
  lastUpdated: string;
}

export interface RoutineItem {
  id: string;
  timeSlot: string;
  actionTitle: string;
  shiftFrom: string;
  shiftTo: string;
  pm25ExposureAvoidedPct: number;
  explanation: string;
  iconName: 'sun' | 'moon' | 'wind' | 'home' | 'car' | 'activity';
  statusCategory: 'routine_shift' | 'iaq_hack' | 'sustainable_commute';
  active: boolean;
}

export interface CorsiRosenthalParams {
  roomLengthFt: number;
  roomWidthFt: number;
  roomHeightFt: number;
  fanCfm: number;
  filterRating: 'MERV-13' | 'MERV-14' | 'HEPA';
  filterCount: 4 | 5;
}

export interface CorsiRosenthalResult {
  roomAreaSqFt: number;
  roomVolumeCuFt: number;
  effectiveCadrCfm: number;
  ach: number; // Air Changes per Hour
  efficacyScore: 'Sub-Optimal' | 'Adequate (3-4 ACH)' | 'Medical-Grade (5+ ACH)';
  estimatedDiyCostUsd: number;
}
