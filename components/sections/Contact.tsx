"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { budgets, contacts } from "@/data";
import { socials } from "@/lib/links";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 block w-full bg-surface-2 px-4 text-body text-ink placeholder:text-muted outline-none transition-shadow focus:ring-2 focus:ring-inset focus:ring-accent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="frame py-28 md:py-44">
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 id="contact-title" className="display text-head">
              {contacts.title}
            </h2>
          </Reveal>
          <Reveal order={1}>
            <p className="mt-8 max-w-[36ch] text-lead leading-snug">
              Let&apos;s talk. <span className="text-muted">{contacts.subtitle}</span>
            </p>
            <div className="mt-10">
              <ButtonLink href={`mailto:${contacts.email}`}>Email {contacts.email}</ButtonLink>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-small">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-muted underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal order={2} className="lg:col-span-6 lg:col-start-7">
          {status === "sent" ? (
            <div className="bg-surface p-8" role="status">
              <p className="text-lead font-medium">Thanks, your message is in.</p>
              <p className="mt-2 text-muted">I&apos;ll reply within 24 hours. Keep an eye on your inbox.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-small underline decoration-muted underline-offset-4 hover:decoration-accent"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="block text-small text-muted">
                  Your name
                  <input name="name" required autoComplete="name" className={`${field} h-14`} />
                </label>
                <label className="block text-small text-muted">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={`${field} h-14`} />
                </label>
              </div>
              <label className="block text-small text-muted">
                Budget
                <select name="budget" defaultValue="" required className={`${field} h-14 appearance-none`}>
                  <option value="" disabled>
                    Choose a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
              <label className="block text-small text-muted">
                About your project
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What do you need, and by when?"
                  className={`${field} resize-y py-3`}
                />
              </label>
              {/* Honeypot: bots fill it, people never see it */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex h-12 items-center gap-2 bg-accent px-6 text-small font-medium text-accent-ink transition-[filter,transform] hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <p className="text-small text-muted">I&apos;ll reply within 24 hours.</p>
              </div>
              {status === "error" && (
                <p role="alert" className="text-small">
                  {error} You can also email me at{" "}
                  <a href={`mailto:${contacts.email}`} className="underline underline-offset-4">
                    {contacts.email}
                  </a>
                  .
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
