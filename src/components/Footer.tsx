import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Footer = () => {
  return (
    <footer
      className=""
      style={{ background: '#73ABB9', color: '#FFFFCC' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo-new.png"
                alt="Infinite Change"
                className="h-10 w-10 object-contain"
                width={100}
                height={100}
              />
              <div>
                <h3 className="text-lg font-bold">INFINITE CHANGE</h3>
                <p className="text-xs uppercase tracking-wider opacity-80">
                  Change to Elevate
                </p>
              </div>
            </div>
            <p className="text-sm opacity-80">
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
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/corporate-services"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Corporate Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
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
          <div className="space-y-4" style={{ background: 'transparent', color: '#FFFFCC' }}>
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm opacity-80">
              Subscribe to get updates on our latest programs and insights.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button className="w-full bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
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
              © 2024 Infinite Change. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
