"use client";
import { templates } from "@/lib/data";
import { useCVStore } from "@/store/cvStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyCVPage() {
    const router = useRouter();
    const { userCVs, fetchUserCVs, updateTemplate, updateIndustry } = useCVStore();

    // Fake user ID (Replace with actual logged-in user ID)
    const userId = "12345678-abcd-efgh-ijkl-901234567890";

    // Fetch user CVs on mount
    useEffect(() => {
        fetchUserCVs(userId);
    }, [fetchUserCVs, userId]);

    return (
        <div className="px-6 py-10 bg-gray-100 h-screen">
            <button
                onClick={() => router.push(`/`)}
                className="px-4 py-2 mb-4 bg-pink-600 text-white font-bold rounded-lg"
            >
                Go back
            </button>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">MY CVs</h1>

            {/* CVs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {userCVs.length > 0 ? (
                    userCVs.map((cv) => (
                        <div key={cv._id} className="relative group cursor-pointer border rounded-lg p-4 shadow-md bg-white">
                            <p className="text-lg font-semibold text-gray-600">{cv.personalDetails.firstName} {cv.personalDetails.lastName}</p>
                            <p className="text-sm text-gray-500 mb-4">Last Updated: {new Date(cv.updatedAt).toLocaleString()}</p>
                            <img src={templates.find((item) => item.id === cv.templateId)?.img} alt={cv.templateId} className="rounded-lg shadow-md w-full h-[350px] object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50  flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
                                <button
                                    onClick={() => {
                                        updateTemplate(cv.templateId)
                                        updateIndustry(cv.selectedIndustry)
                                        router.push(`/cv-builder?cvId=${cv._id}`)
                                    }}
                                    className="px-4 py-2 bg-pink-600 text-white font-bold rounded-lg"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>

                    ))
                ) : (
                    <p className="text-gray-500 col-span-full">No saved CVs yet.</p>
                )}
            </div>
        </div>
    );
}
