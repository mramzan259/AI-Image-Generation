import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";
import { HiDownload } from "react-icons/hi";
import axios from "axios"; // Import axios
import { saveAs } from "file-saver"; // Add the 'file-saver' package for ease of downloads.

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]); // Store generated images
  const [selectedImage, setSelectedImage] = useState(null); // For modal

  const handleDownload = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl); // Fetch the image as a blob
      const blob = await response.blob(); // Convert the response to a blob
      saveAs(blob, fileName); // Use file-saver to trigger download
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  // Handle input change
  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  // Handle image generation
  const handleGenerateImage = async () => {
    if (!prompt) {
      setError("Prompt cannot be empty.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      // Make a POST request to your Python backend
      const response = await axios.post(
        "http://localhost:5000/generate-image",
        {
          prompt, // Send the prompt to the backend
        }
      );

      console.log(response.data.image_urls);

      // Update the generated images state with the received array
      if (response.data.image_urls && response.data.image_urls.length > 0) {
        setGeneratedImages(response.data.image_urls);
        console.log(generatedImages);
      } else {
        setError(
          "No images generated. Please try again with a different prompt."
        );
      }
    } catch (err) {
      console.error("Error generating images:", err);
      setError("Failed to generate images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Open modal
  const openModal = (image) => {
    setSelectedImage(image);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div
      className="min-h-screen text-white mt-0 overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(60deg, #008EA4, black)",
      }}
    >
      {/* Hero Section */}
      <div className="max-w-[1050px] mx-auto mt-32 flex flex-col lg:flex-row lg:items-start justify-between p-6 space-y-8 lg:space-y-0">
        {/* Left Side: Textarea and Button */}
        <div className="flex flex-col items-center lg:items-start space-y-4 lg:basis-[50%]">
          <h1 className="xl:text-4xl sm:text-3xl text-2xl font-bold">
            AI Image Generation
          </h1>
          <textarea
            value={prompt}
            onChange={handleInputChange}
            placeholder="Enter prompt here..."
            className="xl:w-[500px] sm:w-[400px] w-[300px] p-3 rounded-md text-black outline-none xl:h-32 sm:h-24 h-20 resize-none"
          />
          {error && (
            <p className="text-[#f81d28] font-sans font-bold text-lg">
              {error}
            </p>
          )}
          <button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="bg-white hover:bg-[#0c3d44] hover:text-white text-[#30737e] text-[17px] font-bold py-2 px-6 rounded-md transition-all duration-500 disabled:opacity-50"
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Right Side: Generated Images */}
        <div className="lg:basis-[50%] w-full">
          <h3 className="text-xl font-semibold mb-4 w-full text-center">
            Generated Images
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {generatedImages.length > 0 ? (
              generatedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden shadow-lg group"
                >
                  {/* Image */}
                  <img
                    src={image}
                    alt={`Generated Image ${index + 1}`}
                    className="w-[180px] h-[180px] object-cover rounded-lg"
                    onClick={() => openModal(image)}
                  />
                  {/* Hover Button */}
                  <button
                    onClick={() =>
                      handleDownload(image, `Generated_Image_${index + 1}.png`)
                    }
                    className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    title="Download Image"
                  >
                    <HiDownload className="text-[20px]" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-300 font-medium text-md">
                Generated images will be shown here.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Full-Size Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Full-Size Preview"
              className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 bg-white text-black p-2 rounded-full"
            >
              <RxCross2 className="text-3xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGeneration;
