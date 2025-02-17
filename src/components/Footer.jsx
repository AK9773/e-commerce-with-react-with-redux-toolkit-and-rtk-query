import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          {/* ShopNow Description */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-4">ShopNow</h4>
            <p className="text-gray-400">
              Your one-stop shop for all your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Info</h4>
            <p className="text-gray-400">Email: support@shopnow.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} ShopNow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
