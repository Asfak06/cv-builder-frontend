import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Roboto } from 'next/font/google';
import { FaMapMarkerAlt } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";


const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    display: 'swap',
})

export default function Template14() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();

    return (
        <div className={`bg-[#FEFEFF] max-w-[1123px] mx-auto shadow-lg min-h-[1123px] relative ${roboto.className}`}>
            <div className="p-[25px]">
                <div className="pb-6">
                    <div className='text-center'>
                        {/* Profile Image */}
                        <div className="flex justify-center">
                            <img
                                src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                                alt="Profile"
                                className="w-[120px] h-[120px] rounded-full"
                            />

                        </div>
                        {/* Personal Details */}
                        <div className="text-center pb-8">
                            <h1 className="text-[35px] text-[#000000] leading-0 font-bold mb-0 mt-5">{personalDetails.firstName} <span className="">{personalDetails.lastName}</span></h1>
                            <p className="text-[24px] text-[#000000B2] font-normal">{personalDetails.jobTitle}</p>
                        </div>
                    </div>
                    {/* Contact Info */}
                    <div className="flex justify-between items-center">
                        <p className="text-[16px] text-[#000000B2] px-3 pb-2 flex justify-start items-center"><span className="text-[16px] pr-3 text-[#000000] block font-bold"><FaMapMarkerAlt /></span>{personalDetails.city}, {personalDetails.country}</p>
                        <p className="text-[16px] text-[#000000B2] px-3 pb-2 flex justify-start items-center"><span className="text-[16px] pr-3 text-[#000000] block font-bold"><MdOutlineMail /></span> {personalDetails.email}</p>
                        <p className="text-[16px] text-[#000000B2] px-3 pb-2 flex justify-start items-center"><span className="text-[16px] pr-3 text-[#000000] block font-bold"><LuPhone /></span> {personalDetails.phone}</p>
                    </div>
                </div>

                {/* button grid */}
                <div className="h-full">
                    <div className="flex border-t border-[#ECECEC] pt-7">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#000000] uppercase font-bold">About me</h2>
                        </div>
                        {/* Summary Section */}
                        <div className="pb-3 w-[65%]">
                            <span className="text-[16px] text-[#000000B2] font-normal leading-6 mt-1">{parse(summary)}</span>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="flex pt-5">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#000000] uppercase font-bold">Experience</h2>
                        </div>
                        <div className="w-[65%]">
                            {experience.map((exp, index) => (
                                <div key={index} className="pb-3 pt-2">
                                    <h3 className="text-[18px] text-[#000] leading-none capitalize mb-1 font-bold">{exp.company}</h3>
                                    <p className="pb-1"><strong className="text-[#000000] text-[16px] font-normal">{exp.jobTitle}</strong></p>
                                    <p className="pb-2"><span className="text-[#000000B2] text-[16px]">{exp.startDate} <span className="text-[#000000B2] px-1"> - </span> {exp.endDate}</span></p>
                                    <span className="text-[#000000B2] text-[16px] leading-6 font-normal pl-5 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#000000] before:absolute before:left-0 before:top-[7px] before:rounded-full">{parse(exp.description)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="flex pt-5">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#000000] uppercase font-bold">My Education</h2>
                        </div>
                        <div className="w-[65%]">
                            {education.map((edu, index) => (
                                <div key={index} className="mb-8">
                                    <h3 className="text-[18px] mt-1 text-[#000000] leading-none mb-2 font-bold">{edu.degree}</h3>
                                    <p className="text-[#000000B2] text-[16px] font-normal mb-2">{edu.institution} <span className="pl-2"> {edu.year}</span></p>
                                    <span className="text-[16px] text-[#000000B2] font-medium leading-6 mt-1 pl-5 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#000000] before:absolute before:left-0 before:top-[7px] before:rounded-full">{parse(edu.description)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex pt-5">
                        {/* Left Title */}
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#000000] uppercase font-bold">
                                Skills
                            </h2>
                        </div>

                        {/* Skills Grid */}
                        <div className="w-[65%] mt-1 grid grid-cols-4 gap-3">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-[#EEEEEE] text-[#000000] text-[14px] font-bold text-center rounded-full px-3 py-2">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>


                    {/* References Section */}
                    <div className="flex pt-8">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#000000] uppercase font-bold">References</h2>
                        </div>
                        <div className="w-[65%]">
                            {references.map((ref, index) => (
                                <p key={index} className="mb-3">
                                    <strong className="text-[18px] text-[#000000] font-bold capitalize mb-1">{ref.name}</strong>
                                    <span className="text-[16px] capitalize text-[#000000B2] font-normal block pt-1">{ref.position}</span>
                                    <span className="text-[16px] text-[#000000B2] font-normal block">{ref.company}</span>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="pt-5">
                        {/* Links Section */}
                        {links.length > 0 && (
                            <div className="flex">
                                <div className="w-[35%]">
                                    <h2 className="text-[26px] text-[#000000] uppercase font-bold">Follow me</h2>
                                </div>
                                <div className="w-[65%] flex flex-wrap gap-4">
                                    {links.map((link, index) => (
                                        <p key={index} className="text-[18px] text-[#000000B2] pl-5 relative first-of-type:pl-0 before:content-[''] first-of-type:before:w-[0] before:w-[2px] before:h-[10px] before:bg-[#000000B2] before:absolute before:left-0 before:top-[7px] before:rounded-full">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                {link.label}
                                            </a>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="flex pt-5">
                            <div className="w-[35%]">
                                <h2 className="text-[26px] text-[#000000] uppercase font-bold">
                                    Languages
                                </h2>
                            </div>
                            <div className="w-[65%]">
                                <ul className="text-sm mt-2 flex flex-wrap gap-3">
                                    {languages.map((language, index) => (
                                        <li className="text-[18px] text-[#000000B2] pl-5 relative first-of-type:pl-0 before:content-[''] first-of-type:before:w-[0] before:w-[2px] before:h-[10px] before:bg-[#000000B2] before:absolute before:left-0 before:top-[7px] before:rounded-full" key={index}>
                                            {language}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="flex pt-5">
                            <div className="w-[35%]">
                                <h2 className="text-[26px] text-[#000000] uppercase font-bold"> Hobbies</h2>
                            </div>
                            <div className="w-[65%]">
                                <ul className="flex text-[#000000B2] text-[16px] mt-2 gap-3">
                                    {hobbies.map((hobby, index) => (
                                        <li
                                            className="text-[18px] text-[#000000B2] pl-5 relative first-of-type:pl-0 before:content-[''] first-of-type:before:w-[0] before:w-[2px] before:h-[10px] before:bg-[#000000B2] before:absolute before:left-0 before:top-[7px] before:rounded-full"
                                            key={index}
                                        >
                                            {hobby}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Custom Sections */}
                    <div className="pt-5">
                        {customSections.map((section, index) => (
                            <div key={index} className="mb-6 flex">
                                <div className="w-[35%]">
                                    <h2 className="text-[26px] text-[#000000] uppercase font-bold">{section.sectionTitle}</h2>
                                </div>
                                <div className="w-[65%]">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="mt-4">
                                            <h3 className="text-[18px] text-[#000000] font-bold capitalize mb-1">{item.title}</h3>
                                            <div className="text-[16px] text-[#000000B2] font-medium leading-6 mt-1 pl-5 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#000000] before:absolute before:left-0 before:top-[7px] before:rounded-full">{parse(item.description)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
