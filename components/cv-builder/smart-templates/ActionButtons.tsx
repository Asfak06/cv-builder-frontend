"use client";

import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiSave } from "react-icons/fi";

interface ActionButtonsProps {
    selectedTemplate?: string; // e.g., 'template-multipage' (default)
    className?: string;
}

export default function ActionButtons({ selectedTemplate = "template-multipage", className = "" }: ActionButtonsProps) {
    const { saveCVData, currentCV } = useCVStore();
    const { userData } = useUserStore();
    const [loading, setLoading] = useState(false);

    const handleDownloadPDF = async () => {
        setLoading(true);
        try {
            await saveCVData(userData.id, true);

            if (!currentCV?._id || !currentCV.personalDetails?.firstName) {
                setLoading(false);
                return;
            }

            const userName = currentCV.personalDetails.firstName.replace(/\s+/g, "_");
            const fileName = `CV_${userName}_${currentCV._id}.pdf`;

            const res = await fetch(`/api/generate-pdf?cvId=${currentCV._id}&selectedTemplate=${encodeURIComponent(selectedTemplate)}`);
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCV = async () => {
        setLoading(true);
        try {
            await saveCVData(userData.id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex gap-3 mt-5 ${className}`}>
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
    );
}
