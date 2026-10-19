'use client';

import { useEffect, useState } from 'react';
import s from './ProgrammePage.module.css';

// Sticky in-page section navigation with the current section highlighted.
export default function SubNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const targets = sections.map((x) => document.getElementById(x.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-140px 0px -55% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sections]);

  return (
    <nav className={s.subnav} aria-label="On this page">
      <div className="container">
        <ul>
          {sections.map((x) => (
            <li key={x.id}>
              <a href={`#${x.id}`} aria-current={active === x.id ? 'true' : undefined}>{x.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
