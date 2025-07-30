// Core types for smart pagination system

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

export type ColumnType = 'left' | 'right' | 'full';

export interface CVSection {
    type: SectionType;
    content: any;
    height?: number;
    column?: ColumnType;
    priority?: number;
    customIndex?: number;
    isFirst?: boolean;
    isLast?: boolean;
}

export interface PageContent {
    sections: CVSection[];
    leftSections?: CVSection[];
    rightSections?: CVSection[];
    remainingHeight: number;
}

export interface TemplateConfig {
    name: string;
    hasColumns: boolean;
    leftColumnSections: SectionType[];
    rightColumnSections: SectionType[];
    fullWidthSections: SectionType[];
    pageHeight: number;
    pageWidth: number;
    marginTop: number;
    marginBottom: number;
    headerHeight: number;
}

export interface SectionRenderer {
    renderSection: (section: CVSection, sectionKey: string | number) => React.ReactNode;
}

export interface HeightEstimator {
    getEstimatedHeight: (section: CVSection, data: any) => number;
}
