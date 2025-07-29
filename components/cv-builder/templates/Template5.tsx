import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaBehance, FaDribbble, FaEnvelope, FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaTwitter, FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";


const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function Template5() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();


    return (
        <div className={`bg-[#fff] max-w-[1000px] mx-auto shadow-lg min-h-[1123px] ${plusJakartaSans.className}`}>
            <div className='flex justify-left items-center py-8 px-12'>
                {/* Header Section */}
                <div className="flex justify-center pr-[30px]">
                    <img
                        src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                        alt="Profile"
                        className="w-[112px] h-[112px] rounded-full border-2 border-white"
                    />
                </div>
                <div className="text-left">
                    <h1 className="text-[30px] font-bold text-[#3A395E] uppercase relative before:content-[''] before:w-[45px] before:h-[3px] before:bg-[#7051EF] before:absolute before:left-[0] before:top-0">{personalDetails.firstName} {personalDetails.lastName}</h1>
                    <p className="text-[#7051EF] font-bold text-[24px] uppercase">{personalDetails.jobTitle}</p>
                </div>
            </div>
            <div className="flex flex-col md:flex-row  px-[30px] py-[30px] pr-0">
                {/* Left Column */}
                <div className="text-white pr-3 w-[35%]">

                    {/* Contact Information */}
                    <div className="">
                        <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-1">Contact</h2>
                        <p className="mt-2 pb-2 flex items-center justify-start"> <FaEnvelope className="mr-2 text-[#7051EF]" /> <span className="block text-[16px] pl-[5px] text-[#6E6D8F] leading-none">{personalDetails.email}</span></p>
                        <p className="mt-2 pb-2 flex items-center justify-start"><FaPhone className="mr-2 text-[#7051EF]" /> <span className="block text-[16px] pl-[5px] text-[#6E6D8F] leading-none">{personalDetails.phone}</span></p>
                        <p className="mt-2 pb-2 flex items-center justify-start"><FaMapMarkerAlt className="mr-2 text-[#7051EF]" /> <span className="block text-[16px] pl-[5px] text-[#6E6D8F] leading-none">{personalDetails.city}, {personalDetails.country}</span></p>
                    </div>

                    {/* Education */}
                    <div className="mt-8">
                        <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-1">Education</h2>
                        <div className="flex flex-wrap justify-left items-center">
                            {education.map((edu, index) => (
                                <div key={index} className="mt-2 mb-2 pr-2 w-full">
                                    <h3 className="text-[18px] text-[#040404] mb-0 font-bold">{edu.degree}</h3>
                                    <p className="text-[#6E6D8F] text-[16px] font-medium">{edu.institution}</p>
                                    <p className="text-[#7051EF] text-[16px] font-medium pt-3">{edu.year}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* Skills */}
                    <div className="mt-8">
                        <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-1">Skills</h2>
                        <div className="gap-2 mt-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="block text-[#707070] pb-1 text-[16px] pl-[15px] relative before:content-[''] before:rounded-full before:w-[5px] before:h-[5px] before:bg-[#7051EF] before:absolute before:left-[0] before:top-[10px]">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Links Section */}
                    {links.length > 0 && (
                        <div className="mt-8 space-y-2 pb-4">
                            <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-1 w-fit">Links</h2>
                            <p className="text-[16px] text-[#707070] font-bold pb-1">@johnmoore</p>
                            <div className="flex flex-wrap gap-3 pt-1">
                                {links.map((link, index) => {
                                    let Icon = TbWorld;
                                    let bgClass = "bg-gray-400";

                                    switch (link.label.toLowerCase()) {
                                        case "facebook":
                                            Icon = FaFacebookF;
                                            bgClass = "bg-[#1877F2]";
                                            break;
                                        case "linkedin":
                                            Icon = FaLinkedinIn;
                                            bgClass = "bg-[#0A66C2]";
                                            break;
                                        case "twitter":
                                            Icon = FaTwitter;
                                            bgClass = "bg-[#1DA1F2]";
                                            break;
                                        case "instagram":
                                            Icon = FaInstagram;
                                            bgClass = "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600";
                                            break;
                                        case "youtube":
                                            Icon = FaYoutube;
                                            bgClass = "bg-[#FF0000]";
                                            break;
                                        case "github":
                                            Icon = FaGithub;
                                            bgClass = "bg-[#333]";
                                            break;
                                        case "dribbble":
                                            Icon = FaDribbble;
                                            bgClass = "bg-gradient-to-tr from-pink-400 to-pink-600";
                                            break;
                                        case "behance":
                                            Icon = FaBehance;
                                            bgClass = "bg-[#0057FF]";
                                            break;
                                        default:
                                            Icon = TbWorld;
                                            bgClass = "bg-gray-400";
                                    }

                                    return (
                                        <a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md ${bgClass}`}
                                        >
                                            <Icon className="text-[18px]" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="mt-4">
                            <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-1">Hobbies</h2>
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

                </div>
                {/* Right Column */}
                <div className="w-[65%]">
                    <div className="bg-white min-h-[820px] p-6 rounded-l-[15px] rounded-tr-none rounded-br-none shadow-[0_4px_20px_rgba(0,0,0,0.05)]">

                        {/* Profile Summary */}
                        <div className="border-b-2 border-[#E5E5EA] pb-4">
                            <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-1">About me</h2>
                            <span className="text-[#6E6D8F] text-[16px] mt-1 mb-8">{parse(summary)}</span>
                        </div>

                        {/* Work Experience */}
                        <div className="mt-5 pb-2 border-b-2 border-[#f4f4f4]">
                            <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-1">Work <span className="bg-[#7051EF]">Experience</span> </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mt-1 mb-4">
                                    <h3 className="text-[20px] text-[#7051EF] mb-2 capitalize font-medium">{exp.company}</h3>
                                    <p className="text-[18px] text-[#3A395D] mb-1"><strong className="text-[18px] text-[#030B1A] font-bold">{exp.jobTitle}</strong> - {exp.startDate} / {exp.endDate}</p>
                                    <span className="text-[#6E6D8F] text-[16px] mb-6">{parse(exp.description)}</span>
                                </div>
                            ))}
                        </div>

                        {/* References */}
                        <div className="mt-5">
                            <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-0">References</h2>
                            {references.map((ref, index) => (
                                <p key={index} className="mb-3"><strong className="text-[16px] text-[#7051EF]">{ref.name}</strong> <span className="flex items-center text-[#6E6D8F] pb-1 text-[16px]">{ref.position}</span><span className="flex items-center text-[#6E6D8F] pb-1 text-[16px]">{ref.company}</span></p>
                            ))}
                        </div>

                        {/* Languages Section */}
                        {languages.length > 0 && (
                            <div className="mt-6 pb-4">
                                <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-0">
                                    Languages
                                </h2>
                                <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-5">
                                    {languages.map((language, index) => (
                                        <li className="text-gray-800 text-[16px] pb-1 uppercase leading-none border-b-[2px] border-[#7051EF]" key={index}>
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
                                    <h2 className="text-[24px] text-[#3A395D] uppercase font-bold pb-0">{section.sectionTitle}</h2>
                                    {section.items.map((item, idx) => (
                                        <div key={idx} className="mt-2">
                                            <h3 className="text-[22px] text-gray-600 mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                            <div className="text-[#6E6D8F] text-[16px] text-justify">{parse(item.description)}</div>
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
