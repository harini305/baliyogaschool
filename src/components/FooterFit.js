'use client';

import { useEffect } from 'react';

// Publishes the footer's rendered height as the CSS variable --footer-h, so the closing call-to-action
// band can grow to make "band + footer" exactly fill the visible window below the sticky header.
export default function FooterFit() {
  useEffect(() => {
    const footer = document.querySelector('body > footer');
    if (!footer) return undefined;
    const set = () => document.documentElement.style.setProperty('--footer-h', `${Math.ceil(footer.getBoundingClientRect().height)}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);
  return null;
}
