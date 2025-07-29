import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Inter } from "next/font/google";
import { FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedinIn, FaMapMarkerAlt, FaTwitter, FaYoutube } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { TbWorld } from "react-icons/tb";


const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function Template10() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();

    return (
        <div className={`bg-[#FEFEFF] max-w-[1123px] mx-auto shadow-lg min-h-[1123px] border-[#fff] ${inter.className}`}>
            <div className='flex justify-left items-center py-8 px-8'>
                {/* Profile Image */}
                <div className="flex justify-center pr-[20px]">
                    <img
                        src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                        alt="Profile"
                        className="w-[120px] h-[120px] rounded-[10px]"
                    />

                </div>
                {/* Personal Details */}
                <div className="text-left">
                    <h1 className="text-[35px] text-[#1A1A1A] leading-0 font-bold mb-0">{personalDetails.firstName} <span className="">{personalDetails.lastName}</span></h1>
                    <p className="text-[#1A1A1A] text-[35px] font-bold mt-[-5px]">{personalDetails.jobTitle}</p>
                </div>
            </div>

            {/* button grid */}
            <div className="h-full px-[20px] pt-[30px] pb-[30px]">
                <div className="flex border-t border-[#ECECEC] py-8">
                    {/* Contact Info */}
                    <div className="w-[40%]">
                        <h2 className="text-[26px] text-[#1A1A1A] font-semibold pb-[10px]">Contact</h2>
                        <div className="">
                            <p className="text-[16px] text-[#272727] pb-2 flex justify-start items-center"><span className="text-[16px] pb-1 pr-3 text-[#1A1A1A] block font-bold uppercase"><MdOutlineMail /></span> {personalDetails.email}</p>
                            <p className="text-[16px] text-[#272727] pb-2 flex justify-start items-center"><span className="text-[16px] pb-1 pr-3 text-[#1A1A1A] block font-bold uppercase"><LuPhone /></span> {personalDetails.phone}</p>
                            <p className="text-[16px] text-[#272727] pb-2 flex justify-start items-center"><span className="text-[16px] pb-1 pr-3 text-[#1A1A1A] block font-bold uppercase"><FaMapMarkerAlt /></span> {personalDetails.city}, {personalDetails.country}</p>
                        </div>
                    </div>
                    {/* Links Section */}
                    {links.length > 0 && (
                        <div className="w-[60%]">
                            <h2 className="text-[20px] text-[#848484] font-normal pb-5">@johncarter</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                                            className="flex items-center text-[#1A1A1A] hover:underline"
                                        >
                                            <Icon className="mr-2 text-[18px]" />
                                            <span className="text-[16px]">{link.label}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex border-t border-[#ECECEC] py-8">
                    <div className="w-[30%]">
                        <h2 className="text-[26px] text-[#1A1A1A] font-semibold">About me</h2>
                    </div>
                    {/* Summary Section */}
                    <div className="pb-3 w-[70%]">
                        <span className="text-[#848484] text-[16px] mt-1">{parse(summary)}</span>
                    </div>
                </div>

                {/* Education Section */}
                <div className="flex border-t border-[#ECECEC] py-8">
                    <div className="w-[30%]">
                        <h2 className="text-[26px] text-[#1A1A1A] font-semibold">My Education</h2>
                    </div>
                    <div className="w-[70%]">
                        {education.map((edu, index) => (
                            <div key={index} className="mb-8">
                                <h3 className="text-[16px] mt-[-2px] text-[#1A1A1A] leading-none mb-2 font-semibold">{edu.degree} <span className="text-[#848484] font-normal pl-2">{edu.year}</span></h3>
                                <p className="text-[#848484] text-[16px] mb-2">{edu.institution}</p>
                                <span className="text-[#848484] text-[16px] mt-1">{parse(edu.description)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="flex border-t border-[#ECECEC] py-8">
                    <div className="w-[30%]">
                        <h2 className="text-[26px] text-[#1A1A1A] font-semibold">Experience</h2>
                    </div>
                    <div className="w-[70%]">
                        {experience.map((exp, index) => (
                            <div key={index} className="pb-3 pt-4">
                                <h3 className="text-[16px] text-[#1A1A1A] leading-none capitalize mb-2 font-bold">{exp.jobTitle}</h3>
                                <p className="pb-1"><strong className="text-[#1A1A1A] text-[16px] pr-3 font-semibold">{exp.company}</strong> <span className="text-[#848484] text-[13px] uppercase">{exp.startDate} <span className="text-[#848484] px-1"> - </span> {exp.endDate}</span></p>
                                <span className="text-[#848484] text-[16px] leading-7 mt-1">{parse(exp.description)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* References Section */}
                <div className="mt-8 pb-5">
                    <h2 className="text-[26px] text-white font-semibold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">References</h2>
                    {references.map((ref, index) => (
                        <p key={index} className="mb-3">
                            <strong className="text-[16px] text-[#fff] font-bold capitalize mb-1">{ref.name}</strong>
                            <span className="text-[14px] uppercase text-[#C3CAD5] font-normal block pt-1 mb-1">{ref.position}</span>
                            <span className="text-[14px] uppercase text-[#C3CAD5] font-normal block relative before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#C3CAD5] before:absolute before:left-[0] before:top-[4px] pl-2">{ref.company}</span>
                        </p>
                    ))}
                </div>


                <div className="mt-8">
                    <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">
                        Skills
                    </h2>

                    <div className="mt-3 grid grid-cols-3 gap-3">
                        {skills.map((skill, index) => (
                            <span
                                key={index}
                                className="text-[#000] text-[16px] text-center bg-[#EEEEEE] uppercase py-[8px] px-[8px] rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Languages Section */}
                {languages.length > 0 && (
                    <div className="mt-6 pb-4">
                        <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">
                            Languages
                        </h2>
                        <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-3">
                            {languages.map((language, index) => (
                                <li className="text-[#fff] text-[14px] pb-[2px] uppercase border-b-[2px] border-[#fff]" key={index}>
                                    {language}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Hobbies Section */}
                {hobbies.length > 0 && (
                    <div className="mt-7 pb-4">
                        <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]"> Hobbies</h2>
                        <ul className="text-[#C3CAD5] text-[14px] mt-2 space-y-1">
                            {hobbies.map((hobby, index) => (
                                <li
                                    className="pl-4 relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#C3CAD5] before:rounded-full before:absolute before:left-[0] before:top-[5px] last:before:content-none"
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
                            <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">{section.sectionTitle}</h2>
                            {section.items.map((item, idx) => (
                                <div key={idx} className="mt-4">
                                    <h3 className="text-[28] text-[#fff] mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                    <div className="text-[#fff] text-[24] text-justify">{parse(item.description)}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
