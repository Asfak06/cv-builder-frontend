"use client";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Template1 from "./templates/Template1";
import Template10 from "./templates/Template10";
import Template11 from "./templates/Template11";
import Template12 from "./templates/Template12";
import Template13 from "./templates/Template13";
import Template14 from "./templates/Template14";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";
import Template6 from "./templates/Template6";
import Template7 from "./templates/Template7";
import Template8 from "./templates/Template8";
import Template9 from "./templates/Template9";
import TemplateMultipage from "./templates/TemplateMultipage";
import TemplateSelector from "./TemplateSelector";


// A4 dimensions in pixels (at 96 DPI)
const PAGE_HEIGHT = 1123;
const PAGE_WIDTH = 794;

const templates: Record<string, React.FC> = {
    'template-1': Template1,
    'template-2': Template2,
    'template-3': Template3,
    'template-4': Template4,
    'template-5': Template5,
    'template-6': Template6,
    'template-7': Template7,
    'template-8': Template8,
    'template-9': Template9,
    'template-10': Template10,
    'template-11': Template11,
    'template-12': Template12,
    'template-13': Template13,
    'template-14': Template14,
    'template-multipage': TemplateMultipage,
};

export default function MultiPageCVPreview() {
    const { selectedTemplate, saveCVData, currentCV } = useCVStore();
    const { userData } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [pages, setPages] = useState<number>(1);
    const [scale, setScale] = useState(0.6);

    const contentRef = useRef<HTMLDivElement>(null);
    const templateRef = useRef<HTMLDivElement>(null);

    const TemplateComponent = useMemo(() => templates[selectedTemplate] || Template1, [selectedTemplate]);

    // Get template background color based on selected template
    const getTemplateBackgroundColor = () => {
        switch (selectedTemplate) {
            case 'template-1':
                return '#232B35';
            case 'template-2':
                return '#ffffff';
            case 'template-3':
                return '#ffffff';
            case 'template-4':
                return '#ffffff';
            // Add more template background colors as needed
            default:
                return '#ffffff';
        }
    };

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

    // Calculate number of pages
    useEffect(() => {
        const calculatePages = () => {
            if (templateRef.current) {
                const templateHeight = templateRef.current.scrollHeight;
                const calculatedPages = Math.max(1, Math.ceil(templateHeight / PAGE_HEIGHT));
                if (calculatedPages !== pages) {
                    setPages(calculatedPages);
                }
            }
        };

        const initialTimer = setTimeout(calculatePages, 300);
        window.addEventListener("resize", calculatePages);

        const observer = new MutationObserver(calculatePages);
        if (templateRef.current) {
            observer.observe(templateRef.current, {
                childList: true,
                subtree: true,
                characterData: true,
                attributes: true
            });
        }

        return () => {
            clearTimeout(initialTimer);
            window.removeEventListener("resize", calculatePages);
            observer.disconnect();
        };
    }, [currentCV, pages]);

    const handleDownloadPDF = async () => {
        await saveCVData(userData.id, true);
        setLoading(true);

        if (!currentCV?._id || !currentCV.personalDetails?.firstName) return;

        const userName = currentCV.personalDetails.firstName.replace(/\s+/g, "_");
        const fileName = `CV_${userName}_${currentCV._id}.pdf`;

        const res = await fetch(`/api/generate-pdf?cvId=${currentCV._id}&selectedTemplate=${selectedTemplate}`);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        setLoading(false);
    };

    return (
        <div className="p-2 border bg-gray-50 shadow-md text-gray-600 relative">
            <div>
                {/* Template Selector Panel */}
                <div className={`fixed top-0 left-0 bottom-0 h-auto w-[50%] bg-white shadow-lg p-4 transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <TemplateSelector />
                    <button
                        className="mt-3 px-2 pt-[5px] absolute top-0 right-[10px] w-[30px] h-[30px] py-2 bg-[#CE367F] text-white rounded-full shadow-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoMdClose />
                    </button>
                </div>

                {/* Preview Area */}
                <div style={{ transform: `scale(${scale})`, transformOrigin: "top" }}>
                    {/* Hidden Template for Measuring */}
                    <div
                        ref={templateRef}
                        className="absolute opacity-0 pointer-events-none"
                        style={{ width: `${PAGE_WIDTH}px` }}
                    >
                        <TemplateComponent />
                    </div>

                    {/* Multi-Page CV Container */}
                    <div
                        ref={contentRef}
                        className="cv-container relative "
                    >
                        {Array.from({ length: pages }).map((_, index) => (
                            <div
                                key={index}
                                className={`cv-page mx-auto ${index === pages - 1 ? "" : "mb-8"}`}
                                style={{
                                    width: `${PAGE_WIDTH}px`,
                                    height: `${PAGE_HEIGHT}px`,
                                    position: "relative",
                                    overflow: "hidden",
                                    backgroundColor: getTemplateBackgroundColor(),
                                }}
                            >
                                {/* Page Content */}
                                <div
                                    className="absolute"
                                    style={{ 
                                        transform: `translateY(-${index * (PAGE_HEIGHT)}px)`,
                                    }}
                                >
                                    <TemplateComponent />
                                </div>

                                {/* Page number indicator */}
                                <div className="absolute bottom-[-50px] right-4 z-50">
                                    <span className="text-sm text-[#262626] relative z-50"> Page {index + 1} of {pages}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-5">
                        <button
                            onClick={() => saveCVData(userData.id)}
                            className="flex justify-center items-center px-5 py-2 text-[20px] bg-[#CE367F] hover:bg-slate-600 text-white font-bold rounded-full"
                        >
                            <FiSave className="pr-[2px]" />
                            Save
                        </button>

                        <button
                            onClick={handleDownloadPDF}
                            className="px-4 py-2 text-[20px] bg-[#CE367F] hover:bg-slate-600 text-white font-bold rounded-full flex items-center gap-2"
                            disabled={loading}
                        >
                            <FaFilePdf />
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" /> Processing Download
                                </>
                            ) : (
                                "Download PDF"
                            )}
                        </button>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-4 py-2 text-[20px] text-[#312D60] border-2 border-[#312D60] hover:bg-[#CE367F] hover:border-[#CE367F] hover:text-white rounded-full shadow-md"
                        >
                            Change Template
                        </button>

                        {/* Page Count Display */}
                        <div className="flex justify-between items-center">
                            <div className="px-5 py-3 text-[20px] bg-[#CE367F] hover:bg-slate-600 text-white font-bold rounded-full flex items-center gap-2">
                                Pages: {pages}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}