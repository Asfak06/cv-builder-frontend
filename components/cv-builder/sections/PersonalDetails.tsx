import axiosInstance from "@/lib/axiosInstance";
import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PersonalDetails() {
    const { personalDetails, updatePersonalDetails, currentCV, updateProfileImage } = useCVStore();
    const [uploading, setUploading] = useState(false);
    // Auto-fill personal details when currentCV changes
    useEffect(() => {
        if (currentCV) {
            Object.entries(currentCV.personalDetails || {}).forEach(([key, value]) => {
                updatePersonalDetails(key, value as string);
            });
        }
    }, [currentCV, updatePersonalDetails]);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("profileImage", file);

        try {
            setUploading(true);
            const response = await axiosInstance.post("/api/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                updateProfileImage(response.data.imageUrl);
                toast.success("Profile image uploaded successfully!");
            } else {
                toast.error("Failed to upload image. Please try again.");
            }
        } catch (error) {
            console.error("Image Upload Error:", error);
            toast.error("Error uploading image.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-[30px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Personal Details</h3>
            <div className="flex gap-4 mt-2 mb-[20px]">
                <div className="w-[50%] relative mb-[20px]">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Job Title</label>
                    <input
                        type="text"
                        placeholder="Job Title"
                        value={personalDetails.jobTitle}
                        onChange={(e) => updatePersonalDetails("jobTitle", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
                {/* Profile Image Upload */}
                <div className="w-[50%] flex items-center space-x-4">
                    <label className="relative cursor-pointer bg-[#EFF2F9] h-[58px] text-gray-700 py-[15px] px-4 rounded-lg font-medium hover:bg-gray-300 transition">
                        {uploading ? "Uploading..." : "Upload Image"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </label>

                    {/* Display Uploaded Image */}
                    {personalDetails.profileImage && (
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}`}
                            alt="Profile"
                            className="w-16 h-16 rounded-full border-2 border-gray-400 shadow"
                        />
                    )}
                </div>
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
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">City</label>
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
