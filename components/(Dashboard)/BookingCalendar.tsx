"use client";

import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { isSameDay, parseISO } from "date-fns";
import { fetchAllBookings } from "@/sanity/lib/queries";
import type { Booking } from "@/sanity/types";

export default function BookingCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    async function loadBookings() {
      const data = await fetchAllBookings();
      setBookings(data);
    }

    loadBookings();
  }, []);

  const bookedDates = bookings
    .filter((b) => !!b.date)
    .map((b) => parseISO(b.date!));

  const selectedBookings = selected
    ? bookings.filter((b) => b.date && isSameDay(parseISO(b.date), selected))
    : [];

  return (
    <div className="w-full max-w-xl mx-auto rounded-lg sm:bg-white sm:shadow px-4 py-6 sm:px-6 md:px-8 flex flex-col items-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={{ booked: bookedDates }}
        modifiersClassNames={{
          booked: "bg-destructive text-white rounded-full",
        }}
        classNames={{
          day: "rounded-full w-10 h-10 p-0 font-normal aria-selected:opacity-100",
          day_selected: "bg-primary text-white hover:bg-primary",
          day_today: "border border-primary",
        }}
      />

      {selected && (
        <div className="mt-6 w-full text-sm text-left space-y-4">
          <h2 className="text-lg font-bold">
            {selectedBookings.length > 0
              ? `Bookings for ${selected.toDateString()}`
              : `No bookings for ${selected.toDateString()}`}
          </h2>

          {selectedBookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-md p-3 bg-muted/30"
            >
              <p><strong>Room/Cottage:</strong> {booking.bookingName || "N/A"}</p>
              <p><strong>Type:</strong> {booking.bookingtype}</p>
              <p>
                <strong>Time:</strong> {booking.bookingTime === "day" ? "Day Time" : "Night Time"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
