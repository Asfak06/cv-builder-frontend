import { useCVStore } from "@/store/cvStore";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMagic } from "react-icons/fa";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import React Quill New for Next.js SSR compatibility
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function EducationSummary() {
    const { summary, updateSummary, currentCV, selectedIndustry } = useCVStore();
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [showPopover, setShowPopover] = useState(false);

    // Auto-fill summary when currentCV changes
    useEffect(() => {
        if (currentCV?.summary) {
            updateSummary(currentCV.summary);
        }
    }, [currentCV, updateSummary]);

    // Fetch AI-generated summary suggestions
    const fetchSuggestions = async () => {
        if (!selectedIndustry) {
            toast.error("Please select an industry first.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post("https://dev.app.pixiai.net/api/summery", {
                profession: selectedIndustry,
            });
            if (response.data?.status && response.data.professional_summary) {
                setSuggestions(response.data.professional_summary);
                setShowPopover(true);
            } else {
                toast.error("No suggestions available.");
            }
        } catch (error) {
            console.error("Error fetching summary suggestions:", error);
            toast.error("Failed to fetch suggestions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-whitess relative mt-5 lg:min-h-[250px] min-h-[250px]">
            {/* Header with Button */}
            <div className="lg:flex justify-between items-center mb-4">
                <button
                    onClick={fetchSuggestions}
                    className="flex lg:items-center gap-2 bg-[#CE367F]  text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition">
                    {loading ? "Loading..." : <> <FaMagic /> Get Suggestions</>}
                </button>
            </div>

            {/* Popover for Suggestions */}
            {showPopover && (
                <div className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-md p-4 border z-10">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-gray-600">Click a suggestion to insert it:</p>
                        <button onClick={() => setShowPopover(false)} className="text-gray-500 hover:text-gray-700">✖</button>
                    </div>
                    {suggestions.map((suggestion, index) => (
                        <p
                            key={index}
                            className="p-2 border rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                updateSummary(suggestion);
                                setShowPopover(false);
                            }}
                        >
                            {suggestion}
                        </p>
                    ))}
                </div>
            )}

            {/* Quill Editor */}
            <ReactQuill
                value={summary}
                onChange={updateSummary}
                placeholder="Write a short summary about yourself..."
                className="w-full text-[16px] resize-none rounded-lg h-[140px]"
                theme="snow"
            />
        </div>
    );
}
