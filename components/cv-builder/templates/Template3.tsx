import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
export default function Template3() {
    const { personalDetails, summary, experience, education, skills, references } = useCVStore();

    return (
        <div className="bg-teal-700 p-8 flex flex-col md:flex-row max-w-4xl mx-auto shadow-lg rounded-lg min-h-screen">
            {/* Left Column */}
            <div className=" text-white p-6 w-full md:w-1/3 rounded-lg md:rounded-r-none flex flex-col items-center">
                {/* Profile Image */}
                <img
                    src={personalDetails.profileImage || "https://placehold.co/500"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-white"
                />
                <h1 className="text-2xl font-bold text-center mt-4">{personalDetails.firstName} {personalDetails.lastName}</h1>
                <p className="text-gray-300 text-center">{personalDetails.jobTitle}</p>
                {/* About Me */}
                <div className="mt-6 text-center">
                    <h2 className="text-lg font-semibold border-b pb-1">About Me</h2>
                    <p className="text-gray-200 text-sm mt-2">{parse(summary)}</p>
                </div>
                {/* Contact Info */}
                <div className="mt-6 text-center">
                    <h2 className="text-lg font-semibold border-b pb-1">Contact</h2>
                    <p className="flex items-center justify-center mt-2"><FaPhone className="mr-2" /> {personalDetails.phone}</p>
                    <p className="flex items-center justify-center"><FaEnvelope className="mr-2" /> {personalDetails.email}</p>
                    <p className="flex items-center justify-center"><FaMapMarkerAlt className="mr-2" /> {personalDetails.city}, {personalDetails.country}</p>
                </div>
            </div>

            {/* Right Column */}
            <div className="bg-white p-6 w-full md:w-2/3 rounded-lg md:rounded-l-none">
                {/* Education */}
                <div>
                    <h2 className="text-xl font-semibold border-b pb-1 text-teal-700">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="text-lg font-semibold">{edu.degree}</h3>
                            <p className="text-gray-500 text-sm">{edu.institution} ({edu.year})</p>
                        </div>
                    ))}
                </div>
                {/* Work Experience */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold border-b pb-1 text-teal-700">Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                            <p className="text-gray-500 text-sm">{exp.company} ({exp.startDate} - {exp.endDate})</p>
                        </div>
                    ))}
                </div>
                {/* References */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold border-b pb-1 text-teal-700">References</h2>
                    {references.map((ref, index) => (
                        <p key={index} className="text-gray-700 text-sm mt-2"><strong>{ref.name}</strong> - {ref.company}</p>
                    ))}
                </div>
                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold border-b pb-1 text-teal-700">Personal Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-teal-700 text-white px-3 py-1 rounded-full text-sm">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
