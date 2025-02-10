const steps = [
    { title: "Create Account", desc: "Sign up to start building your professional CV." },
    { title: "Upload CV/Resume", desc: "Easily upload your existing resume for quick edits." },
    { title: "Find Suitable Job", desc: "Get matched with top job opportunities in your field." },
    { title: "Apply Job", desc: "Submit applications effortlessly with your new CV." },
];

export default function HowItWorks() {
    return (
        <section className="py-16 text-center text-gray-500 bg-gray-50">
            <h2 className="text-3xl font-bold ">How jobpilot work</h2>
            <div className="flex flex-wrap justify-center gap-8 mt-6 px-6">
                {steps.map((step, index) => (
                    <div key={index} className="max-w-xs bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
