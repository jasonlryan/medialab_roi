# 1. ROI MODEL

## Overview

This model splits ROI into Tangible and Intangible components, allowing you to track financial returns and softer benefits like employee confidence. Each AI project (e.g., a chatbot, automated workflow) feeds into this model with its own data.

## Tangible ROI Formula

### Formula

```
Tangible ROI = ((Annual Hours Saved × Hourly Rate) - Annual Implementation Cost)
                / Annual Implementation Cost × 100%
```

### Components

- **Annual Hours Saved**: Estimated or tracked number of hours saved per year once AI is deployed
- **Hourly Rate**: Average internal cost or billable rate (e.g., £50/hour)
- **Annual Implementation Cost**: Total cost for building and maintaining that AI solution (consulting fees, training costs, etc.)

### Example Calculation

**Input Values:**

- Annual Hours Saved: 1,000 hours/year
- Hourly Rate: £50/hour
- Annual Implementation Cost: £30,000 (dev + training)
- Annual Benefits = 1,000 × £50 = £50,000

**Result:**

```
Tangible ROI = ((£50,000 - £30,000) / £30,000) × 100% = 66.7%
```

## Intangible Value Score

### Overview

We combine multiple intangible metrics into a single "Intangible Value Score" (scale 0–100). Each metric is weighted based on priority:

1. Confidence Uplift (e.g., % reporting "high confidence" with AI)
2. Skill Development (# of employees building custom GPTs or attending advanced sessions)
3. Employee Progression (# of promotions or role changes influenced by AI's efficiency)
4. Client Satisfaction (NPS change attributed to AI enhancements, if measurable)

### Formula

```
Intangible Value Score = (Confidence Weight × Confidence Index) +
                        (Skill Weight × Skill Index) +
                        (Progression Weight × Progression Index) +
                        (Client Satisfaction Weight × Client Satisfaction Index)
```

### Metrics Scale

Each index uses a 0–1 scale (or can be scaled to 0–100 if preferred)

### Example Values

**Indices:**

- Confidence Index: 0.8 (80% of staff reporting high confidence)
- Skill Index: 0.3 (30% of staff have built/used advanced GPTs)
- Progression Index: 0.1 (10% of employees moved to higher roles)
- Client Satisfaction Index: 0.2 (20-point NPS increase)

**Weights:**

- Confidence Weight: 0.4
- Skill Weight: 0.3
- Progression Weight: 0.2
- Client Satisfaction Weight: 0.1

### Example Calculation

```
Intangible Value Score = (0.4 × 0.8) + (0.3 × 0.3) + (0.2 × 0.1) + (0.1 × 0.2)
                      = 0.32 + 0.09 + 0.02 + 0.02
                      = 0.45 (or 45 when scaled to 100)
```

## Total AI Impact Reporting

### Board Report Components

1. **Tangible ROI**

   - Percentage return
   - Total cost savings

2. **Intangible Value Score**
   - Numerical score (0-100)
   - Or qualitative rating (High/Medium/Low)

### Tracking

- Monitor monthly or quarterly trends
- Track improvement over time for both metrics
