import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
export default function Template3() {
    const { personalDetails, summary, experience, education, skills, references } = useCVStore();

    return (
        <div className="bg-[#fff] flex flex-col relative overflow-hidden md:flex-row max-w-4xl mx-auto shadow-lg min-h-[1123]">
            <div className="w-[200px] h-[200px] z-20 top-[-50px] left-[-50px] rounded-full bg-[#81b1b3] absolute"></div>
            <div className="absolute top-0 left-0 right-0 px-2 py-2 flex justify-end items-center bg-[#7aa7aa]">
                <span className="w-[15px] ml-1 mr-1 h-[15px] rounded-full bg-[#62888b] inline-block"></span>
                <span className="w-[15px] ml-1 mr-1 h-[15px] rounded-full bg-[#9cc3c8] inline-block"></span>
                <span className="w-[15px] ml-1 mr-1 h-[15px] rounded-full bg-[#a8d5d8] inline-block"></span>
            </div>
            {/* Left Column */}
            <div className="text-white bg-[#62888b] px-5 mt-[170px] w-full md:w-1/3 rounded-full md:rounded-b-none flex flex-col items-center">
                {/* Profile Image */}
                <img
                    src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "https://placehold.co/500"}
                    alt="Profile"
                    className="w-40 h-40 rounded-full relative z-20 mt-[-120px] border-4 border-white"
                />
                <h1 className="text-[30px] font-extrabold uppercase text-center leading-[34px] mt-4 mb-2">{personalDetails.firstName} <spam className='block'>{personalDetails.lastName}</spam></h1>
                <p className="text-white text-[16px] font-medium uppercase text-center">{personalDetails.jobTitle}</p>
                {/* About Me */}
                <div className="mt-6 text-center">
                    <h2 className="text-[18px] uppercase font-semibold pb-1">About Me</h2>
                    <p className="text-gray-200 text-justify text-sm mt-2">{parse(summary)}</p>
                </div>
                {/* Contact Info */}
                <div className="mt-6 text-center">
                    <h2 className="text-[18px] uppercase font-semibold pb-1">Contact</h2>
                    <p className="mt-2 mb-3 text-gray-200"><strong className="block uppercase pb-1 text-white">Phone</strong> {personalDetails.phone}</p>
                    <p className="text-gray-200 mb-3"><strong className="block uppercase text-white pb-1">Email</strong> {personalDetails.email}</p>
                    <p className="text-gray-200 mb-3"><strong className="block uppercase text-white pb-1">Address</strong> {personalDetails.city}, {personalDetails.country}</p>
                </div>

            </div>

            {/* Right Column */}
            <div className="bg-white p-6 pr-0 pt-[80px] w-full md:w-2/3 rounded-lg md:rounded-l-none">
                {/* Education */}
                <div className="text-right">
                    <h2 className="text-[20px] mb-2 font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">Education</h2>
                    {education.map((edu, index) => (
                        <div key={index} className="py-3 p-5">
                            <h3 className="text-[18px] mb-1 font-semibold">{edu.degree}</h3>
                            <p className="text-gray-400 text-[14px]">{edu.institution} ({edu.year})</p>
                        </div>
                    ))}
                </div>
                {/* Work Experience */}
                <div className="mt-6 text-right">
                    <h2 className="text-[20px] mb-2 text-right font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">Work Experience</h2>
                    {experience.map((exp, index) => (
                        <div key={index} className="py-3 p-5">
                            <h3 className="text-[18px] mb-1 font-semibold">{exp.jobTitle}</h3>
                            <p className="text-gray-500 text-smtext-gray-400 text-[14px]">{exp.company} ({exp.startDate} - {exp.endDate})</p>
                        </div>
                    ))}
                </div>
                {/* References */}
                <div className="mt-6 text-right">
                    <h2 className="text-[20px] mb-2 text-right font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">References</h2>
                    {references.map((ref, index) => (
                        <div key={index} className="py-3 p-5">
                            <h3 className="text-[18px] mb-1 font-semibold">{ref.name}</h3>
                            <p className="text-gray-500 text-smtext-gray-400 text-[14px]">{ref.company}</p>
                        </div>
                    ))}
                </div>
                {/* Skills */}
                <div className="mt-6">
                    <h2 className="text-[20px] mb-2 text-right font-semibold rounded-full rounded-r-none uppercase border-b py-2 px-5 text-white bg-[#62888b]">Personal Skills</h2>
                    <div className="py-3 p-5 pl-[200px] text-right">
                        {skills.map((skill, index) => (
                            <span key={index} className="block text-[18px] mb-4 font-semibold border-b-[5px] border-[#afccc8]">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
