import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

export default function References() {
    const { references, addReference, updateReference, currentCV, removeEducation } = useCVStore();


    // Auto-fill experience when currentCV changes
    useEffect(() => {
        if (currentCV?.references) {
            currentCV.references.forEach((exp, index) => {
                updateReference(index, "name", exp.name);
                updateReference(index, "position", exp.position);
                updateReference(index, "company", exp.company);
            });
        }
    }, [currentCV, updateReference]);
    return (
        <div className="p-[30px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">References</h3>
            {references.map((ref, index) => (
                <div key={index} className="mt-4 border p-[35px] rounded bg-white relative">
                    <button
                        onClick={() => removeEducation(index)}
                        className="absolute top-2 right-2 text-[#CE367F] hover:text-red-700"
                    >
                        <FaTrash />
                    </button>
                    <div className=" relative mb-[20px]">
                        <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={ref.name}
                            onChange={(e) => updateReference(index, "name", e.target.value)}
                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                        />
                    </div>
                    <div className="relative mb-[20px]">
                        <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Name</label>
                        <input
                            type="text"
                            placeholder="Position"
                            value={ref.position}
                            onChange={(e) => updateReference(index, "position", e.target.value)}
                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                        />
                    </div>
                    <div className="relative">
                        <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Name</label>
                        <input
                            type="text"
                            placeholder="Company"
                            value={ref.company}
                            onChange={(e) => updateReference(index, "company", e.target.value)}
                            className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                        />
                    </div>
                </div>
            ))}
            <button onClick={addReference} className="mt-4 px-4 py-2 bg-[#CE367F] hover:bg-slate-600 text-white rounded">
                + Add Reference
            </button>
        </div>
    );
}
