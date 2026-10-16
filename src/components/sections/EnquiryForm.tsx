"use client";
import { useState, type FormEvent } from "react";
import { COMPANY } from "@/data/site";
import { Localized } from "@/providers/LanguageProvider";

export function EnquiryForm({ career = false }: { career?: boolean }) {
  const [prepared, setPrepared] = useState(false);
  const prefix = career ? "career" : "query";
  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-ink-950/80 border border-ink-900/15 dark:border-white/15 focus:outline-none focus:ring-2 focus:ring-ink-900/20 text-ink-900 dark:text-white backdrop-blur-sm";
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [...data.entries()].map(([key, value]) => `${key}: ${String(value).trim()}`).join("\n\n");
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(career ? "Career enquiry — Senthil Associates" : "Project enquiry — Senthil Associates")}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <div>
    <h3 className="text-2xl font-medium text-ink-950 dark:text-white mb-3"><Localized>{career ? "Career Form" : "Query Form"}</Localized></h3>
    <p className="text-sm text-ink-600 dark:text-white/65 mb-6"><Localized>{career ? "Interested in joining our practice? Introduce yourself to the team." : "Tell us about the space you would like to create."}</Localized></p>
    <form onSubmit={submit} className="space-y-5">
      <div><label htmlFor={`${prefix}-name`} className="block text-sm font-medium mb-2"><Localized>{career ? "Your Name" : "First Name"}</Localized></label><input className={inputClass} id={`${prefix}-name`} name="Name" autoComplete="name" required maxLength={100} /></div>
      <div><label htmlFor={`${prefix}-email`} className="block text-sm font-medium mb-2"><Localized>Email Address</Localized></label><input className={inputClass} id={`${prefix}-email`} name="Email" type="email" autoComplete="email" required maxLength={200} /></div>
      {career && <div><label htmlFor={`${prefix}-phone`} className="block text-sm font-medium mb-2"><Localized>Phone Number</Localized></label><input className={inputClass} id={`${prefix}-phone`} name="Phone" type="tel" autoComplete="tel" required maxLength={30} /></div>}
      <div><label htmlFor={`${prefix}-message`} className="block text-sm font-medium mb-2"><Localized>{career ? "Introduction / portfolio link (optional)" : "Your Message"}</Localized></label><textarea className={inputClass} id={`${prefix}-message`} name="Message" rows={4} required={!career} maxLength={3000} /></div>
      <button type="submit" className="w-full py-3.5 px-6 rounded-full bg-ink-950 hover:bg-ink-800 text-white font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 transition-colors"><Localized>Continue to Email</Localized> <span aria-hidden="true">↗</span></button>
      <p className="text-xs text-ink-600 dark:text-white/65 leading-relaxed"><Localized>This opens your email app with your details. Review the message and press Send there.</Localized></p>
      {prepared && <p role="status" className="text-sm text-ink-800 dark:text-ink-200"><Localized>Your email draft is ready. If your email app did not open, write to</Localized> <a className="underline break-all" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p>}
    </form>
  </div>;
}
