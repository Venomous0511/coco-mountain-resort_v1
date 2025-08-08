import Link from "next/link";
import Image from "next/image";
import React from "react";

import BackgroundBlob from "@/components/BackgroundBlob";
import ScrollReveal from "@/components/ScrollReveal";

import { Deals } from "@/sanity/types";
import { fetchDeals } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

const activities = [
  {
    title: "EAT",
    description:
      "Discover a dining experience like no other at Coco Havana. From vibrant flavors inspired by the tropics to expertly crafted cocktails, every moment is a celebration of taste and ambiance.",
    image: "/images/coco-havana-fullview.jpg",
  },
  {
    title: "SWIM",
    description:
      "Dive into crystal-clear waters and embrace the soothing sensation of the poolside experience. Perfect for relaxation or fitness.",
    image: "/images/coco-pool.jpg",
  },
  {
    title: "SLEEP",
    description:
      "Relax and unwind in our comfortable and serene rooms, ensuring you wake up rejuvenated and ready for the day.",
    image: "/images/coco-room.jpg",
  },
  {
    title: "BIKE",
    description:
      "Explore scenic routes and enjoy a refreshing bike ride through lush landscapes. A perfect activity for the adventurous spirit.",
    image: "/images/coco-bike.jpg",
  },
  {
    title: "HIKE",
    description:
      "Take a hike through the mountains, immersing yourself in nature and enjoying breathtaking views that will leave you speechless.",
    image: "/images/coco-hike.jpg",
  },
  {
    title: "REPEAT",
    description:
      "Keep the adventure alive by repeating the cycle. There's always more to explore, more to experience, and more to enjoy.",
    image: "/images/coco-repeat.jpg",
  },
];

export default async function Offers() {
  const deals: Deals[] = await fetchDeals();

  return (
    <>
      {/* HERO SECTION */}
      <section className="herosection">
        <BackgroundBlob variant="top" />
        <BackgroundBlob variant="bottom" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="heading-lg">
              Experience Unmatched Luxury and Adventure
            </h2>
            <p className="subheading-lg">
              Escape to a world where relaxation meets exhilaration. Enjoy
              stunning accommodations and a variety of activities, from water
              sports to exclusive dining experiences, all designed to make your
              stay unforgettable..
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="sublinks">
              <Link href="/accomodation">
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

      {/* DEALS */}
      <section className="section">
        <ScrollReveal
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 1,
              transition: { duration: 0.5, delay: 0.4 },
            },
          }}
        >
          <div className="my-5 text-center">
            <h1 className="heading">Exclusive Resort Offers</h1>
            <p className="subheading">
              Discover tailored deals designed to make your stay unforgettable.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal
          threshold={0.1}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 1,
              transition: { duration: 0.5, delay: 0.4 },
            },
          }}
        >
          <div
            className={`grid gap-6 grid-cols-1 ${
              deals.length > 1 ? "md:grid-cols-2 lg:grid-cols-3" : ""
            } justify-center place-items-center`}
          >
            {deals.map((deal, index) => (
              <article
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg transition transform hover:scale-105 max-w-sm"
              >
                <Image
                  alt={deal.dealName || "Deal Image"}
                  width={1080}
                  height={1080}
                  src={
                    deal?.image
                      ? urlFor(deal.image).url()
                      : "/images/600x400.png"
                  }
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative bg-gradient-to-t from-gray-900/60 to-gray-900/20 min-h-full pt-48 lg:pt-64">
                  <div className="p-6">
                    <time
                      dateTime={deal.date}
                      className="block text-xs text-muted dark:text-white/80"
                    >
                      {deal.month}
                    </time>
                    <h3 className="mt-2 text-2xl font-serif font-bold text-background dark:text-white">
                      {deal.dealName}
                    </h3>
                    <p className="mt-4 text-sm text-muted dark:text-white/80">
                      {deal.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* DIVIDER */}
      <ScrollReveal
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, delay: 0.4 },
          },
        }}
      >
        <span className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
        </span>
      </ScrollReveal>

      {/* ACTIVITIES */}
      <section className="section">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity, idx) => (
            <ScrollReveal
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5, delay: 0.4 },
                },
              }}
            >
              <div className="flex flex-col justify-between items-center p-4 text-center h-full">
                <div className="flex justify-center items-center mb-4">
                  <Image
                    alt={activity.title}
                    src={activity.image}
                    width={1080}
                    height={1080}
                    className="h-48 w-full object-cover sm:h-64 md:h-72 lg:h-80 rounded-lg aspect-video sm:aspect-square"
                  />
                </div>
                <div className="flex flex-col justify-between h-full">
                  <h3 className="mt-4 text-lg font-serif font-semibold text-foreground sm:text-xl">
                    {activity.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground text-justify leading-relaxed max-w-xs sm:max-w-md md:max-w-lg flex-grow">
                    {activity.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
