"use client";
import Image from "next/image"; // Next.js Image Component
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();

    const scrollToTemplates = () => {
        document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            className="relative flex justify-center items-center py-[100px] text-gray-900" style={{ background: 'linear-gradient(90.63deg, #f0d3e7 21.32%, #d3e0f0 132.04%);' }}>
            <div className="container px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                    <div>
                        <h1 className="text-[60px] leading-[1] font-bold text-[#CE367F] ">
                            CREATE A <span className="block">PROFESSIONAL CV</span>
                        </h1>
                        <h5 className="text-[#312D60] text-[24px] font-semibold uppercase mt-[5px]">in Minutes with AI-Powered Precision</h5>
                        <p className="mt-4 text-lg text-[#646161] max-w-2xl">
                            Craft the perfect CV that lands you interviews. Our AI-driven CV <br /> builder helps you create a tailored, ATS-friendly resume in just a few <br /> clicks.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={scrollToTemplates}
                                className="px-6 py-3 bg-[#CE367F] hover:bg-[#C2185B] rounded-lg font-bold text-white shadow-lg transition"
                            >
                                Create New
                            </button>
                            <button
                                onClick={() => router.push("/dashboard")}
                                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-black shadow-md transition"
                            >
                                Create From Draft
                            </button>
                        </div>
                    </div>
                    {/* Right Side Image */}
                    <div className="flex justify-center">
                        <Image src="/Illustration.png" alt="Hero Img" width={500} height={500} priority />
                    </div>
                </div>
            </div>
        </section>
    );
}
