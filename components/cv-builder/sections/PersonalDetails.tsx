import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import ImageCropper from "../../ImageCropper";





export default function PersonalDetails() {
    const { personalDetails, updatePersonalDetails, currentCV, updateProfileImage } = useCVStore();
    const [uploading, setUploading] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropper, setShowCropper] = useState(false);
    // Auto-fill personal details when currentCV changes
    useEffect(() => {
        if (currentCV) {
            Object.entries(currentCV.personalDetails || {}).forEach(([key, value]) => {
                updatePersonalDetails(key, value);
            });
        }
    }, [currentCV, updatePersonalDetails]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setShowCropper(true);
        };
    };

    const handleCropComplete = (croppedBlob: Blob) => {
        if (!croppedBlob) return;

        const reader = new FileReader();
        reader.readAsDataURL(croppedBlob);
        reader.onloadend = () => {
            const croppedDataUrl = reader.result as string;
            setCroppedImage(croppedDataUrl);
            updateProfileImage(croppedDataUrl); // ✅ TypeScript issue fixed
        };

        setShowCropper(false);
    };


    return (



        <div className="p-[30px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Personal Details</h3>
            <div className="flex gap-4 mt-2 mb-[20px]">
                <div className="w-[50%] relative mb-[1px]">
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

                    {croppedImage && (
                        <img
                            src={croppedImage || personalDetails.profileImage || "https://placehold.co/500"}
                            alt="Profile"
                            className="w-14 h-14 rounded-full border-4 border-white"
                        />
                    )}
                    {showCropper && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="p-6 rounded-lg shadow-lg w-96">
                                {/* <h2 className="text-lg font-semibold mb-4">Crop Your Image</h2> */}
                                <ImageCropper
                                    imageSrc={imageSrc}
                                    onCropComplete={handleCropComplete}
                                    onClose={() => setShowCropper(false)}
                                />
                            </div>
                        </div>
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
