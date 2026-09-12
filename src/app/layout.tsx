import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/*
 * Resolves to the custom domain once one is attached in Vercel, falls back to
 * the deployment URL, then to localhost in development. Set NEXT_PUBLIC_SITE_URL
 * (host only, no scheme) to override.
 */
const siteHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = siteHost ? `https://${siteHost}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Juno Solutions | After-hours leads, answered and booked",
    template: "%s | Juno Solutions",
  },
  description:
    "We answer every after-hours call and web inquiry for new-home builders, qualify the buyer against your criteria, and book the appointment. It lands in the CRM your team already uses.",
  openGraph: {
    title: "Juno Solutions | After-hours leads, answered and booked",
    description:
      "We answer every after-hours call and web inquiry for new-home builders, qualify the buyer, and book the appointment on your team's calendar.",
    type: "website",
    siteName: "Juno Solutions",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-ink">
        {/*
          Scroll reveals are progressive enhancement; without JS, show everything.
          Raw HTML rather than a React <style> child, so React 19 doesn't hoist it
          out of the <noscript> and break hydration.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
