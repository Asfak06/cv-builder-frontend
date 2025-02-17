import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";

export default function Education() {
    const { education, addEducation, updateEducation, currentCV } = useCVStore();

    // Auto-fill experience when currentCV changes
    useEffect(() => {
        if (currentCV?.education) {
            currentCV.education.forEach((exp, index) => {
                updateEducation(index, "degree", exp.degree);
                updateEducation(index, "institution", exp.institution);
                updateEducation(index, "year", exp.year);
            });
        }
    }, [currentCV, updateEducation]);
    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Education</h3>
            {education.map((edu, index) => (
                <div key={index} className="mt-4 border p-2 rounded bg-white">
                    <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateEducation(index, "year", e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                </div>
            ))}
            <button onClick={addEducation} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                + Add Education
            </button>
        </div>
    );
}
