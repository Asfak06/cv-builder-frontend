import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";

export default function Experience() {
    const { experience, addExperience, updateExperience, currentCV } = useCVStore();

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
                <div key={index} className="mt-4 border p-[15px] rounded bg-white">
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
                    <div className="flex gap-4 mt-2">
                        <div className="relative w-[50%]">
                            <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Date</label>
                            <input
                                type="date"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                                className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                            />
                        </div>
                        <div className="relative w-[50%]">
                            <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Date</label>
                            <input
                                type="date"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                                className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            ))
            }
            <button onClick={addExperience} className="mt-4 px-4 py-2 bg-[#CE367F] text-white rounded">
                + Add Experience
            </button>
        </div >
    );
}
