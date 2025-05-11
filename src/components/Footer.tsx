
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-6 text-bikeRed">SpeedBikes</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your premier destination for high-performance motorcycles. We offer
              the best superbikes with exceptional service and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-bikeRed transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-bikeRed transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-bikeRed transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  All Bikes
                </Link>
              </li>
              <li>
                <Link
                  to="/deals"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  Special Deals
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-medium mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/track-order"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/warranty"
                  className="text-gray-600 dark:text-gray-400 hover:text-bikeRed transition-colors"
                >
                  Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-bikeRed flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-400">
                  support@speedbikes.com
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-bikeRed flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-400">
                  +91 98765 43210
                </span>
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                #123, MG Road, Bengaluru,
                <br />
                Karnataka, India - 560001
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} SpeedBikes. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-bikeRed transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-bikeRed transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-600 dark:text-gray-400 text-sm hover:text-bikeRed transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
