import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
export default function Template4() {
    const { personalDetails, summary, experience, education, skills, customSections, links, hobbies, languages } = useCVStore();

    return (
        <div className="bg-[#efefef] pt-[90px] flex flex-col relative overflow-hidden md:flex-row max-w-4xl mx-auto shadow-lg min-h-[1123]">
            {/* Header Section */}
            <div className="bg-gray-900 absolute top-0 left-0 right-0 text-white px-10 p-5 flex justify-between items-center">
                <p className="flex justify-center items-center text-gray-200"><FaPhone className="mr-5" />{personalDetails.email}</p>
                <p className="flex justify-center items-center text-gray-200"><FaEnvelope className="mr-5" />{personalDetails.phone}</p>
                <p className="flex justify-center items-center text-gray-200"><FaMapMarkerAlt className="mr-5" /> {personalDetails.city}, {personalDetails.country}</p>
            </div>
            {/* Left Column */}
            <div className="text-white pr-0 w-[40%]">
                {/* Profile Section */}
                <div className="flex items-center justify-items-center relative">
                    <img
                        src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                        alt="Profile"
                        className="w-[170px] h-[170px] table m-auto"
                    />
                    <span className="absolute bottom-0 left-0 w-[30px] h-[20px] bg-[#81ad89]"></span>
                </div>
                {/* Experience Section */}
                <div className="mt-6 p-6 pr-1 pl-5 pt-0">
                    <h2 className="text-[17px] pl-2 border-l-8 border-l-[#81ad89] text-[#090909] uppercase font-semibold">My Experiences</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="mt-5 mb-7 pl-2 relative border-l-[20px] border-l-[#81ad89]">
                            <h3 className="text-[14px] uppercase font-semibold text-[#090909] mb-1">{exp.jobTitle}</h3>
                            <p className="text-gray-500 text-sm">{exp.company}</p>
                            <span className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate}</span>
                        </div>
                    ))}
                </div>

                {/* Skills Section */}
                <div className="p-6 pl-5 pt-0">
                    <h2 className="text-[17px] pl-2 mb-5 border-l-8 border-l-[#81ad89] text-[#090909] uppercase font-semibold">Skills</h2>
                    <div className="mt-2">
                        {skills.map((skill, index) => (
                            <span key={index} className=" text-gray-500 block relative py-1 text-sm">
                                {skill}
                                <p className="bg-[#81ad89] w-[50%] h-2 absolute right-0 top-[10px]"></p>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Links Section */}
                {links.length > 0 && (
                    <div className="p-6 pl-5 pt-0">
                        <h2 className="text-[17px] pl-2 mb-5 border-l-8 border-l-[#81ad89] text-[#090909] uppercase font-semibold">Links</h2>
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
                    <div className="p-6 pl-5 pt-0">
                        <h2 className="text-[17px] pl-2 mb-5 border-l-8 border-l-[#81ad89] text-[#090909] uppercase font-semibold"> Hobbies</h2>
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            {hobbies.map((hobby, index) => (
                                <li
                                    className="pl-4 text-gray-500 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-gray-500 before:rounded-full before:absolute before:left-[0] before:top-[5px] last:before:content-none"
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
            <div className="p-6 pr-0 pt-[0] pl-0 w-[60%] bg-[#404040] w-full md:w-2/3">
                {/* Name Info */}
                <div className="bg-[#efefef] pt-3">
                    <h1 className="text-4xl font-medium pb-2 uppercase text-gray-800">{personalDetails.firstName} <span className="block font-bold">{personalDetails.lastName}</span></h1>
                </div>
                <div className="bg-[#404040]">
                    <div className="bg-[#81ad89]">
                        <p className="text-[#fff] px-5 py-3 text-lg font-medium uppercase">{personalDetails.jobTitle}</p>
                    </div>

                    {/* Profile Section */}
                    <div className="p-5">
                        <h2 className="text-[17px] pl-2 mb-5 border-l-8 border-l-[#81ad89] text-[#fff] uppercase font-semibold">My Profile</h2>
                        <p className="text-gray-200 text-justify text-sm mt-2">{parse(summary)}</p>
                    </div>
                    {/* Education Section */}
                    <div className="p-6">
                        <h2 className="text-[17px] pl-2 mb-5 border-l-8 border-l-[#81ad89] text-[#fff] uppercase font-semibold">Education Background</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="mt-2 mb-7 pl-2 py-2 relative border-l-[20px] border-l-[#81ad89]">
                                <h3 className="text-[14px] mb-2 uppercase font-semibold text-[#fff]">{edu.degree}</h3>
                                <p className="text-gray-200 pb-2 text-sm">{edu.institution}</p>
                                <span className="text-gray-200 text-sm">{edu.year}</span>
                            </div>
                        ))}
                    </div>

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="p-6">
                            <h2 className="text-[17px] pl-2 mb-5 border-l-8 border-l-[#81ad89] text-[#fff] uppercase font-semibold"> Languages
                            </h2>
                            <div className="mt-2 mb-7 pl-2 py-2 relative border-l-[20px] border-l-[#81ad89]">
                                <ul className="">
                                    {languages.map((language, index) => (
                                        <li className="text-gray-200 pb-2 text-sm" key={index}>
                                            {language}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Custom Sections */}
                    <div className="p-6">
                        {customSections.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h2 className="text-[17px] pl-2 mb-5 border-l-8 border-l-[#81ad89] text-[#fff] uppercase font-semibold">{section.sectionTitle}</h2>
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="mt-2 mb-7 pl-2 py-2 relative border-l-[20px] border-l-[#81ad89]">
                                        <h3 className="text-[14px] mb-2 uppercase font-semibold text-[#fff]">{item.title}</h3>
                                        <div className="text-gray-200 pb-2 text-sm">{parse(item.description)}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
