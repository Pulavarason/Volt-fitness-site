import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/800.css";
import "./globals.css";
import { site, has, whatsappLink } from "@/config/site";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Gym in Valasaravakkam, Chennai`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "VOLTT Fitness Studio",
    "gym in Valasaravakkam",
    "gym in Chennai",
    "fitness studio Chennai",
    "strength training Chennai",
    "personal training Chennai",
    "gym membership Chennai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Built Different. Train Different.`,
    description: site.description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: `${site.name} — premium training floor` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Built Different. Train Different.`,
    description: site.description,
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Local-business structured data — ONLY confirmed information is included. */
function jsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/og.jpg`,
    logo: `${site.url}/images/logo-clean.png`,
    hasMap: site.maps.placeUrl,
    address: {
      "@type": "PostalAddress",
      ...(has(site.contact.address) ? { streetAddress: site.contact.address } : {}),
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };
  if (has(site.contact.phone)) data.telephone = site.contact.phone;
  if (has(site.contact.email)) data.email = site.contact.email;
  if (has(site.contact.hours)) data.openingHours = site.contact.hours;
  const sameAs = [site.contact.instagram, whatsappLink()].filter((v): v is string => !!v && has(v));
  if (sameAs.length) data.sameAs = sameAs;
  return JSON.stringify(data);
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="h-full">
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-amber focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
