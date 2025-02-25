import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
export default function Template1() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections } = useCVStore();

    return (
        <div className="bg-gray-100 p-6 flex flex-col md:flex-row max-w-4xl mx-auto shadow-lg rounded-lg min-h-[1123px]">
            {/* Left Column */}
            <div className="bg-gray-800 text-white p-6 pr-0 w-full md:w-1/3">
                {/* Profile Image */}
                <div className="flex justify-center pr-5">
                    <img
                        src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white"
                    />
                </div>
                {/* Links */}
                <div className="mt-4 space-y-2">
                    {links.map((link, index) => (
                        <p key={index} className="flex items-left">
                            {link.label.includes("LinkedIn") ? <FaLinkedin className="mr-2" /> : <FaGithub className="mr-2" />}
                            {link.url}
                        </p>
                    ))}
                </div>
                {/* Summary */}
                <div className="mt-6 border-b border-[#ddd]">
                    <h2 className="text-lg font-semibold border-b border-gray-800 uppercase pb-1">About Me</h2>
                    <p className="text-gray-300 text-sm mt-2 pr-5 pb-5 text-justify">{parse(summary)}</p>
                </div>
                {/* References */}
                <div className="mt-5 pb-5 border-b border-[#ddd]">
                    <h2 className="text-lg font-semibold border-b border-gray-800 uppercase pb-1">References</h2>
                    {references.map((ref, index) => (
                        <p key={index} className="text-gray-300 text-sm mt-2"><strong>{ref.name}</strong> <span className="font-normal block pt-1">{ref.position}</span> <span className="font-normal block pt-1">{ref.company}</span></p>
                    ))}
                </div>
            </div>

            {/* Right Column */}
            <div className="bg-white p-6 w-full md:w-2/3">
                <div className="flex justify-between items-center pb-[30px] pt-[30px]">
                    {/* Personal Details */}
                    <div className="text-left mt-4">
                        <h1 className="text-2xl font-bold uppercase">{personalDetails.firstName} {personalDetails.lastName}</h1>
                        <p className="text-gray-400 uppercase">{personalDetails.jobTitle}</p>
                    </div>
                    <div className="mt-4 space-y-2">
                        <p className="flex items-center"><span className="flex justify-center items-center w-[35px] mr-2 h-[35px] bg-gray-800 rounded-full"><FaEnvelope className="text-[#fff]" /></span> {personalDetails.email}</p>
                        <p className="flex items-center"><span className="flex justify-center items-center w-[35px] mr-2 h-[35px] bg-gray-800 rounded-full"><FaPhone className="text-[#fff]" /></span> {personalDetails.phone}</p>
                        <p className="flex items-center"><span className="flex justify-center items-center w-[35px] mr-2 h-[35px] bg-gray-800 rounded-full"><FaMapMarkerAlt className="text-[#fff]" /></span> {personalDetails.city}, {personalDetails.country}</p>
                    </div>
                </div>
                {/* Experience */}
                <div>
                    <h2 className="text-xl mb-5 font-semibold border-b border-gray-800 uppercase pb-1">Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="pl-4 border-l-2 border-gray-800">
                            <h3 className="text-lg mb-2 font-semibold relative before:content-[''] before:w-2.5 before:h-2.5 before:bg-gray-800 before:rounded-full before:absolute before:-left-[22px] before:top-[0px] leading-[14px]">{exp.jobTitle}</h3>
                            <p className="text-gray-500 text-sm pb-8">{exp.company} ({exp.startDate} - {exp.endDate})</p>
                        </div>
                    ))}
                </div>
                {/* Education */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-5 border-b border-gray-800 uppercase pb-1">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="pl-4 border-l-2 border-gray-800">
                            <h3 className="text-lg mb-2 font-semibold relative before:content-[''] before:w-2.5 before:h-2.5 before:bg-gray-800 before:rounded-full before:absolute before:-left-[22px] before:top-[0px] leading-[14px]">{edu.degree}</h3>
                            <p className="text-gray-500 pb-8 text-sm">{edu.institution} ({edu.year})</p>
                        </div>
                    ))}
                </div>
                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold uppercase border-b border-gray-800 pb-1">Skills</h2>
                    <div className="grid grid-cols-2 gap-5 mt-5">
                        {skills.map((skill, index) => (
                            <span key={index} className="text-gray-800 text-sm pb-1 uppercase border-b-[3px] border-gray-800">{skill}</span>
                        ))}
                    </div>
                </div>
                {/* Custom Sections */}
                <div className="mt-6">
                    {customSections.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-xl font-semibold border-b border-gray-800 pb-1 uppercase">{section.sectionTitle}</h2>
                            {section.items.map((item, idx) => (
                                <div key={idx} className="mt-4">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{parse(item.description)}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
