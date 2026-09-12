"use client";

import { useState } from "react";
import Section, { SectionHeading } from "../ui/Section";
import Reveal from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";

/**
 * Deliberately built on the visitor's own numbers.
 *
 * Every figure here is something they type. No industry averages, no borrowed
 * conversion rates, no "studies show" — a VP of Sales discounts those instantly,
 * and the argument is stronger when the only assumptions on screen are theirs.
 */
const FIELDS = [
  { key: "communities", label: "Communities you sell", min: 1, max: 40, step: 1, suffix: "" },
  {
    key: "callsPerWeek",
    label: "After-hours calls and web inquiries, per community, per week",
    min: 1,
    max: 40,
    step: 1,
    suffix: "",
  },
  {
    key: "reachRate",
    label: "Of those, how many your team eventually reaches",
    min: 10,
    max: 100,
    step: 5,
    suffix: "%",
  },
] as const;

type Key = (typeof FIELDS)[number]["key"];

const DEFAULTS: Record<Key, number> = {
  communities: 6,
  callsPerWeek: 6,
  reachRate: 65,
};

/**
 * Share of never-reached inquiries that become a booked tour.
 *
 * Deliberately conservative, and deliberately the only number on the page we
 * supply. Most after-hours callers are not buyers — they are warranty calls,
 * vendors, and people who already bought elsewhere. A calculator that projects
 * a nine-figure revenue swing gets a VP to close the tab, which is the opposite
 * of what it is for.
 */
const BOOK_RATE = 0.2;

export default function Calculator() {
  const [values, setValues] = useState<Record<Key, number>>(DEFAULTS);

  const perYear = values.communities * values.callsPerWeek * 52;
  const missed = Math.round((perYear * (100 - values.reachRate)) / 100);
  const appointments = Math.round(missed * BOOK_RATE);

  return (
    <Section id="cost" tone="tint">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            eyebrow="What it costs"
            title="Put your own numbers in."
            lede="No industry averages and no borrowed conversion rates. Every figure here is one you set, and the only number we supply is a deliberately cautious one."
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="space-y-7 border-t border-grey-200 pt-7">
              {FIELDS.map((field) => (
                <div key={field.key}>
                  <div className="flex items-baseline justify-between gap-4">
                    <label
                      htmlFor={field.key}
                      className="text-sm leading-snug text-grey-600"
                    >
                      {field.label}
                    </label>
                    <span className="shrink-0 font-mono text-base tabular-nums text-ink">
                      {values[field.key]}
                      {field.suffix}
                    </span>
                  </div>
                  <input
                    id={field.key}
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={values[field.key]}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [field.key]: Number(e.target.value) }))
                    }
                    className="mt-3 w-full accent-ink"
                  />
                </div>
              ))}

            </div>
          </Reveal>

          <Reveal delay={120}>
            <dl className="mt-10 grid gap-px border-t border-grey-200 sm:grid-cols-3">
              <div className="border-b border-grey-200 py-6 sm:border-b-0 sm:pr-6">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
                  Inquiries a year
                </dt>
                <dd className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.03em]">
                  {perYear.toLocaleString()}
                </dd>
                <p className="mt-1 text-xs text-grey-500">arriving when nobody is there</p>
              </div>
              <div className="border-b border-grey-200 py-6 sm:border-b-0 sm:px-6">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
                  Never reached
                </dt>
                <dd className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.03em]">
                  {missed.toLocaleString()}
                </dd>
                <p className="mt-1 text-xs text-grey-500">at the rate you set above</p>
              </div>
              <div className="py-6 sm:pl-6">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
                  Tours we&rsquo;d book
                </dt>
                <dd className="mt-2 text-3xl font-semibold tabular-nums tracking-[-0.03em]">
                  {appointments.toLocaleString()}
                </dd>
                <p className="mt-1 text-xs text-grey-500">one in five of them, conservatively</p>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-grey-600">
              We have deliberately not put a revenue figure on this. You know
              what a tour is worth to you far better than we do, and a
              calculator that hands you a nine-figure number is one you would be
              right to ignore.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contact">Book a call</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
