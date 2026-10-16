"use client";
import { Localized, useLanguage } from "@/providers/LanguageProvider";


import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { SplitText } from "@/components/motion/SplitText";
import { MapPin, Phone, Mail, Facebook, User, Landmark, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { COMPANY } from "@/data/site";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { ContinuousPaintReveal } from "@/components/ui/ContinuousPaintReveal";

export default function ContactPage() {
  const { language } = useLanguage();
  const isTamil = language === "ta";
  const address = COMPANY.address;
  const phone = COMPANY.phone;
  const email = COMPANY.email;

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative bg-transparent text-ink-900 overflow-hidden">
        <ContinuousPaintReveal>
          <div className="relative z-10">

          {/* HERO SECTION */}
          <section className="pt-32 pb-16">
            <Container>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left Column: Text */}
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-brand-700 dark:text-brand-300">
                      <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                      <Localized>CONTACT US</Localized>
                    </span>
                  </div>
                  <h1
                    className={`tracking-tight text-ink-900 dark:text-white mb-6 ${isTamil
                      ? "font-serif text-[22px] sm:text-[24px] lg:text-[26px] leading-[1.3] font-medium"
                      : "font-sans text-5xl sm:text-6xl font-medium leading-[1.05]"
                      }`}
                  >
                    <SplitText text="Let's build architecture that" />
                    <br />
                    <span className="italic font-light text-nature-700 dark:text-nature-400"><Localized>
                      stands the test of time.
                    </Localized></span>
                  </h1>
                  <Reveal delay={0.2}>
                    <p className="text-lg text-ink-700/80 dark:text-white/70 max-w-xl"><Localized>
                      Reach out to us to discuss your vision. Our team is ready to prepare a tailored design roadmap for your project.
                    </Localized></p>
                  </Reveal>
                </div>

                {/* Right Column: Image */}
                <FadeIn delay={0.3} className="liquid-glass-card rounded-[32px] p-2.5 sm:p-3 shadow-2xl relative overflow-hidden group mt-8 lg:mt-0">
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden z-10">
                    <Image
                      src="/assets/contact.webp"
                      alt="Architecture Design"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-ink-950/5 pointer-events-none" />
                  </div>
                </FadeIn>
              </div>
            </Container>
          </section>

          {/* CONTACT DETAILS & FORM */}
          <section className="py-12">
            <Container>
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                {/* Left Column: Details Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">


                  {/* Card 1: Address (Nature Green) */}
                  <FadeIn delay={0.1}>
                    <div className="liquid-glass-card rounded-3xl group flex h-full flex-col p-6 cursor-default border border-nature-500/20">
                      <div className="liquid-sheen-sweep" />
                      <div className="liquid-glass-bevel" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between pb-4 border-b border-ink-900/10 dark:border-white/10">
                          <span className="font-mono text-xs font-bold tracking-widest text-nature-700 dark:text-nature-400"><Localized>
                            01 / LOCATION
                          </Localized></span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-nature-500/10 text-nature-700 dark:text-nature-400 border border-nature-500/20 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-nature-600 group-hover:text-white">
                            <MapPin className="h-4 w-4" strokeWidth={1.85} />
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-normal tracking-tight text-ink-950 mt-4 transition-colors group-hover:text-nature-700 dark:text-white"><Localized>
                          Address
                        </Localized></h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                          <Localized>{address}</Localized>
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Card 2: Phone (Brand Red) */}
                  <FadeIn delay={0.2}>
                    <div className="liquid-glass-card rounded-3xl group flex h-full flex-col p-6 cursor-default border border-brand-500/20">
                      <div className="liquid-sheen-sweep" />
                      <div className="liquid-glass-bevel" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between pb-4 border-b border-ink-900/10 dark:border-white/10">
                          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400"><Localized>
                            02 / PHONE
                          </Localized></span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                            <Phone className="h-4 w-4" strokeWidth={1.85} />
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-normal tracking-tight text-ink-950 mt-4 transition-colors group-hover:text-brand-600 dark:text-white"><Localized>
                          Direct Line
                        </Localized></h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                          <a href={`tel:${phone}`} className="hover:text-brand-600 dark:hover:text-white transition-colors">
                            <Localized>{phone}</Localized>
                          </a>
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Card 3: Email (Nature Green) */}
                  <FadeIn delay={0.3}>
                    <div className="liquid-glass-card rounded-3xl group flex h-full flex-col p-6 cursor-default border border-nature-500/20">
                      <div className="liquid-sheen-sweep" />
                      <div className="liquid-glass-bevel" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between pb-4 border-b border-ink-900/10 dark:border-white/10">
                          <span className="font-mono text-xs font-bold tracking-widest text-nature-700 dark:text-nature-400"><Localized>
                            03 / EMAIL
                          </Localized></span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-nature-500/10 text-nature-700 dark:text-nature-400 border border-nature-500/20 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-nature-600 group-hover:text-white">
                            <Mail className="h-4 w-4" strokeWidth={1.85} />
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-normal tracking-tight text-ink-950 mt-4 transition-colors group-hover:text-nature-700 dark:text-white"><Localized>
                          Studio Email
                        </Localized></h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                          <a href={`mailto:${email}`} className="hover:text-nature-700 dark:hover:text-white transition-colors break-all">
                            <Localized>{email}</Localized>
                          </a>
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  {/* Card 4: Social (Brand Red) */}
                  <FadeIn delay={0.4}>
                    <div className="liquid-glass-card rounded-3xl group flex h-full flex-col p-6 cursor-default border border-brand-500/20">
                      <div className="liquid-sheen-sweep" />
                      <div className="liquid-glass-bevel" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between pb-4 border-b border-ink-900/10 dark:border-white/10">
                          <span className="font-mono text-xs font-bold tracking-widest text-brand-600 dark:text-brand-400"><Localized>
                            04 / SOCIAL
                          </Localized></span>
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                            <Facebook className="h-4 w-4" strokeWidth={1.85} />
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-normal tracking-tight text-ink-950 mt-4 transition-colors group-hover:text-brand-600 dark:text-white"><Localized>
                          Facebook
                        </Localized></h3>
                        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65">
                          <a href="https://www.facebook.com/architecture.interiordesign.consultancy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 dark:hover:text-white transition-colors"><Localized>
                            Senthil Associates
                          </Localized></a>
                        </p>
                      </div>
                    </div>
                  </FadeIn>

                  <div className="sm:col-span-2 flex flex-wrap gap-3">
                    <a className="px-5 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-md shadow-brand-500/20 transition-all hover:scale-105" href="https://www.instagram.com/senthil_associates" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
                    <a className="px-5 py-3 rounded-full bg-nature-600 hover:bg-nature-700 text-white text-sm font-semibold shadow-md shadow-nature-600/20 transition-all hover:scale-105" href="https://wa.me/919842164380" target="_blank" rel="noopener noreferrer">WhatsApp ↗</a>
                  </div>
                  {/* Card 5: Principal Contact */}
                  <FadeIn delay={0.5} className="sm:col-span-2">
                    <div className="liquid-glass-card rounded-3xl group flex h-full flex-col p-6 cursor-default">
                      <div className="liquid-sheen-sweep" />
                      <div className="liquid-glass-bevel" />
                      <div className="relative z-10 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 pb-2 border-b border-ink-900/10 dark:border-white/10 mb-3">
                            <span className="font-mono text-xs font-bold tracking-widest text-ink-600 dark:text-ink-400"><Localized>
                              05 / LEADERSHIP
                            </Localized></span>
                          </div>
                          <h3 className="font-serif text-lg font-normal tracking-tight text-ink-950 transition-colors group-hover:text-ink-700 dark:text-white dark:group-hover:text-white"><Localized>
                            Ar. Senthil
                          </Localized></h3>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-700/80 dark:text-white/65"><Localized>
                            Principal Architect & Founder
                          </Localized></p>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/80 dark:bg-white/10 text-ink-900 dark:text-white border border-ink-900/15 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-ink-950 group-hover:text-white group-hover:border-ink-950">
                          <User className="h-4 w-4" strokeWidth={1.85} />
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Right Column: Contact Form */}
                <FadeIn delay={0.2} className="liquid-glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden group shadow-xl">
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div className="relative z-10">
                    <EnquiryForm />
                    <div className="mt-10 pt-10 border-t border-ink-900/10 dark:border-white/10"><EnquiryForm career /></div>
                  </div>
                </FadeIn>
              </div>
            </Container>
          </section>

          {/* MAP EMBED */}
          <section className="py-12 pb-24">
            <Container>
              <FadeIn>
                <div className="liquid-glass-card rounded-[32px] p-2.5 sm:p-3 shadow-xl relative overflow-hidden group">
                  <div className="liquid-sheen-sweep" />
                  <div className="liquid-glass-bevel" />
                  <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative z-10">
                    <iframe title="Senthil Associates studio location"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                  </div>
                </div>
              </FadeIn>
            </Container>
          </section>
        </div>
      </ContinuousPaintReveal>
    </main>
    <Footer />
    </>
  );
}
