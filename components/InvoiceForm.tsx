"use client";

import { useState, useRef } from "react";
import { company } from "@/content/site";

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors";
const labelClass = "block text-sm font-medium text-charcoal mb-1.5";

interface InvoiceFormProps {
  page: string;
}

export function InvoiceForm({ page }: InvoiceFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function clientValidate(data: FormData): string | null {
    const name = (data.get("name") as string | null)?.trim();
    const comp = (data.get("company") as string | null)?.trim();
    const email = (data.get("email") as string | null)?.trim();
    if (!name || !comp || !email) return "Name, company, and email are required.";

    const file = data.get("file") as File | null;
    if (!file || file.size === 0) return "Please attach an invoice.";

    const allowed = ["application/pdf", "image/png", "image/jpeg", "image/heic", "image/heif"];
    if (!allowed.includes(file.type)) return "File must be a PDF, PNG, JPG, or HEIC.";
    if (file.size > 8 * 1024 * 1024) return "File must be under 8 MB.";

    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const clientError = clientValidate(data);
    if (clientError) {
      setErrorMsg(clientError);
      setState("error");
      return;
    }

    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/invoice-upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setState("success");
        formRef.current?.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg((json as { error?: string }).error ?? "Something went wrong. Please try again or call us directly.");
        setState("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again or call us directly.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-accent/30 bg-accent/5 p-8">
        <p className="text-base font-medium text-charcoal">
          Got it. We&apos;ll review your invoice and tell you what we find.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot — bots fill this, humans don't see it */}
      <input
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        autoComplete="off"
      />

      {/* Hidden page identifier */}
      <input type="hidden" name="page" value={page} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="if-name" className={labelClass}>
            Name <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="if-name" name="name" type="text" required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="if-company" className={labelClass}>
            Company <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="if-company" name="company" type="text" required
            placeholder="Company name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="if-email" className={labelClass}>
            Email <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="if-email" name="email" type="email" required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="if-phone" className={labelClass}>
            Phone
            <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="if-phone" name="phone" type="tel"
            placeholder="Optional"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="if-file" className={labelClass}>
          Invoice <span className="text-charcoal/40">*</span>
        </label>
        <input
          id="if-file"
          name="file"
          type="file"
          required
          accept=".pdf,.png,.jpg,.jpeg,.heic,.heif,application/pdf,image/png,image/jpeg,image/heic,image/heif"
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal/70 file:mr-4 file:py-0 file:px-4 file:border-0 file:bg-charcoal file:text-white file:text-xs file:font-semibold file:cursor-pointer cursor-pointer focus:outline-none focus:border-charcoal transition-colors"
        />
        <p className="mt-1.5 text-xs text-charcoal/40">PDF, PNG, JPG, or HEIC — max 8 MB</p>
      </div>

      {state === "error" && errorMsg && (
        <div className="border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-charcoal text-white text-sm font-semibold px-8 py-4 hover:bg-charcoal/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Sending…" : "Send invoice"}
      </button>
    </form>
  );
}
