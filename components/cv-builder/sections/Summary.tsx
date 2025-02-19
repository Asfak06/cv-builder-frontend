import { useCVStore } from "@/store/cvStore";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import "react-quill-new/dist/quill.snow.css"; // Import Quill styles

// Dynamically import React Quill New for Next.js SSR compatibility
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function Summary() {
    const { summary, updateSummary, currentCV } = useCVStore();

    // Auto-fill summary when currentCV changes
    useEffect(() => {
        if (currentCV?.summary) {
            updateSummary(currentCV.summary);
        }
    }, [currentCV, updateSummary]);

    return (

        <div className="p-[30px] h-[260px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Professional Summary</h3>
            <ReactQuill
                value={summary}
                onChange={updateSummary}
                placeholder="Write a short summary about yourself..."
                className="w-full text-[16px] resize-none rounded-lg mt-2 h-[120px]"
                theme="snow"
            />
        </div>
    );
}
