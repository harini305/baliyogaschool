// Hub (listing) pages kept at their original URLs. Intro text is selected from the original hub
// page (src/data/extracted/_hub-*.json) by paragraph index; paragraphs with unverified or false
// claims are deliberately not selected (noted per hub). Course lists come from the catalog, so every
// link resolves to a real retained page.
import { filterProgrammes, hubData } from './catalog';

const by = (sub, loc) => (p) => p.sub === sub && (!loc || p.location === loc);

export const HUBS = {
  'yin-yoga-ttc': {
    route: 'courses_group', eyebrow: 'Yin yoga', image: 'mandala-rest',
    title: 'Yin Yoga Teacher Training',
    intro: [],
    lead: 'Yin yoga teacher training at the Ubud, Uluwatu and Canggu campuses. Each course page lists its own syllabus, published dates and fees.',
    sections: [
      { id: 'ubud', title: 'Ubud', filter: by('yin', 'ubud'), view: 'grid' },
      { id: 'uluwatu', title: 'Uluwatu', filter: by('yin', 'uluwatu'), view: 'grid' },
      { id: 'canggu', title: 'Canggu', filter: by('yin', 'canggu'), view: 'grid' },
    ],
  },
  'yoga-teacher-training-courses-in-ubud-bali': {
    eyebrow: 'Ubud, Bali', image: 'shala-garden', campus: 'ubud',
    title: 'Yoga Teacher Training Courses in Ubud, Bali',
    intro: [0, 2], // [1] omitted: describes the Rishikesh curriculum
    sections: [
      { id: 'multistyle', title: 'Multistyle teacher training (Hatha & Ashtanga Vinyasa)', filter: by('multistyle', 'ubud'), view: 'grid' },
      { id: 'yin', title: 'Yin yoga teacher training', filter: by('yin', 'ubud'), view: 'grid' },
    ],
  },
  'yoga-teacher-trainings-in-uluwatu-bali': {
    eyebrow: 'Uluwatu, Bali', image: 'uluwatu-pool-day', campus: 'uluwatu',
    title: 'Yoga Teacher Trainings in Uluwatu, Bali',
    intro: [0, 1, 2],
    sections: [
      { id: 'multistyle', title: 'Multistyle teacher training (Hatha & Ashtanga Vinyasa)', filter: by('multistyle', 'uluwatu'), view: 'grid' },
      { id: 'yin', title: 'Yin yoga teacher training', filter: by('yin', 'uluwatu'), view: 'grid' },
    ],
  },
  'yoga-teacher-trainings-in-canggu-bali': {
    eyebrow: 'Canggu, Bali', image: 'canggu-building', campus: 'canggu',
    title: 'Yoga Teacher Trainings in Canggu, Bali',
    intro: [0, 2],
    highlights: 'Key Highlights of Yoga Teacher Training Courses in Canggu, Bali',
    sections: [
      { id: 'multistyle', title: 'Multistyle teacher training (Hatha & Ashtanga Vinyasa)', filter: by('multistyle', 'canggu'), view: 'grid' },
      { id: 'yin', title: 'Yin yoga teacher training', filter: by('yin', 'canggu'), view: 'grid' },
    ],
  },
  'yoga-teacher-training-courses-in-rishikesh-india': {
    eyebrow: 'Rishikesh, India · Sister school', image: 'rishikesh-terrace', campus: 'rishikesh',
    title: 'Yoga Teacher Training Courses in Rishikesh, India',
    intro: [0, 1, 2, 3],
    sections: [
      { id: 'multistyle', title: 'Multistyle teacher training at Himalayan Yoga Association', filter: by('multistyle', 'rishikesh'), view: 'grid' },
    ],
    note: 'Yin teacher training, healing courses and retreats in Rishikesh were listed on the original site as links to the Himalayan Yoga Association website and are not reproduced here.',
  },
  'healing-courses-in-bali': {
    eyebrow: 'Healing courses', image: 'sound-bowls',
    title: 'Healing Courses in Bali',
    intro: [0, 1],
    sections: [
      { id: 'sound', title: 'Sound healing in Ubud', filter: by('sound', 'ubud'), view: 'list' },
      { id: 'reiki', title: 'Reiki healing in Ubud', filter: by('reiki', 'ubud'), view: 'list' },
      { id: 'ayurveda', title: 'Ayurveda', filter: by('ayurveda'), view: 'list', showCampus: true },
      { id: 'sessions', title: 'One-to-one sessions in Ubud', filter: by('session'), view: 'list' },
      { id: 'canggu', title: 'Healing courses in Canggu', filter: (p) => ['sound', 'reiki'].includes(p.sub) && p.location === 'canggu', view: 'list' },
    ],
    links: [{ label: 'Healing courses in Uluwatu', href: '/healing-courses-in-uluwatu-bali/' }],
  },
  'healing-courses-in-uluwatu-bali': {
    eyebrow: 'Uluwatu, Bali', image: 'reiki-hands',
    title: 'Healing Courses in Uluwatu, Bali',
    intro: [0, 1],
    sections: [
      { id: 'sound', title: 'Sound healing', filter: by('sound', 'uluwatu'), view: 'list' },
      { id: 'reiki', title: 'Reiki healing', filter: by('reiki', 'uluwatu'), view: 'list' },
      { id: 'ayurveda', title: 'Ayurveda', filter: by('ayurveda', 'uluwatu'), view: 'list' },
    ],
  },
  'sound-healing-courses-in-bali': {
    eyebrow: 'Healing courses', image: 'sound-bowls',
    title: 'Sound Healing Courses in Bali',
    intro: [0], extra: 'Certified Sound Healing Courses in Bali',
    sections: [
      { id: 'ubud', title: 'Ubud', filter: by('sound', 'ubud'), view: 'list' },
      { id: 'uluwatu', title: 'Uluwatu', filter: by('sound', 'uluwatu'), view: 'list' },
      { id: 'canggu', title: 'Canggu', filter: by('sound', 'canggu'), view: 'list' },
    ],
  },
  'reiki-healing-courses-in-bali': {
    eyebrow: 'Healing courses', image: 'reiki-wide',
    title: 'Reiki Healing Courses in Bali',
    intro: [0], extra: 'Certified Reiki Healing Courses in Bali',
    sections: [
      { id: 'ubud', title: 'Ubud', filter: by('reiki', 'ubud'), view: 'list' },
      { id: 'uluwatu', title: 'Uluwatu', filter: by('reiki', 'uluwatu'), view: 'list' },
      { id: 'canggu', title: 'Canggu', filter: by('reiki', 'canggu'), view: 'list' },
    ],
  },
  'ayurveda-courses-in-bali': {
    eyebrow: 'Healing courses', image: null,
    title: 'Ayurveda Courses in Bali',
    intro: [0], extra: 'Certified Ayurveda Courses in Bali',
    sections: [{ id: 'courses', title: 'Ayurveda courses', filter: by('ayurveda'), view: 'list', showCampus: true }],
  },
  'online-yoga-teacher-training-courses-in-bali': {
    eyebrow: 'Online', image: 'class-seated',
    title: 'Online Yoga Teacher Training Courses',
    intro: [1], // [0] omitted: Yoga Alliance certification of online courses awaiting confirmation
    sections: [
      { id: 'ttc', title: 'Online teacher training', filter: (p) => p.sub === 'online' && !/15-days/.test(p.slug), view: 'list' },
      { id: 'specialised', title: '15-day specialised online courses', filter: (p) => p.sub === 'online' && /15-days/.test(p.slug), view: 'list' },
    ],
  },
  'online-specialized-yoga-courses': {
    eyebrow: 'Online', image: 'healing-meditation',
    title: 'Online Specialised Yoga Courses',
    intro: [],
    lead: 'Fifteen-day online courses, each focused on a single subject. Each course page lists its own format and published fee.',
    sections: [{ id: 'courses', title: '15-day online courses', filter: (p) => p.sub === 'online' && /15-days/.test(p.slug), view: 'list' }],
  },
  'yoga-retreats-in-bali': {
    eyebrow: 'Yoga retreats', image: 'mandala-rest',
    title: 'Yoga Retreats in Bali',
    intro: [0, 1], // [2] omitted: "daily Balinese massages in every retreat" is not true of every retreat page
    sections: [
      { id: 'ubud', title: 'Retreats in Ubud', filter: by('retreat', 'ubud'), view: 'list' },
      { id: 'canggu', title: 'Retreats in Canggu', filter: by('retreat', 'canggu'), view: 'list' },
    ],
    links: [{ label: 'Retreats in Uluwatu', href: '/yoga-retreats-in-uluwatu-bali-indonesia/' }, { label: 'Drop-in classes in Ubud', href: '/yoga-classes-in-bali/' }],
  },
  'yoga-retreats-in-uluwatu-bali-indonesia': {
    eyebrow: 'Uluwatu, Bali', image: 'uluwatu-pool-dusk',
    title: 'Yoga Retreats in Uluwatu, Bali',
    intro: [], // original intro is a copy of the Ubud hub
    lead: 'Retreats of 3 to 11 days at the Uluwatu campus. Each retreat page lists its own programme, inclusions and published fees.',
    sections: [{ id: 'uluwatu', title: 'Retreats in Uluwatu', filter: by('retreat', 'uluwatu'), view: 'list' }],
  },
};

export function hubSlugs() {
  return Object.keys(HUBS).filter((k) => !HUBS[k].route);
}

export function getHub(slug) {
  const def = HUBS[slug];
  if (!def) return null;
  const raw = hubData(slug) || {};
  const intro = (def.intro || []).map((i) => raw.intro?.[i]).filter(Boolean);
  const extraParas = def.extra ? (raw.extraSections || []).find((x) => x.heading === def.extra)?.paragraphs || [] : [];
  const highlights = def.highlights ? (raw.extraSections || []).find((x) => x.heading === def.highlights)?.paragraphs || [] : [];
  const sections = def.sections.map((sec) => ({ ...sec, items: filterProgrammes(sec.filter) })).filter((sec) => sec.items.length);
  return {
    ...def,
    slug,
    path: def.route ? `/${def.route}/${slug}/` : `/${slug}/`,
    metaTitle: raw.metaTitle || def.title,
    metaDescription: raw.metaDescription || def.lead || intro[0],
    intro: [...intro, ...extraParas],
    highlights,
    sections,
  };
}
