import { EnvironmentalSnapshot, HourlyForecast } from '../types';

export const CITIES_DATABASE: Record<string, EnvironmentalSnapshot> = {
  'New Delhi': {
    city: 'New Delhi (NCR)',
    currentAqi: 428,
    currentPm25: 385,
    currentTempC: 13,
    currentPblMeters: 140, // Shallow winter morning inversion layer
    inversionState: 'severe_trap',
    windSpeedKmh: 3.2,
    dominantSource: 'Agricultural Residue Smog + Radiative Ground Inversion + Cold Starts',
    lastUpdated: '10 mins ago (Live Inversion Feed)',
    hourlyData: [
      { hour: 5, timeLabel: '05:00 AM', pm25: 410, aqi: 450, temperatureC: 11, boundaryLayerMeters: 110, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Seal doors with damp cloth; postpone morning walks' },
      { hour: 6, timeLabel: '06:00 AM', pm25: 445, aqi: 470, temperatureC: 10, boundaryLayerMeters: 120, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'No outdoor school assembly; keep kids in sealed indoor room' },
      { hour: 7, timeLabel: '07:00 AM', pm25: 460, aqi: 485, temperatureC: 11, boundaryLayerMeters: 130, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Switch commute to AC metro / closed vehicle; wear N95' },
      { hour: 8, timeLabel: '08:00 AM', pm25: 450, aqi: 475, temperatureC: 13, boundaryLayerMeters: 150, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Peak vehicular exhaust trapped near surface. Keep windows closed' },
      { hour: 9, timeLabel: '09:00 AM', pm25: 390, aqi: 420, temperatureC: 15, boundaryLayerMeters: 180, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Run DIY Corsi-Rosenthal box on medium speed' },
      { hour: 10, timeLabel: '10:00 AM', pm25: 320, aqi: 370, temperatureC: 18, boundaryLayerMeters: 260, smogStatus: 'moderate_inversion', activitySafety: 'unhealthy', recommendedAction: 'Boundary layer beginning slow thermal expansion' },
      { hour: 11, timeLabel: '11:00 AM', pm25: 240, aqi: 290, temperatureC: 21, boundaryLayerMeters: 420, smogStatus: 'moderate_inversion', activitySafety: 'unhealthy', recommendedAction: 'Ground warming initiates gentle atmospheric mixing' },
      { hour: 12, timeLabel: '12:00 PM', pm25: 165, aqi: 215, temperatureC: 23, boundaryLayerMeters: 680, smogStatus: 'active_dispersion', activitySafety: 'caution', recommendedAction: 'Safest window begins. Ideal for quick grocery runs & outdoor transit' },
      { hour: 13, timeLabel: '01:00 PM', pm25: 140, aqi: 195, temperatureC: 24, boundaryLayerMeters: 850, smogStatus: 'active_dispersion', activitySafety: 'safe', recommendedAction: 'Peak Solar Dispersion! Best 90-min window for essential outdoor tasks' },
      { hour: 14, timeLabel: '02:00 PM', pm25: 145, aqi: 200, temperatureC: 24, boundaryLayerMeters: 820, smogStatus: 'active_dispersion', activitySafety: 'safe', recommendedAction: 'Solar radiation peak. Safe window for quick cross-ventilation if indoor AQI > 150' },
      { hour: 15, timeLabel: '03:00 PM', pm25: 175, aqi: 225, temperatureC: 23, boundaryLayerMeters: 690, smogStatus: 'active_dispersion', activitySafety: 'caution', recommendedAction: 'Sun angle lowering; prepare to reseal indoor living spaces' },
      { hour: 16, timeLabel: '04:00 PM', pm25: 230, aqi: 280, temperatureC: 21, boundaryLayerMeters: 480, smogStatus: 'moderate_inversion', activitySafety: 'unhealthy', recommendedAction: 'Evening temperature inversion initiating; avoid outdoor exercise' },
      { hour: 17, timeLabel: '05:00 PM', pm25: 310, aqi: 360, temperatureC: 18, boundaryLayerMeters: 310, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Evening rush hour emissions trapped in collapsing boundary layer' },
      { hour: 18, timeLabel: '06:00 PM', pm25: 380, aqi: 415, temperatureC: 16, boundaryLayerMeters: 210, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Reseal all entryways; switch on bedroom filtration units' },
      { hour: 19, timeLabel: '07:00 PM', pm25: 405, aqi: 440, temperatureC: 15, boundaryLayerMeters: 160, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Kitchen cross-ventilation isolation during dinner cooking' },
      { hour: 20, timeLabel: '08:00 PM', pm25: 420, aqi: 450, temperatureC: 14, boundaryLayerMeters: 140, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Nighttime radiative cooling seals ground air tightly' },
      { hour: 21, timeLabel: '09:00 PM', pm25: 415, aqi: 445, temperatureC: 13, boundaryLayerMeters: 130, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Wet-mop bedroom floor to trap settled dust before sleeping' },
    ]
  },
  'Lahore': {
    city: 'Lahore (Punjab Basin)',
    currentAqi: 395,
    currentPm25: 345,
    currentTempC: 14,
    currentPblMeters: 160,
    inversionState: 'severe_trap',
    windSpeedKmh: 4.0,
    dominantSource: 'Industrial Particulate + Low Boundary Wind Stagnation',
    lastUpdated: '15 mins ago',
    hourlyData: [
      { hour: 6, timeLabel: '06:00 AM', pm25: 390, aqi: 420, temperatureC: 12, boundaryLayerMeters: 130, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Extreme morning ground stagnation' },
      { hour: 9, timeLabel: '09:00 AM', pm25: 350, aqi: 400, temperatureC: 15, boundaryLayerMeters: 190, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Avoid open-window commute; use train/rideshare' },
      { hour: 13, timeLabel: '01:00 PM', pm25: 150, aqi: 205, temperatureC: 22, boundaryLayerMeters: 750, smogStatus: 'active_dispersion', activitySafety: 'safe', recommendedAction: 'Sun warming lifts inversion layer' },
      { hour: 18, timeLabel: '06:00 PM', pm25: 360, aqi: 410, temperatureC: 16, boundaryLayerMeters: 200, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Nocturnal inversion reformulates' },
    ]
  },
  'Salt Lake City': {
    city: 'Salt Lake City (Wasatch Inversion)',
    currentAqi: 172,
    currentPm25: 96,
    currentTempC: -2,
    currentPblMeters: 210,
    inversionState: 'severe_trap',
    windSpeedKmh: 2.1,
    dominantSource: 'Valley Basin Inversion + Wood Smoke + Vehicle Idling',
    lastUpdated: '12 mins ago',
    hourlyData: [
      { hour: 7, timeLabel: '07:00 AM', pm25: 110, aqi: 180, temperatureC: -4, boundaryLayerMeters: 180, smogStatus: 'severe_trap', activitySafety: 'unhealthy', recommendedAction: 'Cold air trapped in valley basin' },
      { hour: 13, timeLabel: '01:00 PM', pm25: 65, aqi: 155, temperatureC: 3, boundaryLayerMeters: 450, smogStatus: 'moderate_inversion', activitySafety: 'caution', recommendedAction: 'Partial thermal mixing on hillside exposures' },
      { hour: 18, timeLabel: '06:00 PM', pm25: 98, aqi: 173, temperatureC: -1, boundaryLayerMeters: 220, smogStatus: 'severe_trap', activitySafety: 'unhealthy', recommendedAction: 'Evening wood-smoke buildup in low elevations' },
    ]
  },
  'Beijing': {
    city: 'Beijing (Northern Plain Basin)',
    currentAqi: 245,
    currentPm25: 195,
    currentTempC: 2,
    currentPblMeters: 280,
    inversionState: 'moderate_inversion',
    windSpeedKmh: 5.4,
    dominantSource: 'Coal Heating Regional Transport + Low Wind',
    lastUpdated: '8 mins ago',
    hourlyData: [
      { hour: 7, timeLabel: '07:00 AM', pm25: 230, aqi: 280, temperatureC: 0, boundaryLayerMeters: 220, smogStatus: 'severe_trap', activitySafety: 'hazardous', recommendedAction: 'Sub-zero morning inversion cap' },
      { hour: 13, timeLabel: '01:00 PM', pm25: 120, aqi: 185, temperatureC: 6, boundaryLayerMeters: 620, smogStatus: 'active_dispersion', activitySafety: 'caution', recommendedAction: 'Northwesterly breeze assisting dispersion' },
      { hour: 19, timeLabel: '07:00 PM', pm25: 210, aqi: 260, temperatureC: 1, boundaryLayerMeters: 290, smogStatus: 'moderate_inversion', activitySafety: 'unhealthy', recommendedAction: 'Residential heating demand spikes' },
    ]
  }
};
