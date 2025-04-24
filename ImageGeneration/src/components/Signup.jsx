import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Clear previous error or success message
    setError("");
    setSuccessMessage("");

    // Form validation
    if (!fullName || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Prepare the request data
    const signupData = {
      full_name: fullName,
      email: email,
      password: password,
    };

    try {
      // Send the signup data to the backend using axios
      const response = await axios.post("http://localhost:5000/signup", signupData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // On successful signup
      console.log("Signup Successful:", response.data);
      setSuccessMessage("Signup successful! Redirecting to login page...");
      // Redirect to login page after successful signup
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login page after successful signup
      }, 2000);
    } catch (error) {
      // Handle error response
      console.error("Signup error:", error);
      if (error.response) {
        // If the backend returns an error response
        setError(error.response.data.error || "An error occurred. Please try again.");
      } else {
        // If no response (network error, etc.)
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "linear-gradient(60deg, #008EA4, black)",
      }}
    >
      <div className="w-full xl:max-w-[400px] max-w-[400px] bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-4">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
          >
            Sign Up
          </button>
        </form>
        {error && <p className="text-sm text-red-600 text-center mt-4">{error}</p>}
        {successMessage && <p className="text-sm text-green-600 text-center mt-4">{successMessage}</p>}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
