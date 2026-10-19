import s from './RichSections.module.css';

// Renders extracted {heading, paragraphs, list, subsections} content.
// mode="accordion" collapses each section (long legal text); mode="prose" renders an article.
function Body({ sec, level = 3 }) {
  const H = `h${level}`;
  return (
    <>
      {(sec.paragraphs || []).map((p, i) => <p key={i}>{p}</p>)}
      {sec.list?.length > 0 && <ul>{sec.list.map((x, i) => <li key={i}>{x}</li>)}</ul>}
      {(sec.subsections || []).map((sub, i) => (
        <div key={i} className={s.sub}>
          {sub.heading && <H>{sub.heading}</H>}
          <Body sec={sub} level={Math.min(level + 1, 4)} />
        </div>
      ))}
    </>
  );
}

export default function RichSections({ sections, mode = 'prose' }) {
  const list = (sections || []).filter((x) => x.heading || x.paragraphs?.length || x.list?.length);
  if (mode === 'accordion') {
    return (
      <div className={s.accordion}>
        {list.map((sec, i) => (
          <details key={i} className={s.item}>
            <summary>{sec.heading}</summary>
            <div className={s.body}><Body sec={sec} level={3} /></div>
          </details>
        ))}
      </div>
    );
  }
  return (
    <div className={`prose ${s.prose}`}>
      {list.map((sec, i) => (
        <section key={i}>
          {sec.heading && <h2>{sec.heading}</h2>}
          <Body sec={sec} level={3} />
        </section>
      ))}
    </div>
  );
}
