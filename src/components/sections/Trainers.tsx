"use client";
import Image from "next/image";
import { Zap } from "lucide-react";
import { trainers } from "@/data/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { InstagramIcon } from "@/components/ui/icons";
import { openEnquiry } from "@/lib/enquiry-bus";
import { pad } from "@/lib/utils";

function Social({ href, label, children }: { href?: string; label: string; children: React.ReactNode }) {
  if (!href)
    return (
      <span title={`${label} link to be added`} className="flex size-10 items-center justify-center border border-line text-white/25">
        <span className="sr-only">{label} link to be added</span>
        {children}
      </span>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center border border-white/25 text-white transition-colors hover:border-amber hover:bg-amber hover:text-ink"
    >
      {children}
    </a>
  );
}

export function Trainers() {
  return (
    <section id="trainers" className="section-y relative">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            index="05"
            eyebrow="Trainers"
            lines={["Coached by", "people who care."]}
            lineClass={{ 1: "outline-text" }}
            text="Meet the team behind the floor. Profiles below are placeholders until the studio shares real trainer details."
          />
          <Reveal>
            <Button variant="outline" magnetic arrow onClick={() => openEnquiry({ goal: "Personal training" })}>
              Book a Trainer
            </Button>
          </Reveal>
        </div>

        <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t, i) => (
            <Reveal as="li" key={i} delay={i * 0.1}>
              <article className="group relative flex h-full flex-col border border-line bg-graphite transition-colors duration-500 hover:border-amber/60">
                {/* portrait plate */}
                <div className="relative aspect-[4/4.6] overflow-hidden bg-panel">
                  {t.photo ? (
                    <Image
                      src={t.photo}
                      alt={`${t.name}, ${t.designation} at VOLTT Fitness Studio`}
                      fill
                      sizes="(min-width:1024px) 28vw, (min-width:768px) 45vw, 92vw"
                      className="object-cover grayscale transition-all duration-[1200ms] ease-[var(--ease-expo)] group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgb(214_164_63/0.14),transparent_62%)]" />
                      <Image
                        src="/images/logo-mark.png"
                        alt=""
                        width={1466}
                        height={624}
                        className="w-[62%] opacity-[0.12] transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:scale-110"
                      />
                      <Zap className="absolute size-16 fill-amber/20 text-amber/60 transition-transform duration-700 group-hover:scale-125" strokeWidth={1.2} />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-graphite to-transparent" />
                  <span className="absolute left-5 top-5 font-display text-5xl font-extrabold leading-none text-white/15">{pad(i + 1)}</span>
                  {t.placeholder && <PlaceholderTag className="absolute right-4 top-4">Placeholder profile</PlaceholderTag>}
                </div>

                <div className="flex flex-1 flex-col p-7 pt-3">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.26em] text-amber">{t.designation}</p>
                  <h3 className="display mt-1.5 text-4xl">{t.name}</h3>

                  <dl className="mt-5 grid grid-cols-2 gap-4 border-y border-line py-4 text-sm">
                    <div>
                      <dt className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-mist">Specialization</dt>
                      <dd className="mt-1 text-white">{t.specialization}</dd>
                    </div>
                    <div>
                      <dt className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-mist">Experience</dt>
                      <dd className="mt-1 text-white">{t.experience}</dd>
                    </div>
                  </dl>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-silver">{t.bio}</p>

                  <div className="mt-6 flex gap-2">
                    <Social href={t.social?.instagram} label={`${t.name} on Instagram`}>
                      <InstagramIcon className="size-[18px]" />
                    </Social>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
