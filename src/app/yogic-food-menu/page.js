import Img from '@/components/Img';
import { PageHero, CtaBand } from '@/components/ui';
import { contentPage } from '@/lib/pages';
import s from '../school.module.css';

export const metadata = {
  title: 'Food at Bali Yoga School',
  description: 'Plant-based meals at Bali Yoga School: our approach to food and meal times.',
  alternates: { canonical: '/yogic-food-menu/' },
};

// The original page's monthly menus are images of tables (no text). They are not reproduced;
// the dining text and meal times are.
export default function Food() {
  const page = contentPage('yogic-food-menu');
  const [intro] = page.intro;
  const sentences = intro.split(/(?<=\.)\s+/);
  const times = page.sections.find((x) => /Meal/.test(x.heading));
  return (
    <>
      <PageHero crumbs={[{ label: 'Campuses' }, { label: 'Food' }]} title="Food at Bali Yoga School" lead={sentences.slice(0, 2).join(' ')} image="food-plates" />
      <section className="section">
        <div className={`container ${s.twoCol}`}>
          <div data-reveal>
            <h2>A plant-based kitchen</h2>
            <p>{sentences.slice(2, 6).join(' ')}</p>
            <p>{sentences.slice(6).join(' ')}</p>
          </div>
          <div data-reveal>
            <h2>{times.heading}</h2>
            <ul className={s.values} style={{ listStyle: 'none', padding: 0 }}>{times.list.map((t) => <li key={t}><p style={{ margin: 0 }}>{t}</p></li>)}</ul>
            <p className="small muted" style={{ marginTop: 'var(--space-3)' }}>{times.paragraphs?.[0]}</p>
            <p className="notice">Meal arrangements differ between some course pages (for example Sunday meals); please confirm them for your programme.</p>
          </div>
        </div>
      </section>
      <section className="section section--cream">
        <div className="container">
          <h2 className="visually-hidden">Food photographs</h2>
          <div className={s.gallery} data-reveal-group>
            {['food-buffet', 'food-banana-leaf', 'food-table', 'food-pool', 'food-plates'].map((g) => (
              <figure key={g}><div className="frame"><Img name={g} sizes="(min-width: 768px) 33vw, 50vw" /></div></figure>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
