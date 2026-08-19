"use client";

import { useState, useRef } from "react";
import { contact } from "@/content/site";

const { form } = contact;

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function clientValidate(data: FormData): string | null {
    const file = data.get("file") as File | null;
    const name = (data.get("name") as string)?.trim();
    const company = (data.get("company") as string)?.trim();
    const email = (data.get("email") as string)?.trim();

    if (!name || !company || !email) return form.errorRequired;

    if (file && file.size > 0) {
      const allowed = ["application/pdf", "image/png", "image/jpeg"];
      if (!allowed.includes(file.type)) return form.errorFileType;
      if (file.size > 10 * 1024 * 1024) return form.errorFileSize;
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
      const res = await fetch("/api/invoice-upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setState("success");
        formRef.current?.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error ?? form.errorGeneric);
        setState("error");
      }
    } catch {
      setErrorMsg(form.errorGeneric);
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="border border-accent/30 bg-accent/5 p-8">
        <div className="w-8 h-px bg-accent mb-4" />
        <p className="text-base font-medium text-charcoal">{form.success}</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
            {form.fields.name.label} <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={form.fields.name.placeholder}
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-charcoal mb-1.5">
            {form.fields.company.label} <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder={form.fields.company.placeholder}
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1.5">
            {form.fields.email.label} <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={form.fields.email.placeholder}
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-1.5">
            {form.fields.phone.label}
            <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={form.fields.phone.placeholder}
            className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors"
          />
        </div>
      </div>

      {/* Locations */}
      <div>
        <label htmlFor="locations" className="block text-sm font-medium text-charcoal mb-1.5">
          {form.fields.locations.label}
        </label>
        <select
          id="locations"
          name="locations"
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal focus:outline-none focus:border-charcoal transition-colors appearance-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231E2428' stroke-width='1.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
        >
          <option value="">Select…</option>
          {form.fields.locations.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* What are you looking for? */}
      <fieldset>
        <legend className="block text-sm font-medium text-charcoal mb-3">
          {form.fields.lookingFor.label} <span className="text-charcoal/40">*</span>
        </legend>
        <div className="flex flex-col sm:flex-row gap-3">
          {form.fields.lookingFor.options.map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="lookingFor"
                value={opt}
                required
                className="w-4 h-4 accent-charcoal cursor-pointer"
              />
              <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* File upload */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-charcoal mb-1.5">
          {form.fields.file.label}
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal/70 file:mr-4 file:py-0 file:px-4 file:border-0 file:bg-charcoal file:text-white file:text-xs file:font-semibold file:cursor-pointer cursor-pointer focus:outline-none focus:border-charcoal transition-colors"
        />
        <p className="mt-1.5 text-xs text-charcoal/40">{form.fields.file.hint}</p>
      </div>

      {/* Error message */}
      {state === "error" && errorMsg && (
        <div className="border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="bg-charcoal text-white text-sm font-semibold px-8 py-4 hover:bg-charcoal/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Sending…" : form.submit}
      </button>
    </form>
  );
}
