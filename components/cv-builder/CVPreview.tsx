
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import TemplateSelector from "./TemplateSelector";

const templates: Record<string, React.FC> = {
    'template-1': Template1,
    'template-2': Template2,
    'template-3': Template3,
    'template-4': Template4,
};

export default function CVPreview() {
    const { selectedTemplate, saveCVData, currentCV, pages, setPages, currentPage, setCurrentPage } = useCVStore();
    const { userData } = useUserStore();
    const [loading, setLoading] = useState(false);
    const TemplateComponent = templates[selectedTemplate] || Template1;
    const previewRef = useRef<HTMLDivElement>(null);

    // Function to paginate content based on height
    const paginateCVContent = () => {
        if (!previewRef.current) return;

        const pageHeight = 1123;
        const container = previewRef.current;
        const children = Array.from(container.children);
        let accumulatedHeight = 0;
        let currentPage: ReactNode[] = [];
        const paginatedPages: ReactNode[][] = [];

        // Split content based on total height, preserving component reactivity
        children.forEach((child) => {
            const childElement = child as HTMLElement;
            const childHeight = childElement.offsetHeight;
            if (accumulatedHeight + childHeight > pageHeight) {
                // Push current page and start a new one
                if (currentPage.length > 0) {
                    paginatedPages.push([...currentPage]);
                }
                currentPage = [];
                accumulatedHeight = 0;
            }

            // Push React components directly instead of DOM nodes or HTML strings
            currentPage.push(React.cloneElement(<TemplateComponent />));
            accumulatedHeight += childHeight;
        });

        // Push any remaining content to the last page
        if (currentPage.length > 0) {
            paginatedPages.push([...currentPage]);
        }

        setPages(paginatedPages);
        setCurrentPage(0);  // Start at the first page
    };
    console.log(pages)

    // Run pagination when CV data or template changes
    useEffect(() => {
        if (currentCV) {
            setTimeout(paginateCVContent, 0);
        }
    }, [currentCV, selectedTemplate]);

    // Navigation Functions
    const nextPage = () => currentPage < pages.length - 1 && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

    // Handle PDF Download
    const handleDownloadPDF = async () => {
        await saveCVData(userData.id, true);
        setLoading(true);
        if (!currentCV?._id || !currentCV.personalDetails?.firstName) return;

        const userName = currentCV.personalDetails.firstName.replace(/\s+/g, "_");
        const fileName = `CV_${userName}_${currentCV._id}.pdf`;

        const res = await fetch(
            `/api/generate-pdf?cvId=${currentCV._id}&selectedTemplate=${selectedTemplate}`
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
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md text-gray-600">
            <TemplateSelector />
            {/* Show the current page based on the currentPage state */}
            <div ref={previewRef} className="cv-page">
                {pages.length > 0 ? pages[currentPage] : <TemplateComponent />}
            </div>
            <div className="flex gap-3 mt-5 justify-center">
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
                    {loading ? <><FaSpinner className="animate-spin" /> Processing Download</> : "Download PDF"}
                </button>
            </div>

            <div className="flex gap-3 mt-5 justify-center">
                <button
                    disabled={currentPage === 0}
                    onClick={prevPage}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Previous
                </button>
                <button
                    disabled={currentPage === pages.length - 1}
                    onClick={nextPage}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
