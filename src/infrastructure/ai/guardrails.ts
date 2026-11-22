/**
 * Medical & Environmental Safety Guardrail Egress Filter
 * Scans generated AI advice to guarantee that unsafe DIY hacks or dangerous medical guidance
 * never reaches the end user.
 */

export interface GuardrailCheckResult {
  isValid: boolean;
  violations: string[];
  safeSanitizedText?: string;
}

const FORBIDDEN_INTERVENTIONS = [
  { term: 'ozone generator', reason: 'Ozone is a severe lung irritant that worsens asthma and COPD.' },
  { term: 'ionizer with ozone', reason: 'Unregulated ionizers produce secondary ozone.' },
  { term: 'incense', reason: 'Incense combustion adds massive indoor PM2.5, benzene, and PAHs.' },
  { term: 'essential oil', reason: 'Aerosolized terpenes react with ambient ozone to form ultrafine particles.' },
  { term: 'unvented kerosene', reason: 'Produces hazardous carbon monoxide and nitrogen dioxide.' },
  { term: 'stop your inhaler', reason: 'Prescription respiratory medication must never be discontinued.' },
  { term: 'exercise outdoors regardless', reason: 'Vigorous outdoor exercise during smog peaks increases lung deposition tenfold.' },
];

export function validateAiSafetyEgress(rawOutput: string): GuardrailCheckResult {
  const lower = rawOutput.toLowerCase();
  const violations: string[] = [];

  for (const item of FORBIDDEN_INTERVENTIONS) {
    if (lower.includes(item.term)) {
      violations.push(`Hazardous Term Detected: "${item.term}" - ${item.reason}`);
    }
  }

  return {
    isValid: violations.length === 0,
    violations,
  };
}

export const MANDATORY_ADVISORY_NOTICE = 
  "VayuShield AI provides environmental resilience advice only. It does not provide medical diagnosis or treatment. For breathing difficulty, asthma flares, or chest discomfort, seek immediate medical care.";
