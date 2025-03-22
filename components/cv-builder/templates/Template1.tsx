import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Space_Grotesk } from "next/font/google";
import { TbWorld } from "react-icons/tb";



const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});


export default function Template1() {
    const { personalDetails, links, summary, experience, education, skills, references, customSections, languages, hobbies } = useCVStore();


    return (
        <div className={`bg-[#232B35] max-w-[595px] mx-auto shadow-lg min-h-[968px] border-b-[20px] border-[#1b1f24] ${spaceGrotesk.className}`}>
            <div className='bg-[#1b1f24] flex justify-left items-center py-10 px-8'>
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
                    <h1 className="text-[30px] text-[#fff] leading-0 font-bold mb-0 capitalize">{personalDetails.firstName} <span className="">{personalDetails.lastName}</span></h1>
                    <p className="text-[#fff] text-[22px] capitalize font-bold mt-[-5px]">{personalDetails.jobTitle}</p>
                </div>
            </div>

            {/* button grid */}
            <div className="flex flex-col md:flex-row h-screen px-[20px] pt-[50px] pb-[30px]">
                {/* Left Column */}
                <div className="text-white w-full md:w-1/2 border-r-2 border-[#323b48] pr-8">

                    {/* Summary Section */}
                    <div className="pb-3">
                        <h2 className="text-[16px] text-white font-semibold pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">About me</h2>
                        <p className="text-[#c3cad5] text-[8px] mt-1">{parse(summary)}</p>
                    </div>

                    {/* Education Section */}
                    <div className="mt-5">
                        <h2 className="text-[16px] text-white font-semibold pb-[10px] relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">My Education</h2>
                        {education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-gray-800 mb-5">
                                <p className="text-[#C3CAD5] text-[8px] mb-2 uppercase">{edu.institution} <span className="text-[#075FE4] px-1"> / </span> ({edu.year})</p>
                                <h3 className="text-[10px] mt-[-2px] capitalize leading-none mb-2 font-semibold relative before:content-[''] before:w-[12px] before:h-[12px] before:bg-gray-800 before:rounded-full before:absolute before:-left-[22px] before:top-[0]">{edu.degree}</h3>
                                <p className="text-[#c3cad5] text-[8px] mt-1">{parse(summary)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Contact Info */}
                    <div className="mt-8">
                        <h2 className="text-[16px] text-white font-semibold pb-[15px] relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">Contact information</h2>
                        <div className="">
                            <p className="text-[10px] pb-3 font-bold"><span className="text-[8px] pb-1 text-[#C3CAD5] block font-bold uppercase">Email:</span> {personalDetails.email}</p>
                            <p className="text-[10px] pb-3 font-bold"><span className="text-[8px] pb-1 text-[#C3CAD5] block font-bold uppercase">Call:</span> {personalDetails.phone}</p>
                            <p className="text-[10px] pb-3 font-bold"><span className="text-[8px] pb-1 text-[#C3CAD5] block font-bold uppercase">Address:</span> {personalDetails.city}, {personalDetails.country}</p>
                        </div>
                    </div>

                    {/* References Section */}
                    <div className="mt-8 pb-5">
                        <h2 className="text-[16px] text-white font-semibold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">References</h2>
                        {references.map((ref, index) => (
                            <p key={index} className="mb-3">
                                <strong className="text-[10px] text-[#fff] font-bold capitalize mb-1">{ref.name}</strong>
                                <span className="text-[8px] uppercase text-[#C3CAD5] font-normal block pt-1 mb-1">{ref.position}</span>
                                <span className="text-[8px] uppercase text-[#C3CAD5] font-normal block relative before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#C3CAD5] before:absolute before:left-[0] before:top-[4px] pl-2">{ref.company}</span>
                            </p>
                        ))}
                    </div>


                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 pl-[30px]">
                    {/* Experience Section */}
                    <div>
                        <h2 className="text-[16px] text-white font-semibold capitalize pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">Work Experience</h2>
                        {experience.map((exp, index) => (
                            <div key={index} className="pb-3 pt-4 border-b-2 border-[#323b48]">
                                <p className="pb-1"><strong className="text-[#fff] text-[12px] pr-3 capitalize">{exp.company}</strong> <span className="text-[#C3CAD5] text-[8px] uppercase">{exp.startDate} <span className="text-[#075FE4] px-1"> / </span> {exp.endDate}</span></p>
                                <h3 className="text-[10px] text-[#fff] leading-none capitalize mb-2 font-bold">{exp.jobTitle}</h3>
                                <p className="text-[#c3cad5] text-[8px] mt-1">{parse(summary)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Skills Section */}
                    <div className="mt-8">
                        <h2 className="text-[16px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">Skills</h2>
                        <div className="mt-3 flex grid-flow-row">
                            {skills.slice(0).map((skill, index) => (
                                <span key={index} className="text-[#000] text-[9px] text-center w-[33.3333%] mr-2 bg-[#EEEEEE] uppercase py-[8px] px-[8px] mb-2 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Links Section */}
                    {links.length > 0 && (
                        <div className="mt-8 space-y-2 pb-4">
                            <h2 className="text-[16px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">Links</h2>
                            {links.map((link, index) => (
                                <p key={index} className="flex items-center">
                                    <TbWorld className="mr-2 text-[#fff]" />
                                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#fff] text-sm pb-1 hover:underline">{link.label}</a>
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <div className="mt-6 pb-4">
                            <h2 className="text-[16px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">
                                Languages
                            </h2>
                            <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-3">
                                {languages.map((language, index) => (
                                    <li className="text-[#fff] text-[8px] pb-[2px] uppercase border-b-[2px] border-[#fff]" key={index}>
                                        {language}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <div className="mt-4 border-b border-white-200 pb-4">
                            <h2 className="text-[16px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]"> Hobbies</h2>
                            <ul className="text-[#C3CAD5] text-[8px] mt-2 space-y-1">
                                {hobbies.map((hobby, index) => (
                                    <li
                                        className="pl-4 relative before:content-[''] before:w-[5px] before:h-[8px] before:bg-[#C3CAD5] before:rounded-full before:absolute before:left-[0] before:top-[5px] last:before:content-none"
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
                                <h2 className="text-xl font-semibold border-b border-gray-800 pb-1 uppercase">{section.sectionTitle}</h2>
                                {section.items.map((item, idx) => (
                                    <div key={idx} className="mt-4">
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