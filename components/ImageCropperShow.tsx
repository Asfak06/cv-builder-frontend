import { useState } from "react";
// import ImageCropper from "../components/ImageCropper";
import ImageCropper from "./ImageCropper.tsx";


export default function ImageCropperShow() {
    const [selectedImage, setSelectedImage] = useState(null);

    const onImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Next.js Image Crop</h1>

            <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />

            {selectedImage && (
                <div className="mt-4 w-full max-w-lg">
                    <ImageCropper imageSrc={selectedImage} onCropComplete={(cropped) => console.log(cropped)} />
                </div>
            )}
        </div>
    );
}
