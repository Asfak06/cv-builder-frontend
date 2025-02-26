import "cropperjs/dist/cropper.css";
import { useRef } from "react";
import Cropper from "react-cropper";

const ImageCropper = ({ imageSrc, onCropComplete, onClose = () => { } }) => {
  const cropperRef = useRef(null);

  const getCroppedImage = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      if (!canvas) {
        alert("Cropping failed. Try again.");
        return;
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          alert("Error processing cropped image.");
          return;
        }

        onCropComplete(blob);
        onClose(); // Close modal after cropping
      }, "image/png");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Crop Your Image</h2>
        <Cropper
          ref={cropperRef}
          src={imageSrc}
          style={{ height: 300, width: "100%" }}
          aspectRatio={1}
          guides={false}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose} className="px-4 py-2 bg-[#CE367F] text-white rounded">Cancel</button>
          <button onClick={getCroppedImage} className="px-4 py-2 bg-[#CE367F] text-white rounded">Crop</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
