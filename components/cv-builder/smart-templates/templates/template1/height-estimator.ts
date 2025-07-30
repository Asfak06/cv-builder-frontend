import { HeightEstimator, CVSection } from '../../core/types';

export class Template1HeightEstimator implements HeightEstimator {
    getEstimatedHeight(section: CVSection, data: any): number {
        const heights: Record<string, number> = {
            'header': 180,
            'summary': Math.max(140, (data.summary?.length || 0) * 0.8 + 100),
            'experience': Math.max(200, (data.experience?.length || 0) * 140 + 80),
            'education': Math.max(140, (data.education?.length || 0) * 90 + 80),
            'skills': Math.max(140, Math.ceil((data.skills?.length || 0) / 3) * 50 + 100),
            'contact': 180,
            'references': Math.max(140, (data.references?.length || 0) * 90 + 80),
            'languages': Math.max(120, Math.ceil((data.languages?.length || 0) / 2) * 40 + 80),
            'hobbies': Math.max(120, (data.hobbies?.length || 0) * 35 + 80),
            'links': 140,
            'custom': Math.max(160, (data.customSections?.reduce((total: number, cs: any) => total + cs.items.length * 70, 0) || 0) + 100)
        };
        
        const baseHeight = heights[section.type] || 140;
        const finalHeight = Math.ceil(baseHeight * 1.08); // 8% padding
        
        console.log(`Height estimate for ${section.type}: ${finalHeight}px`);
        return finalHeight;
    }
}
