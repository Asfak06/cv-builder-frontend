"use client";
import FormPanel from "@/components/cv-builder/FormPanel";
import MultiPageCVPreview from "@/components/cv-builder/MultiPageCVPreview";
import { SmartTemplateManager } from "@/components/cv-builder/smart-templates";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function CVBuilderPage() {
    const searchParams = useSearchParams();
    const cvId = searchParams.get("cvId"); // Get cvId from URL
    const { userData } = useUserStore();
    const { loadCVData, resetCV } = useCVStore();
    const router = useRouter();
    const [useSmartPreview, setUseSmartPreview] = useState(true); // Toggle between old and new preview

    console.log('Cv id ', cvId)

    // Handle CV loading/reset logic
    useEffect(() => {
        if (cvId) {
            loadCVData(cvId, userData.id);
        } else {
            resetCV(); // Reset Zustand when creating a new CV
        }
    }, [cvId, loadCVData, resetCV, userData.id]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
            {/* Left Panel - Forms */}
            <div className="w-full lg:w-1/2 p-6 bg-[#EAEAEA] shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => router.push(`/`)}
                        className="flex justify-center items-center px-4 py-2 bg-[#CE367F] text-white font-bold rounded-lg"
                    >
                        <IoMdArrowRoundBack className="pr-[1px]" />
                        Go back
                    </button>
                    
                    {/* Preview Toggle */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Smart Preview</span>
                        <button
                            onClick={() => setUseSmartPreview(!useSmartPreview)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                                useSmartPreview ? 'bg-[#CE367F]' : 'bg-gray-300'
                            }`}
                        >
                            <div
                                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                    useSmartPreview ? 'translate-x-6' : 'translate-x-0.5'
                                }`}
                            />
                        </button>
                    </div>
                </div>
                <FormPanel />
            </div>

            {/* Right Panel - CV Preview (Fixed with Scrollable Content) */}
            <div className="w-full lg:w-1/2 h-screen fixed right-0 top-0 bg-white shadow-lg overflow-y-auto scrollbar-hidden">
                {useSmartPreview ? (
                    <SmartTemplateManager templateId={1} />
                ) : (
                    <MultiPageCVPreview />
                )}
            </div>
        </div>
    );
}
