import { intangibleMetricsSchema, metricWeightsSchema } from '../../src/validation/intangible';
import type { IntangibleMetrics, MetricWeights } from '../../src/types';

describe('Intangible Validation', () => {
  describe('metrics validation', () => {
    const validMetrics: IntangibleMetrics = {
      confidenceIndex: 0.8,
      skillIndex: 0.3,
      progressionIndex: 0.1,
      clientSatisfactionIndex: 0.2
    };

    it('accepts valid metrics', () => {
      const { error } = intangibleMetricsSchema.validate(validMetrics);
      expect(error).toBeUndefined();
    });

    it('accepts zero values', () => {
      const metrics = { ...validMetrics, confidenceIndex: 0 };
      const { error } = intangibleMetricsSchema.validate(metrics);
      expect(error).toBeUndefined();
    });

    it('accepts value of 1', () => {
      const metrics = { ...validMetrics, skillIndex: 1 };
      const { error } = intangibleMetricsSchema.validate(metrics);
      expect(error).toBeUndefined();
    });

    it('rejects negative values', () => {
      const metrics = { ...validMetrics, progressionIndex: -0.1 };
      const { error } = intangibleMetricsSchema.validate(metrics);
      expect(error?.message).toBe('"progressionIndex" must be greater than or equal to 0');
    });

    it('rejects values over 1', () => {
      const metrics = { ...validMetrics, clientSatisfactionIndex: 1.1 };
      const { error } = intangibleMetricsSchema.validate(metrics);
      expect(error?.message).toBe('"clientSatisfactionIndex" must be between 0 and 1');
    });
  });

  describe('weights validation', () => {
    const validWeights: MetricWeights = {
      confidenceWeight: 0.4,
      skillWeight: 0.3,
      progressionWeight: 0.2,
      clientSatisfactionWeight: 0.1
    };

    it('accepts weights that sum to 1', () => {
      const { error } = metricWeightsSchema.validate(validWeights);
      expect(error).toBeUndefined();
    });

    it('rejects weights that sum to less than 1', () => {
      const weights = { ...validWeights, confidenceWeight: 0.3 };
      const { error } = metricWeightsSchema.validate(weights);
      expect(error?.message).toBe('"value" failed custom validation because Weights must sum to 1');
    });

    it('rejects weights that sum to more than 1', () => {
      const weights = { ...validWeights, confidenceWeight: 0.5 };
      const { error } = metricWeightsSchema.validate(weights);
      expect(error?.message).toBe('"value" failed custom validation because Weights must sum to 1');
    });

    it('accepts weights within floating point precision', () => {
      const weights = {
        confidenceWeight: 0.4,
        skillWeight: 0.3,
        progressionWeight: 0.2,
        clientSatisfactionWeight: 0.1
      };
      const { error } = metricWeightsSchema.validate(weights);
      expect(error).toBeUndefined();
    });

    it('rejects negative weights', () => {
      const weights = { ...validWeights, skillWeight: -0.1 };
      const { error } = metricWeightsSchema.validate(weights);
      expect(error?.message).toContain('must be greater than or equal to 0');
    });
  });
}); 