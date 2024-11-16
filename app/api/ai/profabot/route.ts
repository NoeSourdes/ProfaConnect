import { profabotContext } from "@/src/config/ai/knowledge_base";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToCoreMessages, generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

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
    const result = await generateText({
      abortSignal: req.signal,
      maxTokens: 5000,
      model: openai(model),
      messages: convertToCoreMessages([
        { role: "system", content: profabotContext },
        ...messages.map((msg: Message) => ({
          role: msg.role === "assistant" ? "assistant" : msg.role,
          content: msg.content,
        })),
      ]),
      temperature: 0.7,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Erreur dans la génération de texte :", error);
    return NextResponse.json(
      { error: "Failed to generate text." },
      { status: 500 }
    );
  }
}
