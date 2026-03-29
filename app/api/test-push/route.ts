export async function GET() {
  const token = process.env.PUSHOVER_TOKEN;
  const user = process.env.PUSHOVER_USER;

  if (!token || !user) {
    return Response.json({ error: "missing env vars" });
  }

  try {
    const body = new URLSearchParams({ token, user, message: "Test notification from Digital Twin" });
    const res = await fetch("https://api.pushover.net/1/messages.json", {
      method: "POST",
      body,
    });
    const data = await res.json();
    return Response.json({ status: res.status, data });
  } catch (err: unknown) {
    return Response.json({ error: String(err) });
  }
}
