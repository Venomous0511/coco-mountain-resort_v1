"use client";

import React from "react";
import { Toaster } from "sonner";
import { useSession } from "next-auth/react";

import Navbar from "@/components/(Header)/Navbar";
import ToastHandler from "@/components/ToastHandler";
import Footer from "@/components/(Footer)/Footer";
import ScrollUp from "@/components/ScrollToTop";
import ChatWidget from "@/components/(Chatbot)/ChatWidget";

export default function Pagelayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session } = useSession();

  return (
    <main>
      <Navbar />

      {children}

      <Footer />

      <ScrollUp />

      {session?.user && <ChatWidget />}

      <ToastHandler />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
