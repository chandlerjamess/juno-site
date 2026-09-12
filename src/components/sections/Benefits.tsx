import Section, { SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";

const benefits = [
  {
    title: "A calendar, not a callback list",
    body: "Counselors start the day with confirmed appointments already on the books, and spend their morning preparing for them instead of dialing numbers that have gone quiet.",
  },
  {
    title: "Mondays that start at full speed",
    body: "Weekend volume is handled by Sunday night. No triage, no backlog, no guessing which of forty voicemails is worth returning first.",
  },
  {
    title: "Context before the conversation",
    body: "Budget, timeline, community interest, and financing status are asked and answered before your counselor picks up. They walk into a warm conversation, not a discovery call.",
  },
  {
    title: "Off hours that are actually off",
    body: "No rotating after-hours phone, no personal cell number on a listing, no counselor answering at nine on a Saturday to protect a lead.",
  },
  {
    title: "Every lead reached while it's warm",
    body: "The buyer hears a person while they are still sitting in the driveway looking at the sign, which is the only moment that reliably converts.",
  },
  {
    title: "A straight answer on what after hours is worth",
    body: "You see how many calls came in, what happened to each one, and how many turned into appointments. Reporting arrives to you. There is nothing to go log in and pull.",
  },
];

export default function Benefits() {
  return (
    <Section id="benefits">
      <Reveal>
        <SectionHeading
          eyebrow="What your team gets back"
          title="What your counselors walk in to."
          lede="The point of this is not coverage for its own sake. It is what your salespeople are doing at 8:15 on Monday morning."
        />
      </Reveal>

      <div className="mt-16 grid gap-x-12 gap-y-px border-t border-grey-200 sm:mt-20 md:grid-cols-2">
        {benefits.map((benefit, i) => (
          <Reveal
            key={benefit.title}
            delay={(i % 2) * 80}
            className="border-b border-grey-200 py-8"
          >
            <h3 className="text-lg font-medium tracking-[-0.02em]">
              {benefit.title}
            </h3>
            <p className="mt-2 max-w-xl text-base leading-relaxed text-grey-600">
              {benefit.body}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
