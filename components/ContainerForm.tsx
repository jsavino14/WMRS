"use client";

import { useState, useRef } from "react";
import { tempContainerForm } from "@/content/site";

const { form } = tempContainerForm;

type FormState = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors";
const labelClass = "block text-sm font-medium text-charcoal mb-1.5";

export function ContainerForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function clientValidate(data: FormData): string | null {
    const name = (data.get("name") as string | null)?.trim();
    const company = (data.get("company") as string | null)?.trim();
    const email = (data.get("email") as string | null)?.trim();
    const deliveryAddress = (data.get("deliveryAddress") as string | null)?.trim();
    if (!name || !company || !email || !deliveryAddress) return form.errorRequired;
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
      const res = await fetch("/api/container-request", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setState("success");
        formRef.current?.reset();
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg((json as { error?: string }).error ?? form.errorGeneric);
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
        <div>
          <label htmlFor="cr-name" className={labelClass}>
            {form.fields.name.label} <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="cr-name" name="name" type="text" required
            placeholder={form.fields.name.placeholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cr-company" className={labelClass}>
            {form.fields.company.label} <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="cr-company" name="company" type="text" required
            placeholder={form.fields.company.placeholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cr-email" className={labelClass}>
            {form.fields.email.label} <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="cr-email" name="email" type="email" required
            placeholder={form.fields.email.placeholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cr-phone" className={labelClass}>
            {form.fields.phone.label}
            <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="cr-phone" name="phone" type="tel"
            placeholder={form.fields.phone.placeholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cr-deliveryAddress" className={labelClass}>
          {form.fields.deliveryAddress.label} <span className="text-charcoal/40">*</span>
        </label>
        <input
          id="cr-deliveryAddress" name="deliveryAddress" type="text" required
          placeholder={form.fields.deliveryAddress.placeholder}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="cr-containerSize" className={labelClass}>
            {form.fields.containerSize.label}
          </label>
          <input
            id="cr-containerSize" name="containerSize" type="text"
            placeholder={form.fields.containerSize.placeholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cr-materialType" className={labelClass}>
            {form.fields.materialType.label}
          </label>
          <input
            id="cr-materialType" name="materialType" type="text"
            placeholder={form.fields.materialType.placeholder}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cr-deliveryDate" className={labelClass}>
          {form.fields.deliveryDate.label}
        </label>
        <input
          id="cr-deliveryDate" name="deliveryDate" type="text"
          placeholder={form.fields.deliveryDate.placeholder}
          className={inputClass}
        />
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
        {state === "loading" ? "Sending..." : form.submit}
      </button>
    </form>
  );
}
