import { templates } from "@/lib/data";
import { useCVStore } from "@/store/cvStore";
import Image from "next/image";

export default function TemplateSelector() {
    const { updateTemplate, selectedIndustry, selectedTemplate } = useCVStore();

    // ফিল্টার করা টেমপ্লেটগুলো
    const filteredTemplates =
        selectedIndustry === "All"
            ? templates
            : templates.filter((template) => template.industry === selectedIndustry);

    return (
        <div className="mb-4">
            <h2 className="text-lg text-[#CE367F] font-semibold mb-5">Select Your Template:</h2>

            {/* টেমপ্লেটের ছবি গুলি দেখানো */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {filteredTemplates.map((item) => (
                    <div
                        key={item.id}
                        className={`relative border p-2 rounded-lg cursor-pointer transition-all duration-300 
                            ${selectedTemplate === item.id ? "border-[#CE367F] shadow-lg scale-105" : "hover:shadow-md"}
                            group`}
                        onClick={() => updateTemplate(item.id)} // টেমপ্লেট সিলেক্ট করলে
                    >
                        {/* ইমেজ */}
                        <Image
                            src={item.img}
                            alt={item.id}
                            className="w-full h-auto rounded-md"
                            width={500} height={700}
                        />

                        {/* হিডেন টেক্সট */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                            <p className="text-white font-medium">{item.industry} {item.id}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
