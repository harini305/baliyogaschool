import Link from 'next/link';
import Img from '@/components/Img';
import ProgrammeFinder from '@/components/ProgrammeFinder';
import { Faq, CtaBand, SectionHead } from '@/components/ui';
import { filterProgrammes } from '@/lib/catalog';
import { contentPage } from '@/lib/pages';
import { campuses } from '@/data/site';
import { founder } from '@/data/people';
import { reviews } from '@/data/reviews';
import s from './home.module.css';

export const metadata = {
  title: { absolute: 'Bali Yoga School — Yoga Teacher Training & Retreats in Bali' },
  description: 'Yoga Alliance registered yoga teacher training in Bali. Bali Yoga School offers teacher training, healing courses and yoga retreats in Ubud, Uluwatu and Canggu.',
  alternates: { canonical: '/' },
};

// Home FAQ questions (the home page's own answers were not captured, so matching answered
// questions from /frequently-asked-questions-faq/ are used).
const HOME_FAQ = [2, 39, 34, 38, 37, 25];

function item(p, meta) {
  return { path: p.path, label: p.displayTitle || p.title, meta };
}
function hoursMeta(p) { return p.duration && p.duration.length < 30 ? p.duration : null; }

export default function Home() {
  const tt = (loc) => filterProgrammes((p) => p.sub === 'multistyle' && p.location === loc).map((p) => item({ ...p, displayTitle: `${p.hours}-hour training` }, hoursMeta(p)));
  const yin = (loc) => filterProgrammes((p) => p.sub === 'yin' && p.location === loc).map((p) => item({ ...p, displayTitle: `${p.hours}-hour Yin training` }, hoursMeta(p)));
  const heal = (sub) => filterProgrammes((p) => p.sub === sub && p.location === 'ubud' && (/1-2|best|panchakarma|massage/.test(p.slug))).map((p) => item(p, p.duration));
  const retreats = (loc) => filterProgrammes((p) => p.sub === 'retreat' && p.location === loc).filter((p) => [3, 5, 7, 11].includes(p.days)).map((p) => item({ ...p, displayTitle: `${p.days}-day retreat` }, p.nights ? `${p.nights} nights` : null));

  const tabs = [
    {
      id: 'ttc', label: 'Teacher training', href: '/courses/', hrefLabel: 'All teacher training',
      description: 'Multistyle (Hatha and Ashtanga Vinyasa) yoga teacher training from 50 to 500 hours at three Bali campuses and the sister school in Rishikesh.',
      groups: [
        { title: 'Ubud, Bali', items: tt('ubud') },
        { title: 'Uluwatu, Bali', items: tt('uluwatu') },
        { title: 'Canggu, Bali', items: tt('canggu') },
        { title: 'Rishikesh, India', items: tt('rishikesh') },
      ],
    },
    {
      id: 'yin', label: 'Yin yoga', href: '/courses_group/yin-yoga-ttc/', hrefLabel: 'All Yin training',
      description: 'Yin yoga teacher training in Ubud, Uluwatu and Canggu.',
      groups: [
        { title: 'Ubud', items: yin('ubud') },
        { title: 'Uluwatu', items: yin('uluwatu') },
        { title: 'Canggu', items: yin('canggu') },
      ],
    },
    {
      id: 'healing', label: 'Healing', href: '/healing-courses-in-bali/', hrefLabel: 'All healing courses',
      description: 'Sound healing, Reiki and Ayurveda courses, plus one-to-one healing sessions in Ubud.',
      groups: [
        { title: 'Sound healing', items: heal('sound') },
        { title: 'Reiki', items: heal('reiki') },
        { title: 'Ayurveda', items: heal('ayurveda') },
        { title: 'Sessions', items: filterProgrammes((p) => p.sub === 'session').map((p) => item(p, p.duration)) },
      ],
    },
    {
      id: 'retreats', label: 'Retreats', href: '/yoga-retreats-in-bali/', hrefLabel: 'All retreats',
      description: 'Yoga retreats of 3 to 11 days in Ubud, Uluwatu and Canggu.',
      groups: [
        { title: 'Ubud', items: retreats('ubud') },
        { title: 'Uluwatu', items: retreats('uluwatu') },
        { title: 'Canggu', items: retreats('canggu') },
      ],
    },
    {
      id: 'more', label: 'Online & short courses', href: '/courses/', hrefLabel: 'All courses',
      description: 'Online teacher training, 15-day online courses and specialised short courses in Bali.',
      groups: [
        { title: 'Online teacher training', items: filterProgrammes((p) => p.sub === 'online' && !/15-days/.test(p.slug)).map((p) => item(p, p.hours ? `${p.hours} hours` : null)) },
        { title: 'Short courses in Bali', items: filterProgrammes((p) => p.sub === 'short').map((p) => item(p, p.duration)) },
      ],
    },
  ];

  const faqPage = contentPage('frequently-asked-questions-faq');
  const faqs = HOME_FAQ.map((i) => faqPage?.faqs?.[i]).filter((f) => f && f.a);
  const featured = reviews.filter((r) => r.featured);

  return (
    <>
      {/* Hero */}
      <section className={s.hero}>
        <div className={`container ${s.heroGrid}`}>
          <div className={s.heroText}>
            <h1 className={s.heroTitle} data-hero-in>Yoga teacher training and retreats in Bali</h1>
            <p className={`lead ${s.heroLead}`} data-hero-in>
              We believe yoga teacher training should offer more than certification: real knowledge and skill to apply in your daily life after graduation.
            </p>
            <div className="btn-row" data-hero-in>
              <Link className="btn btn--primary" href="/courses/">Explore courses</Link>
              <Link className="btn btn--secondary" href="/contact/">Send an enquiry</Link>
            </div>
          </div>
          <div className={s.heroMedia}>
            <div className={`frame ${s.heroMain}`} data-parallax>
              <Img name="hero-garland-meditation" priority sizes="(min-width: 900px) 52vw, 100vw" position="50% 40%" />
            </div>
            <div className={`frame ${s.heroInset}`}>
              <Img name="uluwatu-pool-dusk" sizes="(min-width: 900px) 18vw, 40vw" />
            </div>
          </div>
        </div>
        <div className={`container ${s.strip}`}>
          <dl>
            <div><dt>Teacher training</dt><dd>50 to 500 hours</dd></div>
            <div><dt>Registered with</dt><dd>Yoga Alliance (RYS 200 &amp; 300)</dd></div>
            <div><dt>Campuses</dt><dd>Three in Bali, one in India</dd></div>
            <div><dt>Also offered</dt><dd>Healing courses &amp; retreats</dd></div>
          </dl>
        </div>
      </section>

      {/* Finder */}
      <section className="section" aria-labelledby="find">
        <div className="container">
          <SectionHead id="find" title="Find your programme" intro="Choose a type of programme to see the options at each campus. Every course page lists its own dates, published fees, syllabus and daily schedule." />
          <div data-reveal><ProgrammeFinder tabs={tabs} /></div>
        </div>
      </section>

      {/* Campuses */}
      <section className="section section--cream" aria-labelledby="campuses">
        <div className="container">
          <SectionHead id="campuses" title="Three campuses in Bali, and a sister school in Rishikesh" />
          <div className={s.campuses} data-reveal-group>
            {['ubud', 'uluwatu', 'canggu', 'rishikesh'].map((k) => {
              const c = campuses[k];
              return (
                <article key={k} className={s.campus}>
                  <div className={s.campusImage}><Img name={c.image} sizes="(min-width: 1080px) 280px, (min-width: 640px) 45vw, 100vw" /></div>
                  <div className={s.campusBody}>
                    <h3><Link href={c.path} className={s.stretched}>{c.name}</Link></h3>
                    <p className="small muted">{c.region}</p>
                    <p className="small">{c.blurb}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section" aria-labelledby="founder">
        <div className={`container ${s.founder}`}>
          <div className={`frame ${s.founderImage}`} data-reveal>
            <Img name="founder" sizes="(min-width: 900px) 380px, 80vw" />
          </div>
          <div data-reveal>
            <h2 id="founder">{founder.name}</h2>
            <p>{founder.short}</p>
            <blockquote className={s.quote}>
              <p>“The purpose behind teaching yoga, for us, is much deeper than simply teaching postures or techniques. We want people to learn how to care for and respect their body, mind, and inner self.”</p>
            </blockquote>
            <div className="btn-row">
              <Link className="btn btn--secondary" href="/yogi-himanshu-best-yoga-teacher-in-bali-indonesia/">About the founder</Link>
              <Link className="text-link" href="/accomplished-yoga-gurus-at-bali-yoga-school/">Meet the teachers</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="section section--sand" aria-labelledby="accreditation">
        <div className={`container ${s.accred}`}>
          <div data-reveal>
            <h2 id="accreditation">Registered with Yoga Alliance</h2>
            <p>Bali Yoga School holds Yoga Alliance registration certificates for 200-hour and 300-hour teacher training (RYS 200 and RYS 300), and IYS® International Yoga School certification from the International Yoga Organisation.</p>
            <Link className="text-link" href="/bys-affiliations/">View the certificates</Link>
          </div>
          <div className={s.certs} data-reveal-group>
            {['cert-ya-200', 'cert-ya-300', 'cert-iyo'].map((k) => (
              <div key={k} className={s.cert}><Img name={k} sizes="(min-width: 900px) 220px, 30vw" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section" aria-labelledby="reviews">
        <div className="container">
          <SectionHead id="reviews" title="In our students’ words" action={<Link className="text-link" href="/bali-yoga-school-reviews/">Read all reviews</Link>} />
          <div className={s.reviews} data-reveal-group>
            {featured.map((r) => (
              <figure key={r.name} className={s.review}>
                <blockquote><p>“{r.text}”</p></blockquote>
                <figcaption><strong>{r.name}</strong><span>{r.course}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Rishikesh */}
      <section className={s.sister} aria-labelledby="sister">
        <div className={`container ${s.sisterInner}`}>
          <div className={`frame ${s.sisterImage}`} data-parallax><Img name="rishikesh-terrace" sizes="(min-width: 900px) 50vw, 100vw" /></div>
          <div className={s.sisterText} data-reveal>
            <h2 id="sister">Himalayan Yoga Association</h2>
            <p>The head school branch of Bali Yoga School, in Rishikesh, India. Yogi Himanshu established Himalayan Yoga Association years before Bali Yoga School.</p>
            <Link className="btn btn--secondary" href="/yoga-teacher-training-courses-in-rishikesh-india/">Training in Rishikesh</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--cream" aria-labelledby="home-faq">
        <div className={`container ${s.faq}`}>
          <div data-reveal>
            <h2 id="home-faq">Everything you need to know about our yoga courses</h2>
            <Link className="text-link" href="/frequently-asked-questions-faq/">All questions and answers</Link>
          </div>
          <Faq items={faqs} idPrefix="home" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
