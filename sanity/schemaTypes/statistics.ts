import { TrendingUp } from "lucide-react";
import { defineField, defineType } from "sanity";

export const statistics = defineType({
    name: "statistics",
    title: "Statistics",
    type: "document",
    icon: TrendingUp,
    fields: [
        defineField({
            name: "title",
            title: "Statistic Title",
            type: "string",
            description: "e.g., Total Revenue, Guest Reviews",
        }),
        defineField({
            name: "value",
            title: "Value",
            type: "string",
            description: "e.g., $4.8m, 86k, 24",
        }),
    ],
});
