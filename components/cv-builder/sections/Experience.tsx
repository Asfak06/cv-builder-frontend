import { useCVStore } from "@/store/cvStore";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import EducationSummary from "./EducationSummary";

export default function Experience() {
    const { experience, addExperience, updateExperience, removeExperience } = useCVStore();
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // active div index

    // Function to toggle visibility of the divs
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="lg:p-[30px] p-[15px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Employment History</h3>

            {experience.map((exp, index) => (
                <div key={index} className="mt-4">
                    {/* Accordion header, clicking will toggle visibility */}
                    <div
                        onClick={() => handleToggle(index)}
                        className="cursor-pointer w-full relative text-left px-4 py-2 mb-2 bg-[#F7F7F7] text-[#CE367F] rounded-[5px]"
                    >
                        {exp.jobTitle ? exp.jobTitle : activeIndex === index ? "History" : "History"}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeExperience(index);
                            }}
                            className="absolute top-[12px] right-[15px] text-[#CE367F] hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                    </div>

                    {/* Only show the div if the active index matches the current index */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[500px]" : "max-h-0"
                            }`}
                    >
                        {activeIndex === index && (
                            <div className="bg-white mt-2 relative">
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
                                <EducationSummary />
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* + Add Experience Button */}
            <button
                onClick={() => {
                    addExperience(); // Add new experience
                    setActiveIndex(experience.length); // Open the newly added div
                }}
                className="mt-[10px] text-[#5570F1] font-medium hover:text-[#CE367F]"
            >
                + Add Experience
            </button>
        </div>
    );
}
