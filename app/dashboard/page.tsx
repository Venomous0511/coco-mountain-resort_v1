"use client";

import { useSession } from "next-auth/react";
import BookingCalendar from "@/components/(Dashboard)/BookingCalendar";
import VoiceSearch from "@/components/VoiceSearch";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Optional: handle loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">You must be signed in to view the dashboard.</p>
      </div>
    );
  }

  const userName = session.user.name ?? "Guest";

  return (
    <div className="flex flex-1 flex-col gap-8 px-4 py-10">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="rounded-xl bg-muted/50 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-primary">
              Welcome, {userName}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              View your booking activity, stats, and quick actions here.
            </p>
          </div>

          {/* Recent Bookings */}
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-muted/50 p-4 shadow">
              <h2 className="font-medium text-primary">Recent Room Bookings</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Coming soon...
              </p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 shadow">
              <h2 className="font-medium text-primary">
                Recent Cottage Bookings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Coming soon...
              </p>
            </div>
          </div>
          <VoiceSearch />
        </div>

        {/* Right Column: Calendar */}
        <div className="w-full lg:w-[400px] sm:rounded-xl sm:bg-muted/50 p-0 sm:p-4 sm:shadow-sm">
          <h2 className="text-lg font-medium text-primary mb-4">
            Booking Calendar
          </h2>
          <BookingCalendar />
        </div>
      </div>
    </div>
  );
}
