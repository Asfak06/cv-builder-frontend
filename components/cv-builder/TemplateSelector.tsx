import { useCVStore } from "@/store/cvStore";

export default function TemplateSelector() {
    const { updateTemplate } = useCVStore();

    return (
        <div className="mb-4">
            <label className="block text-lg font-semibold">Select Template:</label>
            <select
                onChange={(e) => updateTemplate(e.target.value)}
                className="w-full p-2 border rounded mt-2"
            >
                <option value="template1">Classic Template</option>
                <option value="template2">Modern Template</option>
            </select>
        </div>
    );
}
