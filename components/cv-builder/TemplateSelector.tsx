import { templates } from "@/lib/data";
import { useCVStore } from "@/store/cvStore";




export default function TemplateSelector() {
    const { updateTemplate, selectedIndustry, selectedTemplate } = useCVStore();

    // ফিল্টার করা টেমপ্লেটগুলো
    const filteredTemplates =
        selectedIndustry === "All"
            ? templates
            : templates.filter((template) => template.industry === selectedIndustry);

    return (
        <div className="mb-4">
            <h2 className="text-lg text-[#CE367F] font-semibold mb-4">Select Your Template:</h2>

            {/* টেমপ্লেটের ছবি গুলি দেখানো */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredTemplates.map((item) => (
                    <div
                        key={item.id}
                        className={`border p-2 rounded-lg cursor-pointer transition-all ${selectedTemplate === item.id ? "border-[#CE367F] shadow-lg scale-105" : ""
                            }`}
                        onClick={() => updateTemplate(item.id)} // টেমপ্লেট সিলেক্ট করলে
                    >
                        <img
                            src={`/thumbnails/${item.img}`} // `public/thumbnails/` থেকে লোড হবে
                            alt={item.id}
                            className="w-full h-auto rounded-md"
                        />
                        <p className="text-center mt-2 font-medium">{item.industry} {item.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
