"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const PROJECT_TYPES = [
  "Site vitrine",
  "E-commerce",
  "Refonte de site",
  "Identité visuelle",
  "Autre",
] as const;

const BUDGETS = [
  "Moins de 5 k€",
  "5 — 10 k€",
  "10 — 20 k€",
  "20 k€+",
  "Je ne sais pas encore",
] as const;

const labelClass =
  "block text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#0C4323]/65";

const fieldBase =
  "mt-3 w-full bg-transparent border-0 border-b border-[#0C4323]/20 px-0 py-3 text-[1rem] leading-[1.4] text-[#0C4323] placeholder:text-[#0C4323]/35 focus:border-[#0C4323] focus:outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const projectType = String(data.get("projectType") || "");
    const budget = String(data.get("budget") || "");
    const message = String(data.get("message") || "").trim();

    const subject = `Nouveau projet — ${name || "Contact"}`;
    const lines = [
      "Bonjour Vallerio,",
      "",
      `— Nom : ${name}`,
      `— Email : ${email}`,
      ...(projectType ? [`— Type : ${projectType}`] : []),
      ...(budget ? [`— Budget : ${budget}`] : []),
      "",
      "Message :",
      message,
    ];
    const body = lines.join("\n");

    window.location.href = `mailto:hello@valleriostudio.fr?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section
      className="w-full bg-[#FDF6EC] px-5 pb-24 pt-12 text-[#0C4323] sm:px-10 sm:pb-40 sm:pt-20 md:pb-48"
      aria-label="Formulaire de contact"
    >
      <div className="mx-auto w-full max-w-[42rem]">
        {sent ? (
          <SuccessPanel onReset={() => setSent(false)} />
        ) : (
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-10 sm:gap-12"
            noValidate
          >
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
              <Field id="contact-name" label="Nom complet">
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={fieldBase}
                  placeholder="Jean Dupont"
                />
              </Field>
              <Field id="contact-email" label="Email">
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={fieldBase}
                  placeholder="jean@exemple.com"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
              <Field id="contact-project" label="Type de projet">
                <SelectField
                  id="contact-project"
                  name="projectType"
                  options={PROJECT_TYPES}
                />
              </Field>
              <Field id="contact-budget" label="Budget">
                <SelectField
                  id="contact-budget"
                  name="budget"
                  options={BUDGETS}
                />
              </Field>
            </div>

            <Field id="contact-message" label="Votre message">
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                className={`${fieldBase} resize-y`}
                placeholder="Parlez-nous de votre projet…"
              />
            </Field>

            <div className="mt-2 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#0C4323] px-8 py-3.5 text-[0.92rem] font-medium tracking-[0.02em] text-[#FDF6EC] transition-[transform,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-transparent hover:text-[#0C4323] hover:shadow-[0_0_0_1.5px_#0C4323] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C4323]/30 focus-visible:ring-offset-4 focus-visible:ring-offset-[#FDF6EC]"
              >
                Envoyer
                <span
                  aria-hidden
                  className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              <p className="text-[0.78rem] text-[#0C4323]/55">
                Réponse sous 24 h.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─── Sub-components ──────────────────────────────────────── */

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectField({
  id,
  name,
  options,
}: {
  id: string;
  name: string;
  options: ReadonlyArray<string>;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue=""
        className={`${fieldBase} appearance-none bg-[#FDF6EC] pr-9`}
      >
        <option value="" disabled>
          Sélectionner…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-1 top-[calc(50%+6px)] -translate-y-1/2 text-[#0C4323]/55"
      >
        <svg
          width="12"
          height="8"
          viewBox="0 0 14 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 1.5l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-start gap-5 py-12">
      <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-[#0C4323]/55">
        Message prêt à partir
      </p>
      <h3 className="m-0 max-w-[28rem] text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.1] tracking-[-0.01em]">
        Votre client mail est ouvert.
      </h3>
      <p className="max-w-[32rem] text-[0.95rem] leading-[1.55] text-[#0C4323]/70">
        Vérifiez les détails et envoyez — on revient vers vous sous 24 h. Vous
        pouvez aussi nous écrire directement à{" "}
        <a
          href="mailto:hello@valleriostudio.fr"
          className="underline decoration-[#0C4323]/30 underline-offset-4 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:decoration-[#0C4323]"
        >
          hello@valleriostudio.fr
        </a>
        .
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-3 inline-flex items-center gap-2 text-[0.85rem] text-[#0C4323]/80 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-[#0C4323]"
      >
        ← Modifier ma demande
      </button>
    </div>
  );
}
