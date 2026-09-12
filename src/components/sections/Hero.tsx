import Container from "../ui/Container";
import { ButtonLink } from "../ui/Button";

export default function Hero() {
  return (
    <section className="pb-20 pt-16 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-32">
      <Container>
        {/*
          Above the fold, so this uses the CSS-only `reveal-on-load` entrance
          rather than the scroll observer — it must paint without waiting on JS.
        */}
        <div className="reveal-on-load max-w-4xl">
          <h1 className="text-balance text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Your best leads call after your team goes home.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-grey-600 sm:text-xl">
            Juno Solutions answers every after-hours call and web inquiry for
            new-home builders. We qualify the buyer against your criteria, book
            the appointment on your team&rsquo;s calendar, and put it in the CRM
            you already use. Your counselors walk in to a booked day.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/contact">Book a call</ButtonLink>
            <a
              href="#demo"
              className="text-sm font-medium text-grey-600 underline decoration-grey-200 underline-offset-[6px] transition-colors hover:text-ink hover:decoration-ink"
            >
              Or call it right now &mdash; (469) 290-6054
            </a>
          </div>
        </div>

        <div
          className="reveal-on-load mt-16 sm:mt-20"
          style={{ animationDelay: "120ms" }}
        >
          <p className="border-t border-grey-200 pt-6 font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
            Nights, weekends, and holidays. Answered live, in under a minute
          </p>
        </div>
      </Container>
    </section>
  );
}
