"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {

    const scrollToTemplates = () => {
        document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative py-[80px] bg-gradient-custom text-white">
            <div className="container">
                <div className="row px-6 flex justify-between items-center">
                    <div className="w-[50%]">
                        <h1 className="text-[60px] uppercase mb-[10px] leading-[1] font-bold text-[#CE367F]">
                            Create a <br /> Professional CV
                        </h1>
                        <h5 className="text-[#312D60] text-[24px] font-semibold uppercase mt-[5px]">
                            in Minutes with AI-Powered Precision
                        </h5>
                        <p className="mt-4 text-lg text-[#646161] max-w-3xl mx-auto">
                            Craft the perfect CV that lands you interviews. Our AI-driven CV <br /> builder helps you create a tailored, ATS-friendly resume in just a few <br /> clicks.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <a onClick={scrollToTemplates} className="px-6 py-4 bg-[#CE367F] hover:bg-pink-700 rounded-[10px] font-bold text-white flex items-center gap-2 cursor-pointer">
                                Create New
                                <i className="ri-arrow-right-line"></i>
                            </a>
                            <Link href="/my-cv" className="px-6 py-4 border-[2px] border-[#312D60] hover:bg-gray-300 rounded-[10px] font-bold text-[#312D60] flex items-center gap-2">
                                Create From Draft
                                <i className="ri-arrow-right-line"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="w-[50%] pl-2">
                        <Image
                            src='/Illustration.png'
                            alt='Illustration'
                            width={600}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
