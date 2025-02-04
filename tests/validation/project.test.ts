import { projectSchema } from '../../src/validation/project';
import type { ROIProject } from '../../src/types';

describe('Project Validation', () => {
  const validProject: ROIProject = {
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

  describe('project information', () => {
    it('accepts valid project data', () => {
      const { error } = projectSchema.validate(validProject);
      expect(error).toBeUndefined();
    });

    it('rejects empty project name', () => {
      const project = { ...validProject, projectName: '' };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('"projectName" is not allowed to be empty');
    });

    it('rejects project name over 100 characters', () => {
      const project = { 
        ...validProject, 
        projectName: 'a'.repeat(101)
      };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('Project name must not exceed 100 characters');
    });

    it('rejects invalid date format', () => {
      const project = { ...validProject, startDate: '2024/02/04' };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('Start date must be a valid ISO date');
    });
  });

  describe('tangible metrics', () => {
    it('validates annual hours saved', () => {
      const project = { ...validProject, annualHoursSaved: -1 };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('Annual hours saved must be non-negative');
    });

    it('validates hourly rate', () => {
      const project = { ...validProject, hourlyRate: 0 };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('Hourly rate must be positive');
    });

    it('validates implementation cost', () => {
      const project = { ...validProject, annualImplementationCost: -1000 };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('Annual implementation cost must be positive');
    });
  });

  describe('intangible metrics', () => {
    it('validates metric ranges', () => {
      const project = {
        ...validProject,
        intangibleMetrics: {
          ...validProject.intangibleMetrics,
          confidenceIndex: 1.1
        }
      };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('"intangibleMetrics.confidenceIndex" must be between 0 and 1');
    });

    it('validates weight sum', () => {
      const project = {
        ...validProject,
        weights: {
          ...validProject.weights,
          confidenceWeight: 0.5
        }
      };
      const { error } = projectSchema.validate(project);
      expect(error?.message).toBe('"weights" failed custom validation because Weights must sum to 1');
    });
  });

  describe('required fields', () => {
    it('requires all fields', () => {
      const { error } = projectSchema.validate({
        projectName: "Test Project"
        // Missing all other fields
      });
      expect(error).toBeDefined();
    });
  });
}); 