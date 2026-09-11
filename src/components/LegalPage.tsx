import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Container from "./ui/Container";

/**
 * Shared shell for the privacy and terms pages. The copy in those pages is
 * placeholder legal text — replace it with language reviewed by counsel.
 */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div className="py-16 sm:py-24">
          <Container>
            <div className="max-w-2xl">
              <h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-grey-500">
                Last updated {updated}
              </p>
              <div className="mt-12 space-y-8 border-t border-grey-200 pt-12 text-base leading-relaxed text-grey-600 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_p]:mt-2">
                {children}
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
