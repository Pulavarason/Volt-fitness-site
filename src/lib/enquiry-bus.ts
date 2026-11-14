import { scrollToId } from "./lenis";

export type EnquiryPrefill = { plan?: string; goal?: string };
export const ENQUIRY_EVENT = "voltt:enquiry";

/** Scroll to the enquiry form and (optionally) preselect a plan / goal. */
export function openEnquiry(prefill: EnquiryPrefill = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<EnquiryPrefill>(ENQUIRY_EVENT, { detail: prefill }));
  scrollToId("enquiry", -40);
}
