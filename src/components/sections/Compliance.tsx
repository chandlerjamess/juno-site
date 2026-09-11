import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

export default function Compliance() {
  return (
    <Section id="compliance" tone="tint">
      <Reveal className="max-w-3xl">
        {/* Styled as an eyebrow, but a real heading so the section is named. */}
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
          Compliance
        </h2>
        <p className="text-pretty text-xl font-medium leading-[1.45] tracking-[-0.02em] sm:text-2xl">
          Every call and message we send on your behalf follows TCPA consent and
          calling-time rules, and Texas AI disclosure requirements are met at the
          start of every automated interaction. We keep the consent records and
          the transcripts, and they are yours whenever you want them. If your
          legal team wants to review how it works, we will walk them through it.
        </p>
      </Reveal>
    </Section>
  );
}
