import Link from 'next/link';
import { PageHero } from '@/components/ui';
import RichSections from '@/components/RichSections';
import { contentPage } from '@/lib/pages';

export const metadata = {
  title: 'Terms & Conditions / Refund Policy',
  description: 'Terms and conditions and refund policy for Bali Yoga School courses and retreats.',
  alternates: { canonical: '/terms-conditions/' },
};

export default function Terms() {
  const page = contentPage('terms-conditions');
  return (
    <>
      <PageHero crumbs={[{ label: 'Terms & conditions' }]} title="Terms & conditions and refund policy" lead={page.intro?.[0]} />
      <section className="section">
        <div className="container narrow">
          <p className="notice" style={{ marginBottom: 'var(--space-6)' }}>
            <strong>Course reschedule policy.</strong> Each student is eligible for one course reschedule only. Once the course has been rescheduled, no further changes to the course dates will be permitted. Refund and reschedule wording differs between some original pages; please confirm the policy that applies to your booking with the school.
          </p>
          <RichSections sections={page.sections} mode="accordion" />
          <p style={{ marginTop: 'var(--space-6)' }}>
            <Link className="text-link" href="/course-payment/">Payment policy</Link>{'  '}
            <Link className="text-link" href="/intellectual-property-copyright-trademark/">Trademark & IP policy</Link>
          </p>
        </div>
      </section>
    </>
  );
}
