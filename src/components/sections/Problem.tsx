import Section, { SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";

const moments = [
  {
    time: "5:02 PM",
    body: "A buyer finishes work and calls about the community they drove through at lunch. Your online sales counselors left at five. It rings out, or it goes to voicemail.",
  },
  {
    time: "Saturday, 7:40 PM",
    body: "A web inquiry comes in from a family that spent the afternoon touring. It sits in the queue until Monday. By Monday they have already walked two other builders' models.",
  },
  {
    time: "Monday, 8:15 AM",
    body: "Your team opens the week with a voicemail backlog instead of a calendar. They spend the morning chasing leads that have already moved on, and paid for every one of them.",
  },
];

export default function Problem() {
  return (
    <Section id="problem" tone="tint">
      <Reveal>
        <SectionHeading
          eyebrow="The problem"
          title="Nobody answers. So they call the next builder."
          lede="Buyers shop for homes on their own time. Evenings, weekends, and the hours right after they leave a model. That is exactly when your sales floor is empty."
        />
      </Reveal>

      <div className="mt-16 grid gap-px border-t border-grey-200 sm:mt-20 md:grid-cols-3">
        {moments.map((moment, i) => (
          <Reveal
            key={moment.time}
            delay={i * 100}
            className="border-b border-grey-200 py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
              {moment.time}
            </p>
            <p className="mt-4 text-base leading-relaxed text-grey-600">
              {moment.body}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <p className="mt-12 max-w-2xl text-xl font-medium leading-snug tracking-[-0.02em] sm:mt-16 sm:text-2xl">
          The lead did not go cold. It went somewhere else.
        </p>
      </Reveal>
    </Section>
  );
}
