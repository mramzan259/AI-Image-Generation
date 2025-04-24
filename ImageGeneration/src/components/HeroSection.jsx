import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const images = [
    "/images.jpeg",
    "/images2.jpeg",
    "/images3.jpeg",
    "/images4.jpeg",
    "/images5.jpeg",
    "/images6.jpeg",
  ];

  const handleImageGeneration = (e) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      e.preventDefault(); // Prevent default link navigation
      alert(
        "Before generating an image, you need to login. Redirecting to the login page..."
      );
      navigate("/login");
    } else {
      navigate("/imagegeneration");
    }
  };

  return (
    <>
      <div
        className="min-h-[88vh] text-white mt-0 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(60deg, #008EA4, black)",
        }}
      >
        {/* Hero Section */}
        <div className="xl:max-w-[1050px] lg:max-w-[900px] mx-auto mt-32 flex lg:flex-row flex-col items-center justify-between  ">
          <div className="basis-[50%] lg:text-start text-center ">
            <h1 className="text-3xl sm:text-5xl font-bold mb-3  ">
              Innovative <span className="text-stroke-3">AI Solutions</span>{" "}
            </h1>
            <h2 className="text-2xl sm:text-4xl font-semibold mb-6">
              For Image Creation
            </h2>

            <p className="text-md sm:text-lg max-w-[500px] mb-8 lg:text-justify text-center   leading-6">
              AI-driven image generation transforms text into high-quality
              visuals, empowering creators to easily produce images for
              marketing, art, and branding.
            </p>
            <button
              onClick={handleImageGeneration}
              className="bg-white hover:bg-[#0c3d44] hover:text-white text-[#30737e] text-[17px] font-bold py-2 px-6 rounded-md transition-all duration-500"
            >
              Genereate Image
            </button>
          </div>
          <div className="lg:my-0 my-12">
            <img src="humanimagefinal.png" alt="" className="w-[350px] " />
          </div>
        </div>
      </div>
      <div className="pt-7 pb-10">
        <h2 className="text-center text-2xl font-bold mb-20">Generated Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          {images.map((url, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-all h-auto"
            >
              <img
                src={url}
                alt={`Generated Art ${index + 1}`}
                className="w-full h-auto hover:scale-105 transition-all duration-500 cursor-pointer object-cover "
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
