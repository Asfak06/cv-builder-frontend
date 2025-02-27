import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { FaEnvelope, FaGlobe, FaHeart, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
export default function Template2() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();

    return (
        <div className="bg-[#ededed] flex flex-col md:flex-row max-w-4xl border-b-[15px] border-[#333d3f] mx-auto min-h-[1123px]">
            {/* Left Column */}
            <div className="bg-[#e3e3e3] text-white mt-[100px] p-4 w-full md:w-1/2">
                {/* Header Section */}
                <div className="flex justify-center items-center mt-[-80px] gap-6">
                    <img
                        src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white"
                    />
                </div>
                {/* Profile Summary */}
                <div className="mt-10">
                    <h2 className="text-xl text-[#333a3f] uppercase font-semibold border-b pb-1">Profile Summary:</h2>
                    <p className="text-gray-700 text-justify text-sm mt-2">{parse(summary)}</p>
                </div>
                {/* Skills */}
                <div className="mt-10">
                    <h2 className="text-xl text-[#333a3f] uppercase font-semibold border-b pb-1">Skills & Expertise:</h2>
                    <div className="gap-2 mt-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="block text-gray-700 pb-1 text-sm">{skill}</span>
                        ))}
                    </div>
                </div>
                {/* Contact Information */}
                <div className="mt-10">
                    <h2 className="text-xl text-[#333a3f] uppercase font-semibold border-b pb-1">Contact Information</h2>
                    <p className="flex items-center mt-1 text-gray-700 pb-1 text-sm"><FaEnvelope className="mr-2" /> {personalDetails.email}</p>
                    <p className="flex items-center mt-1 text-gray-700 pb-1 text-sm"><FaPhone className="mr-2" /> {personalDetails.phone}</p>
                    <p className="flex items-center mt-1 text-gray-700 pb-1 text-sm"><FaMapMarkerAlt className="mr-2" /> {personalDetails.city}, {personalDetails.country}</p>
                </div>
                {/* References */}
                <div className="mt-6">
                    <h2 className="text-xl text-[#333a3f] uppercase font-semibold border-b pb-1">References</h2>
                    {references.map((ref, index) => (
                        <p key={index} className="text-gray-700 text-[16px] mt-2"><strong>{ref.name}</strong> <span className="flex items-center mt-1 text-gray-700 pb-1 text-sm">{ref.position}</span><span className="flex items-center text-gray-700 pb-1 text-sm">{ref.company}</span></p>
                    ))}
                </div>

                {/* Links Section */}
                {links.length > 0 && (
                    <div className="mt-4 space-y-2 border-b border-white-200 pb-4">
                        <h2 className="text-xl text-[#333a3f] uppercase font-semibold border-b pb-1">Links</h2>
                        {links.map((link, index) => (
                            <p key={index} className="flex items-center">
                                <TbWorld className="mr-2" />
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#333a3f] text-sm pb-1 hover:underline">{link.label}</a>
                            </p>
                        ))}
                    </div>
                )}

                {/* Hobbies Section */}
                {hobbies.length > 0 && (
                    <div className="mt-4 border-b border-white-200 pb-4">
                        <h2 className="text-lg text-[#333a3f] font-semibold uppercase pb-1 flex items-center"><FaHeart className="mr-2" /> Hobbies</h2>
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            {hobbies.map((hobby, index) => (
                                <li
                                    className="pl-4 text-[#333a3f] relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#333a3f] before:rounded-full before:absolute before:left-[0] before:top-[5px] last:before:content-none"
                                    key={index}
                                >
                                    {hobby}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {/* Right Column */}
            <div className="p-6 pt-[130px] w-full md:w-2/3">
                <div className="w-full pb-3">
                    <h1 className="text-4xl mb-1 font-bold text-gray-800">{personalDetails.firstName} {personalDetails.lastName}</h1>
                    <p className="text-gray-600 tracking-[3px] font-bold text-[16px] uppercase">{personalDetails.jobTitle}</p>
                </div>
                {/* Work Experience */}
                <div className="mt-7">
                    <h2 className="text-xl text-[#333a3f] uppercase font-semibold pb-2">Work Experience:</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="mt-1 mb-8">
                            <h3 className="text-[16px] mb-2 uppercase font-semibold">{exp.jobTitle}</h3>
                            <p className="text-gray-500 text-[16px] font-semibold italic">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        </div>
                    ))}
                </div>
                {/* Education */}
                <div className="mt-10">
                    <h2 className="text-xl text-[#333a3f] uppercase font-semibold pb-2">Academic Background:</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="mt-2 mb-8">
                            <h3 className="text-[16px] mb-2 uppercase font-semibold">{edu.degree}</h3>
                            <p className="text-gray-500 text-[16px] font-semibold italic">{edu.institution} ({edu.year})</p>
                        </div>
                    ))}
                </div>

                {/* Languages Section */}
                {languages.length > 0 && (
                    <div className="mt-6 pb-4">
                        <h2 className="text-xl font-semibold uppercase border-b border-gray-800 mb-5 pb-1 flex items-center">
                            <FaGlobe className="mr-2" /> Languages
                        </h2>
                        <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-5">
                            {languages.map((language, index) => (
                                <li className="text-gray-800 text-sm pb-1 uppercase border-b-[3px] border-gray-800" key={index}>
                                    {language}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Custom Sections */}
                <div className="mt-6">
                    {customSections.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-xl font-semibold border-b border-gray-800 pb-1 uppercase">{section.sectionTitle}</h2>
                            {section.items.map((item, idx) => (
                                <div key={idx} className="mt-4">
                                    <h3 className="text-lg text-gray-600 mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                    <div className="text-gray-500 text-sm text-justify">{parse(item.description)}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
