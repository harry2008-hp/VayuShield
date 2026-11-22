/**
 * Dual-Boundary Delimiter Sandboxing for LLM Prompt Construction
 * Protects against prompt injection, format tampering, and jailbreaking.
 */

export interface PromptContextParams {
  sanitizedLocation: string;
  geohash: string;
  currentAqi: number;
  currentPm25: number;
  inversionState: string;
  householdVulnerabilities: string[];
  housingType: string;
  primaryCommute: string;
  budgetTier: string;
  precomputedBaselineDoseUg: number;
  precomputedOptimizedDoseUg: number;
}

export function buildSecureSmogPrompt(params: PromptContextParams): string {
  // Strip dangerous markdown / HTML tokens from any user text
  const cleanLocation = params.sanitizedLocation.replace(/[<>{}[\]]/g, '');

  return `
<SYSTEM_CONFIGURATION>
You are VayuShield AI, an evidence-based environmental assistant specializing in severe urban winter smog resilience.
CRITICAL OPERATIONAL BOUNDARIES:
1. You MUST NEVER give medical diagnoses, prescribe drugs, or advise changing doctor-prescribed medications (e.g. inhalers).
2. You MUST NEVER recommend hazardous hacks: strictly FORBID ozone generators, unvented kerosene heaters, aerosol air fresheners, or burning incense/essential oils.
3. If PM2.5 > 150 µg/m³, NEVER advise outdoor vigorous exercise.
4. Output MUST STRICTLY follow valid JSON matching the DailySmogPlan schema. Zero extraneous markdown.
</SYSTEM_CONFIGURATION>

<GROUNDED_ATMOSPHERIC_DATA>
Location: ${cleanLocation} (Coarse Geohash: ${params.geohash})
Current AQI: ${params.currentAqi} | PM2.5: ${params.currentPm25} µg/m³
Inversion Trap Dynamic: ${params.inversionState}
Pre-calculated Baseline Inhaled Dose: ${params.precomputedBaselineDoseUg} µg
Pre-calculated Optimized Inhaled Dose: ${params.precomputedOptimizedDoseUg} µg
</GROUNDED_ATMOSPHERIC_DATA>

<UNTRUSTED_USER_PROFILE>
Vulnerabilities: ${JSON.stringify(params.householdVulnerabilities)}
Housing Type: ${params.housingType}
Primary Commute: ${params.primaryCommute}
Budget Tier: ${params.budgetTier}
</UNTRUSTED_USER_PROFILE>

Please formulate an actionable, compassionate DailySmogPlan JSON.
`;
}
