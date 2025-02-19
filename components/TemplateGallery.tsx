"use client";
import { useCVStore } from "@/store/cvStore";
import { useRouter } from "next/navigation";

import { templates } from "@/lib/data";

export default function TemplateGallery() {
    const router = useRouter();
    const { selectedIndustry, updateTemplate } = useCVStore();

    // Filter templates based on the selected industry
    const filteredTemplates =
        selectedIndustry === "All"
            ? templates
            : templates.filter((template) => template.industry === selectedIndustry);

    return (
        <div className="px-6 py-10">
            {/* Templates Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                        <div key={template.id} className="relative group cursor-pointer">
                            <img src={template.img} alt={template.name} className="rounded-lg shadow-md w-full" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={() => {
                                        updateTemplate(`${template.id}`)
                                        router.push(`/cv-builder?template=${template.id}`)
                                    }}
                                    className="px-4 py-2 bg-pink-600 text-white font-bold rounded-lg"
                                >
                                    Use this Template
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">No templates available for this industry.</p>
                )}
            </div>
        </div>
    );
}
