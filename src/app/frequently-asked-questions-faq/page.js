import Link from 'next/link';
import { PageHero, Faq, CtaBand } from '@/components/ui';
import { contentPage } from '@/lib/pages';
import s from './faq.module.css';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Answers to common questions about Bali Yoga School courses, certification, travel, accommodation and food.',
  alternates: { canonical: '/frequently-asked-questions-faq/' },
};

// Indices of Q&As not published (reasons recorded in docs/phase-2/handoff.md):
// 13, 14 medical advice; 16 unverified government-certification claim; 30 empty answer;
// 32, 44 outdated visa guidance; 40 teacher-qualification claim not supported by the teacher roster.
const EXCLUDE = new Set([13, 14, 16, 30, 32, 40, 44]);

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function FaqPage() {
  const page = contentPage('frequently-asked-questions-faq');
  const items = page.faqs.map((f, i) => ({ ...f, i })).filter((f) => !EXCLUDE.has(f.i) && f.a);
  const groups = page.faqGroups.map((g) => ({ title: g, items: items.filter((f) => f.group === g) })).filter((g) => g.items.length);

  return (
    <>
      <PageHero crumbs={[{ label: 'FAQ' }]} title="Frequently asked questions" lead="Answers to common questions about the courses, certification, travel, accommodation and food, as published by the school. Course-specific details are on each course page." />
      <section className="section">
        <div className={`container ${s.layout}`}>
          <nav className={s.toc} aria-label="FAQ topics">
            <p className={s.tocTitle}>Topics</p>
            <ul>{groups.map((g) => <li key={g.title}><a href={`#${slug(g.title)}`}>{g.title}</a></li>)}</ul>
          </nav>
          <div className={s.groups}>
            {groups.map((g) => (
              <section key={g.title} aria-labelledby={slug(g.title)}>
                <h2 id={slug(g.title)} className={s.groupTitle}>{g.title}</h2>
                <Faq items={g.items} idPrefix={slug(g.title)} />
              </section>
            ))}
            <p className="notice">Visa rules for Indonesia change frequently and are not covered here. Please check current entry requirements with official Indonesian immigration sources before you travel. Questions not answered here can be sent through the <Link href="/contact/">contact page</Link>.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
