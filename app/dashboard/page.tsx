import BookingCalendar from "@/components/(Dashboard)/BookingCalendar";
import VoiceSearch from "@/components/VoiceSearch";

// TODO: Replace with actual booking calendar component
// TODO: Replace the Recent Bookings section with real data with the date of the last booking same as the cottage if any

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 px-4 py-10">
      {/* Top Section: Welcome + Calendar Side by Side */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left Column: Welcome + Recent Bookings */}
        <div className="flex-1 space-y-6">
          {/* Welcome Card */}
          <div className="rounded-xl bg-muted/50 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-primary">
              Welcome to Your Dashboard
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
