import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Mulish, Playfair_Display } from "next/font/google";
import { FaEnvelope, FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";


const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

const mulish = Mulish({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-mulish",
});

export default function Template7() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();


    return (
        <div className={`bg-[#fff] max-w-[1000px] mx-auto shadow-lg min-h-[1123px] ${mulish.className}`}>
            <div className="flex flex-col md:flex-row">
                {/* Left Column */}
                <div className="text-white border-r-2 border-[#f4f4f4] w-[35%]">

                    <div className="">
                        <img
                            src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                            alt="Profile"
                            className="w-[280px] h-[280px]"
                        />
                    </div>
                    <div className="bg-[#1e2027] min-h-[840px] px-6 py-10">

                        {/* Contact Information */}
                        <div className="">
                            <h2 className={`text-[24px] text-[#F2F1ED] uppercase font-normal pb-1 pl-8 relative before:content-[''] before:w-[22px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>Contact</h2>
                            <p className="flex items-center justify-start mt-4 pb-1"><FaEnvelope /> <span className="block text-[15px] pl-[8px] text-[#fff] leading-none">{personalDetails.email}</span></p>
                            <p className="flex items-center justify-start mt-4 pb-1"><FaPhone /> <span className="block text-[15px] pl-[8px] text-[#fff] leading-none">{personalDetails.phone}</span></p>
                            <p className="flex items-center justify-start mt-4 pb-1"><FaMapMarkerAlt /> <span className="block text-[15px] pl-[8px] text-[#fff] leading-none">{personalDetails.city}, {personalDetails.country}</span></p>
                        </div>


                        {/* Skills */}
                        <div className="mt-5">
                            <h2 className={`text-[24px] text-[#F2F1ED] uppercase font-normal pb-1 pl-8 relative before:content-[''] before:w-[22px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>Skills</h2>
                            <div className="gap-2 mt-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="block text-[#F2F1ED] pb-2 text-[16px] pl-[15px] relative before:content-[''] before:rounded-full before:w-[5px] before:h-[5px] before:bg-[#fff] before:absolute before:left-[0] before:top-[8px]">{skill}</span>
                                ))}
                            </div>
                        </div>

                        {/* Hobbies Section */}
                        {hobbies.length > 0 && (
                            <div className="mt-4">
                                <h2 className={`text-[24px] text-[#F2F1ED] uppercase font-normal pb-1 pl-8 relative before:content-[''] before:w-[22px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>Hobbies</h2>
                                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                    {hobbies.map((hobby, index) => (
                                        <li
                                            className="text-[#F2F1ED] pb-2 text-[16px] pl-[15px] relative before:content-[''] before:rounded-full before:w-[5px] before:h-[5] before:bg-[#fff] before:absolute before:left-[0] before:top-[8px]"
                                            key={index}
                                        >
                                            {hobby}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Links Section */}
                        {links.length > 0 && (
                            <div className="mt-8 space-y-2 pb-4">
                                <h2 className={`text-[24px] text-[#F2F1ED] uppercase font-normal pb-1 pl-8 relative before:content-[''] before:w-[22px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>Link</h2>
                                <p className="text-[16px] text-[#F2F1ED] font-bold pb-1">@johncarter</p>
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
                                                    <Icon className="mr-3 text-[#fff]" />
                                                </a>
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* References */}
                        <div className="mt-5">
                            <h2 className={`text-[24px] text-[#F2F1ED] uppercase font-normal pb-1 pl-8 relative before:content-[''] before:w-[22px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>References</h2>
                            {references.map((ref, index) => (
                                <p key={index} className="text-[#F2F1ED] text-[16px] mt-2"><strong className="text-[18px]">{ref.name}</strong> <span className="flex items-center mt-1 pb-1 text-[16px]">{ref.position}</span><span className="flex items-center pb-1 text-[16px]">{ref.company}</span></p>
                            ))}
                        </div>
                    </div>

                </div>
                {/* Right Column */}
                <div className="w-[65%]">

                    <div className='bg-[#F2F1ED] flex justify-left items-center py-14 px-8'>
                        {/* Header Section */}
                        <div className="text-left">
                            <p className="text-[24px] text-[#353743] uppercase font-normal pb-1 pl-12 relative before:content-[''] before:w-[32px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px]">{personalDetails.jobTitle}</p>
                            <h1 className={`text-[36px] mb-1 font-normal text-[#353743] capitalize ${playfairDisplay.className}`}>{personalDetails.firstName} {personalDetails.lastName}</h1>
                        </div>
                    </div>
                    <div className="p-10">
                        {/* Profile Summary */}
                        <div className="pb-8">
                            <h2 className={`text-[24px] text-[#353743] uppercase font-normal pb-3 pl-12 relative before:content-[''] before:w-[32px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>About me</h2>
                            <p className="text-[#707070] text-[16px] mt-1">{parse(summary)}</p>
                        </div>

                        {/* Work Experience */}
                        <div className="mt-5 pb-2">
                            <h2 className={`text-[24px] text-[#353743] uppercase font-normal pb-3 pl-12 relative before:content-[''] before:w-[32px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>Work Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mt-1 mb-5">
                                    <h3 className="text-[18px] text-[#DFAE4F] mb-3 uppercase font-medium">{exp.jobTitle}</h3>
                                    <p className="text-[16px] text-[#707070E5] mb-2"><strong className="text-[16px] text-[#030B1A] uppercase font-bold">{exp.company}</strong> | {exp.startDate} - {exp.endDate}</p>
                                    <p className="text-[#707070] text-[16px] mt-1">{parse(exp.description)}</p>
                                </div>
                            ))}
                        </div>
                        {/* Education */}
                        <div className="mt-5">
                            <h2 className={`text-[24px] text-[#353743] uppercase font-normal pb-3 pl-12 relative before:content-[''] before:w-[32px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>Education</h2>
                            <div className="flex flex-wrap justify-left items-center">
                                {education.map((edu, index) => (
                                    <div key={index} className="mt-2 mb-3 pr-2 w-full">
                                        <h3 className="text-[18px] text-[#040404] mb-0 font-normal uppercase">{edu.degree}</h3>
                                        <p className="text-[#666D79] text-[16px] font-medium">{edu.institution} <span className=" inline-block px-2">|</span> {edu.year}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Languages Section */}
                        {languages.length > 0 && (
                            <div className="mt-6 pb-4">
                                <h2 className={`text-[24px] text-[#353743] uppercase font-normal pb-1 pl-12 relative before:content-[''] before:w-[32px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>
                                    Languages
                                </h2>
                                <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-5">
                                    {languages.map((language, index) => (
                                        <li className="text-gray-800 text-[16px] pb-1 uppercase leading-none border-b-[2px] border-[#FFCB14]" key={index}>
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
                                    <h2 className={`text-[24px] text-[#353743] uppercase font-normal pb-1 pl-12 relative before:content-[''] before:w-[32px] before:h-[2px] before:bg-[#DFAE4F] before:absolute before:left-[0] before:top-[16px] ${playfairDisplay.className}`}>{section.sectionTitle}</h2>
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="mt-2">
                                            <h3 className="text-[22px] text-gray-600 mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                            <div className="text-gray-500 text-[16px] text-justify">{parse(item.description)}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
