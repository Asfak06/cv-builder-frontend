import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";

export default function Experience() {
    const { experience, addExperience, updateExperience, currentCV } = useCVStore();

    // Auto-fill experience when currentCV changes
    useEffect(() => {
        if (currentCV?.experience) {
            currentCV.experience.forEach((exp, index) => {
                updateExperience(index, "jobTitle", exp.jobTitle);
                updateExperience(index, "company", exp.company);
                updateExperience(index, "startDate", exp.startDate);
                updateExperience(index, "endDate", exp.endDate);
            });
        }
    }, [currentCV, updateExperience]);

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Employment History</h3>
            {experience.map((exp, index) => (
                <div key={index} className="mt-4 border p-2 rounded bg-white">
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(index, "jobTitle", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <div className="flex gap-4 mt-2">
                        <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                            className="w-1/2 p-2 border rounded"
                        />
                        <input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                            className="w-1/2 p-2 border rounded"
                        />
                    </div>
                </div>
            ))}
            <button onClick={addExperience} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                + Add Experience
            </button>
        </div>
    );
}
