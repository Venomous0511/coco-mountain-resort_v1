import { defineField, defineType } from "sanity";
import { Handshake } from "lucide-react";

export const deals = defineType({
    name: "deals",
    title: "Deals",
    type: "document",
    icon: Handshake,
    fields: [
        defineField({
            name: 'dealName',
            title: 'Deal Name',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
        }),
        defineField({
            name: 'month',
            title: 'Month',
            type: 'string',
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
});