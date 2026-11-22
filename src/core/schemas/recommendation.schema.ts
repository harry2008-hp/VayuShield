import { z } from 'zod';

export const TieredActionSchema = z.object({
  id: z.string(),
  tier: z.enum(['zero_cost_routine', 'diy_low_cost_iaq', 'community_sustainable_swap']),
  headline: z.string().min(5).max(100),
  targetTimeWindow: z.string(),
  practicalSteps: z.array(z.string().min(5).max(200)).min(2).max(4),
  healthRationale: z.string().max(300),
  metrics: z.object({
    pm25DoseReductionPct: z.number().min(0).max(100),
    co2SavedKg: z.number().min(0),
    estimatedCostUsd: z.number().min(0),
    frictionLevel: z.enum(['minimal', 'moderate', 'high']),
  }),
});

export const DailySmogPlanSchema = z.object({
  forecastSummary: z.string().max(300),
  inversionWindow: z.object({
    isSevereInversionPresent: z.boolean(),
    peakTrapHours: z.string(),
    safestDispersionHours: z.string(),
  }),
  actions: z.array(TieredActionSchema).min(3).max(6),
  communityImpactSummary: z.string().max(250),
  emergencyAdvisoryNotice: z.string(),
});

export type TieredAction = z.infer<typeof TieredActionSchema>;
export type DailySmogPlan = z.infer<typeof DailySmogPlanSchema>;
