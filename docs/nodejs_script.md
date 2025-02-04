# 3. PROMPT & NODE.JS SETUP

## Developer Instructions

### Project Overview

We need a Node.js application to calculate ROI metrics for our AI adoption program. The solution should:

- Ingest data (hours saved, cost offsets, intangible survey results)
- Apply the ROI formulas (tangible + intangible)
- Output monthly or quarterly results in a structured format (JSON/CSV) for board reporting

### Key Requirements

#### Calculations

- **Tangible ROI**: `(Annual Hours Saved × Hourly Rate - Annual Implementation Cost) / Annual Implementation Cost × 100%`
- **Intangible Score**: Weighted sum of multiple metrics (confidence, skill, progression, client satisfaction)

#### Input Format

Example JSON structure:

```json
{
  "projectName": "Reporting Automation",
  "annualHoursSaved": 1000,
  "hourlyRate": 50,
  "annualImplementationCost": 30000,
  "intangibleMetrics": {
    "confidenceIndex": 0.8,
    "skillIndex": 0.3,
    "progressionIndex": 0.1,
    "clientSatisfactionIndex": 0.2
  },
  "weights": {
    "confidenceWeight": 0.4,
    "skillWeight": 0.3,
    "progressionWeight": 0.2,
    "clientSatisfactionWeight": 0.1
  }
}
```

#### Output Requirements

- ROI calculation results to console or new JSON
- Function/endpoint callable for each AI project/bot
- Aggregated output for multiple projects (e.g., total hours saved across initiatives)
- Basic error handling (e.g., validation for negative costs)

### Technology Requirements

- Node.js v14+ or v16+
- No heavy frameworks required (simple CLI or minimal Express server)

## Example Implementation

### Usage Examples

Running a single project calculation:

```bash
node roiCalculator.js data/reporting.json
```

Expected output:

```text
Project: Reporting Automation
Tangible ROI: 66.7%
Intangible Score: 0.45 (or 45.0 if scaled 0-100)
```

### Sample Implementation Code

```javascript
// File: roiCalculator.js

const fs = require("fs");

function calculateTangibleROI(
  annualHoursSaved,
  hourlyRate,
  annualImplementationCost
) {
  if (annualImplementationCost <= 0) {
    throw new Error("Annual implementation cost must be a positive number.");
  }
  const annualBenefit = annualHoursSaved * hourlyRate;
  const roi =
    ((annualBenefit - annualImplementationCost) / annualImplementationCost) *
    100;
  return roi;
}

function calculateIntangibleScore(intangibleMetrics, weights) {
  const {
    confidenceIndex,
    skillIndex,
    progressionIndex,
    clientSatisfactionIndex,
  } = intangibleMetrics;

  const {
    confidenceWeight,
    skillWeight,
    progressionWeight,
    clientSatisfactionWeight,
  } = weights;

  // Weighted sum
  return (
    confidenceWeight * confidenceIndex +
    skillWeight * skillIndex +
    progressionWeight * progressionIndex +
    clientSatisfactionWeight * clientSatisfactionIndex
  );
}

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error(
      "Please provide a path to the JSON data file. Example:\n  node roiCalculator.js data/project.json"
    );
    process.exit(1);
  }

  try {
    const rawData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);

    const {
      projectName,
      annualHoursSaved,
      hourlyRate,
      annualImplementationCost,
      intangibleMetrics,
      weights,
    } = data;

    const tangibleROI = calculateTangibleROI(
      annualHoursSaved,
      hourlyRate,
      annualImplementationCost
    );
    const intangibleScore = calculateIntangibleScore(
      intangibleMetrics,
      weights
    );

    console.log(`\nProject: ${projectName}`);
    console.log(`Tangible ROI: ${tangibleROI.toFixed(2)}%`);
    console.log(
      `Intangible Value Score: ${(intangibleScore * 100).toFixed(2)}/100\n`
    );
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
```

## Project Structure

```
your-project/
  ├─ data/
  │   ├─ reporting.json
  │   ├─ planning.json
  │   └─ multipleProjects.json
  ├─ roiCalculator.js
  ├─ package.json
  └─ README.md
```

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run a single project calculation:

   ```bash
   node roiCalculator.js data/reporting.json
   ```

3. For multiple projects:
   - Extend roiCalculator.js to parse an array of objects
   - Output aggregated results

## Next Steps

1. **Data Collection**

   - Ensure each AI project has an owner providing JSON inputs
   - Track hours saved, costs, and intangible indices

2. **Automation**

   - Set up cron jobs for monthly runs
   - Parse results into PDF/presentation format

3. **Integration**
   - Consider integrating with internal dashboards
   - Set up real-time data updates via API

### Implementation Notes

With this setup, your Node.js developer can quickly implement:

- Data ingestion (JSON/DB)
- Calculation logic
- Reporting output (console/CSV/API)

This aligns with the monthly/quarterly board reporting requirements outlined earlier.
