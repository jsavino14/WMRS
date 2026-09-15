import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { company } from "@/content/site";

// ─── Rate limiter (in-memory, per serverless instance) ───────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count++;
  return false;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // ── Honeypot ────────────────────────────────────────────────────────────────
  const honeypot = formData.get("website");
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  // ── Rate limit ──────────────────────────────────────────────────────────────
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later or call us directly." },
      { status: 429 }
    );
  }

  // ── Extract and validate fields ─────────────────────────────────────────────
  const name            = (formData.get("name")            as string | null)?.trim() ?? "";
  const companyName     = (formData.get("company")         as string | null)?.trim() ?? "";
  const email           = (formData.get("email")           as string | null)?.trim() ?? "";
  const phone           = (formData.get("phone")           as string | null)?.trim() ?? "";
  const deliveryAddress = (formData.get("deliveryAddress") as string | null)?.trim() ?? "";
  const containerSize   = (formData.get("containerSize")   as string | null)?.trim() ?? "";
  const materialType    = (formData.get("materialType")    as string | null)?.trim() ?? "";
  const deliveryDate    = (formData.get("deliveryDate")    as string | null)?.trim() ?? "";

  if (!name || !companyName || !email || !deliveryAddress) {
    return NextResponse.json(
      { error: "Name, company, email, and delivery address are required." },
      { status: 400 }
    );
  }

  // ── Log submission ──────────────────────────────────────────────────────────
  console.log("[container-request]", {
    name, company: companyName, email, phone,
    deliveryAddress, containerSize, materialType, deliveryDate,
    ip, timestamp: new Date().toISOString(),
  });

  // ── Send notification email via Resend ──────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "WMRS Form <noreply@wmrservice.com>",
        to: company.containerNotificationEmail,
        replyTo: email,
        subject: `Request a delivery - Temporary container - /services/temp-containers`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;color:#1E2428">
            <h2 style="margin-bottom:24px">New Container Request</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600;width:160px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Company</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(companyName)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(phone) || "-"}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Delivery Address</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(deliveryAddress)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Container Size</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(containerSize) || "-"}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Material Type</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(materialType) || "-"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600">Delivery Date</td><td style="padding:8px 0">${escapeHtml(deliveryDate) || "-"}</td></tr>
            </table>
          </div>
        `,
      });
    } catch (err) {
      console.error("[container-request] Email send failed:", err);
    }
  } else {
    console.warn("[container-request] RESEND_API_KEY not set - email notification skipped.");
  }

  return NextResponse.json({ success: true });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
