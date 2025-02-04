import { tangibleInputSchema } from '../../src/validation/tangible';

describe('Tangible Input Validation', () => {
  const validInput = {
    annualHoursSaved: 1000,
    hourlyRate: 50,
    annualImplementationCost: 30000
  };

  describe('valid inputs', () => {
    it('accepts valid input data', () => {
      const { error } = tangibleInputSchema.validate(validInput);
      expect(error).toBeUndefined();
    });

    it('accepts zero hours saved', () => {
      const input = { ...validInput, annualHoursSaved: 0 };
      const { error } = tangibleInputSchema.validate(input);
      expect(error).toBeUndefined();
    });
  });

  describe('invalid inputs', () => {
    it('rejects negative hours saved', () => {
      const input = { ...validInput, annualHoursSaved: -1 };
      const { error } = tangibleInputSchema.validate(input);
      expect(error?.message).toBe('Annual hours saved must be non-negative');
    });

    it('rejects zero hourly rate', () => {
      const input = { ...validInput, hourlyRate: 0 };
      const { error } = tangibleInputSchema.validate(input);
      expect(error?.message).toBe('Hourly rate must be positive');
    });

    it('rejects negative hourly rate', () => {
      const input = { ...validInput, hourlyRate: -50 };
      const { error } = tangibleInputSchema.validate(input);
      expect(error?.message).toBe('Hourly rate must be positive');
    });

    it('rejects zero implementation cost', () => {
      const input = { ...validInput, annualImplementationCost: 0 };
      const { error } = tangibleInputSchema.validate(input);
      expect(error?.message).toBe('Annual implementation cost must be positive');
    });

    it('rejects missing required fields', () => {
      const { error } = tangibleInputSchema.validate({
        annualHoursSaved: 1000
        // missing hourlyRate and annualImplementationCost
      });
      expect(error).toBeDefined();
    });
  });
}); 