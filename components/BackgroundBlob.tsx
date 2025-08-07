"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const clipPaths = [
  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
  "polygon(53% 25%, 70% 20%, 100% 35%, 90% 60%, 60% 90%, 40% 80%, 10% 70%, 0% 40%, 10% 10%, 30% 5%)",
  "polygon(20% 10%, 80% 0%, 100% 30%, 95% 70%, 70% 100%, 30% 90%, 0% 60%, 0% 30%)",
];

const colorPairs = [
  ["var(--primary)", "var(--chart-2)"],
  ["var(--chart-3)", "var(--chart-2)"],
  ["var(--primary)", "var(--chart-3)"],
  ["var(--sidebar-primary)", "var(--chart-3)"],
  ["var(--chart-2)", "var(--primary)"],
];

type BackgroundBlobProps = {
  variant?: "top" | "bottom";
  className?: string;
  intervalMs?: number;
};

export default function BackgroundBlob({
  variant = "bottom",
  className = "",
  intervalMs = 10000, // every 10 seconds
}: BackgroundBlobProps) {
  const [clipPath, setClipPath] = useState(clipPaths[0]);
  const [colors, setColors] = useState(colorPairs[0]);

  useEffect(() => {
    const changeBlob = () => {
      const newClip = clipPaths[Math.floor(Math.random() * clipPaths.length)];
      const newColor =
        colorPairs[Math.floor(Math.random() * colorPairs.length)];
      setClipPath(newClip);
      setColors(newColor);
    };

    const interval = setInterval(changeBlob, intervalMs);
    changeBlob(); // first time
    return () => clearInterval(interval);
  }, [intervalMs]);

  const baseClass =
    variant === "top"
      ? "absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0"
      : "hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl";

  return (
    <div aria-hidden="true" className={cn(baseClass, className)}>
      <div
        style={{
          clipPath,
          backgroundImage: `linear-gradient(to top right, ${colors[0]}, ${colors[1]})`,
        }}
        className={cn(
          "w-[36rem] sm:w-[48rem] md:w-[60rem] lg:w-[72rem]",
          "aspect-[1097/845]",
          "opacity-50 dark:opacity-30",
          "transition-all duration-1000 ease-in-out"
        )}
      />
    </div>
  );
}
