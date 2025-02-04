import { calculateTangibleROI, calculateROIMetrics } from '../../src/calculator/tangible';
import type { ROIProject } from '../../src/types';

describe('Tangible ROI Calculator', () => {
  describe('calculateTangibleROI', () => {
    it('calculates ROI correctly for the example case', () => {
      const result = calculateTangibleROI({
        annualHoursSaved: 1000,
        hourlyRate: 50,
        annualImplementationCost: 30000
      });
      
      // From ROI model doc: ((50000 - 30000) / 30000) * 100 = 66.7%
      expect(result).toBe(66.67);
    });

    it('throws error for negative implementation cost', () => {
      expect(() => calculateTangibleROI({
        annualHoursSaved: 1000,
        hourlyRate: 50,
        annualImplementationCost: -1000
      })).toThrow('Annual implementation cost must be positive');
    });

    it('throws error for zero implementation cost', () => {
      expect(() => calculateTangibleROI({
        annualHoursSaved: 1000,
        hourlyRate: 50,
        annualImplementationCost: 0
      })).toThrow('Annual implementation cost must be positive');
    });

    it('handles zero hours saved (complete loss)', () => {
      const result = calculateTangibleROI({
        annualHoursSaved: 0,
        hourlyRate: 50,
        annualImplementationCost: 30000
      });
      
      // When no hours saved, ROI is -100% (complete loss)
      expect(result).toBe(-100);
    });
  });

  describe('calculateROIMetrics', () => {
    const sampleProject: ROIProject = {
      projectName: "Test Project",
      startDate: "2024-02-04",
      annualHoursSaved: 1000,
      hourlyRate: 50,
      annualImplementationCost: 30000,
      intangibleMetrics: {
        confidenceIndex: 0.8,
        skillIndex: 0.3,
        progressionIndex: 0.1,
        clientSatisfactionIndex: 0.2
      },
      weights: {
        confidenceWeight: 0.4,
        skillWeight: 0.3,
        progressionWeight: 0.2,
        clientSatisfactionWeight: 0.1
      }
    };

    it('calculates full metrics correctly', () => {
      const result = calculateROIMetrics(sampleProject);

      expect(result.projectName).toBe("Test Project");
      expect(result.tangibleROI).toBe(66.67);
      expect(result.annualSavings).toBe(50000);
      expect(result.implementationCost).toBe(30000);
      expect(result.calculatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/); // ISO date format
    });

    it('sets intangible score to 0 (calculated separately)', () => {
      const result = calculateROIMetrics(sampleProject);
      expect(result.intangibleScore).toBe(0);
    });
  });
}); 