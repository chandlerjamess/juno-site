import Link from "next/link";
import Container from "./ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-grey-200 bg-white py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-[15px] font-semibold tracking-[-0.02em]">
              Juno Solutions
            </p>
            <p className="mt-3 text-sm leading-relaxed text-grey-600">
              After-hours lead capture and appointment setting for new-home
              builders.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm md:items-end">
            <a
              href="mailto:hello@junosolutions.co"
              className="text-grey-600 transition-colors hover:text-ink"
            >
              hello@junosolutions.co
            </a>
            <nav aria-label="Footer" className="flex gap-6">
              <Link
                href="/contact"
                className="text-grey-600 transition-colors hover:text-ink"
              >
                Contact
              </Link>
              <Link
                href="/privacy"
                className="text-grey-600 transition-colors hover:text-ink"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-grey-600 transition-colors hover:text-ink"
              >
                Terms
              </Link>
            </nav>
          </div>
        </div>

        <p className="mt-12 border-t border-grey-200 pt-6 text-xs text-grey-500">
          &copy; {new Date().getFullYear()} Juno Solutions. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
