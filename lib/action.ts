'use server';

import { writeClient } from "@/sanity/lib/client";
import { User } from "next-auth";

/**
 * Saves a user to Sanity, ensuring the ID is sanitized and image URL is valid.
 * @param user - The authenticated user object from NextAuth
 */
export async function saveUserToSanity(user: User) {
    if (!user.email) return;

    const safeId = `user-${user.email.replace(/[@.]/g, "_")}`;

    const doc = {
        _type: "user",
        _id: safeId,
        name: user.name ?? "",
        email: user.email,
        image: typeof user.image === "string" ? user.image : undefined,
    };

    try {
        await writeClient.createOrReplace(doc);
    } catch (err) {
        console.error("Failed to save user to Sanity:", err);
    }
}


export async function saveBookingToSanity({
  fullName,
  email,
  bookingName,
  price,
  bookingTime,
  date,
  bookingType, // Add bookingType to distinguish between room and cottage
}: {
  fullName: string;
  email: string;
  bookingName: string;
  price: string;
  bookingTime: "day" | "night";
  date: Date;
  bookingType: "room" | "cottage"; // New field to specify booking type
}) {
  const userId = `user-${email.replace(/[@.]/g, "_")}`;
  const dateString = date.toISOString().split("T")[0];

  // Check if the room or cottage is already booked for the specified time
  const existingBooking = await writeClient.fetch(
    `*[_type == "booking" && bookingName == $bookingName && date == $date && bookingTime == $time && type == $type][0]`,
    {
      bookingName,
      date: dateString,
      time: bookingTime,
      type: bookingType, // Ensure the booking type is matched
    }
  );

  if (existingBooking) {
    throw new Error("This room or cottage is already booked at that time and date.");
  }

  const doc = {
    _type: "booking",
    fullName,
    email,
    bookingName,
    price,
    bookingTime,
    date: dateString,
    user: { _type: "reference", _ref: userId },
    type: bookingType, // Add type to the document
  };

  try {
    const result = await writeClient.create(doc);
    return result;
  } catch (err) {
    console.error("Failed to save booking to Sanity:", err);
    throw err;
  }
}

