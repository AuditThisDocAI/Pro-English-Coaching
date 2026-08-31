import { streamText, convertToModelMessages, createUIMessageStreamResponse, toUIMessageStream } from "ai";

// Allow streaming responses for up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Parse incoming messages from the frontend
    const { messages } = await req.json();

    // Validate message structure
    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid message format", { status: 400 });
    }

    // Stream the chat response using OpenAI’s fast model
    const result = await streamText({
      model: "openai/gpt-4o-mini", // or "openai/gpt-3.5-turbo" if preferred
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxOutputTokens: 8192,
    });

    // Return the streaming response to the frontend
    return createUIMessageStreamResponse(result.toAIStream(toUIMessageStream));
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
