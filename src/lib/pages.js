import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'src', 'data', 'extracted', 'pages');

// Content pages extracted from the original site (policies, FAQ, registration, payment, food, blog).
export function contentPage(slug) {
  const file = path.join(DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

// Retained blog articles (complete text captured in the audit and suitable for publication).
export const BLOG_SLUGS = [
  'what-you-learn-in-a-200-hour-yin-yoga-teacher-training',
  'sound-healing-training-ubud-bali',
];

const BLOG_IMAGES = {
  '200-hour-yoga-teacher-training-in-uluwatu-bali-curriculum-certification-cost-what-to-expect': 'beach-warrior',
  'uluwatu-yoga-teacher-training-international-student-guide': 'uluwatu-pool-day',
  'what-you-learn-in-a-200-hour-yin-yoga-teacher-training': 'mandala-rest',
  'sound-healing-training-ubud-bali': 'sound-bowls',
};

export function blogPosts() {
  return BLOG_SLUGS.map((s) => ({ ...contentPage(s), image: BLOG_IMAGES[s] }))
    .filter(Boolean)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

// Editorial clean-up only: one paragraph in the Yin article still starts with a writer's
// instruction ("Explain that …"); the instruction words are removed, the sentence is kept.
function tidy(text) {
  return typeof text === 'string' ? text.replace(/^Explain that (\w)/, (_, c) => c.toUpperCase()) : text;
}
function tidySection(sec) {
  return { ...sec, paragraphs: (sec.paragraphs || []).map(tidy), list: (sec.list || []).map(tidy), subsections: (sec.subsections || []).map(tidySection) };
}

export function blogPost(slug) {
  if (!BLOG_SLUGS.includes(slug)) return null;
  const p = contentPage(slug);
  return p ? { ...p, intro: (p.intro || []).map(tidy), sections: (p.sections || []).map(tidySection), image: BLOG_IMAGES[slug] } : null;
}

export function formatDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
