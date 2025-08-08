"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { fetchCottage } from '@/sanity/lib/queries';

export default function RoomBookingPage() {
  const router = useRouter();
  const [cottages, setCottage] = useState<any[]>([]);

  useEffect(() => {
    fetchCottage().then(setCottage);
  }, []);

  const handleBook = (room: any) => {
    const query = new URLSearchParams({
      name: room.name,
      price: room.price,
    });
    router.replace(`/dashboard/cottage-booking/form?${query.toString()}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
        Book a Cottage
      </h1>

      <p className="text-muted-foreground mb-6 text-sm">
         You can choose between our <span className="font-semibold text-foreground">Daytime</span> schedule (7:00 AM – 5:00 PM) or <span className="font-semibold text-foreground">Nighttime</span> schedule (7:00 PM – 6:00 AM) depending on your preference.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cottages.map((cottage, index) => (
          <div
            key={cottage._id || index}
            className="rounded-xl overflow-hidden bg-muted/40 shadow hover:shadow-lg transition-shadow"
          >
            {cottage.image && (
              <Image
                src={cottage.image}
                alt={cottage.name}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-semibold text-primary">{cottage.name}</h2>
              <p className="mt-2 text-sm text-foreground">{cottage.description}</p>

              {/* Features */}
              {cottage.features?.length > 0 && (
                <ul className="mt-4 list-disc list-inside text-muted-foreground text-sm space-y-1">
                  {cottage.features.map((feature: string, i: number) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              )}

              <div className="mt-4">
                <button
                  onClick={() => handleBook(cottage)}
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

