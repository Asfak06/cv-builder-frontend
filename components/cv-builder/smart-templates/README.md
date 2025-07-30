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

## Usage

```tsx
import { SmartTemplateManager } from '@/components/cv-builder/smart-templates';

// Use with specific template
<SmartTemplateManager templateId={1} />
```

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
