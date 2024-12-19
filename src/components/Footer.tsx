import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const iconClass = "h-5 w-5 transition-all duration-300 group-hover:text-pink-500";
  const linkClass = "group flex items-center gap-2 text-gray-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-300";

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            >
              SY Jewelry Display
            </Link>
            <p className="text-gray-500 mt-2">
              Discover our exquisite collection of handcrafted jewelry, where elegance meets artistry.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className={linkClass}>
                <Facebook className={iconClass} />
              </a>
              <a href="#" className={linkClass}>
                <Twitter className={iconClass} />
              </a>
              <a href="#" className={linkClass}>
                <Instagram className={iconClass} />
              </a>
              <a href="#" className={linkClass}>
                <Mail className={iconClass} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/" className={linkClass}>Home</Link>
              <Link to="/categorization" className={linkClass}>Categorization</Link>
              <Link to="/about" className={linkClass}>About Us</Link>
              <Link to="/cart" className={linkClass}>Shopping Cart</Link>
              <Link to="/login" className={linkClass}>Login</Link>
              <a href="#" className={linkClass}>Contact</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
            <div className="space-y-3">
              <a href="#" className={linkClass}>
                <MapPin className={iconClass} />
                <span>123 Jewelry Street, NY 10001</span>
              </a>
              <a href="tel:+15551234567" className={linkClass}>
                <Phone className={iconClass} />
                <span>(555) 123-4567</span>
              </a>
              <div className={linkClass}>
                <Clock className={iconClass} />
                <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} SY Jewelry Display. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-blue-500">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 