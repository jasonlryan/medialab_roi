import { ROIProject, ROICalculationResult } from '../types';

/**
 * Input type for tangible ROI calculation
 */
interface TangibleROIInput {
  annualHoursSaved: number;
  hourlyRate: number;
  annualImplementationCost: number;
}

/**
 * Calculates the tangible ROI for an AI project
 * Formula: ((Annual Hours Saved × Hourly Rate - Annual Implementation Cost) / Annual Implementation Cost) × 100
 * 
 * @param input The tangible metrics needed for ROI calculation
 * @returns ROI as a percentage, rounded to 2 decimal places
 * @throws Error if implementation cost is zero or negative
 */
export function calculateTangibleROI(input: TangibleROIInput): number {
  const { annualHoursSaved, hourlyRate, annualImplementationCost } = input;

  if (annualImplementationCost <= 0) {
    throw new Error('Annual implementation cost must be positive');
  }

  const annualBenefit = annualHoursSaved * hourlyRate;
  const roi = ((annualBenefit - annualImplementationCost) / annualImplementationCost) * 100;

  // Round to 2 decimal places
  return Number(roi.toFixed(2));
}

/**
 * Calculates full ROI metrics including annual savings
 * 
 * @param project The complete project data
 * @returns Calculation result with ROI and savings figures
 */
export function calculateROIMetrics(project: ROIProject): ROICalculationResult {
  const { projectName, annualHoursSaved, hourlyRate, annualImplementationCost } = project;

  const tangibleROI = calculateTangibleROI({
    annualHoursSaved,
    hourlyRate,
    annualImplementationCost,
  });

  const annualSavings = annualHoursSaved * hourlyRate;

  return {
    projectName,
    tangibleROI,
    intangibleScore: 0, // Will be calculated separately
    annualSavings,
    implementationCost: annualImplementationCost,
    calculatedAt: new Date().toISOString(),
  };
}
