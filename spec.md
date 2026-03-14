# UBUNIFU SACCO Docs

## Current State
New project with no existing frontend implementation.

## Requested Changes (Diff)

### Add
- Full documentation website with sidebar navigation layout
- React Router for client-side routing
- react-markdown + remark-gfm for Markdown rendering
- Collapsible sidebar with nested parent/child navigation sections
- Top header bar with UBUNIFU SACCO Ltd. branding
- Markdown content files for every section (placeholder content)
- Active link highlighting in sidebar
- Responsive layout

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Install react-router-dom, react-markdown, remark-gfm dependencies
2. Create Markdown content files for all 30+ sections
3. Build sidebar navigation component with collapsible groups
4. Build top header component
5. Build main layout with sidebar + content area
6. Build MarkdownPage component that loads and renders .md files
7. Wire up React Router routes for every page
8. Apply green (#16a34a) and white color scheme via Tailwind
9. Add responsive behavior (mobile-friendly sidebar toggle)
