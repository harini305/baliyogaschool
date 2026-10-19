// Server-side data layer for courses, retreats, sessions and hubs.
// Raw data: src/data/extracted/*.json (faithful extractions from docs/source-audit/content/pages).
// This module applies the documented presentation rules:
//  - drops text copied from another campus (e.g. Uluwatu cliffs on an Ubud page, Rishikesh text on Bali pages)
//  - drops FAQ entries whose answers were not captured
//  - suppresses fee figures that are evidently mistyped (offer < 40% of the listed fee)
//  - never surfaces the issues[] list on the page (it feeds the hand-off report instead)
import fs from 'node:fs';
import path from 'node:path';
import images from '@/data/images.json';
import { campuses } from '@/data/site';

const DIR = path.join(process.cwd(), 'src', 'data', 'extracted');

// Programmes retired or merged (see src/data/redirects.mjs)
const EXCLUDED = new Set(['200-hour-online-yoga-teacher-training-certification-course']);

const FOREIGN = {
  ubud: /\b(Uluwatu|Canggu|Rishikesh|Himalaya|HYA|cliff|ocean view|sandy beach|beach life)/i,
  uluwatu: /\b(Ubud|Canggu|Rishikesh|Himalaya|HYA|heart of Bali)/i,
  canggu: /\b(Ubud|Uluwatu|Rishikesh|Himalaya|HYA|heart of Bali)/i,
  rishikesh: /\b(Ubud|Uluwatu|Canggu|Denpasar|DPS|Ngurah Rai)\b/i,
  online: /\b(Ubud|Uluwatu|Canggu)\b|same roof/i,
};
const EDITORIAL = /(redesign|proposed curriculum|text on the button|\[insert|lorem ipsum)/i;

function clean(location, list) {
  if (!Array.isArray(list)) return [];
  const re = FOREIGN[location];
  return list.filter((p) => typeof p === 'string' && p.trim() && !EDITORIAL.test(p) && !(re && re.test(p)));
}
function cleanOne(location, text) {
  return clean(location, [text])[0] || null;
}

const IMAGE_PLAN = {
  multistyle: {
    ubud: { 50: 'teacher-greeting', 100: 'class-upward-dog', 200: 'certificates-group', 300: 'graduation-group', 500: 'ceremony-fire' },
    uluwatu: { 50: 'beach-warrior', 100: 'beach-balance', 200: 'uluwatu-pool-day', 300: 'uluwatu-deck', 500: 'uluwatu-villa' },
    canggu: { 50: 'canggu-building', 100: 'canggu-room', 200: 'canggu-pool', 300: 'class-seated', 500: 'class-mandala-wall' },
    rishikesh: { 50: 'rishikesh-class', 100: 'rishikesh-pranayama', 200: 'rishikesh-terrace', 300: 'rishikesh-class', 500: 'rishikesh-pranayama' },
  },
  yin: {
    ubud: { 50: 'yin-pair', 100: 'mandala-rest', 200: 'yin-beach', 300: 'garland-embrace', 500: 'graduation-group' },
    uluwatu: { 50: 'yin-beach-stretch', 100: 'yin-beach', 200: 'uluwatu-hall', 300: 'uluwatu-pool-aerial' },
    canggu: { 50: 'canggu-room-2', 100: 'canggu-room-3', 200: 'canggu-pool' },
  },
};
const RETREAT_IMAGES = {
  ubud: ['shala-garden', 'mandala-rest', 'class-mandala-wall', 'teacher-greeting', 'food-table', 'ubud-stay-pool', 'shala-gong', 'retreat-group', 'garland-embrace'],
  uluwatu: ['uluwatu-pool-dusk', 'uluwatu-pool-day', 'uluwatu-deck', 'uluwatu-villa', 'uluwatu-room', 'uluwatu-room-2', 'uluwatu-hall', 'uluwatu-pool-aerial', 'food-pool'],
  canggu: ['canggu-pool', 'canggu-building', 'canggu-room', 'canggu-room-2', 'canggu-room-3', 'food-plates', 'food-buffet', 'food-banana-leaf'],
};

function pickImage(c) {
  if (c.kind === 'multistyle' || c.kind === 'yin') return IMAGE_PLAN[c.kind]?.[c.location]?.[c.hours] || 'class-seated';
  if (c.kind === 'retreat') {
    const list = RETREAT_IMAGES[c.location] || RETREAT_IMAGES.ubud;
    return list[((c.days || 3) - 3) % list.length];
  }
  if (c.kind === 'short') return /prenatal/.test(c.slug) ? 'prenatal-class' : null;
  if (c.kind === 'online') return /meditation|pranayama|philosophy/.test(c.slug) ? 'healing-meditation' : 'class-seated';
  if (c.kind === 'session') {
    if (/water/.test(c.slug)) return 'water-blessing';
    return /reiki/.test(c.slug) ? 'reiki-wide' : 'sound-bowls';
  }
  if (c.kind === 'healing') {
    if (/ayurved/.test(c.slug)) return null;
    if (/reiki/.test(c.slug)) return /1-2-3|best/.test(c.slug) ? 'reiki-hands' : 'reiki-wide';
    return /1-2-3|best/.test(c.slug) ? 'sound-bowls' : 'healing-meditation';
  }
  return null;
}

function subKind(c) {
  if (c.kind !== 'healing') return c.kind;
  if (/ayurved|panchakarma/.test(c.slug)) return 'ayurveda';
  if (/reiki/.test(c.slug)) return 'reiki';
  return 'sound';
}

function fees(raw) {
  if (!raw || !raw.options?.length) return null;
  const options = raw.options.map((o) => {
    const suspect = o.original && o.offer && o.offer < o.original * 0.4;
    return suspect
      ? { ...o, offer: null, suspect: true }
      : o;
  });
  return { ...raw, options, extras: (raw.extras || []).filter((e) => e.label) };
}

// Teacher-training lengths conflict across the original site (audit 08 §A2: e.g. 100 h stated as 12, 13
// and 15 days; 200 h as 24 and 25 days). Until the school confirms them, no day count is published for
// multistyle or Yin teacher training: the duration field is withheld and sentences stating a number of
// days are dropped from the intro and hour summary. Published batch dates are still shown.
const DURATION_DISPUTED = new Set(['multistyle', 'yin']);
const DAY_COUNT = /\b\d+\s*[- ]?\s*(days?|nights?)\b|\bmonth.long\b|\btwo months\b/i;
function withoutDayCounts(paragraphs) {
  return paragraphs
    .map((p) => p.split(/(?<=[.!?])\s+/).filter((s) => !DAY_COUNT.test(s)).join(' '))
    .filter((p) => p.trim().length > 40);
}

function normalise(raw) {
  const loc = raw.location;
  if (DURATION_DISPUTED.has(raw.kind)) {
    raw = {
      ...raw,
      duration: null,
      durationDisputed: true,
      intro: withoutDayCounts(raw.intro || []),
      summary: raw.summary && DAY_COUNT.test(raw.summary) ? null : raw.summary,
      metaDescription: raw.metaDescription && DAY_COUNT.test(raw.metaDescription) ? null : raw.metaDescription,
      keyFacts: (raw.keyFacts || []).filter((k) => !/period|length|duration|days|nights/i.test(k.label) && !DAY_COUNT.test(k.value)),
      hourCalculation: (raw.hourCalculation || []).filter((h) => !/period/i.test(h.label) && !/total:?\s*\d+\s*days/i.test(h.value) && !/^\d+\s*days?$/i.test(h.value)),
    };
  }
  const c = {
    ...raw,
    // Leading "Best …" in some original H1s is an unverifiable superlative; the rest of the title is kept.
    title: raw.title.replace(/^Best\s+/i, '').replace(/^(\w)/, (m) => m.toUpperCase()),
    displayTitle: raw.displayTitle ? raw.displayTitle.replace(/^Best\s+/i, '') : raw.displayTitle,
    intro: clean(loc, raw.intro),
    summary: cleanOne(loc, raw.summary) || cleanOne(loc, raw.metaDescription),
    arrival: clean(loc, raw.arrival),
    addOnNote: cleanOne(loc, raw.addOnNote),
    inclusions: clean(loc, raw.inclusions),
    exclusions: clean(loc, raw.exclusions),
    prerequisites: clean(loc, raw.prerequisites),
    dining: raw.dining ? { text: cleanOne(loc, raw.dining.text), mealTimes: raw.dining.mealTimes || [] } : null,
    faqs: (raw.faqs || []).filter((f) => f.q && f.a && !(FOREIGN[loc] && FOREIGN[loc].test(f.a))),
    policies: (raw.policies || []).map((p) => ({ ...p, items: clean(loc, p.items) })).filter((p) => p.items.length),
    keyFacts: (raw.keyFacts || []).filter((k) => k && k.value && !(FOREIGN[loc] && FOREIGN[loc].test(k.value))),
    fees: fees(raw.fees),
    schedule: schedule(raw.schedule),
    sub: subKind(raw),
    campus: campuses[loc],
  };
  c.image = pickImage(c);
  c.lowestFee = lowest(c.fees);
  return c;
}

// Batches whose end date falls before the audit capture (October 2026) are labelled as past rather
// than "Available", so out-of-date listings (e.g. 2024–25 dates on an older page) are not presented as bookable.
const CAPTURE = { year: 2026, month: 10 };
const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
function batchEnd(text) {
  const re = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?[\s,/]*(20\d\d)/gi;
  let m, last = null;
  while ((m = re.exec(text))) last = { month: MONTHS.indexOf(m[1].toLowerCase()) + 1, year: Number(m[2]) };
  return last;
}
function schedule(raw) {
  if (!raw) return raw;
  const batches = (raw.batches || []).map((b) => {
    const end = batchEnd(b.dates || '');
    const past = end && (end.year < CAPTURE.year || (end.year === CAPTURE.year && end.month < CAPTURE.month));
    return past ? { ...b, status: 'Past date' } : b;
  });
  const current = batches.filter((b) => b.status !== 'Past date');
  return { ...raw, batches: current, pastCount: batches.length - current.length, allPast: batches.length > 0 && current.length === 0 };
}

function lowest(f) {
  if (!f) return null;
  const vals = f.options.map((o) => o.offer ?? o.original).filter((v) => typeof v === 'number' && v > 0);
  return vals.length ? Math.min(...vals) : null;
}

let cache;
function load() {
  if (cache) return cache;
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
  const programmes = [];
  const hubs = {};
  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
    if (EXCLUDED.has(raw.slug)) continue;
    programmes.push(normalise(raw));
  }
  for (const f of fs.readdirSync(DIR).filter((x) => x.startsWith('_hub-'))) {
    hubs[f.replace(/^_hub-|\.json$/g, '')] = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8'));
  }
  programmes.sort(sortProgrammes);
  cache = { programmes, hubs };
  return cache;
}

const LOC_ORDER = ['ubud', 'uluwatu', 'canggu', 'rishikesh', 'online'];
const SUB_ORDER = ['multistyle', 'yin', 'short', 'sound', 'reiki', 'ayurveda', 'session', 'online', 'retreat'];
function levelRank(c) {
  const m = (c.level || '').match(/\d/g);
  return m ? Number(m[0]) * 10 + m.length : 99;
}
function sortProgrammes(a, b) {
  return (
    SUB_ORDER.indexOf(a.sub) - SUB_ORDER.indexOf(b.sub) ||
    LOC_ORDER.indexOf(a.location) - LOC_ORDER.indexOf(b.location) ||
    (a.hours ?? 999) - (b.hours ?? 999) ||
    (a.days ?? 0) - (b.days ?? 0) ||
    levelRank(a) - levelRank(b) ||
    a.slug.localeCompare(b.slug)
  );
}

export function allProgrammes() { return load().programmes; }
export function courseProgrammes() { return load().programmes.filter((p) => p.path.startsWith('/courses/')); }
export function rootProgrammes() { return load().programmes.filter((p) => !p.path.startsWith('/courses/')); }
export function programmeBySlug(slug) { return load().programmes.find((p) => p.slug === slug) || null; }
export function programmeByPath(p) { return load().programmes.find((x) => x.path === p) || null; }
export function hubData(slug) { return load().hubs[slug] || null; }

export function filterProgrammes(fn) { return load().programmes.filter(fn); }

export function related(c, limit = 3) {
  const all = load().programmes.filter((p) => p.slug !== c.slug);
  const same = all.filter((p) => p.sub === c.sub && p.location === c.location);
  const other = all.filter((p) => p.sub === c.sub && p.location !== c.location && p.hours === c.hours && c.hours);
  const picks = [...same, ...other];
  return picks.slice(0, limit);
}

export function image(key) {
  return key ? images[key] || null : null;
}

export function cleanHubText(location, list) {
  return clean(location, list);
}

export const KIND_LABEL = {
  multistyle: 'Multistyle teacher training',
  yin: 'Yin yoga teacher training',
  short: 'Specialised short course',
  sound: 'Sound healing course',
  reiki: 'Reiki healing course',
  ayurveda: 'Ayurveda course',
  session: 'One-to-one healing session',
  online: 'Online course',
  retreat: 'Yoga retreat',
};
