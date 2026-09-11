import Section, { SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";

const points = [
  {
    title: "No new logins",
    body: "Your team keeps the tools they have. We do not add a login, a tab, or a place they have to remember to check.",
  },
  {
    title: "Your CRM, your fields",
    body: "Leads and appointments write into the records your counselors already open every morning — Lasso, HubSpot, Salesforce, or whatever you run today.",
  },
  {
    title: "Your rules",
    body: "Qualification criteria, calendar availability, community assignments, and escalation paths are yours. We follow them exactly, and change them when you say so.",
  },
  {
    title: "No process change",
    body: "There is nothing to roll out and no training day. Your team's Monday looks the same, except the calendar is full.",
  },
];

export default function Workflow() {
  return (
    <Section id="workflow" tone="tint">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="Fits your workflow"
            title="Nothing changes on your end."
            lede="The most common question we get is what the sales team has to learn. The answer is nothing. Work shows up where they already look for it."
          />
        </Reveal>

        <div className="lg:col-span-7">
          <dl className="border-t border-grey-200">
            {points.map((point, i) => (
              <Reveal
                key={point.title}
                delay={i * 80}
                className="border-b border-grey-200 py-7"
              >
                <dt className="text-lg font-medium tracking-[-0.02em]">
                  {point.title}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-grey-600">
                  {point.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
