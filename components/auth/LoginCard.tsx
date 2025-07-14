import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LoginCard({
  children,
  title = "Sign in to Coco Mountain Resort",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-sm w-full rounded-xl border bg-white dark:bg-neutral-900 p-6 shadow-lg space-y-6 text-center"
      >
        <Image
          src="/logo.png"
          alt="Coco Mountain Logo"
          width={60}
          height={60}
          className="mx-auto"
        />
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {children}
      </motion.div>
    </div>
  );
}
