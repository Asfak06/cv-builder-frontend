"use client";

import React, { useEffect, useState } from "react";
import { useCVStore } from "@/store/cvStore";
import { Space_Grotesk } from "next/font/google";
import { FaSpinner } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";

import { SmartPaginationEngine } from '../../core/PaginationEngine';
import { Template1Config } from './config';
import { Template1HeightEstimator } from './height-estimator';
import { Template1SectionRenderer } from './renderer';
import { PageContent } from '../../core/types';

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function SmartTemplate1Preview() {
    const { personalDetails, summary, experience, education, skills, references, languages, hobbies, links, customSections } = useCVStore();
    const [loading, setLoading] = useState(false);
    const [pages, setPages] = useState<PageContent[]>([]);
    const [scale, setScale] = useState(0.6);

    // Initialize template components
    const heightEstimator = new Template1HeightEstimator();
    const sectionRenderer = new Template1SectionRenderer();
    const paginationEngine = new SmartPaginationEngine(Template1Config, heightEstimator);

    // Responsive scale adjustment
    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth > 1600) setScale(0.7);
            else if (window.innerWidth > 1200) setScale(0.6);
            else setScale(0.5);
        };

        window.addEventListener('resize', updateScale);
        updateScale();

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Smart pagination logic
    useEffect(() => {
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
            customSections
        };

        const calculatedPages = paginationEngine.paginateContent(cvData);
        setPages(calculatedPages);
    }, [personalDetails, summary, experience, education, skills, references, languages, hobbies, links, customSections]);

    const handleDownloadPDF = async () => {
        setLoading(true);
        // Add PDF generation logic here
        setLoading(false);
    };

    const handleSaveCV = async () => {
        setLoading(true);
        // Add save logic here
        setLoading(false);
    };

    return (
        <div className="p-2 border bg-gray-50 shadow-md text-gray-600 relative">
            <div>
                {/* Preview Area */}
                <div style={{ transform: `scale(${scale})`, transformOrigin: "top" }}>
                    {/* Smart Multi-Page CV Container */}
                    <div className="cv-container relative">
                        {pages.map((page, pageIndex) => (
                            <div
                                key={pageIndex}
                                className={`cv-page mx-auto ${pageIndex === pages.length - 1 ? "" : "mb-8"}`}
                                style={{
                                    width: `${Template1Config.pageWidth}px`,
                                    minHeight: `${Template1Config.pageHeight}px`,
                                    height: `${Template1Config.pageHeight}px`,
                                    position: "relative",
                                    overflow: "hidden",
                                    backgroundColor: "#232B35",
                                    pageBreakAfter: pageIndex < pages.length - 1 ? 'always' : 'auto',
                                }}
                            >
                                {/* Page content */}
                                <div className={`${spaceGrotesk.className} h-full`}>                                    
                                    {/* Render sections for this page */}
                                    <div 
                                        className="h-full flex flex-col"
                                        style={{
                                            paddingTop: `${Template1Config.marginTop}px`,
                                            paddingBottom: `${Template1Config.marginBottom}px`,
                                            maxHeight: `${Template1Config.pageHeight}px`,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {/* Header Section (Full Width) - Only on first page or if page has header */}
                                        {page.sections.length > 0 && page.sections.filter(section => section.type === 'header').map((section, sectionIndex) => 
                                            sectionRenderer.renderSection(section, pageIndex * 1000 + sectionIndex)
                                        )}
                                        
                                        {/* Two Column Layout */}
                                        <div className={`flex flex-col md:flex-row h-full px-[20px] ${page.sections.length > 0 ? 'pt-[50px]' : 'pt-[20px]'} pb-[30px]`}>
                                            {/* Left Column */}
                                            <div className="text-white w-full md:w-[45%] border-r-2 border-[#323b48] pr-5">
                                                {page.leftSections?.map((section, sectionIndex) => 
                                                    sectionRenderer.renderSection(section, pageIndex * 1000 + 100 + sectionIndex)
                                                )}
                                            </div>
                                            
                                            {/* Right Column */}
                                            <div className="w-full md:w-[55%] pl-[30px]">
                                                {page.rightSections?.map((section, sectionIndex) => 
                                                    sectionRenderer.renderSection(section, pageIndex * 1000 + 200 + sectionIndex)
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Page number indicator */}
                                <div className="absolute bottom-[-50px] right-4 z-50">
                                    <span className="text-sm text-[#262626] relative z-50">Page {pageIndex + 1} of {pages.length}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={loading}
                            className="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <FaFilePdf className="mr-2" />
                            )}
                            Download PDF
                        </button>

                        <button
                            onClick={handleSaveCV}
                            disabled={loading}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mr-2" />
                            ) : (
                                <FiSave className="mr-2" />
                            )}
                            Save CV
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
