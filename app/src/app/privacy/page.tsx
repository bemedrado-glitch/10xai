import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Privacy Policy  10XAI",
  description:
    "How 10XAI collects, uses, stores, and protects your data. GDPR, LGPD, and CCPA aligned.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <header className="sticky top-0 z-30 w-full border-b border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="10XAI home">
            <Image src="/brand/logo-wordmark-light.svg" alt="10XAI" width={120} height={32} priority />
          </Link>
          <Link href="/" className="text-sm text-[var(--color-ink-700)] hover:text-[var(--color-ink)]">
             Back home
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 md:px-6 md:py-24 lg:px-8 prose-lg">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Legal  Last updated 2026-04-30</p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-8 space-y-6 text-[var(--color-ink-700)] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-ink)] [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[var(--color-ink)] [&_a]:text-[var(--color-gold)] [&_a]:underline">
          <p>
            10XAI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is an AI agency operated by Bernardo Medrado, headquartered in Apex / Raleigh, North Carolina, United States. This Privacy Policy explains how we collect, use, store, share, and protect your personal data across <a href="https://10xai.us">10xai.us</a> and any related services.
          </p>
          <p>
            We are committed to compliance with the EU General Data Protection Regulation (GDPR), the Brazilian Lei Geral de Proteo de Dados (LGPD), and the California Consumer Privacy Act (CCPA), in addition to applicable U.S. federal and state laws.
          </p>

          <h2>1. Data we collect</h2>
          <p>We collect three categories of data:</p>
          <h3>1.1  Information you provide</h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>Contact information you submit through forms (name, email, phone, company, role).</li>
            <li>Conversation content you send to Bernie, our AI concierge, including the messages you type and any business URLs you paste.</li>
            <li>Booking details when you schedule a call, including calendar availability via our booking provider.</li>
          </ul>
          <h3>1.2  Information collected automatically</h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>Standard server logs (IP address, user agent, timestamps, referrer).</li>
            <li>Anonymized analytics events (page views, clicks, scroll depth) for product improvement.</li>
            <li>Cookies strictly necessary for the site to function, plus optional analytics cookies you can refuse.</li>
          </ul>
          <h3>1.3  Information from third parties</h3>
          <ul className="ml-6 list-disc space-y-1">
            <li>If you book through our calendar provider, that provider shares your email and timezone with us.</li>
            <li>If you authorize us to enrich a Lighthouse lead, we may pull publicly-available business information from Google Business Profile, LinkedIn, and similar public sources.</li>
          </ul>

          <h2>2. How we use your data</h2>
          <p>We use personal data only for the following purposes:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Responding to your inquiries and delivering the services you request.</li>
            <li>Sending the AI agents we build for you the data they need to do their job (always under your direction, never to third parties beyond our processors).</li>
            <li>Improving the site, the Bernie concierge, and our service quality.</li>
            <li>Compliance with legal obligations and protection against fraud or abuse.</li>
          </ul>

          <h2>3. Legal basis (GDPR / LGPD)</h2>
          <p>We rely on the following legal bases:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li><strong>Consent</strong>  for optional analytics cookies, marketing communications, and AI training of bespoke client agents.</li>
            <li><strong>Contract</strong>  to deliver services you have engaged us for.</li>
            <li><strong>Legitimate interest</strong>  for security, anti-fraud, and B2B business-development outreach where allowed by law.</li>
            <li><strong>Legal obligation</strong>  for record-keeping and regulatory requirements.</li>
          </ul>

          <h2>4. Sub-processors and AI providers</h2>
          <p>We use carefully selected sub-processors to deliver the service. The principal ones include:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li><strong>Anthropic</strong>  large-language-model provider powering Bernie. Conversations are processed in accordance with Anthropic's privacy policy. Anthropic does not train on API data by default.</li>
            <li><strong>Vercel</strong>  hosting and edge delivery.</li>
            <li><strong>Supabase</strong>  database and authentication (planned).</li>
            <li><strong>Cal.com</strong>  call booking.</li>
            <li><strong>Resend</strong>  transactional email.</li>
          </ul>
          <p>We do not sell your personal data. We do not share it for advertising purposes.</p>

          <h2>5. Data retention</h2>
          <p>
            We retain personal data only as long as necessary for the purposes for which it was collected. Conversation logs from Bernie are retained for up to 90 days for quality and abuse-prevention review, then deleted unless you have an active engagement requiring longer retention. Booking records are retained for the duration of the customer relationship plus seven years for tax/audit compliance.
          </p>

          <h2>6. International transfers</h2>
          <p>
            Because we operate across the United States, Brazil, and Latin America, your data may be transferred internationally. Where required, we implement Standard Contractual Clauses or rely on adequacy decisions to safeguard transfers.
          </p>

          <h2>7. Your rights</h2>
          <p>Depending on your jurisdiction, you have rights including:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Access to the personal data we hold about you.</li>
            <li>Correction of inaccurate data.</li>
            <li>Deletion of your data (subject to legal-retention exceptions).</li>
            <li>Restriction or objection to processing.</li>
            <li>Data portability in a machine-readable format.</li>
            <li>Withdrawal of consent at any time without affecting prior lawful processing.</li>
            <li>The right to lodge a complaint with your data-protection authority.</li>
          </ul>
          <p>
            To exercise any right, email <a href="mailto:contato10xai@gmail.com">contato10xai@gmail.com</a>. We respond within 30 days (15 days for LGPD requests).
          </p>

          <h2>8. Security</h2>
          <p>
            We implement technical and organizational measures appropriate to the risk: encryption in transit, encryption at rest where applicable, role-based access controls, audit logging, and regular review of our sub-processors. No system is perfectly secure; if we discover a breach affecting your data, we notify affected users and the relevant authority within 72 hours where required by law.
          </p>

          <h2>9. Children</h2>
          <p>
            10XAI is a B2B service. We do not knowingly collect personal data from anyone under 16. If you believe we have collected such data, contact us and we will delete it.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The &quot;last updated&quot; date at the top reflects the most recent revision. Material changes are announced on the site for 30 days before taking effect.
          </p>

          <h2>11. Contact</h2>
          <p>
            10XAI  Apex / Raleigh, NC, United States.
            <br />
            Email: <a href="mailto:contato10xai@gmail.com">contato10xai@gmail.com</a>
            <br />
            For data-protection requests, please put &quot;Privacy Request&quot; in the subject line.
          </p>
        </div>
      </main>
      <footer className="border-t border-[var(--color-ink-300)]/60 bg-[var(--color-cream)]">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
          <p className="text-xs text-[var(--color-ink-500)]">&copy; 2026 10XAI  contato10xai@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
