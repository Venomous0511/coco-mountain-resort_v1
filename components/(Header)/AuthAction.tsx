"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut, signIn } from "next-auth/react";
import { Session } from "next-auth";
import { LogIn, NotebookPen, LogOut, Mic } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function AuthActions({ session }: { session: Session | null }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignIn = () => {
    toast.info("Redirecting to login...");
    localStorage.setItem("login", "true");
    localStorage.setItem("provider", "google");
    // router.push("/login");
    signIn("google");
  };

  const handleSignOut = async () => {
    localStorage.setItem("logout", "true");
    localStorage.setItem("provider", "google");
    await signOut({ callbackUrl: "/" });
  };

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) ?? "";

  const handleVoiceSearch = () => {
    try {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        alert(`You said: ${transcript}`);
      };
      recognition.start();
    } catch (error) {
      alert("Voice search is not supported in this browser.");
    }
  };

  return (
    <>
      {session?.user ? (
        <>
          {/* Voice Search */}
          <Button
            type="button"
            aria-label="Voice Search"
            className="p-2 rounded-full hover:bg-primary/70 transition-colors duration-200"
            onClick={handleVoiceSearch}
          >
            <Mic size={18} />
          </Button>

          {/* Book Now Buttons */}
          <Link
            href="/booking"
            className="hidden lg:flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/70"
          >
            Book Now
          </Link>
          <Link
            href="/booking"
            className="lg:hidden flex items-center justify-center rounded-full bg-primary p-2 text-white transition hover:bg-primary/70"
            aria-label="Book Now"
          >
            <NotebookPen size={16} />
          </Link>

          {/* Avatar + Dropdown */}
          <div className="relative">
            <Button
              className="focus:outline-none bg-transparent shadow-none hover:bg-transparent flex items-center justify-center p-0"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Avatar className="cursor-pointer">
                {session.user.image ? (
                  <Image
                    src={session.user.image ?? undefined}
                    alt={session.user.name ?? "User Avatar"}
                    width={40}
                    height={40}
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>
            </Button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-background border border-muted rounded-md shadow-lg z-50 p-2 animate-in fade-in zoom-in">
                <Button
                  onClick={handleSignOut}
                  className="text-sm text-destructive hover:text-destructive/70 w-full justify-start"
                  variant="ghost"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <Button
          onClick={handleSignIn}
          className="text-sm font-semibold text-foreground bg-transparent hover:bg-transparent hover:underline flex items-center cursor-pointer"
        >
          <span className="hidden lg:inline">Login</span>
          <span className="lg:hidden">
            <LogIn size={20} />
          </span>
        </Button>
      )}
    </>
  );
}
