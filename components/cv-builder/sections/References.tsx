import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";

export default function References() {
    const { references, addReference, updateReference, currentCV } = useCVStore();


    // Auto-fill experience when currentCV changes
    useEffect(() => {
        if (currentCV?.references) {
            currentCV.references.forEach((exp, index) => {
                updateReference(index, "name", exp.name);
                updateReference(index, "position", exp.position);
                updateReference(index, "company", exp.company);
            });
        }
    }, [currentCV, updateReference]);
    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">References</h3>
            {references.map((ref, index) => (
                <div key={index} className="mt-4 border p-2 rounded bg-white">
                    <input
                        type="text"
                        placeholder="Name"
                        value={ref.name}
                        onChange={(e) => updateReference(index, "name", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Position"
                        value={ref.position}
                        onChange={(e) => updateReference(index, "position", e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={ref.company}
                        onChange={(e) => updateReference(index, "company", e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                </div>
            ))}
            <button onClick={addReference} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                + Add Reference
            </button>
        </div>
    );
}
