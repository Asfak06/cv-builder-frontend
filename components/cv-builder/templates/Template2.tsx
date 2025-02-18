import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
export default function Template2() {
    const { personalDetails, links, summary, experience, education, skills, references } = useCVStore();

    return (
        <div className="bg-gray-100 p-10 flex flex-col max-w-4xl mx-auto shadow-lg rounded-lg min-h-[842px]">
            {/* Header Section */}
            <div className="flex items-center gap-6">
                <img
                    src={personalDetails.profileImage || "https://placehold.co/500"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full border-4 border-gray-300"
                />
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{personalDetails.firstName} {personalDetails.lastName}</h1>
                    <p className="text-gray-600 text-lg">{personalDetails.jobTitle}</p>
                </div>
            </div>
            {/* Profile Summary */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b pb-1">Profile Summary</h2>
                <p className="text-gray-700 text-sm mt-2">{parse(summary)}</p>
            </div>
            {/* Work Experience */}
            <div className="mt-6">
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
                <h2 className="text-xl font-semibold border-b pb-1">Academic Background</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-4">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-gray-500 text-sm">{edu.institution} ({edu.year})</p>
                    </div>
                ))}
            </div>
            {/* Skills */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b pb-1">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">{skill}</span>
                    ))}
                </div>
            </div>
            {/* Contact Information */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b pb-1">Contact Information</h2>
                <p className="flex items-center mt-2"><FaEnvelope className="mr-2" /> {personalDetails.email}</p>
                <p className="flex items-center"><FaPhone className="mr-2" /> {personalDetails.phone}</p>
                <p className="flex items-center"><FaMapMarkerAlt className="mr-2" /> {personalDetails.city}, {personalDetails.country}</p>
                {links.map((link, index) => (
                    <a href={link.url} key={index} className="flex items-center mt-2">
                        {link.label}
                    </a>
                ))}
            </div>
            {/* References */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold border-b pb-1">References</h2>
                {references.map((ref, index) => (
                    <p key={index} className="text-gray-700 text-sm mt-2"><strong>{ref.name}</strong> - {ref.position}, {ref.company}</p>
                ))}
            </div>
        </div>
    );
}
