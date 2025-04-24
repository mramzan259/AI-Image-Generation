import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  // State to toggle mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDelToken = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <>
      {/* Navbar */}
      <header className="absolute w-full">
        <div className="xl:max-w-[1050px] lg:max-w-[900px] md:max-w-[700px] max-w-[400px] sm:px-0 px-[20px] mx-auto flex justify-between items-center text-white py-4 font-bold text-[20px]">
          <Link to="/" className="text-xl sm:text-2xl font-bold">
            <span className="text-stroke-3 mr-2 text-4xl sm:text-[40px]">
              Visual
            </span>
            Image Generator
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#6edbec]">
              Home
            </Link>
            <Link to="/pricing" className="hover:text-[#6edbec]">
              Pricing
            </Link>
            {localStorage.getItem("authToken") ? (
              <a
                href="/login"
                className="hover:bg-white hover:text-[#3eddcd] bg-[#3eddcd] py-2 text-[16px] px-5 rounded-md transition-all duration-500"
                onClick={handleDelToken}
              >
                Logout
              </a>
            ) : (
              <>
                <Link to="/signup" className="hover:text-[#6edbec]">
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="hover:bg-white hover:text-[#3eddcd] bg-[#3eddcd] py-2 text-[16px] px-5 rounded-md transition-all duration-500"
                >
                  Login
                </Link>
              </>
            )}
          </nav>
          {/* Hamburger Menu Icon */}
          <div
            className="md:hidden text-2xl cursor-pointer"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <RxCross2 className="text-3xl" /> : "☰"}
          </div>
        </div>

        {/* Mobile Navigation with Transition */}
        <div
          className={`absolute top-0 left-0 w-full bg-black text-white text-center z-50 overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-[300px] py-6" : "max-h-0 py-0"
          }`}
          style={{ top: "70px" }} // Offset from the header
        >
          <nav
            className={`space-y-4 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
          >
            <Link
              to="/"
              className="block hover:text-[#6edbec] text-xl"
              onClick={() => setIsMenuOpen(false)} // Close menu after click
            >
              Home
            </Link>
            <Link
              to="/signup"
              className="block hover:text-[#6edbec] text-xl"
              onClick={() => setIsMenuOpen(false)} // Close menu after click
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="block hover:bg-white hover:text-[#3eddcd] sm:bg-[#3eddcd] py-2 text-xl sm: text-[16px] px-5 rounded-md mx-auto transition-all duration-500"
              onClick={() => setIsMenuOpen(false)} // Close menu after click
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
