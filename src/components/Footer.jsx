import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-950 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center border-b border-gray-700 pb-6">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <a href="/" className="text-2xl font-bold text-pink-500">
              AnimeAdda
            </a>
            <p className="text-gray-400 mt-2 text-sm">
              Your ultimate destination for anime news, reviews, and episodes.
              Join our community to celebrate the world of anime.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-pink-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-pink-500">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/anime-list" className="text-gray-400 hover:text-pink-500">
                  Anime List
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-pink-500">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-500">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <p>&copy; 2025 Anime Adda. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li>
              <a href="/privacy-policy" className="hover:text-pink-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:text-pink-500">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
