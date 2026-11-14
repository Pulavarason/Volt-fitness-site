/** Shared by the form (client) and /api/enquiry (server). */

export const CONTACT_METHODS = ["Phone Call", "WhatsApp", "Email"] as const;
export type ContactMethod = (typeof CONTACT_METHODS)[number];

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  membership: string;
  goal: string;
  contactMethod: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const PHONE_RE = /^(?:\+?91)?[6-9]\d{9}$/; // Indian mobile, optional +91
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(v: EnquiryInput): EnquiryErrors {
  const e: EnquiryErrors = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (name.length > 80) e.name = "Name is too long.";

  const phone = v.phone.replace(/[\s\-()]/g, "");
  if (!phone) e.phone = "Phone number is required.";
  else if (!PHONE_RE.test(phone)) e.phone = "Enter a valid 10-digit Indian mobile number.";

  const email = v.email.trim();
  if (email && !EMAIL_RE.test(email)) e.email = "Enter a valid email address.";
  if (v.contactMethod === "Email" && !email) e.email = "Add your email so we can reach you.";

  if (!v.membership) e.membership = "Choose a membership or “Not sure yet”.";
  if (!v.goal) e.goal = "Tell us your main fitness goal.";
  if (!(CONTACT_METHODS as readonly string[]).includes(v.contactMethod))
    e.contactMethod = "Choose how you'd like to be contacted.";
  return e;
}
