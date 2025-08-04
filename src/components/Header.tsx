"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navItems = [
  // { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Corporate Services", href: "/corporate-services" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation Bar - fixed at top */}
      <nav className="w-full fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-[#fff] ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo and Company Name/Tagline on the left */}
          <Link href="/" className="flex items-center space-x-3 min-w-[220px]">
            <Image
              src="/logo-new.png"
              alt="Infinite Change"
              width={100}
              height={100}
              className="object-contain"
              priority
            />
            <div className="hidden sm:block">
              <h1 className="text-[10px] lg:text-sm font-bold font-avenir-regular text-[#273548] leading-tight">
                INFINITE CHANGE
              </h1>
              <p className="text-[8px] lg:text-xs mr-2 md:mr-0 uppercase tracking-wider font-avenir-light text-[#273548]">
                COACHING • TRAINING • DEVELOPMENT
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex  items-center justify-center space-x-8 xl:-ml-24">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors  text-[#273548] hover:text-[#DC842E] focus:text-[#DC842E] font-avenir-regular text-xs sm:text-[8px] md:text-[12px] lg:text-base text-center"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Get Started Button - right */}
          <div className="hidden md:flex min-w-[150px] justify-end mr-4 ">
            <Button asChild className="font-avenir-regular w-full">
              <Link className="no-underline bg-mantis" href="/contact">
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-[#273548] cursor-pointer" />
            ) : (
              <Menu className="h-6 w-6 text-[#273548] cursor-pointer" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-b border-gray-200">
            <div className="flex flex-col items-center py-4">
              <Image
                src="/logo-new.png"
                alt="Infinite Change"
                width={40}
                height={40}
                className="object-contain mb-2"
                priority
              />
              <div className="text-center">
                <h1 className="text-base font-bold font-avenir-regular text-[#273548] leading-tight">
                  INFINITE CHANGE
                </h1>
                <p className="text-xs uppercase tracking-wider font-avenir-light text-[#273548]">
                  COACHING • TRAINING • DEVELOPMENT
                </p>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-[#273548] hover:text-[#DC842E] font-avenir-regular text-base font-medium text-center no-underline"
                  style={{ textDecoration: "none" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                className="w-full bg-mantis font-avenir-regular"
                style={{ textDecoration: "none" }}
              >
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20" />
    </>
  );
};

export default Header;
