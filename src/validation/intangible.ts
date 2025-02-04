import Joi from 'joi';
import type { MetricWeights } from '../types';

// Validation schema for intangible metrics
export const intangibleMetricsSchema = Joi.object({
  confidenceIndex: Joi.number()
    .required()
    .min(0)
    .max(1)
    .message('{{#label}} must be between 0 and 1'),
    
  skillIndex: Joi.number()
    .required()
    .min(0)
    .max(1)
    .message('{{#label}} must be between 0 and 1'),
    
  progressionIndex: Joi.number()
    .required()
    .min(0)
    .max(1)
    .message('{{#label}} must be between 0 and 1'),
    
  clientSatisfactionIndex: Joi.number()
    .required()
    .min(0)
    .max(1)
    .message('{{#label}} must be between 0 and 1')
});

// Validation schema for metric weights
export const metricWeightsSchema = Joi.object({
  confidenceWeight: Joi.number()
    .required()
    .min(0)
    .max(1),
    
  skillWeight: Joi.number()
    .required()
    .min(0)
    .max(1),
    
  progressionWeight: Joi.number()
    .required()
    .min(0)
    .max(1),
    
  clientSatisfactionWeight: Joi.number()
    .required()
    .min(0)
    .max(1)
}).custom((value: MetricWeights) => {
  const sum = Object.values(value).reduce((acc: number, val: number) => acc + val, 0);
  if (Math.abs(sum - 1) > 0.0001) {
    throw new Error('Weights must sum to 1');
  }
  return value;
}); 