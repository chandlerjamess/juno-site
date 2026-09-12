import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Juno Solutions website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="August 2026">
      <section>
        <h2>This site</h2>
        <p>
          These terms cover the use of junosolutions.co. Services we perform for
          a builder client are governed by the signed agreement with that
          client, not by this page.
        </p>
      </section>
      <section>
        <h2>What is on it</h2>
        <p>
          The content here describes our service in general terms. It is not a
          quote, a service-level commitment, or an offer, and we may change it
          without notice.
        </p>
      </section>
      <section>
        <h2>Ownership</h2>
        <p>
          The text, design, and marks on this site belong to Juno Solutions.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a
            href="mailto:sales@junosolutions.co"
            className="text-ink underline decoration-grey-400 underline-offset-4 hover:decoration-ink"
          >
            sales@junosolutions.co
          </a>
          .
        </p>
      </section>
      <p className="border-t border-grey-200 pt-8 text-sm text-grey-500">
        Placeholder terms. Replace with language reviewed by counsel before
        launch.
      </p>
    </LegalPage>
  );
}
