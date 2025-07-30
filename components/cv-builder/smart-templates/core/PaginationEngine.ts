"use client";

import { CVSection, PageContent, TemplateConfig, HeightEstimator } from './types';

export class SmartPaginationEngine {
    private config: TemplateConfig;
    private heightEstimator: HeightEstimator;

    constructor(config: TemplateConfig, heightEstimator: HeightEstimator) {
        this.config = config;
        this.heightEstimator = heightEstimator;
    }

    /**
     * Main pagination method - distributes sections across pages intelligently
     */
    public paginateContent(cvData: any): PageContent[] {
        console.log('=== Smart Pagination Engine ===');
        console.log('Template:', this.config.name);
        console.log('Page dimensions:', `${this.config.pageWidth}x${this.config.pageHeight}px`);
        
        const availableHeight = this.config.pageHeight - this.config.marginTop - this.config.marginBottom;
        console.log('Available height per page:', availableHeight);

        // Organize sections by layout type
        const { fullWidthSections, leftColumnSections, rightColumnSections } = this.organizeSections(cvData);
        
        if (this.config.hasColumns) {
            return this.paginateColumnLayout(fullWidthSections, leftColumnSections, rightColumnSections, cvData);
        } else {
            return this.paginateSingleColumn([...fullWidthSections, ...leftColumnSections, ...rightColumnSections], cvData);
        }
    }

    /**
     * Organize CV data into sections based on template configuration
     */
    private organizeSections(cvData: any) {
        const fullWidthSections: CVSection[] = [];
        const leftColumnSections: CVSection[] = [];
        const rightColumnSections: CVSection[] = [];

        // Header (always full width)
        if (this.config.fullWidthSections.includes('header')) {
            fullWidthSections.push({
                type: 'header',
                content: cvData.personalDetails,
                priority: 1,
                column: 'full'
            });
        }

        // Left column sections
        this.config.leftColumnSections.forEach((sectionType, index) => {
            const section = this.createSection(sectionType, cvData, index + 2, 'left');
            if (section) leftColumnSections.push(section);
        });

        // Right column sections  
        this.config.rightColumnSections.forEach((sectionType, index) => {
            const section = this.createSection(sectionType, cvData, index + 10, 'right');
            if (section) rightColumnSections.push(section);
        });

        return { fullWidthSections, leftColumnSections, rightColumnSections };
    }

    /**
     * Create a section object from CV data
     */
    private createSection(sectionType: string, cvData: any, priority: number, column: 'left' | 'right'): CVSection | null {
        let content = null;
        let hasContent = false;

        switch (sectionType) {
            case 'summary':
                content = cvData.summary;
                hasContent = !!content;
                break;
            case 'experience':
                content = cvData.experience;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
            case 'education':
                content = cvData.education;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
            case 'skills':
                content = cvData.skills;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
            case 'contact':
                content = cvData.personalDetails;
                hasContent = !!content;
                break;
            case 'references':
                content = cvData.references;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
            case 'languages':
                content = cvData.languages;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
            case 'hobbies':
                content = cvData.hobbies;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
            case 'links':
                content = cvData.links;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
            case 'custom':
                content = cvData.customSections;
                hasContent = Array.isArray(content) && content.length > 0;
                break;
        }

        if (!hasContent) return null;

        return {
            type: sectionType as any,
            content,
            priority,
            column
        };
    }

    /**
     * Paginate content for column-based layouts (like Template1)
     */
    private paginateColumnLayout(
        fullWidthSections: CVSection[],
        leftColumnSections: CVSection[],
        rightColumnSections: CVSection[],
        cvData: any
    ): PageContent[] {
        const pages: PageContent[] = [];
        const availableContentHeight = this.config.pageHeight - this.config.marginTop - this.config.marginBottom - this.config.headerHeight;
        
        // Calculate total heights
        const totalLeftHeight = leftColumnSections.reduce((sum, section) => sum + this.heightEstimator.getEstimatedHeight(section, cvData), 0);
        const totalRightHeight = rightColumnSections.reduce((sum, section) => sum + this.heightEstimator.getEstimatedHeight(section, cvData), 0);
        
        console.log(`Column heights - Left: ${totalLeftHeight}px, Right: ${totalRightHeight}px, Available: ${availableContentHeight}px`);

        // First page
        let currentPage: PageContent = {
            sections: [...fullWidthSections],
            leftSections: [],
            rightSections: [],
            remainingHeight: availableContentHeight
        };

        // Distribute sections across columns for first page
        const { leftRemaining, rightRemaining } = this.fillColumnsOnPage(
            currentPage,
            leftColumnSections,
            rightColumnSections,
            cvData
        );

        pages.push(currentPage);

        // Handle overflow pages
        while (leftRemaining.length > 0 || rightRemaining.length > 0) {
            const overflowPage: PageContent = {
                sections: [],
                leftSections: [],
                rightSections: [],
                remainingHeight: this.config.pageHeight - this.config.marginTop - this.config.marginBottom
            };

            const { leftRemaining: newLeftRemaining, rightRemaining: newRightRemaining } = this.fillColumnsOnPage(
                overflowPage,
                leftRemaining,
                rightRemaining,
                cvData
            );

            if (overflowPage.leftSections!.length > 0 || overflowPage.rightSections!.length > 0) {
                pages.push(overflowPage);
            }

            // Update remaining sections
            leftRemaining.splice(0, leftRemaining.length, ...newLeftRemaining);
            rightRemaining.splice(0, rightRemaining.length, ...newRightRemaining);

            // Prevent infinite loop
            if (newLeftRemaining.length === leftRemaining.length && newRightRemaining.length === rightRemaining.length) {
                console.warn('Pagination stopped - infinite loop detected');
                break;
            }
        }

        console.log(`Generated ${pages.length} pages`);
        return pages;
    }

    /**
     * Fill columns on a single page
     */
    private fillColumnsOnPage(
        page: PageContent,
        leftSections: CVSection[],
        rightSections: CVSection[],
        cvData: any
    ) {
        let leftHeight = 0;
        let rightHeight = 0;
        let leftIndex = 0;
        let rightIndex = 0;
        const buffer = 30;

        // Process sections until either column would exceed page height
        while (leftIndex < leftSections.length || rightIndex < rightSections.length) {
            let leftCanAdd = false;
            let rightCanAdd = false;

            // Check left column
            if (leftIndex < leftSections.length) {
                const nextHeight = this.heightEstimator.getEstimatedHeight(leftSections[leftIndex], cvData);
                leftCanAdd = leftHeight + nextHeight <= page.remainingHeight - buffer;
            }

            // Check right column
            if (rightIndex < rightSections.length) {
                const nextHeight = this.heightEstimator.getEstimatedHeight(rightSections[rightIndex], cvData);
                rightCanAdd = rightHeight + nextHeight <= page.remainingHeight - buffer;
            }

            // Stop if neither column can add more
            if (!leftCanAdd && !rightCanAdd) break;

            // Add sections that fit
            if (leftCanAdd && leftIndex < leftSections.length) {
                const section = leftSections[leftIndex];
                const height = this.heightEstimator.getEstimatedHeight(section, cvData);
                page.leftSections!.push(section);
                leftHeight += height;
                leftIndex++;
            }

            if (rightCanAdd && rightIndex < rightSections.length) {
                const section = rightSections[rightIndex];
                const height = this.heightEstimator.getEstimatedHeight(section, cvData);
                page.rightSections!.push(section);
                rightHeight += height;
                rightIndex++;
            }
        }

        return {
            leftRemaining: leftSections.slice(leftIndex),
            rightRemaining: rightSections.slice(rightIndex)
        };
    }

    /**
     * Paginate content for single-column layouts
     */
    private paginateSingleColumn(sections: CVSection[], cvData: any): PageContent[] {
        const pages: PageContent[] = [];
        let currentPage: PageContent = {
            sections: [],
            remainingHeight: this.config.pageHeight - this.config.marginTop - this.config.marginBottom
        };

        for (const section of sections) {
            const height = this.heightEstimator.getEstimatedHeight(section, cvData);
            
            if (height <= currentPage.remainingHeight - 30 || currentPage.sections.length === 0) {
                currentPage.sections.push(section);
                currentPage.remainingHeight -= height;
            } else {
                // Start new page
                if (currentPage.sections.length > 0) {
                    pages.push(currentPage);
                }
                
                currentPage = {
                    sections: [section],
                    remainingHeight: this.config.pageHeight - this.config.marginTop - this.config.marginBottom - height
                };
            }
        }

        // Add last page
        if (currentPage.sections.length > 0) {
            pages.push(currentPage);
        }

        return pages;
    }
}
