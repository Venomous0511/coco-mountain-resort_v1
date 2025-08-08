"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { saveBookingToSanity } from "@/lib/action";
import { fetchBookedDates } from '@/sanity/lib/queries';
import { useSession } from "next-auth/react";

export default function CottageBookingFormPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams();
  const nameParam = searchParams.get("name") ?? "Unknown Room";
  const priceParam = searchParams.get("price");

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState<"day" | "night" | "">("");
  const [fullName, setFullName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");

  const [bookedDates, setBookedDates] = useState<Date[]>([]);

  useEffect(() => {
    fetchBookedDates(nameParam, "cottage").then(setBookedDates);
  }, [nameParam]);

  const isDateDisabled = (date: Date) =>
    bookedDates.some(
      (bookedDate) => date.toDateString() === bookedDate.toDateString()
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !bookingTime || !selectedDate) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      await saveBookingToSanity({
        fullName,
        email,
        bookingName: nameParam,
        price: priceParam ?? "Unknown Price",
        bookingTime,
        date: selectedDate,
        bookingType: "cottage", // Specify booking type
      });

      alert("✅ Cottage booking submitted successfully!");
      // Optionally: router.push("/confirmation")
    } catch (error) {
      alert("❌ Failed to submit booking.");
    }
  };

  return (
    <Suspense fallback={<div>Loading booking form...</div>}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-muted/40 rounded-xl shadow-md p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-primary">
            Book the {nameParam}
          </h1>
          <p className="mb-6 text-sm sm:text-base text-muted-foreground">
            You're booking the <strong>{nameParam}</strong> for{" "}
            <strong>{priceParam}</strong>. Please complete the form.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={!!session}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="johnsmith@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!!session}
              />
            </div>

            {/* Booking Time */}
            <div className="space-y-2">
              <Label className="block mb-2">Choose Booking Time</Label>
              <RadioGroup
                value={bookingTime}
                onValueChange={(val) => setBookingTime(val as "day" | "night")}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="day" id="day" />
                  <Label htmlFor="day">Daytime (7 AM - 5 PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="night" id="night" />
                  <Label htmlFor="night">Nighttime (7 PM - 6 AM)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label className="block mb-2">Select Date</Label>
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
                <p className="mt-2 text-sm text-muted-foreground text-center sm:text-left">
                  Selected Date: {format(selectedDate, "MMMM dd, yyyy")}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!selectedDate || !bookingTime || !fullName || !email}
              className="w-full"
            >
              Confirm Booking
            </Button>
          </form>
        </div>
      </div>
    </Suspense>
  );
}
