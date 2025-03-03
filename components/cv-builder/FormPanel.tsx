import AdditionalSections from "./sections/AdditionalSections";
import CustomSections from "./sections/CustomSections";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import PersonalDetails from "./sections/PersonalDetails";
import References from "./sections/References";
import Skills from "./sections/Skills";
import Summary from "./sections/Summary";


export default function FormPanel() {
    return (
        <div className="space-y-6 text-gray-600">
            <PersonalDetails />
            <Summary />
            <Experience />
            <Education />
            <Skills />
            <References />
            <AdditionalSections />
            <CustomSections />
        </div>
    );
}
