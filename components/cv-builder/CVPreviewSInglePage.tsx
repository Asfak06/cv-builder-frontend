"use client";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
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
const templates: Record<string, React.FC> = {
    'template-1': Template1,
    'template-2': Template2,
    'template-3': Template3,
    'template-4': Template4,
    'template-multipage': TemplateMultipage,
};

export default function CVPreview() {
    const { selectedTemplate, saveCVData, currentCV } = useCVStore();
    const { userData } = useUserStore()
    const [loading, setLoading] = useState(false)
    const TemplateComponent = templates[selectedTemplate] || Template1;
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="p-2 border bg-gray-50 shadow-md text-gray-600 relative">
            <div className="">
                {/* Open Button */}
                <button
                    className="px-4 py-2 fixed top-[25px] left-[43%] bg-[#CE367F] mb-5 text-white rounded-lg shadow-md"
                    onClick={() => setIsOpen(true)}
                >
                    Change
                </button>

                {/* Template Selector with Animation */}
                <div
                    className={`fixed top-0 left-0 bottom-0 h-auto w-[50%] bg-white shadow-lg p-4 transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    {/* Template Selector */}
                    <TemplateSelector />

                    {/* Close Button inside TemplateSelector */}
                    <button
                        className="mt-3 px-2 pt-[5px] absolute top-0 right-[10px] w-[30px] h-[30px] py-2 bg-[#CE367F] text-white rounded-full shadow-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <IoMdClose />
                    </button>
                </div>

                {/* Selected Template */}
                <TemplateComponent />

                {/* Buttons */}
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
                        {loading ? <><FaSpinner className="animate-spin" /> Processing Download</> : "Download PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
}
