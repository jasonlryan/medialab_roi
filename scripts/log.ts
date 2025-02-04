import * as fs from 'fs';

function addLogEntry(title: string, items: string[]): void {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0];
  
  let entry = `\n## ${date}\n\n`;
  entry += `### ${time} - ${title}\n\n`;
  items.forEach(item => {
    entry += `- ${item}\n`;
  });
  entry += '\n';

  fs.appendFileSync('docs/log.md', entry);
}

const [,, title, ...items] = process.argv;
if (!title) {
  console.error('Usage: npm run log "Title" "Item 1" "Item 2" ...');
  process.exit(1);
}

addLogEntry(title, items); 