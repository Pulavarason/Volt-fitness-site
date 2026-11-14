import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Facilities } from "@/components/sections/Facilities";
import { Programs } from "@/components/sections/Programs";
import { Membership } from "@/components/sections/Membership";
import { Trainers } from "@/components/sections/Trainers";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Enquiry } from "@/components/sections/Enquiry";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Facilities />
        <Programs />
        <Membership />
        <Trainers />
        <WhyChoose />
        <Gallery />
        <Testimonials />
        <Enquiry />
        <Contact />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
