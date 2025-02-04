import Joi from 'joi';

// Validation schema for tangible ROI inputs
export const tangibleInputSchema = Joi.object({
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
    .message('Annual implementation cost must be positive')
}); 