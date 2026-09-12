import { NextResponse, type NextRequest } from "next/server";

/**
 * Contact form delivery.
 *
 * Sent through Resend's REST API directly rather than their SDK — it is one
 * fetch, and the site otherwise has no runtime dependencies at all.
 *
 * This route reports failure honestly. A form that shows a success screen while
 * dropping the submission is worse than one that plainly errors: the visitor
 * believes they have reached you and never follows up.
 */

const TO = process.env.CONTACT_TO_EMAIL ?? "sales@junosolutions.co";
/*
 * Must be an address on a domain verified in Resend. Resend's sandbox sender
 * (onboarding@resend.dev) is not a usable fallback here: it refuses to deliver
 * to anyone but the account owner, so it would fail on exactly the address this
 * form exists to reach.
 *
 * Replies go to the prospect via reply_to, so this mailbox never needs to
 * receive anything.
 */
const FROM = process.env.CONTACT_FROM_EMAIL ?? "noreply@junosolutions.co";

interface Payload {
  name?: string;
  company?: string;
  role?: string;
  email?: string;
  phone?: string;
  communities?: string;
  message?: string;
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  website?: string;
}

function clean(value: unknown, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }

  // Silently accept and discard bot submissions — telling a scraper it failed
  // only teaches it to try again.
  if (clean(body.website)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 200);
  const company = clean(body.company, 200);
  const email = clean(body.email, 200);

  if (!name || !company || !email) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — submission could not be delivered");
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const lines = [
    `Name:        ${name}`,
    `Company:     ${company}`,
    `Role:        ${clean(body.role, 200) || "—"}`,
    `Email:       ${email}`,
    `Phone:       ${clean(body.phone, 60) || "—"}`,
    `Communities: ${clean(body.communities, 20) || "—"}`,
    "",
    clean(body.message) || "(no message)",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        // Replying goes straight to the prospect rather than to Resend.
        reply_to: email,
        subject: `Juno enquiry — ${company} (${name})`,
        text: lines,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`[contact] Resend rejected the send: ${response.status} ${detail}`);
      // Resend's rejection reason is returned alongside the error. It names the
      // misconfiguration (unverified domain, sandbox recipient restriction) and
      // contains no credentials. The form UI ignores it; it exists so a failure
      // can be diagnosed from a single curl instead of a log hunt.
      return NextResponse.json(
        { ok: false, error: "send_failed", detail: detail.slice(0, 400) },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send threw:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
