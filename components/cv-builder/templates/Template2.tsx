import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { DM_Sans } from "next/font/google";
import { FaEnvelope, FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";


const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function Template2() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();


    return (
        <div className={`bg-[#fff] max-w-[794px] mx-auto shadow-lg min-h-[1123px] ${dmSans.className}`}>
            <div className='bg-[#040404] flex justify-left items-center py-8 px-8'>
                {/* Header Section */}
                <div className="flex justify-center pr-[50px]">
                    <img
                        src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                        alt="Profile"
                        className="w-40 h-40 rounded-full border-2 border-white"
                    />
                </div>
                <div className="text-left">
                    <p className="text-[#FFCB14] font-bold text-[10px] pl-[20px] uppercase relative before:content-[''] before:w-[10px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[6px]">{personalDetails.jobTitle}</p>
                    <h1 className="text-[36px] mb-1 font-bold text-[#fff] capitalize">{personalDetails.firstName} {personalDetails.lastName}</h1>
                </div>
            </div>
            <div className="flex flex-col md:flex-row  px-[20px] py-[30px]">
                {/* Left Column */}
                <div className="text-white border-r-2 border-[#f4f4f4] pr-3 w-[35%]">

                    {/* Contact Information */}
                    <div className="">
                        <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">Contact</h2>
                        <p className="mt-2 pb-1"> <strong className="flex justify-start items-center text-[10px] text-[#707070] uppercase"><FaEnvelope className="mr-2" /> Email</strong> <span className="block text-[10px] pl-[18px] text-[#040404] leading-none">{personalDetails.email}</span></p>
                        <p className="mt-2 pb-1"><strong className="flex justify-start items-center text-[10px] text-[#707070] uppercase"><FaPhone className="mr-2" /> Phone</strong> <span className="block text-[10px] pl-[18px] text-[#040404] leading-none">{personalDetails.phone}</span></p>
                        <p className="mt-2 pb-1"><strong className="flex justify-start items-center text-[10px] text-[#707070] uppercase"><FaMapMarkerAlt className="mr-2" /> Address</strong> <span className="block text-[10px] pl-[18px] text-[#040404] leading-none">{personalDetails.city}, {personalDetails.country}</span></p>
                    </div>

                    {/* Links Section */}
                    {links.length > 0 && (
                        <div className="mt-8 space-y-2 pb-4">
                            <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">Link</h2>
                            <p className="text-[8px] text-[#707070] font-bold pb-1">@johncarter</p>
                            <div className="flex justify-start items-center">
                                {links.map((link, index) => {
                                    let Icon = TbWorld; // ডিফল্ট আইকন

                                    // লিংকের লেবেল অনুযায়ী আইকন পরিবর্তন করা
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
                                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#fff] text-[16px] pb-1 hover:underline">
                                                {/* {link.label} */}
                                                <Icon className="mr-3 text-[#040404]" />
                                            </a>
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    <div className="mt-5">
                        <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">Skills</h2>
                        <div className="gap-2 mt-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="block text-[#707070] pb-1 text-[10px] pl-[10px] relative before:content-[''] before:rounded-full before:w-[3px] before:h-[3px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">Hobbies</h2>
                            <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                {hobbies.map((hobby, index) => (
                                    <li
                                        className="text-[#707070] pb-1 text-[10px] pl-[10px] relative before:content-[''] before:rounded-full before:w-[3px] before:h-[3px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[8px]"
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
                        <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">References</h2>
                        {references.map((ref, index) => (
                            <p key={index} className="text-gray-700 text-[10px] mt-2"><strong className="text-[10px]">{ref.name}</strong> <span className="flex items-center mt-1 text-gray-700 pb-1 text-[9px]">{ref.position}</span><span className="flex items-center text-gray-700 pb-1 text-[10px]">{ref.company}</span></p>
                        ))}
                    </div>

                </div>
                {/* Right Column */}
                <div className="pl-5 w-[65%]">

                    {/* Profile Summary */}
                    <div className="border-b-2 border-[#f4f4f4] pb-4">
                        <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">About me</h2>
                        <p className="text-[#707070] text-[10px] mt-1">{parse(summary)}</p>
                    </div>

                    {/* Work Experience */}
                    <div className="mt-5 pb-2 border-b-2 border-[#f4f4f4]">
                        <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">Work Experience</h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="mt-1 mb-4">
                                <h3 className="text-[11px] text-[#040404] mb-2 capitalize font-medium">{exp.jobTitle}</h3>
                                <p className="text-[11px] text-[#707070E5]"><strong className="text-[11px] text-[#030B1A] font-bold">{exp.company}</strong> - {exp.startDate} / {exp.endDate}</p>
                            </div>
                        ))}
                    </div>
                    {/* Education */}
                    <div className="mt-5">
                        <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">Education</h2>
                        <div className="flex flex-wrap justify-left items-center">
                            {education.map((edu, index) => (
                                <div key={index} className="mt-2 pr-2 w-1/2">
                                    <p className="text-[#707070] text-[9px] font-medium">{edu.institution} / {edu.year}</p>
                                    <h3 className="text-[8px] text-[#040404] mb-2 font-bold">{edu.degree}</h3>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="mt-6 pb-4">
                            <h2 className="text-[12px] text-[#040404] uppercase font-bold pb-1 pt-3 relative before:content-[''] before:w-[12px] before:h-[2px] before:bg-[#FFCB14] before:absolute before:left-[0] before:top-[6px]">
                                Languages
                            </h2>
                            <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-5">
                                {languages.map((language, index) => (
                                    <li className="text-gray-800 text-[10px] pb-1 uppercase leading-none border-b-[2px] border-[#FFCB14]" key={index}>
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
                                <h2 className="text-xl font-semibold pb-1 uppercase">{section.sectionTitle}</h2>
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="mt-2">
                                        <h3 className="text-lg text-gray-600 mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                        <div className="text-gray-500 text-sm text-justify">{parse(item.description)}</div>
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
