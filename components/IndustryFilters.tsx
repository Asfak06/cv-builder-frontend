"use client";
import { useCVStore } from "@/store/cvStore";

const industries = [
    "Software Engineer",
    "Web Designer",
    "Product Manager",
    "Accountant",
    "Teacher",
    "SEO",
    "Photographer",
    "HR",
    "Graphic Designer",
];

export default function IndustryFilters() {
    const { selectedIndustry, updateIndustry } = useCVStore();

    return (
        <div className="flex flex-wrap justify-center gap-4 px-6">
            {industries.map((industry, index) => (
                <button
                    key={index}
                    className={`px-4 py-2 rounded-full shadow-md transition ${selectedIndustry === industry ? "bg-pink-500 text-white" : "bg-white hover:bg-gray-200 text-gray-500"
                        }`}
                    onClick={() => updateIndustry(industry)}
                >
                    {industry}
                </button>
            ))}
        </div>
    );
}
