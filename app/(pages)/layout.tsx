import React from "react";
import { Toaster } from "sonner";

import Navbar from "@/components/(Header)/Navbar";
import ToastHandler from "@/components/ToastHandler";

export default function Pagelayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />

      {children}

      <ToastHandler />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
