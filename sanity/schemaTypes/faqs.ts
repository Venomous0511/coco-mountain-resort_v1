import { defineField, defineType } from "sanity";
import { MessageCircleQuestion } from "lucide-react";

export const faqs = defineType({
    name: "faqs",
    title: "Faqs",
    type: "document",
    icon: MessageCircleQuestion,
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'string',
        }),
    ],
});