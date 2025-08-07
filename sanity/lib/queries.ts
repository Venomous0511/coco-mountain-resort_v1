// @sanity/lib/queries.ts
import { client } from './client'; // adjust the path as needed

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

export async function fetchBookedDates(bookingName: string, bookingType: "room" | "cottage") {
  const results = await client.fetch(
    `*[_type == "booking" && bookingName == $bookingName && type == $bookingType]{
      date
    }`,
    { bookingName, bookingType }
  );

  // Convert to Date objects
  const dates = results.map((booking: { date: string }) => new Date(booking.date));
  return dates;
}