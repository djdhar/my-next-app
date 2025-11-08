// pages/api/gemini.ts

import { NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment");
}

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const apiUrl = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";  

    const body = {
      model: "gemini-2.5-flash",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ],
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GEMINI_API_KEY}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      return NextResponse.json({ error: "Gemini API request failed", details: error }, { status: response.status });
    }

    const data = await response.json();
    // For OpenAI‐compat, response.choices[0].message.content may be the answer
    const answer = data.choices?.[0]?.message?.content ?? data;

    return NextResponse.json({ answer, raw: data }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error calling Gemini:", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
