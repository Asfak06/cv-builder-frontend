import { useCVStore } from "@/store/cvStore";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMagic } from "react-icons/fa";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import React Quill New for Next.js SSR compatibility
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Summary() {
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
        <>
            <div className="lg:p-[30px] p-[15px] border rounded-lg bg-white shadow-md relative lg:min-h-[350px] min-h-[380px]">
                {/* Header with Button */}
                <div className="mb-4">
                    <h3 className="text-lg text-[#CE367F] font-semibold lg:mb-2 mb-2">Professional Summary</h3>
                    <p className="text-[12px] text-[#979797]">Write 2-4 short, energetic sentences about how great you are. Mention the role and what you did. What were the big achievements? Describe your motivation and list your skills.</p>
                </div>

                {/* Popover for Suggestions */}
                <div className="relative">
                    <button
                        onClick={fetchSuggestions}
                        className="flex lg:items-center absolute right-[10px] top-[9px] gap-2 border-[1px] border-[#CE367F] hover:bg-[#CE367F] text-[12px] text-[#CE367F] hover:text-[#fff] px-3 py-[5px] rounded-full transition">
                        {loading ? "Loading..." : <> <FaMagic /> Get Suggestions</>}
                    </button>
                    {showPopover && (
                        <div className="absolute top-12 right-0 w-80 bg-white shadow-lg rounded-md p-4 border z-10">
                            <div className="flex justify-between items-center mb-2">
                                <p className="text-sm text-gray-600">Click a suggestion to insert it:</p>
                                <button onClick={() => setShowPopover(false)} className="text-gray-500 hover:text-gray-700">✖</button>
                            </div>
                            {suggestions.map((suggestion, index) => (
                                <p
                                    key={index}
                                    className="p-2 border text-sm text-gray-700 h-full rounded-lg cursor-pointer hover:bg-gray-100"
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
                </div>

                {/* Quill Editor */}
                <div>
                    <ReactQuill
                        value={summary}
                        onChange={updateSummary}
                        placeholder="Write a short summary about yourself..."
                        className="w-full text-[16px] resize-none rounded-lg h-[140px]"
                        theme="snow"
                    />
                </div>
                <p className="text-[12px] text-[#979797] absolute right-7 bottom-5">150/200 words</p>
            </div>

        </>
    );
}
