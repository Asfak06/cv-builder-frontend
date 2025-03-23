import { templates } from "@/lib/data";
import { useCVStore } from "@/store/cvStore";


export default function TemplateSelector() {
    const TemplateComponent = templates[selectedTemplate] || Template1;
    const { updateTemplate, selectedIndustry, selectedTemplate } = useCVStore();
    const filteredTemplates =
        selectedIndustry === "All"
            ? templates
            : templates.filter((template) => template.industry === selectedIndustry);
    return (
        <div className="mb-4">
            <label className="block text-lg text-[#CE367F] font-semibold">Select Template:</label>
            <select
                value={selectedTemplate}
                onChange={(e) => updateTemplate(e.target.value)}
                className="w-full h-[58px] p-2 border rounded-lg mt-2"
            >
                {filteredTemplates.map((item, i) => (
                    <option key={i} value={`${item.id}`}> {item.industry}{' '} {item.id} </option>
                ))}

            </select>
        </div>
    );
}
