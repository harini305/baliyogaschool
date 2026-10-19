import Link from 'next/link';
import Img from './Img';
import { PageHero, SectionHead, ProgrammeList, CtaBand } from './ui';
import { filterProgrammes } from '@/lib/catalog';
import s from '@/app/school.module.css';

export default function CampusPage({ campus, title, lead, paragraphs = [], points = [], gallery = [], location, note }) {
  const ttc = filterProgrammes((p) => p.location === campus.key && ['multistyle', 'yin'].includes(p.sub));
  const other = filterProgrammes((p) => p.location === campus.key && !['multistyle', 'yin'].includes(p.sub));
  return (
    <>
      <PageHero crumbs={[{ label: 'Campuses' }, { label: campus.name }]} eyebrow="Campus" title={title} lead={lead} image={campus.image}>
        <Link className="btn btn--primary" href={campus.hub}>Courses in {campus.name}</Link>
        <Link className="btn btn--secondary" href="/contact/">Enquire</Link>
      </PageHero>

      {(paragraphs.length > 0 || points.length > 0) && (
        <section className="section">
          <div className={`container ${s.twoCol}`}>
            <div data-reveal>
              <h2>The campus</h2>
              {paragraphs.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            <div data-reveal>
              {points.length > 0 && (
                <>
                  <h2>Location</h2>
                  <ul className={s.values} style={{ listStyle: 'none', padding: 0 }}>{points.map((t) => <li key={t}><p style={{ margin: 0 }}>{t}</p></li>)}</ul>
                </>
              )}
              {location && <p className="small muted" style={{ marginTop: 'var(--space-4)' }}>{location}</p>}
            </div>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="section section--cream" aria-labelledby="gallery">
          <div className="container">
            <SectionHead id="gallery" title="Campus photographs" />
            <div className={s.gallery} data-reveal-group>
              {gallery.map((g) => (
                <figure key={g}>
                  <div className="frame"><Img name={g} sizes="(min-width: 768px) 33vw, 50vw" /></div>
                </figure>
              ))}
            </div>
            {note && <p className="small muted" style={{ marginTop: 'var(--space-4)' }}>{note}</p>}
          </div>
        </section>
      )}

      {(ttc.length > 0 || other.length > 0) && (
        <section className="section" aria-labelledby="programmes">
          <div className="container">
            <SectionHead id="programmes" title={`Programmes in ${campus.name}`} action={<Link className="text-link" href={campus.hub}>Teacher training in {campus.name}</Link>} />
            {ttc.length > 0 && <ProgrammeList items={ttc} />}
            {other.length > 0 && (
              <details className="campus-more" style={{ marginTop: 'var(--space-5)' }}>
                <summary className="btn btn--secondary btn--small">Healing courses and retreats ({other.length})</summary>
                <div style={{ marginTop: 'var(--space-4)' }}><ProgrammeList items={other} /></div>
              </details>
            )}
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
