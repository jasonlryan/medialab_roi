import { ProjectReader } from '../../src/io/reader';
import path from 'path';

describe('ProjectReader', () => {
  const reader = new ProjectReader();
  const fixturesDir = path.join(__dirname, '..', 'fixtures');

  it('reads and validates a valid project file', async () => {
    const filePath = path.join(fixturesDir, 'valid-project.json');
    const project = await reader.readProject(filePath);
    
    expect(project.projectName).toBe('Test AI Project');
    expect(project.annualHoursSaved).toBe(1000);
    expect(project.intangibleMetrics.confidenceIndex).toBe(0.8);
  });

  it('throws error for invalid project data', async () => {
    const filePath = path.join(fixturesDir, 'invalid-project.json');
    await expect(reader.readProject(filePath))
      .rejects
      .toThrow('Invalid project data:');
  });

  it('throws error for non-existent file', async () => {
    const filePath = path.join(fixturesDir, 'does-not-exist.json');
    await expect(reader.readProject(filePath))
      .rejects
      .toThrow();
  });
}); 