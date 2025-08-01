import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const user = defineType({
    name: "user",
    title: "Users",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: "image",
            title: "Profile Image URL",
            type: "url", // changed from "image"
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "email",
        },
    },
});
