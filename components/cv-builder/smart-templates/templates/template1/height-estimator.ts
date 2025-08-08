import { CVSection, HeightEstimator } from '../../core/types';

export class Template1HeightEstimator implements HeightEstimator {
  getEstimatedHeight(section: CVSection, data: any): number {
    const heights: Record<string, number> = {
      header: 180,
      summary: Math.max(140, (data.summary?.length || 0) * 0.8 + 100),
      experience: Math.max(200, (data.experience?.length || 0) * 140 + 80),
      education: Math.max(140, (data.education?.length || 0) * 90 + 80),
      skills: Math.max(140, Math.ceil((data.skills?.length || 0) / 3) * 50 + 100),
      contact: 180,
      references: Math.max(140, (data.references?.length || 0) * 90 + 80),
      // Languages: grid with 2 columns, each item has border-bottom and spacing.
      // Account for container top margin (mt-10 ~40px), title, mt-2, and pb-4.
      // Use a slightly larger per-row height to cover borders and line-height.
      languages: (() => {
        const count = data.languages?.length || 0;
        const rows = Math.max(1, Math.ceil(count / 2));
        const ROW_HEIGHT = 44; // li + border + line-height
        const OVERHEAD = 100; // title, margins (mt-10, mt-2), pb-4, misc
        return Math.max(130, rows * ROW_HEIGHT + OVERHEAD);
      })(),
      hobbies: Math.max(120, (data.hobbies?.length || 0) * 35 + 80),
      links: 140,
      custom: Math.max(
        160,
        (data.customSections?.reduce((total: number, cs: any) => total + cs.items.length * 70, 0) ||
          0) + 100
      ),
    };

    const baseHeight = heights[section.type] || 140;
    const finalHeight = Math.ceil(baseHeight * 1.08); // 8% padding

    console.log(`Height estimate for ${section.type}: ${finalHeight}px`);
    return finalHeight;
  }
}
