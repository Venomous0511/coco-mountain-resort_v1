"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { fetchRooms } from '@/sanity/lib/queries';

export default function RoomBookingPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    fetchRooms().then(setRooms);
  }, []);

  const handleBook = (room: any) => {
    const query = new URLSearchParams({
      name: room.name,
      price: room.price,
    });
    router.replace(`/dashboard/room-booking/form?${query.toString()}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
        Book a Room
      </h1>

      <p className="text-muted-foreground mb-6 text-sm">
        You can choose between our <span className="font-semibold text-foreground">Daytime</span> schedule (8:00 AM – 6:00 PM) or <span className="font-semibold text-foreground">Nighttime</span> schedule (8:00 PM – 7:00 AM) depending on your preference.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {rooms.map((room, index) => (
          <div
            key={room._id || index}
            className="rounded-xl overflow-hidden bg-muted/40 shadow hover:shadow-lg transition-shadow"
          >
            {room.image && (
              <Image
                src={room.image}
                alt={room.name}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold text-primary">{room.name}</h2>
              <p className="mt-2 text-sm text-foreground">{room.description}</p>

              {/* Features */}
              {room.features?.length > 0 && (
                <ul className="mt-4 list-disc list-inside text-muted-foreground text-sm space-y-1">
                  {room.features.map((feature: string, i: number) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}

              <div className="mt-4">
                <button
                  onClick={() => handleBook(room)}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 w-full"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
