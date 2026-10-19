import { Suspense } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import ContactForm from '@/components/ContactForm';
import CopyButton from '@/components/CopyButton';
import { allProgrammes, KIND_LABEL } from '@/lib/catalog';
import { site } from '@/data/site';
import s from './contact.module.css';

export const metadata = {
  title: 'Contact',
  description: 'Contact Bali Yoga School in Ubud, Bali: address, email and phone, and an enquiry form for courses and retreats.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  const groups = [];
  for (const p of allProgrammes()) {
    const label = `${KIND_LABEL[p.sub]}${p.campus && p.location !== 'online' ? ` · ${p.campus.name}` : ''}`;
    let g = groups.find((x) => x.label === label);
    if (!g) { g = { label, options: [] }; groups.push(g); }
    g.options.push({ value: p.slug, label: p.displayTitle || p.title });
  }

  return (
    <>
      <PageHero crumbs={[{ label: 'Contact' }]} eyebrow="Contact" title="Contact Bali Yoga School" lead="Ask about course dates, accommodation options or retreats. The enquiry form below is a preview and does not send messages yet; use the contact details to reach the school directly." />
      <section className="section">
        <div className={`container ${s.grid}`}>
          <aside className={s.info} aria-labelledby="details">
            <h2 id="details" className={s.h}>Contact details</h2>
            <dl className={s.list}>
              <div>
                <dt>Ubud campus address</dt>
                <dd><address>{site.address.lines.map((l) => <span key={l}>{l}<br /></span>)}</address></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><span className={s.value}>{site.email}</span><CopyButton value={site.email} label="email address" /></dd>
              </div>
              {site.phones.map((p) => (
                <div key={p.label}>
                  <dt>{p.label}</dt>
                  <dd><span className={s.value}>{p.value}</span><CopyButton value={p.value.replace(/\s/g, '')} label={`${p.label} number`} /></dd>
                </div>
              ))}
              <div>
                <dt>Hours</dt>
                <dd>{site.hours}</dd>
              </div>
            </dl>
            <p className="notice"><strong>Awaiting confirmation.</strong> The original site lists different phone numbers and email addresses on different pages. The details above are those shown on the original contact page; please confirm them with the school before relying on them.</p>
            <h2 className={s.h}>Other campuses</h2>
            <ul className={s.campuses}>
              <li><strong>Uluwatu</strong> — map location “Bali Yoga School Uluwatu (Puri Sabina)”. Street address awaiting confirmation. <Link href="/bali-yoga-school-campus-pictures-in-uluwatu-indonesia/">Campus page</Link></li>
              <li><strong>Canggu</strong> — map location “Hotel Made Canggu 77”. Street address awaiting confirmation. <Link href="/canggu-campus-photos-in-bali-indonesia/">Campus page</Link></li>
              <li><strong>Rishikesh</strong> — Himalayan Yoga Association, the sister school in India. <Link href="/yoga-teacher-training-courses-in-rishikesh-india/">Rishikesh courses</Link></li>
            </ul>
          </aside>
          <div className={s.formCol}>
            <h2 className={s.h}>Send an enquiry</h2>
            <Suspense fallback={<p>Loading form…</p>}>
              <ContactForm courseGroups={groups} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
