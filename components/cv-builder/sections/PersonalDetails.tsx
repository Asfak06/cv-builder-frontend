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
        <div className="p-[30px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Personal Details</h3>
            <div className="relative mb-[20px]">
                <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Job Title</label>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={personalDetails.jobTitle}
                    onChange={(e) => updatePersonalDetails("jobTitle", e.target.value)}
                    className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                />
            </div>
            <div className="flex gap-4 mt-2 mb-[20px]">
                <div className="w-[50%] relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">First Name</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={personalDetails.firstName}
                        onChange={(e) => updatePersonalDetails("firstName", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
                <div className="w-[50%] relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Last Name</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={personalDetails.lastName}
                        onChange={(e) => updatePersonalDetails("lastName", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
            </div>
            <div className="flex gap-4 mt-2 mb-[20px]">
                <div className="w-[50%] relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={personalDetails.email}
                        onChange={(e) => updatePersonalDetails("email", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
                <div className="w-[50%] relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Phone</label>
                    <input
                        type="text"
                        placeholder="Phone"
                        value={personalDetails.phone}
                        onChange={(e) => updatePersonalDetails("phone", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
            </div>
            <div className="flex gap-4 mt-2 mb-[20px]">
                <div className="w-[50%] relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Phone</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={personalDetails.city}
                        onChange={(e) => updatePersonalDetails("city", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
                <div className="w-[50%] relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Country</label>
                    <input
                        type="text"
                        placeholder="Country"
                        value={personalDetails.country}
                        onChange={(e) => updatePersonalDetails("country", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
            </div>
        </div>
    );
}
