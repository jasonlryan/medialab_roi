import Joi from 'joi';
import type { ROIProject } from '../types';
import { intangibleMetricsSchema, metricWeightsSchema } from './intangible';

// Add type annotation to show this schema validates ROIProject type
export const projectSchema: Joi.ObjectSchema<ROIProject> = Joi.object({
  // Project Information
  projectName: Joi.string()
    .required()
    .max(100)
    .message('Project name must not exceed 100 characters'),
    
  startDate: Joi.string()
    .required()
    .isoDate()
    .message('Start date must be a valid ISO date'),

  // Tangible Metrics
  annualHoursSaved: Joi.number()
    .required()
    .min(0)
    .message('Annual hours saved must be non-negative'),
    
  hourlyRate: Joi.number()
    .required()
    .greater(0)
    .message('Hourly rate must be positive'),
    
  annualImplementationCost: Joi.number()
    .required()
    .greater(0)
    .message('Annual implementation cost must be positive'),

  // Intangible Metrics & Weights
  intangibleMetrics: intangibleMetricsSchema.required(),
  weights: metricWeightsSchema.required()
}); 