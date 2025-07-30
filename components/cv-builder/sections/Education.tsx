'use client';
import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaTrash } from "react-icons/fa";
import CommonSummary from "./CommonSummary";

export default function Education() {
    const { education, addEducation, updateEducation, currentCV, removeEducation, selectedIndustry } = useCVStore();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        if (currentCV?.education) {
            currentCV.education.forEach((edu, index) => {
                updateEducation(index, "degree", edu.degree);
                updateEducation(index, "institution", edu.institution);
                updateEducation(index, "year", edu.year);
                if (edu.description) {
                    updateEducation(index, "description", edu.description);
                }
            });
        }
    }, [currentCV, updateEducation]);

    return (
        <div className="lg:p-[30px] lg:pt-[20px] p-[15px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold mb-2">Education</h3>
            <p className="text-[12px] text-[#979797] mb-3">
                Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.
            </p>
            {education.map((edu, index) => (
                <div key={index} className="mt-4">
                    {/* Accordion Header */}
                    <div
                        onClick={() => handleToggle(index)}
                        className="cursor-pointer w-full relative text-left px-4 py-2 mb-2 bg-[#F7F7F7] text-[#CE367F] rounded-[5px] flex justify-between items-center"
                    >
                        <span>{edu.degree || "Education"}</span>

                        {/* Toggle Icon */}
                        <span className="transition-all duration-300">
                            {activeIndex === index ? <FaAngleUp /> : <FaAngleDown />}
                        </span>

                        {/* Trash Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent accordion toggle
                                removeEducation(index);
                            }}
                            className="absolute top-[12px] right-[-25px] text-[#CE367F] hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                    </div>

                    {/* Accordion Content */}
                    <div
                        className={`transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[1000px]" : "max-h-0"}`}
                    >
                        {activeIndex === index && (
                            <div className="relative">
                                <div className="bg-white mt-2 relative">
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

                                    <div className="relative mb-[20px]">
                                        <label className="text-[12px] text-[#5E6366] absolute top-[12px] left-[16px]">Year</label>
                                        <input
                                            type="text"
                                            placeholder="Year"
                                            value={edu.year}
                                            onChange={(e) => updateEducation(index, "year", e.target.value)}
                                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                        />
                                    </div>
{/* 
                                    <CommonSummary
                                        description={edu.description || ""}
                                        updateDescription={(text) => updateEducation(index, "description", text)}
                                        industry={selectedIndustry}
                                        sectionType="education"
                                    /> */}
                                </div>
                                <p className="text-[12px] text-[#979797] absolute right-0 bottom-[-5px]">150/200 words</p>
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
                className="mt-[0] text-[#5570F1] font-medium hover:text-[#CE367F]"
            >
                + Add Education
            </button>

        </div>
    );
}
