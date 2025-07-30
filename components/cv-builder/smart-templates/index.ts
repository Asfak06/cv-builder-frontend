// Export core components
export { SmartPaginationEngine } from './core/PaginationEngine';
export type { 
    CVSection, 
    PageContent, 
    TemplateConfig, 
    SectionRenderer, 
    HeightEstimator 
} from './core/types';

// Export template manager
export { default as SmartTemplateManager } from './SmartTemplateManager';

// Export Template1 components
export { 
    Template1Config,
    Template1HeightEstimator,
    Template1SectionRenderer,
    SmartTemplate1Preview
} from './templates/template1';
