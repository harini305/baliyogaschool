import Link from 'next/link';
import { ProgrammeList, money } from './ui';
import s from './Matrix.module.css';

// Hours × campus comparison table (tablet/desktop) with per-campus lists on small screens.
export default function Matrix({ items, campuses, caption }) {
  const hours = [...new Set(items.map((p) => p.hours))].sort((a, b) => a - b);
  const cell = (h, c) => items.find((p) => p.hours === h && p.location === c.key);
  return (
    <>
      <div className={s.tableWrap}>
        <table className={s.matrix}>
          <caption className="visually-hidden">{caption}</caption>
          <thead>
            <tr><th scope="col">Hours</th>{campuses.map((c) => <th key={c.key} scope="col"><Link href={c.hub}>{c.name}</Link></th>)}</tr>
          </thead>
          <tbody>
            {hours.map((h) => (
              <tr key={h}>
                <th scope="row">{h} hours</th>
                {campuses.map((c) => {
                  const p = cell(h, c);
                  const meta = [p?.duration && p.duration.length < 30 ? p.duration : null, p?.lowestFee ? `from ${money(p.lowestFee)}` : null].filter(Boolean).join(' · ');
                  return (
                    <td key={c.key}>
                      {p ? (
                        <Link href={p.path} className={s.cellLink}>
                          <span className={s.cellTitle}>{h}-hour · {c.name}</span>
                          <span className={s.cellMeta}>{meta || 'View details'}</span>
                        </Link>
                      ) : <span className={s.none}>Not offered</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.stacked}>
        {campuses.map((c) => {
          const list = items.filter((p) => p.location === c.key);
          if (!list.length) return null;
          return (
            <div key={c.key}>
              <h3 className={s.stackTitle}>{c.name}</h3>
              <ProgrammeList items={list.map((p) => ({ ...p, displayTitle: `${p.hours}-hour training` }))} headingLevel={4} />
            </div>
          );
        })}
      </div>
    </>
  );
}
