'use client'
import Template1 from "@/components/cv-builder/templates/Template1";
import Template2 from "@/components/cv-builder/templates/Template2";
import Template3 from "@/components/cv-builder/templates/Template3";
import Template4 from "@/components/cv-builder/templates/Template4";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const templates: Record<string, React.FC> = {
    'template-1': Template1,
    'template-2': Template2,
    'template-3': Template3,
    'template-4': Template4,
};

export default function CVDownload() {
    const searchParams = useSearchParams();
    const { loadCVData, resetCV, currentCV } = useCVStore();
    const { userData } = useUserStore();
    const cvId = searchParams.get("cvId"); // Get cvId from URL
    const selectedTemplate = searchParams.get("selectedTemplate"); // Get cvId from URL
    const TemplateComponent = templates[selectedTemplate] || Template1;
    // Handle CV loading/reset logic
    useEffect(() => {
        if (cvId) {
            loadCVData(cvId, userData.id);
        } else {
            resetCV(); // Reset Zustand when creating a new CV
        }
    }, [cvId, loadCVData, resetCV]);

    return (
        <div id="cv-container" className="bg-white w-[794px] mx-auto shadow-md">
            {/* Hidden user name element for Puppeteer */}
            <span data-user-name={currentCV?.personalDetails?.firstName} className="hidden"></span>
            <TemplateComponent />
        </div>
    );
}
