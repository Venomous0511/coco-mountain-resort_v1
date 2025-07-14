import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Coco Mountain Resort",
  description: "A serene getaway in the mountains",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
