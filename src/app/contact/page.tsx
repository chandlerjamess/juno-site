import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/ContactForm";
import { Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Talk to Juno Solutions about covering your after-hours calls and web inquiries. Twenty minutes, no obligation.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div className="py-16 sm:py-24 lg:py-28">
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Eyebrow>Book a call</Eyebrow>
                <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl">
                  Let&rsquo;s look at what you&rsquo;re missing after five.
                </h1>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-grey-600">
                  Twenty minutes. We will walk through your after-hours volume,
                  what happens to those leads today, and what it would take to
                  cover them. No deck, and nothing for you to install.
                </p>
                <p className="mt-8 border-t border-grey-200 pt-6 text-sm leading-relaxed text-grey-600">
                  Prefer email? Reach us at{" "}
                  <a
                    href="mailto:hello@junosolutions.co"
                    className="text-ink underline decoration-grey-400 underline-offset-4 transition-colors hover:decoration-ink"
                  >
                    hello@junosolutions.co
                  </a>
                  .
                </p>
              </div>

              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
