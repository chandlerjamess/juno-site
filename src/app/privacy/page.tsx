import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Juno Solutions handles information collected on this site.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="August 2026">
      <section>
        <h2>What we collect</h2>
        <p>
          If you contact us through this site, we collect the information you
          enter: your name, company, role, email, phone number, the number of
          communities you sell, and anything you write in the message field.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>
          We use it to respond to you and to prepare for the call you requested.
          We do not sell it, and we do not share it with anyone outside Juno
          Solutions except the service providers who help us operate, who are
          bound to use it only on our instructions.
        </p>
      </section>
      <section>
        <h2>Client data</h2>
        <p>
          Information we handle on behalf of a builder client — call recordings,
          transcripts, consent records, and lead details — belongs to that
          client and is governed by our agreement with them, not by this notice.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions, or want your information removed? Email{" "}
          <a
            href="mailto:hello@junosolutions.co"
            className="text-ink underline decoration-grey-400 underline-offset-4 hover:decoration-ink"
          >
            hello@junosolutions.co
          </a>
          .
        </p>
      </section>
      <p className="border-t border-grey-200 pt-8 text-sm text-grey-500">
        Placeholder notice. Replace with language reviewed by counsel before
        launch.
      </p>
    </LegalPage>
  );
}
