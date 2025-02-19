"use client";
import CVPreview from "@/components/cv-builder/CVPreview";
import FormPanel from "@/components/cv-builder/FormPanel";
import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CVBuilderPage() {
    const searchParams = useSearchParams();
    const cvId = searchParams.get("cvId"); // Get cvId from URL
    const { userData } = useUserStore()
    const { loadCVData, resetCV } = useCVStore();
    const router = useRouter();
    // Handle CV loading/reset logic
    useEffect(() => {
        if (cvId) {
            loadCVData(cvId, userData.id);
        } else {
            resetCV(); // Reset Zustand when creating a new CV
        }
    }, [cvId, loadCVData, resetCV]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Left Panel - Forms */}
            <div className="w-full md:w-1/2 p-6 bg-[#EAEAEA] shadow-md">
                <button
                    onClick={() => router.push(`/`)}
                    className="px-4 py-2 mb-4 bg-[#CE367F] text-white font-bold rounded-lg"
                >
                    Go back
                </button>
                <FormPanel />
            </div>

            {/* Right Panel - CV Preview */}
            <div className="w-full md:w-1/2 p-6">
                <CVPreview />
            </div>
        </div>
    );
}
