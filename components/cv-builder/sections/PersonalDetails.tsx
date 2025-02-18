import { useCVStore } from "@/store/cvStore";
import { useEffect } from "react";

export default function PersonalDetails() {
    const { personalDetails, updatePersonalDetails, currentCV } = useCVStore();

    // Auto-fill personal details when currentCV changes
    useEffect(() => {
        if (currentCV) {
            Object.entries(currentCV.personalDetails || {}).forEach(([key, value]) => {
                updatePersonalDetails(key, value as string);
            });
        }
    }, [currentCV, updatePersonalDetails]);

    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold">Personal Details</h3>
            <div className="relative">
                <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Job Title</label>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={personalDetails.jobTitle}
                    onChange={(e) => updatePersonalDetails("jobTitle", e.target.value)}
                    className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border rounded-lg mt-2"
                />
            </div>
            <div className="flex gap-4 mt-2">
                <div className="w-[50%]">
                    <input
                        type="text"
                        placeholder="First Name"
                        value={personalDetails.firstName}
                        onChange={(e) => updatePersonalDetails("firstName", e.target.value)}
                        className="w-1/2 p-2 border rounded"
                    />
                </div>
                <div className=""></div>
                <input
                    type="text"
                    placeholder="Last Name"
                    value={personalDetails.lastName}
                    onChange={(e) => updatePersonalDetails("lastName", e.target.value)}
                    className="w-1/2 p-2 border rounded"
                />
            </div>
            <div className="flex gap-4 mt-2">
                <input
                    type="email"
                    placeholder="Email"
                    value={personalDetails.email}
                    onChange={(e) => updatePersonalDetails("email", e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={personalDetails.phone}
                    onChange={(e) => updatePersonalDetails("phone", e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                />
            </div>
            <div className="flex gap-4 mt-2">
                <input
                    type="text"
                    placeholder="City"
                    value={personalDetails.city}
                    onChange={(e) => updatePersonalDetails("city", e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={personalDetails.country}
                    onChange={(e) => updatePersonalDetails("country", e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                />
            </div>
        </div>
    );
}
