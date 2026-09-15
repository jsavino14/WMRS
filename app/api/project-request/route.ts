import { put } from "@vercel/blob";
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

// ─── File validation ──────────────────────────────────────────────────────────

const ALLOWED_TYPES = new Set(["application/pdf", "image/png", "image/jpeg"]);
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

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
  const name        = (formData.get("name")          as string | null)?.trim() ?? "";
  const companyName = (formData.get("company")        as string | null)?.trim() ?? "";
  const email       = (formData.get("email")          as string | null)?.trim() ?? "";
  const phone       = (formData.get("phone")          as string | null)?.trim() ?? "";
  const whatYouNeed = (formData.get("whatYouNeed")    as string | null)?.trim() ?? "";
  const message     = (formData.get("message")        as string | null)?.trim() ?? "";
  const page        = (formData.get("page")           as string | null)?.trim() ?? "";
  const file        = formData.get("file") as File | null;

  if (!name || !companyName || !email) {
    return NextResponse.json(
      { error: "Name, company, and email are required." },
      { status: 400 }
    );
  }

  if (file && file.size > 0) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "File must be PDF, PNG, or JPG." },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "File must be under 10 MB." },
        { status: 400 }
      );
    }
  }

  // ── Log submission ──────────────────────────────────────────────────────────
  console.log("[project-request]", {
    name, company: companyName, email, phone, whatYouNeed, message,
    hasFile: file && file.size > 0,
    page, ip, timestamp: new Date().toISOString(),
  });

  // ── Upload file to Vercel Blob (if present) ─────────────────────────────────
  let fileUrl: string | null = null;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (file && file.size > 0 && blobToken) {
    try {
      const slug = `${Date.now()}-${file.name.replace(/[^a-z0-9._-]/gi, "_")}`;
      const blob = await put(`project-requests/${slug}`, file, {
        access: "public",
        token: blobToken,
      });
      fileUrl = blob.url;
    } catch (err) {
      console.error("[project-request] Blob upload failed:", err);
    }
  }

  // ── Send notification email via Resend ──────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: "WMRS Form <noreply@wmrservice.com>",
        to: company.notificationEmail,
        replyTo: email,
        subject: `Project inquiry — ${whatYouNeed} — ${page}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;color:#1E2428">
            <h2 style="margin-bottom:24px">New Project Inquiry</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600;width:160px">What they need</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(whatYouNeed) || "—"}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Company</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(companyName)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(phone) || "—"}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Message</td><td style="padding:8px 0;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(message) || "—"}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Page</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(page) || "—"}</td></tr>
              ${file && file.size > 0 ? `<tr><td style="padding:8px 0;font-weight:600">Attachment</td><td style="padding:8px 0">${fileUrl ? `<a href="${escapeHtml(fileUrl)}">${escapeHtml(file.name)}</a>` : `${escapeHtml(file.name)} (not stored — check logs)`}</td></tr>` : ""}
            </table>
          </div>
        `,
      });
    } catch (err) {
      console.error("[project-request] Email send failed:", err);
    }
  } else {
    console.warn("[project-request] RESEND_API_KEY not set — email notification skipped.");
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
