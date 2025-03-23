import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";

export default function Skills() {
    const { skills, addSkill, removeSkill, currentCV } = useCVStore();
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Static skill suggestions (যদি external API না থাকে)
    const skillOptions = ["JavaScript", "React", "Node.js", "Java", "PHP", "Ruby", "Swift", "Kotlin", "html5", "css3", "Next.js", "Tailwind CSS", "TypeScript", "Python", "Django", "MongoDB", "SQL", "GraphQL"];

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
            setSuggestions([]); // Suggestion লিস্ট ক্লিয়ার
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        if (value.trim()) {
            // Filter suggestions from predefined list
            const filtered = skillOptions.filter(skill =>
                skill.toLowerCase().includes(value.toLowerCase()) && !skills.includes(skill)
            );

            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestedSkill) => {
        setInput(suggestedSkill);
        setSuggestions([]); // Suggestion লিস্ট বন্ধ করা
    };

    return (
        <div className="lg:p-[30px] p-[15px] border rounded-lg bg-white">
            <h3 className="text-lg text-[#CE367F] font-semibold">Skills</h3>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Enter skill..."
                    value={input}
                    onChange={handleInputChange}
                    className="w-full h-[58px] p-[15px] text-[16px] border border-[#CFD3D4] rounded-lg"
                />
                {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        {suggestions.map((skill, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelectSuggestion(skill)}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <button onClick={handleAddSkill} className="mt-[10px] text-[#5570F1] font-medium hover:text-[#CE367F]">
                    + Add
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                    <div key={index} className="bg-[#CE367F] text-white px-3 py-1 rounded-full flex items-center">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="ml-2 text-sm font-bold">✕</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
