'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import s from './ProgrammeFinder.module.css';

// Accessible tabs (WAI-ARIA tabs pattern with arrow-key navigation) for browsing programme groups.
export default function ProgrammeFinder({ tabs }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  function onKey(e, i) {
    let next = null;
    if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  }

  return (
    <div className={s.finder}>
      <div role="tablist" aria-label="Programme types" className={s.tabs}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { refs.current[i] = el; }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === i ? 0 : -1}
            className={s.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={active !== i}
          className={s.panel}
          tabIndex={0}
        >
          <div className={s.panelHead}>
            <p>{t.description}</p>
            <Link className="text-link" href={t.href}>{t.hrefLabel}</Link>
          </div>
          <div className={s.columns}>
            {t.groups.map((g) => (
              <div key={g.title} className={s.col}>
                <h3 className={s.colTitle}>{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it.path}>
                      <Link href={it.path}>
                        <span>{it.label}</span>
                        {it.meta && <small>{it.meta}</small>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
