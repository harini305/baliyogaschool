import Img from '@/components/Img';
import { PageHero, CtaBand } from '@/components/ui';
import s from '../school.module.css';

export const metadata = {
  title: 'Accreditation & Affiliations',
  description: 'Bali Yoga School Yoga Alliance registration (RYS 200 and RYS 300) and IYS International Yoga School certification.',
  alternates: { canonical: '/bys-affiliations/' },
};

// Merges /bys-affiliations/, /hya-affiliations/ and /yoga-alliance-registration/.
// Not reproduced: statistics about third-party organisations (e.g. "recognised in 195 countries")
// and Yoga Alliance's own fees, which are external and change over time.
const CERTS = [
  { key: 'cert-ya-200', title: 'Yoga Alliance — RYS 200', text: 'Certificate of registration for the 200 Hours Yoga Teacher Training.' },
  { key: 'cert-ya-300', title: 'Yoga Alliance — RYS 300', text: 'Certificate of registration for the 300 Hours Yoga Teacher Training.' },
  { key: 'cert-iys', title: 'IYS® International Yoga School', text: 'Certification under the International Yoga Organisation (IYO).' },
  { key: 'cert-iyo', title: 'IYO registration', text: 'International Yoga Organisation registration certificate.' },
];

const STEPS = [
  'Complete all training requirements at Bali Yoga School.',
  'Receive your completion certificate.',
  'Create your Yoga Alliance account at yogaalliance.org.',
  'Select your designation: RYT 200, RYT 300 or RYT 500.',
  'Upload your certificate with your training dates.',
  'Search for and select Bali Yoga School as your training institution.',
  'Add teaching hours if required.',
  'Submit for school confirmation.',
  'Pay the Yoga Alliance registration fees.',
];

export default function Affiliations() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About', href: '/about-bali-yoga-school/' }, { label: 'Accreditation' }]}
        eyebrow="Accreditation"
        title="Accreditation and affiliations"
        lead="Bali Yoga School is a Yoga Alliance USA Registered Yoga School (RYS), and an IYS® certified International Yoga School under the International Yoga Organisation (IYO®)."
      />
      <section className="section">
        <div className="container">
          <h2 className="visually-hidden">Certificates</h2>
          <div className={s.certGrid} data-reveal-group>
            {CERTS.map((c) => (
              <figure key={c.key}>
                <Img name={c.key} sizes="(min-width: 1080px) 270px, (min-width: 640px) 45vw, 100vw" />
                <figcaption>{c.title}<span className="small muted" style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 400 }}>{c.text}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--cream">
        <div className={`container ${s.twoCol}`}>
          <div data-reveal>
            <h2>Verifying the registration</h2>
            <p>Yoga Alliance is a non-profit organisation of yoga teachers based in the United States. It developed the Registered Yoga Teacher (RYT) designation for teachers who have trained at a Registered Yoga School.</p>
            <p>To verify the school’s registration, visit the official Yoga Alliance website and search for Bali Yoga School in its school directory.</p>
            <p className="notice"><strong>Awaiting confirmation.</strong> The original registration page also mentions RYS 500; only the RYS 200 and RYS 300 certificates are shown here. Whether specific shorter, Yin or online courses carry Yoga Alliance certification should be confirmed per course.</p>
          </div>
          <div data-reveal>
            <h2>Registering as a teacher after graduation</h2>
            <ol className={s.steps}>{STEPS.map((t) => <li key={t}>{t}</li>)}</ol>
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container narrow">
          <p className="small muted">The sister school, Himalayan Yoga Association in Rishikesh, published the same set of certifications on its own affiliations page.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
