"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function header({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="top-0 z-50 w-full sticky mx-auto">
      {/* Navbar wrapper */}
      <div
        className={`transform transition-transform duration-200 h-14 w-full bg-gradient-to-r pb-[0.1rem] ${
          isScrolled
            ? "bg-transparent"
            : "from-transparent via-green-500 to-transparent translate-y-0"
        }`}
      >
        <div
          className={`h-full flex items-center justify-between bg-background text-foreground px-2 lg:px-6 py-2 shadow-md ${
            isScrolled ? "backdrop-blur-sm bg-transparent" : "bg-background"
          }`}
        >
          {children}
        </div>
      </div>
    </header>
  );
}
