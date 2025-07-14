"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { LogIn, NotebookPen, LogOut, Mic } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavigationMobile from "./NavigationMobile";
import { ModeToggle } from "./ModeToggle";

export default function AuthActions({ session }: { session: Session | null }) {
  const router = useRouter();

  const handleSignIn = () => {
    toast.info("Redirecting to login...");
    router.push("/login");
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

  return (
    <div className="flex items-center space-x-2 md:space-x-4">
      <ModeToggle />

      {session?.user ? (
        <>
          <Button
            type="button"
            aria-label="Voice Search"
            className="p-2 rounded-full hover:bg-primary/70 transition-colors duration-200 cursor-pointer"
            onClick={() => {
              if (!("webkitSpeechRecognition" in window)) {
                alert("Voice search is not supported in this browser.");
                return;
              }
              const recognition = new (window as any).webkitSpeechRecognition();
              recognition.lang = "en-US";
              recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                alert(`You said: ${transcript}`);
              };
              recognition.start();
            }}
          >
            <span className="h-5 w-5 text-white flex items-center justify-center">
              <Mic size={18} />
            </span>
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

          {/* Avatar with Logout */}
          <div className="relative group" tabIndex={0}>
            <Avatar className="cursor-pointer">
              <AvatarImage src={session.user.image ?? undefined} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="absolute right-0 mt-2 hidden group-hover:block group-focus-within:block bg-background border border-muted rounded-md shadow-lg z-50 p-2">
              <Button
                onClick={handleSignOut}
                className="text-sm text-destructive hover:text-destructive/70 w-full justify-start cursor-pointer"
                variant="ghost"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </>
      ) : (
        <Button
          onClick={handleSignIn}
          className="text-sm font-semibold text-foreground px-0 py-0 border-none shadow-none bg-transparent hover:bg-transparent hover:underline flex items-center cursor-pointer"
        >
          <span className="hidden lg:inline">Login</span>
          <span className="lg:hidden">
            <LogIn size={20} />
          </span>
        </Button>
      )}

      <NavigationMobile />
    </div>
  );
}
