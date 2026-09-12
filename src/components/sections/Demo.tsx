import Section, { Eyebrow } from "../ui/Section";
import Reveal from "../ui/Reveal";

/** Single source of truth for the demo line. */
export const DEMO_NUMBER_E164 = "+14692906054";
export const DEMO_NUMBER_DISPLAY = "(469) 290-6054";

const EXPECT = [
  {
    label: "It answers on the first ring",
    body: "No menu, no hold, no callback form. Same as a buyer would get at nine on a Saturday night.",
  },
  {
    label: "Ask it anything a buyer would",
    body: "Price range, school district, what's ready now, MUD rate. Try to catch it out. Ask about incentives and watch it defer.",
  },
  {
    label: "Then book a tour",
    body: "It'll offer real times and confirm by text before you hang up. That's the whole product.",
  },
];

export default function Demo() {
  return (
    <Section id="demo" tone="dark" bordered={false}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Hear it yourself</Eyebrow>
          <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            Don&rsquo;t take our word for it. Call the thing.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-grey-400">
            This is the same agent that answers for our builders, running a
            community we made up. It takes about two minutes.
          </p>

          <a
            href={`tel:${DEMO_NUMBER_E164}`}
            className="mt-10 inline-flex items-baseline gap-3 text-3xl font-semibold tracking-[-0.03em] text-white underline decoration-grey-600 underline-offset-[10px] transition-colors hover:decoration-white sm:text-4xl"
          >
            {DEMO_NUMBER_DISPLAY}
          </a>
          <p className="mt-4 text-sm text-grey-400">
            Tap to call from a phone. No form, nothing to sign up for.
          </p>
        </Reveal>

        <div className="lg:col-span-7">
          <ol className="border-t border-grey-600">
            {EXPECT.map((item, i) => (
              <Reveal
                as="li"
                key={item.label}
                delay={i * 80}
                className="block border-b border-grey-600 py-7"
              >
                <div className="flex gap-6">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-grey-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.02em] text-white">
                      {item.label}
                    </h3>
                    <p className="mt-2 max-w-lg text-base leading-relaxed text-grey-400">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={260}>
            <p className="mt-8 text-sm leading-relaxed text-grey-400">
              It will tell you it&rsquo;s an AI in the first sentence. Every
              caller hears that, every time. It&rsquo;s the law in Texas, and it&rsquo;s
              how we&rsquo;d want it anyway.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
