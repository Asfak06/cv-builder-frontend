import axiosInstance from "@/lib/axiosInstance";
import { useCVStore } from "@/store/cvStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ImageCropper from "../../ImageCropper";
import { useUserStore } from "@/store/userStore";




export default function PersonalDetails() {
    const { personalDetails, updatePersonalDetails, currentCV, updateProfileImage, saveCVData } = useCVStore();
    const { userData } = useUserStore();
    const [uploading, setUploading] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
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

    const handleCropComplete = async (croppedBlob: Blob) => {
        if (!croppedBlob) return;

        const formData = new FormData();
        // Give the blob a proper filename with extension
        const fileName = `profile-image-${Date.now()}.png`;
        formData.append("profileImage", croppedBlob, fileName);
        
        try {
            setUploading(true);
            const response = await axiosInstance.post("/api/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                updateProfileImage(response.data.imageUrl);
                toast.success("Profile image uploaded successfully!");

                setTimeout(() => {
                     saveCVData(userData.id)
                }, 1000);
            } else {
                toast.error("Failed to upload image. Please try again.");
            }
        } catch (error) {
            console.error("Image Upload Error:", error);
            toast.error("Error uploading image.");
        } finally {
            setUploading(false);
        }
        setShowCropper(false);
    };


    return (



        <div className="lg:p-[30px] lg:pt-[20px] lg:pb-[5px] p-[15px] border rounded-lg bg-[#fff]">
            <h3 className="text-lg text-[#CE367F] font-semibold">Personal Details</h3>
            <div className="lg:flex gap-4 mt-2 mb-[20px]">
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full relative mb-[1px]">
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
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full cursor-pointer lg:mt-0 mt-5 flex items-center space-x-4">
                    <img
                        src={personalDetails.profileImage ? `${process.env.NEXT_PUBLIC_API_RESOURCE}${personalDetails.profileImage}` : "/profile-vector.png"}
                        alt="Profile"
                        className="w-[60px] h-[60px] rounded-sm border-2 border-white"
                    />
                    {/* <label className="relative cursor-pointer text-[#474747] text-[16px] font-normal transition">
                        {uploading ? "Uploading..." : "Upload Photo"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0"
                        />
                        <span className="block text-[12px] text-[#ABAFB1] cursor-pointernp">(Max 500 kb)</span>
                    </label> */}
                    <label className="relative cursor-pointer text-[#474747] text-[16px] font-normal transition inline-block overflow-hidden">
                        {uploading ? "Uploading..." : "Upload Photo"}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-0 h-full opacity-0 cursor-pointer"
                        />
                        <span className="block text-[12px] text-[#ABAFB1] cursor-pointer">(Max 500 kb)</span>
                    </label>

                    {showCropper && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="p-6 rounded-lg cusor shadow-lg w-96 cursor-pointer">
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
            <div className="lg:flex gap-4 mt-2 mb-[20px]">
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">First Name</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={personalDetails.firstName}
                        onChange={(e) => updatePersonalDetails("firstName", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full lg:mt-0 mt-5 relative">
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
            <div className="lg:flex gap-4 mt-2 mb-[20px]">
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={personalDetails.email}
                        onChange={(e) => updatePersonalDetails("email", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full lg:mt-0 mt-5 relative">
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
            <div className="lg:flex gap-4 mt-2 mb-[20px]">
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full relative">
                    <label className="text-[12px] text-[#5E6366] absolute top-[18px] left-[16px]">City</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={personalDetails.city}
                        onChange={(e) => updatePersonalDetails("city", e.target.value)}
                        className="w-full h-[58px] p-[15px] pt-[30px] text-[16px] border border-[#CFD3D4] rounded-lg mt-2"
                    />
                </div>
                <div className="lg:w-[50%] md:w-[50%] sm:w-[50%] w-full lg:mt-0 mt-5 relative">
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
