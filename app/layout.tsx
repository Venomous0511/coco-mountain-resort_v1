import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AuthSessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "Coco Mountain Resort",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  keywords: ["resort", "mountain", "vacation", "getaway"],
  description: "A serene getaway in the mountains",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const loraSerif = localFont({
  src: [
    {
      path: "./fonts/Lora-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Lora-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Lora-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Lora-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/Lora-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Lora-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./fonts/Lora-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Lora-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-lora-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${loraSerif.variable}`}>
        <AuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
