export async function GET() {
  return Response.json({
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    hasPushoverUser: !!process.env.PUSHOVER_USER,
    hasPushoverToken: !!process.env.PUSHOVER_TOKEN,
    pushoverUserLen: process.env.PUSHOVER_USER?.length ?? 0,
    pushoverTokenLen: process.env.PUSHOVER_TOKEN?.length ?? 0,
  });
}
