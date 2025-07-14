import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Inter } from "next/font/google";
import {
    FaCode,
    FaFacebookF,
    FaGithub,
    FaInstagramSquare,
    FaLinkedinIn,
    FaMobileAlt,
    FaRegLightbulb,
    FaTools,
    FaTwitter,
    FaYoutube
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { TbWorld } from "react-icons/tb";

// Load Inter font (variable or static weights as needed)
const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function Template2() {
    const {
        personalDetails,
        links,
        summary,
        experience,
        education,
        skills,
        references,
        customSections,
        languages,
        hobbies,
    } = useCVStore();

    const skillIconMap: Record<string, React.ElementType> = {
        ProductDesign: FaRegLightbulb,
        research: IoIosSearch,
        uiux: FaMobileAlt,
        code: FaCode,
    }

    return (
        <div
            className={`bg-[#fff] max-w-[1000px] mx-auto border-0 min-h-[1123px] ${inter.className}`}
        >
            <div className="flex justify-left items-center px-8">
                <div className="flex justify-left items-center w-full border-b-[1px] border-[#E8E8E8] py-8">
                    {/* Header Section */}
                    <div className="flex justify-center pr-[30px]">
                        <img
                            src={
                                personalDetails.profileImage
                                    ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}`
                                    : "https://placehold.co/500"
                            }
                            alt="Profile"

                            className="w-40 h-40 rounded-full border-2 border-white"
                        />
                    </div>
                    <div className="text-left">
                        <h1 className="text-[30px] mb-0 font-medium  text-[#141414]">
                            {personalDetails.firstName} {personalDetails.lastName}
                        </h1>
                        <p className="text-[#141414] font-medium text-[30px]">
                            {personalDetails.jobTitle}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row  px-[30px] py-[30px]">
                {/* Left Column */}
                <div className="text-white pr-6 w-[35%]">
                    {/* Skills */}
                    <div className="mb-10">
                        <h2 className="text-[30px] text-[#141414] capitalize font-medium pb-1">Skills</h2>
                        {skills.length > 0 && (
                            <ul className="mt-3 space-y-3">
                                {skills.map((skill, idx) => {
                                    const Icon = skillIconMap[skill.toLowerCase()] || FaTools;
                                    return (
                                        <li key={idx} className="flex items-center gap-2 bg-[#FFFFFF] p-[10px] border border-[#F4F4F4] shadow-[0_1.68px_6.74px_rgba(20,20,43,0.05)] text-lg text-[#141414]">
                                            <span className="bg-[#E8E8E8] inline-block p-2 rounded-[5px]"><Icon className=" text-[#5B5B5B]" size={16} /></span>
                                            {skill}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                    {/* Links Section */}
                    {links.length > 0 && (
                        <div className="mt-8 space-y-3 pb-4">
                            <h2 className="text-[30px] text-[#141414] capitalize font-medium">
                                Link
                            </h2>
                            <p className="text-[16px] text-[#666666] mt-0 pb-3">@peterdesigner</p>
                            <div className="">
                                {links.map((link, index) => {
                                    let Icon = TbWorld; // Default icon

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
                                        <p key={index} className="flex justify-center items-center mb-3 w-full bg-[#FFFFFF] p-[10px] border border-[#F4F4F4] shadow-[0_1.68px_6.74px_rgba(20,20,43,0.05)] text-lg font-medium text-[#141414]">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex justify-center items-center hover:underline"
                                            >
                                                <Icon className="mr-2 text-[#040404]" size={20} />
                                                <span className="text-[#141414]">{link.label}</span>
                                            </a>
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-[30px] text-[#141414] capitalize font-medium">
                                Hobbies
                            </h2>
                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                {hobbies.map((hobby, index) => (
                                    <li
                                        className="text-[#707070] pb-1 text-[16px] pl-[10px] relative before:content-[''] before:rounded-full before:w-[3px] before:h-[3px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[8px]"
                                        key={index}
                                    >
                                        {hobby}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* References */}
                    <div className="mt-5">
                        <h2 className="text-[30px] text-[#141414] capitalize font-medium">
                            References
                        </h2>
                        {references.map((ref, index) => (
                            <p key={index} className="text-[#141414] text-[16px] mt-2">
                                <strong className="text-[18px]">{ref.name}</strong>{" "}
                                <span className="flex items-center mt-1 text-[#141414] pb-1 text-[16px]">
                                    {ref.position}
                                </span>
                                <span className="flex items-center text-[#141414] pb-1 text-[16px]">
                                    {ref.company}
                                </span>
                            </p>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="pl-8 w-[65%]">
                    {/* Profile Summary */}
                    <div className="border-b-2 border-[#f4f4f4] pb-10">
                        <h2 className="text-[30px] text-[#141414] capitalize font-medium">
                            About me
                        </h2>
                        <p className="text-[#666666] text-[16px] mt-1">{parse(summary)}</p>
                    </div>

                    {/* Work Experience */}
                    <div className="mt-10 pb-2">
                        <h2 className="text-[30px] mb-2 text-[#141414] capitalize font-medium">
                            Work Experience
                        </h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="mt-1 mb-4">
                                <h3 className="text-[18px] text-[#141414] mb-1 capitalize font-bold">
                                    {exp.jobTitle}
                                </h3>
                                <p className="text-[16px] text-[#707070E5] mb-2">
                                    <strong className="text-[16px] text-[#666666] font-normal mb-1 block">
                                        {exp.company}
                                    </strong> {exp.startDate} - {exp.endDate}
                                </p>
                                <p className="text-[#707070] text-[16px] mt-1">
                                    {parse(exp.description)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="mt-5">
                        <h2 className="text-[30px] mb-2 text-[#141414] capitalize font-medium">
                            Education
                        </h2>
                        <div className="flex flex-wrap justify-left items-center">
                            {education.map((edu, index) => (
                                <div key={index} className="mt-2 pr-2 w-full">
                                    <h3 className="text-[18px] text-[#141414] mb-1 capitalize font-bold">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-[16px] text-[#707070E5]">
                                        <p>{edu.institution}</p>
                                        {edu.year}
                                    </p>
                                    <p className="text-[#707070] text-[16px] mt-1">
                                        {parse(edu.description)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="mt-6 pb-4">
                            <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                                Languages
                            </h2>
                            <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-5">
                                {languages.map((language, index) => (
                                    <li
                                        className="text-gray-800 text-[16px] pb-1 uppercase leading-none border-b-[2px] border-[#FFCB14]"
                                        key={index}
                                    >
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
                                <h2 className="text-[26px] font-semibold pb-1 uppercase">
                                    {section.sectionTitle}
                                </h2>
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="mt-2">
                                        <h3 className="text-[22px] text-gray-600 mt-[-2px] capitalize leading-none mb-2 font-semibold">
                                            {item.title}
                                        </h3>
                                        <div className="text-gray-500 text-[16px] text-justify">
                                            {parse(item.description)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-[30px]">
                {/* Contact Information */}
                <div className="border-t border-[#E8E8E8] pt-10">
                    <h2 className="text-[30px] text-[#141414] capitalize font-medium">
                        Contact
                    </h2>
                    <div className="flex justify-between items-center">
                        <p className="mt-2 pb-1">
                            {" "}
                            <strong className="text-[16px] text-[#666666] font-normal capitalize mb-3">
                                Email
                            </strong>{" "}
                            <span className="block text-[16px] text-[#141414] leading-none">
                                {personalDetails.email}
                            </span>
                        </p>
                        <p className="mt-2 pb-1">
                            <strong className="text-[16px] text-[#666666] font-normal capitalize mb-3">
                                Phone
                            </strong>{" "}
                            <span className="block text-[16px] text-[#141414] leading-none">
                                {personalDetails.phone}
                            </span>
                        </p>
                        <p className="mt-2 pb-1">
                            <strong className="text-[16px] text-[#666666] font-normal capitalize mb-3">
                                Address
                            </strong>{" "}
                            <span className="block text-[16px] text-[#141414] leading-none">
                                {personalDetails.city}, {personalDetails.country}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
