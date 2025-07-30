"use client";

import React from 'react';
import parse from 'html-react-parser';
import { FaFacebookF, FaGithub, FaInstagramSquare, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { SectionRenderer, CVSection } from '../../core/types';

export class Template1SectionRenderer implements SectionRenderer {
    renderSection(section: CVSection, sectionKey: string | number): React.ReactNode {
        switch (section.type) {
            case 'header':
                return (
                    <div key={sectionKey} className='bg-[#1b1f24] flex justify-left items-center py-8 px-8'>
                        <div className="flex justify-center pr-[20px]">
                            <img
                                src={section.content.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${section.content.profileImage}` : "https://placehold.co/500"}
                                alt="Profile"
                                className="w-[112px] h-[112px] rounded-full border-2 border-white"
                            />
                        </div>
                        <div className="text-left">
                            <h1 className="text-[35px] text-[#fff] leading-0 font-bold mb-0 capitalize">
                                {section.content.firstName} <span className="">{section.content.lastName}</span>
                            </h1>
                            <p className="text-[#fff] text-[25px] capitalize font-bold mt-[-5px]">{section.content.jobTitle}</p>
                        </div>
                    </div>
                );

            case 'summary':
                return (
                    <div key={sectionKey} className="pb-3 px-[20px]">
                        <h2 className="text-[26px] text-white font-semibold pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">About me</h2>
                        <p className="text-[#c3cad5] text-[16px] mt-1">{parse(section.content)}</p>
                    </div>
                );

            case 'experience':
                return (
                    <div key={sectionKey} className="pl-[30px]">
                        <h2 className="text-[26px] text-white font-semibold capitalize pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">Work Experience</h2>
                        {section.content.map((exp: any, index: number) => (
                            <div key={index} className="pb-5 pt-4 mb-4 border-b-2 border-[#323b48] last-of-type:border-none">
                                <p className="pb-1"><strong className="text-[#fff] text-[18px] pr-3 capitalize">{exp.company}</strong> <span className="text-[#C3CAD5] text-[13px] uppercase">{exp.startDate} <span className="text-[#075FE4] px-1"> / </span> {exp.endDate}</span></p>
                                <h3 className="text-[16px] text-[#fff] leading-none capitalize mb-2 font-bold">{exp.jobTitle}</h3>
                                <p className="text-[#c3cad5] text-[14px] mt-1">{parse(exp.description)}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'education':
                return (
                    <div key={sectionKey} className="mt-5 px-[20px] pr-5">
                        <h2 className="text-[26px] text-white font-semibold pb-[10px] relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">My Education</h2>
                        {section.content.map((edu: any, index: number) => (
                            <div key={index} className="border-l-2 border-gray-800 mb-5">
                                <p className="text-[#C3CAD5] text-[14px] mb-2 uppercase">{edu.institution} <span className="text-[#075FE4] px-1"> / </span> ({edu.year})</p>
                                <h3 className="text-[16px] mt-[-2px] capitalize leading-none mb-2 font-semibold relative before:content-[''] before:w-[12px] before:h-[12px] before:bg-gray-800 before:rounded-full before:absolute before:-left-[22px] before:top-[0]">{edu.degree}</h3>
                                <p className="text-[#c3cad5] text-[14px] mt-1">{parse(edu.description)}</p>
                            </div>
                        ))}
                    </div>
                );

            case 'skills':
                return (
                    <div key={sectionKey} className="mt-10 pl-[30px]">
                        <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">
                            Skills
                        </h2>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                            {section.content.map((skill: string, index: number) => (
                                <span
                                    key={index}
                                    className="text-[#000] text-[16px] text-center bg-[#EEEEEE] uppercase py-[8px] px-[8px] rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div key={sectionKey} className="mt-8 px-[20px] pr-5">
                        <h2 className="text-[26px] text-white font-semibold pb-[15px] relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">Contact information</h2>
                        <div className="">
                            <p className="text-[14px] pb-3 font-bold"><span className="text-[16px] pb-1 text-[#C3CAD5] block font-bold uppercase">Email:</span> {section.content.email}</p>
                            <p className="text-[14px] pb-3 font-bold"><span className="text-[16px] pb-1 text-[#C3CAD5] block font-bold uppercase">Call:</span> {section.content.phone}</p>
                            <p className="text-[14px] pb-3 font-bold"><span className="text-[16px] pb-1 text-[#C3CAD5] block font-bold uppercase">Address:</span> {section.content.city}, {section.content.country}</p>
                        </div>
                    </div>
                );

            case 'references':
                return (
                    <div key={sectionKey} className="mt-8 pb-5 px-[20px] pr-5">
                        <h2 className="text-[26px] text-white font-semibold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">References</h2>
                        {section.content.map((ref: any, index: number) => (
                            <p key={index} className="mb-4">
                                <strong className="text-[16px] text-[#fff] font-bold capitalize mb-1">{ref.name}</strong>
                                <span className="text-[14px] uppercase text-[#C3CAD5] font-normal block pt-1 mb-1">{ref.position}</span>
                                <span className="text-[14px] uppercase text-[#C3CAD5] font-normal block relative before:content-[''] before:w-[5px] before:h-[5px] before:rounded-full before:bg-[#C3CAD5] before:absolute before:left-[0] before:top-[8px] pl-3">{ref.company}</span>
                            </p>
                        ))}
                    </div>
                );

            case 'languages':
                return (
                    <div key={sectionKey} className="mt-10 pb-4 pl-[30px]">
                        <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">
                            Languages
                        </h2>
                        <ul className="text-gray-800 text-sm mt-2 space-y-1 grid grid-cols-2 gap-3">
                            {section.content.map((language: string, index: number) => (
                                <li className="text-[#fff] text-[14px] pb-[2px] uppercase border-b-[2px] border-[#fff]" key={index}>
                                    {language}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'hobbies':
                return (
                    <div key={sectionKey} className="mt-10 pb-4 pl-[30px]">
                        <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]"> Hobbies</h2>
                        <ul className="text-[#C3CAD5] text-[14px] mt-2 space-y-1">
                            {section.content.map((hobby: string, index: number) => (
                                <li
                                    className="pl-4 relative before:content-[''] before:w-[5px] before:h-[5px] before:bg-[#C3CAD5] before:rounded-full before:absolute before:left-[0] before:top-[8px] last:before:content-none"
                                    key={index}
                                >
                                    {hobby}
                                </li>
                            ))}
                        </ul>
                    </div>
                );

            case 'links':
                return (
                    <div key={sectionKey} className="mt-8 space-y-2 pb-4 pl-[30px]">
                        <h2 className="text-[16px] text-white font-bold pb-1">@johncarter</h2>
                        <div className="flex justify-start items-center">
                            {section.content.map((link: any, index: number) => {
                                let Icon = TbWorld;
                                
                                switch (link.label.toLowerCase()) {
                                    case "facebook": Icon = FaFacebookF; break;
                                    case "linkedin": Icon = FaLinkedinIn; break;
                                    case "twitter": Icon = FaTwitter; break;
                                    case "youtube": Icon = FaYoutube; break;
                                    case "instagram": Icon = FaInstagramSquare; break;
                                    case "github": Icon = FaGithub; break;
                                    default: Icon = TbWorld;
                                }

                                return (
                                    <p key={index} className="flex items-center">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-[#fff] text-[30px] pb-1 hover:underline">
                                            <Icon className="mr-3 text-[#fff]" />
                                        </a>
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                );

            case 'custom':
                return (
                    <div key={sectionKey} className="mt-6 pl-[30px]">
                        {section.content.map((customSection: any, index: number) => (
                            <div key={index} className="mb-6">
                                <h2 className="text-[26px] text-white font-bold uppercase pb-1 relative before:content-[''] before:w-[40px] before:h-[2px] before:bg-[#fff] before:absolute before:left-[0] before:top-[-10px]">{customSection.sectionTitle}</h2>
                                {customSection.items.map((item: any, idx: number) => (
                                    <div key={idx} className="mt-4">
                                        <h3 className="text-[28] text-[#fff] mt-[-2px] capitalize leading-none mb-2 font-semibold">{item.title}</h3>
                                        <div className="text-[#fff] text-[24] text-justify">{parse(item.description)}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                );

            default:
                return null;
        }
    }
}
