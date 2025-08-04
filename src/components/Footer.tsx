import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

import Image from "next/image";
import NewsLetter from "./NewsLetter";

const Footer = () => {
  return (
    <footer className="bg-ghost-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-new.png"
                alt="Infinite Change"
                className="h-35 w-35 object-contain"
                width={600}
                height={600}
              />
              <div>
                <h3 className="text-lg font-bold">INFINITE CHANGE</h3>
                <p className="text-xs uppercase tracking-wider opacity-80">
                  Change to Elevate
                </p>
              </div>
            </div>
            <p className="text-md opacity-80">
              Empowering individuals and organizations through coaching,
              training, and development programs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm  hover:text-[#DC842E] transition-colors no-underline"
                  style={{ textDecoration: "none" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate-services"
                  className="text-sm hover:text-[#DC842E] transition-colors no-underline"
                  style={{ textDecoration: "none" }}
                >
                  Corporate Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm ] hover:text-[#DC842E] transition-colors no-underline"
                  style={{ textDecoration: "none" }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm  hover:text-[#DC842E] transition-colors no-underline"
                  style={{ textDecoration: "none" }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm opacity-80">
                  info@infinitechange.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm opacity-80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm opacity-80">New York, NY</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <NewsLetter />
        </div>

        <div className="border-t border-background/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex space-x-6 text-sm opacity-80">
              <Link
                href="/terms"
                className="hover:opacity-100 transition-opacity"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy"
                className="hover:opacity-100 transition-opacity"
              >
                Privacy Policy
              </Link>
              <Link
                href="/disclaimer"
                className="hover:opacity-100 transition-opacity"
              >
                Disclaimer
              </Link>
            </div>
            <div className="text-sm opacity-80">
              © 2025 Infinite Change. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
