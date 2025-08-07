import { UtensilsCrossed } from "lucide-react";
import { defineField, defineType } from "sanity";

export const cottage = defineType({
  name: "cottage",
  title: "Cottage",
  type: "document",
  icon: UtensilsCrossed,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Room Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "note",
      title: "Notes",
      type: "text",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "price",
      media: "image",
    },
  },
});