import type { NextRequest } from "next/server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    apiKey: key,
    model = "llama-3.1-70b-instruct",
    prompt,
    system,
  } = await req.json();

  const apiKey = key || process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OpenAI API key." },
      { status: 401 }
    );
  }

  const openai = createOpenAI({ apiKey, baseURL: "https://api.perplexity.ai" });

  try {
    const result = await generateText({
      abortSignal: req.signal,
      maxTokens: 50,
      model: openai(model),
      prompt: prompt,
      system,
      temperature: 0.7,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    if (error.name === "AbortError") {
      return NextResponse.json(null, { status: 408 });
    }

    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}