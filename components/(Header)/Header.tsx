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
    <header>
      {/* Announcement */}
      <div
        className={`transform transition-transform duration-200 bg-primary px-4 py-2 text-primary-foreground text-center ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <p className="text-[.5rem] sm:text-sm font-medium">
          Love luxurious resorts?{" "}
          <Link href="/offers" className="underline">
            Discover our exclusive resort packages!
          </Link>
        </p>
      </div>
      {/* Navbar wrapper */}
      <div
        className={`transform transition-transform duration-200 h-14 w-full bg-gradient-to-r pb-[0.1rem] ${
          isScrolled
            ? "bg-transparent -translate-y-[60%] sm:-translate-y-[70%]"
            : "from-transparent via-green-500 to-transparent translate-y-0"
        }`}
      >
        <div
          className={`h-full flex items-center justify-between bg-background text-foreground px-2 lg:px-6 py-2 shadow-md ${
            isScrolled
              ? "backdrop-blur-sm bg-transparent"
              : "bg-background dark:bg-background"
          }`}
        >
          {children}
        </div>
      </div>
    </header>
  );
}
