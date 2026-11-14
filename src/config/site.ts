/**
 * ─────────────────────────────────────────────────────────────
 *  VOLTT FITNESS STUDIO — CLIENT-EDITABLE SITE CONFIG
 * ─────────────────────────────────────────────────────────────
 *  Leave a value as "" until the client confirms it.
 *  Anything empty is displayed as "[CLIENT TO PROVIDE]" and any
 *  link that depends on it stays inactive (nothing fake is ever shown).
 */

export const PLACEHOLDER = "[CLIENT TO PROVIDE]";

export const site = {
  name: "VOLTT Fitness Studio",
  shortName: "VOLTT",
  description:
    "VOLTT Fitness Studio is a premium strength and fitness studio in Valasaravakkam, Chennai. Modern equipment, focused training spaces and a community that shows up. Enquire about membership today.",
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://volttfitness.in) */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  locality: "Valasaravakkam, Chennai",

  /** Show amber "placeholder" markers on unconfirmed content (stats, trainers,
   *  testimonials…). Set to false for the final public launch. */
  showPlaceholderMarkers: true,

  contact: {
    /** Full street address, e.g. "No. 12, Arcot Road, Valasaravakkam, Chennai 600087" */
    address: "",
    /** Display + dial number, e.g. "+91 98765 43210" */
    phone: "",
    /** WhatsApp number — digits only, with country code, e.g. "919876543210" */
    whatsapp: "",
    email: "",
    /** Full URL, e.g. "https://instagram.com/volttfitnessstudio" */
    instagram: "",
    /** e.g. "Mon–Sat: 5:00 AM – 10:00 PM · Sun: 6:00 AM – 12:00 PM" */
    hours: "",
  },

  maps: {
    /** Google Maps place page (from the client's listing). */
    placeUrl:
      "https://www.google.com/maps/place/volt+fitness+valasaravakkam/data=!4m2!3m1!1s0x3a5261f51ecaeea3:0xca13fdddc2f09679",
    /** Iframe source. Replace with the "Embed a map" URL from Google Maps for
     *  an exact pin, or set to "" to show the location placeholder instead. */
    embedUrl: "https://maps.google.com/maps?q=volt+fitness+valasaravakkam&output=embed",
  },
} as const;

export const has = (v: string) => v.trim().length > 0;
export const orPlaceholder = (v: string) => (has(v) ? v : PLACEHOLDER);

export function whatsappLink(message?: string): string | null {
  const num = site.contact.whatsapp.replace(/\D/g, "");
  if (!num) return null;
  return `https://wa.me/${num}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export const telLink = () =>
  has(site.contact.phone) ? `tel:${site.contact.phone.replace(/[^\d+]/g, "")}` : null;
export const mailLink = () => (has(site.contact.email) ? `mailto:${site.contact.email}` : null);
