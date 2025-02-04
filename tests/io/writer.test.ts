import { ProjectWriter } from '../../src/io/writer';
import { readFile, unlink } from 'fs/promises';
import path from 'path';
import type { ROIProject } from '../../src/types';

describe('ProjectWriter', () => {
  const writer = new ProjectWriter();
  const testDir = path.join(__dirname, '..', 'fixtures');
  
  const testProject: ROIProject = {
    projectName: "Test AI Project",
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

  afterEach(async () => {
    try {
      await unlink(path.join(testDir, 'test-output.json'));
    } catch {
      // Ignore errors if file doesn't exist
    }
  });

  it('writes project data to file', async () => {
    const filePath = path.join(testDir, 'test-output.json');
    await writer.writeProject(filePath, testProject);
    
    const fileContent = await readFile(filePath, 'utf-8');
    const savedProject = JSON.parse(fileContent);
    
    expect(savedProject).toEqual(testProject);
  });

  it('throws error for invalid file path', async () => {
    const filePath = path.join(testDir, 'non-existent-dir', 'test.json');
    await expect(writer.writeProject(filePath, testProject))
      .rejects
      .toThrow('Failed to write project file');
  });

  it('throws error for empty file path', async () => {
    await expect(writer.writeProject('', testProject))
      .rejects
      .toThrow('File path is required');
  });

  it('handles file system errors', async () => {
    // Try to write to a directory that doesn't exist
    const filePath = path.join(testDir, 'non-existent-dir', 'test.json');
    await expect(writer.writeProject(filePath, testProject))
      .rejects
      .toThrow('Failed to write project file');
  });
}); 