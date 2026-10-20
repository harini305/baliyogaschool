import Link from 'next/link';
import Img from '@/components/Img';
import { PageHero, SectionHead, CtaBand } from '@/components/ui';
import { campuses } from '@/data/site';
import { founder } from '@/data/people';
import s from '../school.module.css';

export const metadata = {
  title: 'About Bali Yoga School',
  description: 'About Bali Yoga School: traditional yogic teaching in Ubud, Uluwatu and Canggu, founded by Yogi Himanshu Joshi.',
  alternates: { canonical: '/about-bali-yoga-school/' },
};

// Text from /about-bali-yoga-school/ (spelling corrected). The "Why join" and "Best place for
// yoga TTC" paragraphs are not reproduced: they are superlative marketing claims.
export default function About() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        title="About Bali Yoga School"
        lead="Under the guidance of Yogi Himanshu, Bali Yoga School focuses on sharing traditional yogic teachings."
        image="certificates-group"
      />

      <section className="section">
        <div className={`container ${s.split}`}>
          <div data-reveal>
            <h2>What we teach</h2>
            <p>Our courses are Ashtanga yoga based. Ashtanga means the eight limbs of yoga: it covers all aspects of yoga practice, from basics to advanced. We cover yoga postures, the yamas and niyamas, pranayama and shatkarmas, meditation, yoga philosophy, yoga anatomy and physiology, Ayurveda and therapies, and posture alignment and adjustment.</p>
            <Link className="text-link" href="/courses/">See all courses</Link>
          </div>
          <div className={s.values} data-reveal-group>
            <div>
              <h3>Our mission</h3>
              <p>We believe in sharing the holistic living principles of yoga and its eternal wisdom in an accessible way. We strive to become a heart centre of excellence in traditional yoga teaching, and to share community development and sustainable lifestyles based on yoga’s principles around the world.</p>
            </div>
            <div>
              <h3>Our ethics</h3>
              <p>Our ethics guide the faculty to support the practice of each student. The practices and lifestyle aim to integrate mind, body, heart and spirit. We do not believe in any kind of discrimination against anyone based on caste, race, gender, religion, nationality or sexual orientation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className={`container ${s.split} ${s.splitReverse}`}>
          <div className={`frame ${s.splitImage}`} data-reveal><Img name="beach-balance" sizes="(min-width: 900px) 45vw, 100vw" /></div>
          <div data-reveal>
            <h2>Why Bali?</h2>
            <p>Bali, “the island of the gods”, is known for its yoga teaching centres, retreat centres and studios. Its landscapes help people reflect and meditate deeply in a fresh environment, and the island offers rich marine life and many places to surf and explore beaches and the sea.</p>
            <p>In Bali you rarely find the stressful distractions of everyday life, which is why many people come here for yoga.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title="Campuses" intro="Bali Yoga School teaches at three campuses in Bali. The sister school, Himalayan Yoga Association, is in Rishikesh, India." />
          <ul className={s.campusList} data-reveal-group>
            {['ubud', 'uluwatu', 'canggu', 'rishikesh'].map((k) => (
              <li key={k}>
                <Link href={campuses[k].path}><strong>{campuses[k].name}</strong><span>{campuses[k].region}</span></Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--sand">
        <div className={`container ${s.people}`}>
          <div className={`frame ${s.portrait}`} data-reveal><Img name="founder" sizes="240px" /></div>
          <div data-reveal>
            <h2>The people behind the school</h2>
            <p>{founder.short}</p>
            <div className={s.linkRow}>
              <Link className="text-link" href="/yogi-himanshu-best-yoga-teacher-in-bali-indonesia/">The founder</Link>
              <Link className="text-link" href="/accomplished-yoga-gurus-at-bali-yoga-school/">Teachers</Link>
              <Link className="text-link" href="/bys-head-management/">Management team</Link>
              <Link className="text-link" href="/bys-affiliations/">Accreditation</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
