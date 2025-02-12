import { useCVStore } from "@/store/cvStore";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export default function Template1() {
    const { personalDetails, links, summary, experience, education, skills, references } = useCVStore();

    return (
        <div className="bg-gray-100 p-6 flex flex-col md:flex-row max-w-4xl mx-auto shadow-lg rounded-lg min-h-[842px]">
            {/* Left Column */}
            <div className="bg-gray-800 text-white p-6 w-full md:w-1/3 rounded-lg md:rounded-r-none">
                {/* Profile Image */}
                <div className="flex justify-center">
                    <img
                        src={personalDetails.profileImage || "https://placehold.co/500"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white"
                    />
                </div>
                {/* Personal Details */}
                <div className="text-center mt-4">
                    <h1 className="text-2xl font-bold">{personalDetails.firstName} {personalDetails.lastName}</h1>
                    <p className="text-gray-400">{personalDetails.jobTitle}</p>
                </div>
                <div className="mt-4 space-y-2">
                    <p className="flex items-center"><FaEnvelope className="mr-2" /> {personalDetails.email}</p>
                    <p className="flex items-center"><FaPhone className="mr-2" /> {personalDetails.phone}</p>
                    <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {personalDetails.city}, {personalDetails.country}</p>
                </div>
                {/* Links */}
                <div className="mt-4 space-y-2">
                    {links.map((link, index) => (
                        <p key={index} className="flex items-center">
                            {link.label.includes("LinkedIn") ? <FaLinkedin className="mr-2" /> : <FaGithub className="mr-2" />}
                            {link.url}
                        </p>
                    ))}
                </div>
                {/* Summary */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold border-b pb-1">About Me</h2>
                    <p className="text-gray-300 text-sm mt-2">{summary}</p>
                </div>
                {/* References */}
                <div className="mt-6">
                    <h2 className="text-lg font-semibold border-b pb-1">References</h2>
                    {references.map((ref, index) => (
                        <p key={index} className="text-gray-300 text-sm mt-2"><strong>{ref.name}</strong> - {ref.position} at {ref.company}</p>
                    ))}
                </div>
            </div>

            {/* Right Column */}
            <div className="bg-white p-6 w-full md:w-2/3 rounded-lg md:rounded-l-none">
                {/* Experience */}
                <div>
                    <h2 className="text-xl font-semibold border-b pb-1">Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                            <p className="text-gray-500 text-sm">{exp.company} ({exp.startDate} - {exp.endDate})</p>
                        </div>
                    ))}
                </div>
                {/* Education */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold border-b pb-1">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="text-lg font-semibold">{edu.degree}</h3>
                            <p className="text-gray-500 text-sm">{edu.institution} ({edu.year})</p>
                        </div>
                    ))}
                </div>
                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold border-b pb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
