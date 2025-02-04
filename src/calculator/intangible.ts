import { IntangibleMetrics, MetricWeights } from '../types';

/**
 * Validates that weights sum to 1 (within floating point precision)
 * 
 * @param weights The metric weights to validate
 * @throws Error if weights don't sum to 1
 */
function validateWeights(weights: MetricWeights): void {
  const sum = Object.values(weights).reduce((acc, weight) => acc + weight, 0);
  // Allow for small floating point differences
  if (Math.abs(sum - 1) > 0.0001) {
    throw new Error('Weights must sum to 1');
  }
}

/**
 * Validates that all metrics are between 0 and 1
 * 
 * @param metrics The intangible metrics to validate
 * @throws Error if any metric is outside valid range
 */
function validateMetrics(metrics: IntangibleMetrics): void {
  Object.entries(metrics).forEach(([key, value]) => {
    if (value < 0 || value > 1) {
      throw new Error(`${key} must be between 0 and 1`);
    }
  });
}

/**
 * Calculates the intangible value score
 * Formula: Sum of (weight × index) for each metric
 * 
 * @param metrics The intangible metrics (each 0-1)
 * @param weights The weights for each metric (must sum to 1)
 * @returns Score between 0 and 1
 */
export function calculateIntangibleScore(
  metrics: IntangibleMetrics,
  weights: MetricWeights
): number {
  validateWeights(weights);
  validateMetrics(metrics);

  const {
    confidenceIndex,
    skillIndex,
    progressionIndex,
    clientSatisfactionIndex,
  } = metrics;

  const {
    confidenceWeight,
    skillWeight,
    progressionWeight,
    clientSatisfactionWeight,
  } = weights;

  const score = 
    confidenceWeight * confidenceIndex +
    skillWeight * skillIndex +
    progressionWeight * progressionIndex +
    clientSatisfactionWeight * clientSatisfactionIndex;

  // Round to 2 decimal places
  return Number(score.toFixed(2));
}
