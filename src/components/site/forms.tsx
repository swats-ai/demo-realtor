"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  full?: boolean;
  required?: boolean;
  autoComplete?: string;
};

/*
  Formularios del sitio. Solo UI (demo): al enviar muestran un estado de
  confirmación en vez de llamar a un backend. Cada campo lleva <label>
  visible para lectores de pantalla (sr-only) además del placeholder.
*/

function Field({ field, tone }: { field: FormField; tone: "dark" | "light" }) {
  const id = useId();
  const base = cn(
    "w-full rounded-xl border px-4 py-3.5 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-amber",
    tone === "dark"
      ? "border-bone/25 bg-bone/10 text-bone placeholder:text-bone/65 backdrop-blur focus:border-amber"
      : "border-ink/15 bg-bone text-ink placeholder:text-ink-soft/80 focus:border-amber-deep",
  );
  const wrap = field.full ? "sm:col-span-2" : "";
  const label = (
    <label htmlFor={id} className="sr-only">
      {field.label}
      {field.required ? " (required)" : ""}
    </label>
  );
  if (field.type === "textarea") {
    return (
      <div className={wrap}>
        {label}
        <textarea id={id} name={field.name} placeholder={field.label} required={field.required} rows={4} className={cn(base, "resize-none")} />
      </div>
    );
  }
  if (field.type === "select") {
    return (
      <div className={wrap}>
        {label}
        <select
          id={id}
          name={field.name}
          required={field.required}
          defaultValue=""
          className={cn(base, "appearance-none", tone === "dark" ? "text-bone/65 [&:valid]:text-bone" : "text-ink-soft [&:valid]:text-ink")}
        >
          <option value="" disabled>
            {field.label}
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className={wrap}>
      {label}
      <input
        id={id}
        type={field.type ?? "text"}
        name={field.name}
        placeholder={field.label}
        required={field.required}
        autoComplete={field.autoComplete}
        className={base}
      />
    </div>
  );
}

export function ContactForm({
  fields,
  submitLabel = "Send message",
  tone = "dark",
  successTitle = "Thank you. We read every message ourselves.",
  successText = "Expect a reply from a person, not a bot, within one business day.",
}: {
  fields: FormField[];
  submitLabel?: string;
  tone?: "dark" | "light";
  successTitle?: string;
  successText?: string;
}) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div role="status" aria-live="polite" className={cn("rounded-2xl border p-6", tone === "dark" ? "border-bone/20 bg-bone/10 text-bone" : "border-ink/10 bg-paper-2 text-ink")}>
        <p className="font-display text-2xl">{successTitle}</p>
        <p className={cn("mt-2 text-[0.95rem] leading-relaxed", tone === "dark" ? "text-bone/75" : "text-ink-soft")}>{successText}</p>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {fields.map((f) => (
        <Field key={f.name} field={f} tone={tone} />
      ))}
      <button
        type="submit"
        className={cn(
          "mt-2 w-full cursor-pointer rounded-xl py-4 font-display text-[0.98rem] font-semibold transition sm:col-span-2",
          tone === "dark" ? "bg-bone text-ink hover:bg-amber" : "bg-ink text-bone hover:bg-amber-deep",
        )}
      >
        {submitLabel}
      </button>
    </form>
  );
}

export function NewsletterForm({
  placeholder = "Your email",
  buttonLabel = "Subscribe",
}: {
  placeholder?: string;
  buttonLabel?: string;
}) {
  const id = useId();
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <p role="status" aria-live="polite" className="mt-7 max-w-xl rounded-xl border border-bone/20 bg-bone/10 px-5 py-4 font-display text-lg text-bone">
        You are on the list. The next letter goes out on the first of the month.
      </p>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={placeholder}
        className="h-12 flex-1 rounded-xl border border-bone/20 bg-bone px-4 text-[0.95rem] text-ink placeholder:text-ink-soft/80 focus:outline-none focus:ring-2 focus:ring-amber"
      />
      <button
        type="submit"
        className="h-12 shrink-0 cursor-pointer rounded-xl border border-bone/30 bg-bone/10 px-7 font-display text-[0.95rem] font-semibold text-bone backdrop-blur transition hover:bg-amber hover:text-ink"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
