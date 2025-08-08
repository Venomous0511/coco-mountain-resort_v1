"use client";

import { useEffect, useState } from "react";

import { Button } from "./ui/button";

import { ArrowUpCircle } from "lucide-react";

export default function ScrollUp() {
  const scrollHeight = 100;
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY >= scrollHeight) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div>
        {showScrollUp && (
          <Button
            className="fixed bottom-22 right-5 cursor-pointer rounded-full size-8"
            onClick={scrollToTop}
          >
            <ArrowUpCircle className="size-8" />
          </Button>
        )}
      </div>
    </>
  );
}
