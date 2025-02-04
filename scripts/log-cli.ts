import { program } from 'commander';
import { logger } from './log';

program
  .name('dev-logger')
  .description('CLI tool for maintaining development log');

program
  .command('add')
  .description('Add a new log entry')
  .argument('<title>', 'Entry title')
  .option('-i, --items <items...>', 'Log items (comma separated)')
  .action((title, options) => {
    const items = options.items || [];
    logger.addEntry(title, items);
    console.log('Log entry added successfully');
  });

program.parse(); 