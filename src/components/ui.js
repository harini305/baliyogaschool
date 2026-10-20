import Link from 'next/link';
import Img from './Img';
import { KIND_LABEL } from '@/lib/catalog';
import s from './ui.module.css';

export function money(v) {
  if (typeof v !== 'number') return null;
  return `$${v.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(v) ? 0 : 2, maximumFractionDigits: 2 })}`;
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={s.crumbs}>
      <ol>
        <li><Link href="/">Home</Link></li>
        {items.map((it, i) => (
          <li key={it.href || it.label}>
            {i === items.length - 1 || !it.href ? <span aria-current={i === items.length - 1 ? 'page' : undefined}>{it.label}</span> : <Link href={it.href}>{it.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Split hero: text beside an original photograph, or text-only when no suitable photo exists.
export function PageHero({ crumbs, title, lead, image, imagePosition, facts, children, tone = 'cream' }) {
  return (
    <section className={`${s.hero} ${tone === 'sand' ? s.heroSand : ''} ${image ? '' : s.heroPlain}`}>
      <div className={`container ${s.heroGrid}`}>
        <div className={s.heroText}>
          {crumbs && <Breadcrumbs items={crumbs} />}
          <h1 data-hero-in>{title}</h1>
          {lead && <p className={`lead ${s.heroLead}`} data-hero-in>{lead}</p>}
          {facts?.length > 0 && (
            <dl className={s.facts} data-hero-in>
              {facts.map((f) => (
                <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
              ))}
            </dl>
          )}
          {children && <div className={s.heroActions} data-hero-in>{children}</div>}
        </div>
        {image && (
          <div className={`frame ${s.heroImage}`}>
            <Img name={image} priority sizes="(min-width: 900px) 46vw, 100vw" position={imagePosition} />
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({ title, intro, id, action }) {
  return (
    <div className={action ? 'section-head section-head--row' : 'section-head'} data-reveal>
      <div>
        <h2 id={id}>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

function cardMeta(p) {
  const bits = [];
  if (p.hours) bits.push(`${p.hours} hours`);
  if (p.level) bits.push(p.level);
  if (p.duration && p.duration.length <= 40) bits.push(p.duration);
  return bits;
}

// Photo card — used for teacher-training programmes.
export function ProgrammeCard({ p, showCampus = true, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const meta = cardMeta(p);
  return (
    <article className={s.card}>
      <div className={s.cardImage}>
        {p.image ? <Img name={p.image} sizes="(min-width: 1080px) 360px, (min-width: 640px) 45vw, 100vw" /> : <div className={s.cardPlaceholder} aria-hidden="true" />}
      </div>
      <div className={s.cardBody}>
        <H className={s.cardTitle}><Link href={p.path} className={s.stretched}>{p.displayTitle || p.title}</Link></H>
        {meta.length > 0 && <p className={s.cardMeta}>{meta.join(' · ')}</p>}
        {p.lowestFee && <p className={s.cardFee}>Published fees from {money(p.lowestFee)}</p>}
      </div>
    </article>
  );
}

export function ProgrammeGrid({ items, showCampus, headingLevel }) {
  return (
    <div className={s.grid} data-reveal-group>
      {items.map((p) => <ProgrammeCard key={p.slug} p={p} showCampus={showCampus} headingLevel={headingLevel} />)}
    </div>
  );
}

// Compact list rows — used for healing levels, retreats and other long, similar lists.
export function ProgrammeList({ items, showCampus = false, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <ul className={s.list} data-reveal-group>
      {items.map((p) => (
        <li key={p.slug} className={s.row}>
          <div className={s.rowMain}>
            <H className={s.rowTitle}><Link href={p.path} className={s.stretched}>{p.displayTitle || p.title}</Link></H>
            <p className={s.rowMeta}>{[showCampus && p.campus?.name, ...cardMeta(p)].filter(Boolean).join(' · ')}</p>
          </div>
          <p className={s.rowFee}>{p.lowestFee ? <>from <strong>{money(p.lowestFee)}</strong></> : <span className="muted">Fee on enquiry</span>}</p>
          <span className={s.rowArrow} aria-hidden="true">→</span>
        </li>
      ))}
    </ul>
  );
}

export function Faq({ items, idPrefix = 'faq' }) {
  return (
    <div className={s.faq}>
      {items.map((f, i) => (
        <details key={`${idPrefix}-${i}`} className={s.faqItem}>
          <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
          <div className={s.faqBody}>
            {String(f.a).split(/\n+/).map((para, j) => <p key={j}>{para}</p>)}
            {f.list?.length > 0 && <ul>{f.list.map((x) => <li key={x}>{x}</li>)}</ul>}
          </div>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ title = 'Planning your training or retreat?', text = 'Send an enquiry with your preferred dates and accommodation, and read the answers to common questions before you travel.', course }) {
  return (
    <section className={s.cta}>
      <div className={`container ${s.ctaInner}`} data-reveal>
        <div>
          <h2 className={s.ctaTitle}>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">
          <Link className="btn btn--light" href={course ? `/contact/?course=${course}` : '/contact/'}>Send an enquiry</Link>
          <Link className={`btn ${s.ctaGhost}`} href="/frequently-asked-questions-faq/">Read the FAQ</Link>
        </div>
      </div>
    </section>
  );
}
