'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Site-wide, restrained motion. Content is fully visible in the HTML; animations only start once JS
// runs and the visitor has not asked for reduced motion. Only opacity and transform are animated
// (never visibility), so content stays in the accessibility tree and find-in-page before it is
// revealed. Everything is created inside gsap.matchMedia() (a gsap.context) and reverted on route
// change / unmount, so no tweens or ScrollTriggers leak between pages.
//
//  [data-reveal]          fade + rise when scrolled into view (once)
//  [data-reveal-group]    staggers its direct children
//  [data-parallax]        image drifts slightly while its frame crosses the viewport (desktop only)
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const vh = window.innerHeight;

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        // Elements already on screen at load are left alone, so nothing above the fold flashes.
        if (el.getBoundingClientRect().top < vh * 0.92) return;
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
        if (group.getBoundingClientRect().top < vh * 0.92) return;
        gsap.from(group.children, {
          opacity: 0,
          y: 18,
          duration: 0.55,
          ease: 'power2.out',
          // Cap the total stagger so long lists (e.g. 60 curriculum modules) finish quickly.
          stagger: { each: 0.07, amount: Math.min(0.45, 0.07 * group.children.length) },
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: group, start: 'top 88%', once: true },
        });
      });

      gsap.utils.toArray('[data-hero-in]').forEach((el, i) => {
        gsap.from(el, { opacity: 0, y: 14, duration: 0.6, delay: 0.05 + i * 0.08, ease: 'power2.out', clearProps: 'all' });
      });
    });

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
      gsap.utils.toArray('[data-parallax] img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -4, scale: 1.08 }, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      });
    });

    // Fonts and lazy images change layout after first paint; recalculate trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener('load', refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
