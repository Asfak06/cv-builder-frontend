import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Education() {
    const { education, addEducation, updateEducation, currentCV, removeEducation } = useCVStore();
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // active div index

    // Function to toggle visibility of the divs
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Auto-fill education when currentCV changes
    useEffect(() => {
        if (currentCV?.education) {
            currentCV.education.forEach((edu, index) => {
                updateEducation(index, "degree", edu.degree);
                updateEducation(index, "institution", edu.institution);
                updateEducation(index, "year", edu.year);
            });
        }
    }, [currentCV, updateEducation]);

    return (
        <div className="lg:p-[30px] p-[15px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Education</h3>

            {education.map((edu, index) => (
                <div key={index} className="mt-4">
                    {/* Accordion Header */}
                    <div
                        onClick={() => handleToggle(index)}
                        className="cursor-pointer w-full text-left px-4 py-2 bg-[#F7F7F7] text-[#CE367F] rounded-lg"
                    >
                        {activeIndex === index ? "Hide Education" : "Show Education"}
                    </div>

                    {/* Smoothly Expanding & Collapsing Section */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[500px]" : "max-h-0"
                            }`}
                    >
                        {activeIndex === index && (
                            <div className="border lg:p-[35px] p-[25px] rounded bg-white mt-2 relative">
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="absolute top-2 right-2 text-[#CE367F] hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>

                                <div className="relative mb-[20px]">
                                    <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Degree</label>
                                    <input
                                        type="text"
                                        placeholder="Degree"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                    />
                                </div>
                                <div className="relative mb-[20px]">
                                    <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Institution</label>
                                    <input
                                        type="text"
                                        placeholder="Institution"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Year</label>
                                    <input
                                        type="text"
                                        placeholder="Year"
                                        value={edu.year}
                                        onChange={(e) => updateEducation(index, "year", e.target.value)}
                                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Add Education Button */}
            <button
                onClick={() => {
                    addEducation();
                    setActiveIndex(education.length);
                }}
                className="mt-4 px-4 py-2 bg-[#CE367F] hover:bg-slate-600 text-white rounded"
            >
                + Add Education
            </button>
        </div>
    );
}
