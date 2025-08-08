import Image from "next/image";
import Link from "next/link";
import React from "react";

import ScrollReveal from "@/components/ScrollReveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

import Testimonial, {
  TestimonialTypes,
} from "@/components/(Testimonials)/Testimonials";

import {
  fetchFaqs,
  fetchStatistics,
  fetchTestimonials,
} from "@/sanity/lib/queries";

import { Statistics, Faqs } from "@/sanity/types";

export default async function Home() {
  const testimonials: TestimonialTypes[] = await fetchTestimonials();

  const stats: Statistics[] = await fetchStatistics();

  const faqs: Faqs[] = await fetchFaqs();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative max-w-full h-screen mt-0">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-background/50 md:bg-transparent md:from-background/55 md:to-white/0 md:bg-gradient-to-r"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 sm:px-6 h-screen flex justify-center items-center md:justify-start md:px-8">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-3xl italic font-extrabold text-foreground md:text-5xl">
              Welcome to
              <strong
                className={`block font-extrabold text-primary font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl`}
              >
                Coco Mountain
              </strong>
            </h1>

            <p className="mt-4 max-w-lg font-semibold italic text-foreground md:text-xl/relaxed text-lg/relaxed font-serif">
              Your sanctuary of relaxation: a place to calm your mind and find
              peace after a rough day.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start items-center">
              <Link
                href="/"
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-semibold text-background shadow hover:bg-primary/70 focus:outline-none focus:ring-0 md:w-auto"
              >
                Get Started
              </Link>

              <Link
                href="https://www.facebook.com/CocoMountainResort"
                target="_blank"
                className="block w-full rounded bg-background px-12 py-3 text-sm font-semibold text-primary shadow hover:bg-background/70 focus:outline-none focus:ring-0 md:w-auto"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS  */}
      <section className="section bg-background">
        <ScrollReveal threshold={0.1} className="overflow-hidden">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading">Trusted by World-Class Resorts</h2>

            <p className="subheading">
              Delivering unforgettable guest experiences with tailored solutions
              for luxury hospitality.
            </p>
          </div>

          <dl className="my-6 grid grid-cols-1 gap-4 divide-y divide-gray-300 dark:divide-gray-700 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card
                key={stat._id}
                className="text-center border-none shadow-sm"
              >
                <CardContent className="flex flex-col items-center py-6">
                  <dd className="text-4xl font-extrabold text-green-600 md:text-5xl">
                    {stat.value}
                  </dd>
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </dt>
                </CardContent>
              </Card>
            ))}
          </dl>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="section max-w-full px-0 bg-secondary sm:grid sm:grid-cols-2 sm:items-center">
        <ScrollReveal
          threshold={0.1}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: {
              opacity: 1,
              x: 1,
              transition: { duration: 0.5, delay: 0.4 },
            },
          }}
          className="overflow-hidden"
        >
          <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="heading">
                Experience the Ultimate Luxury at Our Resort
              </h2>

              <p className="subheading">
                Indulge in world-class amenities and breathtaking views at our
                exclusive resort.
                <span className="hidden md:inline lg:hidden">
                  {" "}
                  Whether you&apos;re seeking relaxation or adventure, we have
                  tailored packages to make your stay unforgettable.
                </span>
                <span className="hidden lg:inline">
                  {" "}
                  Whether you&apos;re seeking relaxation or adventure, we have
                  tailored packages to make your stay unforgettable.
                </span>
              </p>

              <div className="mt-4 md:mt-8">
                <Link
                  href="/offers"
                  className="inline-block rounded bg-primary px-12 py-3 text-xs font-medium text-background transition hover:bg-primary/80 focus:outline-none focus:ring focus:ring-ring lg:py-4 lg:px-16 lg:text-base"
                >
                  Explore Our Offers →
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

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
          <Image
            alt="Offers Image"
            src="/images/CTA.jpg"
            width={500}
            height={0}
            className="h-full w-full object-cover sm:h-[calc(100%-2rem)] sm:self-end sm:rounded-tl-[30px] md:h-[calc(100%-4rem)] md:rounded-tl-[60px]"
          />
        </ScrollReveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-background">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
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
            className="overflow-hidden"
          >
            <h2 className="heading text-center">
              Read trusted reviews from our customers
            </h2>
          </ScrollReveal>

          {/* <Suspense fallback={<Loading />}>
            <TestimonialsList />
          </Suspense> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.length > 0 ? (
              testimonials.map((testimonial) => (
                <Testimonial key={testimonial._id} testimonial={testimonial} />
              ))
            ) : (
              <div className="text-center text-muted-foreground col-span-full mx-auto">
                No testimonials available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="section bg-background">
        <h2 className="heading text-center">Frequently Asked Questions</h2>
        <Accordion type="multiple" className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq._id}
              value={`item-${index}`}
              className="border-s-4 border-b-0 border-primary bg-gray-50 p-2 md:p-4 dark:bg-gray-900"
            >
              <ScrollReveal
                threshold={0.1}
                variants={{
                  hidden: { opacity: 0, x: 200 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: index * 0.2 },
                  },
                }}
                className="overflow-hidden"
              >
                <AccordionTrigger className="text-sm md:text-lg font-serif font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </ScrollReveal>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
