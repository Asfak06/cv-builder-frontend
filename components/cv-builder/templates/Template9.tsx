import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Source_Code_Pro } from "next/font/google";


const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function Template9() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();

    return (
        <div className={`bg-[#1D1D1D] max-w-[1123px] mx-auto shadow-lg min-h-[1123px] ${sourceCodePro.className}`}>
            <div className="flex justify-between items-center py-8 px-8">
                <div className='flex justify-left items-center'>
                    {/* Profile Image */}
                    <div className="flex justify-center pr-[20px]">
                        <img
                            src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                            alt="Profile"
                            className="w-[112px] h-[112px] rounded-full border-2 border-white"
                        />

                    </div>
                    {/* Personal Details */}
                    <div className="text-left">
                        <h1 className="text-[35px] text-[#fff] leading-0 font-bold mb-0 capitalize">{personalDetails.firstName} <span className="">{personalDetails.lastName}</span></h1>
                        <p className="text-[#C9C9C9] text-[25px] capitalize font-normal mt-[-5px]">{personalDetails.jobTitle}</p>
                    </div>
                </div>
                {/* Contact Info */}
                <div className="mt-2">
                    <div className="">
                        <p className="text-[16px] text-[#fff] pb-3 font-bold"><span className="text-[16px] pb-1 text-[#909090] block">Email:</span> {personalDetails.email}</p>
                        <p className="text-[16px] text-[#fff] pb-3 font-normal"><span className="text-[16px] pb-1 text-[#909090] block font-bold uppercase">Call:</span> {personalDetails.phone}</p>
                    </div>
                </div>
            </div>

            {/* button grid */}
            <div className="flex flex-col md:flex-row h-full px-[20px] pt-[10px] pb-[50px]">
                {/* Left Column */}
                <div className="text-white w-full md:w-[50%] pr-8">

                    {/* Summary Section */}
                    <div className="pb-5">
                        <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]">About me</h2>
                        <span className="text-[#C9C9C9] text-[16px] mt-1">{parse(summary)}</span>
                    </div>

                    {/* Education Section */}
                    <div className="mt-5 pb-5">
                        <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]">My Education</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-gray-800 mb-8">
                                <p className="text-[16px] text-[#909090] mb-2"> {edu.year}</p>
                                <h3 className="text-[16px] mt-[-2px] text-[#fff] capitalize leading-none mb-2 font-semibold">{edu.degree}</h3>
                                <p className="text-[#C9C9C9] text-[14px] mb-2">{edu.institution}</p>

                                <span className="text-[#c3cad5] text-[14px] mt-1">{parse(edu.description)}</span>
                            </div>
                        ))}
                    </div>

                    {/* References Section */}
                    <div className="pb-5">
                        <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]">References</h2>
                        {references.map((ref, index) => (
                            <p key={index} className="mb-3">
                                <strong className="text-[18px] text-[#fff] font-bold capitalize mb-1">{ref.name}</strong>
                                <span className="text-[16px] uppercase text-[#C3CAD5] font-normal block pt-1 mb-1">{ref.position}</span>
                                <span className="text-[16px] uppercase text-[#C3CAD5] font-normal block relative before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#C3CAD5] before:absolute before:left-[0] before:top-[10px] pl-3">{ref.company}</span>
                            </p>
                        ))}
                    </div>
                    {/* Links Section */}
                    {links.length > 0 && (
                        <div className="mt-5 space-y-2 pb-4">
                            <h2 className="text-[16px] text-[#909090] font-normal pb-1">@johncarter</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {links.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#fff] text-[16px] hover:underline"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="w-full md:w-[50%] pl-[30px]">
                    {/* Experience Section */}
                    <div>
                        <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]">Work Experience</h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="pb-3 pt-0">
                                <p className="pb-3"><strong className="text-[#fff] text-[18px] font-normal pr-3 capitalize">{exp.company}</strong> <span className="text-[#909090] text-[13px] uppercase">{exp.startDate} - {exp.endDate}</span></p>
                                <h3 className="text-[18px] text-[#fff] leading-none capitalize mb-4 font-normal">{exp.jobTitle}</h3>
                                <span className="text-[#C9C9C9] text-[14px] mt-1 leading-6">{parse(exp.description)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]">
                            Skills
                        </h2>

                        <div className="mt-3 gap-3">
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="text-[#FFFFFF] text-[16px] mb-3 pl-5 block relative before:content-[''] before:w-[8px] before:h-[8px] before:bg-[#fff] before:absolute before:left-[0] before:top-[8px] before:rounded-[10px]"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>


                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="mt-5 pb-4">
                            <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]">
                                Languages
                            </h2>
                            <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-3">
                                {languages.map((language, index) => (
                                    <li className="text-[#fff] text-[16px] pb-[2px] uppercase border-b-[2px] border-[#fff]" key={index}>
                                        {language}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="mt-7 pb-4">
                            <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]"> Hobbies</h2>
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
                                <h2 className="text-[26px] text-white font-semibold pb-5 mb-8 relative border-b border-[#4A4A4A]">{section.sectionTitle}</h2>
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
        </div>
    );
}
