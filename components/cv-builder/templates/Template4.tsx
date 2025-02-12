import { useCVStore } from "@/store/cvStore";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Template4() {
    const { personalDetails, summary, experience, education, skills } = useCVStore();

    return (
        <div className="bg-gray-100 p-8 max-w-4xl mx-auto shadow-lg rounded-lg min-h-[842px]">
            {/* Header Section */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center rounded-t-lg">
                <p>{personalDetails.email}</p>
                <p><FaMapMarkerAlt className="inline-block mr-2" /> {personalDetails.city}, {personalDetails.country}</p>
            </div>
            <div className="p-6 flex items-center gap-6">
                <img
                    src={personalDetails.profileImage || "https://placehold.co/500"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-300"
                />
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{personalDetails.firstName} <span className="text-green-600">{personalDetails.lastName}</span></h1>
                    <p className="text-gray-600 text-lg">{personalDetails.jobTitle}</p>
                </div>
            </div>
            {/* Profile Section */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-700">My Profile</h2>
                <p className="text-gray-700 text-sm mt-2">{summary}</p>
            </div>
            {/* Experience Section */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-700">My Experiences</h2>
                {experience.map((exp, index) => (
                    <div key={index} className="mt-4">
                        <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                        <p className="text-gray-500 text-sm">{exp.company} ({exp.startDate} - {exp.endDate})</p>
                    </div>
                ))}
            </div>
            {/* Education Section */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-700">Education Background</h2>
                {education.map((edu, index) => (
                    <div key={index} className="mt-4">
                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                        <p className="text-gray-500 text-sm">{edu.institution} ({edu.year})</p>
                    </div>
                ))}
            </div>
            {/* Skills Section */}
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-700">Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">{skill}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
