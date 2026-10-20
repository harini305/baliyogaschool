import Link from 'next/link';
import { PageHero, ProgrammeGrid, ProgrammeList, SectionHead, CtaBand } from './ui';
import { campuses } from '@/data/site';
import s from './HubPage.module.css';

export default function HubPage({ hub }) {
  const [lead, ...rest] = hub.lead ? [hub.lead, ...hub.intro] : hub.intro;
  const campus = hub.campus ? campuses[hub.campus] : null;
  const crumbs = [{ label: hub.title }];
  return (
    <>
      <PageHero crumbs={crumbs} title={hub.title} lead={lead} image={hub.image}>
        {hub.sections.length > 1 && hub.sections.map((sec) => (
          <a key={sec.id} href={`#${sec.id}`} className="btn btn--secondary btn--small">{sec.title.replace(/ \(.*\)$/, '')}</a>
        ))}
      </PageHero>

      {(rest.length > 0 || hub.highlights?.length > 0) && (
        <section className="section section--tight">
          <div className={`container ${s.about}`} data-reveal>
            <div className={s.aboutText}>{rest.map((t, i) => <p key={i}>{t}</p>)}</div>
            {hub.highlights?.length > 0 && (
              <ul className={s.highlights}>{hub.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            )}
          </div>
        </section>
      )}

      {hub.sections.map((sec, i) => (
        <section key={sec.id} id={sec.id} className={`section ${i % 2 === 0 ? 'section--cream' : ''}`} aria-labelledby={`${sec.id}-h`}>
          <div className="container">
            <SectionHead id={`${sec.id}-h`} title={sec.title} intro={`${sec.items.length} ${sec.items.length === 1 ? 'programme' : 'programmes'}`} />
            {sec.view === 'grid'
              ? <ProgrammeGrid items={sec.items} showCampus={false} />
              : <ProgrammeList items={sec.items} showCampus={sec.showCampus} />}
          </div>
        </section>
      ))}

      {(hub.note || hub.links?.length || campus) && (
        <section className="section section--tight">
          <div className={`container ${s.more}`} data-reveal>
            {hub.note && <p className="notice">{hub.note}</p>}
            <div className={s.moreLinks}>
              {campus && campus.path !== hub.path && <Link className="text-link" href={campus.path}>See the {campus.name} campus</Link>}
              {hub.links?.map((l) => <Link key={l.href} className="text-link" href={l.href}>{l.label}</Link>)}
              <Link className="text-link" href="/courses/">Compare all courses</Link>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
