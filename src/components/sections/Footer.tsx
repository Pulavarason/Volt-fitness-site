"use client";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { navLinks, programs, plans } from "@/data/content";
import { site, has, orPlaceholder, whatsappLink, telLink, mailLink } from "@/config/site";
import { openEnquiry } from "@/lib/enquiry-bus";
import { scrollToId } from "@/lib/lenis";

function SocialIcon({ href, label, children }: { href: string | null; label: string; children: React.ReactNode }) {
  if (!href)
    return (
      <span title={`${label} link to be added`} className="flex size-11 items-center justify-center border border-line text-white/25">
        <span className="sr-only">{label} link to be added</span>
        {children}
      </span>
    );
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex size-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-amber hover:bg-amber hover:text-ink">
      {children}
    </a>
  );
}

const linkCls = "inline-block py-1.5 text-silver transition-colors hover:text-amber";

export function Footer() {
  const c = site.contact;
  const tel = telLink();
  const mail = mailLink();
  return (
    <footer className="relative">
      {/* final CTA */}
      <div className="relative isolate overflow-hidden border-y border-line">
        <Image src="/images/gym-gold-glass.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/60" />
        <div className="light-strip absolute inset-x-0 top-0" />
        <div className="container-x flex flex-col items-start justify-between gap-10 py-20 lg:flex-row lg:items-end lg:py-28">
          <SplitHeading lines={["Ready to", "level up?"]} lineClass={{ 1: "text-amber" }} className="text-[clamp(3.2rem,10vw,8.5rem)]" />
          <Reveal>
            <Button size="lg" magnetic arrow onClick={() => openEnquiry()}>
              Join VOLTT Today
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="bg-ink">
        <div className="container-x grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/images/logo-clean.png" alt="VOLTT Fitness Studio" width={1506} height={844} className="h-auto w-56" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist">
              A premium strength and fitness studio in {site.locality}. Built for discipline, performance and community.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialIcon href={has(c.instagram) ? c.instagram : null} label="VOLTT on Instagram">
                <InstagramIcon className="size-5" />
              </SocialIcon>
              <SocialIcon href={whatsappLink()} label="VOLTT on WhatsApp">
                <WhatsAppIcon className="size-5" />
              </SocialIcon>
            </div>
          </div>

          <nav aria-label="Footer quick links" className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.28em] text-amber">Quick Links</h3>
            <ul className="mt-4">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToId(l.id); }} className={linkCls}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.28em] text-amber">Programs</h3>
            <ul className="mt-4">
              {programs.map((p) => (
                <li key={p.id}>
                  <a href="#programs" onClick={(e) => { e.preventDefault(); scrollToId("programs"); }} className={linkCls}>
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.28em] text-amber">Membership</h3>
            <ul className="mt-4">
              {plans.map((p) => (
                <li key={p.id}>
                  <button type="button" onClick={() => openEnquiry({ plan: p.id })} className={`${linkCls} text-left`}>
                    {p.duration}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.28em] text-amber">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-silver">
              <li>{orPlaceholder(c.address)}</li>
              <li>{tel ? <a href={tel} className="hover:text-amber">{c.phone}</a> : orPlaceholder(c.phone)}</li>
              <li>{mail ? <a href={mail} className="hover:text-amber">{c.email}</a> : orPlaceholder(c.email)}</li>
              <li>{orPlaceholder(c.hours)}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-mist sm:flex-row">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <button type="button" onClick={() => scrollToId("home")} className="group inline-flex min-h-10 items-center gap-2 font-display text-[0.8rem] font-semibold uppercase tracking-[0.24em] hover:text-amber">
              Back to top <ArrowUp className="size-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
