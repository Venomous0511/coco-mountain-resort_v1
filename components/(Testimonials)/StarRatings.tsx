"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-1 text-green-500">
      {[...Array(max)].map((_, index) => (
        <Star
          key={index}
          size={18}
          className={index < rating ? "fill-current" : "fill-none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}
