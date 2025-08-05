"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";

// TODO: Replace with your actual booking logic

const cottages = [
  {
    name: "Gazebo Table",
    imageSrc: "/images/(cottage)/Gazebo.jpg",
    price: "800",
    note: " per Table",
    details: ["Good for 6 PAX", "Open-air table", "Near garden area", "Ideal for small groups"],
  },
  {
    name: "Cabana 1",
    imageSrc: "/images/(cottage)/Cabana.jpg",
    price: "1000",
    details: ["Good for 10 PAX", "Open-air seating", "Near pool area", "Includes table and benches"],
  },
  {
    name: "Cabana 2",
    imageSrc: "/images/(cottage)/Cabana2.jpg",
    price: "1500",
    details: ["Good for 15 PAX", "Spacious layout", "Poolside location", "Includes table and benches"],
  },
  {
    name: "Cabana Family",
    imageSrc: "/images/(cottage)/CabanaFamily.jpg",
    price: "2000",
    details: ["Good for 20 PAX", "Private area", "Ideal for family gatherings", "Includes table and benches"],
  },
  {
    name: "Cabana with Room",
    imageSrc: "/images/(cottage)/CabanaRoom.jpg",
    price: "2000",
    details: ["Good for 10 PAX", "Includes air-conditioned room", "Private comfort room", "Poolside location"],
  },
  // {
  //   name: "Nipa with Room",
  //   imageSrc: "/images/(cottage)/NipaRoom.jpg",
  //   price: "2000",
  //   details: ["Good for 8-10 persons", "Traditional nipa hut design", "Includes air-conditioned room", "Private comfort room"],
  // },
];

const bookedDates = [
  new Date(2025, 7, 12),
  new Date(2025, 7, 18),
  new Date(2025, 7, 22),
];

export default function CottageBookingPage() {
  const [selectedCottage, setSelectedCottage] = useState(cottages[0]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState<"day" | "night" | "">("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const isDateDisabled = (date: Date) =>
    bookedDates.some((d) => d.toDateString() === date.toDateString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !selectedDate || !bookingTime) {
      alert("Please fill out all required fields.");
      return;
    }

    alert(`
      Booking Successful!
      Name: ${fullName}
      Email: ${email}
      Cottage: ${selectedCottage.name}
      Price: ₱${selectedCottage.price}
      Time: ${bookingTime === "day" ? "Daytime (8AM - 6PM)" : "Nighttime (8PM - 7AM)"}
      Date: ${format(selectedDate, "MMMM d, yyyy")}
    `);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
        Book a Cottage
      </h1>

      <p className="text-muted-foreground mb-6 text-sm">
        You can choose between our <span className="font-semibold text-foreground">Daytime</span> schedule (7:00 AM – 5:00 PM) or <span className="font-semibold text-foreground">Nighttime</span> schedule (7:00 PM – 6:00 AM) depending on your preference.
      </p>

      {/* Cottage Selector */}
      <div className="grid md:grid-cols-3 gap-4">
        {cottages.map((cottage) => (
          <div
            key={cottage.name}
            onClick={() => setSelectedCottage(cottage)}
            className={`border rounded-xl p-4 cursor-pointer hover:shadow transition ${
              selectedCottage.name === cottage.name ? "border-primary" : "border-muted"
            }`}
          >
            <Image
              src={cottage.imageSrc}
              alt={cottage.name}
              width={300}
              height={200}
              className="rounded-lg object-cover w-full h-48"
            />
            <h2 className="text-xl font-semibold mt-2">{cottage.name}</h2>
            <p className="text-muted-foreground">₱{cottage.price}{cottage?.note || ""}</p>
            <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
              {cottage.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-muted/30 p-6 rounded-xl">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <Label>Choose Booking Time</Label>
            <RadioGroup
              value={bookingTime}
              onValueChange={(val) => setBookingTime(val as "day" | "night")}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="day" id="day" />
                <Label htmlFor="day">Daytime (8 AM - 6 PM)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="night" id="night" />
                <Label htmlFor="night">Nighttime (8 PM - 7 AM)</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Select Booking Date</Label>
            <div className="border rounded-md p-2 w-full overflow-x-auto">
              <Calendar
                mode="single"
                selected={selectedDate}
                numberOfMonths={2}
                onSelect={setSelectedDate}
                disabled={isDateDisabled}
                className="mx-auto"
              />
            </div>
            {selectedDate && (
              <p className="mt-2 text-sm text-muted-foreground">
                Selected Date: {format(selectedDate, "MMMM d, yyyy")}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!selectedDate || !bookingTime || !fullName || !email}
          >
            Confirm Booking
          </Button>
      </form>
    </div>
  );
}
