// Route plan for retired, merged, duplicate and broken URLs from the original site.
// Applied locally through next.config.mjs redirects(); production redirects are NOT changed by this project.
// Each entry: { from, to, reason }. Documented in docs/phase-2/route-map.md.
import fs from 'node:fs';
import path from 'node:path';
import blog from './blog-redirects.json' with { type: 'json' };

// Paths that are retained pages must never be redirected (some old blog posts share slugs with pages).
const ROOT = process.cwd();
const extractedDir = path.join(ROOT, 'src', 'data', 'extracted');
const retained = new Set(
  fs.readdirSync(extractedDir).filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map((f) => JSON.parse(fs.readFileSync(path.join(extractedDir, f), 'utf8')).path),
);
// Root-level hub listings and retained articles served by src/app/[slug] (see src/lib/hubs.js, src/lib/pages.js).
const DYNAMIC_ROOT = [
  'yoga-teacher-training-courses-in-ubud-bali', 'yoga-teacher-trainings-in-uluwatu-bali', 'yoga-teacher-trainings-in-canggu-bali',
  'yoga-teacher-training-courses-in-rishikesh-india', 'healing-courses-in-bali', 'healing-courses-in-uluwatu-bali',
  'sound-healing-courses-in-bali', 'reiki-healing-courses-in-bali', 'ayurveda-courses-in-bali',
  'online-yoga-teacher-training-courses-in-bali', 'online-specialized-yoga-courses', 'yoga-retreats-in-bali',
  'yoga-retreats-in-uluwatu-bali-indonesia', 'what-you-learn-in-a-200-hour-yin-yoga-teacher-training', 'sound-healing-training-ubud-bali',
].map((s) => `/${s}/`);
function isPage(from) {
  if (retained.has(from) || DYNAMIC_ROOT.includes(from)) return true;
  if (fs.existsSync(path.join(ROOT, 'src', 'app', ...from.split('/').filter(Boolean), 'page.js'))) return true;
  return false;
}

const intl = ['cambodia', 'costa-rica', 'japan', 'kerala-india', 'los-angeles-usa', 'mexico', 'nepal', 'russia', 'spain', 'thailand'];
const intlCourse = ['cambodia', 'costarica', 'germany', 'goa-india', 'japan', 'losangeles', 'mexico', 'nepal', 'russia', 'spain', 'thailand', 'varkala-kerala-india'];
const hyaMiniSite = [
  'himalayan-yoga-ashram-contact-rishikesh-india', 'himalayan-yoga-ashram-courses-rishikesh-india',
  'himalayan-yoga-ashram-instagram-rishikesh-india', 'himalayan-yoga-ashram-location-rishikesh-india',
  'himalayan-yoga-ashram-pictures-rishikesh-india', 'himalayan-yoga-ashram-retreats-rishikesh-india',
  'himalayan-yoga-ashram-reviews-rishikesh-india', 'himalayan-yoga-ashram-rishikesh',
  'himalayan-yoga-ashram-sound-healing-rishikesh-india', 'himalayan-yoga-ashram-ttc-rishikesh-india',
  'himalayan-yoga-cafe-menu-in-rishikesh-india', 'kohi-cafe-rishikesh', 'rishikesh-campus-photos',
];
const RISHIKESH = '/yoga-teacher-training-courses-in-rishikesh-india/';
const UBUD_CAMPUS = '/bali-yoga-school-campus-pictures-in-bali-indonesia/';
const ONLINE_200 = '/courses/200-hour-online-yoga-teacher-training-in-bali/';
const handledArchives = ['/meditation/', '/yoga-retreat-in-bali/', '/author/admin/', '/blog/page/2/', '/ja/', '/ko/'];

const allRoutes = [
  // Broken links repaired
  { from: '/intellectual-property-policy/', to: '/intellectual-property-copyright-trademark/', reason: '404 linked from every footer; the real policy page' },
  { from: '/yoga-teacher-training-courses-in-los-angeles/', to: '/courses/', reason: '410 Gone, linked from the menu; no verified programme' },
  { from: '/appointment/', to: '/contact/', reason: 'Rendered a raw [booked-calendar] shortcode; no booking engine' },
  { from: '/our-events/', to: '/courses/', reason: 'Rendered a raw [trx_sc_events] shortcode; no event content' },
  { from: '/yoga-retreat-in-bali/', to: '/yoga-retreats-in-bali/', reason: 'Page shadowed by a same-slug blog category' },
  { from: '/meditation/', to: '/blog/', reason: 'Page shadowed by a same-slug blog category' },

  // Duplicates merged into a canonical page
  { from: '/300-hours-yoga-teacher-training-in-canggu-bali/', to: '/courses/300-hours-yoga-teacher-training-in-canggu-bali/', reason: 'Older duplicate of the course page' },
  { from: '/500-hours-yoga-teacher-training-in-canggu-bali/', to: '/courses/500-hours-yoga-teacher-training-in-canggu-bali/', reason: 'Older duplicate of the course page (300 h syllabus merged)' },
  { from: '/courses/50-hour-yoga-teacher-training-in-india/', to: '/courses/50-hour-yoga-teacher-training-in-rishikesh-india/', reason: 'Already redirected on the original site' },
  { from: '/courses/300-hour-yoga-teacher-training-in-india/', to: '/courses/300-hour-yoga-teacher-training-in-rishikesh-india/', reason: 'Already redirected on the original site' },
  { from: '/courses/500-hour-yoga-teacher-training-in-india/', to: '/courses/500-hour-yoga-teacher-training-in-rishikesh-india/', reason: 'Already redirected on the original site' },
  { from: '/prenatal-postnatal-yoga-teacher-training-course-in-bali/', to: '/courses/5-days-prenatal-postnatal-yoga-teacher-training-course-in-bali-indonesia/', reason: 'Hidden older copy of the 5-day prenatal course (fees copied from a Canggu retreat)' },
  { from: '/courses/level-2-sound-healing-course-in-bali-indonesia-2/', to: '/courses/level-2-sound-healing-course-in-bali-indonesia/', reason: '"-2" duplicate' },
  { from: '/courses/level-3-sound-healing-course-bali-indonesia-2/', to: '/courses/level-3-sound-healing-course-in-bali-indonesia/', reason: '"-2" duplicate' },
  { from: '/courses/200-hour-yoga-teacher-training-in-japan-2/', to: '/courses/', reason: '"-2" duplicate of an unverified international page' },
  { from: '/yogic-food-menu-bali/', to: '/yogic-food-menu/', reason: 'Near-empty duplicate' },
  { from: '/write-cafe-guest-post/', to: '/contact/', reason: 'Guest-post solicitation pages retired' },
  { from: '/write-cafes-guest-posts/', to: '/contact/', reason: 'Guest-post solicitation pages retired' },
  { from: '/write-yoga-guest-post/', to: '/contact/', reason: 'Guest-post solicitation pages retired' },
  { from: '/write-yoga-guest-posts/', to: '/contact/', reason: 'Guest-post solicitation pages retired' },
  { from: '/bali-yoga-retreats/', to: '/yoga-retreats-in-bali/', reason: 'Overlapping Bali retreat hub' },
  { from: '/best-yoga-teacher-training-course-in-bali/', to: '/courses/', reason: 'SEO filler landing page' },
  { from: '/yoga-in-bali/', to: '/courses/', reason: 'SEO filler landing page' },
  { from: '/courses_group/online-yoga-course/', to: '/online-yoga-teacher-training-courses-in-bali/', reason: 'Taxonomy archive merged into the online hub' },
  { from: '/courses_group/yoga-teacher-training-course-india/', to: RISHIKESH, reason: 'Taxonomy archive merged into the Rishikesh hub' },
  { from: '/hya-affiliations/', to: '/bys-affiliations/', reason: 'Sister-school affiliations merged' },
  { from: '/yoga-alliance-registration/', to: '/bys-affiliations/', reason: 'Merged into the accreditation page' },
  { from: '/achivments/', to: '/bali-yoga-school-reviews/', reason: 'Image-only page (36 images, no text)' },
  { from: '/bali-visa-on-arrival-fees-requirements/', to: '/frequently-asked-questions-faq/', reason: 'Outdated visa rules (abolished visa-free scheme, conflicting fees); awaiting current information' },
  { from: '/covid-guide-line-faq-for-customers/', to: '/frequently-asked-questions-faq/', reason: 'Outdated 2021 COVID guidance' },

  // Campus galleries merged into campus pages
  { from: '/gallery/', to: UBUD_CAMPUS, reason: 'Gallery merged into the campus page' },
  { from: '/second-accommodation-pictures/', to: UBUD_CAMPUS, reason: 'Merged into the Ubud campus page' },
  { from: '/third-accommodation-pictures/', to: UBUD_CAMPUS, reason: 'Merged into the Ubud campus page' },
  { from: '/bali-yoga-school-campus-videos-in-bali/', to: UBUD_CAMPUS, reason: 'YouTube-only page; videos are not embedded in this build' },

  // Rishikesh sister-school mini-site and India hubs (content lives on the HYA website)
  ...hyaMiniSite.map((s) => ({ from: `/${s}/`, to: RISHIKESH, reason: 'Sister-school (HYA) mini-site page' })),
  ...['healing-courses-in-india', 'sound-healing-courses-in-india', 'reiki-healing-courses-in-india', 'ayurveda-courses-in-india', 'yoga-retreats-in-india']
    .map((s) => ({ from: `/${s}/`, to: RISHIKESH, reason: 'India hub listing external HYA programmes' })),

  // International clones (Bali content repeated word for word; programmes unverified)
  ...intl.map((c) => ({ from: `/yoga-retreats-in-${c}/`, to: '/yoga-retreats-in-bali/', reason: 'International clone of the Bali retreat hub' })),
  ...intl.map((c) => ({ from: `/healing-courses-in-${c}/`, to: '/healing-courses-in-bali/', reason: 'International clone of the Bali healing hub' })),
  ...['cambodia', 'costa-rica', 'japan', 'mexico', 'nepal', 'russia', 'spain'].map((c) => ({ from: `/yoga-teacher-training-in-${c}/`, to: '/courses/', reason: 'Unverified international TTC listing' })),
  { from: '/yoga-teacher-training-courses-in-varkala-kerala-india/', to: '/courses/', reason: 'Unverified international TTC listing' },
  ...intlCourse.flatMap((c) => [200, 300].map((h) => ({ from: `/courses/${h}-hour-yoga-teacher-training-in-${c}/`, to: '/courses/', reason: 'Unverified international course (deposit only, no dates)' }))),
  { from: '/courses/200-hour-online-yoga-teacher-training-certification-course/', to: ONLINE_200, reason: 'Obsolete 2021 version of the online 200-hour course (same syllabus)' },
  { from: '/online-sound-healing-courses/', to: '/healing-courses-in-bali/', reason: 'Online healing hub with no course pages behind it' },
  { from: '/online-reiki-healing-courses/', to: '/healing-courses-in-bali/', reason: 'Online healing hub with no course pages behind it' },
  { from: '/courses/200-hour-online-yoga-teacher-training-course-in-spain/', to: ONLINE_200, reason: 'Country clone of the online 200-hour course' },
  { from: '/courses/yoga-alliance-certified-200-hour-online-yoga-teacher-training-course-in-japan/', to: ONLINE_200, reason: 'Country clone of the online 200-hour course' },
  { from: '/courses/yoga-alliance-certified-200-hour-online-yoga-teacher-training-course-in-south-korea/', to: ONLINE_200, reason: 'Country clone of the online 200-hour course' },

  // Blog: five recent, fully captured articles are retained; the rest await a business decision.
  { from: '/author/admin/', to: '/blog/', reason: 'Author archive' },
  { from: '/blog/page/2/', to: '/blog/', reason: 'Paginated archive' },
  { from: '/ja/', to: '/blog/', reason: 'Blog filter mislabelled as a translation' },
  { from: '/ko/', to: '/blog/', reason: 'Empty blog filter mislabelled as a translation' },
  ...blog.archives.filter((p) => !handledArchives.includes(p)).map((p) => ({ from: p, to: '/blog/', reason: 'Blog category archive' })),
  ...blog.posts.map((p) => ({ from: p, to: '/blog/', reason: 'Blog post not migrated (decision pending)' })),
];

// Some post slugs equal category slugs; keep the first (most specific) rule for each source path.
export const retiredRoutes = allRoutes
  .filter((r, i) => allRoutes.findIndex((x) => x.from === r.from) === i)
  .filter((r) => !isPage(r.from));
