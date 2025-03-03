import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

export default function Education() {
    const { education, addEducation, updateEducation, currentCV, removeEducation } = useCVStore();

    // Auto-fill experience when currentCV changes
    useEffect(() => {
        if (currentCV?.education) {
            currentCV.education.forEach((exp, index) => {
                updateEducation(index, "degree", exp.degree);
                updateEducation(index, "institution", exp.institution);
                updateEducation(index, "year", exp.year);
            });
        }
    }, [currentCV, updateEducation]);
    return (
        <div className="p-[30px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Education</h3>
            {education.map((edu, index) => (
                <div key={index} className="mt-4 border p-[35px] rounded bg-white relative">
                    <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 text-[#CE367F] hover:text-red-700"
                    >
                        <FaTrash />
                    </button>
                    <div className=" relative mb-[20px]">
                        <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Degree</label>
                        <input
                            type="text"
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, "degree", e.target.value)}
                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                        />
                    </div>
                    <div className=" relative mb-[20px]">
                        <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Institution</label>
                        <input
                            type="text"
                            placeholder="Institution"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, "institution", e.target.value)}
                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                        />
                    </div>
                    <div className=" relative">
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
            ))}
            <button onClick={addEducation} className="mt-4 px-4 py-2 bg-[#CE367F] hover:bg-slate-600 text-white rounded">
                + Add Education
            </button>
        </div>
    );
}
