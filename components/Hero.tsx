"use client";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();

    const scrollToTemplates = () => {
        document.getElementById("templates")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative flex flex-col items-center text-center py-20 bg-gradient-to-r from-pink-300 to-purple-400 text-white">
            <h1 className="text-5xl font-extrabold">CREATE A PROFESSIONAL CV</h1>
            <p className="mt-4 text-lg max-w-2xl">
                Craft the perfect CV that lands you interviews. Our AI-driven CV builder helps you create a tailored, ATS-friendly resume in just a few clicks.
            </p>
            <div className="mt-6 flex gap-4">
                <button onClick={scrollToTemplates} className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-bold text-white">
                    Create New
                </button>
                <button onClick={() => router.push("/dashboard")} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-black">
                    Create From Draft
                </button>
            </div>
        </section>
    );
}
