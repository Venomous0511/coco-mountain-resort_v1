import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  const sanityData = await client.fetch(
    `*[_type == "faq"][0..2]{question, answer}`
  );

  const systemPrompt = `
    You are a helpful assistant. Use this data if relevant:
    ${sanityData.map((d: any) => `Q: ${d.question}\nA: ${d.answer}`).join("\n\n")}
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();

  const aiMessage =
    data.choices?.[0]?.message?.content || "Something went wrong.";

  return NextResponse.json({ message: aiMessage });
}
