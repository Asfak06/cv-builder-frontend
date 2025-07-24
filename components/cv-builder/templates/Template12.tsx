import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Manrope } from 'next/font/google';
import { FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";


const manrope = Manrope({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-manrope',
    display: 'swap',
})

export default function Template12() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();

    return (
        <div className={`bg-[#FEFEFF] max-w-[1123px] mx-auto shadow-lg min-h-[1123px] relative ${manrope.variable}`}>
            <span className="inline-block absolute top-0 right-0"><img src="template-tp-bg.png" /></span>
            <span className="inline-block absolute bottom-0 left-0"><img src="template-btm-bg.png" /></span>
            <div className="p-[25px]">
                <div className="flex justify-between items-center pb-6">
                    <div className='flex justify-left items-center'>
                        {/* Profile Image */}
                        <div className="flex justify-center pr-[20px]">
                            <img
                                src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                                alt="Profile"
                                className="w-[120px] h-[120px] rounded-full"
                            />

                        </div>
                        {/* Personal Details */}
                        <div className="text-left">
                            <h1 className="text-[35px] text-[#1D2B5F] leading-0 font-bold mb-0">{personalDetails.firstName} <span className="">{personalDetails.lastName}</span></h1>
                            <p className="text-[35px] text-[#5D6890] font-medium mt-[-5px]">{personalDetails.jobTitle}</p>
                        </div>
                    </div>
                    {/* Contact Info */}
                    <div className="">
                        <h2 className="text-[26px] text-[#1D2B5F] font-semibold pb-[10px]">Contact</h2>
                        <div className="">
                            <p className="text-[16px] text-[#1D2B5F] pb-2 flex justify-start items-center"><span className="text-[16px] pr-3 text-[#1D2B5F] block font-bold"><MdOutlineMail /></span> {personalDetails.email}</p>
                            <p className="text-[16px] text-[#1D2B5F] pb-2 flex justify-start items-center"><span className="text-[16px] pr-3 text-[#1D2B5F] block font-bold"><LuPhone /></span> {personalDetails.phone}</p>
                        </div>
                    </div>
                </div>

                {/* button grid */}
                <div className="h-full">
                    <div className="flex border-t border-[#ECECEC] py-8">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#1D2B5F] font-bold">About me</h2>
                        </div>
                        {/* Summary Section */}
                        <div className="pb-3 w-[65%]">
                            <p className="text-[16px] text-[#5D6890] font-medium leading-7 mt-1">{parse(summary)}</p>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="flex border-t border-[#ECECEC] py-8">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#1D2B5F] font-bold">Experience</h2>
                        </div>
                        <div className="w-[65%]">
                            {experience.map((exp, index) => (
                                <div key={index} className="pb-3 pt-4">
                                    <h3 className="text-[16px] text-[#1D2B5F] leading-none capitalize mb-2 font-semibold">{exp.jobTitle} <span className="text-[#5D6890CC] text-[14px] pl-2">{exp.startDate} <span className="text-[#5D6890CC] px-1"> - </span> {exp.endDate}</span></h3>
                                    <p className="pb-1"><strong className="text-[#1D2B5F] text-[16px] pr-3 font-semibold">{exp.company}</strong></p>
                                    <p className="text-[#5D6890] text-[16px] leading-7 font-medium mt-1">{parse(exp.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="flex border-t border-[#ECECEC] py-8 pb-4">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#1D2B5F] font-bold leading-0">My Education</h2>
                        </div>
                        <div className="w-[65%]">
                            {education.map((edu, index) => (
                                <div key={index} className="mb-8">
                                    <span className="text-[16px] text-[#5D6890B2] font-medium inline-block mb-3">{edu.year}</span>
                                    <h3 className="text-[16px] mt-[-2px] text-[#1D2B5F] leading-none mb-2 font-semibold">{edu.degree}</h3>
                                    <p className="text-[#5D6890] text-[16px] font-medium mb-2">{edu.institution}</p>
                                    <p className="text-[16px] text-[#5D6890] font-medium leading-7 mt-1">{parse(edu.description)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex border-t border-[#ECECEC] py-8">
                        {/* Left Title */}
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#1D2B5F] font-bold leading-0">
                                Skills
                            </h2>
                        </div>

                        {/* Skills Grid */}
                        <div className="w-[65%] mt-3 grid grid-cols-2 gap-3">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="text-[#5D6890] text-[16px] pl-5 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#5D6890] before:absolute before:left-0 before:top-[7px] before:rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>


                    {/* References Section */}
                    <div className="flex border-t border-[#ECECEC] py-8">
                        <div className="w-[35%]">
                            <h2 className="text-[26px] text-[#1D2B5F] font-bold leading-0">References</h2>
                        </div>
                        <div className="w-[65%]">
                            {references.map((ref, index) => (
                                <p key={index} className="mb-3">
                                    <strong className="text-[16px] text-[#1D2B5F] font-bold capitalize mb-1">{ref.name}</strong>
                                    <span className="text-[16px] capitalize text-[#1D2B5F] font-normal block pt-1 mb-1">{ref.position}</span>
                                    <span className="text-[16px] uppercase text-[#5D6890] font-normal block relative before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:bg-[#5D6890] before:absolute before:left-[0] before:top-[8px] pl-4">{ref.company}</span>
                                </p>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-[#DFDFDF] py-8">
                        {/* Links Section */}
                        {links.length > 0 && (
                            <div className="flex">
                                <div className="w-[35%]">
                                    <h2 className="text-[26px] text-[#1D2B5F] font-bold leading-0 pb-1">Follow me</h2>
                                </div>
                                <div className="w-[65%] flex justify-start items-center">
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
                                                    <Icon className="mr-3 text-[#5D6890]" />
                                                </a>
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="flex border-t border-[#ECECEC] py-8">
                            <div className="w-[35%]">
                                <h2 className="text-[26px] text-[#1D2B5F] font-bold leading-0">
                                    Languages
                                </h2>
                            </div>
                            <div className="w-[65%]">
                                <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-3">
                                    {languages.map((language, index) => (
                                        <li className="text-[#5D6890] text-[16px] pb-[4px] uppercase border-b-[2px] border-[#5D6890]" key={index}>
                                            {language}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="flex border-t border-[#ECECEC] py-8">
                            <div className="w-[35%]">
                                <h2 className="text-[26px] text-[#1D2B5F] font-bold leading-0"> Hobbies</h2>
                            </div>
                            <div className="w-[65%]">
                                <ul className="text-[#5D6890] text-[16px] mt-2 space-y-1">
                                    {hobbies.map((hobby, index) => (
                                        <li
                                            className="pl-4 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#5D6890] before:rounded-full before:absolute before:left-[0] before:top-[5px] last:before:content-none"
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
                    <div className="border-t border-[#ECECEC] py-8">
                        {customSections.map((section, index) => (
                            <div key={index} className="mb-6 flex">
                                <div className="w-[35%]">
                                    <h2 className="text-[26px] text-[#1D2B5F] font-bold leading-0">{section.sectionTitle}</h2>
                                </div>
                                <div className="w-[65%]">
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="mt-4">
                                            <h3 className="text-[28] text-[#1D2B5F] mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                            <div className="text-[16px] text-[#5D6890] font-medium leading-7">{parse(item.description)}</div>
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
