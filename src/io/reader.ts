import { readFile } from 'fs/promises';
import { projectSchema } from '../validation/project';
import type { ROIProject } from '../types';

export class ProjectReader {
  async readProject(filePath: string): Promise<ROIProject> {
    try {
      const fileContent = await readFile(filePath, 'utf-8');
      
      let projectData: unknown;
      try {
        projectData = JSON.parse(fileContent);
      } catch (err) {
        throw new Error('Invalid JSON format in project file');
      }
      
      const { error, value } = projectSchema.validate(projectData);
      if (error) {
        throw new Error(`Invalid project data: ${error.message}`);
      }
      
      return value;
    } catch (err) {
      if (err instanceof Error) {
        throw err; // Re-throw our custom errors
      }
      throw new Error('Failed to read project file');
    }
  }
} 