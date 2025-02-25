"use client";
import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";

export default function AdditionalSections() {
    const {
        links,
        languages,
        hobbies,
        activeAdditionalSections,
        toggleAdditionalSection,
        addLink,
        removeLink,
        updateLink,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addHobby,
        updateHobby,
        removeHobby
    } = useCVStore();

    // Ensure sections are activated if they have values on page load
    useEffect(() => {
        const updatedSections = new Set(activeAdditionalSections);

        if (links.length > 0) updatedSections.add("Links");
        if (languages.length > 0) updatedSections.add("Languages");
        if (hobbies.length > 0) updatedSections.add("Hobbies");

        useCVStore.setState({ activeAdditionalSections: Array.from(updatedSections) });

    }, [links, languages, hobbies]);

    return (
        <div className="space-y-6 text-gray-600">
            {/* Links Section */}
            {activeAdditionalSections.includes("Links") && (
                <div className="border rounded-lg p-4 bg-white shadow relative">
                    <h4 className="text-lg font-semibold text-[#CE367F]">Links</h4>
                    <button
                        onClick={() => {
                            toggleAdditionalSection("Links");
                            useCVStore.setState({ links: [] });
                        }}
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
                            {index > 0 && (
                                <button onClick={() => removeLink(index)} className="px-3 py-1 bg-red-500 text-white rounded">
                                    ✖
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={() => addLink({ label: "", url: "" })}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        + Add
                    </button>
                </div>
            )}

            {/* Languages Section */}
            {activeAdditionalSections.includes("Languages") && (
                <div className="border rounded-lg p-4 bg-white shadow relative">
                    <h4 className="text-lg font-semibold text-[#CE367F]">Languages</h4>
                    <button
                        onClick={() => {
                            toggleAdditionalSection("Languages");
                            useCVStore.setState({ languages: [] });
                        }}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                        ✖ Remove
                    </button>

                    {languages.map((language, index) => (
                        <div key={index} className="flex items-center gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="Enter language"
                                value={language}
                                onChange={(e) => updateLanguage(index, e.target.value)}
                                className="w-2/3 h-[40px] border border-gray-300 rounded px-2"
                            />
                            {/* {index > 0 && ( */}
                            <button onClick={() => removeLanguage(index)} className="px-3 py-1 bg-red-500 text-white rounded">
                                ✖
                            </button>
                            {/* )} */}
                        </div>
                    ))}
                    <button
                        onClick={addLanguage}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        + Add
                    </button>
                </div>
            )}

            {/* Hobbies Section */}
            {activeAdditionalSections.includes("Hobbies") && (
                <div className="border rounded-lg p-4 bg-white shadow relative">
                    <h4 className="text-lg font-semibold text-[#CE367F]">Hobbies</h4>
                    <button
                        onClick={() => {
                            toggleAdditionalSection("Hobbies");
                            useCVStore.setState({ hobbies: [] });
                        }}
                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                        ✖ Remove
                    </button>

                    {hobbies.map((hobby, index) => (
                        <div key={index} className="flex items-center gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="Enter hobby"
                                value={hobby}
                                onChange={(e) => updateHobby(index, e.target.value)}
                                className="w-2/3 h-[40px] border border-gray-300 rounded px-2"
                            />
                            {/* {index > 0 && ( */}
                            <button onClick={() => removeHobby(index)} className="px-3 py-1 bg-red-500 text-white rounded">
                                ✖
                            </button>
                            {/* )} */}
                        </div>
                    ))}
                    <button
                        onClick={addHobby}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                    >
                        + Add
                    </button>
                </div>
            )}
        </div>
    );
}
