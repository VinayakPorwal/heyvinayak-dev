import { budgets } from "@/data";

// Placeholder contact endpoint.
// - With FORMSPREE_ID set, messages are forwarded to Formspree (https://formspree.io).
// - Without it, messages are validated and logged to the server console only.

type Payload = { name?: string; email?: string; budget?: string; message?: string; company?: string };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend success, drop it.
  if (body.company) return Response.json({ ok: true });

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const budget = body.budget?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || name.length > 120) return Response.json({ error: "Please add your name." }, { status: 400 });
  if (!isEmail(email)) return Response.json({ error: "Please check your email address." }, { status: 400 });
  if (!budgets.includes(budget)) return Response.json({ error: "Please choose a budget range." }, { status: 400 });
  if (message.length < 10 || message.length > 5000)
    return Response.json({ error: "Please tell me a little more about your project." }, { status: 400 });

  const formspreeId = process.env.FORMSPREE_ID;
  if (formspreeId) {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, budget, message, _replyto: email }),
    });
    if (!res.ok) return Response.json({ error: "The message couldn't be sent." }, { status: 502 });
  } else {
    console.info("[contact] New enquiry", { name, email, budget, message });
  }

  return Response.json({ ok: true });
}
