import Img from '@/components/Img';
import Link from 'next/link';
import { PageHero, CtaBand } from '@/components/ui';
import { management } from '@/data/people';
import s from '../school.module.css';

export const metadata = {
  title: 'Head Management Team',
  description: 'The people who support Bali Yoga School through leadership, student care, daily operations, technology and community coordination.',
  alternates: { canonical: '/bys-head-management/' },
};

export default function Management() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about-bali-yoga-school/' }, { label: 'Management team' }]}
        title="Head management team"
        lead="Behind every class, course and student experience is a dedicated team working with care and purpose, supporting leadership, student care, daily operations, technology and community coordination."
      >
        <Link className="btn btn--secondary btn--small" href="/yogi-himanshu-best-yoga-teacher-in-bali-indonesia/">The founder</Link>
      </PageHero>
      <section className="section">
        <div className="container">
          <div className={s.team} data-reveal-group>
            {management.map((m) => (
              <article key={m.name} className={s.member}>
                <div className={s.memberHead}>
                  {m.image && <div className={s.avatar}><Img name={m.image} alt="" sizes="64px" /></div>}
                  <div>
                    <h2 className={s.memberName} style={{ fontSize: '1.15rem', margin: 0 }}>{m.name}</h2>
                    <p className="small muted" style={{ margin: 0 }}>{m.role}</p>
                  </div>
                </div>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
          <p className="notice" style={{ marginTop: 'var(--space-6)' }}><strong>Roles awaiting confirmation.</strong> Roles follow the original management page. The original home page gave different roles for some team members and listed one additional person.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
