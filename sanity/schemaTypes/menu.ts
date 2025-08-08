import { CookingPot } from "lucide-react";
import { defineField, defineType } from "sanity";

export const menu = defineType({
    name: "menu",
    title: "Menu",
    type: "document",
    icon: CookingPot,
    fields: [
        defineField({
            name: 'foodItem',
            title: 'Food Item',
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
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Main Course', value: 'Main Course' },
                    { title: 'Pasta', value: 'Pasta' },
                    { title: 'Dessert', value: 'Dessert' },
                    { title: 'Beverage', value: 'Beverage' },
                    { title: 'Alcohol', value: 'Alcohol' },
                ],
            },
            validation: (Rule) => Rule.required().min(1).max(50).required().error('Please enter a category'),
        }),
    ],
});