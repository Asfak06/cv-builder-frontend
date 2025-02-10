'use client'
import CVPreview from "@/components/cv-builder/CVPreview";
import FormPanel from "@/components/cv-builder/FormPanel";


export default function CVBuilderPage() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Left Panel - Forms */}
            <div className="w-full md:w-1/2 p-6 bg-white shadow-md">
                <FormPanel />
            </div>

            {/* Right Panel - CV Preview */}
            <div className="w-full md:w-1/2 p-6">
                <CVPreview />
            </div>
        </div>
    );
}
