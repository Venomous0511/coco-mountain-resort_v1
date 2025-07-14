"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastHandler() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const provider = localStorage.getItem("provider");

      if (localStorage.getItem("login") === "true" && provider === "google") {
        toast.success("Logged in with Google successfully!");
        localStorage.removeItem("login");
        localStorage.removeItem("provider");
      }

      if (localStorage.getItem("logout") === "true") {
        toast.info("Logged out successfully!");
        localStorage.removeItem("logout");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
