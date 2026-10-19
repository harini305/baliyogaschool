import { PageHero } from '@/components/ui';
import RichSections from '@/components/RichSections';
import { contentPage } from '@/lib/pages';

export const metadata = {
  title: 'Intellectual Property, Copyright & Trademark Policy',
  description: 'How Bali Yoga School protects its brand, website, photographs, videos, educational materials and other proprietary content.',
  alternates: { canonical: '/intellectual-property-copyright-trademark/' },
};

// The footer link /intellectual-property-policy/ (404 on the original site) now redirects here.
// Drafting notes left in the original page text are not published (see hand-off report).
export default function IpPolicy() {
  const page = contentPage('intellectual-property-copyright-trademark');
  const meta = page.policyMeta || {};
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Trademark & IP policy' }]}
        eyebrow="Legal"
        title="Intellectual property, copyright and trademark policy"
        lead={page.notice?.paragraphs?.[0]}
        facts={[meta.effectiveDate && { label: 'Effective', value: meta.effectiveDate }, meta.lastUpdated && { label: 'Last updated', value: meta.lastUpdated }].filter(Boolean)}
      />
      <section className="section">
        <div className="container narrow">
          {page.notice?.paragraphs?.slice(1, 2).map((t, i) => <p key={i} className="notice" style={{ marginBottom: 'var(--space-6)' }}>{t}</p>)}
          <RichSections sections={page.sections} mode="accordion" />
        </div>
      </section>
    </>
  );
}
