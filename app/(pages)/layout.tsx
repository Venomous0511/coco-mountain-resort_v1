import React from "react";
import { Toaster } from "sonner";

import Navbar from "@/components/(Header)/Navbar";
import ToastHandler from "@/components/ToastHandler";
import Footer from "@/components/(Footer)/Footer";

export default function Pagelayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />

      {children}

      <Footer />

      <ToastHandler />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
