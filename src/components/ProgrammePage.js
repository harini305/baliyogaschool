import Link from 'next/link';
import { PageHero, Faq, ProgrammeList, CtaBand, money } from './ui';
import SubNav from './SubNav';
import { KIND_LABEL, related } from '@/lib/catalog';
import { parentHub, topLevel } from '@/lib/routes';
import { teacherByName, founder } from '@/data/people';
import s from './ProgrammePage.module.css';

// One data-driven template for every course, retreat and session page.
// Sections render only when the extracted source page actually contains that information.

function heroFacts(p) {
  const f = [];
  if (p.campus) f.push({ label: 'Campus', value: p.location === 'online' ? 'Online' : `${p.campus.name}, ${p.location === 'rishikesh' ? 'India' : 'Bali'}` });
  if (p.hours) f.push({ label: 'Certification', value: `${p.hours} hours` });
  if (p.level) f.push({ label: 'Level', value: p.level });
  if (p.duration && p.duration.length <= 44) f.push({ label: 'Duration', value: p.duration });
  else if (p.durationDisputed) f.push({ label: 'Course length', value: 'Awaiting confirmation' });
  if (p.lowestFee) f.push({ label: 'Published fees', value: `from ${money(p.lowestFee)}` });
  return f;
}

function groupBy(list, keyFn) {
  const out = [];
  for (const item of list) {
    const k = keyFn(item) || '';
    let g = out.find((x) => x.key === k);
    if (!g) { g = { key: k, items: [] }; out.push(g); }
    g.items.push(item);
  }
  return out;
}

function Schedule({ items }) {
  const groups = groupBy(items, (d) => d.group || d.phase || d.day);
  const table = (rows) => (
    <table className={s.timetable}>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}><th scope="row">{r.time}</th><td>{r.activity}</td></tr>
        ))}
      </tbody>
    </table>
  );
  if (groups.length === 1) return table(groups[0].items);
  return (
    <div className={s.dayGroups}>
      {groups.map((g, i) => (
        <details key={g.key} className={s.disclosure} open={i === 0}>
          <summary>{g.key}</summary>
          {table(g.items)}
        </details>
      ))}
    </div>
  );
}

function FeeTable({ fees }) {
  const groups = groupBy(fees.options, (o) => o.group);
  const hasPair = fees.options.some((o) => o.original && o.offer);
  return (
    <div className={s.feeWrap}>
      <table className={s.fees}>
        <caption className="visually-hidden">Course fee options in US dollars</caption>
        <thead>
          <tr>
            <th scope="col">Option</th>
            <th scope="col">{hasPair ? 'Published fee' : 'Fee'}</th>
            {hasPair && <th scope="col">Listed full fee</th>}
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.key}>
            {g.key && groups.length > 1 && <tr className={s.feeGroup}><th colSpan={hasPair ? 3 : 2} scope="colgroup">{g.key}</th></tr>}
            {g.items.map((o, i) => (
              <tr key={i}>
                <th scope="row">
                  <span className={s.feeLabel}>{o.label}</span>
                  {o.detail && <span className={s.feeDetail}>{o.detail}</span>}
                </th>
                <td data-label={hasPair ? 'Published fee' : 'Fee'} className={s.feeMain}>
                  {o.suspect ? <span className={s.feeConfirm}>Awaiting confirmation</span> : money(o.offer ?? o.original) || '—'}
                </td>
                {hasPair && <td data-label="Listed full fee" className={s.feeOld}>{o.offer || o.suspect ? money(o.original) : '—'}</td>}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default function ProgrammePage({ p }) {
  const hub = parentHub(p);
  const top = topLevel(p);
  const crumbs = [top, hub, { label: p.displayTitle || p.title }].filter(Boolean).filter((c, i, a) => a.findIndex((x) => x.href === c.href && c.href) === i);
  const lead = p.summary && !p.intro.some((x) => x.startsWith(p.summary.slice(0, 40))) ? p.summary : null;
  const introParas = p.intro.slice(0, 4);
  const teachers = (p.teachersNamed || []).map(teacherByName).filter(Boolean);
  const hasFounder = (p.teachersNamed || []).some((n) => /himanshu/i.test(n));
  const batches = p.schedule?.batches || [];
  const hadDates = batches.length > 0 || p.schedule?.pastCount > 0;
  const hasFees = !!p.fees?.options?.length;
  const hasDaily = p.dailySchedule?.length > 0;
  const practical = [
    p.arrival.length && { title: 'Arrival, check-in & departure', paras: p.arrival },
    p.prerequisites.length && { title: 'Who can join', list: p.prerequisites },
    ...p.policies.map((pol) => ({ title: pol.title, list: pol.items })),
  ].filter(Boolean);
  const rel = related(p, 4);

  const sections = [
    { id: 'overview', label: 'Overview' },
    p.curriculum.length && { id: 'curriculum', label: p.kind === 'retreat' ? 'Programme' : 'Curriculum' },
    (hasFees || hadDates) && { id: 'dates-fees', label: 'Dates & fees' },
    (hasDaily || p.inclusions.length) && { id: 'daily-life', label: 'Daily life' },
    practical.length && { id: 'practical', label: 'Practical info' },
    p.faqs.length && { id: 'faq', label: 'FAQ' },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        title={p.title}
        lead={lead}
        image={p.image}
        facts={heroFacts(p)}
      >
        <Link className="btn btn--primary" href={`/contact/?course=${p.slug}`}>Enquire about this {p.kind === 'retreat' ? 'retreat' : p.kind === 'session' ? 'session' : 'course'}</Link>
        {(hasFees || hadDates) && <a className="btn btn--secondary" href="#dates-fees">Dates & fees</a>}
      </PageHero>

      {sections.length > 2 && <SubNav sections={sections} />}

      {/* Overview */}
      <section className="section" aria-labelledby="overview">
        <div className={`container ${s.overview}`}>
          <div className={s.overviewText} data-reveal>
            <h2 id="overview">Overview</h2>
            {introParas.length > 0 ? introParas.map((t, i) => <p key={i}>{t}</p>) : <p>{p.metaDescription}</p>}
            {p.styles?.length > 0 && <p className={s.styles}><strong>Styles taught:</strong> {p.styles.join(', ')}</p>}
          </div>
          <aside className={s.glance} data-reveal aria-label="At a glance">
            <h3 className={s.asideTitle}>At a glance</h3>
            <dl className={s.glanceList}>
              {p.keyFacts.slice(0, 7).map((k, i) => (
                <div key={i}><dt>{k.label}</dt><dd>{k.value}</dd></div>
              ))}
              {p.durationDisputed && (
                <div><dt>Course length</dt><dd>Stated differently on different pages of the original site, so it is awaiting confirmation. The published batch dates are listed under Dates &amp; fees.</dd></div>
              )}
            </dl>
            {p.hourCalculation?.length > 0 && (
              <details className={s.disclosure}>
                <summary>How the hours add up</summary>
                <ul className={s.plain}>{p.hourCalculation.map((h, i) => <li key={i}><strong>{h.label}:</strong> {h.value}</li>)}</ul>
              </details>
            )}
            {p.online && (
              <div className={s.online}>
                {p.online.platform && <p><strong>Platform:</strong> {p.online.platform}</p>}
                {[...(p.online.liveClasses || []), ...(p.online.recordings || []), ...(p.online.access || [])].slice(0, 4).map((x, i) => <p key={i}>{x}</p>)}
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* Curriculum */}
      {p.curriculum.length > 0 && (
        <section className="section section--cream" aria-labelledby="curriculum">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 id="curriculum">{p.kind === 'retreat' ? 'Programme' : 'Curriculum'}</h2>
              <p>{p.curriculum.length} {p.curriculum.length === 1 ? 'module' : 'modules'} from the published syllabus. Open a module to see its topics.</p>
            </div>
            <div className={s.modules} data-reveal-group>
              {p.curriculum.map((m, i) => (
                <details key={i} className={s.module}>
                  <summary>
                    <span className={s.moduleTitle}>{m.title}</span>
                    {m.items?.length > 0 && <span className={s.moduleCount}>{m.items.length} {m.items.length === 1 ? 'topic' : 'topics'}</span>}
                  </summary>
                  <div className={s.moduleBody}>
                    {m.summary && <p>{m.summary}</p>}
                    {m.items?.length > 0 && <ul className={m.items.length > 8 && m.items.every((x) => x.length < 70) ? s.cols : s.plain}>{m.items.map((it, j) => <li key={j}>{it}</li>)}</ul>}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dates & fees */}
      {(hasFees || hadDates) && (
        <section className="section section--sand" aria-labelledby="dates-fees">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 id="dates-fees">Dates & fees</h2>
              <p>Dates, availability and fees as they appeared on the original website in October 2026. This page is not connected to a live booking system.</p>
            </div>
            <div className={s.feesGrid}>
              <div data-reveal>
                <h3 className={s.subhead}>{hadDates ? 'Published course dates' : 'Dates'}</h3>
                {batches.length > 0 ? (
                  <ul className={s.batches}>
                    {batches.map((b, i) => (
                      <li key={i} className={/closed|past/i.test(b.status || '') ? s.closed : ''}>
                        <span>{b.dates}</span>
                        {b.status && <span className={s.status}>{/closed/i.test(b.status) ? 'Closed' : b.status}</span>}
                      </li>
                    ))}
                  </ul>
                ) : !p.schedule?.allPast ? (
                  <p>{p.schedule?.note || 'Please contact the school to check availability for your dates.'}</p>
                ) : null}
                {p.schedule?.allPast && <p className="notice"><strong>No current dates.</strong> Every date published on the original page is in the past. Please ask the school for upcoming dates.</p>}
                {p.schedule?.pastCount > 0 && !p.schedule.allPast && <p className="small muted">{p.schedule.pastCount} earlier {p.schedule.pastCount === 1 ? 'date' : 'dates'} listed on the original page {p.schedule.pastCount === 1 ? 'has' : 'have'} passed and {p.schedule.pastCount === 1 ? 'is' : 'are'} not shown.</p>}
                {batches.length > 0 && p.schedule?.note && !/all upcoming schedules are currently available/i.test(p.schedule.note) && <p className="small muted">{p.schedule.note}</p>}
              </div>
              {hasFees && (
                <div data-reveal>
                  <h3 className={s.subhead}>Fee options (USD)</h3>
                  <FeeTable fees={p.fees} />
                  <p className="notice">
                    <strong>Awaiting confirmation.</strong> {p.fees.options.some((o) => o.original && o.offer)
                      ? 'The original site presented the lower figure as a reduced rate. Whether that rate is current, and for how long, has not been confirmed, so no discount is advertised here.'
                      : 'Fees are shown as published and should be confirmed with the school before booking.'}
                  </p>
                  {p.fees.extras?.length > 0 && (
                    <ul className={s.extras}>
                      {p.fees.extras.map((e, i) => <li key={i}><strong>{e.label}{e.price ? `: ${typeof e.price === 'number' ? money(e.price) : e.price}` : ''}</strong>{e.detail && e.detail.length < 90 && !/complete course fee/i.test(e.detail) ? ` — ${e.detail}` : ''}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>
            {p.addOnHealing?.length > 0 && (
              <details className={`${s.disclosure} ${s.addOns}`} data-reveal>
                <summary>Optional sound & Reiki healing add-ons during the course</summary>
                {p.addOnNote && <p>{p.addOnNote}</p>}
                <ul className={s.addOnList}>
                  {p.addOnHealing.map((a, i) => <li key={i}><span>{a.label}</span><strong>{typeof a.price === 'number' ? money(a.price) : 'Fee on enquiry'}</strong></li>)}
                </ul>
              </details>
            )}
          </div>
        </section>
      )}

      {/* Daily life */}
      {(hasDaily || p.inclusions.length > 0) && (
        <section className="section" aria-labelledby="daily-life">
          <div className="container">
            <div className="section-head" data-reveal><h2 id="daily-life">Daily life & what’s included</h2></div>
            <div className={s.dailyGrid}>
              {hasDaily && (
                <div data-reveal>
                  <h3 className={s.subhead}>Daily schedule</h3>
                  <Schedule items={p.dailySchedule} />
                </div>
              )}
              <div className={s.inclusionsCol} data-reveal>
                {p.inclusions.length > 0 && (
                  <>
                    <h3 className={s.subhead}>Included in the fee</h3>
                    <ul className={s.ticks}>{p.inclusions.map((x, i) => <li key={i}>{x}</li>)}</ul>
                  </>
                )}
                {p.exclusions.length > 0 && (
                  <>
                    <h3 className={s.subhead}>Not included</h3>
                    <ul className={s.plain}>{p.exclusions.map((x, i) => <li key={i}>{x}</li>)}</ul>
                  </>
                )}
                {p.dining?.mealTimes?.length > 0 && (
                  <div className={s.meals}>
                    <h3 className={s.subhead}>Meal times</h3>
                    {p.dining.text && <p className="small">{p.dining.text}</p>}
                    <ul className={s.plain}>{p.dining.mealTimes.map((m, i) => <li key={i}>{m}</li>)}</ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Practical information */}
      {practical.length > 0 && (
        <section className="section section--cream" aria-labelledby="practical">
          <div className={`container ${s.practical}`}>
            <div data-reveal>
              <h2 id="practical">Practical information</h2>
              <p className="muted">Arrival details, entry requirements and course policies as published for this programme.</p>
              {(teachers.length > 0 || hasFounder) && (
                <div className={s.teachers}>
                  <h3 className={s.subhead}>Teachers named for this programme</h3>
                  <ul>
                    {hasFounder && <li>{founder.name}</li>}
                    {teachers.map((t) => <li key={t.slug}>{t.name}</li>)}
                  </ul>
                  <Link className="text-link" href="/accomplished-yoga-gurus-at-bali-yoga-school/">Meet the teachers</Link>
                </div>
              )}
            </div>
            <div className={s.practicalList} data-reveal>
              {practical.map((item, i) => (
                <details key={i} className={s.disclosure}>
                  <summary>{item.title}</summary>
                  {item.paras?.map((t, j) => <p key={j}>{t}</p>)}
                  {item.list && <ul className={s.plain}>{item.list.map((t, j) => <li key={j}>{t}</li>)}</ul>}
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {p.faqs.length > 0 && (
        <section className="section" aria-labelledby="faq">
          <div className="container narrow">
            <h2 id="faq" data-reveal>Questions about this {p.kind === 'retreat' ? 'retreat' : 'course'}</h2>
            <Faq items={p.faqs} />
          </div>
        </section>
      )}

      {/* Related */}
      {rel.length > 0 && (
        <section className={`section ${p.faqs.length ? 'section--cream' : ''}`} aria-labelledby="related">
          <div className="container">
            <div className="section-head section-head--row" data-reveal>
              <div><h2 id="related">Related programmes</h2></div>
              <Link className="text-link" href={hub.href}>{hub.label}</Link>
            </div>
            <ProgrammeList items={rel} showCampus />
          </div>
        </section>
      )}

      <CtaBand course={p.slug} title={`Ask about ${p.displayTitle || p.title}`} />
    </>
  );
}
