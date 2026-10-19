// People data. Source of record: /accomplished-yoga-gurus-at-bali-yoga-school/ (teachers, Oct 2026)
// and /bys-head-management/ (management). The home page lists a different roster (Yogini Idatrini,
// Vaishnavi) and different roles; those differences are recorded in the hand-off report and the
// names are not merged in here. Portraits are mapped by the audit's alt text for each file.

export const founder = {
  name: 'Yogi Himanshu Joshi',
  role: 'Founder of Bali Yoga School and Himalayan Yoga Association',
  image: 'founder',
  statement: [
    'My journey with Bali Yoga School began when I met Dewa at a hotel in Ubud, Bali. From our very first meeting, our relationship felt less like a business connection and more like that of two brothers. After spending some time together, I shared with him the idea of creating a yoga school in Ubud under the name Bali Yoga School, and from there our journey began.',
    'The early years were not always easy. We faced many challenges, but Dewa and I remained together with honesty, mutual understanding, trust, and respect.',
    'Today, I personally teach less because my focus has gradually expanded toward creating employment, educating people, developing responsible teams, and providing teachers and staff with a healthy space where they can work, learn, grow, and build a better life. Our teachers now carry the responsibility of sharing yoga with our students.',
    'The purpose behind teaching yoga, for us, is much deeper than simply teaching postures or techniques. We want people to learn how to care for and respect their body, mind, and inner self, because these are the foundations through which we experience this life.',
    'For me, yoga has never been only a profession. It is connected with service, conscious living, responsibility, and creating positive opportunities for others.',
  ],
  // From the home page founder band (short form).
  short: 'His yoga journey started from a severe injury after playing sports for a long time at the state and national level. He contributed to the success of other yoga schools in Rishikesh, and then built his own: Himalayan Yoga Association and Bali Yoga School.',
  profile: [
    { heading: 'An unconventional teacher', text: 'Yogi Himanshu loves to experiment with various techniques of yoga and meditation, and introduces his students to Indian classical music through kirtan nights and mantra chanting. Besides teaching, he plays the harmonium and dholak. He teaches meditation, yoga philosophy, the Yoga Sutras of Patanjali and the Bhagavad Gita, in an interesting and practical way so that they are easy to apply in life.' },
    { heading: 'Observer of the inner voice', text: 'Apart from his subject expertise, his real learning came from observing life as it unfolded before him, the practical aspects of it, rather than just the theory. He considers nature his best companion and loves farming, running, and spending time in the solitude of nature and in the company of people.' },
    { heading: 'A simple man, a people’s person', text: 'He loves being of use to people even outside the field of yoga, in whatever way possible. He cherishes his own company all the same and enjoys being in silence and observing the world.' },
  ],
  quote: 'Live your dreams because life is short, but remember that life is not perfect; by accepting it as it is, you make your living perfect. Yoga helps to put things in perspective and makes you choose joy over worldly things that are making you miserable.',
};

export const teachers = [
  {
    slug: 'shanti', name: 'Yogini Shanti', role: 'Yoga philosophy, meditation & pranayama', image: 'person-shanti',
    bio: [
      'Born and raised in Sumbawa Besar by Balinese parents who were themselves yoga practitioners, Shanti grew up surrounded by spiritual traditions, mantra and devotional practice. After meeting her Guru she devoted more than five years to serving and studying at his ashram, deepening her knowledge of the Bhagavad Gita, Hatha Yoga, meditation, pranayama and traditional yogic philosophy.',
      'She received a scholarship for a 200-hour yoga teacher training at S-VYASA University in Bangalore, India, and has taught continuously at Bali Yoga School for the past four to five years.',
    ],
  },
  {
    slug: 'nikki', name: 'Yogini Nikki', role: 'Ashtanga Vinyasa yoga', image: 'person-nikki',
    bio: [
      'Nikki’s journey into yoga began with her own healing: after being diagnosed with severe scoliosis following high school, a consistent practice, especially Ashtanga, helped her build strength, stability and confidence. She later studied as a raw food and detox facilitator and travelled to Rishikesh to train further in Hatha and Ashtanga Yoga.',
      'She has taught continuously at Bali Yoga School for the past four to five years and is known for her Ashtanga classes, which combine discipline, precision and encouragement. She also leads cooking and wellness-focused sessions.',
    ],
  },
  {
    slug: 'chiara', name: 'Yogini Chiara', role: 'Hatha & Ashtanga Vinyasa, sound healing & Reiki', image: 'person-chiara',
    bio: [
      'Chiara began practising yoga in Italy, where she trained through an international school, and continued her training in Indonesia. She has studied Hatha, Vinyasa, Yin, pregnancy yoga, Ashtanga Vinyasa, sound healing and Reiki, and has also explored Capoeira, Muay Thai, dance and Animal Flow (Level 1).',
      'She first came to Bali Yoga School as a student and has taught there for the past two to three years, guiding Hatha Vinyasa flow, sound healing, Reiki and retreat classes.',
    ],
  },
  {
    slug: 'pandu', name: 'Yogi Pandu', role: 'Shatkarma, pranayama, meditation & philosophy', image: 'person-pandu',
    bio: [
      'Born into a priestly family in Bali, Pandu travelled to India in 2014 to study Sanskrit at Banaras Hindu University in Varanasi and later spent about three and a half years living in an ashram in Vrindavan.',
      'After returning to Bali he completed his 500-hour yoga teacher training at Bali Yoga School, and he has taught there regularly for the past one to one and a half years.',
    ],
  },
  {
    slug: 'babloo', name: 'Yogi Babloo', role: 'Yin, Ashtanga Vinyasa, pranayama & meditation', image: 'person-babloo',
    bio: [
      'Born into a Brahmin family in Uttarkashi in the higher Himalayas, Babloo holds a master’s degree in Yogic Science from Sanskrit University in Haridwar and is a Yoga Alliance–certified teacher with 200-hour and 300-hour credentials.',
      'With more than seven years of teaching experience across India and Bali, he has taught regularly at Bali Yoga School for the past one and a half to two years.',
    ],
  },
  {
    slug: 'chetan', name: 'Yogi Chetan', role: 'Yin yoga, anatomy & physiology, Ayurveda', image: 'person-chetan',
    bio: [
      'Chetan is a yoga teacher from Rishikesh, India, who has guided international students since 2012 in Hatha, Vinyasa and Yin Yoga, human anatomy and physiology, yoga philosophy, breathwork, meditation and Ayurveda. Alongside his yoga studies he has studied Sanskrit.',
      'He has taught regularly in Bali, including at Bali Yoga School, for the past one and a half to two years.',
    ],
  },
  {
    slug: 'laksmi', name: 'Yogini Laksmi', role: 'Hatha Vinyasa yoga', image: 'person-laksmi',
    bio: [
      'Laksmi’s approach is rooted in balance, mindful movement, conscious breathing and presence. Her Hatha Vinyasa classes combine gentle, fluid movement with strength-building elements in creative, purposeful sequences.',
      'She has taught regularly at Bali Yoga School for the past one and a half to two years, including Hatha Vinyasa and retreat classes.',
    ],
  },
];

export const management = [
  { name: 'Dewa', role: 'School Director', image: 'person-dewa', text: 'Dewa met Yogi Himanshu Joshi in Ubud and the two built Bali Yoga School together. “Our purpose has always been very simple: to share yoga authentically and to preserve its true essence.”' },
  { name: 'Akane', role: 'School Commissioner', text: 'Akane Itoshiro, wife of Himanshu Joshi, was born and raised in Japan and met Himanshu at Himalayan Yoga Association in Rishikesh while completing her 500-hour teacher training. Before joining the community she worked for about eight to nine years as cabin crew with Emirates.' },
  { name: 'Deepika', role: 'IT & Technology', text: 'Himanshu’s sister, Deepika has supported Himalayan Yoga Association and Bali Yoga School since their early years. She holds an MBA and mentors the IT and technology team.' },
  { name: 'Shailesh', role: 'IT & Technology', text: 'A close friend of Himanshu since the early days, Shailesh supports the digital development, systems and technical work behind the organisations.' },
  { name: 'Sumit', role: 'IT & Operations', text: 'Brings together IT operations and customer experience within the management structure.' },
  { name: 'Priya', role: 'IT & Operations', text: 'Supports the seamless functioning of daily online operations, with an academic background in yoga.' },
  { name: 'Divya', role: 'Management', text: 'Experience in accounting, group management and handling customer enquiries on digital platforms.' },
];

export function teacherByName(name) {
  const n = name.toLowerCase();
  return teachers.find((t) => n.includes(t.slug));
}
