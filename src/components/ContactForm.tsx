"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "./ui/Button";

type FieldName =
  | "name"
  | "company"
  | "role"
  | "email"
  | "phone"
  | "communities"
  | "message";

type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Values = {
  name: "",
  company: "",
  role: "",
  email: "",
  phone: "",
  communities: "",
  message: "",
};

// Deliberately permissive: shape check only, not an RFC-complete validator.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts US formats with spaces, dots, dashes, parens, and an optional +1.
const PHONE = /^\+?1?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.company.trim()) errors.company = "Enter your company.";
  if (!values.role.trim()) errors.role = "Enter your role.";

  if (!values.email.trim()) {
    errors.email = "Enter your work email.";
  } else if (!EMAIL.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (values.phone.trim() && !PHONE.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number, or leave this blank.";
  }

  if (!values.communities.trim()) {
    errors.communities = "Enter how many communities you sell.";
  } else {
    const count = Number(values.communities);
    if (!Number.isInteger(count) || count < 1) {
      errors.communities = "Enter a whole number of one or more.";
    }
  }

  return errors;
}

const fieldClass =
  "w-full border-b border-grey-200 bg-transparent py-3 text-base text-ink transition-colors placeholder:text-grey-400 hover:border-grey-400 focus:border-ink focus:outline-none aria-[invalid=true]:border-ink";

export default function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sendFailed, setSendFailed] = useState(false);

  const set = (field: FieldName) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear an error as soon as the person starts fixing it.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstError = Object.keys(found)[0];
    if (firstError) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstError}"]`)
        ?.focus();
      return;
    }

    setSending(true);
    setSendFailed(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });

      if (!response.ok) throw new Error(String(response.status));

      setSubmitted(true);
      setValues(initialValues);
    } catch {
      // Never show a success screen for a message that did not arrive. Someone
      // who believes they have reached you will not follow up.
      setSendFailed(true);
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="border border-grey-200 bg-grey-50 p-8 sm:p-10"
      >
        <h2 className="text-2xl font-semibold tracking-[-0.025em]">
          Thanks, we have it.
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-grey-600">
          Someone from Juno will reach out within one business day to find a
          time. If it is urgent, email us directly at{" "}
          <a
            href="mailto:sales@junosolutions.co"
            className="text-ink underline decoration-grey-400 underline-offset-4 hover:decoration-ink"
          >
            sales@junosolutions.co
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 text-sm font-medium text-grey-600 underline decoration-grey-200 underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: FieldName) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
    className: fieldClass,
  });

  const label = (name: FieldName, text: string, optional = false) => (
    <label
      htmlFor={`${uid}-${name}`}
      className="block font-mono text-xs uppercase tracking-[0.18em] text-grey-500"
    >
      {text}
      {optional ? (
        <span className="ml-2 normal-case tracking-normal text-grey-400">
          Optional
        </span>
      ) : null}
    </label>
  );

  const error = (name: FieldName) =>
    errors[name] ? (
      <p
        id={`${uid}-${name}-error`}
        role="alert"
        className="mt-2 text-sm text-ink"
      >
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative max-w-2xl">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          {label("name", "Name")}
          <input
            {...field("name")}
            type="text"
            autoComplete="name"
            onChange={(e) => set("name")(e.target.value)}
          />
          {error("name")}
        </div>

        <div>
          {label("company", "Company")}
          <input
            {...field("company")}
            type="text"
            autoComplete="organization"
            onChange={(e) => set("company")(e.target.value)}
          />
          {error("company")}
        </div>

        <div>
          {label("role", "Role")}
          <input
            {...field("role")}
            type="text"
            autoComplete="organization-title"
            placeholder="VP of Sales"
            onChange={(e) => set("role")(e.target.value)}
          />
          {error("role")}
        </div>

        <div>
          {label("email", "Work email")}
          <input
            {...field("email")}
            type="email"
            autoComplete="email"
            onChange={(e) => set("email")(e.target.value)}
          />
          {error("email")}
        </div>

        <div>
          {label("phone", "Phone", true)}
          <input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="(512) 555-0134"
            onChange={(e) => set("phone")(e.target.value)}
          />
          {error("phone")}
        </div>

        <div>
          {label("communities", "Number of communities")}
          <input
            {...field("communities")}
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            onChange={(e) => set("communities")(e.target.value)}
          />
          {error("communities")}
        </div>

        <div className="sm:col-span-2">
          {label("message", "Anything else", true)}
          <textarea
            {...field("message")}
            rows={4}
            placeholder="What happens to your after-hours calls today?"
            onChange={(e) => set("message")(e.target.value)}
          />
          {error("message")}
        </div>
      </div>

      {/* Never shown to a person; anything typed here is a bot. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {sendFailed ? (
        <p role="alert" className="mt-8 border border-grey-200 bg-grey-50 p-4 text-sm leading-relaxed text-ink">
          That didn&rsquo;t send. Nothing reached us, so please email{" "}
          <a
            href="mailto:sales@junosolutions.co"
            className="underline decoration-grey-400 underline-offset-4 hover:decoration-ink"
          >
            sales@junosolutions.co
          </a>{" "}
          directly and we&rsquo;ll pick it up from there.
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={sending}>
          {sending ? "Sending…" : "Book a call"}
        </Button>
        <p className="text-sm text-grey-600">
          We reply within one business day.
        </p>
      </div>
    </form>
  );
}
