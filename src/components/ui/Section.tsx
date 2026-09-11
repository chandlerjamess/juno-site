import type { ReactNode } from "react";
import Container from "./Container";

type Tone = "white" | "tint" | "dark";

const tones: Record<Tone, string> = {
  white: "bg-white",
  tint: "bg-grey-50",
  dark: "on-dark bg-ink text-white",
};

/** Consistent vertical rhythm and section separation across the page. */
export default function Section({
  id,
  tone = "white",
  bordered = true,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  bordered?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} ${
        bordered ? "border-t border-grey-200" : ""
      } py-20 sm:py-28 lg:py-36 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
        {title}
      </h2>
      {lede ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-grey-600">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
