import { put } from "@vercel/blob";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { company } from "@/content/site";

// ─── Rate limiter (in-memory, per serverless instance) ───────────────────────
// Good enough for v1 — replace with Upstash Redis for true cross-instance limiting.

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
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

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
]);
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  // Determine client IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  // Parse form data
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  // ── Honeypot ────────────────────────────────────────────────────────────────
  const honeypot = formData.get("website");
  if (honeypot) {
    // Bot filled the hidden field — silently succeed
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
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const companyName = (formData.get("company") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const locations = (formData.get("locations") as string | null) ?? "";
  const file = formData.get("file") as File | null;

  if (!name || !companyName || !email) {
    return NextResponse.json(
      { error: "Name, company, and email are required." },
      { status: 400 }
    );
  }

  if (!file || file.size === 0) {
    return NextResponse.json(
      { error: "Please attach an invoice." },
      { status: 400 }
    );
  }

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

  // ── Log submission regardless of downstream success ──────────────────────────
  console.log("[invoice-upload]", {
    name,
    company: companyName,
    email,
    phone,
    locations,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    ip,
    timestamp: new Date().toISOString(),
  });

  // ── Upload to Vercel Blob ───────────────────────────────────────────────────
  let fileUrl: string | null = null;
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken) {
    try {
      const slug = `${Date.now()}-${file.name.replace(/[^a-z0-9._-]/gi, "_")}`;
      const blob = await put(`invoices/${slug}`, file, {
        access: "public",
        token: blobToken,
      });
      fileUrl = blob.url;
    } catch (err) {
      console.error("[invoice-upload] Blob upload failed:", err);
      // Continue — don't crash the submission
    }
  } else {
    console.warn(
      "[invoice-upload] BLOB_READ_WRITE_TOKEN not set — file not stored remotely."
    );
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
        subject: `Invoice submission — ${companyName}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;color:#1E2428">
            <h2 style="margin-bottom:24px">New Invoice Submission</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600;width:140px">Name</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(name)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Company</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(companyName)}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Email</td><td style="padding:8px 0;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Phone</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(phone) || "—"}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #eee;font-weight:600">Locations</td><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(locations) || "—"}</td></tr>
              <tr><td style="padding:8px 0;font-weight:600">Invoice</td><td style="padding:8px 0">${fileUrl ? `<a href="${escapeHtml(fileUrl)}">${escapeHtml(file.name)}</a>` : `${escapeHtml(file.name)} (not stored — check logs)`}</td></tr>
            </table>
          </div>
        `,
      });
    } catch (err) {
      console.error("[invoice-upload] Email send failed:", err);
      // Don't fail the response — submission is logged
    }
  } else {
    console.warn(
      "[invoice-upload] RESEND_API_KEY not set — email notification skipped."
    );
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
