"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "loading" | "success" | "error";

const WHAT_OPTIONS = [
  "Equipment financing, rental, or repair",
  "Tank removal, Phase II, or cleanup",
  "ESG and diversion reporting",
  "International catering waste",
  "Something else",
] as const;

const TIMELINE_OPTIONS = [
  "No fixed date",
  "Within 30 days",
  "Within 90 days",
  "Driven by a closing or a deadline",
] as const;

const inputClass =
  "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors";
const selectClass =
  "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors appearance-none";
const selectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231E2428' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 12px center",
};
const labelClass = "block text-sm font-medium text-charcoal mb-1.5";

interface ProjectFormProps {
  defaultSelection: string;
  page: string;
}

export function ProjectForm({ defaultSelection, page }: ProjectFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function clientValidate(data: FormData): string | null {
    const name = (data.get("name") as string | null)?.trim();
    const comp = (data.get("company") as string | null)?.trim();
    const email = (data.get("email") as string | null)?.trim();
    const whatYouNeed = (data.get("whatYouNeed") as string | null)?.trim();
    const timeline = (data.get("timeline") as string | null)?.trim();
    const message = (data.get("message") as string | null)?.trim();

    if (!name || !comp || !email || !whatYouNeed || !timeline || !message) {
      return "Name, company, email, what you need, timeline, and a message are required.";
    }

    const file = data.get("file") as File | null;
    if (file && file.size > 0) {
      const allowed = ["application/pdf", "image/png", "image/jpeg"];
      if (!allowed.includes(file.type)) return "File must be a PDF, PNG, or JPG.";
      if (file.size > 10 * 1024 * 1024) return "File must be under 10 MB.";
    }

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
      const res = await fetch("/api/project-request", {
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
          Got it. Someone will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        autoComplete="off"
      />

      <input type="hidden" name="page" value={page} />

      {/* Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="pf-name" className={labelClass}>
            Name <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="pf-name" name="name" type="text" required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pf-company" className={labelClass}>
            Company <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="pf-company" name="company" type="text" required
            placeholder="Company name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pf-email" className={labelClass}>
            Email <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="pf-email" name="email" type="email" required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="pf-phone" className={labelClass}>
            Phone
            <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="pf-phone" name="phone" type="tel"
            placeholder="Optional"
            className={inputClass}
          />
        </div>
      </div>

      {/* What can we help with */}
      <div>
        <label htmlFor="pf-whatYouNeed" className={labelClass}>
          What can we help with <span className="text-charcoal/40">*</span>
        </label>
        <select
          id="pf-whatYouNeed"
          name="whatYouNeed"
          required
          defaultValue={defaultSelection}
          className={selectClass}
          style={selectStyle}
        >
          <option value="" disabled>Select…</option>
          {WHAT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Site or property location */}
      <div>
        <label htmlFor="pf-siteLocation" className={labelClass}>
          Site or property location
          <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
        </label>
        <input
          id="pf-siteLocation" name="siteLocation" type="text"
          placeholder="City, state, or address"
          className={inputClass}
        />
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="pf-timeline" className={labelClass}>
          Timeline <span className="text-charcoal/40">*</span>
        </label>
        <select
          id="pf-timeline"
          name="timeline"
          required
          defaultValue=""
          className={selectClass}
          style={selectStyle}
        >
          <option value="" disabled>Select…</option>
          {TIMELINE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Tell us what you need */}
      <div>
        <label htmlFor="pf-message" className={labelClass}>
          Tell us what you need <span className="text-charcoal/40">*</span>
        </label>
        <textarea
          id="pf-message"
          name="message"
          rows={4}
          required
          placeholder="Site, timeline, what you currently have, what you need."
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors resize-none"
        />
      </div>

      {/* Attachment */}
      <div>
        <label htmlFor="pf-file" className={labelClass}>
          Attachment
          <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
        </label>
        <input
          id="pf-file"
          name="file"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal/70 file:mr-4 file:py-0 file:px-4 file:border-0 file:bg-charcoal file:text-white file:text-xs file:font-semibold file:cursor-pointer cursor-pointer focus:outline-none focus:border-charcoal transition-colors"
        />
        <p className="mt-1.5 text-xs text-charcoal/40">PDF, PNG, or JPG — max 10 MB</p>
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
        {state === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
