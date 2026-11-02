"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import { budgets, contacts } from "@/data";
import { bookCallHref, socials } from "@/lib/links";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 block w-full rounded-xl border border-border bg-bg/60 px-4 text-[0.9375rem] text-ink placeholder:text-muted/70 outline-none transition-[border-color,box-shadow] focus:border-accent focus:ring-4 focus:ring-accent/15";

function CopyEmail() {
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(contacts.email);
      setToast(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast(false), 2200);
    } catch {
      window.location.href = `mailto:${contacts.email}`;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="group inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-5 font-mono text-sm text-ink transition-colors hover:bg-surface-2"
      >
        {contacts.email}
        <Copy aria-hidden className="size-4 text-muted transition-colors group-hover:text-ink" />
        <span className="sr-only">Copy email address</span>
      </button>
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center">
        <AnimatePresence>
          {toast && (
            <motion.p
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              className="flex items-center gap-2 rounded-full border border-border-strong bg-surface px-4 py-2 text-sm shadow-lg"
            >
              <Check aria-hidden className="size-4 text-accent-text" /> Email copied to clipboard
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

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
    <section id="contact" aria-labelledby="contact-title" className="py-16 md:py-24">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-6 py-14 md:px-14 md:py-20">
          <div aria-hidden className="hero-glow pointer-events-none absolute inset-0 -z-0" />
          <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="text-sm font-medium text-accent-text">{contacts.title}</p>
              </Reveal>
              <Reveal order={1}>
                <h2 id="contact-title" className="headline mt-4 text-[clamp(2.75rem,1.6rem+4.4vw,5rem)]">
                  Let&apos;s build something <span className="serif-accent text-accent-text">great.</span>
                </h2>
              </Reveal>
              <Reveal order={2}>
                <p className="mt-6 max-w-md text-lg text-muted">{contacts.subtitle}</p>
              </Reveal>
              <Reveal order={3} className="mt-9 flex flex-wrap gap-3">
                <Button href={bookCallHref} icon={<Calendar aria-hidden className="size-4" />}>
                  Book a free 15-min call
                </Button>
                <CopyEmail />
              </Reveal>
              <Reveal order={4}>
                <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-ink"
                      >
                        {s.label}
                        <span aria-hidden className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal order={2} className="lg:col-span-6">
              {status === "sent" ? (
                <div className="rounded-2xl border border-border bg-bg/60 p-8" role="status">
                  <Check aria-hidden className="size-6 text-accent-text" />
                  <p className="mt-4 text-xl font-semibold">Thanks, your message is in.</p>
                  <p className="mt-2 text-muted">I&apos;ll reply within 24 hours. Keep an eye on your inbox.</p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm text-accent-text underline-offset-4 hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-bg/40 p-5 md:p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-muted">
                      Name
                      <input name="name" required autoComplete="name" className={`${field} h-12`} />
                    </label>
                    <label className="block text-sm text-muted">
                      Email
                      <input name="email" type="email" required autoComplete="email" className={`${field} h-12`} />
                    </label>
                  </div>
                  <label className="block text-sm text-muted">
                    Budget range
                    <select name="budget" defaultValue="" required className={`${field} h-12 appearance-none`}>
                      <option value="" disabled>
                        Choose a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm text-muted">
                    Message
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="What do you need, and by when?"
                      className={`${field} resize-y py-3`}
                    />
                  </label>
                  {/* Honeypot: bots fill it, people never see it */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink font-medium text-bg transition-[opacity,transform] hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {status === "error" && (
                    <p role="alert" className="text-sm text-muted">
                      {error} You can also email me at{" "}
                      <a href={`mailto:${contacts.email}`} className="text-ink underline underline-offset-4">
                        {contacts.email}
                      </a>
                      .
                    </p>
                  )}
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
