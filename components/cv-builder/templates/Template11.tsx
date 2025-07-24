import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Poppins } from 'next/font/google';
import { FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";


const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
});

export default function Template11() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();

    return (
        <div className={`bg-[#FFFFFF] max-w-[1123px] mx-auto shadow-lg min-h-[1123px] px-[25px] py-[25px] ${poppins.className}`}>
            {/* button grid */}
            <div className="flex flex-col md:flex-row h-full">
                {/* Left Column */}
                <div className="text-white w-full md:w-[50%] pr-8">
                    {/* Profile Image */}
                    <div className="flex justify-left">
                        <img
                            src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                            alt="Profile"
                            className="w-[300px] h-[250px] ml-[-25px] border-2 border-white"
                        />

                    </div>

                    {/* Personal Details */}
                    <div className="text-left pt-4">
                        <h1 className="text-[35px] text-[#0D0D0D] leading-0 font-semibold mb-0 capitalize">{personalDetails.firstName} <span className="">{personalDetails.lastName}</span></h1>
                        <p className="text-[#0D0D0D] text-[25px] capitalize font-medium mt-[-5px]">{personalDetails.jobTitle}</p>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-5">
                        <div className="">
                            <p className="text-[16px] text-[#686868] pb-2 flex justify-start items-center"><span className="text-[20px] pr-3 text-[#1A1A1A] block font-bold uppercase"><MdOutlineMail /></span> {personalDetails.email}</p>
                            <p className="text-[16px] text-[#686868] pb-2 flex justify-start items-center"><span className="text-[20px] pr-3 text-[#1A1A1A] block font-bold uppercase"><LuPhone /></span> {personalDetails.phone}</p>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="pb-5 mt-7">
                        <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-4">About me</h2>
                        <p className="text-[#686868] text-[14px] leading-7 mt-1">{parse(summary)}</p>
                    </div>

                    {/* Skills Section */}
                    <div className="mt-4">
                        <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-3">
                            Skills
                        </h2>

                        <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="text-[#686868] text-[16px] pl-5 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#686868] before:absolute before:left-0 before:top-[8px] before:rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* References Section */}
                    <div className="pb-5">
                        <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-3">References</h2>
                        {references.map((ref, index) => (
                            <p key={index} className="mb-3">
                                <strong className="text-[18px] text-[#686868] font-bold capitalize mb-1">{ref.name}</strong>
                                <span className="text-[16px] uppercase text-[#686868] font-normal block pt-1 mb-1">{ref.position}</span>
                                <span className="text-[16px] uppercase text-[#686868] font-normal block relative before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#686868] before:absolute before:left-[0] before:top-[10px] pl-3">{ref.company}</span>
                            </p>
                        ))}
                    </div>

                </div>

                {/* Right Column */}
                <div className="w-full md:w-[50%] pl-[30px]">
                    {/* Experience Section */}
                    <div>
                        <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-5">Work Experience</h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="pb-6 pt-0">
                                <p className="pb-4"><strong className="text-[#686868] text-[16px] font-normal pr-3 capitalize">{exp.company}</strong> <span className="text-[#686868] text-[14px] uppercase">{exp.startDate} - {exp.endDate}</span></p>
                                <h3 className="text-[18px] text-[#0D0D0D] leading-none font-semibold capitalize mb-4">{exp.jobTitle}</h3>
                                <p className="text-[#686868] text-[14px] font-medium mt-1 leading-6">{parse(exp.description)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Education Section */}
                    <div className="mt-5 pb-5">
                        <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-5">My Education</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="mb-8">
                                <p className="text-[16px] text-[#848484] mb-2"> {edu.year}</p>
                                <h3 className="text-[16px] mt-[-2px] text-[#141414] capitalize leading-none mb-2 font-semibold">{edu.degree}</h3>
                                <p className="text-[#848484] text-[14px] mb-2">{edu.institution}</p>

                                <p className="text-[#686868] text-[14px] leading-6 mt-1">{parse(edu.description)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="mt-5 pb-4">
                            <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-5">
                                Languages
                            </h2>
                            <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-3">
                                {languages.map((language, index) => (
                                    <li className="text-[#686868] text-[16px] pb-[2px] uppercase border-b-[2px] border-[#686868]" key={index}>
                                        {language}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="mt-7 pb-4">
                            <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-5"> Hobbies</h2>
                            <ul className="text-[#686868] text-[14px] mt-2 space-y-1">
                                {hobbies.map((hobby, index) => (
                                    <li
                                        className="pl-4 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#686868] before:rounded-full before:absolute before:left-[0] before:top-[5px] last:before:content-none"
                                        key={index}
                                    >
                                        {hobby}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Custom Sections */}
                    <div className="mt-6">
                        {customSections.map((section, index) => (
                            <div key={index} className="mb-6">
                                <h2 className="text-[26px] text-[#0D0D0D] font-semibold mb-5">{section.sectionTitle}</h2>
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="mt-4">
                                        <h3 className="text-[28] text-[#141414] mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                        <div className="text-[#686868] text-[24] text-justify">{parse(item.description)}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-t border-[#DFDFDF]">
                {/* Links Section */}
                {links.length > 0 && (
                    <div className="mt-8 flex justify-between items-center space-y-2 pb-4">
                        <div>
                            <h2 className="text-[24px] text-[#141414] capitalize font-semibold pb-1">Follow me</h2>
                            <p className="text-[16px] text-[#686868] font-medium pb-1">@johncarter</p>
                        </div>
                        <div className="flex justify-start items-center">
                            {links.map((link, index) => {
                                let Icon = TbWorld;

                                switch (link.label.toLowerCase()) {
                                    case "facebook":
                                        Icon = FaFacebookF;
                                        break;
                                    case "linkedin":
                                        Icon = FaLinkedinIn;
                                        break;
                                    case "twitter":
                                        Icon = FaTwitter;
                                        break;
                                    case "youtube":
                                        Icon = FaYoutube;
                                        break;
                                    case "instagram":
                                        Icon = FaInstagramSquare;
                                        break;
                                    case "github":
                                        Icon = FaGithub;
                                        break;
                                    default:
                                        Icon = TbWorld;
                                }

                                return (
                                    <p key={index} className="flex items-center">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#0D0D0D] text-[20px] pb-1 hover:underline">
                                            {/* {link.label} */}
                                            <Icon className="mr-3 text-[#0D0D0D]" />
                                        </a>
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
