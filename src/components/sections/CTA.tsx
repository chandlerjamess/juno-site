import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";

export default function CTA() {
  return (
    <section className="on-dark bg-ink py-24 text-white sm:py-32 lg:py-40">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Tonight, someone is going to call. Let&rsquo;s make sure someone
            answers.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-grey-400">
            Twenty minutes on the phone. We will look at your after-hours
            volume, what it is costing you today, and what covering it would
            actually take.
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact" variant="inverse">
              Book a call
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
