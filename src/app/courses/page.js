import Link from 'next/link';
import { PageHero, SectionHead, ProgrammeList, CtaBand } from '@/components/ui';
import Matrix from '@/components/Matrix';
import { filterProgrammes } from '@/lib/catalog';
import { campuses } from '@/data/site';

export const metadata = {
  title: 'All Courses',
  description: 'Compare Bali Yoga School teacher training, Yin yoga, healing, online and short courses by campus and hours.',
  alternates: { canonical: '/courses/' },
};

const HEALING = [
  { title: 'Sound healing', href: '/sound-healing-courses-in-bali/', sub: 'sound' },
  { title: 'Reiki healing', href: '/reiki-healing-courses-in-bali/', sub: 'reiki' },
  { title: 'Ayurveda', href: '/ayurveda-courses-in-bali/', sub: 'ayurveda' },
  { title: 'One-to-one sessions', href: '/healing-courses-in-bali/#sessions', sub: 'session' },
];

export default function CoursesPage() {
  const multi = filterProgrammes((p) => p.sub === 'multistyle');
  const yin = filterProgrammes((p) => p.sub === 'yin');
  const short = filterProgrammes((p) => p.sub === 'short');
  const online = filterProgrammes((p) => p.sub === 'online');
  const retreatCount = filterProgrammes((p) => p.sub === 'retreat').length;
  const c = campuses;

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Courses' }]}
        eyebrow="Courses"
        title="All courses"
        lead="Teacher training from 50 to 500 hours, Yin yoga training, healing and short courses, and online study. Select a course to see its syllabus, published dates and fees."
        image="class-upward-dog"
      >
        <a className="btn btn--secondary btn--small" href="#multistyle">Multistyle</a>
        <a className="btn btn--secondary btn--small" href="#yin">Yin</a>
        <a className="btn btn--secondary btn--small" href="#short-courses">Short courses</a>
        <a className="btn btn--secondary btn--small" href="#healing">Healing</a>
        <a className="btn btn--secondary btn--small" href="#online">Online</a>
      </PageHero>

      <section className="section" aria-labelledby="multistyle">
        <div className="container">
          <SectionHead id="multistyle" title="Multistyle yoga teacher training" intro="Hatha and Ashtanga Vinyasa based training. Course lengths are stated differently across the original site and are awaiting confirmation; each course page lists its published batch dates." />
          <div data-reveal><Matrix items={multi} campuses={[c.ubud, c.uluwatu, c.canggu, c.rishikesh]} caption="Multistyle teacher training by hours and campus" /></div>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="yin">
        <div className="container">
          <SectionHead id="yin" title="Yin yoga teacher training" action={<Link className="text-link" href="/courses_group/yin-yoga-ttc/">About Yin training</Link>} />
          <div data-reveal><Matrix items={yin} campuses={[c.ubud, c.uluwatu, c.canggu]} caption="Yin yoga teacher training by hours and campus" /></div>
        </div>
      </section>

      <section className="section" id="short-courses" aria-labelledby="short-courses-h">
        <div className="container">
          <SectionHead id="short-courses-h" title="Specialised short courses" intro="Prenatal and postnatal, aerial yoga, and Vedic astrology and numerology courses in Bali." />
          <ProgrammeList items={short} />
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="healing">
        <div className="container">
          <SectionHead id="healing" title="Healing courses, sessions and retreats" action={<Link className="text-link" href="/healing-courses-in-bali/">All healing courses</Link>} />
          <ul className="healing-links" data-reveal-group>
            {HEALING.map((h) => {
              const n = filterProgrammes((p) => p.sub === h.sub).length;
              return <li key={h.sub}><Link href={h.href}><strong>{h.title}</strong><span>{n} {n === 1 ? 'programme' : 'programmes'}</span></Link></li>;
            })}
            <li><Link href="/yoga-retreats-in-bali/"><strong>Yoga retreats</strong><span>{retreatCount} retreats of 3–11 days</span></Link></li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="online">
        <div className="container">
          <SectionHead id="online" title="Online courses" action={<Link className="text-link" href="/online-yoga-teacher-training-courses-in-bali/">About online study</Link>} />
          <ProgrammeList items={online} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
