"use client";
import { SmartTemplateManager } from "@/components/cv-builder/smart-templates";
import FormPanel from "@/components/cv-builder/FormPanel";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function SmartCVBuilderPage() {
    const searchParams = useSearchParams();
    const cvId = searchParams.get("cvId"); // Get cvId from URL
    const { userData } = useUserStore();
    const { loadCVData, resetCV } = useCVStore();
    const router = useRouter();

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
                <button
                    onClick={() => router.push(`/`)}
                    className="flex justify-center items-center px-4 py-2 mb-4 bg-[#CE367F] text-white font-bold rounded-lg"
                >
                    <IoMdArrowRoundBack className="pr-[1px]" />
                    Go back
                </button>
                <div className="mb-4 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-blue-800 font-semibold">🧪 Smart Pagination Test</h3>
                    <p className="text-blue-700 text-sm">This is the new smart pagination system that prevents content cuts and optimizes page breaks.</p>
                </div>
                <FormPanel />
            </div>

            {/* Right Panel - Smart CV Preview */}
            <div className="w-full lg:w-1/2 h-screen fixed right-0 top-0 bg-white shadow-lg overflow-y-auto scrollbar-hidden">
                <SmartTemplateManager templateId={1} />
            </div>
        </div>
    );
}
