import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";


const inputclass =
  "bg-gray-600 h-10 w-2xs flex mt-1.5 text-center rounded-2xl";

const text_Area =
  "bg-gray-600 flex mt-1.5  w-2xs rounded-2xl  p-3 resize-none block";

const ThumbnailName = () => {
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);


  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    setPreview: (preview: string | null) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFile(file); // Store the actual file for backend
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;
      }
    }
  };


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = (
    setPreview: (preview: string | null) => void,
    inputRef: React.RefObject<HTMLInputElement | null>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    setPreview(null);
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

// form data to json 

  const [formData, setFormData] = useState({
    Category:"",
    title: "",
    description: "",
    ratio:"",
    ImageStyle:"",
  });


    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [refImage, setRefImage] = useState<File | null>(null);


  // Handler for text inputs (Category, title, description, ratio)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for file inputs
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPreview: (preview: string | null) => void,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file); // Store the actual file for backend

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.Category || !formData.title || !formData.description || !formData.ratio) {
      alert("Please fill all required fields");
      return;
    }

    if (!thumbnailImage) {
      alert("Please upload a thumbnail image");
      return;
    }

    try {
      const data = new FormData();

      // text fields
      data.append("Category", formData.Category);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("ratio", formData.ratio);

      // images (Multer will read these)
      if (thumbnailImage) data.append("thumbnail", thumbnailImage);
      if (refImage) data.append("reference", refImage);

      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        body: data, // Don't set Content-Type header, browser will set it with boundary
      });

      if (!res.ok) {
        let errorMessage = "Unknown error";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || `Error: ${res.status} ${res.statusText}`;
        } catch {
          errorMessage = `Error: ${res.status} ${res.statusText}`;
        }
        alert(errorMessage);
        return;
      }

      const result = await res.json();
      console.log("Backend response:", result);

      // Clear form after successful submission
      setFormData({
        Category: "",
        title: "",
        description: "",
        ratio: "",
        ImageStyle: "",
      });

      setThumbnailImage(null);
      setRefImage(null);
      setPreview1(null);
      setPreview2(null);

      if (fileInputRef1.current) fileInputRef1.current.value = "";
      if (fileInputRef2.current) fileInputRef2.current.value = "";
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit form. Please try again.");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col gap-5">
          <label>
            Purpose to make :
            <select name="Category" value={formData.Category} onChange={handleChange}  className={inputclass}>
              <option value="">select Option</option>
              <option value="education">Education</option>
              <option value="gameing">Gameing</option>
              <option value="vloging">vloging</option>
              <option value="motivation">Motivation</option>
            </select>
          </label>

          <label>Title</label>
          <textarea
            name="title"
            value={formData.title}
            className={text_Area}
            rows={4}
            cols={40}
            required
            onChange={handleChange} 
          />

          <label> Descraption</label>
          <textarea
            name="description"
            value={formData.description}
            className={text_Area}
            rows={4}
            cols={40}
            required
            onChange={handleChange} 
          />

          select the Ratio :
          <select name="ratio" value={formData.ratio} onChange={handleChange}  className={inputclass}>
            <option value="">select Option</option>
            <option value="16:9">Youtube</option>
            <option value="9:16">YoutubeSorts</option>
          </select>
        </div>

        <div className="mt-2 flex flex-col gap-4">
          {/* First Image Upload */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Image of Thumbnail<span className="text-red-500">*</span>
            </label>
            <div
              className={`
                relative w-2xs h-60 rounded-2xl border-2 border-dashed transition-all duration-300
                ${
                  preview1
                    ? "border-gray-500 bg-gray-700"
                    : "border-gray-600 bg-gray-600 hover:border-gray-500 hover:bg-gray-650"
                }
                flex flex-col items-center justify-center cursor-pointer overflow-hidden group
              `}
              onDrop={(e) => handleDrop(e, setPreview1, fileInputRef1)}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef1.current?.click()}
            >
              {preview1 ? (
                <>
                  <img
                    src={preview1}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(setPreview1, fileInputRef1, setThumbnailImage);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="bg-gray-700 p-4 rounded-full group-hover:bg-gray-600 transition-colors">
                      <Upload className="text-gray-300" size={32} />
                    </div>
                    <div className="text-center px-4">
                      <p className="text-sm text-gray-300 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </>
              )}
              <input
                ref={fileInputRef1}
                type="file"
                id="file-input-1"
                name="ImageStyle"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setPreview1, setThumbnailImage )}
              />
            </div>
          </div>

          {/* Second Image Upload */}
          <div className="relative">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Ref Image <span className="text-red-500">*</span>
            </label>
            <div
              className={`
                relative w-2xs h-60 rounded-2xl border-2 border-dashed transition-all duration-300
                ${
                  preview2
                    ? "border-gray-500 bg-gray-700"
                    : "border-gray-600 bg-gray-600 hover:border-gray-500 hover:bg-gray-650"
                }
                flex flex-col items-center justify-center cursor-pointer overflow-hidden group
              `}
              onDrop={(e) => handleDrop(e, setPreview2, fileInputRef2, setRefImage)}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef2.current?.click()}
            >
              {preview2 ? (
                <>
                  <img
                    src={preview2}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(setPreview2, fileInputRef2, setRefImage);
                    }}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="bg-gray-700 p-4 rounded-full group-hover:bg-gray-600 transition-colors">
                      <ImageIcon className="text-gray-300" size={32} />
                    </div>
                    <div className="text-center px-4">
                      <p className="text-sm text-gray-300 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </>
              )}
              <input
                ref={fileInputRef2}
                type="file"
                id="file-input-2"
                name="ImageStyle"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setPreview2,setRefImage)}
              />
            </div>
          </div>
        </div>
      </div>


      {/* submit div */}
      <div className="flex justify-center items-center mt-8 gap-6">
         <button 
            type="button"
            className="mt-2 text-xl font-semibold w-2xs bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-6 transition-all duration-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border border-gray-600 hover:border-gray-500"
         >
            Enhance 
          </button>
         <button 
            type="submit"
            className="mt-2 text-xl font-semibold w-xs bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-4 px-8 transition-all duration-300 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border border-blue-500 hover:border-blue-400"
         >
            Submit
          </button>
      </div>
    </form>
  );
};

export default ThumbnailName;
