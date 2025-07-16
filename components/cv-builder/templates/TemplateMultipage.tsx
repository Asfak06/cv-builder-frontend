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
        // links,
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
        <div
            className={`bg-white shadow-lg mx-auto overflow-hidden ${inter.className}`}
        >
            {/* Header - Will always be on first page */}
            <header className="bg-slate-800 text-white px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {personalDetails.firstName} {personalDetails.lastName}
                        </h1>
                        <p className="text-xl text-slate-300 mt-1">{personalDetails.jobTitle}</p>
                    </div>
                    <div>
                        {personalDetails.profileImage && (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-slate-600"
                            />
                        )}
                    </div>
                </div>
            </header>

            {/* Contact Info - Will always be on first page */}
            <div className="bg-slate-700 text-white px-8 py-3 flex justify-between">
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

            <div className="page-content">
                {/* Content will flow between pages automatically */}
                <div className="px-8 py-6">
                    {/* Summary Section */}
                    {summary && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                PROFESSIONAL SUMMARY
                            </h2>
                            <div className="text-sm text-gray-700">{parse(summary)}</div>
                        </section>
                    )}

                    {/* Skills Section */}
                    {skills.length > 0 && (
                        <section className="mb-6 page-break-inside-avoid">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                SKILLS
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Experience Section */}
                    {experience.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                WORK EXPERIENCE
                            </h2>
                            {experience.map((exp, index) => (
                                <div key={index} className="mb-4 page-break-inside-avoid">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
                                        <p className="text-sm text-gray-600">
                                            {exp.startDate} - {exp.endDate}
                                        </p>
                                    </div>
                                    <p className="text-gray-800 font-medium">{exp.company}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Education Section */}
                    {education.length > 0 && (
                        <section className="mb-6">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                EDUCATION
                            </h2>
                            {education.map((edu, index) => (
                                <div key={index} className="mb-4 page-break-inside-avoid">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                        <p className="text-sm text-gray-600">{edu.year}</p>
                                    </div>
                                    <p className="text-gray-800">{edu.institution}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {/* Languages Section */}
                    {languages.length > 0 && (
                        <section className="mb-6 page-break-inside-avoid">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                LANGUAGES
                            </h2>
                            <div className="grid grid-cols-2 gap-2">
                                {languages.map((language, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className="w-3 h-3 bg-slate-800 rounded-full mr-2"></span>
                                        <span className="text-gray-800">{language}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Hobbies Section */}
                    {hobbies.length > 0 && (
                        <section className="mb-6 page-break-inside-avoid">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                HOBBIES
                            </h2>
                            <div className="flex flex-wrap gap-4">
                                {hobbies.map((hobby, index) => (
                                    <span key={index} className="text-gray-700">
                                        {hobby}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* References Section */}
                    {references.length > 0 && (
                        <section className="mb-6 page-break-inside-avoid">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                REFERENCES
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {references.map((ref, index) => (
                                    <div key={index} className="bg-slate-50 p-3 rounded">
                                        <p className="font-semibold">{ref.name}</p>
                                        <p className="text-sm text-gray-600">{ref.position}</p>
                                        <p className="text-sm text-gray-600">{ref.company}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Custom Sections */}
                    {customSections.map((section, index) => (
                        <section key={index} className="mb-6 page-break-inside-avoid">
                            <h2 className="text-xl font-bold border-b-2 border-slate-800 pb-1 mb-3">
                                {section.sectionTitle.toUpperCase()}
                            </h2>
                            {section.items.map((item, idx) => (
                                <div key={idx} className="mb-4">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <div className="text-sm text-gray-700">
                                        {parse(item.description)}
                                    </div>
                                </div>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}