import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(acceptedFiles);
    
    // console.log(file);
    
    // console.log();
    
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video
      ? { "video/mp4": [".mp4", ".mov", ".avi"] }
      : { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    onDrop,
    noClick: true, // disables Dropzone's default click handling
  });
  // console.log(getInputProps());
  // console.log(getRootProps());
  // console.log(isDragActive);
  
  
  // console.log(inputRef);
  

  useEffect(() => {
    register(name, { required: true });
  }, [name, register]);

  useEffect(() => {
    if (selectedFile !== null) {
      setValue(name, selectedFile);
    }
  }, [name, selectedFile, setValue]);

  const handleClick = () => {
    console.log("handle click ");
    
    if (!viewData && inputRef.current) {
      console.log("handle click handle ");
      inputRef.current.click();
    }
  };
// console.log(viewData);
// console.log(editData);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xl text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
        {...getRootProps()}
        onClick={handleClick} // manually trigger file picker
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          style={{ display: "none" }} // hidden input
        />
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering Dropzone
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop a {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
