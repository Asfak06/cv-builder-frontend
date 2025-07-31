'use client'
import Template1 from "@/components/cv-builder/templates/Template1";
import Template10 from "@/components/cv-builder/templates/Template10";
import Template11 from "@/components/cv-builder/templates/Template11";
import Template12 from "@/components/cv-builder/templates/Template12";
import Template13 from "@/components/cv-builder/templates/Template13";
import Template14 from "@/components/cv-builder/templates/Template14";
import Template2 from "@/components/cv-builder/templates/Template2";
import Template3 from "@/components/cv-builder/templates/Template3";
import Template4 from "@/components/cv-builder/templates/Template4";
import Template5 from "@/components/cv-builder/templates/Template5";
import Template6 from "@/components/cv-builder/templates/Template6";
import Template7 from "@/components/cv-builder/templates/Template7";
import Template8 from "@/components/cv-builder/templates/Template8";
import Template9 from "@/components/cv-builder/templates/Template9";
import TemplateMultipage from "@/components/cv-builder/templates/TemplateMultipage";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
export default function CVDownload() {
    const searchParams = useSearchParams();
    const { loadCVData, resetCV, currentCV } = useCVStore();
    const { userData } = useUserStore();
    const cvId = searchParams.get("cvId"); // Get cvId from URL
    const selectedTemplate = searchParams.get("selectedTemplate"); // Get cvId from URL
    console.log("Selected Templete id -->", selectedTemplate)
    const TemplateComponent = templates[selectedTemplate] || Template1;
    // Handle CV loading/reset logic
    useEffect(() => {
        if (cvId) {
            loadCVData(cvId, userData.id);
        } else {
            resetCV(); // Reset Zustand when creating a new CV
        }
    }, [cvId, loadCVData, resetCV, userData.id]);

    return (
        <div id="cv-container" className="bg-white w-[794px] mx-auto shadow-md">
            {/* Hidden user name element for Puppeteer */}
            <span data-user-name={currentCV?.personalDetails?.firstName} className="hidden"></span>
            <TemplateComponent />
            {/* <MultiPageCVPreview /> */}
        </div>
    );
}
