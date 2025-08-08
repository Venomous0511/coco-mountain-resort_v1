import { Speech } from "lucide-react";
import { defineType } from "sanity";

export const testimonials = defineType({
    name: "testimonials",
    title: "Testimonials",
    type: "document",
    icon: Speech,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "comment",
            title: "Comment",
            type: "text",
        },
        {
            name: "rating",
            title: "Rating",
            type: "number",
            validation: (Rule) => Rule.min(1).max(5),
        },
        {
            name: "users",
            title: "User",
            type: "reference",
            to: [{ type: "user" }],
        },
    ],
})