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

                        {/* Hobbies Section */}
                        {hobbies.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">Hobbies</h2>
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
                                <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">Link</h2>
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
                            <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">References</h2>
                            {references.map((ref, index) => (
                                <p key={index} className="text-[#fff] text-[16px] mt-2"><strong className="pl-[15px] relative before:content-[''] before:rounded-full before:w-[5px] before:h-[5] before:bg-[#fff] before:absolute before:left-[0] before:top-[8px]"> {ref.name} </strong><span className="flex items-center mt-1 pb-1 text-[16px]">{ref.position}</span><span className="flex items-center pb-1 text-[16px]">{ref.company}</span></p>
                            ))}
                        </div>
                    </div>

                </div>
                {/* Right Column */}
                <div className="w-[60%]">
                    <div className="p-10">
                        {/* Profile Summary */}
                        <div className="pb-8">
                            <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">About me</h2>
                            <p className="text-[#707070] text-[16px] mt-1">{parse(summary)}</p>
                        </div>

                        {/* Work Experience */}
                        <div className="mt-5 pb-2">
                            <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">Work Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mt-1 mb-4">
                                    <h3 className="text-[18px] text-[#DFAE4F] mb-3 uppercase font-medium">{exp.jobTitle}</h3>
                                    <p className="text-[16px] text-[#707070E5] mb-2"><strong className="text-[16px] text-[#030B1A] uppercase font-bold">{exp.company}</strong> | {exp.startDate} - {exp.endDate}</p>
                                    <p className="text-[#707070] text-[16px] mt-1">{parse(exp.description)}</p>
                                </div>
                            ))}
                        </div>
                        {/* Education */}
                        <div className="mt-5">
                            <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">Education</h2>
                            <div className="flex flex-wrap justify-left items-center">
                                {education.map((edu, index) => (
                                    <div key={index} className="mt-2 mb-3 pr-2 w-full">
                                        <h3 className="text-[18px] text-[#040404] mb-0 font-normal uppercase">{edu.degree}</h3>
                                        <p className="text-[#666D79] text-[16px] font-medium">{edu.institution} | {edu.year}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Languages Section */}
                        {languages.length > 0 && (
                            <div className="mt-6 pb-4">
                                <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">
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
                                    <h2 className="text-[24px] text-[#FFFFFF] font-semibold pb-1">{section.sectionTitle}</h2>
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

        </div >
    );
}
