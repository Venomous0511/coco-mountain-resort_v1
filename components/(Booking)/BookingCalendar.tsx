"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { isSameDay } from "date-fns";

const bookedDates = [
  new Date(2025, 7, 5),
  new Date(2025, 7, 12),
  new Date(2025, 7, 20),
];

export default function BookingCalendar() {
  const [selected, setSelected] = useState<Date | undefined>();

  const isBooked =
    selected && bookedDates.some((d) => isSameDay(d, selected as Date));

  return (
    <div className="w-full rounded-lg sm:bg-white sm:shadow px-4 py-6 sm:px-6 md:px-8 flex items-center justify-center">
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        modifiers={{
          booked: bookedDates,
        }}
        modifiersClassNames={{
          booked: "bg-primary text-primary-foreground rounded-full",
        }}
        classNames={{
          day: "rounded-full w-10 h-10 p-0 font-normal aria-selected:opacity-100",
          day_selected: "bg-primary text-white hover:bg-primary",
          day_today: "border border-primary",
        }}
      />

      {/* {selected && (
        <div className="mt-4 text-center text-sm">
          {isBooked ? (
            <p className="text-destructive font-medium">
              This date is already booked.
            </p>
          ) : (
            <p className="text-muted-foreground">
              Selected date: {selected.toDateString()}
            </p>
          )}
        </div>
      )} */}
    </div>
  );
}
