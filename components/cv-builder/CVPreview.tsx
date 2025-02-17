import { useCVStore } from "@/store/cvStore";
import { useUserStore } from "@/store/userStore";
import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import TemplateSelector from "./TemplateSelector";

const templates: Record<string, React.FC> = {
    'template-1': Template1,
    'template-2': Template2,
    'template-3': Template3,
    'template-4': Template4,
};

export default function CVPreview() {
    const { selectedTemplate, saveCVData } = useCVStore();
    const { userData } = useUserStore()
    const TemplateComponent = templates[selectedTemplate] || Template1;



    return (
        <div className="p-4 border rounded-lg bg-gray-50 shadow-md text-gray-600">
            <TemplateSelector />
            <TemplateComponent />

            <button
                onClick={() => saveCVData(userData.id)}
                className="px-4 py-2 my-5 bg-pink-600 text-white font-bold rounded-lg"
            >
                Save
            </button>
        </div>
    );
}
