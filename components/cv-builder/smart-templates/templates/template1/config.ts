import { TemplateConfig } from '../../core/types';

export const Template1Config: TemplateConfig = {
    name: 'Template1',
    hasColumns: true,
    leftColumnSections: ['summary', 'education', 'contact', 'references'],
    rightColumnSections: ['experience', 'skills', 'links', 'languages', 'hobbies', 'custom'],
    fullWidthSections: ['header'],
    pageHeight: 1123, // A4 height at 96 DPI
    pageWidth: 794,   // A4 width at 96 DPI
    marginTop: 30,
    marginBottom: 30,
    headerHeight: 180
};
