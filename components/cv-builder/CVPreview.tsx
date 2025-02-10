import { useCVStore } from "@/store/cvStore";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import TemplateSelector from "./TemplateSelector";

const templates: Record<string, React.FC> = {
    template1: Template1,
    template2: Template2,
};

export default function CVPreview() {
    const { selectedTemplate } = useCVStore();
    const TemplateComponent = templates[selectedTemplate] || Template1; // Default to Template1 if not found

    return (
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md text-gray-600">
            <TemplateSelector />
            <TemplateComponent />
        </div>
    );
}
