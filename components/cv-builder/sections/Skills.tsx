import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function Skills() {
    const { skills, addSkill, removeSkill, currentCV } = useCVStore();
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const skillOptions = ["JavaScript", "React", "Node.js", "Java", "PHP", "Ruby", "Swift", "Kotlin", "HTML5", "CSS3", "Next.js", "Tailwind CSS", "TypeScript", "Python", "Django", "MongoDB", "SQL", "GraphQL"];
    const popularSkills = ["JavaScript", "React", "Next.js", "Tailwind CSS", "Node.js", "Python", "TypeScript", "SQL", "HTML5", "CSS3"];

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
        const value = input.trim();
        if (value && !skills.includes(value)) {
            addSkill(value);
            setInput("");
            setSuggestions([]);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);

        if (value.trim()) {
            const filtered = skillOptions.filter(skill =>
                skill.toLowerCase().includes(value.toLowerCase()) && !skills.includes(skill)
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestedSkill) => {
        setInput(suggestedSkill); // শুধু ইনপুটে বসাবে, অ্যাড করবে না
        setSuggestions([]);
    };

    const handlePopularSkillClick = (skill) => {
        if (!skills.includes(skill)) {
            addSkill(skill);
        }
    };

    return (
        <div className="lg:p-[30px] p-[15px] border rounded-lg bg-white">
            <h3 className="text-lg text-[#CE367F] font-semibold">Skills</h3>
            <p className="text-[12px] text-[#979797] mb-3">
                List your top skills based on relevant position
            </p>

            {/* Popular Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
                {popularSkills.map((skill, index) => (
                    <button
                        key={index}
                        onClick={() => handlePopularSkillClick(skill)}
                        className="text-sm px-4 py-2 text-[#312D60] border border-[#312D60] hover:border-[#CE367F] rounded-full hover:bg-[#CE367F] hover:text-white transition flex items-center justify-center gap-1"
                    >
                        {skill}
                        <FaPlus className="text-xs" />
                    </button>
                ))}
            </div>


            {/* Input Field with Suggestion */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Enter skill..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                        }
                    }}
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

            {/* Add Button */}
            <div>
                <button onClick={handleAddSkill} className="mt-[10px] text-[#5570F1] font-medium hover:text-[#CE367F]">
                    + Add
                </button>
            </div>

            {/* Skill Tags */}
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
