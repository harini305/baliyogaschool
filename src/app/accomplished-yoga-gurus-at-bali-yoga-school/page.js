import Link from 'next/link';
import Img from '@/components/Img';
import { PageHero, CtaBand } from '@/components/ui';
import { teachers } from '@/data/people';
import s from '../school.module.css';

export const metadata = {
  title: 'Yoga Teachers',
  description: 'Meet the yoga teachers at Bali Yoga School: philosophy, meditation, pranayama, Ashtanga, Hatha Vinyasa, Yin, sound healing and Reiki.',
  alternates: { canonical: '/accomplished-yoga-gurus-at-bali-yoga-school/' },
};

export default function Teachers() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about-bali-yoga-school/' }, { label: 'Teachers' }]}
        eyebrow="Faculty"
        title="Our yoga teachers"
        lead="The teachers who guide students through traditional practice, teaching methodology, meditation, philosophy, pranayama and healing disciplines at Bali Yoga School."
      >
        <Link className="btn btn--secondary btn--small" href="/yogi-himanshu-best-yoga-teacher-in-bali-indonesia/">About the founder</Link>
      </PageHero>
      <section className="section">
        <div className={`container ${s.teacherList}`}>
          {teachers.map((t) => (
            <article key={t.slug} id={t.slug} className={s.teacher} data-reveal>
              <div className={`frame ${s.teacherImg}`}><Img name={t.image} sizes="(min-width: 768px) 220px, 260px" /></div>
              <div>
                <h2>{t.name}</h2>
                <p className={s.role}>{t.role}</p>
                {t.bio.map((b, i) => <p key={i}>{b}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section--tight section--cream">
        <div className="container narrow">
          <p className="notice"><strong>Roster as published on the original teachers page (October 2026).</strong> The original home page listed a slightly different group of teachers; the current roster is awaiting confirmation from the school.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
