import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ThumbnailOutput() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [referenceImageData, setReferenceImageData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Get data from location state if available
    if (location.state) {
      setFormData(location.state.formData);
    }
    
    // Get reference image from sessionStorage (only read once on mount)
    const storedImageData = sessionStorage.getItem("referenceImageData");
    if (storedImageData && !referenceImageData) {
      setReferenceImageData(storedImageData);
      // Clean up sessionStorage after reading (only once)
      sessionStorage.removeItem("referenceImageData");
      sessionStorage.removeItem("referenceImageName");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const generateThumbnail = async () => {
    if (!formData) {
      alert("No form data available. Please fill the form first.");
      navigate("/thumbnail");
      return;
    }

    setLoading(true);

    try {
      const requestData = new FormData();
      
      // Convert field names to match backend expectations (category vs Category)
      requestData.append("category", formData.Category);
      requestData.append("title", formData.title);
      requestData.append("description", formData.description);
      requestData.append("ratio", formData.ratio);

      // Add reference image if available
      if (referenceImageData) {
        try {
          // Convert data URL to File object
          const response = await fetch(referenceImageData);
          const blob = await response.blob();
          // Try to get filename from sessionStorage if still available, otherwise use default
          const storedFileName = sessionStorage.getItem("referenceImageName");
          const fileName = storedFileName || "reference.png";
          const file = new File([blob], fileName, { type: blob.type || "image/png" });
          requestData.append("image", file);
        } catch (err) {
          console.error("Error processing reference image:", err);
          // Continue without reference image if there's an error
        }
      }

      const res = await fetch("https://divya-drishti-ioig.onrender.com/api/generate-thumbnail", {
        method: "POST",
        body: requestData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.imageUrl);
      } else {
        alert(data.message || "Generation failed");
      }
    } catch (err) {
      console.error("Generation error:", err);
      alert(`Server error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate on mount if formData is available
  useEffect(() => {
    if (formData && !imageUrl && !loading) {
      generateThumbnail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Generated Thumbnail</h1>
        
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={generateThumbnail}
            disabled={loading || !formData}
            className={`px-8 py-4 rounded-full font-semibold text-lg transition-all ${
              loading || !formData
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            {loading ? "Generating..." : "Generate Thumbnail"}
          </button>

          {loading && (
            <div className="text-gray-400 mt-4">Creating your thumbnail with AI...</div>
          )}

          {imageUrl && !loading && (
            <div className="mt-8 w-full">
              <img
                src={imageUrl}
                alt="Generated Thumbnail"
                className="w-full max-w-2xl rounded-2xl shadow-2xl border-2 border-gray-600"
              />
              <div className="mt-4 flex gap-4 justify-center">
                <a
                  href={imageUrl}
                  download
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all"
                >
                  Download
                </a>
                <button
                  onClick={() => navigate("/thumbnail")}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-all"
                >
                  Create Another
                </button>
              </div>
            </div>
          )}

          {!formData && (
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">No form data available.</p>
              <button
                onClick={() => navigate("/thumbnail")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
              >
                Go to Form
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
