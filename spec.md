# UBUNIFU SACCO Docs

## Current State
Markdown-driven documentation portal. Has top sticky header, white sidebar with collapsible groups, Markdown pages, special pages (Budget/Schedule/Strategy/Organogram with Recharts). Fonts: DM Serif Display + Plus Jakarta Sans. Basic footer.

## Requested Changes (Diff)

### Add
- Inter (body) + Sora (headings) from Google Fonts
- Custom scrollbar (6px, #2E7D32 thumb)
- Page header banner on every page (gradient #1B5E20→#2E7D32, white title Sora 2.2rem, gold subtitle)
- Hero section on Home page (gradient #1B5E20→#388E3C, white heading, gold subheading, 2 CTA buttons)
- Quick Facts as 3-column icon card grid on Home page
- Rich footer (#1B5E20 bg, contact info, social icons, copyright)
- Callout box components: Info (green), Target (yellow), Warning (orange)
- PageHeader.tsx reusable component
- HomePage.tsx special page

### Modify
- index.css: new fonts, overhauled .md-content styles (headings with gold border, blockquotes, bullet arrows, tables, styled HRs, callouts, scrollbar)
- tailwind.config.js: Sora display, Inter body
- Layout.tsx: remove top header, fixed 280px sidebar, ml-[280px] on desktop, hamburger on mobile, rich footer
- Sidebar.tsx: dark green #1B5E20 bg, flat section labels (gold muted uppercase), active #FFD600, hover rgba white 10%
- MarkdownPage.tsx: extract h1 for page title, render PageHeader above article, enhanced MD components
- BudgetPage/SchedulePage/StrategyResultsPage/OrganogramPage: add PageHeader
- App.tsx: route / to HomePage

### Remove
- Top sticky header
- DM Serif / Plus Jakarta Sans imports
- Old basic footer
- Default bullets (replaced by arrows)

## Implementation Plan
1. index.html title update
2. tailwind.config.js font families
3. index.css full rewrite (fonts, variables, md-content, scrollbar, callouts)
4. Layout.tsx rewrite (fixed sidebar layout, mobile overlay, rich footer)
5. Sidebar.tsx rewrite (dark green, flat groups, active/hover)
6. PageHeader.tsx component
7. MarkdownPage.tsx rewrite (PageHeader + enhanced MD components)
8. HomePage.tsx (hero + quick facts cards + MD content)
9. Special pages: add PageHeader
10. App.tsx route / to HomePage
