// Business facts used across the site. Sources: docs/source-audit/content/pages/contact.md,
// 03-content-inventory.md §1. Values marked `confirm` are published on the original site
// but conflict elsewhere in the audit (see docs/phase-2/handoff.md, unresolved facts).

export const site = {
  name: 'Bali Yoga School',
  legalName: 'Bali Yoga School®',
  tagline: 'Yoga teacher training, healing courses and retreats in Bali',
  address: {
    lines: ['Jl. Campuhan III, Singakerta', 'Kecamatan Ubud, Kabupaten Gianyar', 'Bali 80571, Indonesia'],
    label: 'Ubud campus',
  },
  // info@ is the address shown on the contact page and in the footer. A gmail address also appears
  // in page metadata and in a malformed footer link; it is not published here.
  email: 'info@baliyogaschool.com',
  phones: [
    { label: 'Mobile', value: '+91 72172 06223', confirm: true },
    { label: 'WhatsApp', value: '+91 82797 05844', confirm: true },
  ],
  hours: 'Open daily, 24 hours (as published on the original contact page)',
  copyright: 'Bali Yoga School®. All rights reserved.',
};

export const campuses = {
  ubud: {
    key: 'ubud',
    name: 'Ubud',
    region: 'Bali, Indonesia',
    path: '/bali-yoga-school-campus-pictures-in-bali-indonesia/',
    hub: '/yoga-teacher-training-courses-in-ubud-bali/',
    image: 'shala-garden',
    blurb: 'Away from the noise of the centre yet a 10-minute ride from it, with airy yoga shalas, two swimming pools and gardens.',
  },
  uluwatu: {
    key: 'uluwatu',
    name: 'Uluwatu',
    region: 'Bali, Indonesia',
    path: '/bali-yoga-school-campus-pictures-in-uluwatu-indonesia/',
    hub: '/yoga-teacher-trainings-in-uluwatu-bali/',
    image: 'uluwatu-pool-dusk',
    blurb: 'Away from the noise, in tranquillity, yet close to the beaches and the centre of Uluwatu.',
  },
  canggu: {
    key: 'canggu',
    name: 'Canggu',
    region: 'Bali, Indonesia',
    path: '/canggu-campus-photos-in-bali-indonesia/',
    hub: '/yoga-teacher-trainings-in-canggu-bali/',
    image: 'canggu-pool',
    blurb: 'Set a few minutes back from the main street towards a quieter, nature-filled area, about 1.5 km from Echo Beach.',
  },
  rishikesh: {
    key: 'rishikesh',
    name: 'Rishikesh',
    region: 'Uttarakhand, India',
    path: '/yoga-teacher-training-courses-in-rishikesh-india/',
    hub: '/yoga-teacher-training-courses-in-rishikesh-india/',
    image: 'rishikesh-terrace',
    blurb: 'Himalayan Yoga Association, the sister school in Rishikesh, India, described on the original site as the head school branch of Bali Yoga School.',
  },
  online: {
    key: 'online',
    name: 'Online',
    region: 'Live and recorded',
    path: '/online-yoga-teacher-training-courses-in-bali/',
    hub: '/online-yoga-teacher-training-courses-in-bali/',
    image: 'class-seated',
    blurb: 'Online teacher training and 15-day specialised courses with recorded lessons and live sessions.',
  },
};

export const nav = [
  {
    label: 'Teacher training',
    href: '/courses/',
    groups: [
      {
        title: 'Multistyle (Hatha & Ashtanga Vinyasa)',
        links: [
          { label: 'Ubud, Bali', href: '/yoga-teacher-training-courses-in-ubud-bali/' },
          { label: 'Uluwatu, Bali', href: '/yoga-teacher-trainings-in-uluwatu-bali/' },
          { label: 'Canggu, Bali', href: '/yoga-teacher-trainings-in-canggu-bali/' },
          { label: 'Rishikesh, India', href: '/yoga-teacher-training-courses-in-rishikesh-india/' },
        ],
      },
      {
        title: 'Specialised training',
        links: [
          { label: 'Yin yoga teacher training', href: '/courses_group/yin-yoga-ttc/' },
          { label: 'Prenatal, aerial & astrology', href: '/courses/#short-courses' },
          { label: 'Online courses', href: '/online-yoga-teacher-training-courses-in-bali/' },
          { label: 'All courses', href: '/courses/' },
        ],
      },
    ],
  },
  {
    label: 'Healing',
    href: '/healing-courses-in-bali/',
    groups: [
      {
        title: 'Healing courses',
        links: [
          { label: 'Sound healing', href: '/sound-healing-courses-in-bali/' },
          { label: 'Reiki healing', href: '/reiki-healing-courses-in-bali/' },
          { label: 'Ayurveda', href: '/ayurveda-courses-in-bali/' },
          { label: 'Healing in Uluwatu', href: '/healing-courses-in-uluwatu-bali/' },
        ],
      },
      {
        title: 'One-to-one sessions',
        links: [
          { label: 'Sound healing session', href: '/sound-healing-session-in-ubud-bali/' },
          { label: 'Reiki healing session', href: '/reiki-healing-session-in-ubud-bali/' },
          { label: 'Water purification', href: '/water-purification-session-in-ubud-bali/' },
        ],
      },
    ],
  },
  {
    label: 'Retreats',
    href: '/yoga-retreats-in-bali/',
    groups: [
      {
        title: 'Yoga retreats',
        links: [
          { label: 'Ubud retreats', href: '/yoga-retreats-in-bali/' },
          { label: 'Uluwatu retreats', href: '/yoga-retreats-in-uluwatu-bali-indonesia/' },
          { label: 'Canggu retreats', href: '/yoga-retreats-in-bali/#canggu' },
          { label: 'Drop-in classes', href: '/yoga-classes-in-bali/' },
        ],
      },
    ],
  },
  {
    label: 'Campuses',
    href: '/bali-yoga-school-campus-pictures-in-bali-indonesia/',
    groups: [
      {
        title: 'Where we teach',
        links: [
          { label: 'Ubud campus', href: '/bali-yoga-school-campus-pictures-in-bali-indonesia/' },
          { label: 'Uluwatu campus', href: '/bali-yoga-school-campus-pictures-in-uluwatu-indonesia/' },
          { label: 'Canggu campus', href: '/canggu-campus-photos-in-bali-indonesia/' },
          { label: 'Food at the school', href: '/yogic-food-menu/' },
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about-bali-yoga-school/',
    groups: [
      {
        title: 'The school',
        links: [
          { label: 'About the school', href: '/about-bali-yoga-school/' },
          { label: 'Founder', href: '/yogi-himanshu-best-yoga-teacher-in-bali-indonesia/' },
          { label: 'Teachers', href: '/accomplished-yoga-gurus-at-bali-yoga-school/' },
          { label: 'Management team', href: '/bys-head-management/' },
          { label: 'Student reviews', href: '/bali-yoga-school-reviews/' },
          { label: 'Accreditation', href: '/bys-affiliations/' },
          { label: 'Blog', href: '/blog/' },
        ],
      },
    ],
  },
];

export const footerLinks = [
  {
    title: 'Programmes',
    links: [
      { label: 'All courses', href: '/courses/' },
      { label: 'Yin yoga teacher training', href: '/courses_group/yin-yoga-ttc/' },
      { label: 'Healing courses', href: '/healing-courses-in-bali/' },
      { label: 'Yoga retreats', href: '/yoga-retreats-in-bali/' },
      { label: 'Online courses', href: '/online-yoga-teacher-training-courses-in-bali/' },
    ],
  },
  {
    title: 'The school',
    links: [
      { label: 'About', href: '/about-bali-yoga-school/' },
      { label: 'Teachers', href: '/accomplished-yoga-gurus-at-bali-yoga-school/' },
      { label: 'Student reviews', href: '/bali-yoga-school-reviews/' },
      { label: 'Accreditation', href: '/bys-affiliations/' },
      { label: 'Blog', href: '/blog/' },
    ],
  },
  {
    title: 'Plan your stay',
    links: [
      { label: 'FAQ', href: '/frequently-asked-questions-faq/' },
      { label: 'Registration', href: '/course-registration/' },
      { label: 'Payment policy', href: '/course-payment/' },
      { label: 'Terms & refund policy', href: '/terms-conditions/' },
      { label: 'Trademark & IP policy', href: '/intellectual-property-copyright-trademark/' },
    ],
  },
];
