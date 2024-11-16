import type { NextRequest } from "next/server";

import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    apiKey: key,
    messages,
    model = "llama-3.1-70b-instruct",
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
    const result = await streamText({
      maxTokens: 2048,
      messages: convertToCoreMessages(messages),
      model: openai(model),
      system: system,
    });

    return result.toDataStreamResponse();
  } catch {
    return NextResponse.json(
      { error: "Failed to process AI request" },
      { status: 500 }
    );
  }
}
