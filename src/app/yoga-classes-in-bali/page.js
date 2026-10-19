import Link from 'next/link';
import { PageHero, CtaBand } from '@/components/ui';

export const metadata = {
  title: 'Drop-in Yoga Classes in Ubud',
  description: 'Daily drop-in yoga classes at Bali Yoga School in Ubud, for beginner, intermediate and advanced practitioners.',
  alternates: { canonical: '/yoga-classes-in-bali/' },
};

// Text from /yoga-classes-in-bali/. The original booking form rendered a raw shortcode;
// bookings are directed to the enquiry form instead. No class timetable was published.
export default function DropIn() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Retreats', href: '/yoga-retreats-in-bali/' }, { label: 'Drop-in classes' }]}
        eyebrow="Ubud"
        title="Daily drop-in yoga classes"
        lead="Daily drop-in classes are held separately: they are not part of any course or retreat programme. Classes are adapted for beginner, intermediate and advanced practitioners."
        image="class-seated"
        facts={[{ label: 'Location', value: 'Ubud campus' }, { label: 'Published fee', value: '15 USD per class' }]}
      >
        <Link className="btn btn--primary" href="/contact/">Ask about a class</Link>
      </PageHero>
      <section className="section">
        <div className="container narrow">
          <p>Located in Ubud, the training centre has a calm atmosphere that helps you connect with your inner self. To book a class, please contact the school.</p>
          <p className="notice"><strong>Awaiting confirmation.</strong> Class times were not published on the original page, and the fee should be confirmed before you visit.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
