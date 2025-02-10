import { useCVStore } from "@/store/cvStore";

export default function Summary() {
    const { summary, updateSummary } = useCVStore();

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
