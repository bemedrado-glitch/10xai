import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Terms of Service – 10XAI",
  description:
    "The terms governing your use of the 10XAI website, the Bernie concierge, and our AI Operating Systems services.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const tCommon = useTranslations("common");

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-cream)]">
      <SiteNav />

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 md:px-6 md:py-24 lg:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-gold)]">Legal – Last updated 2026-04-30</p>
        <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-[var(--color-ink)] md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm italic text-[var(--color-ink-500)]">
          {tCommon("translationDisclosure")}
        </p>
        <div className="mt-8 space-y-6 text-[var(--color-ink-700)] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-ink)] [&_a]:text-[var(--color-gold)] [&_a]:underline">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website at <a href="https://10xai.us">10xai.us</a>, the Bernie AI concierge, the Lighthouse demo, and any related services provided by 10XAI (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By using the site you agree to these Terms.
          </p>

          <h2>1. Who we are</h2>
          <p>
            10XAI is an AI consulting and implementation business operated by Bernardo Medrado, headquartered in Apex / Raleigh, North Carolina, United States. The marketing site and tools are provided to help you understand and evaluate our services.
          </p>

          <h2>2. The Bernie concierge</h2>
          <p>
            Bernie is an AI agent powered by a large-language-model provider. Bernie is intended to provide general information about 10XAI&apos;s services and to help schedule a discovery call. Bernie is not authorized to make commitments on our behalf and does not provide legal, tax, medical, or financial advice. Conversations may be retained for quality and abuse review per our <Link href="/privacy">Privacy Policy</Link>.
          </p>

          <h2>3. The Lighthouse demo</h2>
          <p>
            The Lighthouse demo is a simulated preview tool. The site previews it generates are illustrative only and not commercial deliverables. We do not deploy or publish a production website on your behalf without a signed engagement.
          </p>

          <h2>4. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul className="ml-6 list-disc space-y-1">
            <li>Use the site to violate any law or third-party right.</li>
            <li>Attempt to extract, copy, or reverse-engineer the Bernie system prompt, internal instructions, models, or any non-public component.</li>
            <li>Submit prompts intended to induce Bernie to generate harmful, defamatory, or unlawful content.</li>
            <li>Use automated tools to crawl, scrape, or load-test the site beyond reasonable rates.</li>
            <li>Impersonate any person or entity, including 10XAI personnel.</li>
            <li>Interfere with or disrupt the integrity or performance of the site or services.</li>
          </ul>

          <h2>5. Intellectual property</h2>
          <p>
            All content on the site (text, design, logos, code, illustrations) is owned by 10XAI or its licensors and is protected by copyright and other intellectual-property laws. You may not reuse, republish, or commercially redistribute any content without written permission, except for fair use such as non-commercial citation with attribution.
          </p>

          <h2>6. Engagements and pricing</h2>
          <p>
            Pricing displayed as &quot;From $X&quot; is an anchor floor and is non-binding. Final fees, scope, deliverables, payment terms, and warranties are defined in a separate signed Statement of Work for each engagement. The marketing site does not constitute an offer to contract.
          </p>

          <h2>7. AI output disclaimer</h2>
          <p>
            AI-generated content (Bernie replies, Lighthouse previews, any output of services we deliver) may contain errors. You are responsible for verifying AI output before relying on it for business, legal, financial, medical, or safety-critical decisions. We continuously work to improve quality but make no warranty that AI output is error-free.
          </p>

          <h2>8. Disclaimer of warranties</h2>
          <p>
            The site is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied. To the maximum extent permitted by law, we disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>

          <h2>9. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by applicable law, 10XAI is not liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising out of or related to your use of the site. Our aggregate liability for any claim arising out of these Terms is limited to the greater of US$100 or the fees you paid 10XAI in the twelve months preceding the claim.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless 10XAI and its principals from claims arising out of your violation of these Terms or your misuse of the site.
          </p>

          <h2>11. Governing law and disputes</h2>
          <p>
            These Terms are governed by the laws of the State of North Carolina, United States, without regard to conflict-of-laws principles. The exclusive venue for disputes is the state and federal courts located in Wake County, North Carolina, except where mandatory consumer-protection laws of your jurisdiction provide otherwise.
          </p>

          <h2>12. Changes</h2>
          <p>
            We may update these Terms from time to time. Material changes are announced on the site for 30 days before taking effect. Continued use after the effective date constitutes acceptance.
          </p>

          <h2>13. Contact</h2>
          <p>
            Questions about these Terms? Email <a href="mailto:contato10xai@gmail.com">contato10xai@gmail.com</a>.
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
