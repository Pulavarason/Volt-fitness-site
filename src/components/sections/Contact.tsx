"use client";
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { site, has, PLACEHOLDER, whatsappLink, telLink, mailLink } from "@/config/site";
import { cn } from "@/lib/utils";

function Row({ icon: Icon, label, value, href, external }: { icon: typeof MapPin; label: string; value: string; href?: string | null; external?: boolean }) {
  const provided = has(value);
  const content = <span className={cn("text-lg", provided ? "text-white" : "text-amber/70")}>{provided ? value : PLACEHOLDER}</span>;
  return (
    <li className="flex items-start gap-5 border-b border-line py-5 first:border-t">
      <Icon className="mt-1 size-5 shrink-0 text-amber" strokeWidth={1.6} aria-hidden="true" />
      <div>
        <p className="font-display text-xs font-semibold uppercase tracking-[0.26em] text-mist">{label}</p>
        <p className="mt-1">
          {provided && href ? (
            <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="transition-colors hover:text-amber">
              {content}
            </a>
          ) : (
            content
          )}
        </p>
      </div>
    </li>
  );
}

export function Contact() {
  const c = site.contact;
  const wa = whatsappLink();
  return (
    <section id="contact" className="section-y relative bg-graphite">
      <div className="container-x">
        <SectionHeader index="10" eyebrow="Location & Contact" lines={["Visit VOLTT", "Fitness Studio"]} lineClass={{ 1: "outline-text" }} text={`Find us in ${site.locality}. Walk in, call or message — we'd love to show you around.`} />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ul>
              <Row icon={MapPin} label="Address" value={c.address} />
              <Row icon={Phone} label="Phone" value={c.phone} href={telLink()} />
              <Row icon={WhatsAppIcon as unknown as typeof MapPin} label="WhatsApp" value={has(c.whatsapp) ? c.phone || `+${c.whatsapp}` : ""} href={wa} external />
              <Row icon={Mail} label="Email" value={c.email} href={mailLink()} />
              <Row icon={Clock} label="Opening Hours" value={c.hours} />
              <Row icon={InstagramIcon as unknown as typeof MapPin} label="Instagram" value={c.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "")} href={has(c.instagram) ? c.instagram : null} external />
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href={site.maps.placeUrl} external arrow>
                <Navigation className="size-4" /> Get Directions
              </Button>
              {wa && (
                <Button href={wa} external variant="outline">
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </Button>
              )}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="brackets relative aspect-[4/3.3] w-full overflow-hidden border border-line bg-ink sm:aspect-[16/11]">
              {has(site.maps.embedUrl) ? (
                <iframe
                  title="Map showing the location of VOLTT Fitness Studio"
                  src={site.maps.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0 [filter:grayscale(1)_invert(0.92)_contrast(0.95)_hue-rotate(180deg)_brightness(0.9)]"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:48px_48px] text-center">
                  <MapPin className="size-12 text-amber" strokeWidth={1.3} />
                  <p className="display text-3xl">Location coming soon</p>
                  <p className="text-sm text-mist">Exact address to be confirmed by the studio.</p>
                </div>
              )}
              <a
                href={site.maps.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 bg-ink/90 px-4 py-2.5 font-display text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition-colors hover:bg-amber hover:text-ink"
              >
                Open in Google Maps <ExternalLink className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
