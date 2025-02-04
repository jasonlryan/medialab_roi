/**
 * Represents the intangible metrics for an AI project
 * All values should be between 0 and 1
 */
export interface IntangibleMetrics {
  confidenceIndex: number;      // % reporting "high confidence" with AI
  skillIndex: number;          // % of staff with advanced GPT usage
  progressionIndex: number;    // % of role progressions linked to AI
  clientSatisfactionIndex: number; // Normalized NPS or satisfaction score
}

/**
 * Weights for calculating the intangible score
 * All weights must sum to 1
 */
export interface MetricWeights {
  confidenceWeight: number;
  skillWeight: number;
  progressionWeight: number;
  clientSatisfactionWeight: number;
}

/**
 * Complete ROI project data structure
 */
export interface ROIProject {
  // Project Information
  projectName: string;        // non-empty, max 100 chars
  startDate: string;         // ISO date format

  // Tangible Metrics
  annualHoursSaved: number;  // > 0
  hourlyRate: number;        // > 0
  annualImplementationCost: number; // > 0

  // Intangible Metrics & Weights
  intangibleMetrics: IntangibleMetrics;
  weights: MetricWeights;
}

/**
 * Results of ROI calculations
 */
export interface ROICalculationResult {
  projectName: string;
  tangibleROI: number;         // Percentage
  intangibleScore: number;     // 0-1 scale
  annualSavings: number;       // Currency value
  implementationCost: number;  // Currency value
  calculatedAt: string;        // ISO date
}

/**
 * Validation error structure
 */
export interface ValidationError {
  code: string;          // e.g., "INVALID_INPUT"
  field: string;         // field name with error
  message: string;       // user-friendly message
  details?: unknown;     // additional context
}
