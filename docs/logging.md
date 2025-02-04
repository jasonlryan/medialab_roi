# Development Logging

## Usage

### Via CLI

```bash
# Add a simple log entry
npm run log add "Feature Implementation"

# Add entry with items
npm run log add "Bug Fixes" -i "Fixed calculation error" "Updated validation"

# Run example log
npm run log:example
```

### Via Code

```typescript
import { logger } from "../scripts/log";

logger.addEntry("Feature Implementation", [
  "Implemented new feature",
  "Added tests",
  "Updated documentation",
]);
```

## Log Format

Each entry includes:

- ISO date
- 24-hour timestamp
- Title
- Bullet-point items
