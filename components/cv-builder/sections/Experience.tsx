import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

export default function Experience() {
    const { experience, addExperience, updateExperience, currentCV, removeExperience } = useCVStore();

    // Auto-fill experience when currentCV changes
    useEffect(() => {
        if (currentCV?.experience) {
            currentCV.experience.forEach((exp, index) => {
                updateExperience(index, "jobTitle", exp.jobTitle);
                updateExperience(index, "company", exp.company);
                updateExperience(index, "startDate", exp.startDate);
                updateExperience(index, "endDate", exp.endDate);
            });
        }
    }, [currentCV, updateExperience]);

    return (
        <div className="p-[30px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Employment History</h3>
            {experience.map((exp, index) => (
                <div key={index} className="mt-4 border p-[35px] rounded bg-white relative">
                    <button
                        onClick={() => removeExperience(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                        <FaTrash />
                    </button>
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
                    <div className="flex gap-4 mt-2 items-center">
                        <div className="relative w-[50%]">
                            <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Start Date</label>
                            <input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                            />
                        </div>
                        <div className="relative w-[50%]">
                            <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">End Date</label>
                            <input
                                type="date"
                                value={exp.endDate === "Present" ? "" : exp.endDate}
                                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                disabled={exp.endDate === "Present"}
                                className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg disabled:bg-gray-200"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={exp.endDate === "Present"}
                                onChange={(e) => updateExperience(index, "endDate", e.target.checked ? "Present" : "")}
                                className="w-5 h-5 text-[#CE367F] border border-gray-300 rounded focus:ring focus:ring-[#CE367F]"
                            />
                            <label className="text-[14px] text-[#5E6366]">Currently Working Here</label>
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={addExperience} className="mt-4 px-4 py-2 bg-[#CE367F] text-white rounded">
                + Add Experience
            </button>
        </div>
    );
}
