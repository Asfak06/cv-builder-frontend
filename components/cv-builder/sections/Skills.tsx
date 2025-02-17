import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";

export default function Skills() {
    const { skills, addSkill, removeSkill, currentCV } = useCVStore();
    const [input, setInput] = useState("");

    // Auto-fill skills when currentCV changes
    useEffect(() => {
        if (currentCV?.skills) {
            currentCV.skills.forEach((skill) => {
                if (!skills.includes(skill)) {
                    addSkill(skill);
                }
            });
        }
    }, [currentCV, addSkill, skills]);

    const handleAddSkill = () => {
        if (input.trim() && !skills.includes(input)) {
            addSkill(input);
            setInput("");
        }
    };

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="flex gap-2 mt-2">
                <input
                    type="text"
                    placeholder="Enter skill..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button onClick={handleAddSkill} className="px-4 py-2 bg-blue-600 text-white rounded">
                    Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                    <div key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-2 text-sm font-bold">✕</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
