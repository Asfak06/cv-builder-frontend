import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Poppins } from "next/font/google";
import { FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});


export default function Template13() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();


    return (
        <div className={`bg-[#fff] max-w-[1000px] mx-auto shadow-lg min-h-[1123px] ${poppins.className}`}>
            <div className="flex flex-col md:flex-row">
                {/* Left Column */}
                <div className="w-[40%] bg-[#233A5F] min-h-[1123px] px-6 py-10">
                    <div className="">
                        <div className="w-50 h-50 flex justify-center items-center pb-5">
                            <img
                                src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                                alt="Profile"
                                className="w-[160px] h-[160px] rounded-full border-2 border-white"
                            />
                        </div>

                        <div className='flex justify-left items-center'>
                            {/* Header Section */}
                            <div className="text-left">
                                <h1 className="text-[26px] mb-1 font-semibold text-[#fff] leading-0 capitalize">{personalDetails.firstName} {personalDetails.lastName}</h1>
                                <p className="text-[22px] text-[#C3C2C2] capitalize font-normal pb-1">{personalDetails.jobTitle}</p>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="pt-2">
                            <p className="bg-[#E5E5E5] text-[16px] text-[#233A5F] leading-none rounded-[4px] flex items-center justify-start mt-4 py-3 px-4">{personalDetails.email}</p>
                            <p className="bg-[#E5E5E5] text-[16px] text-[#233A5F] leading-none rounded-[4px] flex items-center justify-start underline mt-4 py-3 px-4">{personalDetails.phone}</p>
                            <p className="bg-[#E5E5E5] text-[16px] text-[#233A5F] leading-none rounded-[4px] flex items-center justify-start mt-4 py-3 px-4">{personalDetails.city}, {personalDetails.country}</p>
                        </div>


                        {/* Skills */}
                        <div className="mt-5">
                            <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">Skills</h2>
                            <div className="gap-2 mt-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="block text-[#F2F1ED] pb-2 text-[16px] pl-[15px] relative before:content-[''] before:rounded-full before:w-[5px] before:h-[5px] before:bg-[#fff] before:absolute before:left-[0] before:top-[8px]">{skill}</span>
                                ))}
                            </div>
                        </div>

                        {/* References */}
                        <div className="mt-5">
                            <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">References</h2>
                            {references.map((ref, index) => (
                                <p key={index} className="text-[#fff] text-[16px] mt-2 mb-4"><strong className="pl-[15px] font-medium relative before:content-[''] before:rounded-full before:w-[6px] before:h-[6] before:bg-[#fff] before:absolute before:left-[0] before:top-[7px]"> {ref.name} </strong><span className="flex items-center mt-1 pb-1 text-[16px]">{ref.position}</span><span className="flex items-center pb-1 text-[16px]">{ref.company}</span></p>
                            ))}
                        </div>

                        {/* Links Section */}
                        {links.length > 0 && (
                            <div className="mt-8 space-y-2 pb-4">
                                <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">Links</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            <a
                                                key={index}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 text-[#fff] text-[16px] hover:underline"
                                            >
                                                <Icon className="text-[20px]" />
                                                <span className="capitalize">{link.label}</span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Hobbies Section */}
                        {hobbies.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">Hobbies</h2>
                                <ul className="text-gray-300 text-sm mt-2 space-y-1">
                                    {hobbies.map((hobby, index) => (
                                        <li
                                            className="text-[#F2F1ED] pb-2 text-[16px] pl-[20px] relative before:content-[''] before:rounded-full before:w-[8px] before:h-[8] before:bg-[#fff] before:absolute before:left-[0] before:top-[8px]"
                                            key={index}
                                        >
                                            {hobby}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>

                </div>
                {/* Right Column */}
                <div className="w-[60%]">
                    <div className="p-7">
                        {/* Profile Summary */}
                        <div className="pb-5">
                            <h2 className="text-[24px] text-[#233A5F] font-semibold pb-2 mb-5 relative before:content-[''] before:rounded-full before:w-[50px] before:h-[4] before:bg-[#233A5F] before:absolute before:left-[0] before:bottom-[0]">About me</h2>
                            <p className="text-[#878787] text-[16px] mt-1">{parse(summary)}</p>
                        </div>

                        {/* Work Experience */}
                        <div className="mt-5 pb-2">
                            <h2 className="text-[24px] text-[#233A5F] font-semibold pb-2 mb-5 relative before:content-[''] before:rounded-full before:w-[50px] before:h-[4] before:bg-[#233A5F] before:absolute before:left-[0] before:bottom-[0]">Work Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mt-1 mb-5">
                                    <h3 className="text-[20px] text-[#2A2A2A] font-semibold pl-[20px] mb-2 relative before:content-[''] before:rounded-full before:w-[10px] before:h-[10] before:bg-[#E5E5E5] before:absolute before:left-[0] before:top-[10px]">{exp.company}</h3>
                                    <p className="text-[18px] text-[#2A2A2A] pl-[20px] mb-2">{exp.jobTitle} | {exp.startDate} - {exp.endDate}</p>
                                    <p className="text-[#878787] text-[16px] pl-[20px] mt-1">{parse(exp.description)}</p>
                                </div>
                            ))}
                        </div>
                        {/* Education */}
                        <div className="mt-5">
                            <h2 className="text-[24px] text-[#233A5F] font-semibold pb-2 mb-5 relative before:content-[''] before:rounded-full before:w-[50px] before:h-[4] before:bg-[#233A5F] before:absolute before:left-[0] before:bottom-[0]">Education</h2>
                            <div className="flex flex-wrap justify-left items-center">
                                {education.map((edu, index) => (
                                    <div key={index} className="mt-2 mb-3 pr-2 w-full">
                                        <h3 className="text-[20px] text-[#2A2A2A] font-semibold pl-[20px] mb-2 relative before:content-[''] before:rounded-full before:w-[10px] before:h-[10] before:bg-[#E5E5E5] before:absolute before:left-[0] before:top-[10px]">{edu.degree}</h3>
                                        <p className="text-[18px] text-[#2A2A2A] pl-[20px] mb-2">{edu.institution} | {edu.year}</p>
                                        <p className="text-[#878787] text-[16px] pl-[20px] mt-1">{parse(edu.description)}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Languages Section */}
                        {languages.length > 0 && (
                            <div className="mt-6 pb-4">
                                <h2 className="text-[24px] text-[#233A5F] font-semibold pb-2 mb-5 relative before:content-[''] before:rounded-full before:w-[50px] before:h-[4] before:bg-[#233A5F] before:absolute before:left-[0] before:bottom-[0]">
                                    Languages
                                </h2>
                                <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-5">
                                    {languages.map((language, index) => (
                                        <li className="text-[#2A2A2A] text-[16px] pb-1 uppercase leading-none border-b-[2px] border-[#2A2A2A]" key={index}>
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
                                    <h2 className="text-[24px] text-[#233A5F] font-semibold pb-2 mb-5 relative before:content-[''] before:rounded-full before:w-[50px] before:h-[4] before:bg-[#233A5F] before:absolute before:left-[0] before:bottom-[0]">{section.sectionTitle}</h2>
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="mt-2">
                                            <h3 className="text-[20px] text-gray-600 mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                            <div className="text-[#878787] text-[16px] mt-1">{parse(item.description)}</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div >
    );
}
