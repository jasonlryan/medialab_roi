import * as fs from 'fs';
import * as path from 'path';

interface LogEntry {
  title: string;
  items: string[];
  timestamp: Date;
}

class DevLogger {
  private logFile: string;

  constructor(logFile: string = 'docs/log.md') {
    this.logFile = logFile;
    this.ensureLogFile();
  }

  private ensureLogFile(): void {
    if (!fs.existsSync(this.logFile)) {
      fs.writeFileSync(this.logFile, '# Development Log\n\n');
    }
  }

  public addEntry(title: string, items: string[]): void {
    const now = new Date();
    const entry: LogEntry = {
      title,
      items,
      timestamp: now
    };

    const entryText = this.formatEntry(entry);
    const currentContent = fs.readFileSync(this.logFile, 'utf8');
    fs.writeFileSync(this.logFile, currentContent + entryText);
  }

  private formatEntry(entry: LogEntry): string {
    const date = entry.timestamp.toISOString().split('T')[0];
    const time = entry.timestamp.toTimeString().split(' ')[0];
    
    let text = `\n## ${date}\n\n`;
    text += `### ${time} - ${entry.title}\n\n`;
    
    entry.items.forEach(item => {
      text += `- ${item}\n`;
    });
    
    text += '\n';
    return text;
  }
}

export const logger = new DevLogger(); 