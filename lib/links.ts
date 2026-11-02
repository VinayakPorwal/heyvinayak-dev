import { contacts, sections, site } from "@/data";

export const isTodo = (value: string) => !value || value.trim().toUpperCase().startsWith("TODO");

export const bookCallHref =
  site.bookCallLink ||
  `mailto:${contacts.email}?subject=${encodeURIComponent("Booking a call")}&body=${encodeURIComponent(
    "Hi Vinayak, I'd like to book a short call about a website. A few times that work for me:\n\n",
  )}`;

export const navLinks = [
  { href: "#services", label: "Services" },
  ...(sections.work ? [{ href: "#work", label: "Work" }] : []),
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", href: contacts.github },
  { label: "LinkedIn", href: contacts.linkedin },
  { label: "Instagram", href: contacts.instagram },
];
