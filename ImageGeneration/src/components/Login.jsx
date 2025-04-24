import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Clear previous error or success message
    setError("");
    setSuccessMessage("");

    // Form validation
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      // Send the login data to the backend using axios
      const response = await axios.post("http://localhost:5000/login", { email, password }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // On successful login
      console.log("Login Successful:", response.data);
      // Store token in localStorage or handle login state
      localStorage.setItem("authToken", response.data.token); // Example: Store token in localStorage

      // Display success message
      setSuccessMessage("Login successful! Redirecting...");

      // Redirect to home page after successful login
      setTimeout(() => {
        window.location.href = "/imagegeneration"; // You can change this to the home page or dashboard
      }, 2000);
    } catch (error) {
      // Handle error response
      console.error("Login error:", error);
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
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700"
          >
            Login
          </button>
        </form>
        {error && <p className="text-sm text-red-600 text-center mt-4">{error}</p>}
        {successMessage && <p className="text-sm text-green-600 text-center mt-4">{successMessage}</p>}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-teal-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login; 