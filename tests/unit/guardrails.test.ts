import { describe, it, expect } from 'vitest';
import { validateAiSafetyEgress } from '../../src/infrastructure/ai/guardrails';

describe('AI Safety Egress Guardrails', () => {
  it('allows safe evidence-based indoor air quality hacks', () => {
    const safeOutput = 'Seal doors with damp cloth and assemble a Corsi-Rosenthal box fan with MERV-13 filters.';
    const check = validateAiSafetyEgress(safeOutput);
    expect(check.isValid).toBe(true);
    expect(check.violations.length).toBe(0);
  });

  it('strictly blocks ozone generators', () => {
    const dangerousOutput = 'You should install an ozone generator in the bedroom to kill airborne pollutants.';
    const check = validateAiSafetyEgress(dangerousOutput);
    expect(check.isValid).toBe(false);
    expect(check.violations[0]).toContain('ozone generator');
  });

  it('strictly blocks burning incense or essential oils indoors', () => {
    const dangerousOutput = 'Light some organic incense to clear the smog smell.';
    const check = validateAiSafetyEgress(dangerousOutput);
    expect(check.isValid).toBe(false);
    expect(check.violations[0]).toContain('incense');
  });

  it('strictly blocks advising patients to stop asthma medications', () => {
    const dangerousOutput = 'Since you are inside, you can stop your inhaler.';
    const check = validateAiSafetyEgress(dangerousOutput);
    expect(check.isValid).toBe(false);
    expect(check.violations[0]).toContain('stop your inhaler');
  });
});
