import { useCVStore } from "@/store/cvStore";

export default function Template1() {
    const { personalDetails, summary, experience, education, skills, references } = useCVStore();

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg">
            {/* Personal Details */}
            <h1 className="text-3xl font-bold">{personalDetails.firstName} {personalDetails.lastName}</h1>
            <p className="text-gray-600">{personalDetails.jobTitle}</p>
            <p className="text-gray-500">{personalDetails.email} | {personalDetails.phone}</p>

            {/* Summary */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Summary</h2>
                <p className="text-gray-700">{summary}</p>
            </div>

            {/* Experience */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Experience</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="mt-2">
                        <h3 className="text-lg font-semibold">{exp.jobTitle} at {exp.company}</h3>
                        <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                ))}
            </div>

            {/* Education */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-2">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-gray-500">{edu.institution} ({edu.year})</p>
                    </div>
                ))}
            </div>

            {/* Skills */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
