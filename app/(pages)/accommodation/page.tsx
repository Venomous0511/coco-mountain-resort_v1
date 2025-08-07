import React from "react";
import Link from "next/link";
import Image from "next/image";

import BackgroundBlob from "@/components/BackgroundBlob";
import ScrollReveal from "@/components/ScrollReveal";

import { urlFor } from "@/sanity/lib/image";
import { Cottage, Rooms } from "@/sanity/types";
import { fetchRooms } from "@/sanity/lib/queries";
import { fetchCottage } from "@/sanity/lib/queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default async function Accommodation() {
  const rooms: Rooms[] = await fetchRooms();
  const cottages: Cottage[] = await fetchCottage();

  return (
    <>
      {/* HERO SECTION */}
      <section className="herosection">
        <BackgroundBlob variant="top" />
        <BackgroundBlob variant="bottom" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="heading-lg">
              Experience the Ultimate Resort Getaway
            </h2>
            <p className="subheading-lg">
              Escape to paradise. Our resort offers luxurious accommodations,
              world-class amenities, and breathtaking views. Unwind with a
              variety of activities designed for relaxation and adventure.
            </p>
          </div>

          <div className="mx-auto mt-6 sm:mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="sublinks">
              <Link href="/accommodation">
                Book Your Stay <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/">
                Explore Our Resort <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/offers">
                Exclusive Offers <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link href="/gathering">
                Gatherings <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="section max-w-screen-2xl">
        <div className="space-y-20">
          {rooms?.length > 0 ? (
            rooms.map((room) => (
              <ScrollReveal
                key={room._id}
                variants={{
                  hidden: { opacity: 0, scale: 0.5 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, delay: 0.4 },
                  },
                }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center">
                  <div className="flex-shrink-0 order-1">
                    <Image
                      src={
                        room.image
                          ? urlFor(room.image).url()
                          : "/fallback-image.jpg"
                      }
                      alt={room.name || "Room Image"}
                      width={1200}
                      height={800}
                      className="h-80 w-full object-cover transition-transform duration-500 hover:scale-105 lg:h-full aspect-square lg:aspect-video"
                    />
                  </div>

                  <div className="text-left order-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {room.name}
                    </h3>
                    <p className="mt-2 text-sm text-foreground">
                      {room.description}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-foreground">
                      Price: {room.price}
                    </p>
                    {room.features && room.features.length > 0 && (
                      <ul className="mt-4 list-disc list-inside text-muted-foreground text-sm space-y-1">
                        {room.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="text-center text-muted-foreground col-span-full">
              No rooms available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* COTTAGES */}
      <section className="section max-w-screen-xl mx-auto p-6">
        <ScrollReveal
          threshold={0.1}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: {
              opacity: 1,
              x: 1,
              transition: { duration: 0.5, delay: 0.4 },
            },
          }}
        >
          <header>
            <h2 className="text-xl font-bold text-foreground sm:text-3xl">
              The Cottage Haven
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              A Tranquil Retreat Where Nature Meets Comfort, Offering You the
              Perfect Escape to Relax, Reconnect, and Rejuvenate
            </p>
          </header>
        </ScrollReveal>

        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Future CottageCard list */}
          {cottages.map((cottage, index) => (
            <li key={index}>
              <ScrollReveal
                threshold={0.1}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: {
                    opacity: 1,
                    x: 1,
                    transition: { duration: 0.5, delay: 0.4 },
                  },
                }}
              >
                <Card className="overflow-hidden group hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-lg dark:hover:shadow-[#ffffff80] transition-shadow duration-300 border-none p-0">
                  <Image
                    src={
                      cottage.image
                        ? urlFor(cottage.image).url()
                        : "/fallback-image.jpg"
                    }
                    alt={cottage.name || "Cottage Image"}
                    width={500}
                    height={350}
                    className="h-[350px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <CardContent className="p-4">
                    <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      {cottage.features && cottage.features.length > 0 && (
                        <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          {cottage.features.map((detail, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </ul>

                    <CardTitle className="text-base group-hover:underline group-hover:underline-offset-4">
                      {cottage.name}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm tracking-wide">
                      {cottage.price}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
