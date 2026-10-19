'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav } from '@/data/site';
import images from '@/data/images.json';
import styles from './Header.module.css';

function isActive(item, pathname) {
  if (pathname === item.href) return true;
  return item.groups.some((g) => g.links.some((l) => l.href.split('#')[0] === pathname));
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(null);       // open desktop dropdown index
  const [drawer, setDrawer] = useState(false);  // mobile drawer
  const [section, setSection] = useState(null); // open mobile section
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);
  const suppressHover = useRef(false); // after a menu link is used, ignore hover until the pointer leaves

  // Close menus on route change
  useEffect(() => { setOpen(null); setDrawer(false); setSection(null); }, [pathname]);

  // Close desktop dropdown on outside click / Escape
  useEffect(() => {
    function onDoc(e) { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); }
    function onKey(e) {
      if (e.key !== 'Escape') return;
      if (drawer) { setDrawer(false); toggleRef.current?.focus(); }
      setOpen(null);
    }
    document.addEventListener('pointerdown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [drawer]);

  // Lock page scroll and move focus into the drawer while it is open
  useEffect(() => {
    document.documentElement.classList.toggle('drawer-open', drawer);
    if (drawer) drawerRef.current?.querySelector('a, button')?.focus();
    return () => document.documentElement.classList.remove('drawer-open');
  }, [drawer]);

  const logo = images.logo;

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="Bali Yoga School, home">
          <img src={logo.srcSet[0].src} srcSet={logo.srcSet.map((s) => `${s.src} ${s.w}w`).join(', ')} sizes="52px" width={logo.width} height={logo.height} alt="" className={styles.logo} />
          <span className={styles.wordmark}>Bali Yoga School</span>
        </Link>

        <nav ref={navRef} className={styles.desktop} aria-label="Main">
          <ul className={styles.menu}>
            {nav.map((item, i) => (
              <li key={item.label} className={styles.item} onMouseEnter={() => { if (!suppressHover.current) setOpen(i); }} onMouseLeave={() => { suppressHover.current = false; setOpen(null); }}>
                <button
                  type="button"
                  className={`${styles.trigger} ${isActive(item, pathname) ? styles.active : ''}`}
                  aria-expanded={open === i}
                  aria-controls={`menu-${i}`}
                  // Keyboard (detail 0) toggles; mouse/touch opens (hover already opened it on desktop).
                  onClick={(e) => setOpen(e.detail === 0 && open === i ? null : i)}
                >
                  {item.label}
                  <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                </button>
                <div id={`menu-${i}`} className={styles.panel} data-open={open === i} hidden={open !== i}>
                  {item.groups.map((g) => (
                    <div key={g.title} className={styles.group}>
                      <p className={styles.groupTitle}>{g.title}</p>
                      <ul>
                        {g.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} aria-current={pathname === l.href ? 'page' : undefined} onClick={() => { suppressHover.current = true; setOpen(null); }}>{l.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link className={styles.panelAll} href={item.href} onClick={() => { suppressHover.current = true; setOpen(null); }}>Overview: {item.label}</Link>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/contact/" className={`btn btn--primary btn--small ${styles.cta}`}>Enquire</Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.burger}
          aria-expanded={drawer}
          aria-controls="mobile-menu"
          onClick={() => setDrawer(!drawer)}
        >
          <span className="visually-hidden">{drawer ? 'Close menu' : 'Open menu'}</span>
          <span className={styles.burgerLines} data-open={drawer} aria-hidden="true"><i /><i /><i /></span>
        </button>
      </div>

      <div id="mobile-menu" ref={drawerRef} className={styles.drawer} data-open={drawer} hidden={!drawer}>
        <nav aria-label="Mobile">
          <ul className={styles.mList}>
            {nav.map((item, i) => (
              <li key={item.label}>
                <button type="button" className={styles.mTrigger} aria-expanded={section === i} onClick={() => setSection(section === i ? null : i)}>
                  {item.label}
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 10 10"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
                </button>
                <div className={styles.mPanel} hidden={section !== i}>
                  {item.groups.map((g) => (
                    <div key={g.title}>
                      <p className={styles.groupTitle}>{g.title}</p>
                      <ul>
                        {g.links.map((l) => (
                          <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.mFoot}>
            <Link href="/contact/" className="btn btn--primary">Enquire about a course</Link>
            <Link href="/frequently-asked-questions-faq/" className="btn btn--secondary">Read the FAQ</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
