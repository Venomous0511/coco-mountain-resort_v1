import { BookOpenCheckIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const booking = defineType({
  name: "booking",
  title: "Booking",
  type: "document",
  icon: BookOpenCheckIcon,
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "bookingName",
      title: "Booking Name",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
    }),
    defineField({
      name: "bookingTime",
      title: "Booking Time",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Booking Date",
      type: "date",
    }),
    defineField({
      name: 'type',
      title: 'Booking Type',
      type: 'string',
      options: {
        list: ["room", "cottage"],
      },
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "type",
    },
  },
});