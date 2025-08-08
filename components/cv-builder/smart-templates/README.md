# Smart Templates Architecture

This directory contains the modular smart pagination system for CV templates.

## Architecture Overview

The smart templates system is designed with separation of concerns and reusability in mind:

```
smart-templates/
├── core/                           # Shared logic for all templates
│   ├── types.ts                   # Type definitions and interfaces
│   └── PaginationEngine.ts        # Core pagination engine
├── templates/                      # Template-specific implementations
│   └── template1/                 # Template1 directory
│       ├── config.ts              # Template1 configuration
│       ├── height-estimator.ts    # Template1 height calculations
│       ├── renderer.tsx           # Template1 section rendering
│       ├── SmartTemplate1Preview.tsx  # Complete Template1 preview component
│       └── index.ts               # Template1 exports
├── SmartTemplateManager.tsx        # Template switching manager
├── index.ts                       # Module exports
└── README.md                      # Documentation
```

## Core Components

### PaginationEngine

The heart of the system that handles intelligent pagination:

- Column-based and single-column layout support
- Smart section organization
- Overflow detection and handling
- Configurable page dimensions and margins

### Types

Shared interfaces used across all templates:

- `CVSection`: Individual CV section data structure
- `PageContent`: Complete page content with sections
- `TemplateConfig`: Template-specific configuration
- `SectionRenderer`: Section rendering interface
- `HeightEstimator`: Height calculation interface

## Quick start

1. Render a template

```tsx
import { SmartTemplateManager } from '@/components/cv-builder/smart-templates';

// Inside a page/component
<SmartTemplateManager templateId={1} />;
```

2. Provide data via the `useCVStore` (see `store/cvStore.ts`). Pagination is recalculated whenever store slices change.

3. Navigate to `/smart-cv-builder` and edit fields on the left. The right preview paginates automatically.

## Template Structure

Each template consists of three main components:

### 1. Configuration (`template1/config.ts`)

Defines template-specific settings:

- Page dimensions (width, height)
- Margins and padding
- Column definitions
- Section organization rules

### 2. Height Estimator (`template1/height-estimator.ts`)

Calculates accurate heights for different content types:

- Header sections
- Text content (with different styling)
- Lists and bullet points
- Custom sections

### 3. Section Renderer (`template1/renderer.tsx`)

Handles the actual rendering of CV sections:

- Maintains exact styling from original template
- Consistent with original component structure
- Proper handling of different section types

### 4. Preview Component (`template1/SmartTemplate1Preview.tsx`)

Complete template preview with:

- Smart pagination integration
- Responsive scaling
- Action buttons (PDF, Save)
- Multi-page display

Important layout details used by the preview:

- Page container has fixed `pageWidth`/`pageHeight` and `overflow: hidden` to emulate A4 pages.
- The two-column wrapper must consume only the remaining height under the header: use `flex-1 min-h-0` (not `h-full`). This prevents content clipping at the bottom of the page.

## Adding New Templates

To add a new template (e.g., Template2):

1. Create a new directory: `templates/template2/`
2. Create configuration file: `template2/config.ts`
3. Create height estimator: `template2/height-estimator.ts`
4. Create section renderer: `template2/renderer.tsx`
5. Create preview component: `template2/SmartTemplate2Preview.tsx`
6. Create index file: `template2/index.ts`
7. Update `SmartTemplateManager.tsx` to include the new template
8. Export components in main `index.ts`

## Features

- **Intelligent Pagination**: Automatically breaks content across pages at optimal points
- **Modular Architecture**: Easy to add new templates without duplicating logic
- **Accurate Height Calculations**: Precise height estimation for different content types
- **Responsive Design**: Automatic scaling based on viewport size
- **Consistent Styling**: Maintains exact appearance of original templates
- **Smart Overflow Handling**: Prevents content cutoff and ensures proper page breaks

## Benefits Over Original System

1. **No Content Cutoff**: Intelligent section-aware pagination
2. **Accurate Space Utilization**: Better height estimation and space usage
3. **Modular Design**: Easy to maintain and extend
4. **Consistent Results**: Predictable pagination across different content types
5. **Performance**: Optimized rendering and calculations

---

## Data contracts and types

These types live in `core/types.ts` and define the data and rendering contracts between the store, pagination engine, and template renderers.

```ts
export type SectionType =
  | 'header'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'contact'
  | 'references'
  | 'languages'
  | 'hobbies'
  | 'links'
  | 'custom';

export interface CVSection {
  type: SectionType;
  content: any; // Raw data for the section
  height?: number; // Optional measured/estimated height
  column?: 'left' | 'right' | 'full';
  priority?: number; // For future re-ordering
  customIndex?: number; // For custom sections
  isFirst?: boolean;
  isLast?: boolean;
}

export interface PageContent {
  sections: CVSection[]; // Full-width sections (e.g., header)
  leftSections?: CVSection[]; // Left column sections
  rightSections?: CVSection[]; // Right column sections
  remainingHeight: number; // Remaining height for the current page
}

export interface TemplateConfig {
  name: string;
  hasColumns: boolean;
  leftColumnSections: SectionType[];
  rightColumnSections: SectionType[];
  fullWidthSections: SectionType[];
  pageHeight: number; // 1123px ~ A4 @ 96 DPI
  pageWidth: number; // 794px ~ A4 @ 96 DPI
  marginTop: number;
  marginBottom: number;
  headerHeight: number; // Space reserved for header when present
}
```

The preview composes `cvData` from the store slices:

```ts
const cvData = {
  personalDetails,
  summary,
  experience,
  education,
  skills,
  references,
  languages,
  hobbies,
  links,
  customSections,
};
```

## Pagination engine behavior

File: `core/PaginationEngine.ts`

- Column templates: `paginateColumnLayout` subtracts margins and `headerHeight` on the first page to compute available content height.
- The engine organizes sections by template config into full-width, left, and right columns.
- It calls the template-specific `HeightEstimator` to decide how many sections fit.
- It uses a per-page buffer to account for internal paddings defined by the renderer CSS:
  - First page buffer ≈ top 50px (below header) + bottom 30px
  - Overflow page buffer ≈ top 20px + bottom 30px
- Prevents infinite loops by checking whether remaining lists are progressing.

When tuning, keep `TemplateConfig` and the renderer’s actual paddings in sync with these buffers.

## Height estimation guidance

File: `templates/template1/height-estimator.ts`

- Start with a reasonable base height per section type and add per-item costs.
- Add small padding (e.g., 8–10%) to absorb modest styling variance.
- Examples used in Template 1:
  - summary: proportional to text length
  - experience: ~140px per entry
  - skills: groups chips into rows; approximate with `ceil(count / 3) * rowHeight + padding`
- Calibrate using your real fonts, sizes, and spacings. If a section consistently overflows, increment the estimate or the engine buffer.

## Rendering contract

File: `templates/template1/renderer.tsx`

`Template1SectionRenderer.renderSection(section, key)` must render the visual block for each `CVSection` type. Keep styles consistent with the original template.

Tips:

- Respect column widths and borders/paddings.
- Avoid adding extra top margins to the very first rendered block in a column to maximize vertical room.
- Where content can wrap (e.g., skill chips), prefer consistent line heights.

## Styling constraints that affect pagination

Because the engine estimates height before rendering, a few CSS rules are important:

- Page container: fixed width/height; `overflow: hidden` to emulate paper.
- Two-column wrapper (inside page): must be `flex-1 min-h-0` so it only uses the remaining height below the header. Using `h-full` here will overrun the page and clip the last section.
- Keep top/bottom paddings aligned with the engine buffers (first vs overflow pages).

## Adding new sections (to an existing template)

1. Extend `SectionType` in `core/types.ts` if it’s a brand-new type.
2. Add the type to the desired arrays in the template’s `config.ts` (left/right/full).
3. Update the engine’s `createSection` switch so it extracts content for the new type.
4. Implement height rules in the template’s `height-estimator.ts`.
5. Implement rendering in the template’s `renderer.tsx`.

## Debugging pagination

- Temporarily log estimator outputs to compare expected vs. actual space usage (Template 1 already logs estimates).
- If a section is clipped:
  - Confirm the two-column wrapper uses `flex-1 min-h-0`.
  - Increase the section’s estimated height or per-page buffer.
  - Check added CSS margins/paddings that weren’t accounted for.

## PDF/export notes

The repo includes `puppeteer`. A typical approach is to render the same page server-side and print to PDF with A4 dimensions matching `pageWidth/pageHeight` (96 DPI). Keep page breaks enabled via `pageBreakAfter` where needed.

## Known gotchas

- Using `h-full` for the columns when a header exists will bury the last right-column section. Use `flex-1 min-h-0` instead.
- Changing fonts, sizes, or line-heights without updating estimations and/or buffers leads to subtle clipping.
- Very long single items (e.g., a huge summary paragraph) may require special-case estimation or splitting.
