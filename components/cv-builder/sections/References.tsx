import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function References() {
    const { references, addReference, updateReference, currentCV, removeReference } = useCVStore();
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // active div index

    // Function to toggle visibility of the divs
    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    // Auto-fill references when currentCV changes
    useEffect(() => {
        if (currentCV?.references) {
            currentCV.references.forEach((ref, index) => {
                updateReference(index, "name", ref.name);
                updateReference(index, "position", ref.position);
                updateReference(index, "company", ref.company);
            });
        }
    }, [currentCV, updateReference]);

    return (
        <div className="lg:p-[30px] p-[15px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">References</h3>

            {references.map((ref, index) => (
                <div key={index} className="mt-4">
                    {/* Accordion Header */}
                    <div
                        onClick={() => handleToggle(index)}
                        className="cursor-pointer w-full relative text-left px-4 py-2 mb-2 bg-[#F7F7F7] text-[#CE367F] rounded-[5px]"
                    >
                        {ref.name ? ref.name : activeIndex === index ? "History" : "History"}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                removeReference(index);
                            }}
                            className="absolute top-[12px] right-[15px] text-[#CE367F] hover:text-red-700"
                        >
                            <FaTrash />
                        </button>
                    </div>

                    {/* Smoothly Expanding & Collapsing Section */}
                    <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeIndex === index ? "max-h-[500px]" : "max-h-0"
                            }`}
                    >
                        {activeIndex === index && (
                            <div className="bg-white mt-2 relative">

                                <div className="relative mb-[20px]">
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
                                    <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Position</label>
                                    <input
                                        type="text"
                                        placeholder="Position"
                                        value={ref.position}
                                        onChange={(e) => updateReference(index, "position", e.target.value)}
                                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="text-[12px] text-[#5E6366] absolute top-[10px] left-[16px]">Company</label>
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        value={ref.company}
                                        onChange={(e) => updateReference(index, "company", e.target.value)}
                                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Add Reference Button */}
            <button
                onClick={() => {
                    addReference();
                    setActiveIndex(references.length); // নতুন আইটেম খুলে দেখাবে
                }}
                className="mt-[10px] text-[#5570F1] font-medium hover:text-[#CE367F]"
            >
                + Add Reference
            </button>
        </div>
    );
}
