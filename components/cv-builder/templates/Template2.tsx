import { useCVStore } from "@/store/cvStore";

export default function Template2() {
    const { personalDetails, summary, experience, education, skills, references } = useCVStore();

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col md:flex-row">
            {/* Left Sidebar */}
            <div className="bg-gray-100 p-6 w-full md:w-1/3 rounded-lg">
                <h1 className="text-2xl font-bold">{personalDetails.firstName} {personalDetails.lastName}</h1>
                <p className="text-gray-600">{personalDetails.jobTitle}</p>
                <hr className="my-4" />

                {/* Contact Details */}
                <div className="text-sm text-gray-700 space-y-2">
                    <p>📧 {personalDetails.email}</p>
                    <p>📞 {personalDetails.phone}</p>
                    <p>📍 {personalDetails.city}, {personalDetails.country}</p>
                </div>

                <hr className="my-4" />

                {/* Skills */}
                <h2 className="text-lg font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-2/3 p-6">
                {/* Summary */}
                <h2 className="text-xl font-semibold">Summary</h2>
                <p className="text-gray-700">{summary}</p>
                <hr className="my-4" />

                {/* Experience */}
                <h2 className="text-xl font-semibold">Experience</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="mt-2">
                        <h3 className="text-lg font-semibold">{exp.jobTitle} at {exp.company}</h3>
                        <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                ))}
                <hr className="my-4" />

                {/* Education */}
                <h2 className="text-xl font-semibold">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-2">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-gray-500">{edu.institution} ({edu.year})</p>
                    </div>
                ))}
                <hr className="my-4" />

                {/* References */}
                <h2 className="text-xl font-semibold">References</h2>
                {references.map((ref, index) => (
                    <div key={index} className="mt-2">
                        <h3 className="text-lg font-semibold">{ref.name}</h3>
                        <p className="text-gray-500">{ref.position} at {ref.company}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
