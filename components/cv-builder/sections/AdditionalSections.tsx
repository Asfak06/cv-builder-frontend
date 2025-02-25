"use client";
import { useCVStore } from "@/store/cvStore";
import { useState } from "react";

export default function AdditionalSections() {
    const { links, languages, hobbies, activeAdditionalSections, toggleAdditionalSection, addLink, removeLink, updateLink, addLanguage, removeLanguage, addHobby, removeHobby } = useCVStore();
    const [newLink, setNewLink] = useState({ label: "", url: "" });
    const [newLanguage, setNewLanguage] = useState("");
    const [newHobby, setNewHobby] = useState("");

    return (
        <div className=" space-y-6 text-gray-600">
            {/* Links Section */}
            {activeAdditionalSections.includes("Links") && (
                <div className="border rounded-lg p-4 bg-white shadow relative">
                    <h4 className="text-lg font-semibold text-[#CE367F]">Links</h4>
                    {/* Remove Section Button */}
                    <button
                        onClick={() => toggleAdditionalSection("Links")}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                        ✖ Remove
                    </button>

                    {links.map((link, index) => (
                        <div key={index} className="flex gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="Label (e.g. LinkedIn)"
                                value={link.label}
                                onChange={(e) => updateLink(index, "label", e.target.value)}
                                className="w-1/3 h-[40px] border border-gray-300 rounded px-2"
                            />
                            <input
                                type="text"
                                placeholder="URL"
                                value={link.url}
                                onChange={(e) => updateLink(index, "url", e.target.value)}
                                className="w-2/3 h-[40px] border border-gray-300 rounded px-2"
                            />
                            <button onClick={() => removeLink(index)} className="px-3 py-1 bg-red-500 text-white rounded">
                                ✖
                            </button>
                        </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Label"
                            value={newLink.label}
                            onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                            className="w-1/3 h-[40px] border border-gray-300 rounded px-2"
                        />
                        <input
                            type="text"
                            placeholder="URL"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            className="w-[57%] h-[40px] border border-gray-300 rounded px-2"
                        />
                        <button
                            onClick={() => {
                                if (newLink.label && newLink.url) {
                                    addLink(newLink);
                                    setNewLink({ label: "", url: "" });
                                }
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            + Add
                        </button>
                    </div>
                </div>
            )}

            {/* Languages Section */}
            {activeAdditionalSections.includes("Languages") && (
                <div className="border rounded-lg p-4 bg-white shadow relative">
                    <h4 className="text-lg font-semibold text-[#CE367F]">Languages</h4>
                    {/* Remove Section Button */}
                    <button
                        onClick={() => toggleAdditionalSection("Languages")}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                        ✖ Remove
                    </button>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {languages.map((language, index) => (
                            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                                {language}
                                <button onClick={() => removeLanguage(language)} className="ml-2 text-red-500 font-bold">
                                    ✖
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Enter language"
                            value={newLanguage}
                            onChange={(e) => setNewLanguage(e.target.value)}
                            className="w-2/3 h-[40px] border border-gray-300 rounded px-2"
                        />
                        <button
                            onClick={() => {
                                if (newLanguage) {
                                    addLanguage(newLanguage);
                                    setNewLanguage("");
                                }
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            + Add
                        </button>
                    </div>
                </div>
            )}

            {/* Hobbies Section */}
            {activeAdditionalSections.includes("Hobbies") && (
                <div className="border rounded-lg p-4 bg-white shadow relative">
                    <h4 className="text-lg font-semibold text-[#CE367F]">Hobbies</h4>
                    {/* Remove Section Button */}
                    <button
                        onClick={() => toggleAdditionalSection("Hobbies")}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                        ✖ Remove
                    </button>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {hobbies.map((hobby, index) => (
                            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                                {hobby}
                                <button onClick={() => removeHobby(hobby)} className="ml-2 text-red-500 font-bold">
                                    ✖
                                </button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            placeholder="Enter hobby"
                            value={newHobby}
                            onChange={(e) => setNewHobby(e.target.value)}
                            className="w-2/3 h-[40px] border border-gray-300 rounded px-2"
                        />
                        <button
                            onClick={() => {
                                if (newHobby) {
                                    addHobby(newHobby);
                                    setNewHobby("");
                                }
                            }}
                            className="px-3 py-1 bg-blue-500 text-white rounded"
                        >
                            + Add
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
