import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
              The Pink Blueberry
            </h3>
            <p className="text-slate-400 text-sm">
              Where luxury meets natural beauty. Experience premium hair
              services in a relaxing atmosphere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/book"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Shop Products
                </Link>
              </li>
              <li>
                <Link
                  to="/stylists"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Meet Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📍 123 Beauty Lane, Luxury Ave</li>
              <li>📞 (555) 123-4567</li>
              <li>✉️ hello@pinkblueberry.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Monday - Friday: 9am - 7pm</li>
              <li>Saturday: 9am - 6pm</li>
              <li>Sunday: 10am - 5pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>&copy; 2024 The Pink Blueberry Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
