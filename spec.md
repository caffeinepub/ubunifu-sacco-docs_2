# UBUNIFU SACCO Docs

## Current State
The app uses `MarkdownPage` for all routes, fetching `.md` files from `/public/docs/`. Some pages need custom components with Recharts charts and interactive visuals.

## Requested Changes (Diff)

### Add
- Custom page component: `SchedulePage` — Gantt-style chart (Recharts BarChart horizontal) + markdown content
- Custom page component: `StrategyResultsPage` — BarChart of Year 5 targets + markdown content
- Custom page component: `BudgetPage` — two PieCharts (Fixed Capital top-6 and Operational Year 1) + markdown content
- Custom page component: `OrganogramPage` — SVG/inline interactive org chart + markdown content
- All 10 markdown files with user-provided content

### Modify
- `App.tsx`: Replace MarkdownPage for `/implementation/schedule`, `/strategy-results`, `/budget`, `/hr/organogram` routes with custom page components

### Remove
- Nothing removed

## Implementation Plan
1. Write all 10 markdown files to `src/frontend/public/docs/`
2. Create 4 custom page components in `src/frontend/src/pages/`
3. Update `App.tsx` to import and use custom components for 4 routes
