import { Command } from 'commander';
import { ProjectReader } from '../io/reader';
import { ProjectWriter } from '../io/writer';
import { calculateROIMetrics } from '../calculator/tangible';
import { calculateIntangibleScore } from '../calculator/intangible';

const program = new Command();

program
  .name('roi-calculator')
  .description('Calculate ROI metrics for AI projects')
  .version('0.1.0');

program
  .command('calculate')
  .description('Calculate ROI for a single project')
  .argument('<file>', 'Project JSON file path')
  .option('-o, --output <file>', 'Output file path')
  .action(async (file: string, { output }: { output?: string }) => {
    try {
      const reader = new ProjectReader();
      const writer = new ProjectWriter();
      
      const project = await reader.readProject(file);
      const { tangibleROI, annualSavings, implementationCost } = calculateROIMetrics(project);
      const intangibleScore = calculateIntangibleScore(
        project.intangibleMetrics,
        project.weights
      );

      if (output) {
        await writer.writeProject(output, project);
        console.log(`Results written to ${output}`);
      } else {
        console.log(JSON.stringify({
          projectName: project.projectName,
          tangibleROI,
          annualSavings,
          implementationCost,
          intangibleScore
        }, null, 2));
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error:', err.message);
      } else {
        console.error('An unknown error occurred');
      }
      process.exit(1);
    }
  });

export { program };