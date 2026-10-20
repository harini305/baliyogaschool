import Link from 'next/link';
import { PageHero } from '@/components/ui';
import RichSections from '@/components/RichSections';
import { contentPage } from '@/lib/pages';

export const metadata = {
  title: 'Course Payment Policy',
  description: 'Advance booking fee, balance payment and surcharge policy for Bali Yoga School courses.',
  alternates: { canonical: '/course-payment/' },
};

// Bank account details and Razorpay / PayPal links from the original page are deliberately
// not published in this frontend build (payment channels unconfirmed; no real payments).
export default function Payment() {
  const page = contentPage('course-payment');
  const sections = page.sections.filter((x) => !/Payment Options/i.test(x.heading));
  return (
    <>
      <PageHero crumbs={[{ label: 'Payment policy' }]} title="Course payment policy" lead="How the advance booking fee and the remaining course balance are paid, as described on the original payment page." />
      <section className="section">
        <div className="container narrow">
          <p className="notice" style={{ marginBottom: 'var(--space-6)' }}>
            <strong>No payments on this site.</strong> This is a frontend preview. Payment links and bank details are not shown until the school confirms its current payment channels. Nothing on this page takes or confirms a payment.
          </p>
          <RichSections sections={sections} mode="prose" />
          <p style={{ marginTop: 'var(--space-6)' }}>
            <Link className="btn btn--primary" href="/contact/">Ask about payment</Link>
          </p>
        </div>
      </section>
    </>
  );
}
