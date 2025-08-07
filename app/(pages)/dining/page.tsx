import React from "react";
import Link from "next/link";
import Image from "next/image";

import BackgroundBlob from "@/components/BackgroundBlob";
import ScrollReveal from "@/components/ScrollReveal";

import { client } from "@/sanity/lib/client";
// import { DINING_QUERY } from "@/sanity/lib/queries";
// import { Menu } from "@/sanity/types";
// import DiningMenu from "@/components/(Menu)/DiningMenu";

export default async function Dining() {
  // const menuItems: Menu[] = await client.fetch(DINING_QUERY);

  return (
    <>
      {/* HERO SECTION */}
      <section className="herosection">
        <BackgroundBlob variant="top" />
        <BackgroundBlob variant="bottom" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="heading-lg">Savor the Flavors of Paradise</h2>
            <p className="subheading-lg">
              Elevate your culinary journey with a blend of global and local
              flavors, meticulously prepared to delight your palate, while you
              savor the beauty of our stunning surroundings.
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

      {/* COCO HAVANA */}
      <section className="max-w-screen-2xl px-4 sm:px-6 lg:px-0 py-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          {/* Left Image */}
          <ScrollReveal
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
            <div className="block sm:hidden lg:block lg:h-screen">
              <Image
                alt="Coco Havana"
                src="/images/coco-havana.jpg"
                width={1080}
                height={1080}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Right Content */}
          <ScrollReveal
            threshold={0.1}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="sm:h-screen flex flex-col justify-center items-center sm:items-center md:items-center lg:items-start p-6 text-center sm:text-center md:text-center lg:text-left">
              <Image
                alt="Tropical Bar Setup"
                src="/images/coco-havana-bar-front.jpg"
                width={1080}
                height={1080}
                priority
                className="h-64 w-full object-cover sm:h-80 lg:h-96 rounded-lg"
              />

              <h3 className="mt-6 text-lg font-serif font-bold text-foreground sm:text-xl">
                Coco Havana
              </h3>

              <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
                Discover a dining experience like no other at Coco Havana. From
                vibrant flavors inspired by the tropics to expertly crafted
                cocktails, every moment is a celebration of taste and ambiance.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MENU */}
      <section className="section bg-background">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <ScrollReveal
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 1,
                transition: { duration: 0.5, delay: 0.4 },
              },
            }}
          >
            <header className="text-start mb-8">
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground">
                Dining Menu
              </h2>
              <p className="mt-4 text-muted-foreground">
                Explore our exquisite dining options, crafted to offer a perfect
                blend of flavors and elegance.
              </p>
            </header>
          </ScrollReveal>

          {/* DINING MENU PROPS */}
          {/* <DiningMenu items={menuItems} /> */}
        </div>
      </section>
    </>
  );
}
