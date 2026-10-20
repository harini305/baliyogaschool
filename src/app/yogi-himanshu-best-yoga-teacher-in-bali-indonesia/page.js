import Link from 'next/link';
import Img from '@/components/Img';
import { PageHero, CtaBand } from '@/components/ui';
import { founder } from '@/data/people';
import s from '../school.module.css';

export const metadata = {
  title: 'Yogi Himanshu — Founder of Bali Yoga School',
  description: 'Yogi Himanshu Joshi, founder of Bali Yoga School and Himalayan Yoga Association.',
  alternates: { canonical: '/yogi-himanshu-best-yoga-teacher-in-bali-indonesia/' },
};

// Text from the founder page and the founder statement on /bys-head-management/.
// Not reproduced: unverified claims ("one of the youngest yoga teachers in the world") and the list
// of countries where courses are said to run (international programmes are unconfirmed).
export default function Founder() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about-bali-yoga-school/' }, { label: 'Founder' }]}
        title="Yogi Himanshu Joshi"
        lead={founder.role}
        image="founder"
        imagePosition="50% 30%"
      />
      <section className="section">
        <div className="container narrow">
          <h2 data-reveal>In his words</h2>
          <div data-reveal>{founder.statement.map((t, i) => <p key={i}>{t}</p>)}</div>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container">
          <div className={s.values} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }} data-reveal-group>
            {founder.profile.map((p) => (
              <div key={p.heading}><h3>{p.heading}</h3><p>{p.text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container narrow" data-reveal>
          <h2>His life philosophy</h2>
          <blockquote style={{ margin: 0, paddingLeft: 'var(--space-5)', borderLeft: '3px solid var(--orange)', fontStyle: 'italic', fontSize: 'var(--fs-md)', color: 'var(--brown)' }}>
            <p>“{founder.quote}”</p>
          </blockquote>
          <p style={{ marginTop: 'var(--space-5)' }}>
            <Link className="text-link" href="/bys-head-management/">Meet the management team</Link>
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
