"use client";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import TemplateMultipage from "./templates/TemplateMultipage";
import TemplateSelector from "./TemplateSelector";

// A4 dimensions in pixels (at 96 DPI)
const PAGE_HEIGHT = 1123; // A4 height in pixels
const PAGE_WIDTH = 794; // A4 width in pixels

const templates: Record<string, React.FC> = {
    'template-1': Template1,
    'template-2': Template2,
    'template-3': Template3,
    'template-4': Template4,
    'template-multipage': TemplateMultipage,
};


export default function MultiPageCVPreview() {
    const { selectedTemplate, saveCVData, currentCV } = useCVStore();
    const { userData } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [pages, setPages] = useState<number>(1);
    const contentRef = useRef<HTMLDivElement>(null);
    const templateRef = useRef<HTMLDivElement>(null);
    const TemplateComponent = templates[selectedTemplate] || Template1;
    // Calculate number of pages based on content height
    useEffect(() => {
        // We'll measure the template height directly, not the container that has multiple pages
        const calculatePages = () => {
            if (templateRef.current) {
                const templateHeight = templateRef.current.scrollHeight;
                const calculatedPages = Math.max(1, Math.ceil(templateHeight / PAGE_HEIGHT));

                // Only update if different to avoid re-renders
                if (calculatedPages !== pages) {
                    setPages(calculatedPages);
                }
            }
        };

        // Initial calculation after a slight delay to ensure rendering
        const initialTimer = setTimeout(calculatePages, 300);

        // Recalculate when window is resized
        window.addEventListener("resize", calculatePages);

        // We'll use a mutation observer instead of an interval to watch for content changes
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

        const res = await fetch(
            `/api/generate-pdf?cvId=${currentCV._id}&selectedTemplate=template-multipage`
        );

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
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md text-gray-600 relative">
            <div>
                {/* Header Controls */}
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="px-4 py-2 bg-[#CE367F] text-white rounded-lg shadow-md flex items-center gap-2"
                        onClick={() => setIsOpen(true)}
                    >
                        Change Template
                    </button>

                    <div className="text-sm font-medium bg-slate-200 px-3 py-1 rounded-md">
                        Pages: {pages}
                    </div>
                </div>

                {/* Template Selector with Animation */}
                <div
                    className={`fixed top-0 left-0 bottom-0 h-auto w-[50%] bg-white shadow-lg p-4 transition-transform duration-500 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <TemplateSelector />
                    <button
                        className="mt-3 px-2 pt-[5px] absolute top-0 right-[10px] w-[30px] h-[30px] py-2 bg-[#CE367F] text-white rounded-full shadow-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoMdClose />
                    </button>
                </div>

                {/* Hidden template for measuring height */}
                <div
                    ref={templateRef}
                    className="absolute opacity-0 pointer-events-none"
                    style={{ width: `${PAGE_WIDTH}px` }}
                >
                    <TemplateComponent />
                </div>

                {/* Multi-page CV Container */}
                <div
                    ref={contentRef}
                    className="cv-container relative bg-gray-200 p-4 rounded-lg shadow-inner"
                >
                    {/* Generate pages dynamically */}
                    {Array.from({ length: pages }).map((_, index) => (
                        <div
                            key={index}
                            className={`cv-page bg-white shadow-md mx-auto ${index === pages - 1 ? "" : "mb-8"
                                }`}
                            style={{
                                width: `${PAGE_WIDTH}px`,
                                height: `${PAGE_HEIGHT}px`,
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    transform: `translateY(-${index * PAGE_HEIGHT}px)`,
                                }}
                            >
                                <TemplateComponent />
                            </div>

                            {/* Page number indicator */}
                            <div className="absolute bottom-3 right-4 text-xs text-gray-400">
                                Page {index + 1} of {pages}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-5">
                    <button
                        onClick={() => saveCVData(userData.id)}
                        className="flex justify-center items-center px-4 py-2 bg-[#CE367F] hover:bg-slate-600 text-white font-bold rounded-lg"
                    >
                        <FiSave className="pr-[2px]" />
                        Save
                    </button>

                    <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-[#CE367F] hover:bg-slate-600 text-white font-bold rounded-lg flex items-center gap-2"
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
                </div>
            </div>
        </div>
    );
}