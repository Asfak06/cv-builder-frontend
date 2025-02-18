import Image from "next/image";

const steps = [
    { title: "Create Account", desc: "Sign up to start building your professional CV.", Icon: "/user-plus-duotone.svg", stepArrow: '/step-arrows-1.png' },
    { title: "Upload CV/Resume", desc: "Easily upload your existing resume for quick edits.", Icon: "/cloud-arrow-up-duotone.svg", stepArrow: '/step-arrows-2.png' },
    { title: "Find Suitable Job", desc: "Get matched with top job opportunities in your field.", Icon: "/magnifying-glass-plus-duotone.svg", stepArrow: '/step-arrows-3.png' },
    { title: "Apply Job", desc: "Submit applications effortlessly with your new CV.", Icon: "/circle-wavy-check-duotone.svg" }, // No stepArrow
];

export default function HowItWorks() {
    return (
        <section className="py-[100px] text-center text-gray-500 bg-gray-50">
            <h2 className="text-3xl font-bold">How jobpilot works</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-[40px] px-6">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="step__item max-w-xs p-6 relative rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg group"
                    >
                        {step.Icon && (
                            <span className="w-[72px] h-[72px] rounded-full flex justify-center items-center m-auto bg-white transition-all duration-300 group-hover:bg-[#0A65CC]">
                                <Image
                                    src={step.Icon}
                                    alt="icon"
                                    width={30}
                                    height={30}
                                    className="transition-all duration-300 group-hover:invert"
                                />
                            </span>
                        )}
                        <h3 className="text-xl font-semibold text-[#18191C] mt-4">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.desc}</p>
                        {step.stepArrow && (
                            <Image
                                className="mt-4 mx-auto absolute z-10 right-0 top-1/2 transform -translate-y-1/2"
                                src={step.stepArrow}
                                alt="step arrow"
                                width={220}
                                height={48}
                            />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
