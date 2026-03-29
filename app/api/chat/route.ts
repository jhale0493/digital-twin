import { NextRequest } from "next/server";
import OpenAI from "openai";
import { buildSystemPrompt } from "@/lib/profile-data";

const openai = new OpenAI();

const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "record_user_details",
      description:
        "Use this tool to record that a user is interested in being in touch and provided an email address",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "The email address of this user",
          },
          name: {
            type: "string",
            description: "The user's name, if they provided it",
          },
          notes: {
            type: "string",
            description:
              "Any additional information about the conversation that's worth recording to give context",
          },
        },
        required: ["email"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "record_unknown_question",
      description:
        "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
      parameters: {
        type: "object",
        properties: {
          question: {
            type: "string",
            description: "The question that couldn't be answered",
          },
        },
        required: ["question"],
        additionalProperties: false,
      },
    },
  },
];

async function sendPushover(message: string) {
  const token = process.env.PUSHOVER_TOKEN;
  const user = process.env.PUSHOVER_USER;
  console.log("sendPushover called, token exists:", !!token, "user exists:", !!user);
  if (!token || !user) return;
  try {
    const body = new URLSearchParams({ token, user, message });
    const res = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      body,
    });
    console.log("Pushover response:", res.status);
  } catch (err) {
    console.error("Pushover error:", err);
  }
}

async function handleToolCall(
  name: string,
  args: Record<string, string>
): Promise<string> {
  if (name === "record_user_details") {
    const { email, name: userName = "Name not provided", notes = "not provided" } = args;
    await sendPushover(
      `Recording ${userName} with email ${email} and notes ${notes}`
    );
    return JSON.stringify({ recorded: "ok" });
  }
  if (name === "record_unknown_question") {
    await sendPushover(`Recording ${args.question}`);
    return JSON.stringify({ recorded: "ok" });
  }
  return JSON.stringify({ error: "unknown tool" });
}

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as {
    messages: OpenAI.ChatCompletionMessageParam[];
  };

  const fullMessages: OpenAI.ChatCompletionMessageParam[] = [
    { role: "system", content: buildSystemPrompt() },
    ...messages,
  ];

  let done = false;
  while (!done) {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: fullMessages,
      tools,
    });

    const choice = response.choices[0];
    console.log("finish_reason:", choice.finish_reason, "tool_calls:", choice.message.tool_calls?.length ?? 0);

    if (choice.message.tool_calls && choice.message.tool_calls.length > 0) {
      fullMessages.push(choice.message);
      for (const tc of choice.message.tool_calls) {
        const args = JSON.parse(tc.function.arguments);
        const result = await handleToolCall(tc.function.name, args);
        fullMessages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: result,
        });
      }
    } else {
      done = true;
      const text = choice.message.content || "";
      return new Response(text, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  }

  return new Response("Something went wrong", { status: 500 });
}
