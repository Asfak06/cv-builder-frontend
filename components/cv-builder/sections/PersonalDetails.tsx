import { useCVStore } from "@/store/cvStore";

export default function PersonalDetails() {
    const { personalDetails, updatePersonalDetails } = useCVStore();

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Personal Details</h3>
            <input
                type="text"
                placeholder="Job Title"
                value={personalDetails.jobTitle}
                onChange={(e) => updatePersonalDetails("jobTitle", e.target.value)}
                className="w-full p-2 border rounded mt-2"
            />
            <div className="flex gap-4 mt-2">
                <input
                    type="text"
                    placeholder="First Name"
                    value={personalDetails.firstName}
                    onChange={(e) => updatePersonalDetails("firstName", e.target.value)}
                    className="w-1/2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={personalDetails.lastName}
                    onChange={(e) => updatePersonalDetails("lastName", e.target.value)}
                    className="w-1/2 p-2 border rounded"
                />
            </div>
            <input
                type="email"
                placeholder="Email"
                value={personalDetails.email}
                onChange={(e) => updatePersonalDetails("email", e.target.value)}
                className="w-full p-2 border rounded mt-2"
            />
        </div>
    );
}
