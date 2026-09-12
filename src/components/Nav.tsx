"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./ui/Container";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#demo", label: "Hear it" },
  { href: "/#workflow", label: "Your workflow" },
  { href: "/#compliance", label: "Compliance" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-grey-200 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[-0.02em]"
          >
            Juno Solutions
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-grey-600 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="text-sm font-medium text-ink underline decoration-grey-400 underline-offset-[6px] transition-colors hover:decoration-ink"
            >
              Book a call
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              {open ? (
                <path
                  d="M4 4l10 10M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M2 5.5h14M2 12.5h14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-grey-200 bg-white md:hidden"
        >
          <Container>
            <nav aria-label="Main" className="flex flex-col py-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-grey-100 py-4 text-base text-grey-600"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="py-4 text-base font-medium text-ink"
              >
                Book a call
              </Link>
            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
