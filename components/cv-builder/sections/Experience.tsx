'use client';
import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import { FaAngleDown, FaTrash } from "react-icons/fa";
import CommonSummary from "./CommonSummary";

export default function Experience() {
    const {
        experience,
        addExperience,
        updateExperience,
        removeExperience,
        currentCV,
        selectedIndustry,
    } = useCVStore();

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    useEffect(() => {
        if (currentCV?.experience) {
            currentCV.experience.forEach((exp, index) => {
                updateExperience(index, "jobTitle", exp.jobTitle);
                updateExperience(index, "company", exp.company);
                updateExperience(index, "startDate", exp.startDate);
                updateExperience(index, "endDate", exp.endDate);
                if (exp.description) {
                    updateExperience(index, "description", exp.description);
                }
            });
        }
    }, [currentCV, updateExperience]);

    return (
        <div className="lg:p-[30px] p-[15px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg mb-2 text-[#CE367F] font-semibold">Employment History</h3>
            <p className="text-[12px] text-[#979797]">
                Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.
            </p>

            {experience.map((exp, index) => (
                <div key={index} className="mt-4">
                    {/* Accordion Header */}
                    <div
                        onClick={() => handleToggle(index)}
                        className="cursor-pointer relative text-left px-4 py-2 mb-2 bg-[#F7F7F7] text-[#CE367F] rounded-[5px] flex justify-between items-center"
                    >
                        <span>{exp.jobTitle || "Employment"}</span>

                        {/* Rotating Arrow */}
                        <span
                            className={`transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""
                                }`}
                        >
                            <FaAngleDown />
                        </span>

                        {/* Trash Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeExperience(index);
                            }}
                            className="absolute top-[12px] right-[-25px] text-[#CE367F] hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                    </div>

                    {/* Accordion Content */}
                    <div
                        className={`transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[1000px]" : "max-h-0"
                            }`}
                    >
                        {activeIndex === index && (
                            <div className="bg-white mt-2 relative">
                                <div>
                                    <div className="relative mb-[20px]">
                                        <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Job Title</label>
                                        <input
                                            type="text"
                                            placeholder="Job Title"
                                            value={exp.jobTitle}
                                            onChange={(e) => updateExperience(index, "jobTitle", e.target.value)}
                                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                        />
                                    </div>

                                    <div className="relative mb-[20px]">
                                        <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="Company Name"
                                            value={exp.company}
                                            onChange={(e) => updateExperience(index, "company", e.target.value)}
                                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                        />
                                    </div>

                                    <div className="lg:flex gap-4 mt-2 items-center">
                                        <div className="relative lg:w-[50%] mt-[-30px]">
                                            <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Start Date</label>
                                            <input
                                                type="date"
                                                value={exp.startDate}
                                                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                                className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                            />
                                        </div>

                                        <div className="relative lg:w-[50%]">
                                            <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">End Date</label>
                                            <input
                                                type="date"
                                                value={exp.endDate === "Present" ? "" : exp.endDate}
                                                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                                disabled={exp.endDate === "Present"}
                                                className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg disabled:bg-gray-200"
                                            />
                                            <div className="flex items-center pt-[10px] gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={exp.endDate === "Present"}
                                                    onChange={(e) => updateExperience(index, "endDate", e.target.checked ? "Present" : "")}
                                                    className="w-[25px] h-[25px] text-[#CE367F] border border-gray-300 rounded-[20px] focus:ring focus:ring-[#CE367F]"
                                                />
                                                <label className="text-[14px] text-[#ABAFB1]">Currently Working Here</label>
                                            </div>
                                        </div>
                                    </div>

                                    <CommonSummary
                                        description={exp.description || ""}
                                        updateDescription={(text) => updateExperience(index, "description", text)}
                                        industry={selectedIndustry}
                                        sectionType="experience"
                                    />
                                </div>
                                <p className="text-[12px] text-[#979797] absolute right-0 bottom-[-5px]">150/200 words</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Add Experience Button */}
            <button
                onClick={() => {
                    addExperience();
                    setActiveIndex(experience.length);
                }}
                className="text-[#5570F1] font-medium hover:text-[#CE367F] mt-4"
            >
                + Add Experience
            </button>
        </div>
    );
}
