"use client";
import { useCVStore } from "@/store/cvStore";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
export default function CustomSections() {
    const { customSections, addCustomSection, removeCustomSection, updateCustomSectionTitle, addCustomItem, updateCustomItem, removeCustomItem, addLink, addLanguage, addHobby } = useCVStore();
    const { toggleAdditionalSection, activeAdditionalSections } = useCVStore();
    return (
        <>
            {customSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6 lg:p-[30px] lg:pt-[20px] lg:pb-[20px] p-[15px] bg-[#fff] border rounded-lg">
                    <h3 className="text-lg text-[#CE367F] font-semibold mb-3">Additional Sections</h3>
                    {/* Section Title Input */}
                    <input
                        type="text"
                        placeholder="Section Title"
                        value={section.sectionTitle}
                        onChange={(e) => updateCustomSectionTitle(sectionIndex, e.target.value)}
                        className="w-full h-[40px] border border-gray-300 rounded px-2 mb-3"
                    />

                    {/* Items in Section */}
                    {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="min-h-[200px] ">
                            {/* Remove Item Button */}
                            <button
                                onClick={() => removeCustomItem(sectionIndex, itemIndex)}
                                className="mt-2 px-3 py-1 bg-[#CE367F] hover:bg-slate-600 text-white rounded my-2"
                            >
                                Remove Item
                            </button>
                            <input
                                type="text"
                                placeholder="Item Title"
                                value={item.title}
                                onChange={(e) => updateCustomItem(sectionIndex, itemIndex, "title", e.target.value)}
                                className="w-full h-[40px] border border-gray-300 rounded px-2 mb-2"
                            />


                            <ReactQuill
                                value={item.description}
                                onChange={(text) => updateCustomItem(sectionIndex, itemIndex, "description", text)}
                                placeholder="Write a short summary about yourself..."
                                className="w-full text-[16px] resize-none rounded-lg h-[60px]"
                                theme="snow"
                            />


                        </div>
                    ))}

                    {/* Add Item Button */}
                    <button
                        onClick={() => addCustomItem(sectionIndex)}
                        className="mt-[10px] text-[#5570F1] font-medium hover:text-[#CE367F]"
                    >
                        + Add Item
                    </button>

                    {/* Remove Section Button */}
                    <button
                        onClick={() => removeCustomSection(sectionIndex)}
                        className="mt-[10px] ml-3 text-[#5570F1] font-medium hover:text-[#CE367F]"
                    >
                        Remove Section
                    </button>
                </div>
            ))}
            <div className="lg:p-[30px] p-[15px] pb-6 bg-[#fff]">
                {/* Add Section Button */}

                {["Links", "Languages", "Hobbies"].map((section) => (
                    <button key={section} onClick={() => {
                        if (section === 'Links') addLink({ label: "", url: "" });
                        if (section === 'Languages') addLanguage();
                        if (section === 'Hobbies') addHobby();
                        toggleAdditionalSection(section)
                    }} className={`mt-4 px-4 py-2 mx-2  text-white rounded ${activeAdditionalSections.includes(section) ? 'bg-slate-500' : 'bg-[#CE367F]'}`}>
                        {section}
                    </button>
                ))}
                <button
                    onClick={addCustomSection}
                    className="mt-4 px-4 py-2 bg-[#CE367F] hover:bg-slate-600 text-white rounded"
                >
                    + Add Section
                </button>
            </div>
        </>
    );
}
