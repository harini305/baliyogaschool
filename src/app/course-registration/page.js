import { Suspense } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/ui';
import RichSections from '@/components/RichSections';
import RegistrationForm from '@/components/RegistrationForm';
import { contentPage } from '@/lib/pages';
import { allProgrammes, KIND_LABEL } from '@/lib/catalog';
import s from '../school.module.css';

export const metadata = {
  title: 'Course Registration',
  description: 'How to apply for a Bali Yoga School course: application form, reservation and course policies.',
  alternates: { canonical: '/course-registration/' },
};

export default function Registration() {
  const page = contentPage('course-registration');
  const groups = [];
  for (const p of allProgrammes()) {
    const label = `${KIND_LABEL[p.sub]}${p.campus && p.location !== 'online' ? ` · ${p.campus.name}` : ''}`;
    let g = groups.find((x) => x.label === label);
    if (!g) { g = { label, options: [] }; groups.push(g); }
    g.options.push({ value: p.slug, label: p.displayTitle || p.title });
  }
  return (
    <>
      <PageHero crumbs={[{ label: 'Registration' }]} title="Course registration" lead="Applying for a course takes three steps. This page reproduces the original application form as a preview: it checks your answers but does not send them." />
      <section className="section">
        <div className={`container ${s.twoCol}`}>
          <div data-reveal>
            <h2>How to apply</h2>
            <ol className={s.steps}>
              {page.steps.map((st) => <li key={st.heading}><strong>{st.heading}</strong>{st.text}</li>)}
            </ol>
            <p className="notice" style={{ marginTop: 'var(--space-5)' }}><strong>Awaiting confirmation.</strong> The deposit amount and payment channels have not been confirmed for this rebuild. No payment can be made on this site; see the <Link href="/course-payment/">payment policy</Link>.</p>
            <h2 style={{ marginTop: 'var(--space-7)' }}>Course policies</h2>
            <RichSections sections={page.sections} mode="accordion" />
          </div>
          <div className={s.formCard}>
            <h2>{page.formTitle || 'Application form'}</h2>
            <Suspense fallback={<p>Loading form…</p>}>
              <RegistrationForm courseGroups={groups} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
