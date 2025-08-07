"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

// TODO: Replace with actual feedback submission logic

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    comment: "",
  });

  const handleRating = (index: number) => {
    setFormData((prev) => ({ ...prev, rating: index + 1 }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate sending to server
    alert(
      `📬 Feedback submitted!\n\nName: ${formData.name}\nRating: ${formData.rating} stars\nComment: ${formData.comment}`
    );

    // Clear form
    setFormData({ name: "", rating: 0, comment: "" });
  };

  return (
    <div className="h-[100%] w-full mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-primary text-center">
        Give us Feedback about your stay
      </h1>
      <p className="text-muted-foreground text-center mb-6">
        Note: This will be show in the testimonials section in the home page
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-muted/50 rounded-xl p-6 shadow"
      >
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your name"
          />
        </div>

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
