import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
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
    const { selectedTemplate, saveCVData, currentCV } = useCVStore();
    const { userData } = useUserStore()
    const [loading, setLoading] = useState(false)
    const TemplateComponent = templates[selectedTemplate] || Template1;

    const handleDownloadPDF = async () => {
        await saveCVData(userData.id)
        setLoading(true)
        if (!currentCV?._id || !currentCV.personalDetails?.firstName) return;

        const userName = currentCV.personalDetails.firstName.replace(/\s+/g, "_"); // Remove spaces
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
        setLoading(false)
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md text-gray-600">
            <TemplateSelector />
            <TemplateComponent />
            <div className="flex gap-3 mt-5">
                <button
                    onClick={() => saveCVData(userData.id)}
                    className="px-4 py-2 bg-pink-600 text-white font-bold rounded-lg"
                >
                    Save
                </button>

                <button
                    onClick={handleDownloadPDF}
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg"
                >
                    {loading ? 'processing download...' : 'Download PDF'}
                </button>
            </div>
        </div>
    );
}
