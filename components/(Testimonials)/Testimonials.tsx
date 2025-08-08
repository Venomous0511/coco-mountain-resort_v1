"use client";

import Image from "next/image";
import { StarRating } from "./StarRatings";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "../ScrollReveal";
import { Testimonials, User } from "@/sanity/types";

export type TestimonialTypes = Omit<Testimonials, "users"> & { users?: User };

export default function Testimonial({
  testimonial,
}: {
  testimonial: TestimonialTypes;
}) {
  const { comment, rating, users } = testimonial;

  return (
    <div className="mb-8 sm:break-inside-avoid">
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
        <Card className="p-4 sm:p-6 md:p-8 shadow-md dark:bg-gray-800 border-none">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Image
                src={users?.image || "/images/48x48.png"}
                alt={users?.name ?? "User"}
                width={56}
                height={56}
                className="size-14 rounded-full object-cover"
              />

              <div className="flex flex-col justify-center items-center md:items-start">
                <StarRating rating={rating ?? 0} />
                <p className="mt-0.5 text-sm lg:text-lg font-semibold">
                  {users?.name}
                </p>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground text-center sm:text-left">
              {comment}
            </p>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
