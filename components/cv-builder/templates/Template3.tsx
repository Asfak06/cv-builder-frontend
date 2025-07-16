import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";



export default function Template3() {
    const { personalDetails, links, summary, experience, education, skills, languages, hobbies, customSections, references } = useCVStore();

    return (
        <div className="bg-[#fff] flex flex-col relative overflow-hidden md:flex-row max-w-4xl mx-auto shadow-lg min-h-[1123]">
            <div className="w-[200px] h-[200px] z-20 top-[-50px] left-[-50px] rounded-full bg-[#81b1b3] absolute"></div>
            <div className="absolute top-0 left-0 right-0 px-2 py-2 flex justify-end items-center bg-[#7aa7aa]">
                <span className="w-[15px] ml-1 mr-1 h-[15px] rounded-full bg-[#62888b] inline-block"></span>
                <span className="w-[15px] ml-1 mr-1 h-[15px] rounded-full bg-[#9cc3c8] inline-block"></span>
                <span className="w-[15px] ml-1 mr-1 h-[15px] rounded-full bg-[#a8d5d8] inline-block"></span>
            </div>
            {/* Left Column */}
            <div className="text-white bg-[#62888b] px-5 mt-[170px] w-full md:w-1/3 rounded-full md:rounded-b-none flex flex-col items-center">
                {/* Profile Image */}
                <Image
                    src={
                        personalDetails.profileImage
                            ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}`
                            : "https://placehold.co/500"
                    }
                    alt="Profile"
                    width={150}
                    height={150}
                    className="w-[150px] h-[150px] rounded-full border-2 border-white object-cover"
                    unoptimized
                />
                <h1 className="text-[26px] font-extrabold uppercase text-center leading-[34px] mt-4 mb-2">{personalDetails.firstName} <span className='block'>{personalDetails.lastName}</span></h1>
                <p className="text-white text-[14px] font-medium uppercase text-center">{personalDetails.jobTitle}</p>
                {/* About Me */}
                <div className="mt-6 text-center">
                    <h2 className="text-[18px] uppercase font-semibold pb-1">About Me</h2>
                    <p className="text-gray-200 text-justify text-sm mt-2">{parse(summary)}</p>
                </div>
                {/* Contact Info */}
                <div className="mt-6 text-center">
                    <h2 className="text-[18px] uppercase font-semibold pb-1">Contact</h2>
                    <p className="mt-2 mb-3 text-gray-200"><strong className="block uppercase pb-1 text-white">Phone</strong> {personalDetails.phone}</p>
                    <p className="text-gray-200 mb-3"><strong className="block uppercase text-white pb-1">Email</strong> {personalDetails.email}</p>
                    <p className="text-gray-200 mb-3"><strong className="block uppercase text-white pb-1">Address</strong> {personalDetails.city}, {personalDetails.country}</p>
                </div>

                {/* Links Section */}
                {links.length > 0 && (
                    <div className="mt-4 space-y-2 pb-4 text-center">
                        <h2 className="text-xl text-[#fff] uppercase font-semibold pb-1">Links</h2>
                        {links.map((link, index) => (
                            <p key={index} className="flex items-center">
                                <TbWorld className="mr-2" />
                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#fff] text-sm pb-1 hover:underline">{link.label}</a>
                            </p>
                        ))}
                    </div>
                )}

                {/* Hobbies Section */}
                {hobbies.length > 0 && (
                    <div className="mt-4 pb-4 text-center">
                        <h2 className="text-lg text-[#fff] font-semibold uppercase pb-1 flex items-center"><FaHeart className="mr-2 text-[#fff]" /> Hobbies</h2>
                        <ul className="text-gray-300 text-sm mt-2 space-y-1">
                            {hobbies.map((hobby, index) => (
                                <li
                                    className="pl-4 text-[#fff] relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#fff] before:rounded-full before:absolute before:left-[0] before:top-[5px] last:before:content-none"
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
            <div className="bg-white p-6 pr-0 pt-[80px] w-full md:w-2/3 rounded-lg md:rounded-l-none">
                {/* Education */}
                <div className="text-right">
                    <h2 className="text-[20px] ml-10 mb-2 font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="py-3 p-5">
                            <h3 className="text-[18px] mb-1 font-semibold">{edu.degree}</h3>
                            <p className="text-gray-400 text-[14px]">{edu.institution} ({edu.year})</p>
                        </div>
                    ))}
                </div>
                {/* Work Experience */}
                <div className="mt-6 text-right">
                    <h2 className="text-[20px] ml-10 mb-2 text-right font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="py-3 p-5">
                            <h3 className="text-[18px] mb-1 font-semibold">{exp.jobTitle}</h3>
                            <p className="text-gray-500 text-smtext-gray-400 text-[14px]">{exp.company} ({exp.startDate} - {exp.endDate})</p>
                        </div>
                    ))}
                </div>
                {/* References */}
                <div className="mt-6 text-right">
                    <h2 className="text-[20px] ml-10 mb-2 text-right font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">References</h2>
                    {references.map((ref, index) => (
                        <div key={index} className="py-3 p-5">
                            <h3 className="text-[18px] mb-1 font-semibold">{ref.name}</h3>
                            <p className="text-gray-500 text-smtext-gray-400 text-[14px]">{ref.company}</p>
                        </div>
                    ))}
                </div>
                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-[20px] ml-10 mb-2 text-right font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">Personal Skills</h2>
                    <div className="py-3 p-5 pl-[200px] text-right">
                        {skills.map((skill, index) => (
                            <span key={index} className="block text-[18px] mb-4 font-semibold border-b-[5px] border-[#afccc8]">{skill}</span>
                        ))}
                    </div>
                </div>

                {/* Languages Section */}
                {languages.length > 0 && (
                    <div className="mt-6 pb-4">
                        <h2 className="text-[20px] ml-10 mb-2 text-right font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">
                            Languages
                        </h2>
                        <ul className="py-3 p-5 text-gray-800 text-sm mt-5 space-y-1 grid grid-cols-2 gap-5">
                            {languages.map((language, index) => (
                                <li className="text-gray-800 text-sm pb-1 uppercase border-b-[3px] border-[#afccc8]" key={index}>
                                    {language}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Custom Sections */}
                <div className="text-right">
                    {customSections.map((section, index) => (
                        <div key={index} className="mb-6">
                            <h2 className="text-[20px] mb-2 text-right font-semibold rounded-full rounded-r-none uppercase py-2 px-5 text-white bg-[#62888b]">{section.sectionTitle}</h2>
                            {section.items.map((item, idx) => (
                                <div key={idx} className="py-3 p-5">
                                    <h3 className="text-[18px] mb-1 font-semibold">{item.title}</h3>
                                    <div className="text-gray-500 text-smtext-gray-400 text-[14px]">{parse(item.description)}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div >
    );
}
