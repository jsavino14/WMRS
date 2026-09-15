"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "loading" | "success" | "error";
type WhatYouNeed = "Temporary container" | "Portable restrooms" | "Both";

const inputClass =
  "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors";
const labelClass = "block text-sm font-medium text-charcoal mb-1.5";

interface DeliveryFormProps {
  defaultSelection: WhatYouNeed;
  page: string;
}

export function DeliveryForm({ defaultSelection, page }: DeliveryFormProps) {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatYouNeed, setWhatYouNeed] = useState<WhatYouNeed>(defaultSelection);
  const formRef = useRef<HTMLFormElement>(null);

  const showContainer = whatYouNeed === "Temporary container" || whatYouNeed === "Both";
  const showRestrooms = whatYouNeed === "Portable restrooms" || whatYouNeed === "Both";

  function clientValidate(data: FormData): string | null {
    const name = (data.get("name") as string | null)?.trim();
    const comp = (data.get("company") as string | null)?.trim();
    const email = (data.get("email") as string | null)?.trim();
    const deliveryAddress = (data.get("deliveryAddress") as string | null)?.trim();
    if (!name || !comp || !email || !deliveryAddress)
      return "Name, company, email, and delivery address are required.";
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
        setWhatYouNeed(defaultSelection);
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
          Request received. We will follow up within one business day.
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

      {/* What do you need? */}
      <fieldset>
        <legend className={labelClass}>
          What do you need?
        </legend>
        <div className="flex flex-col sm:flex-row gap-3">
          {(["Temporary container", "Portable restrooms", "Both"] as WhatYouNeed[]).map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="radio"
                name="whatYouNeed"
                value={opt}
                checked={whatYouNeed === opt}
                onChange={() => setWhatYouNeed(opt)}
                className="w-4 h-4 accent-charcoal cursor-pointer"
              />
              <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="df-name" className={labelClass}>
            Name <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="df-name" name="name" type="text" required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="df-company" className={labelClass}>
            Company <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="df-company" name="company" type="text" required
            placeholder="Company name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="df-email" className={labelClass}>
            Email <span className="text-charcoal/40">*</span>
          </label>
          <input
            id="df-email" name="email" type="email" required
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="df-phone" className={labelClass}>
            Phone
            <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
          </label>
          <input
            id="df-phone" name="phone" type="tel"
            placeholder="Optional"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="df-deliveryAddress" className={labelClass}>
          Delivery Address <span className="text-charcoal/40">*</span>
        </label>
        <input
          id="df-deliveryAddress" name="deliveryAddress" type="text" required
          placeholder="Street address, city, state, zip"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="df-deliveryDate" className={labelClass}>
          Delivery Date Needed
          <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
        </label>
        <input
          id="df-deliveryDate" name="deliveryDate" type="text"
          placeholder="MM/DD/YYYY"
          className={inputClass}
        />
      </div>

      {/* Container-specific fields */}
      {showContainer && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="df-containerSize" className={labelClass}>
              Container Size
              <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
            </label>
            <input
              id="df-containerSize" name="containerSize" type="text"
              placeholder="e.g. 10 yard, 20 yard, 30 yard"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="df-materialType" className={labelClass}>
              Material Type
              <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
            </label>
            <input
              id="df-materialType" name="materialType" type="text"
              placeholder="e.g. Construction debris, mixed waste"
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Restroom-specific fields */}
      {showRestrooms && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="df-numberOfUnits" className={labelClass}>
              Number of Units
              <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
            </label>
            <input
              id="df-numberOfUnits" name="numberOfUnits" type="number" min="1"
              placeholder="e.g. 4"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              ADA Accessible Units Needed?
              <span className="text-charcoal/35 font-normal ml-1">(optional)</span>
            </label>
            <div className="flex gap-6 pt-2">
              {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="adaUnits"
                    value={opt}
                    className="w-4 h-4 accent-charcoal cursor-pointer"
                  />
                  <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

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
        {state === "loading" ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
