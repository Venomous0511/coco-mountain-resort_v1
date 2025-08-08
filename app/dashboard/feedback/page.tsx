"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { saveTestimonialToSanity } from "@/lib/action";

export default function FeedbackPage() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({ ...prev, name: session.user.name! }));
    }
  }, [session]);

  const handleRating = (index: number) => {
    setFormData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await saveTestimonialToSanity({
        name: formData.name,
        comment: formData.comment,
        rating: formData.rating,
        userId: session?.user?.id,
      });

      alert("✅ Feedback submitted successfully!");

      // Reset form
      setFormData({
        name: session?.user?.name || "",
        rating: 0,
        comment: "",
      });
    } catch (error) {
      alert("❌ Failed to submit feedback.");
    }
  };

  return (
    <div className="h-[100%] w-full mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-primary text-center">
        Give us Feedback about your stay
      </h1>
      <p className="text-muted-foreground text-center mb-6">
        Note: This will be shown in the testimonials section on the homepage.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 rounded-xl p-6 shadow"
      >
        {/* Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="John Smith"
            disabled={!!session}
          />
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div className="flex gap-1 text-green-500">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={24}
                className={
                  index < formData.rating ? "fill-current" : "fill-none"
                }
                strokeWidth={1.5}
                onClick={() => handleRating(index)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Comment</label>
          <textarea
            name="comment"
            rows={5}
            value={formData.comment}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Tell us about your stay..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
