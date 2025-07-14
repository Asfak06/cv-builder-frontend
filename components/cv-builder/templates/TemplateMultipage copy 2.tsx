import { useCVStore } from "@/store/cvStore";
import parse from "html-react-parser";
import { Inter } from "next/font/google";
import Image from "next/image";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function TemplateMultipage() {
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

    return (
        <div className={`bg-white mx-auto shadow print:shadow-none p-0 ${inter.className}`}>
            {/* Header */}
            <header className="bg-slate-800 text-white px-8 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {personalDetails.firstName} {personalDetails.lastName}
                        </h1>
                        <p className="text-xl text-slate-300">{personalDetails.jobTitle}</p>
                    </div>
                    {personalDetails.profileImage && (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}`}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-slate-600"
                        />
                    )}
                </div>
            </header>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-[250px_1fr] gap-6 px-8 py-6 print:grid-cols-[250px_1fr]">

                {/* Sidebar */}
                <aside className="space-y-6 print:break-inside-avoid">

                    {/* Contact Info */}
                    <div className="text-sm text-gray-800 space-y-2 print:break-inside-avoid">
                        {personalDetails.email && (
                            <div className="flex items-center">
                                <FaEnvelope className="mr-2" />
                                <span>{personalDetails.email}</span>
                            </div>
                        )}
                        {personalDetails.phone && (
                            <div className="flex items-center">
                                <FaPhone className="mr-2" />
                                <span>{personalDetails.phone}</span>
                            </div>
                        )}
                        {personalDetails.city && personalDetails.country && (
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                <span>
                                    {personalDetails.city}, {personalDetails.country}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    {skills.length > 0 && (
                        <div className="print:break-inside-avoid">
                            <h2 className="text-sm font-bold text-slate-700 mb-2">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {languages.length > 0 && (
                        <div className="print:break-inside-avoid">
                            <h2 className="text-sm font-bold text-slate-700 mb-2">Languages</h2>
                            <ul className="list-disc ml-4 text-sm text-gray-800 space-y-1">
                                {languages.map((lang, idx) => (
                                    <li key={idx}>{lang}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Hobbies */}
                    {hobbies.length > 0 && (
                        <div className="print:break-inside-avoid">
                            <h2 className="text-sm font-bold text-slate-700 mb-2">Hobbies</h2>
                            <ul className="list-disc ml-4 text-sm text-gray-800 space-y-1">
                                {hobbies.map((hobby, idx) => (
                                    <li key={idx}>{hobby}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="space-y-6">

                    {/* Summary */}
                    {summary && (
                        <section className="print:break-inside-avoid page-break-after">
                            <h2 className="text-lg font-bold text-slate-800 mb-2">
                                Professional Summary
                            </h2>
                            <div className="text-sm text-gray-700">{parse(summary)}</div>
                        </section>
                    )}

                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className="print:break-inside-avoid page-break-after">
                            <h2 className="text-lg font-bold text-slate-800 mb-2">Work Experience</h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span>{exp.jobTitle}</span>
                                        <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{exp.company}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="print:break-inside-avoid page-break-after">
                            <h2 className="text-lg font-bold text-slate-800 mb-2">Education</h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-3">
                                    <div className="flex justify-between text-sm font-semibold">
                                        <span>{edu.degree}</span>
                                        <span className="text-gray-500">{edu.year}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* References */}
                    {references.length > 0 && (
                        <section className="print:break-inside-avoid page-break-after">
                            <h2 className="text-lg font-bold text-slate-800 mb-2">References</h2>
                            <div className="space-y-2">
                                {references.map((ref, index) => (
                                    <div key={index} className="text-sm bg-slate-50 p-3 rounded">
                                        <p className="font-semibold">{ref.name}</p>
                                        <p className="text-gray-600">{ref.position}</p>
                                        <p className="text-gray-600">{ref.company}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections.map((section, index) => (
                        <section key={index} className="print:break-inside-avoid page-break-after">
                            <h2 className="text-lg font-bold text-slate-800 mb-2">
                                {section.sectionTitle}
                            </h2>
                            {section.items.map((item, idx) => (
                                <div key={idx} className="mb-3">
                                    <h3 className="text-sm font-semibold">{item.title}</h3>
                                    <div className="text-sm text-gray-700">{parse(item.description)}</div>
                                </div>
                            ))}
                        </section>
                    ))}
                </main>
            </div>
        </div>
    );
}
