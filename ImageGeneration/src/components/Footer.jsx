import React from "react";

const Footer = () => {
  const handleDelToken = () => {
    localStorage.removeItem("authToken");
  };

  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Social Links and Quick Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-4">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition duration-300"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-300"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition duration-300"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition duration-300"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>

          {/* Quick Links */}
          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-6">
              <a
                href="/"
                className="hover:text-gray-300 transition duration-300"
              >
                Home
              </a>
              <a
                href="/pricing"
                className="hover:text-gray-300 transition duration-300"
              >
                Pricing
              </a>
              {localStorage.getItem("authToken") ? (
                <a
                  href="/login"
                  className="hover:text-gray-300 transition duration-300"
                  onClick={handleDelToken}
                >
                  Logout
                </a>
              ) : (
                <>
                  <a
                    href="/login"
                    className="hover:text-gray-300 transition duration-300"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="hover:text-gray-300 transition duration-300"
                  >
                    Signup
                  </a>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Visual Image Generator. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
