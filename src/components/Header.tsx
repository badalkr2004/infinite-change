"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Corporate Services", href: "/corporate-services" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="py-5 fixed top-0 left-0 right-0 z-50 border-b border-border" style={{ background: '#273548' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <span style={{
              // display: 'inline-flex',
              // alignItems: 'center',
              // justifyContent: 'center',
              // width: '150px',
              // height: '150px',
              // borderRadius: '50%',
              // background: '#273548',
              // boxShadow: '0 0 32px 8px #FFFFCC',
              // position: 'relative',
            }}>
              <Image
                src="/logo-new.png"
                alt="Infinite Change"
                className="h-36 w-36 object-contain"
                width={144}
                height={144}
                style={{
                  filter: 'drop-shadow(0 0 12px #FFFFCC)'
                }}
              />
            </span>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold font-avenir-regular" style={{ color: '#FFFFCC' }}>
                INFINITE CHANGE
              </h1>
              <p className="text-xs uppercase tracking-wider font-avenir-light" style={{ color: '#FFFFCC' }}>
                COACHING 2 TRAINING 2 DEVELOPMENT
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors font-medium"
                style={{ color: '#FFFFCC', textDecoration: 'none', fontWeight: 'bold' }}
                onMouseOver={e => e.currentTarget.style.color = '#DC842E'}
                onMouseOut={e => e.currentTarget.style.color = '#FFFFCC'}
                onFocus={e => e.currentTarget.style.color = '#DC842E'}
                onBlur={e => e.currentTarget.style.color = '#FFFFCC'}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild variant="accent" className="font-avenir-regular">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button
                  asChild
                  variant="accent"
                  className="w-full font-avenir-regular"
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
