"use client";
import FormPanel from "@/components/cv-builder/FormPanel";
import MultiPageCVPreview from "@/components/cv-builder/MultiPageCVPreview";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function CVBuilderTestPage() {
    const searchParams = useSearchParams();
    const cvId = searchParams.get("cvId");
    const { userData } = useUserStore();
    const { loadCVData, resetCV, updateTemplate } = useCVStore();
    const router = useRouter();

    // Handle CV loading/reset logic
    useEffect(() => {
        // Set the template to our new multi-page template
        updateTemplate('template-multipage');

        if (cvId) {
            loadCVData(cvId, userData.id);
        } else {
            resetCV(); // Reset Zustand when creating a new CV
        }
    }, [cvId, loadCVData, resetCV, updateTemplate]);

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
                <h1 className="text-2xl font-bold text-slate-800 mb-6">
                    Multi-Page CV Builder (Test)
                </h1>
                <FormPanel />
            </div>

            {/* Right Panel - CV Preview with Pagination */}
            <div className="w-full lg:w-1/2 h-screen p-6 fixed right-0 top-0 bg-white shadow-lg overflow-y-auto scrollbar-hidden">
                <MultiPageCVPreview />
            </div>
        </div>
    );
}