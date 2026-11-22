/**
 * Environmental Emissions Abatement Calculator
 * Computes avoided CO2e (kg) and NOx (grams) from commute shifts, carpooling, and heating alternatives.
 * Reference: UK DEFRA Greenhouse Gas Conversion Factors & US EPA AP-42.
 */

export interface CommuteShiftParams {
  distanceKm: number;
  originalMode: 'car_solo' | 'two_wheeler_petrol' | 'auto_rickshaw';
  targetMode: 'metro_rail' | 'electric_bus' | 'carpool_3plus' | 'bicycle_e_scooter';
  frequencyPerWeek: number;
}

// Emissions in kg CO2e per passenger-kilometer
const CO2_FACTORS: Record<string, number> = {
  car_solo: 0.170, // Average petrol/diesel passenger car solo
  two_wheeler_petrol: 0.084, // Motorbike / scooter
  auto_rickshaw: 0.095,
  carpool_3plus: 0.057, // Split across 3+ passengers
  metro_rail: 0.028,
  electric_bus: 0.035,
  bicycle_e_scooter: 0.005,
};

// NOx in grams per passenger-kilometer
const NOX_FACTORS: Record<string, number> = {
  car_solo: 0.45,
  two_wheeler_petrol: 0.28,
  auto_rickshaw: 0.38,
  carpool_3plus: 0.15,
  metro_rail: 0.02,
  electric_bus: 0.04,
  bicycle_e_scooter: 0.0,
};

export function calculateCommuteEmissionsSaved(params: CommuteShiftParams): {
  co2SavedKgPerTrip: number;
  co2SavedKgPerMonth: number;
  noxSavedGramsPerTrip: number;
  noxSavedGramsPerMonth: number;
} {
  const origCo2 = CO2_FACTORS[params.originalMode] * params.distanceKm;
  const targetCo2 = CO2_FACTORS[params.targetMode] * params.distanceKm;
  const co2SavedPerTrip = Math.max(0, origCo2 - targetCo2);

  const origNox = NOX_FACTORS[params.originalMode] * params.distanceKm;
  const targetNox = NOX_FACTORS[params.targetMode] * params.distanceKm;
  const noxSavedPerTrip = Math.max(0, origNox - targetNox);

  const tripsPerMonth = params.frequencyPerWeek * 4;

  return {
    co2SavedKgPerTrip: Number(co2SavedPerTrip.toFixed(2)),
    co2SavedKgPerMonth: Number((co2SavedPerTrip * tripsPerMonth).toFixed(1)),
    noxSavedGramsPerTrip: Number(noxSavedPerTrip.toFixed(2)),
    noxSavedGramsPerMonth: Number((noxSavedPerTrip * tripsPerMonth).toFixed(1)),
  };
}
