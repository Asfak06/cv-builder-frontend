// Export core components
export { SmartPaginationEngine } from './core/PaginationEngine';
export type {
  CVSection,
  HeightEstimator,
  PageContent,
  SectionRenderer,
  TemplateConfig,
} from './core/types';

// Export template manager
export { default as ActionButtons } from './ActionButtons';
export { default as SmartTemplateManager } from './SmartTemplateManager';

// Export Template1 components
export {
  SmartTemplate1Preview,
  Template1Config,
  Template1HeightEstimator,
  Template1SectionRenderer,
} from './templates/template1';
