import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";

export default function Summary() {
    const { summary, updateSummary, currentCV } = useCVStore();

    // Auto-fill summary when currentCV changes
    useEffect(() => {
        if (currentCV?.summary) {
            updateSummary(currentCV.summary);
        }
    }, [currentCV, updateSummary]);

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Professional Summary</h3>
            <textarea
                value={summary}
                onChange={(e) => updateSummary(e.target.value)}
                placeholder="Write a short summary about yourself..."
                className="w-full p-2 border rounded mt-2 h-24"
            />
        </div>
    );
}
