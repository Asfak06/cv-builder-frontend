import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Inter } from "next/font/google";
import {
    FaCode,
    FaEnvelope,
    FaFacebookF,
    FaGithub,
    FaInstagramSquare,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaMobileAlt,
    FaPhone,
    FaRegLightbulb,
    FaTools,
    FaTwitter,
    FaYoutube,
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
        product: FaRegLightbulb,
        research: IoIosSearch,
        uiux: FaMobileAlt,
        code: FaCode,
    }

    return (
        <div
            className={`bg-[#fff] max-w-[1000px] mx-auto border-0 min-h-[1123px] ${inter.className}`}
        >
            <div className="flex justify-left items-center px-8">
                <div className="flex justify-left items-center border-b-[1px] border-[#E8E8E8] py-8">
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
            <div className="flex flex-col md:flex-row  px-[20px] py-[30px]">
                {/* Left Column */}
                <div className="text-white border-r-2 border-[#f4f4f4] pr-3 w-[35%]">
                    {/* Skills */}
                    {skills.length > 0 && (
                        <section>
                            <h2 className="section-heading">Skills</h2>
                            <ul className="mt-3 space-y-1">
                                {skills.map((skill, idx) => {
                                    const Icon = skillIconMap[skill.toLowerCase()] || FaTools;
                                    return (
                                        <li key={idx} className="flex items-center gap-2 text-[#707070]">
                                            <Icon className="text-[#FFCB14]" size={16} />
                                            {skill}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}
                    {/* Contact Information */}
                    <div className="">
                        <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                            Contact
                        </h2>
                        <p className="mt-2 pb-1">
                            {" "}
                            <strong className="flex justify-start items-center text-[16px] text-[#707070] uppercase">
                                <FaEnvelope className="mr-2" /> Email
                            </strong>{" "}
                            <span className="block text-[16px] pl-[18px] text-[#040404] leading-none">
                                {personalDetails.email}
                            </span>
                        </p>
                        <p className="mt-2 pb-1">
                            <strong className="flex justify-start items-center text-[16px] text-[#707070] uppercase">
                                <FaPhone className="mr-2" /> Phone
                            </strong>{" "}
                            <span className="block text-[16px] pl-[18px] text-[#040404] leading-none">
                                {personalDetails.phone}
                            </span>
                        </p>
                        <p className="mt-2 pb-1">
                            <strong className="flex justify-start items-center text-[16px] text-[#707070] uppercase">
                                <FaMapMarkerAlt className="mr-2" /> Address
                            </strong>{" "}
                            <span className="block text-[16px] pl-[18px] text-[#040404] leading-none">
                                {personalDetails.city}, {personalDetails.country}
                            </span>
                        </p>
                    </div>

                    {/* Links Section */}
                    {links.length > 0 && (
                        <div className="mt-8 space-y-2 pb-4">
                            <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                                Link
                            </h2>
                            <p className="text-[16px] text-[#707070] font-bold pb-1">@johncarter</p>
                            <div className="flex justify-start items-center">
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
                                        <p key={index} className="flex items-center">
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#fff] text-[16px] pb-1 hover:underline"
                                            >
                                                <Icon className="mr-3 text-[#040404]" />
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
                            <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
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
                        <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                            References
                        </h2>
                        {references.map((ref, index) => (
                            <p key={index} className="text-gray-700 text-[16px] mt-2">
                                <strong className="text-[10px]">{ref.name}</strong>{" "}
                                <span className="flex items-center mt-1 text-gray-700 pb-1 text-[9px]">
                                    {ref.position}
                                </span>
                                <span className="flex items-center text-gray-700 pb-1 text-[10px]">
                                    {ref.company}
                                </span>
                            </p>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="pl-5 w-[65%]">
                    {/* Profile Summary */}
                    <div className="border-b-2 border-[#f4f4f4] pb-4">
                        <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                            About me
                        </h2>
                        <p className="text-[#707070] text-[16px] mt-1">{parse(summary)}</p>
                    </div>

                    {/* Work Experience */}
                    <div className="mt-5 pb-2 border-b-2 border-[#f4f4f4]">
                        <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                            Work Experience
                        </h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="mt-1 mb-4">
                                <h3 className="text-[18px] text-[#040404] mb-2 capitalize font-medium">
                                    {exp.jobTitle}
                                </h3>
                                <p className="text-[16px] text-[#707070E5] mb-2">
                                    <strong className="text-[16px] text-[#030B1A] font-bold">
                                        {exp.company}
                                    </strong>{" "}- {exp.startDate} / {exp.endDate}
                                </p>
                                <p className="text-[#707070] text-[16px] mt-1">
                                    {parse(exp.description)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="mt-5">
                        <h2 className="text-[26px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                            Education
                        </h2>
                        <div className="flex flex-wrap justify-left items-center">
                            {education.map((edu, index) => (
                                <div key={index} className="mt-2 pr-2 w-full">
                                    <p className="text-[#707070] text-[16px] font-medium">
                                        {edu.institution} - {edu.year}
                                    </p>
                                    <h3 className="text-[16px] text-[#040404] mb-2 font-bold">
                                        {edu.degree}
                                    </h3>
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
        </div>
    );
}
