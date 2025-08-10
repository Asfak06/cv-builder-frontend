"use client";

import SmartTemplate1Preview from './templates/template1/SmartTemplate1Preview';

interface SmartTemplateManagerProps {
    templateId: string;
}

export default function SmartTemplateManager({ templateId }: SmartTemplateManagerProps) {
    const renderTemplate = () => {
        switch (templateId) {
            case 'template-1':
                return <SmartTemplate1Preview />;
            // Future templates can be added here
            // case 2:
            //     return <SmartTemplate2Preview />;
            // case 3:
            //     return <SmartTemplate3Preview />;
            default:
                return <SmartTemplate1Preview />;
        }
    };

    return (
        <div className="smart-template-manager">
            {renderTemplate()}
        </div>
    );
}
