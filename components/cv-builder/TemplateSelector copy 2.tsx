import Template1 from "@/components/templates/Template1"; // নিশ্চিত করুন পাথ সঠিক
import { templates } from "@/lib/data"; // নিশ্চিত করুন এখানে টেমপ্লেটের ডাটা আছে
import { useCVStore } from "@/store/cvStore";

export default function TemplateSelector() {
    // Store থেকে ডাটা ফেচ করা
    const { updateTemplate, selectedIndustry, selectedTemplate } = useCVStore();

    // সঠিক টেমপ্লেট ফিল্টার করা
    const filteredTemplates =
        selectedIndustry === "All"
            ? templates
            : templates.filter((template) => template.industry === selectedIndustry);

    // সিলেক্ট করা টেমপ্লেট ফিল্টার করা
    const selectedTemplateObj = templates.find((item) => item.id === selectedTemplate);
    const TemplateComponent = selectedTemplateObj ? selectedTemplateObj.component : Template1;

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#CE367F] mb-3">Select Your Template</h2>

            {/* টেমপ্লেট লিস্ট দেখানো */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredTemplates.map((item) => (
                    <div
                        key={item.id}
                        className={`border p-2 rounded-lg cursor-pointer transition-all ${selectedTemplate === item.id ? "border-[#CE367F] shadow-lg scale-105" : ""
                            }`}
                        onClick={() => updateTemplate(item.id)}
                    >
                        <item.component />
                        <p className="text-center mt-2 font-medium">{item.industry} {item.id}</p>
                    </div>
                ))}
            </div>

            {/* সিলেক্ট করা টেমপ্লেট Preview */}
            <div className="mt-6 p-4 border rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-[#CE367F] mb-3">Selected Template Preview</h3>
                <TemplateComponent />
            </div>
        </div>
    );
}
