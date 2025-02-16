import { templates } from "@/lib/data";
import { useCVStore } from "@/store/cvStore";

export default function TemplateSelector() {
    const { updateTemplate, selectedIndustry, selectedTemplate } = useCVStore();
    const filteredTemplates =
        selectedIndustry === "All"
            ? templates
            : templates.filter((template) => template.industry === selectedIndustry);
    return (
        <div className="mb-4">
            <label className="block text-lg font-semibold">Select Template:</label>
            <select
                value={selectedTemplate}
                onChange={(e) => updateTemplate(e.target.value)}
                className="w-full p-2 border rounded mt-2"
            >
                {filteredTemplates.map((item) => (
                    <option value={`${item.id}`}> {item.industry}{' '} {item.id} </option>
                ))}

            </select>
        </div>
    );
}
