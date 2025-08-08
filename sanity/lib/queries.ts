import { client } from "./client";
import type { Booking } from "@/sanity/types";

export async function fetchRooms() {
  const query = `*[_type == "rooms"] | order(name asc){
    _id,
    name,
    price,
    description,
    features,
    "image": image.asset->url
  }`;

  return await client.fetch(query);
}

export async function fetchCottage() {
  const query = `*[_type == "cottage"] | order(name asc){
    _id,
    name,
    price,
    note,
    features,
    "image": image.asset->url
  }`;

  return await client.fetch(query);
}

export async function fetchTestimonials() {
  const query = `*[_type == "testimonials"]{
    _id,
    _type,
    comment,
    rating,
    users->{
      name,
      image
    }
  } | order(_createdAt desc)`;

  return await client.fetch(query);
}

export async function fetchStatistics() {
  const query = `*[_type == "statistics"]{
    _id,
    title,
    value
  }`;

  return await client.fetch(query);
}

export async function fetchFaqs() {
  const query = `*[_type == "faqs"]{
    _id,
    question,
    answer
  } | order(_createdAt desc)`;

  return await client.fetch(query);
}

export async function fetchDinings() {
  const query = `*[_type == "menu"]{
    _id,
    foodItem,
    price,
    category,
    image
  }`;

  return await client.fetch(query);
}

export async function fetchDeals() {
  const query = `*[_type == "deals"]{
    _id,
    dealName,
    date,
    description,
    month,
    image
  }`;

  return await client.fetch(query);
}

export async function fetchAllBookings(): Promise<Booking[]> {
  return await client.fetch(
    `*[_type == "booking"]{
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      fullName,
      email,
      bookingName,
      price,
      bookingTime,
      date,
      type
    }`
  );
}

export async function fetchBookedDates(
  bookingName: string,
  bookingType: "room" | "cottage"
) {
  const results = await client.fetch(
    `*[_type == "booking" && bookingName == $bookingName && type == $bookingType]{
      date
    }`,
    { bookingName, bookingType }
  );

  // Convert to Date objects
  const dates = results.map(
    (booking: { date: string }) => new Date(booking.date)
  );
  return dates;
}
