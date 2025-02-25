"use client";
import { useCVStore } from "@/store/cvStore";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
export default function CustomSections() {
    const { customSections, addCustomSection, removeCustomSection, updateCustomSectionTitle, addCustomItem, updateCustomItem, removeCustomItem } = useCVStore();

    return (
        <div className="p-[30px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Custom Sections</h3>
            {customSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-6 border p-4 rounded-lg shadow">
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
                        <div key={itemIndex} className="mb-4 p-3 border rounded-lg min-h-[230px] ">
                            {/* Remove Item Button */}
                            <button
                                onClick={() => removeCustomItem(sectionIndex, itemIndex)}
                                className="mt-2 px-3 py-1 bg-red-500 text-white rounded my-2"
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
                        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        + Add Item
                    </button>

                    {/* Remove Section Button */}
                    <button
                        onClick={() => removeCustomSection(sectionIndex)}
                        className="ml-2 mt-3 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Remove Section
                    </button>
                </div>
            ))}

            {/* Add Section Button */}
            <button
                onClick={addCustomSection}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
            >
                + Add Section
            </button>
        </div>
    );
}
