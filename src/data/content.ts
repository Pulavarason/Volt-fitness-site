/**
 * ─────────────────────────────────────────────────────────────
 *  VOLTT — EDITABLE CONTENT
 *  Prices, trainers, stats, testimonials and gallery live here.
 *  `placeholder: true` items show an amber "placeholder" marker
 *  (see site.showPlaceholderMarkers) until the client confirms.
 * ─────────────────────────────────────────────────────────────
 */
import { PLACEHOLDER, site, orPlaceholder } from "@/config/site";

/* ───────────── Navigation ───────────── */
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "facilities", label: "Facilities" },
  { id: "programs", label: "Programs" },
  { id: "membership", label: "Membership" },
  { id: "trainers", label: "Trainers" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
] as const;

/* ───────────── Stats (placeholder numbers) ───────────── */
export const stats = [
  { label: "Active Members", value: 500, suffix: "+", placeholder: true },
  { label: "Training Stations", value: 40, suffix: "+", placeholder: true },
  { label: "Expert Trainers", value: 5, suffix: "", placeholder: true },
  { label: "Days Open / Week", value: 6, suffix: "", placeholder: true },
];

/* ───────────── Facilities ───────────── */
export type Facility = {
  id: string;
  name: string;
  image: string;
  alt: string;
  position?: string;
  description: string;
  /** false → shows a small "to be confirmed" tag while markers are on */
  confirmed: boolean;
};

export const facilities: Facility[] = [
  {
    id: "strength",
    name: "Strength Training",
    image: "/images/gym-main.jpg",
    alt: "Plate-loaded strength machines under warm amber lighting at VOLTT Fitness Studio",
    description:
      "Heavy-duty strength stations built for serious, progressive training — set in a focused, low-glare floor.",
    confirmed: true,
  },
  {
    id: "free-weights",
    name: "Free Weights",
    image: "/images/gym-dumbbells.jpg",
    alt: "Rows of dumbbells racked beside a glass wall lit by warm LED strips",
    description:
      "A full dumbbell rack lined up against the illuminated glass wall — grab, lift, rack, repeat.",
    confirmed: true,
  },
  {
    id: "cardio",
    name: "Cardio Equipment",
    image: "/images/gym-cardio.jpg",
    alt: "Treadmills and cardio machines on the VOLTT cardio floor",
    description:
      "Treadmills and cardio machines for warm-ups, conditioning and endurance work.",
    confirmed: true,
  },
  {
    id: "functional",
    name: "Functional Training",
    image: "/images/gym-floor.jpg",
    alt: "Green turf training area next to the machine floor",
    description:
      "Open turf space for movement-based and functional work. Equipment details can be updated by the studio.",
    confirmed: false,
  },
  {
    id: "machines",
    name: "Machine Training",
    image: "/images/gym-machines.jpg",
    alt: "Plate-loaded leg press and press machines on the VOLTT training floor",
    description:
      "Plate-loaded and selectorised machines for guided, controlled training across every major muscle group.",
    confirmed: true,
  },
  {
    id: "personal",
    name: "Personal Training",
    image: "/images/gym-dark.jpg",
    alt: "Dimly lit VOLTT training floor with machines and cable stations",
    description:
      "One-to-one coaching on the floor. Trainer availability and rates are shared on enquiry.",
    confirmed: false,
  },
  {
    id: "workout-areas",
    name: "Workout Areas",
    image: "/images/gym-gold-glass.jpg",
    alt: "Training area with mirrored glass and warm LED light strips",
    description:
      "Mirrored, well-lit workout zones with room to move between stations.",
    confirmed: true,
  },
];

/* ───────────── Programs ───────────── */
export type Program = {
  id: string;
  name: string;
  icon: "dumbbell" | "trending" | "flame" | "user" | "activity" | "heart" | "sprout";
  image: string;
  alt: string;
  position?: string;
  description: string;
  benefits: string[];
  details: string;
  bestFor: string;
  goal: string; // preselected in the enquiry form
};

export const programs: Program[] = [
  {
    id: "strength",
    name: "Strength Training",
    icon: "dumbbell",
    image: "/images/gym-machines.jpg",
    alt: "Strength machines on the VOLTT floor",
    description: "Structured resistance training focused on building real, usable strength.",
    benefits: ["Progressive, structured sessions", "Technique-first approach", "Works for every experience level"],
    details:
      "Sessions are built around core lifts and machine work with gradual progression, so you train with purpose instead of guessing.",
    bestFor: "Anyone who wants to get stronger with a clear plan.",
    goal: "Improve strength",
  },
  {
    id: "muscle",
    name: "Muscle Building",
    icon: "trending",
    image: "/images/gym-dumbbells.jpg",
    alt: "Dumbbell rack at VOLTT Fitness Studio",
    description: "Hypertrophy-focused training with the free weights and machines to support it.",
    benefits: ["Split-based programming", "Full free-weight selection", "Guidance on form and volume"],
    details:
      "Focused on training volume, exercise selection and consistency — the fundamentals of building muscle over time. Results vary from person to person.",
    bestFor: "Members chasing size, shape and a stronger physique.",
    goal: "Build muscle",
  },
  {
    id: "weight",
    name: "Weight Management",
    icon: "flame",
    image: "/images/gym-cardio.jpg",
    alt: "Cardio floor at VOLTT Fitness Studio",
    description: "A balanced mix of resistance and cardio to support your weight goals.",
    benefits: ["Cardio + strength combined", "Sustainable weekly routines", "Supportive environment"],
    details:
      "Combines strength sessions with cardio so your routine is practical and repeatable. This is fitness guidance, not medical or dietary advice.",
    bestFor: "Members working towards a healthier weight through regular training.",
    goal: "Lose weight / Weight management",
  },
  {
    id: "personal",
    name: "Personal Training",
    icon: "user",
    image: "/images/gym-dark.jpg",
    alt: "VOLTT training floor in low light",
    description: "One-to-one attention to plan, coach and keep you accountable.",
    benefits: ["Personalised session plans", "Hands-on form correction", "Accountability and pacing"],
    details:
      "Work directly with a trainer on a plan built around your schedule and goals. Availability and pricing are confirmed on enquiry.",
    bestFor: "Anyone who wants individual guidance and structure.",
    goal: "Personal training",
  },
  {
    id: "functional",
    name: "Functional Fitness",
    icon: "activity",
    image: "/images/gym-floor.jpg",
    alt: "Turf training area at VOLTT",
    description: "Movement-based training for strength, mobility and everyday capability.",
    benefits: ["Full-body movement patterns", "Open turf training space", "Builds work capacity"],
    details:
      "Uses compound and bodyweight-driven movements to train the body as one connected system.",
    bestFor: "Members who want to move well and feel capable outside the gym too.",
    goal: "General fitness",
  },
  {
    id: "general",
    name: "General Fitness",
    icon: "heart",
    image: "/images/gym-gold-glass.jpg",
    alt: "Workout area at VOLTT Fitness Studio",
    description: "A well-rounded routine to stay active, energised and consistent.",
    benefits: ["Balanced weekly routine", "Cardio and strength variety", "Flexible, self-paced"],
    details:
      "A flexible approach for members who simply want to build a healthy training habit with full access to the studio floor.",
    bestFor: "Members who want to stay active without a specific competitive goal.",
    goal: "General fitness",
  },
  {
    id: "beginner",
    name: "Beginner Training",
    icon: "sprout",
    image: "/images/gym-main.jpg",
    alt: "Welcoming VOLTT training floor",
    description:
      "New to the gym? Start with the basics, learn the equipment and build confidence at your own pace.",
    benefits: ["Learn the equipment safely", "Simple, confidence-building routines", "Welcoming community"],
    details:
      "An approachable starting point for first-timers — learn how the machines work, how to warm up and how to build a routine you can stick to.",
    bestFor: "First-time gym-goers and anyone returning after a long break.",
    goal: "Beginner / learning the basics",
  },
];

/* ───────────── Membership ───────────── */
export type Plan = {
  id: string;
  name: string;
  duration: string;
  months: number;
  /** Rupees. `null` = client to confirm (shows ₹ [CLIENT TO CONFIRM]). */
  price: number | null;
  popular?: boolean;
  features: string[];
};

const baseFeatures = ["Gym Access", "Standard Training Facilities", "Member Support"];

export const popularLabel = "Most Popular";

export const plans: Plan[] = [
  { id: "monthly", name: "Monthly Membership", duration: "1 Month", months: 1, price: null, features: baseFeatures },
  { id: "quarterly", name: "Quarterly Membership", duration: "3 Months", months: 3, price: null, popular: true, features: baseFeatures },
  { id: "half-yearly", name: "Half-Yearly Membership", duration: "6 Months", months: 6, price: null, features: baseFeatures },
  { id: "yearly", name: "Yearly Membership", duration: "12 Months", months: 12, price: null, features: baseFeatures },
];

export const comparisonRows: Array<{ label: string; values: (string | boolean)[] }> = [
  { label: "Duration", values: plans.map((p) => p.duration) },
  { label: "Gym Access", values: plans.map(() => true) },
  { label: "Standard Training Facilities", values: plans.map(() => true) },
  { label: "Member Support", values: plans.map(() => true) },
  { label: "Price", values: plans.map((p) => (p.price ? `₹${p.price.toLocaleString("en-IN")}` : "₹ [CLIENT TO CONFIRM]")) },
  { label: "Additional Benefits / Offers", values: plans.map(() => "[CLIENT TO CONFIRM]") },
];

/* ───────────── Trainers (placeholder profiles) ───────────── */
export type Trainer = {
  name: string;
  designation: string;
  specialization: string;
  experience: string;
  bio: string;
  photo?: string; // e.g. "/images/trainers/name.jpg"
  social?: { instagram?: string; facebook?: string; youtube?: string };
  placeholder: boolean;
};

export const trainers: Trainer[] = [
  {
    name: "Trainer Name",
    designation: "Head Trainer",
    specialization: "Strength & Conditioning",
    experience: "— Years",
    bio: "Placeholder profile. Add a short biography covering qualifications, training philosophy and who this trainer works best with.",
    placeholder: true,
  },
  {
    name: "Trainer Name",
    designation: "Personal Trainer",
    specialization: "Muscle Building",
    experience: "— Years",
    bio: "Placeholder profile. Add a short biography covering qualifications, training philosophy and who this trainer works best with.",
    placeholder: true,
  },
  {
    name: "Trainer Name",
    designation: "Fitness Coach",
    specialization: "Functional & General Fitness",
    experience: "— Years",
    bio: "Placeholder profile. Add a short biography covering qualifications, training philosophy and who this trainer works best with.",
    placeholder: true,
  },
];

/* ───────────── Why choose ───────────── */
export const whyChoose = [
  { icon: "cpu", title: "Modern Equipment", text: "Heavy-duty machines and a full free-weight selection, set out for smooth workflow on the floor." },
  { icon: "compass", title: "Professional Guidance", text: "Trainers who care about technique, progression and getting the basics right." },
  { icon: "users", title: "Supportive Environment", text: "A focused but welcoming atmosphere where everyone — from first-timers to veterans — belongs." },
  { icon: "calendar", title: "Flexible Membership Plans", text: "Monthly, quarterly, half-yearly and yearly options so you can commit at your own pace." },
  { icon: "target", title: "Dedicated Training Space", text: "Distinct zones for strength, cardio and functional work, so you always have room to train." },
  { icon: "flag", title: "Fitness Community", text: "Train alongside people who show up, push each other and celebrate every milestone." },
] as const;

/* ───────────── Gallery ─────────────
 *  To add photos: drop the file in /public/gallery (or /public/images),
 *  then add one line here. `ratio` controls the masonry tile shape.
 */
export const galleryCategories = ["All", "Gym Interior", "Equipment", "Training", "Facilities"] as const;
export type GalleryCategory = Exclude<(typeof galleryCategories)[number], "All">;

export type GalleryImage = {
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
  /** tile aspect-ratio in the masonry grid, e.g. "4/5" */
  ratio: string;
  position?: string;
};

export const gallery: GalleryImage[] = [
  { src: "/images/gym-main.jpg", alt: "VOLTT training floor with plate-loaded machines and amber LED lighting", category: "Gym Interior", width: 1546, height: 1052, ratio: "4/3" },
  { src: "/images/gym-dumbbells.jpg", alt: "Dumbbell rack against the illuminated glass wall", category: "Equipment", width: 696, height: 504, ratio: "4/5", position: "40% 50%" },
  { src: "/images/gym-gold-glass.jpg", alt: "Mirrored workout area with warm light strips", category: "Gym Interior", width: 700, height: 504, ratio: "1/1" },
  { src: "/images/gym-machines.jpg", alt: "Plate-loaded leg press and benches", category: "Training", width: 700, height: 496, ratio: "4/3" },
  { src: "/images/gym-stairs.jpg", alt: "Stair-climber machines on the cardio side of the floor", category: "Equipment", width: 696, height: 504, ratio: "4/5", position: "55% 50%" },
  { src: "/images/gym-floor.jpg", alt: "Turf training area beside the machine floor", category: "Training", width: 700, height: 504, ratio: "1/1" },
  { src: "/images/gym-cardio.jpg", alt: "Treadmills and cardio machines", category: "Facilities", width: 696, height: 504, ratio: "4/3" },
  { src: "/images/gym-dark.jpg", alt: "VOLTT floor in low light with cable stations", category: "Gym Interior", width: 700, height: 504, ratio: "4/5", position: "35% 50%" },
];

/* ───────────── Testimonials (SAMPLE placeholders) ───────────── */
export type Testimonial = {
  name: string;
  review: string;
  rating: number;
  photo?: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Member Name",
    review:
      "This is a sample testimonial. Replace it with a genuine review from a VOLTT member once the studio has collected written permission to publish it.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Member Name",
    review:
      "Sample placeholder text — a real member's words about the equipment, the trainers or the community will appear here. These are not genuine reviews.",
    rating: 5,
    placeholder: true,
  },
  {
    name: "Member Name",
    review:
      "Another sample testimonial. Add the member's name, an optional photo and their star rating in src/data/content.ts when real reviews are available.",
    rating: 5,
    placeholder: true,
  },
];

/* ───────────── FAQ ───────────── */
export const faqs: Array<{ q: string; a: string }> = [
  {
    q: "What membership plans are available?",
    a: `We offer Monthly (1 month), Quarterly (3 months), Half-Yearly (6 months) and Yearly (12 months) memberships. Current prices and any offers: ${PLACEHOLDER}. Use the enquiry form or message us and we'll help you pick the right plan.`,
  },
  {
    q: "Can beginners join VOLTT?",
    a: "Yes — Beginner Training is one of our programs, designed to help first-timers learn the equipment and build a routine at their own pace. Everyone is welcome.",
  },
  {
    q: "What are the gym opening hours?",
    a: `Opening hours: ${orPlaceholder(site.contact.hours)}`,
  },
  {
    q: "Do you offer personal training?",
    a: `Yes, personal training is part of what we offer. Trainer availability and rates: ${PLACEHOLDER}. Send an enquiry and we'll connect you with the right trainer.`,
  },
  {
    q: "How can I enquire about membership?",
    a: "Fill in the enquiry form on this page, message us on WhatsApp, or call the studio. We'll get back to you using the contact method you choose.",
  },
  {
    q: "Can I visit the gym before joining?",
    a: `We'd love to show you around. Visit policy and any trial sessions: ${PLACEHOLDER}. Send an enquiry to arrange a time.`,
  },
  {
    q: "What payment methods are accepted?",
    a: `Accepted payment methods: ${PLACEHOLDER}.`,
  },
];
