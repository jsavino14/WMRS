"use client";

import { useState, useRef } from "react";

type FormState = "idle" | "loading" | "success" | "error";
type WhatYouNeed = "Temporary container" | "Portable restrooms" | "Both";

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
          Request received. Someone will be in touch.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
      {/* Honeypot — bots fill this, humans don't see it */}
      <input type="text" name="website" aria-hidden="true" tabIndex={-1} className="absolute opacity-0 pointer-events-none w-0 h-0" autoComplete="off" />
      <input type="hidden" name="page" value={page} />

      <div>
        <label htmlFor="df-name" className={labelClass}>Name <span className="text-charcoal/40">*</span></label>
        <input id="df-name" name="name" type="text" required placeholder="Your name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="df-company" className={labelClass}>Company <span className="text-charcoal/40">*</span></label>
        <input id="df-company" name="company" type="text" required placeholder="Company name" className={inputClass} />
      </div>
      <div>
        <label htmlFor="df-phone" className={labelClass}>Phone <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
        <input id="df-phone" name="phone" type="tel" placeholder="Optional" className={inputClass} />
      </div>

      <div>
        <label htmlFor="df-email" className={labelClass}>Email <span className="text-charcoal/40">*</span></label>
        <input id="df-email" name="email" type="email" required placeholder="you@company.com" className={inputClass} />
      </div>
      <div>
        <label htmlFor="df-whatYouNeed" className={labelClass}>What do you need <span className="text-charcoal/40">*</span></label>
        <select
          id="df-whatYouNeed" name="whatYouNeed" required
          value={whatYouNeed}
          onChange={(e) => setWhatYouNeed(e.target.value as WhatYouNeed)}
          className={selectClass} style={selectStyle}
        >
          {(["Temporary container", "Portable restrooms", "Both"] as WhatYouNeed[]).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="df-deliveryDate" className={labelClass}>Delivery date needed <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
        <input id="df-deliveryDate" name="deliveryDate" type="text" placeholder="MM/DD/YYYY" className={inputClass} />
      </div>

      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <label htmlFor="df-deliveryAddress" className={labelClass}>Delivery address <span className="text-charcoal/40">*</span></label>
        <input id="df-deliveryAddress" name="deliveryAddress" type="text" required placeholder="Street address, city, state, zip" className={inputClass} />
      </div>

      {showContainer && (
        <>
          <div>
            <label htmlFor="df-howLong" className={labelClass}>How long do you need it <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
            <input id="df-howLong" name="howLong" type="text" placeholder="e.g. 1 week, 1 month, ongoing" className={inputClass} />
          </div>
          <div>
            <label htmlFor="df-containerSize" className={labelClass}>Container size <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
            <input id="df-containerSize" name="containerSize" type="text" placeholder="e.g. 10 yard, 20 yard, 30 yard" className={inputClass} />
          </div>
          <div>
            <label htmlFor="df-materialType" className={labelClass}>Material type <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
            <input id="df-materialType" name="materialType" type="text" placeholder="e.g. Construction debris, mixed waste" className={inputClass} />
          </div>
        </>
      )}

      {showRestrooms && (
        <>
          <div>
            <label htmlFor="df-numberOfUnits" className={labelClass}>Number of units <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
            <input id="df-numberOfUnits" name="numberOfUnits" type="number" min="1" placeholder="e.g. 4" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>ADA accessible units needed? <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
            <div className="flex gap-6 pt-1">
              {["Yes", "No"].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="adaUnits" value={opt} className="w-4 h-4 accent-charcoal cursor-pointer" />
                  <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <label htmlFor="df-notes" className={labelClass}>Site access notes or anything else <span className="text-charcoal/35 font-normal ml-1">(optional)</span></label>
        <textarea
          id="df-notes" name="notes" rows={3}
          placeholder="Gate codes, site hours, contact on site, anything else we should know."
          className="w-full border border-charcoal/20 bg-white px-4 py-3 text-sm placeholder:text-charcoal/30 focus:outline-none focus:border-charcoal transition-colors resize-none overflow-hidden"
          onInput={(e) => { const el = e.currentTarget; el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; }}
        />
      </div>

      {state === "error" && errorMsg && (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{errorMsg}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="justify-self-start bg-charcoal text-white text-sm font-semibold px-8 py-4 hover:bg-charcoal/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
