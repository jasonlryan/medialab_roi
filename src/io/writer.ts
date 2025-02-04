import { writeFile } from 'fs/promises';
import type { ROIProject } from '../types';

export class ProjectWriter {
  async writeProject(filePath: string, project: ROIProject): Promise<void> {
    if (!filePath) {
      throw new Error('File path is required');
    }

    try {
      const jsonContent = JSON.stringify(project, null, 2);
      await writeFile(filePath, jsonContent, 'utf-8');
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Failed to write project file: ${err.message}`);
      }
      throw new Error('Failed to write project file: Unknown error');
    }
  }
} 