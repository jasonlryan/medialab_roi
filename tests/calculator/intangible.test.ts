import { calculateIntangibleScore } from '../../src/calculator/intangible';
import type { IntangibleMetrics, MetricWeights } from '../../src/types';

describe('Intangible Score Calculator', () => {
  // Test data from ROI model documentation
  const validMetrics: IntangibleMetrics = {
    confidenceIndex: 0.8,      // 80% staff reporting high confidence
    skillIndex: 0.3,          // 30% staff with advanced GPT usage
    progressionIndex: 0.1,    // 10% role progressions
    clientSatisfactionIndex: 0.2  // 20-point NPS increase
  };

  const validWeights: MetricWeights = {
    confidenceWeight: 0.4,
    skillWeight: 0.3,
    progressionWeight: 0.2,
    clientSatisfactionWeight: 0.1
  };

  describe('calculation', () => {
    it('calculates score correctly using example from documentation', () => {
      const result = calculateIntangibleScore(validMetrics, validWeights);
      // 0.4 × 0.8 + 0.3 × 0.3 + 0.2 × 0.1 + 0.1 × 0.2 = 0.45
      expect(result).toBe(0.45);
    });
  });

  describe('weight validation', () => {
    it('throws error when weights sum to less than 1', () => {
      const invalidWeights = { ...validWeights, confidenceWeight: 0.3 }; // Sum = 0.9
      expect(() => calculateIntangibleScore(validMetrics, invalidWeights))
        .toThrow('Weights must sum to 1');
    });

    it('throws error when weights sum to more than 1', () => {
      const invalidWeights = { ...validWeights, confidenceWeight: 0.5 }; // Sum = 1.1
      expect(() => calculateIntangibleScore(validMetrics, invalidWeights))
        .toThrow('Weights must sum to 1');
    });

    it('accepts weights that sum to 1 within floating point precision', () => {
      const preciseWeights = {
        confidenceWeight: 0.4,
        skillWeight: 0.3,
        progressionWeight: 0.2,
        clientSatisfactionWeight: 0.1
      };
      expect(() => calculateIntangibleScore(validMetrics, preciseWeights)).not.toThrow();
    });
  });

  describe('metric validation', () => {
    it('throws error for negative metric values', () => {
      const invalidMetrics = { ...validMetrics, confidenceIndex: -0.1 };
      expect(() => calculateIntangibleScore(invalidMetrics, validWeights))
        .toThrow('confidenceIndex must be between 0 and 1');
    });

    it('throws error for metric values over 1', () => {
      const invalidMetrics = { ...validMetrics, skillIndex: 1.1 };
      expect(() => calculateIntangibleScore(invalidMetrics, validWeights))
        .toThrow('skillIndex must be between 0 and 1');
    });

    it('accepts zero values', () => {
      const zeroMetrics = { ...validMetrics, progressionIndex: 0 };
      expect(() => calculateIntangibleScore(zeroMetrics, validWeights)).not.toThrow();
    });

    it('accepts value of exactly 1', () => {
      const perfectMetrics = { ...validMetrics, confidenceIndex: 1 };
      expect(() => calculateIntangibleScore(perfectMetrics, validWeights)).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('returns 0 when all metrics are 0', () => {
      const zeroMetrics: IntangibleMetrics = {
        confidenceIndex: 0,
        skillIndex: 0,
        progressionIndex: 0,
        clientSatisfactionIndex: 0
      };
      expect(calculateIntangibleScore(zeroMetrics, validWeights)).toBe(0);
    });

    it('returns 1 when all metrics are 1', () => {
      const perfectMetrics: IntangibleMetrics = {
        confidenceIndex: 1,
        skillIndex: 1,
        progressionIndex: 1,
        clientSatisfactionIndex: 1
      };
      expect(calculateIntangibleScore(perfectMetrics, validWeights)).toBe(1);
    });
  });
}); 