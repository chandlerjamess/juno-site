import Section, { SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";

const steps = [
  {
    title: "We answer",
    body: "Every after-hours call and web inquiry, answered live in under a minute. Nights, weekends, holidays, and the overflow when your counselors are already on the phone. No voicemail, no callback form, no rotating cell phone.",
  },
  {
    title: "We qualify",
    body: "Budget, timeline, community, financing, and whether they have a home to sell. All asked against your criteria, not a generic script. Buyers who are ready move forward. The rest are logged and nurtured, not dropped.",
  },
  {
    title: "We book",
    body: "The appointment goes straight onto your team's calendar, in the slots you have told us are open, with the right counselor for that community. The buyer gets a confirmation before they hang up.",
  },
  {
    title: "It's in your CRM by morning",
    body: "The lead, the full transcript, the qualification notes, and the booked time are written into the record your team already works. Nothing for anyone to re-key, re-check, or do differently.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Reveal>
        <SectionHeading
          eyebrow="What we do"
          title="We handle the hours you don't."
          lede="This is a service, not a tool you have to set up. You tell us your criteria and your calendars once. From there we run it."
        />
      </Reveal>

      <ol className="mt-16 border-t border-grey-200 sm:mt-20">
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={i * 80}
            className="block border-b border-grey-200 py-10 sm:py-12"
          >
            <div className="grid gap-4 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-2">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-2xl font-semibold tracking-[-0.025em] md:col-span-4 md:text-[1.75rem]">
                {step.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-grey-600 md:col-span-6">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
